// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON
gapp.use(cors()); // Enable CORS for frontend communication

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/enquiries", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Define a Schema for form data
const enquirySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    city: String,
    course: String
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

// API Endpoint to handle form submission
app.post("/submit", async (req, res) => {
    try {
        const newEnquiry = new Enquiry(req.body);
        await newEnquiry.save();
        res.status(201).json({ message: "Form data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save data" });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




