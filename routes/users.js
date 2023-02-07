const router = require("express").Router();
const {Users, validate} = require("../modeles/users"); 
const bot = require("../bot/bot");

router.get("/users",  async(req,res)=> {  
   const users = await Users.find();
   res.json(users)

});

router.post("/client/info", async(req,res) => {
   console.log(req.body)
    const {user, product} = req.body;
    let txt = `<b>${product.name}</b>\n\n<i>${product.discription}</i>\n\n<b>Narxi:</b>${product.price}\n\n`;
      txt += `<b>Client info:</b>\nIsm: ${user.first_name}\nFamilya: ${user.last_name}\nTel: ${user.phone_number}`;
    bot.telegram.sendPhoto(process.env.ADMIN, {url:product.images[0]}, {
      parse_mode:"HTML",
      caption:txt
   });
     return res.json({sts:200, msg:"success"});
  
});








module.exports = router;
