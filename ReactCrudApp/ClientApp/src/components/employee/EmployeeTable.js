import React, { Component } from 'react';
import TableHeader from './table/TableHeader.js';
import TableBody from './table/TableBody.js';
import TablePaginator from './table/TablePaginator.js';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import EditForm from './editForm/DialogContentForm.js';
import Details from './details/DetailsDialog.js';
import DeleteDialog from '../common/DeleteDialog.js'

export default class EmployeeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            dialogOpen: false,
            selectedEmployee: 0,
            selectedName: '',
            formOpen: false,
            detailsOpen: false
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteDialogTogle = this.handleDeleteDialogTogle.bind(this);
        this.handleFormEditTogle = this.handleFormEditTogle.bind(this);
        this.handleDetailsTogle = this.handleDetailsTogle.bind(this);
    }

    handleDetailsTogle(id) {
        let flag = this.state.detailsOpen;
        this.setState({ detailsOpen: !flag, selectedEmployee: id });
    }

    handleEdit() {
        this.props.onEdit();
        this.handleFormEditTogle();
    }

    handleChangePage(event, newPage) {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage(event) {
        this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    };

    handleDeleteDialogTogle(id) {
        let flag = this.state.dialogOpen;
        if (flag)
            this.setState({ selectedEmployee: 0, selectedName: '', dialogOpen: false });
        else {
            let selected = this.props.data.filter((el, i) => {
                return el.employeeId === id;
            })[0];
            this.setState({ dialogOpen: true, selectedEmployee: id, selectedName: (selected.fullName) })
        }
    }

    handleDelete() {
        this.props.onDelete(this.state.selectedEmployee);
        this.handleDeleteDialogTogle();
    }

    handleFormEditTogle(id) {
        let flag = this.state.formOpen;
        this.setState({ formOpen: !flag, selectedEmployee: id  })
    }

    static renderEmployeeTable(component) {
        let count = component.props.data.length;

        let page = component.state.page;
        if (count < component.state.rowsPerPage * (component.state.page)) {
            page = 0;
        }

        let endStrIndex = component.state.rowsPerPage * (page + 1) - 1;
        let startStrIndex = component.state.rowsPerPage * (page);

        let empList = component.props.data.filter((el, i) => {
            return i >= startStrIndex && i <= endStrIndex;
        })
        const classes = makeStyles({
            table: {
                minWidth: 650,
            },
        });

        let contentDelete = 'Вы уверены, что хотите удалить сотрудника ' + component.state.selectedName + '?';
        const theme = createMuiTheme({}, ruRU);

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHeader />
                            <TableBody data={empList} onDelete={component.handleDeleteDialogTogle} onEdit={component.handleFormEditTogle} onDetails={component.handleDetailsTogle} />
                        </Table>
                    </TableContainer>
                    <TablePaginator count={count} page={page} rows={component.state.rowsPerPage} onPageChange={component.handleChangePage} onRowsCountChange={component.handleChangeRowsPerPage} />
                    <DeleteDialog
                        open={component.state.dialogOpen}
                        onClose={component.handleDeleteDialogTogle}
                        title="Удаление сотрудника"
                        content={contentDelete}
                        onDelete={component.handleDelete}
                        isError={false}
                        errorMessage=""
                    />
                </ThemeProvider>
            </div>
        );
    }

    render() {
        let contents = this.props.data.length > 0 ?
            EmployeeTable.renderEmployeeTable(this)
            : <h2>Нет данных</h2>;
        let form = (this.state.formOpen) ?
            <EditForm onAdd={this.handleEdit} employeeId={this.state.selectedEmployee} isOpen={this.state.formOpen} onClose={this.handleFormEditTogle} />
            : null;
        let details = (this.state.detailsOpen)
            ? <Details open={this.state.detailsOpen} onClose={this.handleDetailsTogle} employeeId={this.state.selectedEmployee} />
            : null;

        if (document.activeElement.tagName.toLowerCase() === "button" &&
            (document.activeElement.parentElement.className === 'MuiTablePagination-actions' || document.activeElement.parentElement.parentElement.tagName.toLowerCase() === 'td'))
            document.activeElement.blur();

        return (
            <div>
                {contents}
                {form}
                {details}
            </div>
        );
    }
}