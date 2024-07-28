const express = require("express");
const multer = require("multer");
const path = require("path");
const {getAllCategory,getAllContacts, getUserById,updateUserById, deleteContactByID, deleteCategoryById, addCategory } = require("../controllers/admin-controller");
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

router.route("/save-category").post(authMiddleware,adminMiddleware, upload.single('image'), addCategory);
router.route("/categories").get(authMiddleware,adminMiddleware,  getAllCategory);
router.route("/category/delete/:id").delete(authMiddleware,adminMiddleware, deleteCategoryById);

router.route("/contacts").get(authMiddleware,adminMiddleware, getAllContacts);

router.route("/users/:id").get(authMiddleware,adminMiddleware, getUserById);

router.route("/users/update/:id").patch(authMiddleware,adminMiddleware, updateUserById);

router.route("/contact/delete/:id").delete(authMiddleware,adminMiddleware, deleteContactByID);


module.exports = router;