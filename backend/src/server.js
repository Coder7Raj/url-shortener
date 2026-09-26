const app = require("./app");
const env = require("./config/env.js");

app.listen(env.port, "0.0.0.0", () => {
  console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
});
