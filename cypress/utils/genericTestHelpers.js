import * as crud from "../../server/lib/crud.mjs";
import { creationOrder } from "./dbOrderHelper";

export const deleteAllDealsForUser = async (user) => {
  // const deals = await dealService.find();
  // return api.delete(`/deals`);
};

export const dateDisplayString = (cyDateString) => {
  const [yyyy, mm, dd] = cyDateString.split("-");
  return `${dd}/${mm}/${yyyy}`;
};

export const clearDatabase = async () => {
  // ONLY FOR TEST DATABASE. Just testing again to make sure.
  if (process.env.NODE_ENV === "test") {
    // (Using direct CRUD operations since no user is supposed to exist in the freshly created database to pass to userService functions.)
    // Follow the order of creation for deletion.

    for (const M of creationOrder) {
      const { rows } = await crud.findRows(
        M,
        null,
        {}, // select all
        { authBypass: true, paranoid: true, include: [] }
      );

      for (const row of rows) {
        await crud.deleteRow(M, null, row.id, { authBypass: true });
      }
    }
  }
};
