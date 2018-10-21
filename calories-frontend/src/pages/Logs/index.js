import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'react-spinkit'
import moment from 'moment'
import {
  HeaderDecoration,
  Wrapper,
  Add,
  AddContainer,
  Button,
  InnerWrapper,
  Record,
  Records,
  IconsWrapper,
  RecordsHeader,
  CaloriesInfo,
  UpdateButton,
  SearchButton,
  AddRecordButton,
  FilterWrapper
} from './styles'
import { SaveErrorText } from '../SignUp/styles'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import { DatePicker, TimePicker } from '../../components'
import { Input } from '../../styles/mixins'
import TweenLite from 'gsap'
import BaseHeader from '../../components/BaseHeader'
import { AuthConsumer } from '../../AuthContext'
import config from '../../config'
import { insertFunc } from '../../utility'

class Logs extends Component {
  constructor(props) {
    super(props)
    const today = new Date().toISOString().substr(0, 10)
    this.state = {
      isEditMealShowing: false,
      expectedCalories: 0,
      totalCalories: 0,
      updateLoading: false,
      searchLoading: false,
      mealLogs: [],
      dateFrom: today,
      dateTo: today,
      timeFrom: '00:00',
      addTitle: '',
      addCalories: '',
      addDate: '',
      timeTo: new Date().toTimeString().substr(0, 5)
    }
    this.onFromDateChange = this.onFromDateChange.bind(this)
    this.onToDateChange = this.onToDateChange.bind(this)
    this.onFromTimeChange = this.onFromTimeChange.bind(this)
    this.onToTimeChange = this.onToTimeChange.bind(this)
    this.onAddDateChange = this.onAddDateChange.bind(this)
    this.onAddTimeChange = this.onAddTimeChange.bind(this)
  }

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
    axios
      .get(`${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`, {
        headers: { authorization: token }
      })
      .then(response => {
        let totalCalories = 0
        const mealLogs = response.data.logs
        if (mealLogs != null) {
          mealLogs.map((log) => totalCalories += log.calories)
        }
        this.setState({ mealLogs: mealLogs != null ? mealLogs.reverse() : [], totalCalories })
      })
  }

  onSearch() {
    this.setState({ searchLoading: true })
  }

  editOpenHandler = (isAdd, id) => {
    const { isEditMealShowing } = this.state
    if (!isEditMealShowing) {
      TweenLite.to('#edit-meal', 0.4, { height: '400px', borderBottom: '1px solid #dce0e0' })
    }
    if (isAdd) {
      const addDate = new Date().toISOString().substr(0, 10)
      const addTime = new Date().toTimeString().substr(0, 5)
      this.setState({ isEditMealShowing: true, isAdd, addDate, addTime })
    } else {
      const editLog = this.state.mealLogs.filter((log) => log._id === id)[0]
      const addDate = new Date(editLog.date).toISOString().substr(0, 10)
      const addTime = new Date(editLog.date).toTimeString().substr(0, 5)
      this.setState({ editId: id, isEditMealShowing: true, isAdd, addDate, addTime, addTitle: editLog.title, addCalories: editLog.calories })
    }
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

  onAddDateChange(e) {
    this.setState({ addDate: e.target.value})
  }

  onAddTimeChange(e) {
    this.setState({ addTime: e.target.value})
  }

  onAddTitleChange(e) {
    this.setState({ addTitle: e.target.value })
  }

  onAddCaloriesChange(e) {
    let calories = e.target.value
    if (calories < 0) {
      calories *= -1
    }
    this.setState({ addCalories: parseFloat(calories) })
  }

  onSave() {
    let { addDate, addTime, addTitle, addCalories, isAdd } = this.state
    if (addTitle == null || addCalories == null) {
      return this.setState({ saveError: 1, saveErrorText: 'Please fill in all fields'})
    }
    this.setState({addDate: '' ,addTime: '', addTitle: '', addCalories: ''})
    const datetime = moment(`${addDate} ${addTime}`, 'YYYY-MM-DD hh:mm').toDate()
    const userId = this.props.match.params.userId
    if (isAdd) {
      axios({
        method: 'post',
        url: `${config.apiUrl}/addMealLog/${userId != null ? userId : ''}`,
        headers: { authorization: this.props.token },
        data: {
        title: addTitle,
        calories: addCalories,
        date: datetime
      }}).then((response) => {
        const _id = response.data._id
        let mealLogs = this.state.mealLogs
        let totalCalories = 0
        mealLogs = insertFunc(mealLogs, 0, {title: addTitle, calories: addCalories, date: datetime, _id})
        if (mealLogs != null) {
          mealLogs.map((log) => totalCalories += log.calories)
        }
        this.setState({mealLogs, totalCalories})
      })
    } else {
      axios({
        method: 'post',
        url: `${config.apiUrl}/editMealLog/${this.state.editId}/${userId != null ? userId : ''}`,
        headers: { authorization: this.props.token },
        data: {
        title: addTitle,
        calories: addCalories,
        date: datetime
      }}).then((response) => {
        let mealLogs = this.state.mealLogs
        let totalCalories = 0
        const editedLogIndex = mealLogs.findIndex((log) => log._id === this.state.editId)
        if (editedLogIndex === -1) {return}
        mealLogs[editedLogIndex] = { _id: this.state.editId, title: addTitle, calories: addCalories, date: datetime}
        if (mealLogs != null) {
          mealLogs.map((log) => totalCalories += log.calories)
        }
        this.setState({mealLogs, totalCalories})
      })
    }
    this.editCloseHandler()
  }

  onFromDateChange(e) {
    this.setState({ fromDate: e.target.value })
  }

  onToDateChange(e) {
    this.setState({ toDate: e.target.value })
  }

  onFromTimeChange(e) {
    this.setState({ fromTime: e.target.value })
  }

  onToTimeChange(e) {
    this.setState({ toTime: e.target.value })
  }

  onDelete(id) {
    console.log('deleting: ', id)
    const userId = this.props.match.params.userId
    axios({
      method: 'post',
      url: `${config.apiUrl}/removeMealLog/${id}/${userId != null ? userId : ''}`,
      headers: { authorization: this.props.token }
    }).then(() => {
      let mealLogs = this.state.mealLogs
      mealLogs = mealLogs.filter((log) => log._id !== id)
      let totalCalories = 0
      if (mealLogs != null) {
        mealLogs.map((log) => totalCalories += log.calories)
      }
      this.setState({mealLogs, totalCalories})
    })
  }

  renderRecords() {
    let { mealLogs } = this.state
    return mealLogs.map((log) => {
      let { date, calories, title, _id} = log
      date = moment(date).format('YYYY-MM-DD hh:mm')
      return (
        <Record key={_id}>
        <div style={{ flex: 1 }}>{date}</div>
        <div style={{ flex: 1 }}>{title}</div>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{calories} cal</div>
        <IconsWrapper style={{ flex: 0.2 }}>
          <div onClick={() => this.editOpenHandler(false, _id)}>
            <EditIcon
              width={13}
              height={13}
              color="gray"
              styles={{ cursor: 'pointer' }}
            />
          </div>
          <div onClick={() => this.onDelete(_id)}>
            <DeleteIcon width={11} height={11} color="red" styles={{ cursor: 'pointer' }} />
          </div>
        </IconsWrapper>
      </Record>
      )
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
                style={{ display: 'flex', maxWidth: '60px', lineHeight: 1.5, marginTop: '20px', marginRight: '10px' }}
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
                Total calories :{' '}
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
            <FilterWrapper
            >
              <div
                style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}
              >
                <DatePicker date={this.state.dateFrom} onChange={this.onFromDateChange} headerText="Date From" marginRight />
                <DatePicker date={this.state.dateTo} onChange={this.onToDateChange} headerText="Date To" />
              </div>
              <div
                style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}
              >
                <TimePicker time={this.state.timeFrom} onChange={this.onFromTimeChange} headerText="Time From" marginRight />
                <TimePicker time={this.state.timeTo} onChange={this.onToTimeChange} headerText="Time To" />
              </div>
              {this.state.searchLoading ? (
                <Spinner fadeIn="none" style={{ marginTop: '20px' }} name="circle" />
              ) : (
                <SearchButton onClick={() => this.onSearch()}>Search</SearchButton>
              )}
            </FilterWrapper>
            <Add id="edit-meal" isEditMealShowing={isEditMealShowing}>
              <InnerWrapper>
                <AddContainer>
                  <RecordsHeader>{this.state.isAdd ? 'Add' : 'Edit'} Meal</RecordsHeader>
                  <DatePicker date={this.state.addDate} onChange={this.onAddDateChange} />
                  <TimePicker time={this.state.addTime} onChange={this.onAddTimeChange} />
                  <Input value={this.state.addTitle} onChange={(e) => this.onAddTitleChange(e)} placeholder="Title" />
                  <Input min={0} value={this.state.addCalories || ''} onChange={(e) => this.onAddCaloriesChange(e)} type="number" placeholder="Calories" />
                  <div style={{display: 'flex'}}>
                  {this.state.saveError === 1 ? <SaveErrorText>{this.state.saveErrorText}</SaveErrorText> : null}
                  </div>
                  <div
                    style={{
                      marginLeft: 'auto',
                      display: 'flex',
                      alignItems: 'baseline',
                      width: 140
                    }}
                  >
                    <div onClick={this.editCloseHandler} style={{ cursor: 'pointer' }}>
                      Cancel
                    </div>
                    <Button onClick={() => this.onSave()}>Save</Button>
                  </div>
                </AddContainer>
              </InnerWrapper>
            </Add>
            <InnerWrapper>
              <AddRecordButton onClick={() => this.editOpenHandler(true)}>Add New</AddRecordButton>
              <Records>
                <RecordsHeader>Records</RecordsHeader>
                    {this.renderRecords()}
              </Records>
            </InnerWrapper>
          </Wrapper>
        )}
      </AuthConsumer>
    )
  }
}

export default Logs
