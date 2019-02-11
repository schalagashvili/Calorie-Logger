import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  Wrapper,
  LoginContainer,
  MailInput,
  Register,
  ErrorText,
  StyledButton
} from './styles'
import { validateEmail } from '../../utility'
import { AuthConsumer } from '../../AuthContext'
import { withStyles } from '@material-ui/core/styles'
import { userLogin } from '../../actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})

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
      this.setState({
        emailErrorText: '* Please input valid email',
        emailError: 1
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
        passwordError: 1
      })
    } else {
      this.setState({ password, passwordErrorText: '', passwordError: 0 })
    }
  }

  async onSubmit(login) {
    const { emailError, passwordError1 } = this.state
    if (emailError === 1 || passwordError1 === 1) {
      return
    }
    this.setState({ loading: true, submitError: 0, submitErrorText: '' })
    const outerThis = this

    await this.props.userLogin(this.state.email, this.state.password)
    console.log(this.props.loggedUser, 'დალოგილი იუზერი')
    
  //   axios
  //     .post(`${apiUrl}/signIn`, {
  //       email: this.state.email,
  //       password: this.state.password
  //     })
  //     .then(function(response) {
  //       outerThis.setState({ loading: false })
  //       const token = response.data.token
  //       const role = response.data.role
  //       const email = response.data.email
  //       login(role, token, email)
  //     })
  //     .catch(function(error) {
  //       outerThis.setState({
  //         loading: false,
  //         submitError: 1,
  //         submitErrorText:
  //           error.response.status === 401
  //             ? 'Username and password dont match!'
  //             : 'Server error occurred...'
  //       })
  //     })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { emailError, passwordError, submitError, passwordErrorText, submitErrorText , emailErrorText} = this.state

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
                <MailInput onChange={e => this.onEmailChange(e)} placeholder='E-Mail' />

                {emailError === 1 ? <ErrorText>{emailErrorText}</ErrorText> : null}
                <MailInput
                  onChange={e => this.onPasswordChange(e)}
                  type='password'
                  placeholder='Password'
                />
                {/* ამას დივი უნდა ჰქონდეს თავისიი!!!! */}
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
    addMealLog: bindActionCreators(userLogin, dispatch),
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.data
  }
}

const LoginWithStyles = withStyles(styles)(Login)
const LoginComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWithStyles)
export default LoginComponent
