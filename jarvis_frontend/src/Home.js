import React from 'react';
import styled from 'styled-components';
import HomeWeatherWidget from './weatherComponents/HomeWeatherWidget';
import HomeDateTimeWidget from './miscComponents/HomeDateTimeWidget';

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
                </LeftSection>

                <RightSection>
                    <HomeWeatherWidget />
                </RightSection>
                
            </HomeContainer>
        )
    }
}