const asyncHandler = require("express-async-handler")
const Contact = require("../models/contacts")
// @disc get all contacts
// @api get /api/contacts
// @ acess private
  
const getcontacts = asyncHandler(async(req,res)=>{
    
    const contacts = await Contact.find({user_id:req.user.id});

    res.status(200).json(contacts)
})

// @disc create new contacts
// @api post /api/contacts
// @ acess private
// eN6ddkvwNDjctfOQ
const createContact = asyncHandler(async(req,res)=>{
    
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are manadatory!");
    }
    const contact = await  Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
    res.status(201).json(contact)
})
// @disc get  contact
// @api get /api/contacts/:id
// @ acess private

const getcontact = asyncHandler(async(req,res)=>{
     const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found ")
    }
    res.status(200).json(contact)
})
// @disc update contact
// @api put /api/contacts/:id
// @ acess private

const updatecontact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    // res.json({message:"hii"});
           if(!contact){
            res.status(404);
            throw new Error("contact not found");
           }
           if(contact.user_id.toString()!==req.user.user_id){
            res.status(401);
            throw new Error("User dont have permission to update other user contact")
        }
        const upDatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new:true}
    )

    res.status(200).json(upDatedContact)
})


// @disc delete contact
// @api delete /api/contacts/:id
// @ acess private,next
const deletecontact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
           if(!contact){
            res.status(404);
            throw new Error("contact not found");
           }
           if(contact.user_id.toString()!==req.user.user_id){
            res.status(401);
            throw new Error("User dont have permission to remove another user contact")
           }
        await Contact.deleteOne({_id:req.params.id});   
    res.status(200).json(contact)
})

module.exports={getcontacts,createContact,getcontact,updatecontact,deletecontact}