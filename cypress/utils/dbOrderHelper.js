// Partially worked-on file to deal with dependencies while synchronizing tables.

import { models } from "../../server/lib/db.mjs";

// PARTIAL GRAPH.
// All are dependent on User (due to base schema fields of createdBy, updatedBy).
// eslint-disable-next-line no-unused-vars
const dependencyGraph = {
  User: ["User"],
  Account: ["User"],
  Role: ["User"],
  AccountUser: ["User", "Account", "Role"],
  TransactionType: ["User", "Account"],
  Deal: ["User", "Account"],
  Binder: ["User", "Deal"],
  Checklist: ["User", "Deal"],
  ChecklistTemplate: ["Account", "User"],
  Folder: ["Deal", "Folder", "User"],
  File: ["Deal", "User"],
  ClosingStatement: ["Deal", "File", "User"],
  Document: ["File", "Folder", "User"],
  BinderDocument: ["Deal", "Folder", "User"],
};

// Works as of 2022-10-19.
// sequelize.sync() // <Model>.sync() does not respect pre-defined relations by default. (There might be something somewhere to .sync() properly (force option doesn't work), but I took the lazy route instead and hand-ordered the creation sequence.)
export const creationOrder = [
  "User",
  "Account",
  "Role",
  "AccountUser",
  "TransactionType",
  "Deal",
  "Binder",
  "Checklist",
  "ChecklistTemplate",
  "Folder",
  "File",
  "ClosingStatement",
  "Document",
  "BinderDocument",
  "Event",
  "Contact",
  "ContactType",
  "ContactAddress",
  "EventContact",
  "DealContact",
  "SignaturePackage",
  "SignaturePage",
];

export const synchronizeDB = async ({ force = false }) => {
  const loggingInfo = {
    modelsSynchronized: Object.fromEntries(
      Object.entries(models).map(([modelString]) => [modelString, false])
    ),
    defunctModels: {},
  };

  await (async () => {
    // START:

    // sync all the tables in order.
    for (const modelString of creationOrder) {
      const Model = models[modelString];

      if (Model) {
        await Model.sync({ force });
        loggingInfo.modelsSynchronized[modelString] = true;
        console.log(`${modelString} synchronized.`);
      } else {
        loggingInfo.defunctModels[modelString] = true;
      }
    }

    // END
  })();

  await (async () => {
    // Summary

    const defunctModels = Object.entries(loggingInfo.defunctModels);
    if (defunctModels.length > 0) {
      console.log(
        `WARNING: Synchronization of ${defunctModels.length} non-existent models was attempted:`
      );
      for (const [modelString] of defunctModels) {
        console.log(` ${modelString}`);
      }
    }

    const modelsMetadata = Object.entries(loggingInfo.modelsSynchronized);

    const modelsSynchronized = modelsMetadata.filter(
      ([modelString, didSync]) => didSync
    );
    const modelsNotSynchronized = modelsMetadata.filter(
      ([modelString, didSync]) => !didSync
    );
    if (modelsNotSynchronized.length > 0) {
      console.log(
        `WARNING: Following ${modelsNotSynchronized.length} models were NOT synchronized:`
      );
      for (const [modelString] of modelsNotSynchronized) {
        console.log(` ${modelString}`);
      }
    }
    // Synchronized
    console.log(
      `Synchronization of ${modelsSynchronized.length}/${modelsMetadata.length} models completed successfully.`
    );
  })();
};
