import React from 'react';
import styled from 'styled-components';
import sunnyIcon from '../images/sunny.png';
import cloudyIcon from '../images/cloudy.svg';

const HomeWeatherWidgetContainer = styled.div`
    display: flex;
    align-items: center;
    p {
        display: inline-block;
        font-size: 80px;
        margin: 0 10px 0 0;
    }
    img {
        height: 80px;
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
        fetch("http://localhost:5000/weather/current")
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