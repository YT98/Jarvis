import React from 'react';
import openSocket from 'socket.io-client';
import Home from './Home';

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
            <div>
                <p> {this.state.appName} </p>
                <Home/>
            </div>
        )
    }
}