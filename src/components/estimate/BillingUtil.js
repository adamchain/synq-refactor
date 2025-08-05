import { CommonContext } from "../../context/CommonContext";
import BillingServices from "../../services/BillingServices";
import EstimateServices from "../../services/EstimateServices";
import _ from "lodash";
import PriceUtil from "../util/PriceUtil";
import { trackPromise } from "react-promise-tracker";

export default class BillingUtil {
  static branchObject = (currentContext) => ({
    branchName: currentContext.defaultBranch?.name,
    branchAddress: `${(currentContext.defaultBranch?.address1 ?? "") + " " + (currentContext.defaultBranch?.address2 ?? "")}, ${currentContext.defaultBranch?.city + " ," + currentContext.allStates[currentContext.defaultBranch?.stateId]?.stateCd + " " + currentContext.defaultBranch?.zipCode}`,
    branchMobile: currentContext.defaultBranch?.mobile
      ? currentContext.defaultBranch?.mobile
      : currentContext.defaultBranch?.phone,
    branchEmail: currentContext.defaultBranch?.email,
    branchWebsite: currentContext.defaultBranch?.website,
    sTaxSFee: currentContext.defaultBranch?.sTaxSFee,
  });
  static downloadEstimate = (id, currentContext) => {
    EstimateServices.getEstimateById(id, (response) => {
      localStorage.setItem(
        "whskr-print-estimate",
        JSON.stringify({
          ...response,
          branchObject: this.branchObject(currentContext),
        }),
      );
      window.open("/estimate/preview/true", "_blank", "noreferrer");
    });
  };

  static downloadInvoice = (id, currentContext) => {
    trackPromise(
      new Promise((resolve) =>
        setTimeout(() => {
          BillingServices.getBillingById(id, (response) => {
            localStorage.setItem(
              "whskr-print-invoice",
              JSON.stringify({
                ...response,
                branchObject: this.branchObject(currentContext),
              }),
            );
            window.open("/estimate/preview/false", "_blank", "noreferrer");
          });
          resolve();
        }, 500),
      ).then(() => {}),
    );
  };

  static downloadRabiesCertificate = (id) => {
    BillingServices.getRabiesCertificateByItemId(id, (data) => {
      localStorage.setItem(
        "whskr-print-rabiescertificate",
        JSON.stringify({ ...data }),
      );

      window.open("/rabies/preview", "_blank", "noreferrer");
    });
  };

  // static calculateEachItemPrice = (min,max,current,qty) => {

  //     let finalPrice = _.toNumber(current)*qty;
  //     let minPrice = _.toNumber(min);
  //     let maxPrice = _.toNumber(max);

  //     if(finalPrice && (minPrice || maxPrice)){
  //         if(minPrice){
  //             finalPrice = _.lt(finalPrice,minPrice)?minPrice:finalPrice;
  //         }
  //         if(maxPrice){
  //             finalPrice = _.gt(finalPrice,maxPrice)?maxPrice:finalPrice;
  //         }

  //     }
  //     return  _.round(finalPrice,2);
  // }

  static formulateCalPrice = (each) => {
    let priceAfterDiscount = each.itemDiscountedPrice || each.itemPrice;
    let finalPrice = _.toNumber(priceAfterDiscount) * each.qty;
    let minPrice = _.toNumber(each.minPrice);
    let maxPrice = _.toNumber(each.maxPrice);

    if (finalPrice && (minPrice || maxPrice)) {
      if (minPrice) {
        finalPrice = _.lt(finalPrice, minPrice) ? minPrice : finalPrice;
      }
      if (maxPrice) {
        finalPrice = _.gt(finalPrice, maxPrice) ? maxPrice : finalPrice;
      }
    }
    return _.round(finalPrice, 2);
  };

  static calculateCalPriceForEachItem = (item) => {
    let priceAfterDiscount = item.originalPrice;
    if (item.discount) {
      let discountValue = _.toNumber(item.discount);
      let discountAmount =
        item.discountType === "%"
          ? PriceUtil.discountCalculate(item.originalPrice, discountValue)
          : discountValue;
      priceAfterDiscount = _.round(priceAfterDiscount - discountAmount, 2);
    }

    let finalPrice = _.toNumber(priceAfterDiscount) * item.qty;
    let minPrice = _.toNumber(item.minPrice);
    let maxPrice = _.toNumber(item.maxPrice);

    if (finalPrice && (minPrice || maxPrice)) {
      if (minPrice) {
        finalPrice = _.lt(finalPrice, minPrice) ? minPrice : finalPrice;
      }
      if (maxPrice) {
        finalPrice = _.gt(finalPrice, maxPrice) ? maxPrice : finalPrice;
      }
    }
    return _.round(finalPrice, 2);
  };

  static calculateSubTotal = (items) => {
    return items
      .filter((k) => !k.declined)
      .reduce((total, current) => {
        if (!current.hasOwnProperty("calPrice")) {
          console.error("TO CHECK => Cal Price Not Available");
        }
        return _.sum([total || 0, Number.parseFloat(current.calPrice) || 0]);
      }, 0);
  };

  static calculateServiceFee = (items) => {
    return items
      .filter((k) => !k.declined)
      .reduce((total, current) => {
        return _.sum([total || 0, Number.parseFloat(current.sFee) || 0]);
      }, 0);
  };

  static calculateSubTotalWithTax = (items, isServiceFeeTaxed, tax) => {
    let taxableTotal = 0.0;
    let unTaxableTotal = 0.0;
    let sFeeTotal = 0.0;

    items
      .filter((k) => !k.declined)
      .forEach((k) => {
        let calPrice = _.toNumber(k.calPrice);
        let sFee = _.toNumber(k.sFee);

        if (calPrice) {
          k.sTax ? (taxableTotal += calPrice) : (unTaxableTotal += calPrice);
          sFee ? (sFeeTotal += sFee) : (sFeeTotal = sFeeTotal);
        }
      });
    taxableTotal =
      PriceUtil.convertFloat(taxableTotal) +
      PriceUtil.discountCalculate(
        PriceUtil.convertFloat(taxableTotal),
        PriceUtil.convertFloat(tax),
      );
    if (isServiceFeeTaxed) {
      sFeeTotal =
        PriceUtil.convertFloat(sFeeTotal) +
        PriceUtil.discountCalculate(
          PriceUtil.convertFloat(sFeeTotal),
          PriceUtil.convertFloat(tax),
        );
    }
    return taxableTotal + unTaxableTotal + sFeeTotal;
  };

  static calculateTax = (items, isServiceFeeTaxed, tax) => {
    let taxableTotal = 0.0;
    let sFeeTotal = 0.0;

    items
      .filter((k) => !k.declined)
      .forEach((k) => {
        let calPrice = _.toNumber(k.calPrice);
        let sFee = _.toNumber(k.sFee);

        if (calPrice) {
          if (k.sTax) {
            taxableTotal += calPrice;
          }
          if (sFee) {
            sFeeTotal += sFee;
          }
        }
      });
    taxableTotal = PriceUtil.discountCalculate(
      PriceUtil.convertFloat(taxableTotal),
      PriceUtil.convertFloat(tax),
    );
    if (isServiceFeeTaxed) {
      sFeeTotal = PriceUtil.discountCalculate(
        PriceUtil.convertFloat(sFeeTotal),
        PriceUtil.convertFloat(tax),
      );
    } else {
      sFeeTotal = 0.0;
    }
    return taxableTotal + sFeeTotal;
  };

  static priceVarianceTotal = (priceVariance, estimateTotal) => {
    let finalEstimateValue = "";
    if (_.toNumber(priceVariance)) {
      finalEstimateValue =
        PriceUtil.dollarValue(estimateTotal) +
        " - " +
        PriceUtil.dollarValue(
          estimateTotal +
            PriceUtil.discountCalculate(estimateTotal, priceVariance),
        );
    } else {
      finalEstimateValue = PriceUtil.dollarValue(estimateTotal);
    }
    return finalEstimateValue;
  };

  static calculateRawTotal = (subTotal, estimateSummary, isServiceFeeTaxed) => {
    let discountAmount = 0.0;

    if (subTotal <= 0) {
      return { estimateTotal: 0.0, discountAmount };
    }
    let estimateTotal = this.calculateSubTotalWithTax(
      estimateSummary.items,
      isServiceFeeTaxed,
      estimateSummary.tax,
    );
    let discountValue = PriceUtil.convertFloat(estimateSummary.discount);
    if (discountValue > 0) {
      discountAmount =
        estimateSummary.discountType === "$"
          ? discountValue
          : PriceUtil.discountCalculate(estimateTotal, discountValue);
      estimateTotal = estimateTotal - discountAmount;
    }
    return { estimateTotal, discountAmount };
  };

  static calculateTotal = (
    isEstimate,
    subTotal,
    estimateSummary,
    isServiceFeeTaxed,
  ) => {
    let estimateTotal = this.calculateRawTotal(
      subTotal,
      estimateSummary,
      isServiceFeeTaxed,
    ).estimateTotal;
    if (estimateTotal <= 0) {
      return PriceUtil.dollarValue(0);
    }
    let priceVariance = PriceUtil.convertFloat(estimateSummary.priceVariance);

    let finalEstimateValue = PriceUtil.dollarValue(estimateTotal);

    if (isEstimate) {
      finalEstimateValue = this.priceVarianceTotal(
        priceVariance,
        estimateTotal,
      );
    }
    return finalEstimateValue;
  };

  static submitTotal = (estimateData, isServiceFeeTaxed) => {
    let subTotal = BillingUtil.calculateSubTotal(estimateData.items);

    let total = this.calculateRawTotal(
      subTotal,
      estimateData,
      isServiceFeeTaxed,
    ).estimateTotal;

    return {
      total: PriceUtil.decimalFix(total),
      subTotal: PriceUtil.decimalFix(subTotal),
    };
  };

  static paymentMethodValue = (paymethod) => {
    if (paymethod === "Write-In") {
      return "Credit NPS";
    } else if (paymethod.includes(",")) {
      return "Multiple";
    } else {
      return paymethod;
    }
  };

  static findStrikeThrough = (item) => {
    let strikethrough = { allow: false, value: 0 };

    if (
      !item.qty ||
      (item.minPrice && item.calPrice === item.minPrice) ||
      (item.maxPrice && item.calPrice === item.maxPrice)
    ) {
      return strikethrough;
    } else {
      if (
        item.itemDiscountedPrice &&
        item.itemPrice !== item.itemDiscountedPrice
      ) {
        strikethrough.value = item.itemPrice * item.qty;
        strikethrough.allow = true;
      }
      return strikethrough;
    }
  };

  static frameInvoiceResponse = (finalResponse) => {
    finalResponse.items.forEach((k) => {
      if (k.type === 5 && k.packageItems?.length > 0) {
        let totalPackageAmount = 0;
        k.packageItems.forEach((p) => {
          p.calPrice = BillingUtil.formulateCalPrice(p);
          totalPackageAmount = totalPackageAmount + p.calPrice;
        });
        k.calPrice =
          _.toNumber(
            k.packageAdjustedPrice || totalPackageAmount || k.itemPrice,
          ) * k.qty;
      } else {
        k.calPrice = BillingUtil.formulateCalPrice(k);
      }
    });
  };

  static findDiscountedItemPrice = (originalPrice, discount, discountType) => {
    let priceAfterDiscount = originalPrice;
    if (discount) {
      let discountValue = _.toNumber(discount);
      let discountAmount =
        discountType === "%"
          ? PriceUtil.discountCalculate(originalPrice, discountValue)
          : discountValue;
      priceAfterDiscount = _.round(priceAfterDiscount - discountAmount, 2);
    }
    return priceAfterDiscount;
  };
}
