const express =  require('express')
const mongoose = require('mongoose');
const restRouter = require('./Routes/RestaurantRoutes.js');

const app = express();
app.use('/',express.json());

mongoose.connect('mongodb+srv://RuzzelO:pieguy123@cluster0.7fqav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(restRouter);

app.listen(8093, () => { console.log('Server is running...')});