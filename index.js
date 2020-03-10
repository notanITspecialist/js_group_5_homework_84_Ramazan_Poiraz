const express = require('express');
const mongoose = require('mongoose');

const user = require('./app/user');
const tasks = require('./app/tasks');

const app = express();
const host = 8000;
app.use(express.json());

const init = async () => {
    await mongoose.connect('mongodb://localhost/todo', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });

    app.use('/user', user);
    app.use('/tasks', tasks);

    app.listen(host, () => console.log(`Server start on ${host} host`));
};

init().catch(error => console.log(error));