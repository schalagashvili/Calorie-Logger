import React, { Component } from 'react'
import { Wrapper, LoginContainer, InputField, InputWrapper, ErrorText } from './styles'
import { validateEmail } from '../../utility'
import { isEmpty } from 'lodash'
import { AuthConsumer } from '../../AuthContext'
import { userSignUp } from '../../actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyledButton } from '../Login/styles'

class SignUp extends Component {
  state = {
    email: '',
    password1: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    emailErrorText: '',
    submitError: ''
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
        passwordError: '* Password length should be 6 or more',
        passwordError1: 1
      })
    } else {
      this.setState({ password1: password, passwordError: '', passwordError1: 0 })
    }
  }

  onRePasswordChange(e) {
    const password = e.target.value
    if (password == null || password.length < 6) {
      this.setState({
        confirmPasswordError: '* Password length should be 6 or more',
        passwordError2: 1
      })
    } else {
      this.setState({ confirmPassword: password, confirmPasswordError: '', passwordError2: 0 })
    }
  }

  async onSubmit(login) {
    const { emailError, passwordError1, passwordError2 } = this.state
    if (this.state.password1 === '' || this.state.confirmPassword === '' || this.state.email === '') {
      return this.setState({ submitError: 1, submitErrorText: 'Please fill fields' })
    }
    if (emailError === 1 || passwordError1 === 1 || passwordError2 === 1) {
      return
    }
    if (this.state.password1 !== this.state.confirmPassword) {
      return this.setState({ submitErrorText: 'Passwords dont match!', submitError: 1 })
    }
    this.setState({ submitError: 0, submitErrorText: '' })
    const outerThis = this
    await this.props.userSignUp(this.state.email, this.state.password1)
    const user = this.props.currentUser
    if (!isEmpty(user)) {
      const token = user.token
      const role = user.role
      const email = this.state.email
      login(role, token, email)
    } else if (this.props.errors) {
      const error = this.props.errors.response.error

      outerThis.setState({
        submitError: 1,
        submitErrorText: error
      })
    }
  }

  render() {
    const { emailError, passwordError1, passwordError2, submitError, passwordError, emailErrorText } = this.state
    return (
      <AuthConsumer>
        {({ login }) => (
          <Wrapper>
            <LoginContainer>
              <InputWrapper error={emailError}>
                <InputField onChange={e => this.onEmailChange(e)} type='email' placeholder='E-Mail' />
              </InputWrapper>
              {emailError === 1 ? <ErrorText>{emailErrorText}</ErrorText> : null}
              <InputWrapper error={passwordError1}>
                <InputField onChange={e => this.onPasswordChange(e)} type='password' placeholder='Enter password' />
              </InputWrapper>
              {passwordError1 === 1 ? <ErrorText>{passwordError}</ErrorText> : null}
              <InputWrapper error={passwordError2}>
                <InputField onChange={e => this.onRePasswordChange(e)} type='password' placeholder='Re-enter password' />
              </InputWrapper>
              {passwordError2 === 1 ? <ErrorText>{this.state.confirmPasswordError}</ErrorText> : null}
              {submitError === 1 ? <ErrorText>{this.state.submitErrorText}</ErrorText> : null}
              <StyledButton onClick={() => this.onSubmit(login)}>Sign Up</StyledButton>
              <div>Login</div>
            </LoginContainer>
          </Wrapper>
        )}
      </AuthConsumer>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userSignUp: bindActionCreators(userSignUp, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.data,
    errors: state.user.errors
  }
}

const SignUpComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
export default SignUpComponent
