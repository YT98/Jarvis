import React from 'react';
import styled from 'styled-components';

// Imports all weather icons from '../images/weatherIcons/'
function importAllIcons(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item) });
    return images;
}
const weatherIcons = importAllIcons(require.context('../images/weatherIcons', false, /\.(png|jpe?g|svg)$/));

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
    }

    componentDidMount() {
        this.getCurrentWeather();
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
                <img src={weatherIcons[`${this.state.weather}.svg`]} />
            </HomeWeatherWidgetContainer>
        )
    }
}