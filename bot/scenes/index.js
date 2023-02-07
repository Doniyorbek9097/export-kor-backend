const {Scenes} = require("telegraf");

module.exports.stage = new Scenes.Stage([
  require("./start"),
  require("./register"),
  require("./admin")
]);
 