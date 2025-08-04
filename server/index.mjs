import app from "./app.mjs";
import pkg from "../package.json" with { type: 'json' };

const port = process.env.PORT || 3101;
const host = '0.0.0.0';

export const server = app.listen(port, host, () => {
  console.log(
    `${pkg.description} ${pkg.version} ${process.env.NODE_ENV || ""}`
  );
  console.log(`Listening on http://${host}:${port}`);
});
