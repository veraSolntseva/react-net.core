import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default class TablePaginator extends Component {
    render() {
        return (
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={this.props.count}
                rowsPerPage={this.props.rows}
                page={this.props.page}
                onChangePage={this.props.onPageChange}
                onChangeRowsPerPage={this.props.onRowsCountChange}
            />
        );
    }
}