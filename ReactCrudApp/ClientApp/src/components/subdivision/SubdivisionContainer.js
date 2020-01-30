import React, { Component } from 'react';
import AddButton from '../common/AddButton.js';
import Tree from './SubdivisionTree.js';
import EditForm from './editForm/DialogContentForm.js';
import DeleteDialog from '../common/DeleteDialog.js';
import BtnGroup from './BtnGroup.js';
import DetailsDialog from './DetailsDialog.js';

export default class SubdivisionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subdivisions: [],
            loading: true,
            formOpen: false,
            deleteOpen: false,
            detailsOpen: false,
            isCreate: false,
            isError: false,
            errorMessage: '',
            expandedNodes: []
        }
        fetch('api/Subdivision/GetSubdivisionTree')
            .then(response => response.json())
            .then(data => {
                this.setState({ subdivisions: data, loading: false });
            });
        this.handlerAdd = this.handlerAdd.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleTogleTreeItems = this.handleTogleTreeItems.bind(this);
        this.handleDeleteModalTogle = this.handleDeleteModalTogle.bind(this);
        this.handleDetailsModalTogle = this.handleDetailsModalTogle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        fetch('api/Subdivision/Delete/' + this.props.selected.selectedSubdivisionId)
            .then(response => response.json())
            .then(data => {
                if (typeof (data) === 'string')
                    this.setState({ isError: true, errorMessage: data });
                else {
                    this.setState({ subdivisions: data });
                    this.handleDeleteModalTogle();
                    this.props.onSelect(0, "");
                }
            });
    }

    handleDetailsModalTogle() {
        let flag = this.state.detailsOpen;
        this.setState({ detailsOpen: !flag });
    }

    handleDeleteModalTogle() {
        let flag = this.state.deleteOpen;
        this.setState({ deleteOpen: !flag, isError: false, errorMessage: "" });
    }

    handleTogleTreeItems(expanded) {
        this.setState({ expandedNodes: expanded });
    }

    handleOpenModal(isCreate) {
        if (isCreate)
            this.setState({ formOpen: true, isCreate: true })
        else
            this.setState({ formOpen: true, isCreate: false });
    }

    handleCloseModal() {
        this.setState({ formOpen: false });
    }

    handlerAdd() {
        this.setState({ loading: true });
        fetch('api/Subdivision/GetSubdivisionTree')
            .then(response => response.json())
            .then(data => {
                this.setState({ subdivisions: data, loading: false, formOpen: false });
            });
    }

    render() {
        let isSelected = this.props.selected.selectedSubdivisionId !== 0 ? false : true;
        let form = (this.state.formOpen) ?
            <EditForm onAdd={this.handlerAdd} isCreate={this.state.isCreate} isOpen={this.state.formOpen} onClose={this.handleCloseModal} subdivisionId={this.props.selected.selectedSubdivisionId} onSelect={this.props.onSelect} />
            : null;
        let contentDelete = 'Вы уверены, что хотите удалить подразделение "' + this.props.selected.selectedSubdivisionName + '"?';
        let deleteForm = this.state.deleteOpen
            ? <DeleteDialog
                open={this.state.deleteOpen}
                onClose={this.handleDeleteModalTogle}
                title="Удаление подразделения"
                content={contentDelete}
                onDelete={this.handleDelete}
                isError={this.state.isError}
                errorMessage={this.state.errorMessage}
            />
            : null;

        let tree = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : <div>
                <BtnGroup isSelected={isSelected} onEdit={this.handleOpenModal} onDelete={this.handleDeleteModalTogle} onDetails={this.handleDetailsModalTogle} />
                <Tree selected={this.props.selected.selectedSubdivisionId} expanded={this.state.expandedNodes} data={this.state.subdivisions} onSelect={this.props.onSelect} onTogle={this.handleTogleTreeItems} />
            </div>

        let details = this.state.detailsOpen
            ? <DetailsDialog
                subdivisionId={this.props.selected.selectedSubdivisionId}
                onClose={this.handleDetailsModalTogle}
                open={this.state.detailsOpen}
            />
            : null;

        return (
            <div className="panel-body">
                <div className="card-body">
                    <h2>Подразделения</h2>
                    <hr />
                    <AddButton title="Добавить подразделение" onClick={this.handleOpenModal} />
                    {form}
                    {deleteForm}
                    {tree}
                    {details}
                </div>
            </div>
        );
    }
}