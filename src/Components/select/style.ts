import styled from 'styled-components';

interface Props {
    touch:boolean;
    focus:boolean;
    valid?:boolean;
}

export const SmartSelect = styled.select<Props>`
    border:${props=>props.focus?`solid 4px ${
        props.valid?'green':'red'
    }`:'solid 1px gray'};
    transition-duration: 0.5s;
`