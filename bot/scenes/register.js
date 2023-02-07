const {Scenes, Markup} = require("telegraf");

const register = new Scenes.WizardScene(
"register",
async ctx => {
    let txt = `Ism familyangizni kiriting`;
    ctx.replyWithHTML(txt);
    return ctx.wizard.next();
},

async ctx => {
ctx.wizard.state.user = {};
ctx.wizard.state.user.fullname = ctx.message?.text;
let txt = `Telefon raqamingizni yuboring.`;
return ctx.replyWithHTML(txt, {
    ...Markup.keyboard([
        Markup.button.contactRequest("📞 Telefon raqam yuborish")
    ]).resize()
});
}
);

register.on("contact", ctx => {
    ctx.wizard.state.user.phone_number = ctx.message.contact.phone_number;
    const { user } = ctx.wizard.state;
})


module.exports = register;