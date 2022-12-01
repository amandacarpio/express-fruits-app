const express = require('express')
const Fruit = require('../models/fruits')

///// Create Router - variable to attach routes

const router = express.Router() // will have all routes attached to it

//// Actual routes below

/////// ROUTES
router.get('/', (req, res) => {
    res.send("Server is doing what it should be doing")
})

router.get('/fruits/seed', (req, res) => {

    // define data we want to put in the database
    const startingFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]

    // DELETE ALL FRUITS
    Fruit.deleteMany({}, (err, data) => {
    // Create new fruits once old fruits are deleted
    Fruit.create(startingFruits, (err, createdFruits) => {
        res.json(createdFruits)
    })
    })

})

router.get('/fruits', (req, res) => {

    // Get all fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        // res.json(fruits)
        res.render('fruits/index.ejs', { fruits })
    })
    .catch(err => console.log(err))
})


//Create
router.post('/fruits', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body, (err, createdFruits) => {
        console.log(err)
        res.redirect('/fruits')
    })
})

router.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

// Edit Route
router.get('/fruits/:id/edit', (req, res) => {

    const id = req.params.id
    //find the fruit and send it to the edit.ejs to prepopulate the form

    Fruit.findById(id, (err, foundFruit) => {
        // res.json(foundFruit)
        res.render('fruits/edit.ejs', { fruit: foundFruit })
    })

})

router.put('/fruits/:id', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedFruit) => {
        res.redirect(`/fruits/${req.params.id}`)
    }) // grab what we're updating and then req.body is data that is there 
    // new is basically saying "yes this is new"
})


router.get('/fruits/:id', (req, res) => {
    //Go and get fruit from the database
    Fruit.findById(req.params.id)
    .then((fruit) => {
        // res.json(fruit)
        res.render('fruits/show.ejs', { fruit })
    })
})

router.delete('/fruits/:id', (req, res) => {

    Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
        console.log(err, deletedFruit)
        res.redirect('/fruits')
    })
})



///// export this router to use in other files
module.exports = router