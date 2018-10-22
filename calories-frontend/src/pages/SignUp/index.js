import React, { Component } from 'react'
import Spinner from 'react-spinkit'
import axios from 'axios'
import { Wrapper, LoginContainer, MailInput, InputWrapper, ErrorText } from './styles'
import { validateEmail } from '../../utility'
import logo from '../../assets/logos/brand-logo.png'
import { Button } from '../../styles/mixins'
import { EditIcon } from '../../assets/icons'
import { apiUrl } from '../../config'
import { AuthConsumer } from '../../AuthContext'

class SignUp extends Component {
  state = {
    email: '',
    password1: '',
    passwordErrorText1: '',
    password2: '',
    passwordErrorText2: '',
    emailErrorText: '',
    submitError: '',
    loading: false
  }

  onEmailChange(e) {
    const email = e.target.value
    if (!validateEmail(email)) {
      this.setState({ emailErrorText: '* Please input valid email', emailError: 1 })
    } else {
      this.setState({ email, emailErrorText: '', emailError: 0 })
    }
  }

  onPasswordChange(e) {
    const password = e.target.value
    if (password == null || password.length < 6) {
      this.setState({
        passwordErrorText1: '* Password length should be 6 or more',
        passwordError1: 1
      })
    } else {
      this.setState({ password1: password, passwordErrorText1: '', passwordError1: 0 })
    }
  }

  onRePasswordChange(e) {
    const password = e.target.value
    if (password == null || password.length < 6) {
      this.setState({
        passwordErrorText2: '* Password length should be 6 or more',
        passwordError2: 1
      })
    } else {
      this.setState({ password2: password, passwordErrorText2: '', passwordError2: 0 })
    }
  }

  onSubmit(login) {
    const { emailError, passwordError1, passwordError2 } = this.state
    if (emailError === 1 || passwordError1 === 1 || passwordError2 === 1) {
      return
    }
    if (this.state.password1 !== this.state.password2) {
      return this.setState({ submitErrorText: 'Passwords dont match!', submitError: 1 })
    }
    this.setState({ loading: true, submitError: 0, submitErrorText: '' })
    const outerThis = this
    axios
      .post(`${apiUrl}/signUp`, {
        email: this.state.email,
        password: this.state.password1
      })
      .then(function(response) {
        outerThis.setState({ loading: false })
        const token = response.data.token
        const role = response.data.role
        const email = response.data.email
        login(role, token, email)
      })
      .catch(function(error) {
        outerThis.setState({
          loading: false,
          submitError: 1,
          submitErrorText: error.response.data.error
        })
      })
  }

  render() {
    const { emailError, passwordError1, passwordError2, submitError } = this.state
    return (
      <AuthConsumer>
        {({ isAuth, login }) => (
          <Wrapper>
            <LoginContainer>
              <img src={logo} alt="logo" style={{ width: 200 }} />
              <InputWrapper error={emailError}>
                <MailInput
                  onChange={e => this.onEmailChange(e)}
                  type="email"
                  placeholder="E-Mail"
                />
                <EditIcon
                  width={20}
                  height={20}
                  color="gray"
                  styles={{ position: 'absolute', right: 15, top: 35 }}
                />
              </InputWrapper>
              {emailError === 1 ? <ErrorText>{this.state.emailErrorText}</ErrorText> : null}
              <InputWrapper error={passwordError1}>
                <MailInput
                  onChange={e => this.onPasswordChange(e)}
                  type="password"
                  placeholder="Enter password"
                />
                <EditIcon
                  width={20}
                  height={20}
                  color="gray"
                  styles={{ position: 'absolute', right: 15, top: 35 }}
                />
              </InputWrapper>
              {passwordError1 === 1 ? <ErrorText>{this.state.passwordErrorText1}</ErrorText> : null}
              <InputWrapper error={passwordError2}>
                <MailInput
                  onChange={e => this.onRePasswordChange(e)}
                  type="password"
                  placeholder="Re-enter password"
                />
                <EditIcon
                  width={20}
                  height={20}
                  color="gray"
                  styles={{ position: 'absolute', right: 15, top: 35 }}
                />
              </InputWrapper>
              {passwordError2 === 1 ? <ErrorText>{this.state.passwordErrorText2}</ErrorText> : null}
              {submitError === 1 ? <ErrorText>{this.state.submitErrorText}</ErrorText> : null}
              {this.state.loading ? (
                <Spinner fadeIn="none" style={{ marginTop: '20px' }} name="circle" />
              ) : (
                <Button onClick={() => this.onSubmit(login)}>Sign Up</Button>
              )}
            </LoginContainer>
          </Wrapper>
        )}
      </AuthConsumer>
    )
  }
}

export default SignUp
