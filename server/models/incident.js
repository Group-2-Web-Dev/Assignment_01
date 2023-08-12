let mongoose = require('mongoose');

//create a model class
let incidentModel = mongoose.Schema({
    counter: String,
    incidentNumber: String,
    description: String,
    priority: String,
    customerName: String,
    status:String,
    lastUpdateTime: String,
    duration:Number,
    resolution:String
},
{
    collection: 'incidents'
});

module.exports = mongoose.model('Incident', incidentModel);