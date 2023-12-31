const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({

    name: {
        type: String,
        // required: [true, "name is required"],
        // minLength: [3, "name must be at least 3 characters long"]
    },
    image: {
        type: String,
        // required: [true, 'image is required']
    },
    commentary: {
        type: String,
        // required: [true, "commentary is required"],
        // maxLength: [300, "commentary must be under 300 characters"]
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    }, 
    designer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }, 
    // voters: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId, 
    //         ref: "User"
    //     }
    // ]
}, { timestamps: true })

const Design = mongoose.model('Design', DesignSchema);

module.exports = Design;
