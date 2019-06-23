import React from 'react';
import styled from 'styled-components';
import HomeWeatherWidget from './weatherComponents/HomeWeatherWidget';
import HomeDateTimeWidget from './miscComponents/HomeDateTimeWidget';

const HomeContainer = styled.div`

`

const LeftSection = styled.div`
    float: left;
    width: 200px;
`

const RightSection = styled.div`
    float: right;
    width: 200px;
`

export default class Home extends React.Component {
    render() {
        return (
            <HomeContainer>

                <LeftSection>
                    <HomeDateTimeWidget />
                    <HomeWeatherWidget />
                </LeftSection>

                <RightSection>

                </RightSection>
                
            </HomeContainer>
        )
    }
}