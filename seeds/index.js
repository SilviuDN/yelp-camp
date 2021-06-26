// const express = require('express')
// const path = require('path')
const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind( console, 'connection error: '))
db.once('open', () => {
    console.log('Database connected on port 27017.')
})


const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i=0; i<50; i++){
        const city = randomElement(cities)
        const camp = new Campground({
            location: `${city.city}, ${city.state}`,
            title: `${randomElement(descriptors)} ${randomElement(places)}`
        })
        await camp.save()
    }
}

const randomElement = ( arr ) => arr[ Math.floor( Math.random() * arr.length) ]


seedDB()
    .then( () => {
        mongoose.connection.close()
    })