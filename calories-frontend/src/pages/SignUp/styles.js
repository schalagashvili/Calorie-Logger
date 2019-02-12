import styled from 'styled-components'
import sizes from '../../styles/sizes'
import bgImage from '../../assets/images/bgImage.jpg'

export const Wrapper = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  min-height: 100vh;
  height: 100%;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
`

export const ErrorText = styled.p`
  color: red;
  font-size: 15px;
  margin-top: 10px;
`

export const SaveErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 10px;
`

export const LoginContainer = styled.div`
  width: 400px;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 0px 238px 14px rgba(5, 5, 5, 1);
  border-radius: ${sizes.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
`

export const InputField = styled.input`
  width: 300px;
  height: 55px;
  border: 1px solid ${props => props.borderColor ? props.borderColor : '#dce0e0'};
  border-radius: 35px;
  outline: none;
  color: white;
  padding: 10px 30px;
  font-size: 16px;
  background-color: transparent;
  margin-top: 30px;
`

export const Register = styled.div`
  color: white;
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
`

export const InputWrapper = styled.div`
  position: relative;
`
