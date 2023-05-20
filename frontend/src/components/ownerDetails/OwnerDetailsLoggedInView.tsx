//------------------------------------Imports Section------------------------
import * as OwnerDetailsApi from "../../network/ownerDetailsApi";
import * as UsersApi from "../../network/users_api";
import * as UserModel from "../../models/user";
import * as OwnerDetailsModel from "../../models/ownerDetails";
import ownerDetailsPageStyle from "../../styles/OwnerDetailsPage.module.css";
import * as commonImports from "../../commonCode/importMRTRelated";

//Strategy DesignPattern Used for the Create, Update and Delete Operations
import { CreateNewRowStrategy } from "./commonElement/Strategy/CreateNewRowStrategy";
import { SaveRowEditsStrategy } from './commonElement/Strategy/SaveRowEditsStrategy';
import { DeleteRowStrategy } from './commonElement/Strategy/DeleteRowStrategy';

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
    setOwnerDetailsArr([...ownerDetailsArr]);
    await createNewRowStrategy.handle(values);
  };

  //This function is called when the user clicks on the UPDATE button
  const handleSaveRowEdits: commonImports.MaterialReactTableProps<OwnerDetailsModel.IOwnerDetailsViewModel>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      ownerDetailsArr[row.index] = values;
      await saveRowEditsStrategy.handle(values,validationErrors, row,setMessage, setOpen, exitEditingMode);
    };

  //This function is called when the user clicks on the CANCEL button
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //This function is called when the user clicks on the DELETE button
  const handleDeleteRow = commonImports.useCallback(
    async (row: commonImports.MRT_Row<OwnerDetailsModel.IOwnerDetailsViewModel>) => {
      ownerDetailsArr.splice(row.index, 1);
      setOwnerDetailsArr([...ownerDetailsArr]);
      await deleteRowStrategy.handle(null,null,row,setMessage,setOpen,null);
    },
    [ownerDetailsArr]
  );

  //This function is called when the user clicks on the EDIT button to set the Edit Modal Properties of The Columns.
  const getCommonEditTextFieldProps = commonImports.useCallback(
    (
      cell: commonImports.MRT_Cell<OwnerDetailsModel.IOwnerDetailsViewModel>
    ): commonImports.MRT_ColumnDef<OwnerDetailsModel.IOwnerDetailsViewModel>["muiTableBodyCellEditTextFieldProps"] => {
      if (cell.column.id === "userId") {
        return {
          select: true,
          label: "User Name",
          children: usersArr.map((option) => (
            <commonImports.MenuItem key={option._id} value={option._id}>
              {option.username}-{option.role}
            </commonImports.MenuItem>
          )),
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onChange: (e) => {
            const value = e.target.value;
            if (!value) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: "Required",
              }));
            } else {
              setValidationErrors((prev) => {
                const next = { ...prev };
                delete next[cell.id];
                return next;
              });
            }
            //cell.setEditingCellValue(value);
          },
        };
      } else if (cell.column.id === "_id") {
        return {
          style: { display: "none" },
        };
      } else if (
        cell.column.id === "createdAt" ||
        cell.column.id === "updatedAt"
      ) {
        return {
          style: { display: "none" },
        };
      } else {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onChange: (e) => {
            const value = e.target.value;
            if (!value) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: "Required",
              }));
            } else {
              setValidationErrors((prev) => {
                const next = { ...prev };
                delete next[cell.id];
                return next;
              });
            }
            //cell.setEditingCellValue(value);
          },
        };
      }
    },
    [validationErrors]
  );

  //-----------------All the Function Declarations Ends Here-----------------
  

  //This useEffect is called when the page is loaded for the first time
  commonImports.useEffect(() => {
    UsersApi.fetchUsers().then((response) => {
      usersArr = response;
      console.log(response);
    });

    OwnerDetailsApi.getAllOwnerDetails().then((response) => {
      setOwnerDetailsArr(response);
      console.log(response);
    });
  }, []);

  //This is Used to set the columns of the table
  const ownerDetailsGridColumns =GridFactory(getCommonEditTextFieldProps, usersArr);

  const handleOk = () => {
    // Perform the operation you want when the OK button is clicked
    console.log("OK button has been clicked!");
    OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails) => {
      setOwnerDetailsArr(ownerDetails);
      console.log(ownerDetails);
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
        <CreateNewAccountModal
          columns={ownerDetailsGridColumns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </commonImports.Container>
    </>
  );
};

interface CreateModalProps {
  columns: commonImports.MRT_ColumnDef<OwnerDetailsModel.IOwnerDetailsViewModel>[];
  onClose: () => void;
  onSubmit: (values: OwnerDetailsModel.IOwnerDetailsViewModel) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = commonImports.useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );

  const [selectedOwnerType, setSelectedOwnerType] = commonImports.useState("");
  const [errors, setErrors] = commonImports.useState<{ [key: string]: string }>(
    {}
  );

  const validate = () => {
    let tempErrors = {};
    tempErrors = {
      ...tempErrors,
      userId: values.userId ? "" : "This field is required",
      ownerEmail: values.ownerEmail
        ? /\S+@\S+\.\S+/.test(values.ownerEmail)
          ? ""
          : "Email is not valid"
        : "This field is required",
      ownerWebsite: values.ownerWebsite
        ? /^(ftp|http|https):\/\/[^ "]+$/.test(values.ownerWebsite)
          ? ""
          : "URL is not valid"
        : "This field is required",
      ownerName: values.ownerName ? "" : "This field is required",
      ownerMobileNo: values.ownerMobileNo
        ? /^[1-9][0-9]{9}$/.test(values.ownerMobileNo)
          ? ""
          : "Please enter a valid mobile number"
        : "This field is required",
    };
    setErrors({
      ...tempErrors,
    });

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = () => {
    //put your validation logic here
    if (validate()) {
      onSubmit(values);
      onClose();
    }
  };

  return (
    <commonImports.Dialog open={open}>
      <commonImports.DialogTitle textAlign="center">
        Create New Owner
      </commonImports.DialogTitle>
      <commonImports.DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <commonImports.Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns
              .filter((column) => column.accessorKey === "userId")
              .map((column) => (
                <commonImports.FormControl
                  error={column.accessorKey && !!errors[column.accessorKey]}
                >
                  <commonImports.Select
                    label="User Id"
                    key={column.accessorKey}
                    name={column.accessorKey}
                    value={selectedOwnerType}
                    onChange={(event) => {
                      setValues({
                        ...values,
                        [event.target.name]: event.target.value,
                      });
                      setSelectedOwnerType(event.target.value);
                    }}
                    displayEmpty
                    sx={{ minWidth: 120 }}
                  >
                    <commonImports.MenuItem value="" disabled>
                      Select a User
                    </commonImports.MenuItem>
                    {usersArr.map((option) => (
                      <commonImports.MenuItem
                        key={option._id}
                        value={option._id}
                      >
                        {option.username + " - " + option.role}
                      </commonImports.MenuItem>
                    ))}
                  </commonImports.Select>
                  <commonImports.FormHelperText>
                    {column.accessorKey &&
                    errors.hasOwnProperty(column.accessorKey)
                      ? errors[column.accessorKey]
                      : ""}
                  </commonImports.FormHelperText>
                </commonImports.FormControl>
              ))}

            {columns
              .filter(
                (column) =>
                  column.accessorKey !== "_id" &&
                  column.accessorKey !== "userId" &&
                  column.accessorKey !== "createdAt" &&
                  column.accessorKey !== "updatedAt"
              )
              .map((column) => (
                <commonImports.TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  error={column.accessorKey && !!errors[column.accessorKey]}
                  helperText={
                    column.accessorKey &&
                    errors.hasOwnProperty(column.accessorKey)
                      ? errors[column.accessorKey]
                      : ""
                  }
                />
              ))}
          </commonImports.Stack>
        </form>
      </commonImports.DialogContent>
      <commonImports.DialogActions sx={{ p: "1.25rem" }}>
        <commonImports.Button onClick={onClose}>Cancel</commonImports.Button>
        <commonImports.Button
          color="secondary"
          onClick={handleSubmit}
          variant="contained"
        >
          Create New Owner
        </commonImports.Button>
      </commonImports.DialogActions>
    </commonImports.Dialog>
  );
};

export default OwnerDetailsLoggedInView;

