import { useCallback } from 'react';
import * as OwnerDetailsApi from "./../../network/ownerDetailsApi";  // path to your API

// CREATE
export const useCreateRow = (refetchData:()=>void, setOwnerDetailsArr:Function) => {
  return (values:any) => {
    const insertOwnerDetailsInput = { ...values };

    OwnerDetailsApi.createOwnerDetails(insertOwnerDetailsInput).then(() => {
      refetchData();
    });
  };
};