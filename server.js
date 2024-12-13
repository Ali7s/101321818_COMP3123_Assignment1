const express = require('express');
const mongoose = require('mongoose');
const app = express()
const userRouter = require('./routes/userRoutes')
const employeeRouter = require('./routes/employeeRoutes')



// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/emp/employees', employeeRouter)

// Default Route
app.get('/', (req, res) => {
    res.send("Ali Mousavi Roozbahani 101321818");
});

const SERVER_PORT = process.env.PORT;



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.error("Connection failed!", err);
    });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});