import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default class TableHeader extends Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell>ФИО</TableCell>
                    <TableCell align="right">Подразделение</TableCell>
                    <TableCell align="right">Действия</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}