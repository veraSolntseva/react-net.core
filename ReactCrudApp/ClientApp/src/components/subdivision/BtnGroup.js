import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

export default class BtnGroup extends Component {
    render() {
        return (
            <div>
                <Button color="primary" disabled={this.props.isSelected} size="small" onClick={(id) => this.props.onDetails()}>
                    <SearchIcon fontSize="small" />
                    Подробнее
                </Button>
                <Button color="primary" disabled={this.props.isSelected} size="small" onClick={(isCreate) => this.props.onEdit(false)}>
                    <EditIcon fontSize="small" />
                    Изменить
                </Button>
                <Button color="primary" disabled={this.props.isSelected} size="small" onClick={() => this.props.onDelete()}>
                    <DeleteIcon fontSize="small" />
                    Удалить
                </Button>
            </div>
        );
    }
}