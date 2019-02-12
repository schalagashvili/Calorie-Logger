import React, { Component } from 'react'
import moment from 'moment-timezone'
import { Wrapper, InnerWrapper, Records } from './styles'
import { Button } from '../../styles/mixins'
import { Filter, Record, Settings, AddRecord, Header, TableHeader } from '../../components'
import BaseHeader from '../../components/BaseHeader'
import { AuthConsumer } from '../../AuthContext'
import { insertFunc } from '../../utility'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addMealLog, editMealLog, getMealLogs, removeMealLog } from '../../actions/record'
import { getUser, editUserCalories } from '../../actions/user'
import ReactPaginate from 'react-paginate'

class Logs extends Component {
  constructor(props) {
    super(props)
    const day = new Date()
    const today = new Date().toISOString().substr(0, 10)
    const yesterday = day.setDate(day.getDate() - 1)
    this.state = {
      expectedCalories: 0,
      totalCalories: 0,
      mealLogs: [],
      fromDate: yesterday,
      toDate: today,
      addBottom: false,
      settingsBottom: false,
      filterBottom: false,
      page: 1,
      logsCount: null,
      addTitle: '',
      addCalories: '',
      today: today,
      addDate: new Date().toISOString().substr(0, 10),
      addTime: new Date().toTimeString().substr(0, 5),
      fromTime: new Date().toTimeString().substr(0, 5),
      toTime: new Date().toTimeString().substr(0, 5)
    }
  }

  async componentDidMount() {
    const token = this.props.token
    const userId = this.props.match.params.userId
    const { fromDate, toDate, fromTime, toTime, page } = this.state
    await this.props.getUser(userId, token)

    const user = this.props.userInfo.user
    console.log(user.expectedCalories)
    this.setState({
      expectedCalories: user.expectedCalories,
      email: user.email
    })

    await this.props.getMealLogs(fromDate, toDate, fromTime, toTime, page, userId, token)

    let totalCalories = 0
    const mealLogs = this.props.mealLogs.logs
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    this.setState({
      mealLogs: mealLogs != null ? mealLogs.reverse() : [],
      totalCalories,
      logsCount: this.props.mealLogs.logsCount,
      page: this.state.page + 1
    })
  }

  loadMore = async page => {
    const { fromDate, toDate, fromTime, toTime } = this.state
    const token = this.props.token
    const userId = this.props.match.params.userId

    await this.props.getMealLogs(fromDate, toDate, fromTime, toTime, page, userId, token)
    let totalCalories = 0
    const mealLogs = this.props.mealLogs.logs
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    const mergedLogs = this.state.mealLogs.concat(mealLogs)
    this.setState({
      mealLogs: mergedLogs,
      page: this.state.page + 1
    })
  }

  onSearch = async () => {
    const token = this.props.token
    const userId = this.props.match.params.userId
    console.log(userId)
    const { fromDate, toDate, fromTime, toTime, page } = this.state
    await this.props.getMealLogs(fromDate, toDate, fromTime, toTime, page, userId, token)

    let totalCalories = 0
    const mealLogs = this.props.mealLogs.logs
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    this.setState({
      mealLogs: mealLogs != null ? mealLogs.reverse() : [],
      totalCalories,
      logsCount: this.props.mealLogs.logsCount,
      page: 1
    })
  }

  editOpenHandler = (isAdd, id) => {
    if (isAdd) {
      const addDate = new Date().toISOString().substr(0, 10)
      const addTime = new Date().toTimeString().substr(0, 5)
      this.setState({ isAdd, addDate, addTime })
    } else {
      const editLog = this.state.mealLogs.filter(log => log._id === id)[0]
      const addDate = new Date(editLog.date).toISOString().substr(0, 10)
      const addTime = new Date(editLog.date).toTimeString().substr(0, 5)
      this.setState({
        editId: id,
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
    const { expectedCalories } = this.state
    const token = this.props.token
    const userId = this.props.match.params.userId

    this.props.editUserCalories(userId, token, expectedCalories)
  }

  onAddCaloriesChange = e => {
    let calories = e.target.value
    if (calories < 0) {
      calories *= -1
    }
    this.setState({ addCalories: parseFloat(calories) })
  }

  onSave = async () => {
    let { addDate, addTime, addTitle, addCalories, isAdd, editId, today } = this.state
    const token = this.props.token

    if (addTitle === '' || addCalories === '') {
      return this.setState({ saveError: 1, saveErrorText: 'Please fill all fields' })
    } 

    // a.diff(b) // a - b < 0
    // b.diff(a) // b - a > 0
    // today.diff(addDate, 'days')
    // else if (addDate === today) {
    //   return this.setState({ saveError: 1, saveErrorText: 'You can`t add meals for future days' })
    // }


    this.setState({ addDate: '', addTime: '', addTitle: '', addCalories: '', saveError: null, addBottom: false })
    const datetime = moment.tz(`${addDate} ${addTime}`, 'Asia/Tbilisi').toDate()
    const userId = this.props.match.params.userId
    let mealLogs = this.state.mealLogs
    let totalCalories = 0
    if (isAdd) {
      await this.props.addMealLog(addTitle, addCalories, datetime, token, userId)
      mealLogs = insertFunc(mealLogs, 0, {
        title: addTitle,
        calories: addCalories,
        date: datetime
      })
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      const meals = mealLogs.slice(0, 9)
      this.setState({ mealLogs: meals, totalCalories })
    } else {
      await this.props.editMealLog(addTitle, addCalories, datetime, this.props.token, userId, editId)

      const editedLogIndex = mealLogs.findIndex(log => log._id === editId)
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
    }
  }

  handleChange = (state, value) => {
    this.setState({ [state]: value })
  }

  onDelete = id => {
    const userId = this.props.match.params.userId

    this.props.removeMealLog(userId, this.props.token, id)

    let mealLogs = this.state.mealLogs
    mealLogs = mealLogs.filter(log => log._id !== id)
    let totalCalories = 0
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    this.setState({ mealLogs, totalCalories, logsCount: this.state.logsCount - 1 })
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
          handleChange={this.handleChange}
          onDelete={this.onDelete}
          date={date}
        />
      )
    })
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      // this.loadCommentsFromServer();
    });
  };

  render() {
    const { settingsBottom, logsCount, mealLogs, page } = this.state
    const dietBroken = this.state.totalCalories > this.state.expectedCalories
    return (
      <AuthConsumer>
        {({ logout }) => (
          <Wrapper>
            <BaseHeader role={this.props.role} onLogout={logout} />
            <Settings
              updateExpectedCalories={this.updateExpectedCalories}
              onExpectedCaloriesChange={this.onExpectedCaloriesChange}
              dietBroken={dietBroken}
              expectedCalories={this.state.expectedCalories}
              handleChange={this.handleChange}
              totalCalories={this.state.totalCalories}
              settingsBottom={settingsBottom}
            />
            <Filter
              handleChange={this.handleChange}
              onSearch={this.onSearch}
              filterBottom={this.state.filterBottom}
              fromDate={this.state.fromDate}
              toDate={this.state.toDate}
              fromTime={this.state.fromTime}
              toTime={this.state.toTime}
            />
            <AddRecord
              addBottom={this.state.addBottom}
              isAdd={this.state.isAdd}
              addTime={this.state.addTime}
              addDate={this.state.addDate}
              handleChange={this.handleChange}
              addTitle={this.state.addTitle}
              onAddCaloriesChange={this.onAddCaloriesChange}
              saveError={this.state.saveError}
              saveErrorText={this.state.saveErrorText}
              onSave={this.onSave}
              addCalories={this.state.addCalories}
            />
            <InnerWrapper>
              <Header
                toggleDrawer={this.handleChange}
                editOpenHandler={this.editOpenHandler}
                expectedCalories={this.state.expectedCalories}
                fromTime={this.state.fromTime} toTime={this.state.toTime}
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
              />
              <Records>
                <TableHeader />
                <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={20}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                // onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
                {this.renderRecords()}
                {logsCount > mealLogs.length && (
                  <Button onClick={() => this.loadMore(page)} color='lightGreen'>
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

const mapDispatchToProps = dispatch => {
  return {
    getUser: bindActionCreators(getUser, dispatch),
    getMealLogs: bindActionCreators(getMealLogs, dispatch),
    addMealLog: bindActionCreators(addMealLog, dispatch),
    editMealLog: bindActionCreators(editMealLog, dispatch),
    removeMealLog: bindActionCreators(removeMealLog, dispatch),
    editUserCalories: bindActionCreators(editUserCalories, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    mealLogs: state.record.data,
    userInfo: state.user.data
  }
}

const LogsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs)
export default LogsComponent
