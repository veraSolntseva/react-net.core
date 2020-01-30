import React, { Component } from 'react';
import EmployeeTable from './EmployeeTable.js';
import EditForm from './editForm/DialogContentForm.js';
import AddButton from '../common/AddButton.js';

export default class EmployeeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            loading: true,
            formOpen: false,
            selectedSubdivisionId: props.selected,
            selectedSubdivisionName: props.selectedName
        }

        let subdivisionId = this.props.selected === 0 ? null : this.props.selected;
        fetch('api/Employee/Index/' + subdivisionId)
            .then(response => response.json())
            .then(data => {
                this.setState({ employeeList: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handlerAdd = this.handlerAdd.bind(this);
        this.handleFormTogle = this.handleFormTogle.bind(this);
    }

    componentDidUpdate(nextProps) {
        if (nextProps.selected !== this.props.selected) {
            let subdivisionId = this.props.selected === 0 ? null : this.props.selected;
            fetch('api/Employee/Index/' + subdivisionId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ employeeList: data, loading: false, selectedSubdivisionName: this.props.selectedName, selectedSubdivisionId: this.props.selected });
                });
        }
        else if (nextProps.selectedName !== this.props.selectedName)
            this.setState({ selectedSubdivisionName: this.props.selectedName });
    }

    handleFormTogle() {
        let flag = this.state.formOpen;
        this.setState({ formOpen: !flag });
    }

    handleDelete(id) {
        fetch('api/Employee/Delete/' + id, {
            method: 'delete'
        }).then(data => {
            this.setState(
                {
                    employeeList: this.state.employeeList.filter((rec) => {
                        return (rec.employeeId !== id);
                    })
                });
        });
    }

    handlerAdd() {
        let subdivisionId = this.state.selectedSubdivisionId === 0 ? null : this.state.selectedSubdivisionId;
        fetch('api/Employee/Index/' + subdivisionId)
            .then(response => response.json())
            .then(data => {
                this.setState({ employeeList: data, formOpen: false });
            });
    }

    render() {
        let form = (this.state.formOpen) ?
            <EditForm onAdd={this.handlerAdd} isOpen={this.state.formOpen} onClose={this.handleFormTogle} subdivision={this.props.selected} />
            : null;
        let table = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : <EmployeeTable data={this.state.employeeList} onEdit={this.handlerAdd} onDelete={this.handleDelete} selectedSubdivisionId={this.state.selectedSubdivisionId} />;

        let title = this.state.selectedSubdivisionId === 0
            ? "Сотрудники (все)"
            : 'Сотрудники подразделения "' + this.state.selectedSubdivisionName + '"';

        return (
            <div className="panel-body">
                <div className="card-body">
                    <h2>{title}</h2>
                    <hr />
                    <AddButton title="Добавить сотрудника" onClick={this.handleFormTogle} />
                    {form}
                    {table}
                </div>
            </div>
        );
    }
}