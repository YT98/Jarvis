import React from 'react';
import styled from 'styled-components';
import fetchWeather from './fetchWeather';

// Imports all weather icons from '../images/weatherIcons/'
function importAllIcons(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item) });
    return images;
}
const weatherIcons = importAllIcons(require.context('../images/weatherIcons', false, /\.svg$/));

const HomeWeatherWidgetContainer = styled.div`
    .temperature-icon {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .temperature {
            display: inline-block;
            font-size: 80px;
            margin: 0 10px 0 0;
        }
        .icon {
            height: 80px;
        }
    }
    .weather-description {
        display: block;
        text-align: right;
        font-size: 25px;
        width: 330px;
    }
`

export default class HomeWeatherWidget extends React.Component {
    constructor(props){
        super(props);
        this.state={}
        this.getCurrentWeather = this.getCurrentWeather.bind(this);
    }

    componentDidMount() {
        this.getCurrentWeather();
    }

    getCurrentWeather() {
        fetchWeather()
        .then(data => {
            this.setState({...data});
        });
    }

    render() {
        return (
            <HomeWeatherWidgetContainer>
                <div class="temperature-icon">
                    <p class="temperature"> {this.state.currentTemp}&#176; </p>
                    <img class="icon" src={weatherIcons[`${this.state.currentWeather}.svg`]} />
                </div>
                <p class="weather-description"> {this.state.currentDescription} </p>
            </HomeWeatherWidgetContainer>
        )
    }
}