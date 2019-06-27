import React from 'react';
import styled from 'styled-components';
import sunnyIcon from '../images/sunny.png';
import cloudyIcon from '../images/cloudy.svg';

const HomeWeatherWidgetContainer = styled.div`
    p {
        display: inline;
        font-size: 100px;
        margin: 0;
    }
    img {
        height: 100px;
        display: inline-block;
    }
`

export default class HomeWeatherWidget extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
        this.getCurrentWeather = this.getCurrentWeather.bind(this);
        this.getWeatherIcon = this.getWeatherIcon.bind(this);
    }

    componentDidMount() {
        this.getCurrentWeather();
        console.log(sunnyIcon);
    }

    getWeatherIcon() {
        switch(this.state.weather) {
            case "Clouds":
                return cloudyIcon;
                break;
            default:
                return sunnyIcon;
        }
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
                <p> {this.state.currentTemp}&#176; </p>
                <img src={this.getWeatherIcon()} />
            </HomeWeatherWidgetContainer>
        )
    }
}