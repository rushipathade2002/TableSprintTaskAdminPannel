const User = require("../models/user_model");
const SubCategory = require("../models/subCategory-model");
const Category = require("../models/category-model");
const Product = require("../models/product-model");

const getAllCategory = async (req, res , next)=>{
    try {
        const categories = await Category.find({});
        if(!categories || categories.length === 0 ) {
            res.status(404).send({message:"categories not Found"});
        }
        res.status(200).json(categories)
    } catch (error) {
        console.log(error);
        next(error);
        
    }
}

const getAllSubCategory = async(req, res, next)=>{
    try {
        const subCategories = await SubCategory.find({});
        if(!subCategories || subCategories.length === 0 ){
            res.status(404).send({message:"categories not Found"});
        }
        res.status(200).json(subCategories)
    } catch (error) {
        next(error)
        console.log(error);
    }
}


const addCategory = async (req, res)=>{
    try {
        const { categoryName, categorySequence, status } = req.body;
        const image = `uploads/${req.file.filename}`;
        const addedCategory = await Category.create({ categoryName, categorySequence,status, image });
        if(addedCategory){
            res.status(201).json({message:"Category Added successfully",Category:addedCategory});
        }
    } catch (error) {
        res.status(404).json({message: "page not found"});
    }   
}


const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Category.findOne({_id:id});
        if(!data){
            res.status(404).send({message:"Category not Found"});
        }
        return res.status(200).json(data)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getSubCategoryById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await SubCategory.findById(id);
      if (!data) {
        return res.status(404).send({ message: "Category not Found" });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };


const updateCategoryById = async (req, res) => {
    try {
      const id = req.params.id;
      const userData = req.body;
      if (req.file) {
        userData.image = `uploads/${req.file.filename}`;
      }
      const updateCategory = await Category.updateOne({ _id: id }, { $set: userData });
      return res.status(200).json({ message: 'Category updated successfully', updateCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const updateProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const userData = req.body;
      if (req.file) {
        userData.image = `uploads/${req.file.filename}`;
      }
      const updateProduct = await Product.updateOne({ _id: id }, { $set: userData });
      return res.status(200).json({ message: 'Product updated successfully', updateProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  

  const updateSubCategoryById = async (req, res) => {
    try {
      const id = req.params.id;
      const userData = req.body;
      if (req.file) {
        userData.image = `uploads/${req.file.filename}`;
      }
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, userData, { new: true });
      return res.status(200).json({ message: 'Subcategory updated successfully', updatedSubCategory });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


//   subcategory 
const addSubCategory = async(req, res)=>{
    try {
        const { categoryName, subCategoryName, subCategorySequence, status } = req.body;
        let image = '';
        if (req.file) {
        image = `uploads/${req.file.filename}`;
        }
        const newSubCategory = {
            categoryName,
            subCategoryName,
            subCategorySequence,
            status,
            image
        };
        const addedSubCategory = await SubCategory.create(newSubCategory);
        if (addedSubCategory) {
        res.status(201).json({ message: "Sub-Category added successfully", subCategory: addedSubCategory });
        } else {
        res.status(400).json({ message: "Failed to add sub-category" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding subcategory' });
      }
}


// Product
const addProduct = async(req, res)=>{
    try {
        const { categoryName, subCategoryName, productName, status } = req.body;
        let image = '';
        if (req.file) {
            image = `uploads/${req.file.filename}`;
        }
        const newProduct = {
            categoryName,
            subCategoryName,
            productName,
            status,
            image
        };
        const addedProduct = await Product.create(newProduct);
        if (addedProduct) {
        res.status(201).json({ message: "Product added successfully", data: addedProduct });
        } else {
        res.status(400).json({ message: "Failed to add Product" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding Product' });
      }
}


// get all products
const getAllProducts = async (req, res )=>{
    try {
        const Products = await Product.find({});
        if(!Products || Products.length === 0 ){
            res.status(404).send({message:"Product not Found"});
        }
        res.status(200).json(Products)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findOne({_id:id});
        console.log(data)
        if(!data){
            res.status(404).send({message:"Product not Found"});
        }
        return res.status(200).json(data)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const deleteProductById =async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({_id: id})
        res.status(200).json({message: "Product Deleted Successfully"});
    } catch (error) {
        // next(error);
        console.error(error)
    }
}

// Category delete logic
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

const deleteSubCategoryById = async(req, res)=>{
    try {
        const id = req.params.id;
        await SubCategory.deleteOne({_id:id})
        res.status(200).json({message: "SubCategory Deleted Successfully"});
    } catch (error) {
        // next(error);
        console.error(error)
    }
}






module.exports = {
    getAllCategory, 
    getAllProducts,
    getAllSubCategory,
    getCategoryById,
    getProductById,
    getSubCategoryById,
    addCategory,
    addSubCategory,
    addProduct,
    deleteCategoryById,
    deleteProductById, 
    deleteSubCategoryById,
    updateProductById,
    updateCategoryById,
    updateSubCategoryById 
};