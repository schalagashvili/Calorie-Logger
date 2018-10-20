import styled from 'styled-components'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'

export const Wrapper = styled.div`
  background: ${colors.primaryBackground};
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ErrorText = styled.p`
  color: red;
  font-size: 15px;
  margin-top: 10px;
  font-family: QuicksandRegular;
`

export const LoginContainer = styled.div`
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: ${sizes.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const MailInput = styled.input`
  width: 300px;
  height: 55px;
  border: 1px solid #dce0e0;
  border-radius: ${sizes.borderRadius};
  background-color: white;
  outline: none;
  padding: 10px 15px;
  font-size: 16px;
  margin-top: 20px;
`

export const Register = styled.div`
  color: #00b2d6;
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
`

export const InputWrapper = styled.div`
  position: relative;
`
