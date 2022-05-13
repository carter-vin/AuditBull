/* eslint-disable @typescript-eslint/no-explicit-any */
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
            components={{ Toolbar: !noFilter ? GridToolbar : null }}
            hideFooter
            getRowId={(row) => row.id}
        />
    );
};

export default Table;
