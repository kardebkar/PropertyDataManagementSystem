import express from "express";
import * as OwnerDetailsController from "../controllers/ownerDetailsController";


const router = express.Router();

router.get("/all",OwnerDetailsController.getAllOwnerDetails);


export default router;