import React from 'react';
import styled from 'styled-components';
import HomeWeatherWidget from './weatherComponents/HomeWeatherWidget';
import HomeDateTimeWidget from './miscComponents/HomeDateTimeWidget';
import HomeCalendarWidget from './calendarComponents/HomeCalendarWidget';

const HomeContainer = styled.div`

`

const LeftSection = styled.div`
    float: left;
`

const RightSection = styled.div`
    float: right;
`

export default class Home extends React.Component {
    render() {
        return (
            <HomeContainer>

                <LeftSection>
                    <HomeDateTimeWidget />
                    <HomeCalendarWidget />
                </LeftSection>

                <RightSection>
                    <HomeWeatherWidget />
                </RightSection>
                
            </HomeContainer>
        )
    }
}