const {Schema, model} = require('mongoose')

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String
})

module.exports = model('Campground', CampgroundSchema)