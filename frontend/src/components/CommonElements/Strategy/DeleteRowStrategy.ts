// DeleteRowStrategy.ts
import { ActionStrategy } from './ActionStrategy';
import * as OwnerDetailsModel from "../../../models/ownerDetails";
import * as commonImports from "../../../commonCode/importMRTRelated";
import * as OwnerDetailsApi from "../../../network/ownerDetailsApi";

export class DeleteRowStrategy implements ActionStrategy {
  async handle(values: any, validationErrors: any, row: commonImports.MRT_Row<OwnerDetailsModel.IOwnerDetailsViewModel>, setMessage: any, setOpen:any, exitEditingMode:any): Promise<void> {
    // Copy the implementation of handleDeleteRow
    
    if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("ownerName")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      try {
        OwnerDetailsApi.deleteOwnerDetails(row.getValue("_id")).then(() => {
          console.log("Owner Deleted!");
          const isDeleted = true;
          if (isDeleted) {
            // After successful deletion, set the message and open the dialog
            setMessage(
              `Owner ${row.getValue("ownerName")} deleted successfully.`
            );
            setOpen(true);
          }
        });
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
  }
}