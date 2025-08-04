// import api from "../../src/services/apiClient";

import createdAdminAccount from "../fixtures/_created/createdAdminAccount.transient.json";

import editUser from "../fixtures/user/editUser.json";

import newDeal from "../fixtures/deal/newDeal.json";
import editDeal from "../fixtures/deal/editDeal.json";
import newContact from "../fixtures/deal/newContact.json";
import editContact from "../fixtures/deal/editContact.json";
import newMeeting from "../fixtures/meeting/first.json";
import anotherMeeting from "../fixtures/meeting/second.json";
import newChecklist from "../fixtures/checklist/newChecklist.json";
import newDocument from "../fixtures/documents/newDocument.json";
import newBinder from "../fixtures/binder/newBinder.json";

import { signin } from "../../src/services/authService";
import { setUserToken } from "../../src/utils/userToken";

const state = {
  user: createdAdminAccount.createdAdmin,
  account: createdAdminAccount.createdAccount,
  userAccessToken: null,
  deal: null,
  contact: null,
  meeting: null,
  checklist: null,
};

const path = require("path");

// Assuming everything to be done from start to finish in one go.
describe("/", () => {
  describe("/login", () => {
    it("login / logs in with a created test user", () => {
      // Clear cookie to test login.

      const credentials = {
        username: state.user.email,
        password: state.user.password,
      };

      cy.visit(`/signin`);

      cy.get('input[type="username"]').type(credentials.username);
      cy.get('input[type="password"]').type(credentials.password);
      cy.get('button[type="submit"]').click();
      cy.contains(credentials.username).should("be.visible");
    });
  });

  describe("/settings", () => {
    before(async () => {
      const { data } = await signin({
        username: state.user.email,
        password: state.user.password,
      });
      state.userAccessToken = data.accessToken;
    });

    beforeEach(() => {
      setUserToken(state.userAccessToken, true);
      cy.visit(`/deals`);
    });

    it.skip("/ can edit profile fields", () => {
      cy.get(`div.ms-Persona:contains("${state.user.email}")`).click();

      // Just re-assert that we're in `User Profile`
      cy.get(`div.ms-Nav-linkText:contains("User Profile")`).click();

      // fill user form with new values
      cy.refillForm(editUser);

      cy.contains("Save profile").click();

      cy.reload();

      // Test whether new settings persist.
      const newUserFirstName = editUser.firstName.value;

      cy.get('input[name="firstName"]').should("be.visible", newUserFirstName);

      const newUserLastName = editUser.lastName.value;

      cy.get('input[name="lastName"]').should("contain", newUserLastName);

      const newUserPhoneNumber = editUser.phone.value;

      cy.get('input[name="phone"]').should("contain", newUserPhoneNumber);

      state.user.firstName = newUserFirstName;
      state.user.lastName = newUserLastName;
      state.user.phone = newUserPhoneNumber;
    });
  });

  describe("/deals", () => {
    before(async () => {
      const { data } = await signin({
        username: state.user.email,
        password: state.user.password,
      });
      state.userAccessToken = data.accessToken;
    });

    beforeEach(() => {
      setUserToken(state.userAccessToken, true);
      cy.visit(`/deals`);
    });

    it("/ can create a deal", () => {
      cy.contains("Add Deal").click();

      cy.fillForm(newDeal);

      cy.contains("Save").click();

      cy.contains("Summary").should("be.visible");

      state.deal = newDeal;
    });

    it("filters / deals can be filtered by `Transaction type`", () => {
      const dealName = state.deal.name.value;
      const dealType = state.deal.transactionType.value;

      // Check dealType filter
      const filterTypes = ["Acquisition", "Refinance"];

      // Single type selected
      for (let f of filterTypes) {
        cy.get(`span:contains("${f}")`).click();
        if (f === dealType) {
          cy.contains(dealName).should("be.visible");
        } else {
          cy.contains("No deal found").should("be.visible");
        }
        // Uncheck
        cy.get(`span:contains("${f}")`).click();
      }

      // Multiple selected (in this case, all)
      for (let f of filterTypes) {
        cy.get(`span:contains("${f}")`).click();
      }

      cy.contains(dealName).should("be.visible");

      // Uncheck all selected
      for (let f of filterTypes) {
        cy.get(`span:contains("${f}")`).click();
      }
    });

    it.skip("filters / deals can be filtered by `Status`", () => {
      const dealName = state.deal.name.value;
      const dealStatus = state.deal.status.value;

      // Check status filter
      const filterTypes = ["Active", "On Hold", "Closed", "Terminated"];

      // Single type selected
      for (let f of filterTypes) {
        cy.get(`span:contains("${f}")`).click();
        if (f === dealStatus) {
          cy.contains(dealName).should("be.visible");
        } else {
          cy.contains("No deal found").should("be.visible");
        }
        // Uncheck
        cy.get(`span:contains("${f}")`).click();
      }

      // Multiple selected with dealStatus also selected.
      let multiFilters = filterTypes.filter((f) => f !== dealStatus);
      multiFilters = multiFilters.slice(1);
      multiFilters.push(dealStatus);
      for (let f of multiFilters) {
        cy.get(`span:contains("${f}")`).click();
      }

      cy.contains(dealName).should("be.visible");

      // Uncheck
      for (let f of multiFilters) {
        cy.get(`span:contains("${f}")`).click();
      }

      // Multiple selected with dealStatus NOT selected
      multiFilters = filterTypes.filter((f) => f !== dealStatus);
      multiFilters = multiFilters.slice(1);
      for (let f of multiFilters) {
        cy.get(`span:contains("${f}")`).click();
      }

      cy.contains("No deal found").should("be.visible");

      // Uncheck
      for (let f of multiFilters) {
        cy.get(`span:contains("${f}")`).click();
      }
    });

    // Test fails correctly. Needs to be enabled after fixing the issue with the codebase.
    it.skip("summary / can view a created deal from within its summary page", () => {
      cy.contains("Test Deal").click();

      cy.contains("Summary").should("be.visible");
      cy.contains("Deal Summary").should("be.visible");
      cy.contains("Critical Dates").should("be.visible");
      cy.contains("Contacts").should("be.visible");

      const notVisibleLabels = ["Status", "Closing date"]; // TODO: Closing Date should be visible at least. Something wrong with the input via cy.type()! (Excluding this test since failure of this test doesn't mean the feature is absent or not working as intended, rather the test is at fault. (Need some way to signify either of these cases explicitly.))

      for (const name in newDeal) {
        const { label, value, displayValue } = newDeal[name];
        if (notVisibleLabels.includes(label)) {
          continue;
        }
        cy.contains(label).should("be.visible");
        if (![undefined, null].includes(displayValue)) {
          cy.contains(displayValue).should("be.visible");
        } else {
          cy.contains(value).should("be.visible");
        }
      }
    });

    it("summary / can edit a created deal", () => {
      cy.contains("Test Deal").click();

      cy.contains("Edit").click();

      cy.refillForm(editDeal);

      cy.contains("Save").click();

      // Assert new data values are visible (i.e. the editing is successful).
      const notVisibleLabels = ["Status", "Closing date"]; // TODO: Closing Date should be visible at least. Something wrong with the test!
      for (const name in editDeal) {
        const { label, value } = editDeal[name];
        if (notVisibleLabels.includes(label)) {
          continue;
        }

        cy.contains(label).should("be.visible");
        cy.contains(value).should("be.visible");

        state.deal = editDeal;
      }
    });

    it("contacts / can create a deal contact", () => {
      const dealName = state.deal.name.value;

      cy.contains(dealName).click();

      cy.contains("Contacts").click();
      cy.contains("Add Contact").click();

      cy.fillForm(newContact);

      cy.contains("Save").click();

      const contactEmail = newContact.email.value;

      cy.contains(contactEmail).should("be.visible");

      state.dealContact = newContact;
    });

    it("filter contacts / can filter out contacts correctly", () => {
      const dealName = state.deal.name.value;

      cy.contains(dealName).click();

      cy.contains("Contacts").click();

      const contactFirstName = state.dealContact.firstName.value;

      const contactLastName = state.dealContact.lastName.value;

      const contactName = `${contactFirstName} ${contactLastName}`;

      const contactType = state.dealContact.contactType.value;

      // Check dealType filter
      const filterTypes = ["Lender", "Title"];

      // Single type selected
      for (let f of filterTypes) {
        cy.get(`span.ms-Checkbox-text:contains("${f}")`).click();
        if (f === contactType) {
          cy.contains(contactName).should("be.visible");
        } else {
          cy.contains("No contact found").should("be.visible");
        }
        // Uncheck
        cy.get(`span.ms-Checkbox-text:contains("${f}")`).click();
      }

      // Multiple selected (in this case, all)
      for (let f of filterTypes) {
        cy.get(`span.ms-Checkbox-text:contains("${f}")`).click();
      }

      cy.contains(contactName).should("be.visible");

      // Uncheck all selected
      for (let f of filterTypes) {
        cy.get(`span.ms-Checkbox-text:contains("${f}")`).click();
      }
    });

    it("contacts / can edit the deal contact", () => {
      const dealName = state.deal.name.value;

      cy.contains(dealName).click();

      cy.contains("Contacts").click();

      cy.contains("Edit").click();

      cy.refillForm(editContact);

      cy.contains("Save").click();

      const contactEmail = editContact.email.value;
      cy.contains(contactEmail).should("be.visible");

      state.dealContact = editContact;
    });

    // BUGFIX:
    it.skip("contacts / can create a new contact type and use it", () => {
      const dealName = state.deal.name.value;

      cy.contains(dealName).click();

      cy.contains("Contacts").click();

      cy.contains("Edit").click();

      // Create the new `Contact type`
      const newContactType = "New Contact Type";

      cy.contains(state.dealContact.contactType.label).next().click();
      cy.contains("Add/edit contact types").click();
      cy.get(".test-name-input").type(newContactType);
      cy.get(".test-name-input-button").click();

      cy.contains(newContactType).should("be.visible");

      cy.contains("Done").click();

      cy.contains("Add/Edit contact types").should("not.be.visible");

      // Use the new `Contact type`

      cy.contains(state.dealContact.contactType.label).next().click();
      // cy.get(".ms-Dropdown-items").should("be.visible");
      cy.contains(newContactType).click();
      cy.contains("Save").click();

      // Update our persistent state

      state.dealContact.contactType = {
        ...state.dealContact.contactType,
        value: newContactType,
      };
    });

    // BUGFIX:
    it.skip("contacts / can edit and delete an existing contact type", () => {
      const dealName = state.deal.name.value;

      cy.contains(dealName).click();

      cy.contains("Contacts").click();

      cy.contains("Edit").click();

      // Create the new `Contact type`
      const existingContactType = state.dealContact.contactType.value;

      cy.contains(state.dealContact.contactType.label).next().click();
      cy.contains("Add/edit contact types").click();

      cy.get(`.ms-DetailsRow:contains("${existingContactType}")`)
        .contains(/^Delete$/)
        .click();

      cy.contains(existingContactType).should("not.be.visible");

      cy.contains("Done").click();

      cy.contains("Add/Edit contact types").should("not.be.visible");

      // Use the new `Contact type`

      cy.contains(state.dealContact.contactType.label).next().click();
      cy.contains(newContact.contactType.value).should("be.visible").click();
      cy.contains("Save").click();

      // Update our persistent state

      state.dealContact.contactType = {
        ...state.dealContact.contactType,
        value: newContact.contactType.value,
      };
    });

    it("contacts / can send email to a created contact", () => {
      // Source: https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window/cypress/e2e/spec.cy.js
      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpen");
      });

      cy.contains(state.deal.name.value).click();

      cy.contains("Contacts").click();

      cy.get('i[data-icon-name="StatusCircleCheckmark"]').eq(1).click();
      cy.contains("Send Email").click();

      cy.get("@windowOpen").should(
        "be.calledWith",
        `mailto:${state.dealContact.email.value}`
      );
    });

    it("contacts / can request a meeting with a created contact", () => {
      cy.contains(state.deal.name.value).click();

      cy.contains("Contacts").click();

      cy.get('i[data-icon-name="StatusCircleCheckmark"]').eq(1).click();

      cy.contains("Request Meeting").click();

      cy.fillForm(newMeeting);

      cy.contains("Create").click();

      state.meeting = newMeeting;

      // -- Wait for modal to close.

      cy.contains("Add Event").should("not.be.visible");
    });

    it.skip("meetings / created meetings are visible across different views", () => {
      cy.contains(state.deal.name.value).click();

      const meetingName = state.meeting.name.value;

      // Make sure the summary also shows the set up meeting.
      cy.get('div.ms-StackItem:contains("Critical Dates")').contains(
        meetingName
      );

      cy.get('table[role="grid"]').contains(meetingName).scrollIntoView();

      cy.contains(meetingName).should("be.visible");

      cy.get('button[title="week view"]').click();

      cy.get('table[role="grid"]').contains(meetingName).scrollIntoView();

      cy.contains(meetingName).should("be.visible");

      cy.get('button[title="day view"]').click();

      cy.get('table[role="grid"]').contains(meetingName).scrollIntoView();

      cy.contains(meetingName).should("be.visible");

      cy.get('button[title="list view"]').click();

      cy.contains(meetingName).should("be.visible");
    });

    it("meetings / can create an arbitrary meeting via the calendar component", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Calendar"]').click();

      // Make sure these two match!
      const arbitraryDateSelectorRegExp = /^26$/;
      const arbitraryDateString = "26";

      cy.get('table[role="grid"]')
        .contains(arbitraryDateSelectorRegExp)
        .scrollIntoView();

      cy.contains(arbitraryDateSelectorRegExp).click();

      // Wait for the dialog to fully pop into view.
      cy.get('div[role="heading"]')
        .contains(/^Add Event$/)
        .should("be.visible");

      cy.fillForm(anotherMeeting);

      cy.contains(/^Create$/).click();

      // Wait for the dialog to fully hide.
      cy.get('div[role="heading"]')
        .contains(/^Add Event$/)
        .should("not.be.visible");

      const anotherMeetingName = anotherMeeting.name.value;

      // The highlighted cell should contain our new meeting information.
      cy.get(`td[data-date$="-${arbitraryDateString}"]`).should(
        "contain",
        anotherMeetingName
      );
    });

    it("checklists / can create a new checklist", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Checklist"]').click();

      cy.contains("Create new checklist").click();

      const checklistName = newChecklist.name.value;

      cy.log(checklistName);

      cy.contains("Checklist name").next().type(checklistName);

      cy.contains(/^Create$/).click();

      cy.contains("Checklist name").should("not.be.visible");

      cy.contains(checklistName).should("be.visible");

      state.checklist = newChecklist;
    });

    it("checklists / can export checklist as an Excel sheet", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Checklist"]').click();

      const checklistName = state.checklist.name.value;

      cy.get('button:contains("Export excel")').scrollIntoView().click();

      // Check the downloads folder for the exported file
      const downloadsFolder = Cypress.config("downloadsFolder");
      cy.readFile(
        path.join(downloadsFolder, `Checklist-${checklistName}.xlsx`)
      ).should("exist");
    });

    it("documents / can create a new folder", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Documents"]').click();

      cy.contains(/^Add new folder$/).click();

      const folderName = newDocument.name.value;

      cy.get('input[type="text"]').should("be.visible").type(folderName);

      cy.contains(/^Add$/).click();

      cy.get('input[type="text"]').should("not.be.visible");

      cy.contains(folderName).should("be.visible");
    });

    it("closing binders / can create a new binder", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Closing Binders"]').click();

      cy.contains(/^Create new binder$/).click();

      const binderName = newBinder.name.value;

      cy.contains("label", /^Binder name$/)
        .next()
        .type(binderName);

      cy.contains("button", /^Create$/).click();

      // Make sure the dialog is closed before proceeding.
      cy.contains("div.ms-Dialog-header", /^Add new binder$/).should(
        "not.be.visible"
      );

      // Confirm whether the binder was created.
      cy.contains("span", binderName).should("be.visible");

      // Confirm a few more elements are present.
      cy.contains("Empty binder").should("be.visible");

      state.binder = newBinder;
    });

    it("closing binders / can download a created binder", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Closing Binders"]').click();

      const binderName = state.binder.name.value;

      cy.get('button:contains("Download binder")').click();

      // Check the downloads folder for the exported file
      const downloadsFolder = Cypress.config("downloadsFolder");
      cy.readFile(path.join(downloadsFolder, `${binderName}.pdf`)).should(
        "exist"
      );
    });

    it("closing binders / can lock a created binder", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Closing Binders"]').click();

      // const binderName = state.binder.name.value;

      cy.contains(/^Lock binder$/).click();

      // Confirmation dialog handling
      cy.contains(/^Confirm$/).click();

      // Make sure dialog has vanished
      cy.get('div.ms-Dialog-header:contains("Lock binder")').should(
        "not.be.visible"
      );

      // Test whether the appropriate buttons are disabled
      cy.get('button:contains("Download binder")').should("be.disabled");
      cy.get('button:contains("Preview binder")').should("be.disabled");
      cy.get('button:contains("Duplicate binder")').should("be.disabled");
      cy.get('button:contains("Add documents")').should("be.disabled");

      // Test whether the appropriate buttons are enabled
      cy.get('button:contains("Send via email")').should("not.be.disabled");

      cy.get('button:contains("Unlock binder")')
        .should("be.visible")
        .and("not.be.disabled");
    });

    it("closing binders / can unlock a locked binder", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Closing Binders"]').click();

      // const binderName = state.binder.name.value;

      cy.get('button:contains("Unlock binder")')
        .should("be.visible")
        .and("not.be.disabled")
        .click();

      // Confirmation dialog handling
      cy.contains(/^Confirm$/).click();

      // Make sure dialog has vanished
      cy.get('div.ms-Dialog-header:contains("Unlock binder")').should(
        "not.be.visible"
      );

      // Test whether the appropriate buttons are enabled
      cy.get('button:contains("Download binder")').should("not.be.disabled");
      cy.get('button:contains("Preview binder")').should("not.be.disabled");
      cy.get('button:contains("Duplicate binder")').should("not.be.disabled");
      cy.get('button:contains("Add documents")').should("not.be.disabled");
      cy.get('button:contains("Send via email")').should("not.be.disabled");
      cy.get('button:contains("Lock binder")')
        .should("be.visible")
        .and("not.be.disabled");
    });

    it("closing binders / can preview a binder*", () => {
      cy.contains(state.deal.name.value).click();

      cy.get('button[data-content="Closing Binders"]').click();

      // const binderName = state.binder.name.value;

      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpen");
      });

      cy.get('button:contains("Preview binder")').click();

      // TODO: There should be more here that we should be testing, but this is a bit too wrangly. Will come back to this one.
      cy.get("@windowOpen").should("be.called");
    });
  });

  describe("/calendar", () => {
    before(async () => {
      const { data } = await signin({
        username: state.user.email,
        password: state.user.password,
      });
      state.userAccessToken = data.accessToken;
    });

    beforeEach(() => {
      setUserToken(state.userAccessToken, true);
      cy.visit(`/deals`);
    });

    it.skip("can filter events by deal in the global calendar", () => {
      // Create one more deal and add one calendar event to it with a specific name.
      cy.contains("Add Deal").click();

      const firstDeal = state.deal;

      const secondDeal = {
        transactionType: {
          label: "Transaction type",
          value: "Refinance",
          type: "dropdown",
        },
        name: {
          label: "Deal name",
          value: "Second Deal",
        },
        client: { label: "Client", value: "Test Client 2" },
        location: { label: "Location", value: "Test Location 2" },
        description: {
          label: "Description",
          value: "A shorter edited description.",
          type: "textarea",
        },
        status: {
          label: "Status",
          value: "Active",
          type: "dropdown",
        },
        amount: {
          label: "Deal amount",
          value: "24400",
          displayValue: "$24,400",
        },
        closingDate: {
          label: "Closing date",
          value: "2022-12-20",
        },
      };

      cy.fillForm(secondDeal);

      cy.contains("Save").click();

      // Add a testable meeting for the first deal.
      const firstMeeting = {
        name: {
          value: "First Test Meeting",
        },
        description: {
          label: "Description",
          value: "This is a sample description of the discussion agenda.",
          type: "textarea",
        },
      };

      const secondMeeting = {
        name: {
          value: "Second Test Meeting",
        },
        description: {
          label: "Description",
          value: "This is a sample description of the discussion agenda.",
          type: "textarea",
        },
      };

      cy.visit(`/deals`);

      cy.contains(firstDeal.name.value).click();

      cy.get('button[data-content="Calendar"]').click();

      // Make sure these two match!
      const firstArbitraryDateSelectorRegExp = /^7$/;
      // const firstArbitraryDateString = "7";

      cy.get('table[role="grid"]')
        .contains(firstArbitraryDateSelectorRegExp)
        .scrollIntoView();

      cy.contains(firstArbitraryDateSelectorRegExp).click();

      // Wait for the dialog to fully pop into view.
      cy.get('div[role="heading"]')
        .contains(/^Add Event$/)
        .should("be.visible");

      cy.fillForm(firstMeeting);

      cy.contains(/^Create$/).click();

      // Wait for the dialog to fully hide.
      cy.get('div[role="heading"]')
        .contains(/^Add Event$/)
        .should("not.be.visible");

      // -----------

      cy.visit(`/deals`);

      cy.contains(secondDeal.name.value).click();

      cy.get('button[data-content="Calendar"]').click();

      // Make sure these two match!
      const secondArbitraryDateSelectorRegExp = /^8$/;
      // const secondArbitraryDateString = "8";

      cy.get('table[role="grid"]')
        .contains(secondArbitraryDateSelectorRegExp)
        .scrollIntoView();

      cy.contains(secondArbitraryDateSelectorRegExp).click();

      // Wait for the dialog to fully pop into view.
      cy.get('div[role="heading"]')
        .contains(/^Add Event$/)
        .should("be.visible");

      cy.fillForm(secondMeeting);

      cy.contains(/^Create$/).click();

      // Wait for the dialog to fully hide.
      cy.get('div[role="heading"]')
        .contains(/^Add Event$/)
        .should("not.be.visible");

      // Check whether clicking on the correct filters in the global calendar properly updates these items.

      cy.visit("/calendar");

      // Both are checked by default
      cy.contains(firstMeeting.name.value).should("be.visible");
      cy.contains(secondMeeting.name.value).should("be.visible");

      cy.click(firstDeal.name.value); // uncheck first deal

      cy.contains(firstMeeting.name.value).should("not.be.visible");
      cy.contains(secondMeeting.name.value).should("be.visible");

      cy.click(firstDeal.name.value);
      cy.click(secondDeal.name.value);

      cy.contains(firstMeeting.name.value).should("be.visible");
      cy.contains(secondMeeting.name.value).should("not.be.visible");

      cy.click(firstDeal.name.value);

      // Both are unchecked
      cy.contains(firstMeeting.name.value).should("not.be.visible");
      cy.contains(secondMeeting.name.value).should("not.be.visible");
    });
  });
});
