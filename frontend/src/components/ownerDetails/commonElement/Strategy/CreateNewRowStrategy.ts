// CreateNewRowStrategy.ts
import { ActionStrategy } from './ActionStrategy';
import * as OwnerDetailsModel from "../../../../models/ownerDetails";
import * as OwnerDetailsApi from "../../../../network/ownerDetailsApi";

export class CreateNewRowStrategy implements ActionStrategy {
  async handle(values: OwnerDetailsModel.IOwnerDetailsViewModel): Promise<void> {
    // Copy the implementation of handleCreateNewRow


    const insertOwnerDetailsInput: OwnerDetailsModel.IOwnerDetailsViewModel = {
      _id: values._id,
      userId: values.userId,
      ownerName: values.ownerName,
      ownerMobileNo: values.ownerMobileNo,
      ownerEmail: values.ownerEmail,
      ownerWebsite: values.ownerWebsite,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
    };

    // Send the API request to update the Owner
    OwnerDetailsApi.createOwnerDetails(insertOwnerDetailsInput).then(() => {
      OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails:OwnerDetailsModel.IOwnerDetailsViewModel[]) => {
        //setOwnerDetailsArr(ownerDetails);
        console.log("Owner Details added!");
        console.log(ownerDetails);
      });
    });
  }
}