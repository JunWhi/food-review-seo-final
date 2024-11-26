const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Business = require('../models/business');

// Database connection URL
const url = 'mongodb+srv://wchang15:UC252SzLuKH85KHU@cluster0.dzz0w.mongodb.net/yelpclone?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Handle database connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Function to pick a random element from an array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Seed the database with random businesses
const seedDB = async () => {
    await Business.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const business = new Business({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await business.save(); // Save the business to the database
    }
}

// Run the seed function and close the database connection
seedDB().then(() => {
    mongoose.connection.close();  // Close the connection after seeding
})
