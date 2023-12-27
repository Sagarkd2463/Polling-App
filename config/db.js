const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1/pusherpoll')
.then(() => console.log('MongoDB Connected...'))
.catch(() => console.log(err));