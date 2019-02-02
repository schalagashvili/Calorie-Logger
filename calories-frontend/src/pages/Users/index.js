import React, { Component } from 'react'
import axios from 'axios'
import config from '../../config'
import {
  Header,
  HeaderDecoration,
  Wrapper,
  NavigationTab,
  Add,
  AddContainer,
  Button,
  Title,
  InnerWrapper,
  Record,
  Records,
  IconsWrapper,
  RecordsHeader,
  CaloriesInfo,
  AddButton,
  ButtonText,
  AddRecordButton
} from './styles'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import { DatePicker, TimePicker } from '../../components'
import { Input } from '../../styles/mixins'
import logo from '../../assets/logos/brand-logo.png'
import history from '../../history'
import TweenLite from 'gsap'
import { ErrorText } from '../SignUp/styles'
import BaseHeader from '../../components/BaseHeader'
import { validateEmail } from '../../utility'
import { AuthConsumer } from '../../AuthContext'

class Home extends Component {
  state = {
    isEditUserShowing: false,
    isAdd: true,
    addEmail: null,
    addPassword: null,
    addRole: 'regular',
    viewEmail: null,
    viewRole: null,
    viewId: null
  }

  onAddNewUser() {
    const { addEmail, addPassword, addRole } = this.state
    axios({
      method: 'post',
      url: `${config.apiUrl}/createUser`,
      headers: { authorization: this.props.token },
      data: {
        email: addEmail,
        password: addPassword,
        role: addRole
      }
    })
      .then(response => {
        const _id = response.data._id
        let users = this.state.users
        users.push({ _id, email: addEmail, role: addRole })
        this.setState({
          users,
          addError: null,
          addEmail: null,
          addPassword: null,
          addRole: 'regular'
        })
        this.addUserCloseHandler()
      })
      .catch(err => {
        this.setState({ addError: err.response.data.error })
      })
  }

  onEditUser() {
    const { viewRole, viewId, users, viewEmail } = this.state
    axios({
      method: 'post',
      url: `${config.apiUrl}/editUser/${viewId}`,
      headers: { authorization: this.props.token },
      data: {
        role: viewRole
      }
    }).then(response => {
      const targetIndex = users.findIndex(user => user._id === viewId)
      users[targetIndex] = { _id: viewId, email: viewEmail, role: viewRole }
      this.setState({ users, viewId: null, viewEmail: '', viewRole: 'regular' })
      this.editCloseHandler()
    })
  }

  componentDidMount() {
    const { token, role } = this.props
    if (role !== 'admin' && role !== 'manager') {
      history.push('/logs')
    } else {
      axios
        .get(`${config.apiUrl}/getAllUsers`, {
          headers: { authorization: token }
        })
        .then(response => {
          this.setState({ users: response.data.users || [] })
        })
    }
  }

  onEmailChange(e) {
    const email = e.target.value
    if (!validateEmail(email)) {
      this.setState({ emailErrorText: '* Please input valid email', emailError: 1 })
    } else {
      this.setState({ addEmail: email, emailErrorText: '', emailError: 0 })
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
      this.setState({ addPassword: password, passwordErrorText: '', passwordError: 0 })
    }
  }

  editOpenHandler = (isAdd, id, email, role) => {
    const { isEditUserShowing } = this.state

    if (!isEditUserShowing) {
      TweenLite.to('#edit-user', 0.4, {
        height: '360px',
        borderBottom: '1px solid #dce0e0'
      })
    }

    this.setState({ isEditUserShowing: true, viewEmail: email, viewRole: role, viewId: id })
  }

  editCloseHandler = () => {
    const { isEditUserShowing } = this.state

    if (isEditUserShowing) {
      TweenLite.to('#edit-user', 0.4, { height: 0, borderBottom: 'none' })
    }
    this.setState({ isEditUserShowing: false })
  }

  addUserOpenHandler = () => {
    const { isEditUserShowing } = this.state

    if (!isEditUserShowing) {
      TweenLite.to('#add-user', 0.4, {
        height: '360px',
        borderBottom: '1px solid #dce0e0'
      })
    }

    this.setState({ isEditUserShowing: true })
  }

  addUserCloseHandler = () => {
    const { isEditUserShowing } = this.state

    if (isEditUserShowing) {
      TweenLite.to('#add-user', 0.4, { height: 0, borderBottom: 'none' })
    }
    this.setState({ isEditUserShowing: false })
  }

  onUserClick(id) {
    if (this.props.role === 'admin') {
      history.push(`/logs/${id}`)
    }
  }

  renderUsers(originalEmail) {
    const users = this.state.users || []
    return users.map(user => {
      let { email, role, _id } = user
      if (email === originalEmail) return null
      if (this.props.role === 'manager' && role === 'admin') return null
      return (
        <Record key={_id}>
          <div onClick={() => this.onUserClick(_id)} style={{ flex: 1, cursor: 'pointer' }}>
            {email}
          </div>
          <div style={{ flex: 1 }}>{role}</div>
          <IconsWrapper style={{ flex: 0.2 }}>
            <div onClick={() => this.editOpenHandler(false, _id, email, role)}>
              <EditIcon width={13} height={13} color="gray" styles={{ cursor: 'pointer' }} />
            </div>
            <div onClick={() => this.onDelete(_id)}>
              <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
            </div>
          </IconsWrapper>
        </Record>
      )
    })
  }

  onRoleChange(e, isView) {
    if (isView) {
      return this.setState({ viewRole: e.target.value })
    }
    this.setState({ addRole: e.target.value })
  }

  onDelete(id) {
    axios({
      method: 'delete',
      url: `${config.apiUrl}/deleteUser/${id}`,
      headers: { authorization: this.props.token }
    }).then(() => {
      let users = this.state.users
      users = users.filter(user => user._id !== id)
      this.setState({ users })
    })
  }

  render() {
    const { isEditUserShowing } = this.state

    return (
      <AuthConsumer>
        {({ isAuth, login, logout, email }) => (
          <Wrapper>
            <BaseHeader role={this.props.role} onLogout={logout} />
            <HeaderDecoration>Users Management</HeaderDecoration>
            <Add id="add-user" isEditUserShowing={isEditUserShowing}>
              <InnerWrapper>
                <AddContainer>
                  <RecordsHeader>Add User</RecordsHeader>
                  <Input onChange={e => this.onEmailChange(e)} placeholder="Email" type="email" />
                  {this.state.emailError === 1 ? (
                    <ErrorText>{this.state.emailErrorText}</ErrorText>
                  ) : null}
                  <Input
                    onChange={e => this.onPasswordChange(e)}
                    placeholder="Password"
                    type="password"
                  />
                  {this.state.passwordError === 1 ? (
                    <ErrorText>{this.state.passwordErrorText}</ErrorText>
                  ) : null}
                  {this.props.role === 'admin' ? (
                    <div style={{ width: '50%', marginTop: '20px' }}>
                      <span>Role: </span>
                      <select
                        value={this.state.addRole || 'regular'}
                        onChange={e => this.onRoleChange(e)}
                      >
                        <option value="regular">Regular</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  ) : (
                      <div style={{ width: '50%', marginTop: '20px' }}>
                        <span>Role: </span>
                        <select
                          value={this.state.addRole || 'regular'}
                          onChange={e => this.onRoleChange(e)}
                        >
                          <option value="regular">Regular</option>
                          <option value="manager">Manager</option>
                        </select>
                      </div>
                    )}
                  {this.state.addError != null ? (
                    <ErrorText>{this.state.addError}</ErrorText>
                  ) : null}
                  <div
                    style={{
                      marginLeft: 'auto',
                      display: 'flex',
                      alignItems: 'baseline',
                      width: 140
                    }}
                  >
                    <div onClick={this.addUserCloseHandler} style={{ cursor: 'pointer' }}>
                      Close
                    </div>
                    <Button onClick={() => this.onAddNewUser()}>Save</Button>
                  </div>
                </AddContainer>
              </InnerWrapper>
            </Add>
            <Add id="edit-user" isEditUserShowing={isEditUserShowing}>
              <InnerWrapper>
                <AddContainer>
                  <RecordsHeader>Edit User</RecordsHeader>
                  <Input
                    disabled
                    value={this.state.viewEmail || ''}
                    placeholder="Email"
                    type="email"
                  />
                  {this.props.role === 'admin' ? (
                    <div style={{ width: '50%', marginTop: '20px' }}>
                      <span>Role: </span>
                      <select
                        value={this.state.viewRole || 'regular'}
                        onChange={e => this.onRoleChange(e, true)}
                      >
                        <option value="regular">Regular</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  ) : (
                      <div style={{ width: '50%', marginTop: '20px' }}>
                        <span>Role: </span>
                        <select
                          value={this.state.viewRole || 'regular'}
                          onChange={e => this.onRoleChange(e, true)}
                        >
                          <option value="regular">Regular</option>
                          <option value="manager">Manager</option>
                        </select>
                      </div>
                    )}
                  <div
                    style={{
                      marginLeft: 'auto',
                      display: 'flex',
                      alignItems: 'baseline',
                      width: 140
                    }}
                  >
                    <div onClick={this.editCloseHandler} style={{ cursor: 'pointer' }}>
                      Close
                    </div>
                    <Button onClick={() => this.onEditUser()}>Save</Button>
                  </div>
                </AddContainer>
              </InnerWrapper>
            </Add>
            <InnerWrapper>
              <AddRecordButton onClick={this.addUserOpenHandler}>Add New</AddRecordButton>
              <Records>
                <RecordsHeader>Users</RecordsHeader>
                {this.renderUsers(email)}
              </Records>
            </InnerWrapper>
          </Wrapper>
        )}
      </AuthConsumer>
    )
  }
}

export default Home
