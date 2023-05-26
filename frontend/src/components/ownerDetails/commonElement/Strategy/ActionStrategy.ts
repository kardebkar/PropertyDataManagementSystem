import * as OwnerDetailsModel from "../../../../models/ownerDetails";

export interface ActionStrategy {
  handle(values: OwnerDetailsModel.IOwnerDetailsViewModel, validationErrors: Object, row: any, setMessage: any, setOpen: any, exitEditingMode: any): Promise<void>;
}