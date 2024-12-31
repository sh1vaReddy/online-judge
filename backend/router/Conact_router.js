import express from "express";
const router = express.Router();
import {CreateConatct, DeleteContactById, GetAllContactlist, GetContactById, UpdateContactById} from '../controller/Contact.js'
import { isAuthenticated, authoriesrole } from "../middleware/auth.js";

router.post('/conatct',isAuthenticated,CreateConatct);
router.get('/getallcontact',isAuthenticated,authoriesrole("admin"),GetAllContactlist);
router.get('/getconatct/:id',isAuthenticated,authoriesrole("admin"),GetContactById);
router.delete('/deleteconatct/:id',isAuthenticated,authoriesrole("admin"),DeleteContactById);


export default router;