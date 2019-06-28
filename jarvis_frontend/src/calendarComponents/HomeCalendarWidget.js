import React from 'react';
import styled from 'styled-components';

const HomeCalendarWidgetContainer = styled.div`

`

const EventContainer = styled.div`
    position: relative;
    margin: 40px 0 40px 0;
    padding-left: 30px;
    .colorBar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 7px;
        background-color: ${props => props.color};
        opacity: 0.8;
        border-radius: 5px;
    }
    .eventName {
        font-size: 18px;
        font-weight: 400;
        margin: 0 0 10px 0;
    }
    .eventTime {
        margin: 0;
    }
`

export default class HomeCalendarWidget extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {}
        this.getDailyEvents = this.getDailyEvents.bind(this);
    }

    getDailyEvents() {
        fetch('http://localhost:5000/calendar/daily')
        .then(res => res.json())
        .then(data => {
            this.setState({...data});
        });
    }

    componentDidMount() {
        this.getDailyEvents();
    }

    render() {

        const eventsFetched = this.state.events != null;
        let event;
        if (eventsFetched) {
            event = this.state.events.map((event, index) => 
                <EventContainer key={index} color={event.color}>
                    <span class="colorBar"></span>
                    <p class="eventName"> {event.name} </p>
                    <p class="eventTime"> Today from {event.startTime} to {event.endTime} </p> 
                </EventContainer>
            )
        } else {
            event = <p> Loading </p>
        }

        return (
            <HomeCalendarWidgetContainer>
                {event}
            </HomeCalendarWidgetContainer>
        )
    }
}