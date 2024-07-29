const express = require("express");
const multer = require("multer");
const path = require("path");
const { getAllCategory,getAllSubCategory, getAllProducts, addProduct, getProductById, 
    getCategoryById, updateCategoryById, getSubCategoryById, deleteProductById, 
    deleteCategoryById, deleteSubCategoryById, addCategory, addSubCategory, 
    updateProductById, updateSubCategoryById } = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null, "public/uploads")
    },
    filename:(req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage:storage,
})



// Category API
router.route("/save-category").post(authMiddleware,adminMiddleware, upload.single('image'), addCategory);
router.route("/categories").get(authMiddleware,adminMiddleware,  getAllCategory);
router.route("/category/delete/:id").delete(authMiddleware,adminMiddleware, deleteCategoryById);
router.route("/category/:id").get(authMiddleware,adminMiddleware, getCategoryById);
router.route("/category/update/:id").patch(authMiddleware,adminMiddleware,upload.single('image'), updateCategoryById);



// SubCategory API
router.route("/save-subcategory").post(authMiddleware,adminMiddleware, upload.single('image'), addSubCategory);
router.route("/subCategories").get(authMiddleware,adminMiddleware,  getAllSubCategory);
router.route("/subcategory/delete/:id").delete(authMiddleware, adminMiddleware, deleteSubCategoryById);
router.route("/subCategory/:id").get(authMiddleware, adminMiddleware, getSubCategoryById );
router.route("/subCategory/update/:id").patch(authMiddleware, adminMiddleware, upload.single('image'), updateSubCategoryById);


// Product API
router.route("/save-product").post(authMiddleware,adminMiddleware,upload.single('image'), addProduct);
router.route("/products").get(authMiddleware,adminMiddleware,  getAllProducts);
router.route("/product/delete/:id").delete(authMiddleware, adminMiddleware, deleteProductById);
router.route("/product/:id").get(authMiddleware, adminMiddleware, getProductById);
router.route("/product/update/:id").patch(authMiddleware, adminMiddleware, upload.single('image'), updateProductById);





module.exports = router;