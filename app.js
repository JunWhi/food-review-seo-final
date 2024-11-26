const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


// Suppress the deprecation warning
mongoose.set('strictQuery', true);

// Your mongoose.connect code here


// Clear any cached models to prevent OverwriteModelError
mongoose.models = {};
mongoose.modelSchemas = {};

// Import Models
const Business = require('./models/business');
const Review = require('./models/review');

// Database Connection

const url = 'mongodb+srv://whi:whi123@cluster-food-search.8hbkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-food-search';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
// Home Page
app.get('/', (req, res) => {
    res.render('home')
});

// Display all businesses
app.get('/business', async (req, res) => {
    try {
        const businesses = await Business.find({});
        res.render('businesses/index', { businesses }); // Pass 'businesses' to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching businesses.");
    }
});

// New Business Form
app.get('/business/new', (req, res) => {
    res.render('businesses/new');
});

// Add a new business
app.post('/business', async (req, res) => {
    const newBusiness = new Business(req.body.business);
    await newBusiness.save();
    //res.redirect('/business');
    res.redirect(`/business/${newBusiness._id}`);
});

// Show a specific business with its reviews
app.get('/business/:id', async (req, res) => {
    const { id } = req.params;
    const business = await Business.findById(id).populate('reviews'); // Populates reviews
    res.render('businesses/show', { business });
});

// Update Business Form
app.get('/business/:id/update', async (req, res) => {
    const { id } = req.params;
    const business = await Business.findById(id);
    if (!business) {
        return res.status(404).send('Business not found');
    }
    res.render('businesses/update', { business });
});

// Update Business Details
app.put('/business/:id', async (req, res) => {
    const { id } = req.params;
    const updatedBusiness = await Business.findByIdAndUpdate(id, req.body.business, { new: true });
    res.redirect(`/business/${updatedBusiness._id}`);
});

// Delete a Business
app.delete('/business/:id', async (req, res) => {
    const { id } = req.params;
    await Business.findByIdAndDelete(id); 
    res.redirect('/business'); 
});

// Add a Review
app.post('/business/:id/reviews', async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findById(id).populate('reviews');
        // const business = await Business.findById(id);
        const review = new Review(req.body.review);
        business.reviews.push(review);
        await review.save();

        // Recalculate average rating
        const ratings = business.reviews.map((r) => r.rating);
        const avgRating = ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
        business.averageRating = parseFloat(avgRating.toFixed(2));

        await business.save();      
        res.redirect(`/business/${business._id}`);
    } catch (error) {
        console.error(error);
        res.redirect('/business'); // Redirect to business page on error
    }
});

// Delete a Review
app.delete('/business/:id/reviews/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    
    const business = await Business.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }, { new: true }).populate('reviews');
    await Review.findByIdAndDelete(reviewId);
    
    // Recalculate average rating after deleting a review
    if (business.reviews.length > 0) {
        const ratings = business.reviews.map((r) => r.rating);
        const avgRating = ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
        business.averageRating = parseFloat(avgRating.toFixed(2));
    } else {
        business.averageRating = 0; // No reviews left
    }

    await business.save();
    res.redirect(`/business/${id}`);
});

// Start the Server
app.listen(7000, () => {
    console.log('Serving on port 3000');
});
