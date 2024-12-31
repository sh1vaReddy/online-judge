import express from "express";
const router = express.Router();
import {CreateConatct, DeleteContactById, GetAllContactlist, GetContactById, UpdateContactById} from '../controller/Contact.js'


router.post('/conatct',CreateConatct);
router.get('/getallcontact',GetAllContactlist);
router.get('/getconatct/:id',GetContactById);
router.delete('/deleteconatct/:id',DeleteContactById);


export default router;