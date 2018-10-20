import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'react-spinkit'
import {
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
  UpdateButton,
  AddRecordButton
} from './styles'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import { DatePicker, TimePicker } from '../../components'
import { Input } from '../../styles/mixins'
import logo from '../../assets/logos/brand-logo.png'
import TweenLite from 'gsap'
import BaseHeader from '../../components/BaseHeader'
import { AuthConsumer } from '../../AuthContext'
import config from '../../config'

class Logs extends Component {
  state = { isEditMealShowing: false, expectedCalories: 0, totalCalories: 0, updateLoading: false }

  componentDidMount() {
    const token = this.props.token
    const userId = this.props.match.params.userId
    axios
      .get(`${config.apiUrl}/getUser/${userId != null ? userId : ''}`, {
        headers: { authorization: token }
      })
      .then(response => {
        this.setState({ expectedCalories: response.data.user.expectedCalories || 0 })
      })
  }

  editOpenHandler = () => {
    const { isEditMealShowing } = this.state

    if (!isEditMealShowing) {
      TweenLite.to('#edit-meal', 0.4, { height: '365px', borderBottom: '1px solid #dce0e0' })
    }

    this.setState({ isEditMealShowing: true })
  }

  editCloseHandler = () => {
    const { isEditMealShowing } = this.state

    if (isEditMealShowing) {
      TweenLite.to('#edit-meal', 0.4, { height: 0, borderBottom: 'none' })
    }
    this.setState({ isEditMealShowing: false })
  }

  onExpectedCaloriesChange(e) {
    let calories = e.target.value
    if (calories < 0) {
      calories *= -1
    }
    this.setState({ expectedCalories: calories })
  }

  updateExpectedCalories() {
    this.setState({ updateLoading: true })
    const { expectedCalories } = this.state
    const token = this.props.token
    const userId = this.props.match.params.userId
    console.log(token)
    axios({
      method: 'post',
      url: `${config.apiUrl}/editUser/${userId != null ? userId : ''}`,
      headers: { authorization: token },
      data: { expectedCalories }
    }).then(response => {
      this.setState({ updateLoading: false })
    })
  }

  render() {
    const { isEditMealShowing } = this.state
    const dietBroken = this.state.totalCalories > this.state.expectedCalories
    return (
      <AuthConsumer>
        {({ isAuth, login, role, logout }) => (
          <Wrapper>
            <BaseHeader onLogout={logout} />
            <HeaderDecoration>Meals with Calories</HeaderDecoration>
            <CaloriesInfo>
              <div
                style={{ display: 'flex', maxWidth: '60px', lineHeight: 1.5, marginTop: '20px' }}
              >
                Expected Calories:
              </div>
              <Input
                type="number"
                onChange={e => this.onExpectedCaloriesChange(e)}
                value={this.state.expectedCalories}
                placeholder="Expected Calories Today"
              />
              {this.state.updateLoading ? (
                <Spinner fadeIn="none" style={{ marginTop: '20px' }} name="circle" />
              ) : (
                <UpdateButton onClick={() => this.updateExpectedCalories()}>Update</UpdateButton>
              )}

              <div style={{ display: 'flex', marginTop: 15, fontSize: 16 }}>
                Today's calories :{' '}
                <div
                  style={{
                    color: dietBroken ? 'red' : 'rgb(100, 196, 123)',
                    fontWeight: 'bold',
                    marginLeft: 5,
                    fontSize: 16
                  }}
                >
                  {' '}
                  {this.state.totalCalories}
                </div>
              </div>
            </CaloriesInfo>
            <RecordsHeader style={{ margin: 'auto', marginTop: '20px' }}>Filter</RecordsHeader>
            <div
              style={{
                maxWidth: 600,
                display: 'flex',
                flex: 1,
                flexWrap: 'wrap',
                margin: 'auto',
                justifyContent: 'center'
              }}
            >
              <div
                style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}
              >
                <DatePicker headerText="Date From" marginRight />
                <DatePicker headerText="Date To" />
              </div>
              <div
                style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}
              >
                <TimePicker headerText="Time From" marginRight />
                <TimePicker headerText="Time To" />
              </div>
              {/* <Button>Search</Button> */}
            </div>
            <Add id="edit-meal" isEditMealShowing={isEditMealShowing}>
              <InnerWrapper>
                <AddContainer>
                  <RecordsHeader>Edit Meal</RecordsHeader>
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
              <AddRecordButton onClick={this.editOpenHandler}>Add New</AddRecordButton>
              <Records>
                <RecordsHeader>Records</RecordsHeader>
                <Record>
                  <div style={{ flex: 1 }}>12.13</div>
                  <div style={{ flex: 1 }}>18: 10</div> <div style={{ flex: 1 }}>Name</div>
                  <IconsWrapper style={{ flex: 0.2 }}>
                    <div onClick={this.editOpenHandler}>
                      <EditIcon
                        width={13}
                        height={13}
                        color="gray"
                        styles={{ cursor: 'pointer' }}
                      />
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
        )}
      </AuthConsumer>
    )
  }
}

export default Logs
