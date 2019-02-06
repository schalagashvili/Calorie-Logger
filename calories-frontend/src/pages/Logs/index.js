import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'react-spinkit'
import moment from 'moment-timezone'
import Drawer from '@material-ui/core/Drawer'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

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
      addBottom: false,
      infoBottom: false,
      filterBottom: false,
      toDate: today,
      page: 1,
      logsCount: null,
      addTitle: '',
      addCalories: '',
      addDate: new Date().toISOString().substr(0, 10),
      addTime: new Date().toTimeString().substr(0, 5),
      fromTime: '00:00',
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
    const { fromDate, toDate, fromTime, toTime, page } = this.state
    axios
      .get(`${config.apiUrl}/getUser/${userId != null ? userId : ''}`, {
        headers: { authorization: token }
      })
      .then(response => {
        this.setState({
          expectedCalories: response.data.user.expectedCalories || 0,
          email: response.data.user.email
        })
      })
    axios({
      method: 'post',
      url: `${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`,
      headers: { authorization: token },
      data: { fromDate, toDate, fromTime, toTime, page }
    }).then(response => {
      console.log(response)
      let totalCalories = 0
      const mealLogs = response.data.logs
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      this.setState({
        mealLogs: mealLogs != null ? mealLogs.reverse() : [],
        totalCalories,
        logsCount: response.data.logsCount,
        page: this.state.page + 1
      })
      console.log(this.state.mealLogs)
    })
  }

  loadMore = page => {
    const { fromDate, toDate, fromTime, toTime } = this.state
    const token = this.props.token
    const userId = this.props.match.params.userId

    axios({
      method: 'post',
      url: `${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`,
      headers: { authorization: token },
      data: { fromDate, toDate, fromTime, toTime, page }
    }).then(response => {
      console.log(response)
      let totalCalories = 0
      const mealLogs = response.data.logs
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      console.log(mealLogs)
      const mergedLogs = this.state.mealLogs.concat(mealLogs)
      this.setState({
        mealLogs: mergedLogs,
        page: this.state.page + 1
      })
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
    }).then(response => {
      let totalCalories = 0
      const mealLogs = response.data.logs
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      console.log(mealLogs, 'მიალოგები')
      this.setState({
        mealLogs: mealLogs != null ? mealLogs.reverse() : [],
        totalCalories,
        searchLoading: false,
        logsCount: response.data.logsCount
      })
    })
  }

  editOpenHandler = (isAdd, id) => {
    const { isEditMealShowing } = this.state
    if (!isEditMealShowing) {
      // TweenLite.to('#edit-meal', 0.4, { height: '400px', borderBottom: '1px solid #dce0e0' })
    }
    if (isAdd) {
      const addDate = new Date().toISOString().substr(0, 10)
      const addTime = new Date().toTimeString().substr(0, 5)
      this.setState({ isEditMealShowing: true, isAdd, addDate, addTime })
    } else {
      const editLog = this.state.mealLogs.filter(log => log._id === id)[0]
      const addDate = new Date(editLog.date).toISOString().substr(0, 10)
      const addTime = new Date(editLog.date).toTimeString().substr(0, 5)
      this.setState({
        editId: id,
        isEditMealShowing: true,
        isAdd,
        addDate,
        addTime,
        addTitle: editLog.title,
        addCalories: editLog.calories
      })
    }
  }

  // editCloseHandler = () => {
  //   const { isEditMealShowing } = this.state

  //   if (isEditMealShowing) {
  //     TweenLite.to('#edit-meal', 0.4, { height: 0, borderBottom: 'none' })
  //   }
  //   this.setState({ isEditMealShowing: false })
  // }

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
    if (addTitle === '' || addCalories === '') {
      return this.setState({ saveError: 1, saveErrorText: 'Please fill all fields' })
    }
    this.toggleDrawer('addBottom', false)
    this.setState({ addDate: '', addTime: '', addTitle: '', addCalories: '', saveError: null })
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
      }).then(response => {
        const _id = response.data._id
        let mealLogs = this.state.mealLogs
        let totalCalories = 0
        mealLogs = insertFunc(mealLogs, 0, {
          title: addTitle,
          calories: addCalories,
          date: datetime,
          _id
        })
        if (mealLogs != null) {
          mealLogs.map(log => (totalCalories += log.calories))
        }
        const meals = mealLogs.slice(0, 9)
        this.setState({ mealLogs: meals, totalCalories })
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
      }).then(response => {
        let mealLogs = this.state.mealLogs
        let totalCalories = 0
        const editedLogIndex = mealLogs.findIndex(log => log._id === this.state.editId)
        if (editedLogIndex === -1) {
          return
        }
        mealLogs[editedLogIndex] = {
          _id: this.state.editId,
          title: addTitle,
          calories: addCalories,
          date: datetime
        }
        if (mealLogs != null) {
          mealLogs.map(log => (totalCalories += log.calories))
        }
        this.setState({ mealLogs, totalCalories })
      })
    }
    // this.editCloseHandler()
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
    const token = this.props.token
    const { fromDate, toDate, fromTime, toTime, page } = this.state

    axios({
      method: 'post',
      url: `${config.apiUrl}/removeMealLog/${id}/${userId != null ? userId : ''}`,
      headers: { authorization: this.props.token }
    }).then(() => {
      let mealLogs = this.state.mealLogs
      mealLogs = mealLogs.filter(log => log._id !== id)
      let totalCalories = 0
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      this.setState({ mealLogs, totalCalories, logsCount: this.state.logsCount - 1 })
    })
    const logsPage = 1
    axios({
      method: 'post',
      url: `${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`,
      headers: { authorization: token },
      data: { fromDate, toDate, fromTime, toTime, logsPage }
    }).then(response => {
      console.log(response)
      let totalCalories = 0
      const mealLogs = response.data.logs
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      this.setState({
        mealLogs: mealLogs != null ? mealLogs.reverse() : [],
        totalCalories,
        logsCount: response.data.logsCount,
        page: 1
      })
      console.log(this.state.mealLogs)
    })
  }

  renderRecords() {
    let { mealLogs, totalCalories, expectedCalories } = this.state
    return mealLogs.map(log => {
      let { date, calories, title, _id } = log
      date = moment.tz(date, 'Asia/Tbilisi').format('YYYY-MM-DD HH:mm')
      return (
        <Record key={_id}>
          {totalCalories > expectedCalories ? (
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{ color: 'rgb(225,0,80)', marginRight: 15 }}
            />
          ) : (
            <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#91c653', marginRight: 15 }} />
          )}
          <div style={{ flex: 0.5 }}>{moment.tz(date, 'Asia/Tbilisi').format('MM/DD/YYYY')}</div>
          <div style={{ flex: 0.5 }}>{moment.tz(date, 'Asia/Tbilisi').format('HH:mm')}</div>
          <div style={{ flex: 1 }}>{title}</div>
          <div
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
          >
            {calories} cal
          </div>
          <IconsWrapper style={{ flex: 0.2 }}>
            <div
              onClick={() => {
                this.editOpenHandler(false, _id)
                this.toggleDrawer('addBottom', true)
              }}
            >
              <EditIcon width={13} height={13} color='gray' styles={{ cursor: 'pointer' }} />
            </div>
            <div onClick={() => this.onDelete(_id)}>
              <DeleteIcon width={11} height={11} color='red' styles={{ cursor: 'pointer' }} />
            </div>
          </IconsWrapper>
        </Record>
      )
    })
  }

  caloriesInfo = dietBroken => {
    return (
      <Drawer anchor='bottom' open={this.state.infoBottom}>
        <CaloriesInfo>
          <div
            style={{
              display: 'flex',
              lineHeight: 1.5,
              marginTop: '20px',
              marginRight: '10px'
            }}
          >
            Expected Calories:
          </div>
          <Input
            type='number'
            onChange={e => this.onExpectedCaloriesChange(e)}
            value={this.state.expectedCalories}
            placeholder='Expected Calories Today'
          />
          <Button
            onClick={() => {
              this.updateExpectedCalories()
              this.toggleDrawer('infoBottom', false)
            }}
            color='#5FBA7D'
          >
            Update
          </Button>
          <Button onClick={() => this.toggleDrawer('infoBottom', false)} color='grey'>
            Cancel
          </Button>

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
      </Drawer>
    )
  }

  addAndEdit = isEditMealShowing => {
    return (
      <Drawer anchor='bottom' open={this.state.addBottom}>
        <Add id='edit-meal' isEditMealShowing={isEditMealShowing}>
          <InnerWrapper>
            <AddContainer>
              <RecordsHeader>{this.state.isAdd ? 'Add' : 'Edit'} Meal</RecordsHeader>
              <DatePicker date={this.state.addDate} onChange={this.onAddDateChange} />
              <TimePicker time={this.state.addTime} onChange={this.onAddTimeChange} />
              <Input
                value={this.state.addTitle}
                onChange={e => this.onAddTitleChange(e)}
                placeholder='Title'
              />
              <Input
                min={0}
                value={this.state.addCalories || ''}
                onChange={e => this.onAddCaloriesChange(e)}
                type='number'
                placeholder='Calories'
              />
              <div style={{ display: 'flex' }}>
                {this.state.saveError === 1 ? (
                  <SaveErrorText>{this.state.saveErrorText}</SaveErrorText>
                ) : null}
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'baseline',
                  width: 178
                }}
              >
                <Button
                  onClick={() => {
                    this.onSave()
                  }}
                  color='#5FBA7D'
                >
                  Save
                </Button>
                <Button onClick={() => this.toggleDrawer('addBottom', false)} color='grey'>
                  Cancel
                </Button>
              </div>
            </AddContainer>
          </InnerWrapper>
        </Add>
      </Drawer>
    )
  }

  filterWrapper = () => {
    return (
      <Drawer anchor='bottom' open={this.state.filterBottom}>
        <RecordsHeader style={{ margin: 'auto', marginTop: '20px' }}>Filter</RecordsHeader>
        <FilterWrapper>
          <div style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}>
            <DatePicker
              date={this.state.fromDate}
              onChange={this.onFromDateChange}
              headerText='Date From'
              marginRight
            />
            <DatePicker
              date={this.state.toDate}
              onChange={this.onToDateChange}
              headerText='Date To'
            />
          </div>
          <div style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}>
            <TimePicker
              time={this.state.fromTime}
              onChange={this.onFromTimeChange}
              headerText='Time From'
              marginRight
            />
            <TimePicker
              time={this.state.toTime}
              onChange={this.onToTimeChange}
              headerText='Time To'
            />
          </div>
          <Button
            onClick={() => {
              this.onSearch()
              this.toggleDrawer('filterBottom', false)
            }}
            color='rgb(225, 0, 80)'
          >
            Search
          </Button>
          <Button onClick={() => this.toggleDrawer('filterBottom', false)} color='grey'>
            Cancel
          </Button>
        </FilterWrapper>
      </Drawer>
    )
  }

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    })
  }

  render() {
    const { isEditMealShowing } = this.state
    const dietBroken = this.state.totalCalories > this.state.expectedCalories
    return (
      <AuthConsumer>
        {({ isAuth, login, role, logout }) => (
          <Wrapper>
            <BaseHeader role={this.props.role} onLogout={logout} />
            {this.caloriesInfo(dietBroken)}
            {this.filterWrapper()}
            {this.addAndEdit(isEditMealShowing)}
            <InnerWrapper>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  color='#5FBA7D'
                  onClick={() => {
                    this.editOpenHandler(true)
                    this.toggleDrawer('addBottom', true)
                  }}
                >
                  Add
                </Button>
                <Button
                  color='#2196f3'
                  onClick={() => {
                    this.toggleDrawer('filterBottom', true)
                  }}
                >
                  Filter
                </Button>
                <Button
                  color='rgb(225, 0, 80)'
                  onClick={() => {
                    this.toggleDrawer('infoBottom', true)
                  }}
                >
                  Settings
                </Button>
              </div>
              <Records>
                <RecordsHeader>Records</RecordsHeader>
                {this.renderRecords()}
                {this.state.logsCount > this.state.mealLogs.length && (
                  <Button onClick={() => this.loadMore(this.state.page)} color='lightGreen'>
                    More
                  </Button>
                )}
              </Records>
            </InnerWrapper>
          </Wrapper>
        )}
      </AuthConsumer>
    )
  }
}

export default Logs
