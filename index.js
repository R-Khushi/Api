require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use("/users", userRouter);
app.use("/note", noteRouter);
app.use(cors());

app.get("/",(req,res) => {
    res.send(" NotesApi ");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    const server = app.listen(PORT,() => {
        console.log('listening on port on:'+PORT);
    });
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use. Try another port.`);
        } else {
            console.error('Server error:', error);
        }
    });
})
.catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
})
