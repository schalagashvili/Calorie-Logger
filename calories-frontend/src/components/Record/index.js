import React, { Component } from 'react'
import { Record, IconsWrapper } from './styles'
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
        <div style={{ flex: 1 }}>{title}</div>
        <div style={{ flex: 1, color: '#8B93A6' }}>{calories} cal</div>
        <div style={{ flex: 1 }}>{moment.tz(date, 'Asia/Tbilisi').format('MM/DD/YYYY')}</div>
        <div style={{ flex: 0.7 }}>{moment.tz(date, 'Asia/Tbilisi').format('HH:mm')}</div>
        <IconsWrapper style={{ flex: 0.2 }}>
          <div
            onClick={() => {
              editOpenHandler(false, id)
              toggleDrawer('addBottom', true)
            }}
            style={{ cursor: 'pointer' }}
          >
            <EditIcon width={13} height={13} color='gray' />
          </div>
          <div onClick={() => onDelete(id)} style={{ cursor: 'pointer', marginLeft: 5 }}>
            <DeleteIcon width={11} height={11} color='red' />
          </div>
        </IconsWrapper>
      </Record>
    )
  }
}

export default RecordItem
