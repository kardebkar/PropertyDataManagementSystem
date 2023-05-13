import express from "express";
import * as OwnerDetailsController from "../controllers/ownerDetailsController";


const router = express.Router();

router.get("/all",OwnerDetailsController.getAllOwnerDetails);
router.get("/one/:id",OwnerDetailsController.getOneOwnerDetails);
router.post("/create",OwnerDetailsController.createOwnerDetails);
router.patch("/update/:id",OwnerDetailsController.updateOwnerDetails);
router.delete("/delete/:id",OwnerDetailsController.deleteOwnerDetails);



export default router;