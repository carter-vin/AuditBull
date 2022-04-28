/* eslint-disable react/jsx-key */
import type { Column } from 'react-table';
import { useTable, useSortBy, usePagination } from 'react-table';

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: Column<Data>[];
    totalRows?: number;
};

export function Table<Data extends object>({
    data,
    columns,
    totalRows,
}: DataTableProps<Data>) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        // canPreviousPage,
        // canNextPage,
        // nextPage,
        // previousPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: totalRows || 10 },
        },
        useSortBy,
        usePagination
    );
    return (
        <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
            <table
                className="min-w-full text-sm divide-y divide-gray-200"
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            className="bg-gray-50"
                            key={headerGroup.id}
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody
                    className="divide-y divide-gray-100"
                    {...getTableBodyProps()}
                >
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
