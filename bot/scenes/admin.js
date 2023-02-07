const {Scenes} = require("telegraf");

const admin = new Scenes.BaseScene("admin");

admin.enter(async ctx => {
 let txt = `Assalomu aleykum <a href="tg://${ctx.from.username}">${ctx.from.first_name}</a> Siz adminsiz !`;
 ctx.replyWithHTML(txt);
});

module.exports = admin;