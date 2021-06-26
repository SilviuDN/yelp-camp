const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
// const model = require('./models/campground')
const Campground = require('./models/campground')

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


const app = express()


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const allCampgrounds = await Campground.find({})
    res.render('campgrounds/index', {allCampgrounds})
})


app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req, res) => {
    let {campground} = req.body
    campground = new Campground(campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
    // res.send(campground)
})

app.get('/campgrounds/:id', async (req, res) => {
    const id = req.params.id
    const campground = await Campground.findById(id)
    res.render('campgrounds/show', {campground})
})

app.get('/campgrounds/:id/edit', async(req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit', {campground})
    // res.send(campground.title)
})

//****************************THIS SHOULD BE PUT REQUEST - 411 / 0430*/
app.post('/campgrounds/:id/edit', async (req, res) => {
    const {id} = req.params
    let {campground} = req.body
    // res.send(campground)
    campground = await Campground.findByIdAndUpdate(id, campground, {new: true})
    res.render('campgrounds/show', {campground})
    // res.send(editedCampground)
})

//****************************THIS SHOULD BE DELETE REQUEST - 411 / 0430*/
app.post('/campgrounds/:id/delete', async (req, res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)

    // const allCampgrounds = await Campground.find({})
    // res.render('campgrounds/index', {allCampgrounds})

    res.redirect('/campgrounds')

})







app.listen(3000, () => {
    console.log('Listening on port 3000')
})