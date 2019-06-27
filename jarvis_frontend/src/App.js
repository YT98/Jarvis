import React from 'react';
import openSocket from 'socket.io-client';
import Home from './Home';

import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const AppContainer = styled.div`
    background-color: #7C989D;
    height: 100vh;
    width: 100vw;
    font-family: 'Open Sans', sans-serif;
    font-weight: 100;
    color: white;
    padding: 50px;
`

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appName: ""
        }
    }

    componentDidMount() {
        // Log all messages from socket to console
        const socket = openSocket('http://localhost:8000');
        this.setState({
            socket: socket
        }, () => {
            socket.on('message', (message) => {
                let data = JSON.parse(message);
                this.setState({ appName: data.app })
            });
        });
    }

    render() {
        return (
            <AppContainer>
                <GlobalStyle/>
                {/* <p> {this.state.appName} </p> */}
                <Home/>
            </AppContainer>
        )
    }
}