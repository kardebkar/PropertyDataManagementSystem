import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as OwnerDetailsApi from "../../network/ownerDetailsApi";
import * as OwnerDetailsModel from "../../models/ownerDetails";


import { Select } from "@mui/material";
import MaterialReactTable, {
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
  } from 'material-react-table';
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

    import { Add, Delete, Edit } from '@mui/icons-material';



let ownerDetailsList: OwnerDetailsModel.IOwnerDetailsViewModel[] = [];

const OwnerDetailsLoggedInView = () => {

return (
<>
    <h1>Owner Details Logged In View</h1>
</>
);
};

export default OwnerDetailsLoggedInView;
