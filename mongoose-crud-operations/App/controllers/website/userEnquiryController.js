const enquireModel = require("../../models/enquiry.model");

let enquiryInsert=(req, res)=>{
    let { name, email, phone } = req.body;
    let enquiry = new enquireModel({
        name: name,
        email: email,
        phone: phone
    });
    enquiry.save().then(() => {
        res.send({ status: 1, message: "Enquiry Data Saved successfully" });
    }).catch((err) => {
        res.send({ status: 0, message: "Error while saving enquiry", error: err });
    });
};

let enquiryList=async(req, res)=>{
    let enquiryList = await enquireModel.find();
    res.status(200).json({ status: 1, message: "Enquiry List", data: enquiryList })
};

let enquiryDelete=async(req,res)=>{
    try {
        let enquiryId = req.params.id;
        let deletdEnquiry = await enquireModel.findByIdAndDelete(enquiryId);
        if (!deletdEnquiry) {
            return res.status(400).send({
                status: 0,
                message: `No enquiry found with Id: ${enquiryId}`
            })
        }

        res.send({
            status: 1,
            message: `Deleted enquiry with ID: ${enquiryId} successfully`
        });
    } catch (error) {
        res.status(500).send({
            status: 0,
            message: "Error while deleting enquiry",
            error
        });
    }
};

let enquiryUpdate=async(req, res)=>{
    let enquireId=req.params.id;
    let {name, email, phone}=req.body;
    let updateObj={
        name:name, 
        email:email,
        phone:phone
    };
    let updatreRsponse=await enquireModel.updateOne({_id:enquiryId}, updateObj)

    res.send({status:1, message:`Enquiry updated successfully.`,id:enquiryId})
}

module.exports={enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate}