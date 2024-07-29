const express = require("express");
const multer = require("multer");
const path = require("path");
const {getAllCategory,getAllSubCategory,getAllContacts, getCategoryById,updateCategoryById, deleteContactByID, deleteCategoryById, deleteSubCategoryById, addCategory, addSubCategory } = require("../controllers/admin-controller");
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
router.route("/subcategory/delete/:id").delete(authMiddleware, adminMiddleware, deleteSubCategoryById)

router.route("/contacts").get(authMiddleware,adminMiddleware, getAllContacts);



router.route("/contact/delete/:id").delete(authMiddleware,adminMiddleware, deleteContactByID);


module.exports = router;