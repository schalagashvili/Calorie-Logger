import React, { Component } from 'react'
import {
  Wrapper,
  Add,
  AddContainer,
  Button,
  InnerWrapper,
  Record,
  Records,
  IconsWrapper,
  RecordsHeader,
  AddRecordButton,
  Role,
  Buttons
} from './styles'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import { Input } from '../../styles/mixins'
import history from '../../history'
import { ErrorText } from '../SignUp/styles'
import BaseHeader from '../../components/BaseHeader'
import { validateEmail } from '../../utility'
import { AuthConsumer } from '../../AuthContext'
import { deleteUser, getAllUsers, editUser, addNewUser } from '../../actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


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

  async onAddNewUser() {
    const { addEmail, addPassword, addRole } = this.state

    await this.props.addNewUser(addEmail, addPassword, addRole, this.props.token)
    console.log(this.props.newUser, 'ახალი იუზერი')
    if(this.props.newUser) {

      const _id = this.props.newUser._id
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
    } else {
      console.log(this.props.addUserError, 'ლკჯფდსკფდ')
        // this.setState({ addError: err.response.data.error })
    }
    // axios({
    //   method: 'post',
    //   url: `${config.apiUrl}/createUser`,
    //   headers: { authorization: this.props.token },
    //   data: {
    //     email: addEmail,
    //     password: addPassword,
    //     role: addRole
    //   }
    // })
    //   .then(response => {
    //     const _id = response.data._id
    //     let users = this.state.users
    //     users.push({ _id, email: addEmail, role: addRole })
    //     this.setState({
    //       users,
    //       addError: null,
    //       addEmail: null,
    //       addPassword: null,
    //       addRole: 'regular'
    //     })
    //     this.addUserCloseHandler()
    //   })
    //   .catch(err => {
    //     this.setState({ addError: err.response.data.error })
    //   })
  }

  onEditUser() {
    const { viewRole, viewId, users, viewEmail } = this.state
    const token = this.props.token
    // axios({
    //   method: 'post',
    //   url: `${config.apiUrl}/editUser/${viewId}`,
    //   headers: { authorization: this.props.token },
    //   data: {
    //     role: viewRole
    //   }
    // }).then(response => {
      this.props.editUser(viewId, token, viewRole)

      const targetIndex = users.findIndex(user => user._id === viewId)
      users[targetIndex] = { _id: viewId, email: viewEmail, role: viewRole }
      this.setState({ users, viewId: null, viewEmail: '', viewRole: 'regular' })
      this.editCloseHandler()
    // })
  }

  async componentDidMount() {
    const { token, role } = this.props
    if (role !== 'admin' && role !== 'manager') {
      history.push('/logs')
    } else {
    await this.props.getAllUsers(token)
    
    this.setState({ users: this.props.allUsers.users || [] })
    
    //   axios
    //     .get(`${config.apiUrl}/getAllUsers`, {
    //       headers: { authorization: token }
    //     })
    //     .then(response => {
    //       this.setState({ users: response.data.users || [] })
    //     })
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
    this.setState({ isEditUserShowing: true, viewEmail: email, viewRole: role, viewId: id })
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
    this.props.deleteUser(id, this.props.token)
      let users = this.state.users
      users = users.filter(user => user._id !== id)
      this.setState({ users })
  }

  render() {
    const { isEditUserShowing } = this.state

    return (
      <AuthConsumer>
        {({ logout, email }) => (
          <Wrapper>
            <BaseHeader role={this.props.role} onLogout={logout} />
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
                    <Role>
                      <span>Role: </span>
                      <select
                        value={this.state.addRole || 'regular'}
                        onChange={e => this.onRoleChange(e)}
                      >
                        <option value="regular">Regular</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </Role>
                  ) : (
                      <Role>
                        <span>Role: </span>
                        <select
                          value={this.state.addRole || 'regular'}
                          onChange={e => this.onRoleChange(e)}
                        >
                          <option value="regular">Regular</option>
                          <option value="manager">Manager</option>
                        </select>
                      </Role>
                    )}
                  {this.state.addError != null ? (
                    <ErrorText>{this.state.addError}</ErrorText>
                  ) : null}
                  <Buttons>
                    <div onClick={this.addUserCloseHandler} style={{ cursor: 'pointer' }}>
                      Close
                    </div>
                    <Button onClick={() => this.onAddNewUser()}>Save</Button>
                  </Buttons>
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
                    <Role>
                      <span>Role: </span>
                      <select
                        value={this.state.viewRole || 'regular'}
                        onChange={e => this.onRoleChange(e, true)}
                      >
                        <option value="regular">Regular</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </Role>
                  ) : (
                      <Role>
                        <span>Role: </span>
                        <select
                          value={this.state.viewRole || 'regular'}
                          onChange={e => this.onRoleChange(e, true)}
                        >
                          <option value="regular">Regular</option>
                          <option value="manager">Manager</option>
                        </select>
                      </Role>
                    )}
                  <Buttons>
                    <div onClick={this.editCloseHandler} style={{ cursor: 'pointer' }}>
                      Close
                    </div>
                    <Button onClick={() => this.onEditUser()}>Save</Button>
                  </Buttons>
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

const mapDispatchToProps = dispatch => {
  return {
    addMealLog: bindActionCreators(deleteUser, dispatch),
    getAllUsers: bindActionCreators(getAllUsers, dispatch),
    editUser: bindActionCreators(editUser, dispatch),
    addNewUser: bindActionCreators(addNewUser, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    mealLogs: state.record.data,
    allUsers: state.user.data,
    newUser: state.user.data,
    addUserError: state.user.errors
  }
}

const HomeComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
export default HomeComponent

