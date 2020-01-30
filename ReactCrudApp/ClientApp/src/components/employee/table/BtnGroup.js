import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';

export default class BtnGroup extends Component {
    constructor(props) {
        super(props);
        this.handlerDelete = this.handlerDelete.bind(this);
    }

    handlerDelete(id) {
        this.props.onDelete(id);
    }

    render() {
        return (
            <div>
                <Tooltip title="Просмотр">
                    <IconButton color="primary" aria-label="Просмотр" onClick={(id) => this.props.onDetails(this.props.employeeId)}>
                        <SearchIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Изменить">
                    <IconButton color="primary" aria-label="Изменить" onClick={(id) => this.props.onEdit(this.props.employeeId)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Удалить">
                    <IconButton color="primary" aria-label="Удалить" onClick={(id) => this.handlerDelete(this.props.employeeId)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}