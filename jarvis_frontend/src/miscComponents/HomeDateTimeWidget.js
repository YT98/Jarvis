import React from 'react';
import styled from 'styled-components';

const weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const ClockWidget = styled.div`
    p {
        font-size: 100px;
        margin: 0 0 15px 0;
    }
`

const DateWidget = styled.div`
    p {
        font-size: 25px;
        margin: 0 0 5px 0;
    }
`

export default class HomeDateTimeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {}
        this.setDate = this.setDate.bind(this);
    }

    setDate() {
        let date = new Date();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        let day = date.getDate();
        switch(day) {
            case (1):
                day = "1st";
                break;
            case (2):
                day = "2nd";
                break;
            case (3):
                day = "3rd";
                break;
            default:
                day = day.toString() + "th";
        }
        this.setState({
            time: `${hours}:${minutes}`,
            date: `${monthArray[date.getMonth()]} ${day}`,
            weekday: `${weekdayArray[date.getDay()]}`
        })
    }

    componentDidMount() {
        setInterval(() => { this.setDate() }, 1000);
    }

    render() {
        return (
            <div>
                <ClockWidget>
                    <p>{this.state.time}</p>
                </ClockWidget>
                <DateWidget>
                    <p>{this.state.weekday}</p>
                    <p>{this.state.date}</p>
                </DateWidget>
            </div>
        )
    }
}