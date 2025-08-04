import Promise from "bluebird";
import * as files from "../services/fileService.mjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import { models } from "./db.mjs";
import dayjs from "dayjs";

const { Account } = models;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const coverTemplateBytes = fs.readFileSync(
  path.resolve(__dirname, "../assets/cover-template.pdf")
);

export async function mergePDFs(
  user,
  deal,
  docs,
  options = { coverPage: { include: false, title: "" } }
) {
  const { coverPage } = options;

  const pdfsToMerge = await Promise.map(
    docs,
    async (doc) =>
      await files.download(
        user,
        doc.fileId, // null coalescing doesn't get parsed by esm package. Proper babel usage would be really nice.
        {
          validate: false,
        }
      )
  );

  const mergedPdf = await PDFDocument.create();

  const contents = [];
  let index = 0;

  for (const pdfBytes of pdfsToMerge) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    contents.push({
      name: docs[index].name,
      numPages: copiedPages.length,
      pages: copiedPages,
    });
    index++;
  }

  if (coverPage.include) {
    // Proper cover page.
    const timesRomanFont = await mergedPdf.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await mergedPdf.embedFont(
      StandardFonts.TimesRomanBold
    );

    // TODO: Bold, underline, italics won't be supported any time soon by pdf-lib (Notice #752 under "Unplanned" : https://github.com/Hopding/pdf-lib/discussions/998). Pausing work on this for now. Will come back if normal text is approved, or if we can move to a different PDF creation tool.
    {
      const coverTemplatePdf = await PDFDocument.load(coverTemplateBytes);

      const [page] = await mergedPdf.copyPages(coverTemplatePdf, [0]);
      mergedPdf.addPage(page);
      const { width, height } = page.getSize();

      // eslint-disable-next-line no-inner-declarations
      function centerTypeText(
        text = "Random Text",
        options = { fontSize: 18, font: timesRomanFont, y: 0 }
      ) {
        let textWidth = options.font.widthOfTextAtSize(text, options.fontSize);
        let x = 60 + (width / 2 - textWidth / 2); // Right shifted to accomodate for the left blue margin.
        let y = options.y; //
        page.drawText(text, {
          x,
          y,
          size: options.fontSize,
          font: options.font,
        });
      }

      const account = await Account.findByPk(deal.dataValues.accountId);

      if (deal) {
        let fontSize = 18;
        let y = height - 8 * fontSize;
        centerTypeText(account.name, {
          fontSize,
          y,
          font: timesRomanBoldFont,
        });

        fontSize = 16;
        y -= 4 * fontSize;
        centerTypeText(coverPage.title, {
          fontSize,
          y,
          font: timesRomanFont,
        });

        y -= 4 * fontSize;
        centerTypeText(
          `${deal.dataValues.transactionType} of ${deal.dataValues.name}`,
          {
            fontSize,
            y,
            font: timesRomanFont,
          }
        );

        y -= 1.5 * fontSize;
        centerTypeText(`(${deal.dataValues.status})`, {
          fontSize,
          y,
          font: timesRomanFont,
        });

        y -= 5 * fontSize;
        centerTypeText(
          `Deal of $${Number(deal.dataValues.amount).toLocaleString()}`,
          {
            fontSize,
            y,
            font: timesRomanFont,
          }
        );

        y -= 4 * fontSize;
        centerTypeText(`Client - ${deal.dataValues.client}`, {
          fontSize,
          y,
          font: timesRomanFont,
        });

        y -= 9 * fontSize;
        fontSize = 12;

        centerTypeText("Location", {
          fontSize,
          y,
          font: timesRomanBoldFont,
        });

        y -= 3 * fontSize;

        centerTypeText(deal.dataValues.location, {
          fontSize,
          y,
          font: timesRomanFont,
        });

        y -= 4.5 * fontSize;

        centerTypeText(
          `Closing Date: ${dayjs(
            deal.dataValues.closingDate,
            "YYYY-MM-DD"
          ).format("MMMM DD, YYYY")}`,
          {
            fontSize,
            y,
            font: timesRomanFont,
          }
        );
      }
    }

    // TOC.
    {
      const page = mergedPdf.addPage();
      const { width, height } = page.getSize();
      let fontSize = 20;
      const textWidth = timesRomanFont.widthOfTextAtSize(
        coverPage.title,
        fontSize
      );

      let x = width / 2 - textWidth / 2;
      let y = height - 4 * fontSize;

      page.drawText(coverPage.title, {
        x,
        y,
        size: fontSize,
        font: timesRomanBoldFont,
        color: rgb(0, 0, 0),
      });

      x = 50;
      fontSize = 16;
      y = height - 4 * fontSize * 2;
      page.drawText("Table of Contents", {
        x,
        y,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      y -= 30;

      let currentPage = 1;

      contents.forEach((doc, index) => {
        const text = path.parse(doc.name).name;
        y -= fontSize + 15;

        page.drawText(text, {
          x: 50,
          y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(currentPage.toString(), {
          x: width - 100,
          y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        currentPage += doc.numPages;
      });
    }
  }

  contents.forEach((doc) =>
    doc.pages.forEach((page) => mergedPdf.addPage(page))
  );

  return mergedPdf.save();
}

export async function splitPdf(user, document, pages) {
  const pdfs = [];
  const src = await PDFDocument.load(
    await files.download(user, document.fileId)
  );

  for (let i in pages) {
    const pdfDoc = await PDFDocument.create();

    const [page] = await pdfDoc.copyPages(src, [pages[i]]);
    pdfDoc.addPage(page);

    pdfs.push(await pdfDoc.save());
  }

  return pdfs;
}
