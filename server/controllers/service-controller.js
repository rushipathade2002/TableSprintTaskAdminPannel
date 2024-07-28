 const Service = require("../models/service-model");


const services = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response){
            res.status(404).send({message:"Data not Found"});
        }
        res.status(200).send({message:response});
    } catch (error) {
        console.log("services ",error);
    }
}

module.exports = services;