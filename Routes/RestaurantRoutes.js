const express = require('express');
const restModel = require('../restaurants');
const app = express();

app.get('/seed',async (req, res) => {
    try{
        await restModel.insertMany(
            [{
                "name":"Ichicki Ramen",
                "cuisines":"Japanese",
                "city":"North York"
            },
            {
                "name":"Red Hook Food Corp",
                "cuisines":"delicatessen",
                "city":"New York"
            },
            {
                "name":"Donburi",
                "cuisines":"Japanese",
                "city":"Toronto"
            },
            {
                "name":"Philips Bakery",
                "cuisines":"Bakery",
                "city":"Vaughan"
            },
            {
                "name":"Vivo",
                "cuisines":"Italian",
                "city":"Vaughan"
            },
            {
                "name":"Panera Bread",
                "cuisines":"Bakery",
                "city":"Seattle"
            },
            {
                "name":"Druxys Famous Deli",
                "cuisines":"delicatessen",
                "city":"Toronto"
            }]
        )
        res.send(await restModel.find({}))
    }catch(err){
        res.status(500).send({error: err.toString()})
    }
})


app.get('/restaurants', async (req, res) => {
    const restaurants = await restModel.find({});

    try{
        console.log(restaurants[0].name)
        res.status(200).send(restaurants);
    }catch(err){
        res.status(500).send(err)
    }
})




app.get('/restaurants/cuisines/:cuisine',async(req,res) => {
    const cuisine = req.params.cuisine
    const restaurants = await restModel.getCuisine(cuisine);

    try{
        if(restaurants.length != 0){
            res.send(restaurants)
        }else{
            res.send(JSON.stringify({status:false, message: "No data found"}))
        }
    }catch(err){
        res.status(500).send(err);
    }
});

app.get('/restaurants/Delicatessen', async (req,res) => {
    const restaurants = await restModel.find({cuisines: 'delicatessen', city: {$ne:'New York'}})

    try{
        res.send(restaurants)
    }catch(err){
        res.status(500).send(err);
    }
})
 

app.post('/restaurants', async (req, res) => {
    console.log(req.body)
    const restaurants = new restModel(req.body);

    try{
        await restaurants.save((err) =>{
            if(err){
                res.send(err)
            }else{
                res.send(restaurants);
            }
        });
    }catch(err){
        res.status(500).send(err);
    }
})


module.exports = app
