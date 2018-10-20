import React, { Component } from 'react'
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
import TweenLite from 'gsap'

class Home extends Component {
  state = { isEditUserShowing: false }

  editOpenHandler = () => {
    const { isEditUserShowing } = this.state

    if (!isEditUserShowing) {
      TweenLite.to('#edit-user', 0.4, {
        height: '360px',
        borderBottom: '1px solid #dce0e0'
      })
    }

    this.setState({ isEditUserShowing: true })
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

  render() {
    const { isEditUserShowing } = this.state

    return (
      <Wrapper>
        <Header>
          <div>
            <img src={logo} alt="logo" style={{ width: 180, cursor: 'pointer' }} />
          </div>{' '}
          <div>Logout</div>
        </Header>
        <HeaderDecoration>Users Management</HeaderDecoration>
        <Add id="add-user" isEditUserShowing={isEditUserShowing}>
          <InnerWrapper>
            <AddContainer>
              <RecordsHeader>Add User</RecordsHeader>
              <DatePicker />
              <TimePicker />
              <Input placeholder="Text" />
              <Input placeholder="Calories" />
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
                <Button>Save</Button>
              </div>
            </AddContainer>
          </InnerWrapper>
        </Add>
        <Add id="edit-user" isEditUserShowing={isEditUserShowing}>
          <InnerWrapper>
            <AddContainer>
              <RecordsHeader>Edit User</RecordsHeader>
              <DatePicker />
              <TimePicker />
              <Input placeholder="Text" />
              <Input placeholder="Calories" />
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
                <Button>Save</Button>
              </div>
            </AddContainer>
          </InnerWrapper>
        </Add>
        <InnerWrapper>
          <AddRecordButton onClick={this.addUserOpenHandler}>Add New</AddRecordButton>
          <Records>
            <RecordsHeader>Users</RecordsHeader>
            <Record>
              <div style={{ flex: 1 }}>12.13</div>
              <div style={{ flex: 1 }}>18: 10</div> <div style={{ flex: 1 }}>Name</div>
              <IconsWrapper style={{ flex: 0.2 }}>
                <div onClick={this.editOpenHandler}>
                  <EditIcon width={13} height={13} color="gray" styles={{ cursor: 'pointer' }} />
                </div>
                <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
              </IconsWrapper>
            </Record>
            <Record>
              <div style={{ flex: 1 }}>12.13</div>
              <div style={{ flex: 1 }}>18 : 10</div> <div style={{ flex: 1 }}>Name</div>
              <IconsWrapper style={{ flex: 0.2 }}>
                <EditIcon width={13} height={13} color="gray" styles={{ cursor: 'pointer' }} />
                <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
              </IconsWrapper>
            </Record>
            <Record>
              <div style={{ flex: 1 }}>12.13</div>
              <div style={{ flex: 1 }}>18: 10</div> <div style={{ flex: 1 }}>Name</div>
              <IconsWrapper style={{ flex: 0.2 }}>
                <EditIcon width={13} height={13} color="gray" styles={{ cursor: 'pointer' }} />
                <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
              </IconsWrapper>
            </Record>
            <Record>
              <div style={{ flex: 1, backgroundColor: 'white' }}>12.13</div>
              <div style={{ flex: 1, backgroundColor: 'white' }}>18: 10</div>{' '}
              <div
                style={{
                  flex: 1,
                  backgroundColor: 'white'
                }}
              >
                <div
                  style={{
                    textOverflow: 'ellipsis',
                    width: 120,
                    paddingRight: 15,
                    overflow: 'hidden'
                  }}
                >
                  jiofdfdsafdsagfdgsdfgdfsjok
                </div>
              </div>
              <IconsWrapper style={{ flex: 0.2 }}>
                <EditIcon width={13} height={13} color="gray" styles={{ cursor: 'pointer' }} />
                <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
              </IconsWrapper>
            </Record>
            <Record>
              <div style={{ flex: 1 }}>12.13</div>
              <div style={{ flex: 1 }}>18: 10</div> <div style={{ flex: 1 }}>Name</div>
              <IconsWrapper style={{ flex: 0.2 }}>
                <EditIcon width={13} height={13} color="gray" styles={{ cursor: 'pointer' }} />
                <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
              </IconsWrapper>
            </Record>
            <Record>
              <div style={{ flex: 1 }}>12.13</div>
              <div style={{ flex: 1 }}>18: 10</div> <div style={{ flex: 1 }}>Name</div>
              <IconsWrapper style={{ flex: 0.2 }}>
                <EditIcon width={13} height={13} color="gray" styles={{ cursor: 'pointer' }} />
                <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
              </IconsWrapper>
            </Record>
          </Records>
        </InnerWrapper>
      </Wrapper>
    )
  }
}

export default Home
