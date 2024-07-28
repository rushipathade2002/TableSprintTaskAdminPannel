const Contact = require("../models/contact_model");

const contactForm = async (req, res)=>{
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message:"message send Successfully"});
    } catch (error) {
        return res.status(200).json({message:"message not delivered"});
    }
}

module.exports = contactForm;