const express = require('express');
var base62 = require("base62/lib/ascii");
const URL = require("./models/urls")
const moment = require("moment")
const router = new express.Router();
let counter = 0

router.get('/check/:id',async(req,res) => {
    // const reqBody = req.body
    try{
        
        let urlID = base62.encode(counter)
        const url = await new URL({ realURL: req.params.id , id: urlID })
        const foundUrl = await URL.findOne({ realURL: req.params.id }).exec();
        if(foundUrl){
            await URL.findOneAndUpdate({ realURL: req.params.id } , { updatedAt: new Date })
            res.status(200).send(foundUrl.id)
        }
        else if(!foundUrl){
            let yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1);
            let firstExpired = await URL.findOneAndUpdate({ updatedAt: {$lt: yesterday}  } , { realURL: req.params.id } )
            if(firstExpired === null){
                try{
                    await url.save()
                }
                catch(err){
                    console.log(err)
                }
                counter++
                res.status(201).send(`${urlID}`)
            }
            else
                {
                    res.status(200).send(firstExpired.id)
                }
        }
    }
    catch(err){
        res.status(400).send(err)
    }
})


router.get('/:myid', async(req,res) => {
    try{
        // const url = await new URL({ realURL: req.params.id , id: urlID })
        const foundUrl = await URL.findOne({ id: req.params.myid }).exec();

        if(foundUrl){
            res.status(200).send(foundUrl.realURL)
        }
        else{
            throw new Error("page not found")
        }
    }
    catch(err){
        res.status(404).send(err)
    }
})

module.exports = router