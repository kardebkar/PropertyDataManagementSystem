// SaveRowEditsStrategy.ts
import { ActionStrategy } from './ActionStrategy';
import * as OwnerDetailsModel from "../../../../models/ownerDetails";
import * as OwnerDetailsApi from "../../../../network/ownerDetailsApi";

export class SaveRowEditsStrategy implements ActionStrategy {
  async handle(values: OwnerDetailsModel.IOwnerDetailsViewModel, validationErrors: Object, row:any, setMessage: any, setOpen:any, exitEditingMode:any): Promise<void> {
    // Copy the implementation of handleSaveRowEdits
    if (!Object.keys(validationErrors).length) {
        

        //send/receive api updates here, then refetch or update local table data for re-render
        const updatedOwnerDetails: OwnerDetailsModel.IOwnerDetailsViewModel = {
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
        await OwnerDetailsApi.updateOwnerDetails(
          updatedOwnerDetails._id,
          updatedOwnerDetails
        );

        OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails:OwnerDetailsModel.IOwnerDetailsViewModel[]) => {
          //setOwnerDetailsArr(ownerDetails);
          setMessage(
            `Owner ${row.getValue("ownerName")} Updated successfully.`
          );
          setOpen(true);
          console.log(ownerDetails);
        });
        exitEditingMode(); //required to exit editing mode and close modal
      }
  }
}