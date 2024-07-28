const User = require("../models/user_model");
const Contact = require("../models/contact_model");
const Category = require("../models/category-model");

const getAllCategory = async (req, res )=>{
    try {
        const categories = await Category.find({});
        console.log(categories)
        if(!categories || categories.length === 0 ) {
            res.status(404).send({message:"categories not Found"});
        }
        res.status(200).json(categories)
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const addCategory = async (req, res)=>{
    try {
        const { categoryName, categorySequence, status } = req.body;
        const image = req.file.filename;
        const addedCategory = await Category.create({ categoryName, categorySequence,status, image });
        if(addedCategory){
            res.status(201).json({message:"Category Added successfully",Category:addedCategory});
        }
    } catch (error) {
        res.status(404).json({message: "page not found"});
    }   
}


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id},{ password : 0 });
        console.log(data)
        if(!data){
            res.status(404).send({message:"User not Found"});
        }
        return res.status(200).json(data)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const updateUserById = async (req, res)=>{
        try {
            const id = req.params.id;
            const userData = req.body;
            console.log(userData);
            const updateUser = await User.updateOne({_id:id},{$set:userData,});
            return res.status(200).json({updateUser});
        } catch (error) {
            // next(error);
            console.log(error)
        }
}

const getAllContacts = async (req, res )=>{
    try {
        const contacts = await Contact.find();
        console.log(contacts)
        if(!contacts || contacts.length === 0 ) {
            res.status(404).send({message:"Contacts not Found"});
        }
        res.status(200).json(contacts)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const deleteContactByID =async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id})
        res.status(200).json({message: "Contact Deleted Successfully"});

    } catch (error) {
        // next(error);
        console.error(error)
    }
}

// user delete logic
const deleteCategoryById= async(req, res)=>{
    try {
        const id = req.params.id;
        await Category.deleteOne({_id:id})
        res.status(200).json({message: "Category Deleted Successfully"});
        
    } catch (error) {
        // next(error);
        console.error(error)
    }
}




module.exports = {
    getAllCategory, 
    getAllContacts,
    getUserById,
    updateUserById, 
    deleteContactByID, 
    deleteCategoryById,
    addCategory
};