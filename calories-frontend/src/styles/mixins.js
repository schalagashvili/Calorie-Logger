import styled from 'styled-components'
import colors from './colors'
import sizes from './sizes'

export const Button = styled.div`
  background-color: ${props => props.color};
  max-width: 100px;
  padding: 8px 20px;
  color: white;
  height: 36px;
  font-size: ${props => (props.logout ? '16px' : '16px')};
  display: flex;
  box-shadow: ${colors.primaryBoxShadow};
  font-weight: medium;
  justify-content: center;
  cursor: pointer;
  border-radius: 25px;
  margin-right: 15px;
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
