import styled from 'styled-components'
import colors from './colors'
import sizes from './sizes'

export const Button = styled.div`
  background-color: ${colors.primaryButton};
  max-width: ${props => props.width};
  width: 50%;
  padding: 15px 20px;
  margin-top: 20px;
  color: white;
  font-size: 18px;
  display: flex;
  font-weight: medium;
  justify-content: center;
  cursor: pointer;
  border-radius: ${sizes.buttonBorderRadius};
`
export const Input = styled.input`
  height: 45px;
  border: none;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  outline: none;
  z-index: 2;
  max-width: 600px;
  margin-top: 20px;
`
