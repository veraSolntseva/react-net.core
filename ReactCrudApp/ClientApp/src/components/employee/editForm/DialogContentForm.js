import React, { Component } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export default class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subdivisionList: [],
            title: "",
            loading: true,
            errorSubdivision:false,
            employee: {
                employeeId: 0,
                subdivisionId: 0,
                name: '',
                surname: '',
                middleName: '',
                phone: '',
                position: ''
            }
        }

        this.handlerSelectSubdivision = this.handlerSelectSubdivision.bind(this);
        this.handleSave = this.handleSave.bind(this);

        fetch('api/Employee/GetSubdivisionList')
            .then(response => response.json())
            .then(data => {
                if (!this.props.subdivision || this.props.subdivision === 0)
                    this.setState({ subdivisionList: data });
                else {
                    let list = data.filter((el, i) => { return el.value === this.props.subdivision.toString() });
                    this.setState({ subdivisionList: list });
                }
            });
    }

    componentDidMount() {
        if (this.props.employeeId) {
            fetch('api/Employee/Details/' + this.props.employeeId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Редактирование сотрудника", loading: false, employee: data });
                });
        } else {
            this.setState(prevState => ({
                title: "Добавление сотрудника",
                loading: false,
                employee: {
                    ...prevState.employee,
                    subdivisionId: this.props.subdivision
                }
            }));
        }
    }

    handlerSelectSubdivision(event) {
        this.setState(prevState => ({
            employee: {
                ...prevState.employee,
                subdivisionId: event.target.value
            }
        }));
    }

    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (this.state.employee.subdivisionId && this.state.employee.subdivisionId !== 0) {
            if (this.state.employee.employeeId) {
                fetch('api/Employee/Edit', {
                    method: 'POST',
                    body: data,
                })
                    .then(data => {
                        this.props.onAdd();
                    });
            }
            else {
                fetch('api/Employee/Create', {
                    method: 'POST',
                    body: data,
                })
                    .then(data => {
                        this.props.onAdd();
                    });
            }
        } else {
            this.setState({ errorSubdivision: true });
        }

    }

    render() {
        let content = this.state.loading ?
            <p><em>Загрузка...</em></p>
            : <div>
                <DialogTitle id="form-dialog-title">{this.state.title}</DialogTitle>
                <form onSubmit={this.handleSave} >
                    <input type="hidden" name="employeeId" value={this.props.employeeId} />
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="surname"
                            name="surname"
                            label="Фамилия"
                            variant="outlined"
                            type="text"
                            defaultValue={this.state.employee.surname}
                            required={true}
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Имя"
                            variant="outlined"
                            type="text"
                            defaultValue={this.state.employee.name}
                            required={true}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="middlename"
                            name="middlename"
                            label="Отчество"
                            variant="outlined"
                            type="text"
                            defaultValue={this.state.employee.middleName}
                            required={true}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Телефон"
                            variant="outlined"
                            type="text"
                            defaultValue={this.state.employee.phone}
                            required={true}
                            fullWidth
                        />
                        <TextField
                            id="subdivisionId"
                            name="SubdivisionId"
                            select
                            margin="dense"
                            label="Подразделение"
                            value={this.state.employee.subdivisionId}
                            onChange={this.handlerSelectSubdivision}
                            variant="outlined"
                            required={true}
                            error={this.state.errorSubdivision}
                            fullWidth
                        >
                            {this.state.subdivisionList.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.text}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="dense"
                            id="position"
                            name="position"
                            label="Должность"
                            variant="outlined"
                            type="text"
                            defaultValue={this.state.employee.position}
                            required={true}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary" size="small" >
                            Отмена
                        </Button>
                        <Button type="submit" color="primary" size="small" >
                            Сохранить
                        </Button>
                    </DialogActions>
                </form >
            </div>;
        return (
            <Dialog open={this.props.isOpen} onClose={this.handleCloseModal} aria-labelledby="form-dialog-title">
                {content}
            </Dialog>
        );
    }
}