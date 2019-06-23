import React from 'react';
import styled from 'styled-components';

const HomeWeatherWidgetContainer = styled.div`
`

export default class HomeWeatherWidget extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
        this.getCurrentWeather = this.getCurrentWeather.bind(this);
    }

    componentDidMount() {
        this.getCurrentWeather();
    }

    getCurrentWeather() {
        fetch("http://localhost:5000/currentweather")
        .then(res => res.json())
        .then(data => {
            this.setState({...data});
        });
    }

    render() {
        return (
            <HomeWeatherWidgetContainer>
                <p> Weather Widget </p>
                <button onClick={() => this.getCurrentWeather()}> getCurrentWeather() </button>
                <p> Current Temperature: {this.state.currentTemp} </p>
            </HomeWeatherWidgetContainer>
        )
    }
}