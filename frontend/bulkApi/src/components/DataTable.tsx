import React, { ReactNode, useEffect } from "react";
import { useTable, useSortBy, usePagination, useRowSelect, TableToggleAllRowsSelectedProps  } from "react-table";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import { useTheme, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { TablePaginationActionsProps } from "@material-ui/core/TablePagination/TablePaginationActions";
import Checkbox from '@material-ui/core/Checkbox';

interface IProp {
    data: any[];
    columnNames: string[];
    accessors: string[];
    handleChecked?: (rowIndex: number, event: React.ChangeEvent<HTMLInputElement>) => any | null;
}

// Data Table using Material UI and react-table
// Must render <DataTable> conditionally otherwise there will be infinite loop when using the UseTable() hook
export function DataTable({data, columnNames, accessors, handleChecked}: IProp): JSX.Element {

    let headerDicts: any[] = [];
    for(let i = 0; i < columnNames.length; i++) {
        let header: string = columnNames[i];
        let accessor: string = accessors[i];    
        let headerDict: any = {
            Header: header,
            accessor: accessor,
            sortType: "basic",
        }; 
        headerDicts.push(headerDict);
    } 

    const dataMemo = React.useMemo(() => data, [data]);
    const columnsMemo = React.useMemo(() => headerDicts, [columnNames]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        selectedFlatRows,
        
        //For the pagination
        pageCount,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds },
      } = useTable(
        {
          columns: columnsMemo,
          data: dataMemo,
          initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
          hooks.visibleColumns.push(columns => [
            {
              id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <Checkbox />
              </div>
            ),
                
              Cell: ({row}) => (
                <Checkbox  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChecked ? handleChecked(row.index, event) : null} />
              ),
            },
            ... columns
          ])
        }
      );

      const classes = TableStyles(); 

      return <div> 
        {/* need to separate pagination from table, otherwise styling will be messed up */}
        <Table aria-label="pagination table">
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={(event, number) => gotoPage(number)}
                onChangeRowsPerPage={(event) => setPageSize(Number(event.target.value))}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
              <TableHead {...getTableProps()}>
                  {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()} className={classes.head}>
                        {headerGroup.headers.map(column => (
                        <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} className={classes.head}>
                            {column.render("Header")}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                            </span>
                        </TableCell>
                        ))}
                    </TableRow>
            )   )}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                    <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
                    })}
                    </TableRow>
                );
                })}
              </TableBody>              
          </Table>        
          {/* <Pagination count={pageCount} color="primary" onChange={(event, page) => gotoPage(page) }  /> */}

      </TableContainer>

      

      </div>

}

function TablePaginationActions(props: TablePaginationActionsProps): JSX.Element {
    const theme = useTheme();
    const classes = TableStyles();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onChangePage(event, 0);
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onChangePage(event, page - 1);
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onChangePage(event, page + 1);
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  
    return (
      <div className={classes.paginationButtons}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  function toggleAllRows(event: React.ChangeEvent<HTMLInputElement>, props: TableToggleAllRowsSelectedProps): void {
    const {checked, onChange, style, indeterminate, title} = props;
    console.log(checked);
    console.log(onChange);
    console.log(title);

    if (onChange) {
      onChange();
    }
  }


  const TableStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationButtons: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    },
    paginationFooter: {
        backgroundColor: "yellow",
    },
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontWeight: "bold"
      }
  })
);

