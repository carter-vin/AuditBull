/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery, useTheme } from '@mui/material';
import {
    DataGrid,
    GridCallbackDetails,
    GridColDef,
    GridRowParams,
    MuiEvent,
    GridToolbar,
} from '@mui/x-data-grid';

interface TabelProps {
    data: any;
    columns: GridColDef[];
    noFilter?: boolean;
    onRowClick?: (
        params: GridRowParams,
        event: MuiEvent<React.MouseEvent>,
        details: GridCallbackDetails
    ) => void;
}
const Table = (props: TabelProps) => {
    const { data, columns, onRowClick, noFilter } = props;
    const theme = useTheme();
    const hideTableToolbar = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <DataGrid
            density="standard"
            rows={data}
            columns={columns}
            autoHeight
            autoPageSize
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            disableSelectionOnClick={false}
            onRowClick={onRowClick}
            components={{
                Toolbar: !hideTableToolbar && !noFilter ? GridToolbar : null,
            }}
            getRowId={(row) => row.id}
        />
    );
};

export default Table;
