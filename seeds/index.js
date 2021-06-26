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
            title: `${randomElement(descriptors)} ${randomElement(places)}`,
            image: 'https://source.unsplash.com/collection/483251/1600x900',
            price: randomInteger(100) + 30,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut aperiam ducimus, et nesciunt harum rem culpa nostrum perspiciatis eveniet neque!'
        })
        await camp.save()
    }
}

const randomInteger = (integer) => Math.floor( Math.random() * integer)
const randomElement = ( arr ) => arr[  randomInteger(arr.length) ]


seedDB()
    .then( () => {
        mongoose.connection.close()
    })