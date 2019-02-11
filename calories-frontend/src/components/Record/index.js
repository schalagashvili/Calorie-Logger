import React, { Component } from 'react'
import { Record, IconsWrapper, Title, Calories, DateText, Time, Icon } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import moment from 'moment-timezone'

class RecordItem extends Component {
  render() {
    const {
      totalCalories,
      expectedCalories,
      calories,
      title,
      id,
      editOpenHandler,
      toggleDrawer,
      onDelete,
      date
    } = this.props

    return (
      <Record key={id}>
        {totalCalories > expectedCalories ? (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            style={{ color: 'rgb(225,0,80)', marginRight: 15 }}
          />
        ) : (
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#91c653', marginRight: 15 }} />
        )}
        <Title>{title}</Title>
        <Calories>{calories}</Calories>
        <DateText>{moment.tz(date, 'Asia/Tbilisi').format('MM/DD/YYYY')}</DateText>
        <Time>{moment.tz(date, 'Asia/Tbilisi').format('HH:mm')}</Time>
        <IconsWrapper>
          <Icon
            onClick={() => {
              editOpenHandler(false, id)
              toggleDrawer('addBottom', true)
            }}
          >
            <EditIcon width={13} height={13} color='gray' />
          </Icon>
          <Icon onClick={() => onDelete(id)}>
            <DeleteIcon width={11} height={11} color='red' />
          </Icon>
        </IconsWrapper>
      </Record>
    )
  }
}

export default RecordItem
