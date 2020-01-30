import React, { Component } from 'react';
import MainContainer from './components/MainContainer.js';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <MainContainer />
        );
    }
}
