import * as OwnerDetailsApi from "../../network/ownerDetailsApi";
import * as UsersApi from "../../network/users_api";
import * as UserModel from "../../models/user";
import * as OwnerDetailsModel from "../../models/ownerDetails";
import ownerDetailsPageStyle from "../../styles/OwnerDetailsPage.module.css";

import * as commonImports from "../../commonCode/importMRTRelated";

//This stores all the users retrieved from the database
let usersArr: UserModel.User[] = [];

const OwnerDetailsLoggedInView = () => {
  //-----------------All the State Declarations Starts Here-----------------
  const [ownerDetailsArr, setOwnerDetailsArr] = commonImports.useState<
    OwnerDetailsModel.IOwnerDetailsViewModel[]
  >([]);
  const [createModalOpen, setCreateModalOpen] = commonImports.useState(false);
  const [validationErrors, setValidationErrors] = commonImports.useState<{
    [cellId: string]: string;
  }>({});

  //-----------------All the State Declarations Ends Here-----------------

  //-----------------All the Function Declarations Starts Here-----------------

  //This function is called when the user clicks on the ADD button
  const handleCreateNewRow = (
    values: OwnerDetailsModel.IOwnerDetailsViewModel
  ) => {
    ownerDetailsArr.push(values);
    setOwnerDetailsArr([...ownerDetailsArr]);

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
      OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails) => {
        setOwnerDetailsArr(ownerDetails);
        console.log("Owner Details added!");
        console.log(ownerDetails);
      });
    });
  };

  //This function is called when the user clicks on the UPDATE button
  const handleSaveRowEdits: commonImports.MaterialReactTableProps<OwnerDetailsModel.IOwnerDetailsViewModel>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        ownerDetailsArr[row.index] = values;

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

        OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails) => {
          setOwnerDetailsArr(ownerDetails);
          console.log(ownerDetails);
        });
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  //This function is called when the user clicks on the CANCEL button
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //This function is called when the user clicks on the DELETE button
  const handleDeleteRow = commonImports.useCallback(
    (row: commonImports.MRT_Row<OwnerDetailsModel.IOwnerDetailsViewModel>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("ownerName")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render

      OwnerDetailsApi.deleteOwnerDetails(row.getValue("_id")).then(() => {
        console.log("Owner Deleted!");
      });

      OwnerDetailsApi.getAllOwnerDetails().then((ownerDetails) => {
        setOwnerDetailsArr(ownerDetails);
        console.log(ownerDetails);
      });
    },
    [ownerDetailsArr]
  );

  //This function is called when the user clicks on the EDIT button to set the Edit Modal Properties of The Columns.
  const getCommonEditTextFieldProps = commonImports.useCallback(
    (
      cell: commonImports.MRT_Cell<OwnerDetailsModel.IOwnerDetailsViewModel>
    ): commonImports.MRT_ColumnDef<OwnerDetailsModel.IOwnerDetailsViewModel>["muiTableBodyCellEditTextFieldProps"] => {
      return cell.column.id === ""
        ? {
            select: true,
            children: usersArr.map((option) => (
              <commonImports.MenuItem key={option._id} value={option._id}>
                {option.username + " - " + option.role}
              </commonImports.MenuItem>
            )),
          }
        : {
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
  const ownerDetailsGridColumns = commonImports.useMemo<
    commonImports.MRT_ColumnDef<OwnerDetailsModel.IOwnerDetailsViewModel>[]
  >(
    () => [
      {
        header: "Owner Details Id",
        accessorKey: "_id",
        enableColumnOrdering: false, //disable column ordering on this column
        enableSorting: false,
        enableHiding: false, //disable hiding on this column
        enableEditing: false, //disable editing on this column
        editable: "never",
      },
      {
        header: "User Name",
        accessorKey: "userId",
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => {
          const userId = cell.getValue<string>();
          const user = usersArr.find((user) => user._id === userId);

          if (user) {
            const { username, role } = user;
            return <>{`${username} - ${role}`}</>;
          }

          return null;
        },
      },
      {
        header: "Owner Details Name",
        accessorKey: "ownerName",
      },
      {
        header: "Owner Details Phone",
        accessorKey: "ownerMobileNo",
      },
      {
        header: "Owner Details Email",
        accessorKey: "ownerEmail",
      },
      {
        header: "Owner Details Website",
        accessorKey: "ownerWebsite",
      },
      {
        header: "Created Date",
        accessorKey: "createdAt",
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => (
          <>{commonImports.formatDate(cell.getValue<string>())}</>
        ),
      },
      {
        header: "Updated Date",
        accessorKey: "updatedAt",
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => (
          <>{commonImports.formatDate(cell.getValue<string>())}</>
        ),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
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
