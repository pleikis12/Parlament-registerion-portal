import express from 'express';
import mongoose from 'mongoose';

const app = express();

await mongoose.connect('mongodb://localhost:27017/pirma_duombaze');

// console.log(await user.find())

app.get('/', async (req, res) => {
    const user = mongoose.model('User', {
        name: String, 
        last_name: String,
        email: String,
        password: String
    });

    // console.log(await user.find())
    res.send(await user.find());
});

app.listen(3000);
