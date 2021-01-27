const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    realURL: {
        type:String,
        trim:true
    },
    id:{
        type:String,
        trim:true
    }
},
{
    timestamps: true
})

urlSchema.methods.toJSON = function(){
    const url = this
    const urlObject = url.toObject()
    return urlObject
}
const URL = mongoose.model('URL',urlSchema)
module.exports = URL