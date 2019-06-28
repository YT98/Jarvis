import React from 'react';
import styled from 'styled-components';

const PlaceholderContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
        font-size: 20px;
        color: white;
    }
`


export default class PlaceholderAppInfo extends React.Component{

    render() {
        return (
            <PlaceholderContainer>
                <p>{this.props.appName}</p>
            </PlaceholderContainer>
        )
    }
}