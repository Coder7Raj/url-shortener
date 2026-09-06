const app = require("./app");
const env = require("./config/env.js");

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
});
