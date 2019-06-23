import React from 'react';
import HomeWeatherWidget from './weatherComponents/HomeWeatherWidget';
import HomeDateTimeWidget from './miscComponents/HomeDateTimeWidget';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeDateTimeWidget />
                <HomeWeatherWidget />
            </div>
        )
    }
}