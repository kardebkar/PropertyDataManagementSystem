import * as OwnerDetailsApi from "../../network/ownerDetailsApi";
import * as UsersApi from "../../network/users_api";
import * as UserModel from "../../models/user";
import * as OwnerDetailsModel from "../../models/ownerDetails";
import ownerDetailsPageStyle from "../../styles/OwnerDetailsPage.module.css";

import * as commonImports from "../../commonCode/importMRTRelated";


//This stores all the users retrieved from the database
let usersArr:UserModel.User[]=[];

const OwnerDetailsLoggedInView = () => {
  const [ownerDetailsArr, setOwnerDetailsArr] = commonImports.useState<OwnerDetailsModel.IOwnerDetailsViewModel[]>([]);
  const [validationErrors, setValidationErrors] = commonImports.useState<{
    [cellId: string]: string;
  }>({});

  commonImports.useEffect(() => {

    UsersApi.fetchUsers().then((response) => {
      usersArr=response;
      console.log(response);
    });

    OwnerDetailsApi.getAllOwnerDetails().then((response) => {
      setOwnerDetailsArr(response);
      console.log(response);
    });
  }, []);

  const ownerDetailsGridColumns = commonImports.useMemo<commonImports.MRT_ColumnDef<OwnerDetailsModel.IOwnerDetailsViewModel>[]>( 
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
        header: "User Id",
        accessorKey: "userId",
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => <>
        {
          usersArr.find((user)=>user._id===cell.getValue<string>())?.username
        }
        </>,
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
        Cell: ({ cell }) => <>{commonImports.formatDate(cell.getValue<string>())}</>,
      },
      {
        header: "Updated Date",
        accessorKey: "updatedAt",
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => <>{commonImports.formatDate(cell.getValue<string>())}</>,
      },
    ],
    []

  );




  return (
    <>
      <h1>Owner Details Logged In View</h1>
      <commonImports.Container className={ownerDetailsPageStyle.pageContainer}>
        <commonImports.MaterialReactTable
          displayColumnDefOptions={
            {
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
              "mrt-row-actions": false,
              _id: false //hide firstName column by default
            },
          }}
        />
      </commonImports.Container>
    </>
  );
};

export default OwnerDetailsLoggedInView;
