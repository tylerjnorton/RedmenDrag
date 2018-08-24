const fs = require("fs");
const firebaseTools = require("firebase-tools");

firebaseTools.setup.web().then(config => {
  fs.writeFileSync(
    "static/__init.js",
    `window.firebaseConfig = ${JSON.stringify(config)};`
  );
});
