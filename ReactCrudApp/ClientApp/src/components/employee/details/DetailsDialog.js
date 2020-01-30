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
            employee: {
                employeeId: 0,
                subdivision: {},
                name: '',
                surname: '',
                middlename: '',
                phone: '',
                position: '',
                fullName: ''
            },
            title: '',
            loading: true
        }

        fetch('api/Employee/Details/' + this.props.employeeId)
            .then(response => response.json())
            .then(data => {
                this.setState({ title: "Карточка сотрудника ", employee: data, loading: false });
            });
    }
    render() {
        let content = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : <DialogContent dividers>
                <Typography gutterBottom>
                    ФИО: {this.state.employee.fullName}
                </Typography>
                <Typography gutterBottom>
                    Подразделение: {this.state.employee.subdivision.subdivisionName}
                </Typography>
                <Typography gutterBottom>
                    Должность: {this.state.employee.position}
                </Typography>
                <Typography gutterBottom>
                    Телефон: {this.state.employee.phone}
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