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
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: ${sizes.borderRadius};
  background-color: white;
  outline: none;
  padding: 10px 15px;
  z-index: 2;
  margin-top: 20px;
`
