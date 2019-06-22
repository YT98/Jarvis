import React from 'react';

// Socket configuration
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // Log all messages from socket to console
        socket.on('message', (message) => console.log(message));
    }

    render() {
        return (
            <div>
                <h1> Hello, World! </h1>
            </div>
        )
    }
}