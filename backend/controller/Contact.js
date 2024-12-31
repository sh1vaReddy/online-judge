import { trycatchmethod } from "../middleware/trycatchmethod.js";
import {ContactModel} from '../model/ContactSchema.js';

export const CreateConatct=trycatchmethod(async(req,res,next)=>{
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return next(new ErrorHandler("All fields are required", 400));
    }
  
    const newContact = await ContactModel.create({ name, email, message });
  
    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you soon.",
      newContact,
    });
  })


  export const GetAllContactlist = trycatchmethod(async (req, res, next) => {
    const contacts = await ContactModel.find();
    
    if (!contacts) {
      return next(new Error("No contacts found"));
    }
    
    res.status(200).json({
      success: true,
      data: contacts,
    });
  });


  export const GetContactById = trycatchmethod(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const contact = await ContactModel.findById(id);
  
    if (!contact) {
      return next(new Error(`No contact found with ID: ${id}`));
    }
  
    res.status(200).json({
      success: true,
      data: contact,
    });
  });



  export const UpdateContactById = trycatchmethod(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
  

    if (!['Pending', 'Resolved'].includes(status)) {
      return next(new Error('Invalid status value'));
    }
  
    const contact = await ContactModel.findByIdAndUpdate(id, { status }, {
      new: true,
      runValidators: true, 
    });
  
    if (!contact) {
      return next(new Error(`No contact found with ID: ${id}`));
    }
  
    res.status(200).json({
      success: true,
      data: contact,
    });
  });


  export const DeleteContactById = trycatchmethod(async (req, res, next) => {
    const { id } = req.params;
  
    const contact = await ContactModel.findByIdAndDelete(id);
  
    if (!contact) {
      return next(new Error(`No contact found with ID: ${id}`));
    }
  
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  });