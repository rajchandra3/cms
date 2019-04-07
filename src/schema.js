var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
    title:String, //movie title
    releasesOn:String, //release data
    shows:[{ // shows 
        starts:String,
        ends:String,
        number_of_tickets:{type:String,default:500},
        price:{type:Number,default:220}
    }]
});

module.exports = mongoose.model('show', showSchema);
