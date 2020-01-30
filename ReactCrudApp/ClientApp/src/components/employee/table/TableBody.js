import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BtnGroup from './BtnGroup.js';

export default class TableBodyMy extends Component {
    render() {
        return (
            <TableBody>
                {this.props.data.map(row => (
                    <TableRow key={row.employeeId}>
                        <TableCell component="th" scope="row">
                            {row.fullName}
                        </TableCell>
                        <TableCell align="right">{row.subdivision.subdivisionName}</TableCell>
                        <TableCell align="right">
                            <BtnGroup employeeId={row.employeeId} onDelete={this.props.onDelete} onEdit={this.props.onEdit} onDetails={this.props.onDetails} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        )
    }
}