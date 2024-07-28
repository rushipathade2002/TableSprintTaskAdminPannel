const { Schema, model} = require("mongoose");

const categorySchema = new Schema({
    categoryName:{type:String, required:true},
    categorySequence:{type:String, required:true},
    status:{type:String, required:true},
    image:{type:String, required:true},
},
{
    timestamps:true,
});

const Category = new model ("Category", categorySchema);

module.exports = Category;