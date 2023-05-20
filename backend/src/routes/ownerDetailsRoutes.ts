import express from "express";
import * as OwnerDetailsController from "../controllers/ownerDetailsController";


const router = express.Router();

router.get("/all",OwnerDetailsController.getAllOwnerDetails);
router.get("/one/:ownerId",OwnerDetailsController.getOneOwnerDetails);
router.post("/create",OwnerDetailsController.createOwnerDetails);
router.post("/createArr",OwnerDetailsController.createOwnerDetailsArr);
router.patch("/update/:ownerId",OwnerDetailsController.updateOwnerDetails);
router.delete("/delete/:ownerId",OwnerDetailsController.deleteOwnerDetails);



export default router;