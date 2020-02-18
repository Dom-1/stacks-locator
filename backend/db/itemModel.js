const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/locator', { useNewUrlParser: true, useUnifiedTopology: true});

var locationSchema = Schema({
    coll: String,
    shelvingUnit: String,
    callNumber: String,
    CoordX: Number,
    CoordY: Number
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
