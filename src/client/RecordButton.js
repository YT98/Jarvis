import React from 'react';

export default class RecordButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        fetch("http://localhost:5000/record/")
        .then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log("Error", error);
            }
        )
    }

    render() {
        return (
            <button onClick={this.handleClick}> Click to record. </button>
        )
    }
}