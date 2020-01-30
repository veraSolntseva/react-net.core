import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subdivision: {},
            title: '',
            loading: true
        }

        fetch('api/Subdivision/Details/' + this.props.subdivisionId)
            .then(response => response.json())
            .then(data => {
                this.setState({ title: "Карточка подразделения ", subdivision: data, loading: false });
            });
    }
    render() {
        let content = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : <DialogContent dividers>
                <Typography gutterBottom>
                    Название: {this.state.subdivision.subdivisionName}
                </Typography>
                <Typography gutterBottom>
                    Вышестоящиее подразделение: {this.state.subdivision.parentName}
                </Typography>
            </DialogContent>
;

        return (
            <Dialog onClose={this.props.onClose} aria-labelledby="customized-dialog-title" open={this.props.open}>
                <DialogTitle id="customized-dialog-title" onClose={this.props.onClose}>
                    {this.state.title}
                    <IconButton aria-label="close" style={{ position: 'absolute', right: '5px', top: '10px' }} onClick={this.props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {content}
            </Dialog>
        );
    }
}