import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'react-spinkit'
import { Link, Redirect } from 'react-router-dom'
import { Wrapper, LoginContainer, MailInput, Register, InputWrapper, ErrorText } from './styles'
import logo from '../../assets/logos/brand-logo.png'
import { Button } from '../../styles/mixins'
import { EditIcon } from '../../assets/icons'
import { validateEmail } from '../../utility'
import { apiUrl } from '../../config'
import { AuthConsumer } from '../../AuthContext'

class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordErrorText: '',
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
        passwordErrorText: '* Password length should be 6 or more',
        passwordError: 1
      })
    } else {
      this.setState({ password, passwordErrorText: '', passwordError: 0 })
    }
  }

  onSubmit(login) {
    const { emailError, passwordError1 } = this.state
    if (emailError === 1 || passwordError1 === 1) {
      return
    }
    this.setState({ loading: true, submitError: 0, submitErrorText: '' })
    const outerThis = this
    axios
      .post(`${apiUrl}/signIn`, {
        email: this.state.email,
        password: this.state.password
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
          submitErrorText:
            error.response.status === 401
              ? 'Username and password dont match!'
              : 'Server error occurred...'
        })
      })
  }

  render() {
    const { emailError, passwordError, submitError } = this.state
    return (
      <AuthConsumer>
        {({ isAuth, login, role }) => {
          if (isAuth) {
            if (role === 'regular') {
              return <Redirect to="/logs" />
            } else {
              return <Redirect to="/users" />
            }
          }
          return (
            <Wrapper>
              <LoginContainer>
                <img src={logo} alt="logo" style={{ width: 200 }} />
                <InputWrapper>
                  <MailInput onChange={e => this.onEmailChange(e)} placeholder="E-Mail" />
                  <EditIcon
                    width={20}
                    height={20}
                    color="gray"
                    styles={{ position: 'absolute', right: 15, top: 35 }}
                  />
                </InputWrapper>
                {emailError === 1 ? <ErrorText>{this.state.emailErrorText}</ErrorText> : null}
                <InputWrapper>
                  <MailInput
                    onChange={e => this.onPasswordChange(e)}
                    type="password"
                    placeholder="Password"
                  />
                  <EditIcon
                    width={20}
                    height={20}
                    color="gray"
                    styles={{ position: 'absolute', right: 15, top: 35 }}
                  />
                </InputWrapper>
                {passwordError === 1 ? <ErrorText>{this.state.passwordErrorText}</ErrorText> : null}
                {submitError === 1 ? <ErrorText>{this.state.submitErrorText}</ErrorText> : null}
                {this.state.loading ? (
                  <Spinner fadeIn="none" style={{ marginTop: '20px' }} name="circle" />
                ) : (
                  <Button onClick={() => this.onSubmit(login)}>Log In</Button>
                )}
                <Link to="/signup">
                  <Register>Register</Register>
                </Link>
              </LoginContainer>
            </Wrapper>
          )
        }}
      </AuthConsumer>
    )
  }
}

export default Login
