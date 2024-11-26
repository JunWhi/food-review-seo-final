const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for Business model
const BusinessSchema = new Schema({
    title: String,                 // Business title
    description: String,           // Business description
    location: String,              // Business location
    reviews: [                     // Array of associated review ID
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    averageRating: {               // Average rating for the business
        type: Number,
        default: 0                 // Default rating is 0
    }
});

// Export the Business model
module.exports = mongoose.model('Business', BusinessSchema);
