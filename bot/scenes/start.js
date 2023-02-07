const {Scenes} = require("telegraf");
const {Users} = require("../../modeles/users");

const start = new Scenes.BaseScene("start");

start.enter(async ctx => {
    let user = await Users.findOne({user_id:ctx.from.id});
    if(!user) {
        user = await new Users({
            user_id:ctx.from.id,
            first_name:ctx.from.first_name
        }).save();
    }

    if(user && !user.isAdmin)
    return ctx.replyWithHTML(`<a href="tg://${user.user_id}">${user.first_name}</a> 😔 Afsuski siz hozirda @${ctx.botInfo.username} ga admin emassiz !`);
    return ctx.scene.enter("admin");
});

module.exports = start;