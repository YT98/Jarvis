import React from 'react';

// Socket configuration
import openSocket from 'socket.io-client';

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
                <h1> Hello, World! </h1>
                <p> {this.state.appName} </p>
            </div>
        )
    }
}