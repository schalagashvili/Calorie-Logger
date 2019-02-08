import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
import { Wrapper, InnerWrapper, Records } from './styles'
import { Button } from '../../styles/mixins'
import { Filter, Record, Settings, AddRecord } from '../../components'
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
      addBottom: false,
      settingsBottom: false,
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
      let totalCalories = 0
      const mealLogs = response.data.logs
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      const mergedLogs = this.state.mealLogs.concat(mealLogs)
      this.setState({
        mealLogs: mergedLogs,
        page: this.state.page + 1
      })
    })
  }

  onSearch = () => {
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
      this.setState({
        mealLogs: mealLogs != null ? mealLogs.reverse() : [],
        totalCalories,
        searchLoading: false,
        logsCount: response.data.logsCount
      })
    })
  }

  editOpenHandler = (isAdd, id) => {
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

  onExpectedCaloriesChange = calories => {
    if (calories < 0) {
      calories *= -1
    }
    this.setState({ expectedCalories: calories })
  }

  updateExpectedCalories = () => {
    this.setState({ updateLoading: true })
    const { expectedCalories } = this.state
    const token = this.props.token
    const userId = this.props.match.params.userId
    axios({
      method: 'put',
      url: `${config.apiUrl}/editUser/${userId != null ? userId : ''}`,
      headers: { authorization: token },
      data: { expectedCalories }
    }).then(() => {
      this.setState({ updateLoading: false })
    })
  }

  onAddDateChange = e => {
    this.setState({ addDate: e.target.value })
  }

  onAddTimeChange = e => {
    this.setState({ addTime: e.target.value })
  }

  onAddTitleChange = e => {
    this.setState({ addTitle: e.target.value })
  }

  onAddCaloriesChange = e => {
    let calories = e.target.value
    if (calories < 0) {
      calories *= -1
    }
    this.setState({ addCalories: parseFloat(calories) })
  }

  onSave = () => {
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
      }).then(() => {
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
  }

  onFromDateChange = e => {
    this.setState({ fromDate: e.target.value })
  }

  onToDateChange = e => {
    this.setState({ toDate: e.target.value })
  }

  onFromTimeChange = e => {
    this.setState({ fromTime: e.target.value })
  }

  onToTimeChange = e => {
    this.setState({ toTime: e.target.value })
  }

  onDelete = id => {
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
    })
  }

  renderRecords() {
    let { mealLogs, totalCalories, expectedCalories } = this.state
    return mealLogs.map(log => {
      let { date, calories, title, _id } = log
      date = moment.tz(date, 'Asia/Tbilisi').format('YYYY-MM-DD HH:mm')
      return (
        <Record
          totalCalories={totalCalories}
          expectedCalories={expectedCalories}
          calories={calories}
          title={title}
          id={_id}
          editOpenHandler={this.editOpenHandler}
          toggleDrawer={this.toggleDrawer}
          onDelete={this.onDelete}
          date={date}
        />
      )
    })
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
            <Settings
              updateExpectedCalories={this.updateExpectedCalories}
              onExpectedCaloriesChange={this.onExpectedCaloriesChange}
              dietBroken={dietBroken}
              expectedCalories={this.state.expectedCalories}
              toggleDrawer={this.toggleDrawer}
              totalCalories={this.state.totalCalories}
              settingsBottom={this.state.settingsBottom}
            />
            <Filter
              onSearch={this.onSearch}
              toggleDrawer={this.toggleDrawer}
              filterBottom={this.state.filterBottom}
              fromDate={this.state.fromDate}
              toDate={this.state.toDate}
              onFromDateChange={this.onFromDateChange}
              onToDateChange={this.onToDateChange}
              fromTime={this.state.fromTime}
              toTime={this.state.toTime}
              onFromTimeChange={this.onFromTimeChange}
              onToTimeChange={this.onToTimeChange}
            />
            <AddRecord
              isEditMealShowing={isEditMealShowing}
              addBottom={this.state.addBottom}
              isAdd={this.state.isAdd}
              addTime={this.state.addTime}
              addDate={this.state.addDate}
              onAddDateChange={this.onAddDateChange}
              onAddTimeChange={this.onAddTimeChange}
              addTitle={this.state.addTitle}
              onAddTitleChange={this.onAddTitleChange}
              onAddCaloriesChange={this.onAddCaloriesChange}
              saveError={this.state.saveError}
              saveErrorText={this.state.saveErrorText}
              onSave={this.onSave}
              addCalories={this.state.addCalories}
              toggleDrawer={this.toggleDrawer}
            />
            <InnerWrapper>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
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
                      this.toggleDrawer('settingsBottom', true)
                    }}
                  >
                    Settings
                  </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, color: 'grey' }}>
                    Expected Calories: {this.state.expectedCalories}
                  </div>
                  <div style={{ fontSize: 13, color: 'grey', borderLeft: '1px solid grey' }}>
                    Total: {this.state.totalCalories}
                  </div>
                </div>
              </div>
              <Records>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: 'grey',
                    padding: '10px 137px 5px 45px'
                  }}
                >
                  <div>Meal</div>
                  <div>Calories</div>
                  <div>Date</div>
                  <div>Time</div>
                </div>
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
