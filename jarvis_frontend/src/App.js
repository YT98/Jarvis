import React from 'react';
import openSocket from 'socket.io-client';
import Home from './Home';

import PlaceholderAppInfo from './miscComponents/PlaceholderAppInfo';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

const socket = openSocket('http://localhost:8000');

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
  }
`

const theme = {
}

const AppContainer = styled.div`
    background-color: #7C989D;
    height: 100vh;
    width: 100vw;
    color: white;
    padding: 50px;
    box-sizing: border-box;
`

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appName: ""
        }
        this.updateAppName = this.updateAppName.bind(this);
    }

    updateAppName(message) {
        let data = JSON.parse(message);
        console.log(message);
        this.setState({ appName: data.appName });
    }

    componentDidMount() {
        socket.on('message', (message) => this.updateAppName(message));
    }

    componentWillUnmount() {
        socket.off('message', (message) => this.updateAppName(message));
    }

    render() {
        return (
            <AppContainer>
                <ThemeProvider theme={theme}>
                    <div>
                        <GlobalStyle/>
                        <PlaceholderAppInfo appName={this.state.appName} />
                        <Home/>
                    </div>
                </ThemeProvider>
            </AppContainer>
        )
    }
}