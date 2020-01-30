import React, { Component } from 'react';
import EmployeeContainer from './employee/EmployeeContainer.js';
import SubdivisionContainer from './subdivision/SubdivisionContainer';


export default class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            selectedSubdivisionId: 0,
            selectedSubdivisionName:''
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(id, name) {
        this.setState({ selectedSubdivisionId: id, selectedSubdivisionName: name });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-5">
                        <SubdivisionContainer onSelect={this.handleSelect} selected={this.state} />
                    </div>
                    <div className="col-md-7">
                        <EmployeeContainer selected={this.state.selectedSubdivisionId} selectedName={this.state.selectedSubdivisionName} />
                    </div>
                </div>
            </div>
            );
    }
}