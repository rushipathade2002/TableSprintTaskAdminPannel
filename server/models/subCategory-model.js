const {Schema, model } = require ('mongoose');

const subCategorySchema = new Schema({
    categoryName:{type:String, required:true},
    subCategoryName:{type:String, required:true},
    subCategorySequence:{type:String, required:true},
    status:{type:String, required:true},
    image:{type:String, required:true},
},
{
    timestamps:true,
});

// create a model or a Collection
const SubCategory = new model('SubCategory', subCategorySchema);

module.exports= SubCategory;