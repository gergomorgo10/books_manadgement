const express = require("express");
const db = require("../db/db");
const { books } = require("../db/schema");
const { eq } = require("drizzle-orm");
const renderErrorHandler = require("../utilities/renderErrorHandler");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const entries = await db.select().from(books);

        return res.status(200).json(entries)
    }
    catch (error){
        return renderErrorHandler(res, error);

    }
});

router.get("/:id", async (req, res)=>{
    try{
        const [entry] = await db.select().from(books).where(eq(books.id, +req.params.id));

        if(!entry){
            return res.status(404).json({
                message: "emtalalt :c",
            });
        }
        return res.status(200).json(entry)
    }
    catch (error){
        return renderErrorHandler(res, error);

    }
});

router.post("/", async (req, res) => {
    try{
        const {title, author, year} = req.body;

        if(!title){
            return res.status(404).json({
                message: "kene title",
            });
        }
        if(!author){
            return res.status(404).json({
                message: "kene author",
            });
        }
        if(year === undefined || year > new Date().getFullYear){
            return res.status(404).json({
                message: "kene ev",
            });
        }

        await db.insert(books).values({
            title:title,
            author:author,
            year:year,
        });

        return res.status(201).json({
            message:"sikerult kesziteni koszi puszi",
        });
    }
    catch (error){
        return renderErrorHandler(res, error);
    }
})

module.exports = router