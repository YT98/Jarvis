import React from 'react';

const evtSource = new EventSource("localhost:5000/test");

evtSource.onmessage = (e) => {
    console.log(e.data);
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1> Hello, World! </h1>
            </div>
        )
    }
}