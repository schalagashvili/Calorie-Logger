import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'react-spinkit'
import moment from 'moment-timezone'
import {
  HeaderDecoration,
  Wrapper,
  Add,
  AddContainer,
  // Button,
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
import { DatePicker, TimePicker, Tabs, Button, Table } from '../../components'
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
      fromDate: today,
      toDate: today,
      addTitle: '',
      addCalories: '',
      addDate: new Date().toISOString().substr(0, 10),
      addTime: new Date().toTimeString().substr(0, 5),
      fromTime: "00:00",
      toTime: new Date().toTimeString().substr(0, 5)
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
    const { fromDate, toDate, fromTime, toTime } = this.state
    axios
      .get(`${config.apiUrl}/getUser/${userId != null ? userId : ''}`, {
        headers: { authorization: token }
      })
      .then(response => {
        this.setState({ expectedCalories: response.data.user.expectedCalories || 0, email: response.data.user.email })
      })
    axios({
      method: 'post',
      url: `${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`,
      headers: { authorization: token },
      data: { fromDate, toDate, fromTime, toTime }
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
    const token = this.props.token
    const userId = this.props.match.params.userId
    const { fromDate, toDate, fromTime, toTime } = this.state
    this.setState({ searchLoading: true })
    axios({
      method: 'post',
      url: `${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`,
      headers: { authorization: token },
      data: { fromDate, toDate, fromTime, toTime }
    })
      .then(response => {
        let totalCalories = 0
        const mealLogs = response.data.logs
        if (mealLogs != null) {
          mealLogs.map((log) => totalCalories += log.calories)
        }
        this.setState({ mealLogs: mealLogs != null ? mealLogs.reverse() : [], totalCalories, searchLoading: false })
      })
  }

  editOpenHandler = (isAdd, id) => {
    const { isEditMealShowing } = this.state
    if (!isEditMealShowing) {
      TweenLite.to('#edit-meal', 0.4, { height: '400px', borderBottom: '1px solid #dce0e0' })
    }
    if (isAdd) {
      const addDate = new Date().toISOString().substr(0, 10)
      const addTime = new Date().toTimeString().substr(0, 5)
      this.setState({ isEditMealShowing: true, isAdd, addDate, addTime, addCalories: '', addTitle: '' })
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
    this.setState({ addDate: e.target.value })
  }

  onAddTimeChange(e) {
    this.setState({ addTime: e.target.value })
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
      return this.setState({ saveError: 1, saveErrorText: 'Please fill in all fields' })
    }
    this.setState({ addDate: '', addTime: '', addTitle: '', addCalories: '' })
    const datetime = moment.tz(`${addDate} ${addTime}`, 'Asia/Tbilisi').toDate()
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
        }
      }).then((response) => {
        const _id = response.data._id
        let mealLogs = this.state.mealLogs
        let totalCalories = 0
        mealLogs = insertFunc(mealLogs, 0, { title: addTitle, calories: addCalories, date: datetime, _id })
        if (mealLogs != null) {
          mealLogs.map((log) => totalCalories += log.calories)
        }
        this.setState({ mealLogs, totalCalories })
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
        }
      }).then((response) => {
        let mealLogs = this.state.mealLogs
        let totalCalories = 0
        const editedLogIndex = mealLogs.findIndex((log) => log._id === this.state.editId)
        if (editedLogIndex === -1) { return }
        mealLogs[editedLogIndex] = { _id: this.state.editId, title: addTitle, calories: addCalories, date: datetime }
        if (mealLogs != null) {
          mealLogs.map((log) => totalCalories += log.calories)
        }
        this.setState({ mealLogs, totalCalories })
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
      this.setState({ mealLogs, totalCalories })
    })
  }

  renderRecords() {
    let { mealLogs } = this.state
    return mealLogs.map((log) => {
      let { date, calories, title, _id } = log
      date = moment.tz(date, 'Asia/Tbilisi').format('YYYY-MM-DD HH:mm')
      return (
        <Record key={_id}>
          <div style={{ flex: 0.5 }}>{moment.tz(date, 'Asia/Tbilisi').format("MM/DD/YYYY")}</div>
          <div style={{ flex: 0.5 }}>{moment.tz(date, 'Asia/Tbilisi').format("HH:mm")}</div>
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
      <Wrapper>

        <div style={{ maxWidth: '900px', margin: '40px auto', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)', backgroundColor: "#F6F5F9", borderRadius: 6, overflow: 'hidden' }}>
          <Tabs />
          <div style={{ padding: 30 }}>

            <div style={{ color: '#3D477B', fontSize: 22, marginBottom: 15 }}>Your Daily Summary</div>
            <div style={{ borderTop: '1px solid #DBDEED', borderBottom: '1px solid #DBDEED', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
              <Button />

              <div style={{ display: 'flex' }}>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between', paddingRight: '25px' }}>
                  <div style={{ fontSize: 14, color: '#B2B6CB' }}>
                    Expected Cal
                </div>
                  <div style={{ fontSize: 14, color: '#3D477B', fontWeight: 'bold', alignItems: '' }}>
                    1,264
                </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marignRight: '15' }}>
                  <div style={{ fontSize: 14, color: '#B2B6CB' }}>
                    Date
              </div>
                  <div style={{ fontSize: 14, color: '#3D477B', fontWeight: 'bold', alignItems: '' }}>
                    Friday, 20 Feb
              </div>
                </div>
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginTop: 15, padding: '0 25px' }}>
              <div>Products</div>
              <div>Calories</div>
              <div>Date</div>
              <div>Time</div>
            </div>
            <Table />
            <div style={{ display: 'flex', justifyContent: 'space-between', height: 45, color: '#2E3654', backgroundColor: 'white', padding: 25, boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)', margin: '10px 0', alignItems: 'center', marginTop: 40, borderRadius: 4 }}>
              <div>Total</div>
              <div>Title</div>
              <div>Calories</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: 45, color: '#5181FB', backgroundColor: 'white', padding: 25, boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)', margin: '10px 0', alignItems: 'center', borderRadius: 4 }}>
              <div>Your Daily Goal</div>
              <div>Title</div>
              <div>Calories</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: 45, backgroundColor: '#FFC1C1', color: '#974E4E', padding: 25, boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)', margin: '10px 0', alignItems: 'center', marginTop: 40, borderRadius: 4 }}>
              <div>Remaining</div>
              <div>Title</div>
              <div>Calories</div>
            </div>
          </div>
        </div>
      </Wrapper>

    )
  }
}

export default Logs
