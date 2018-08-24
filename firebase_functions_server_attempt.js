const functions = require("firebase-functions");
const next = require("next");

const config = functions.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log("CONFIG::::::::", config);
  return app.prepare().then(() => handle(req, res));
});
