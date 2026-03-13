const mongoose = require("mongoose");
require("dotenv").config();

// ------------------- User Schema -------------------
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});
// Need to handle model already existing if we require it, but here we just redefine or connect.
const User = mongoose.models.User || mongoose.model("User", userSchema);

async function deleteData() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected. Deleting all users...");
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users from the database.`);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

deleteData();
