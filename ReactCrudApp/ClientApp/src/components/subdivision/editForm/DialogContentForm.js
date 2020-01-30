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
            subdivision: {
                subdivisionId: 0,
                parentId: 0,
                subdivisionName: ''
            }
        }

        this.handlerSelectSubdivision = this.handlerSelectSubdivision.bind(this);
        this.handleSave = this.handleSave.bind(this);

        let subdivisionId = props.isCreate ? 0 : props.subdivisionId;
        fetch('api/Subdivision/GetSubdivisionList/' + subdivisionId)
            .then(response => response.json())
            .then(data => {
                this.setState({ subdivisionList: data });
            });
    }

    componentDidMount() {
        if (!this.props.isCreate) {
            fetch('api/Subdivision/Details/' + this.props.subdivisionId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Редактирование подразделения", loading: false, subdivision: data });
                });
        } else {
            this.setState({ title: "Добавление подразделения", loading: false });
        }
    }

    handlerSelectSubdivision(event) {
        this.setState(prevState => ({
            subdivision: {
                ...prevState.subdivision,
                parentId: event.target.value
            }
        }));
    }

    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (!this.props.isCreate) {
            let selectedName = document.getElementsByName('subdivisionName')[0].value;

            fetch('api/Subdivision/Edit', {
                method: 'POST',
                body: data,
            }).then(data => {
                    this.props.onAdd();
                    this.props.onSelect(this.props.subdivisionId, selectedName);
                });
        }
        else {
            fetch('api/Subdivision/Create', {
                method: 'POST',
                body: data,
            })
                .then(data => {
                    this.props.onAdd();
                });
        }
    }

    static renderForm(component) {
        return (
            <div>
                <DialogTitle id="form-dialog-title">{component.state.title}</DialogTitle>
                <form onSubmit={component.handleSave} >
                    <input type="hidden" name="subdivisionId" value={component.state.subdivision.subdivisionId} />
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="subdivisionName"
                            name="subdivisionName"
                            label="Название"
                            variant="outlined"
                            type="text"
                            defaultValue={component.state.subdivision.subdivisionName}
                            required={true}
                            fullWidth
                        />
                        <TextField
                            id="parentId"
                            name="parentId"
                            select
                            margin="dense"
                            label="Вышестоящее подразделение"
                            value={component.state.subdivision.parentId}
                            onChange={component.handlerSelectSubdivision}
                            variant="outlined"
                            required={true}
                            error={component.state.errorSubdivision}
                            fullWidth
                        >
                            {component.state.subdivisionList.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={component.props.onClose} color="primary" size="small" >
                            Отмена
                        </Button>
                        <Button type="submit" color="primary" size="small" >
                            Сохранить
                        </Button>
                    </DialogActions>
                </form >
            </div>
        );
    }

    render() {
        let content = this.state.loading ?
            <p><em>Загрузка...</em></p>
            : EditForm.renderForm(this);
        return (
            <Dialog open={this.props.isOpen} onClose={this.handleCloseModal} aria-labelledby="form-dialog-title">
                {content}
            </Dialog>
        );
    }
}