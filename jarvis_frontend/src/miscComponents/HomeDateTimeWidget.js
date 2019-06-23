import React from 'react';
import styled from 'styled-components';

const weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const ClockWidget = styled.div`
`

const DateWidget = styled.div`
`

export default class HomeDateTimeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {}
    }


    componentDidMount() {
        setInterval(() => {
            let date = new Date();
            this.setState({
                time: `${date.getHours()}:${date.getMinutes()}`,
                date: `${monthArray[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`,
                weekday: `${weekdayArray[date.getDay()]}`
            })
        }, 1000)
    }

    render() {
        return (
            <div>
                <p>{this.state.time}</p>
                <p>{this.state.weekday}</p>
                <p>{this.state.date}</p>
            </div>
        )
    }
}