//------------------------------------Imports Section------------------------
import * as OwnerDetailsApi from "../../network/ownerDetailsApi";
import * as UsersApi from "../../network/users_api";
import * as UserModel from "../../models/user";
import * as OwnerDetailsModel from "../../models/ownerDetails";
import ownerDetailsPageStyle from "../../styles/OwnerDetailsPage.module.css";
import * as commonImports from "../../commonCode/importMRTRelated";
import {CreateNewOwnerDetailsModal} from "./commonElement/CreateNewOwnerDetailsModal";

//Strategy DesignPattern Used for the Create, Update and Delete Operations
import { CreateNewRowStrategy } from "./commonElement/Strategy/CreateNewRowStrategy";
import { SaveRowEditsStrategy } from './commonElement/Strategy/SaveRowEditsStrategy';
import { DeleteRowStrategy } from './commonElement/Strategy/DeleteRowStrategy';

import  getEditTextFieldProps  from './commonElement/GetEditTextFieldProps'; // Adjust the path to your GetEditTextFieldProps file

//Factory DesignPattern Used for the Main Grid View
import { GridFactory } from './commonElement/Factory/GridFactory'; // Adjust the path to your GridFactory file
//-------------------------------End of Imports Section---------------------


let usersArr: UserModel.User[] = []; //This stores all the users retrieved from the database

const OwnerDetailsLoggedInView = () => {
  const [ownerDetailsArr, setOwnerDetailsArr] = commonImports.useState<
    OwnerDetailsModel.IOwnerDetailsViewModel[]
  >([]);
  const [createModalOpen, setCreateModalOpen] = commonImports.useState(false);
  const [validationErrors, setValidationErrors] = commonImports.useState<{
    [cellId: string]: string;
  }>({});
  const [open, setOpen] = commonImports.useState(false);
  const [message, setMessage] = commonImports.useState("");

  const createNewRowStrategy = new CreateNewRowStrategy();
  const saveRowEditsStrategy = new SaveRowEditsStrategy();
  const deleteRowStrategy = new DeleteRowStrategy();

  const handleCreateNewRow = async (
    values: OwnerDetailsModel.IOwnerDetailsViewModel
  ) => {
    ownerDetailsArr.push(values);
    createNewRowStrategy.handle(values, {}, null, setMessage, setOpen).then(() => {
      OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails: OwnerDetailsModel.IOwnerDetailsViewModel[]) => {
        setOwnerDetailsArr(ownerDetails);
      });
    }).catch((error) => { }).finally(() => { });
  };

  //This function is called when the user clicks on the UPDATE button
  const handleSaveRowEdits: commonImports.MaterialReactTableProps<OwnerDetailsModel.IOwnerDetailsViewModel>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      ownerDetailsArr[row.index] = values;
      await saveRowEditsStrategy.handle(values, validationErrors, row, setMessage, setOpen, exitEditingMode);

    };

  //This function is called when the user clicks on the CANCEL button
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //This function is called when the user clicks on the DELETE button
  const handleDeleteRow = commonImports.useCallback(
    async (row: commonImports.MRT_Row<OwnerDetailsModel.IOwnerDetailsViewModel>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("ownerName")}`
        )
      ) {
        return;
      }
      ownerDetailsArr.splice(row.index, 1);
      setOwnerDetailsArr([...ownerDetailsArr]);
      await deleteRowStrategy.handle(null, null, row, setMessage, setOpen, null);
    },
    [ownerDetailsArr]
  );

  //This function is called when the user clicks on the EDIT button to set the Edit Modal Properties of The Columns.
  // const getCommonEditTextFieldProps = getEditTextFieldProps(setValidationErrors, usersArr); 

  //-----------------All the Function Declarations Ends Here-----------------


  //This useEffect is called when the page is loaded for the first time
  commonImports.useEffect(() => {
    UsersApi.fetchUsers().then((response) => {
      usersArr = response;
    });

    OwnerDetailsApi.getAllOwnerDetails().then((response) => {
      setOwnerDetailsArr(response);
    });
  }, []);

  //This is Used to set the columns of the table
  const ownerDetailsGridColumns = GridFactory(getEditTextFieldProps, usersArr,validationErrors,setValidationErrors);

  const handleOk = () => {
    // Perform the operation you want when the OK button is clicked
    console.log("OK button has been clicked!");
    OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails) => {
      setOwnerDetailsArr(ownerDetails);

    });
    setOpen(false); // Close the dialog
  };

  return (
    <>
      <commonImports.SuccessDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={handleOk}
        message={message}
      />
      <h1>Owner Details Logged In View</h1>
      <commonImports.Container className={ownerDetailsPageStyle.pageContainer}>
        <commonImports.MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 30,
            },
          }}
          columns={ownerDetailsGridColumns}
          data={ownerDetailsArr}
          enableColumnOrdering
          initialState={{
            columnVisibility: {
              _id: false, //hide firstName column by default
            },
          }}
          editingMode="modal" //default
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <commonImports.Box sx={{ display: "flex", gap: "1rem" }}>
              <commonImports.Tooltip arrow placement="left" title="Edit">
                <commonImports.IconButton
                  onClick={() => table.setEditingRow(row)}
                >
                  <commonImports.Edit />
                </commonImports.IconButton>
              </commonImports.Tooltip>
              <commonImports.Tooltip arrow placement="right" title="Delete">
                <commonImports.IconButton
                  color="error"
                  onClick={() => handleDeleteRow(row)}
                >
                  <commonImports.Delete />
                </commonImports.IconButton>
              </commonImports.Tooltip>
            </commonImports.Box>
          )}
          renderTopToolbarCustomActions={() => (
            <commonImports.Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Owner
            </commonImports.Button>
          )}
        />
        <CreateNewOwnerDetailsModal
          columns={ownerDetailsGridColumns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          usersArr={usersArr}
        />
      </commonImports.Container>
    </>
  );
};




export default OwnerDetailsLoggedInView;

