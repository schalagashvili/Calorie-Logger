import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Wrapper, LoginContainer, InputField, Register, ErrorText, StyledButton } from './styles'
import { validateEmail } from '../../utility'
import { AuthConsumer } from '../../AuthContext'
import { userLogin } from '../../actions/user'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordErrorText: '',
    emailErrorText: '',
    submitError: ''
  }

  onEmailChange(e) {
    const email = e.target.value
    if (!validateEmail(email)) {
      this.setState({
        emailErrorText: '* Please input valid email',
        emailError: 1,
        submitErrorText: ''
      })
    } else {
      this.setState({ email, emailErrorText: '', emailError: 0 })
    }
  }

  onPasswordChange(e) {
    const password = e.target.value
    if (password == null || password.length < 6) {
      this.setState({
        passwordErrorText: '* Password length should be 6 or more',
        passwordError: 1,
        submitErrorText: ''
      })
    } else {
      this.setState({ password, passwordErrorText: '', passwordError: 0 })
    }
  }

  async onSubmit(login) {
    const { emailError, passwordError1, password, email } = this.state

    if (password === '' || email === '') {
      return this.setState({ submitError: 1, submitErrorText: '* Please fill in fields' })
    }

    if (emailError === 1 || passwordError1 === 1) {
      return
    }
    this.setState({ submitError: 0, submitErrorText: '' })
    const outerThis = this

    await this.props.userLogin(email, password)
    const user = this.props.loggedUser

    if (!isEmpty(user)) {
      const token = user.token
      const role = user.role
      const email = user.email
      login(role, token, email)
    } else {
      const errorStatus = this.props.errors.status

      outerThis.setState({
        submitError: 1,
        submitErrorText: errorStatus === 401 ? '* Username and password dont match!' : '* Server error occurred...'
      })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { emailError, passwordError, submitError, passwordErrorText, submitErrorText, emailErrorText } = this.state

    return (
      <AuthConsumer>
        {({ isAuth, login, role }) => {
          if (isAuth) {
            if (role === 'regular') {
              return <Redirect to='/logs' />
            } else {
              return <Redirect to='/users' />
            }
          }
          return (
            <Wrapper>
              <LoginContainer>
                <InputField onChange={e => this.onEmailChange(e)} placeholder='E-Mail' borderColor={emailError === 1 && 'red'} />

                {emailError === 1 ? <ErrorText>{emailErrorText}</ErrorText> : null}
                <InputField
                  onChange={e => this.onPasswordChange(e)}
                  type='password'
                  placeholder='Password'
                  borderColor={passwordError === 1 && 'red'}
                />
                {passwordError === 1 ? <ErrorText>{passwordErrorText}</ErrorText> : null}
                {submitError === 1 ? <ErrorText>{submitErrorText}</ErrorText> : null}
                <StyledButton onClick={() => this.onSubmit(login)}>Log In</StyledButton>
                <Link to='/signup' style={{ backgroundColor: 'transparent' }}>
                  <Register>Sign Up</Register>
                </Link>
              </LoginContainer>
            </Wrapper>
          )
        }}
      </AuthConsumer>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.data,
    errors: state.user.errors
  }
}

const LoginComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default LoginComponent
