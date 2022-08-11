import styled from "styled-components"

export const FormStyles = styled.div `
width: 100%;
display: flex;

align-items: center;
gap: 0.5rem;
justify-content: center;

color: ${props=> props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;
`
const BaseInput = styled.input `
background: transparent;
border: 0;
height: 2.5rem;

font-weight: bold;
font-size: inherit;
padding:0 0.5rem;

color: ${props=> props.theme['gray-100']};
border-bottom: 1px solid ${props=> props.theme['gray-500']};

:focus {
    box-shadow: none;
    border-color: ${props=> props.theme['green-500']};
}

::placeholder {
    color: ${props=> props.theme['gray-500']};
}

`

export const TaskInputStyles = styled(BaseInput) `
flex: 1;

&::-webkit-calendar-picker-indicator {
    display: none !important;   
}
`
export const TimerInputStyles = styled(BaseInput) `
width: 4rem;
`