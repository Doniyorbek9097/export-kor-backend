const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Products, validate } = require("../modeles/products")
const upload = require("../middlewares/upload");

router.get("/products", async (req, res) => {
    try {
        let length = await Products.countDocuments();

        let page = parseInt(req.query.page) - 1 || 0;
        let limit = parseInt(req.query.limit) || 10;
        let search = req.query.search || "";

        const products = await Products.find({
            name: { $regex: search, $options: "i" }
        })
            .skip(page * limit)
            .limit(limit)


        return res.json({
            total_page: Math.ceil(length/limit),
            page: page + 1,
            limit: limit,
            sts: 200,
            msg: "success!",
            result: products
        });
    } catch (err) {
        console.log(err.message)
    }
});


router.get("/product-one/:id", async (req,res) => {
    const isObjectId = mongoose.isObjectIdOrHexString(req.params.id);
    if (!isObjectId) return res.json({ msg: "error id not found!" })
    const product = await Products.findById(req.params.id);
    return res.json({sts:200, msg:"success", result:product})
});


router.put("/product-update/:id", async (req,res)=> {
    const isObjectId = mongoose.isObjectIdOrHexString(req.params.id);
    if (!isObjectId) return res.json({ msg: "error id not found!" })
    const product = await Products.findByIdAndUpdate(req.params.id, req.body);
    return res.json({sts:200, msg:"success updated!"})
});




router.get("/search-name/:name", async (req, res) => {
    try {
        const products = await Products.findOne({ name: req.params.name })
        .populate("category", "-_id");

        if (!products) return res.json({ sts: 404, msg: "products not found" });
        return res.json({ sts: 200, msg: "success found!", result: products });

    } catch (err) {
        res.send(err.message)
    }
});


router.get("/category/:name", async (req, res) => {
    let products = await Products.find({category:req.params.name});
    console.log(products)
    if (!products && products.result.length == 0) return res.json({ sts: 404, msg: "not found" })
    return res.json({ sts: 200, msg: "success found!", result: products })

});


router.post("/product-add", async (req, res) => {
let uploadImage = upload.array("images",4);

    uploadImage(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            if(err.code === "LIMIT_UNEXPECTED_FILE") return res.json({sts:400, msg:"Rasm 4ta dan oshlmasligini kerak!"});
            if(err.code === "LIMIT_FILE_SIZE") return res.json({sts:400, msg:"Rasm 1MB dan oshlmasligini kerak!"});
            return res.json({error:err.message});
        }else if(err) {
            if(err.code == "INCCORECT_FILE_TYPE") {
                return res.json({sts:400, msg:"Iltimos rasm yuboring ('jpg, png, jpeg, gif') formatda"});
            }
        }

    try {
        const {error} = validate(req.body);
        if(error) {
            if (req.files) {
                req.files.forEach(async file => {
                    let filename = file.filename;
                    let filePath = path.join(__dirname, `../uploads/images/${filename}`);
                    await fs.unlink(filePath, (err) => console.log(err?.message));
                })
            }
            return res.json({msg:error.details[0].message})
        }

        const product = await Products.findOne({ name: req.body.name });
            console.log(req.body)
			if (product) {
            if (req.files) {
                req.files.forEach(async file => {
                    let filename = file.filename;
                    let filePath = path.join(__dirname, `../uploads/images/${filename}`);
                    await fs.unlink(filePath, (err) => err ? console.log(err) : null);
                })
            }
            return res.json({ sts: 200, msg: "such a product exists!" })
        }
        const savedProduct = await new Products({
            ...req.body,
            images: req.files.map(file => {
                return `${req.protocol}://${req.hostname}/${file.destination}/${file.filename}`;
            })
        }).save();

        return res.json({ sts: 201, msg: "success added!", result: savedProduct })
    } catch (err) {
        console.log(err.code)
    }

})

});



router.delete("/product-delete/:id", async (req, res) => {
    try {
        const isObjectId = mongoose.isObjectIdOrHexString(req.params.id);
        if (!isObjectId) return res.json({ msg: "error id not found!" })
        const deleted = await Products.findByIdAndRemove(req.params.id);
        if (!deleted) return res.json({ msg: "error id not found!" })
        const filenames = deleted.images.map((image) => image.split("/").pop());
        filenames.forEach(async filename => {
            await fs.unlink(path.join(__dirname, `../uploads/images/${filename}`), (err) => err ? console.log(err) : null);
        });

     return  res.json({ status: 200, msg: "success deleted!" })

    } catch (error) {

    }
})



module.exports = router;