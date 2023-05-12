import React, { useEffect, useState, useMemo, useCallback } from "react";
import { User as UserModel } from "./../../models/user";
import * as UsersApi from "../../network/users_api";
import { darken } from "@mui/material";


import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} 

from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    country: string,
    is_active: boolean,
    is_verified: boolean,
    is_deleted: boolean,
    createdAt: string,
    updatedAt: string,
    deleted_at: string,
    communication_preferences: string,
};


const RetrieveAllUsersView = () => {

  type UserInput = {
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    country: string,
    is_active: boolean,
    is_verified: boolean,
    is_deleted: boolean,
    communication_preferences: string,
  };

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<User[]>(() => []);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});
  
    const handleCreateNewRow = (values: User) => {
      tableData.push(values);
      setTableData([...tableData]);

      const insertUser: UserInput = {
        _id: values._id,
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        address: values.address,
        city: values.city,
        state: values.state,
        zip_code: values.zip_code,
        country: values.country,
        is_active: values.is_active,
        is_verified: values.is_verified,
        is_deleted: values.is_deleted,
        communication_preferences: values.communication_preferences,

      };

      // Send the API request to update the Owner
      UsersApi.signUp(insertUser).then(() => {
        console.log("User added!");
      });

    };
    
    const handleSaveRowEdits: MaterialReactTableProps<User>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = values;

          
          //send/receive api updates here, then refetch or update local table data for re-render
          const updatedUser: UserInput = {
            _id: values._id,
            username: values.username,
            email: values.email,
            password: values.password,
            role: values.role,
            first_name: values.first_name,
            last_name: values.last_name,
            phone_number: values.phone_number,
            address: values.address,
            city: values.city,
            state: values.state,
            zip_code: values.zip_code,
            country: values.country,
            is_active: values.is_active,
            is_verified: values.is_verified,
            is_deleted: values.is_deleted,
            communication_preferences: values.communication_preferences,

          };
    
          // Send the API request to update the Owner
          await UsersApi.updateUser(updatedUser._id, updatedUser);

          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
        }
      };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleDeleteRow = useCallback(
      (row: MRT_Row<User>) => {
        if (
          !window.confirm(`Are you sure you want to delete ${row.getValue('model')}`)
        ) {
          return;
        }
        //send api delete request here, then refetch or update local table data for re-render

        UsersApi.deleteUser(row.getValue('_id')).then(() => {
          console.log("User Deleted!");
        });


        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      },
      [tableData],
    );
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<User>,
      ): MRT_ColumnDef<User>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onChange: (e) => {
            const value = e.target.value;
            if (!value) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: 'Required',
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
      [validationErrors],
    );
  
    const columns = useMemo<MRT_ColumnDef<User>[]>(
      () => [
        {
          accessorKey: '_id',
          header: '_id',
          enableColumnOrdering: false,
          enableEditing: false, //disable editing on this column
          enableSorting: false,
          enableHiding: false,
          size: 10,
          editable: "never"
          
        },
        {
          accessorKey: 'username',
          header: 'username',
          size: 5,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
          }),
        },
        {
          accessorKey: 'email',
          header: 'email',
          size: 20,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
          }),
        },
        {
            accessorKey: 'password',
            header: 'password',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
        {
            accessorKey: 'role',
            header: 'role',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
        },
        {
            accessorKey: 'first_name',
            header: 'first_name',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'last_name',
            header: 'last_name',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'phone_number',
            header: 'phone_number',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'address',
            header: 'address',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'city',
            header: 'city',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'state',
            header: 'state',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'zip_code',
            header: 'zip_code',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'country',
            header: 'country',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'is_active',
            header: 'is_active',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'is_verified',
            header: 'is_verified',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'is_deleted',
            header: 'is_deleted',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'communication_preferences',
            header: 'communication_preferences',
            size: 20,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },

      ],
      [getCommonEditTextFieldProps],
    );

    
    useEffect(() => {
      UsersApi.fetchUsers().then((users) => {
        //tableData=cars;
        setTableData(users);
        console.log(users);
      });
    }, []);
  
    return (
      <>
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          
          editingMode="modal" //default
          enableColumnOrdering
          initialState={{ columnVisibility: { vehicleId: false } }} //hide firstName column by default
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Vehicle
            </Button>
          )}
        />
        <CreateNewAccountModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </>
    );
  };
  
  interface CreateModalProps {
    columns: MRT_ColumnDef<User>[];
    onClose: () => void;
    onSubmit: (values: User) => void;
    open: boolean;
  }
  
  //example of creating a mui dialog modal for creating new rows
  export const CreateNewAccountModal = ({
    open,
    columns,
    onClose,
    onSubmit,
  }: CreateModalProps) => {
    const [values, setValues] = useState<any>(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {} as any),
    );
  
    const handleSubmit = () => {
      //put your validation logic here
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New User</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {columns.filter(column=>column.accessorKey !=="_id").map((column) => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e:any) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              ))}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Create New User
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  
  export default RetrieveAllUsersView;