import React, { Component } from 'react'
import { Wrapper, Add, AddContainer, InnerWrapper, Record, Records, IconsWrapper, RecordsHeader, Role, Buttons } from './styles'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import { Input, Button } from '../../styles/mixins'
import history from '../../history'
import Drawer from '@material-ui/core/Drawer'
import { BaseHeader, AddUser } from '../../components'
import { validateEmail } from '../../utility'
import { isEmpty } from 'lodash'
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
    viewId: null,
    addBottom: false,
    editBottom: false
  }

  onAddNewUser = async () => {
    const { addEmail, addPassword, addRole } = this.state

    if (addEmail === null || addPassword === null) {
      return this.setState({ addError: 'Please fill fields' })
    }

    await this.props.addNewUser(addEmail, addPassword, addRole, this.props.token)
    if (!isEmpty(this.props.newUser)) {
      const _id = this.props.newUser._id
      let users = this.state.users
      users.push({ _id, email: addEmail, role: addRole })
      this.setState({
        users,
        addError: null,
        addEmail: null,
        addPassword: null,
        addRole: 'regular',
        addBottom: false
      })
    } else {
      this.setState({ addError: this.props.addUserError.response.error })
    }
  }

  onEditUser = () => {
    const { viewRole, viewId, users, viewEmail } = this.state
    const token = this.props.token
    this.props.editUser(viewId, token, viewRole)

    const targetIndex = users.findIndex(user => user._id === viewId)
    users[targetIndex] = { _id: viewId, email: viewEmail, role: viewRole }
    this.setState({ users, viewId: null, viewEmail: '', viewRole: 'regular', editBottom: false })
  }

  async componentDidMount() {
    const { token, role } = this.props
    if (role !== 'admin' && role !== 'manager') {
      history.push('/logs')
    } else {
      await this.props.getAllUsers(token)

      this.setState({ users: this.props.allUsers.users || [] })
    }
  }

  onEmailChange = e => {
    const email = e.target.value
    if (!validateEmail(email)) {
      this.setState({ emailErrorText: '* Please input valid email', emailError: 1 })
    } else {
      this.setState({ addEmail: email, emailErrorText: '', emailError: 0 })
    }
  }

  onPasswordChange = e => {
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

  editOpenHandler = (id, email, role) => {
    this.setState({ editBottom: true, viewEmail: email, viewRole: role, viewId: id })
  }

  drawerHandler = () => {
    this.setState({ addBottom: false })
  }

  onUserClick = id => {
    if (this.props.role === 'admin') {
      history.push(`/logs/${id}`)
    }
  }

  renderUsers = originalEmail => {
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
          <IconsWrapper style={{ flex: 0.2, cursor: 'pointer' }}>
            <div onClick={() => this.editOpenHandler(_id, email, role)}>
              <EditIcon width={13} height={13} color='gray' />
            </div>
            <div onClick={() => this.onDelete(_id)} style={{ cursor: 'pointer' }}>
              <DeleteIcon width={11} height={11} color='red' s />
            </div>
          </IconsWrapper>
        </Record>
      )
    })
  }

  onRoleChange = (e, isView) => {
    if (isView) {
      return this.setState({ viewRole: e.target.value })
    }
    this.setState({ addRole: e.target.value })
  }

  onDelete = id => {
    this.props.deleteUser(id, this.props.token)
    let users = this.state.users
    users = users.filter(user => user._id !== id)
    this.setState({ users })
  }

  render() {
    return (
      <AuthConsumer>
        {({ logout, email }) => (
          <Wrapper>
            <BaseHeader role={this.props.role} onLogout={logout} />
            <AddUser
              addBottom={this.state.addBottom}
              emailError={this.state.emailError}
              passwordError={this.state.passwordError}
              role={this.props.role}
              addRole={this.state.addRole}
              addError={this.state.addError}
              emailErrorText={this.state.emailErrorText}
              passwordErrorText={this.state.passwordErrorText}
              onEmailChange={this.onEmailChange}
              onPasswordChange={this.onPasswordChange}
              onRoleChange={this.onRoleChange}
              onAddNewUser={this.onAddNewUser}
              drawerHandler={this.drawerHandler}
            />
            <Drawer anchor='bottom' open={this.state.editBottom}>
              <Add id='edit-user'>
                <InnerWrapper>
                  <AddContainer>
                    <RecordsHeader>Edit User</RecordsHeader>
                    <Input disabled value={this.state.viewEmail || ''} placeholder='Email' type='email' />
                    {this.props.role === 'admin' ? (
                      <Role>
                        <span>Role: </span>
                        <select value={this.state.viewRole || 'regular'} onChange={e => this.onRoleChange(e, true)}>
                          <option value='regular'>Regular</option>
                          <option value='manager'>Manager</option>
                          <option value='admin'>Admin</option>
                        </select>
                      </Role>
                    ) : (
                      <Role>
                        <span>Role: </span>
                        <select value={this.state.viewRole || 'regular'} onChange={e => this.onRoleChange(e, true)}>
                          <option value='regular'>Regular</option>
                          <option value='manager'>Manager</option>
                        </select>
                      </Role>
                    )}
                    <Buttons>
                      <Button color='rgb(225, 0, 80)' onClick={() => this.onEditUser()}>
                        Save
                      </Button>
                      <div onClick={() => this.setState({ editBottom: false })} style={{ cursor: 'pointer' }}>
                        Close
                      </div>
                    </Buttons>
                  </AddContainer>
                </InnerWrapper>
              </Add>
            </Drawer>
            <InnerWrapper>
              <Button color='#5FBA7D' onClick={() => this.setState({ addBottom: true })}>
                Add New
              </Button>
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
    deleteUser: bindActionCreators(deleteUser, dispatch),
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
