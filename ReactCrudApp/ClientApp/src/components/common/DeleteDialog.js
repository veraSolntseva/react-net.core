import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import ErrorAlert from './ErrorAlert.js';

export default function DialogDelete(props) {
    let error = props.isError
        ? <ErrorAlert message={props.errorMessage} />
        : null;
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {error}
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary" size="small" >
                    Отменить
                        </Button>
                <Button onClick={props.onDelete} color="primary" autoFocus size="small">
                    Удалить
                        </Button>
            </DialogActions>
        </Dialog>
    );
}