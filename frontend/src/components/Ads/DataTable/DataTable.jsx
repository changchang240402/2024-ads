import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function StickyHeadTable({ columns }) {

    const ads = useSelector(state => state.ads);
    const pagination = useSelector(state => state.pagination);

    const [page, setPage] = useState(pagination.current_page - 1);
    const [rowsPerPage, setRowsPerPage] = useState(pagination.per_page);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const [rows, setRows] = useState(ads);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedRows = () => {
        const comparator = (a, b) => {
            let comparison = 0;
            if (a[orderBy] < b[orderBy]) {
                comparison = -1;
            } else if (a[orderBy] > b[orderBy]) {
                comparison = 1;
            }
            return order === 'asc' ? comparison : -comparison;
        };
        return rows.slice().sort(comparator);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleRequestSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows()
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={index} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 7]}
                component="div"
                count={pagination.total_result}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
