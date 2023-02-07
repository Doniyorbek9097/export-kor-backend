const {Telegraf, session} = require("telegraf");
const httpsProxyAgent = require("https-proxy-agent");
const {stage} = require("./scenes")
const bot = new Telegraf(process.env.BOT_TOKEN, 
// {
//     telegram: {
//         agent: httpsProxyAgent("http://127.0.0.1:64259")
//     }
// }
);

bot.use(session());
bot.use(stage.middleware());

bot.start(ctx => ctx.scene.enter("start"));

bot.launch();
 
module.exports = bot;