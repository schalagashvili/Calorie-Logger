import styled from 'styled-components'

export const CalorieSettings = styled.div`
  display: flex;
  width: 560px;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: auto;
  margin: 15px auto;
  align-items: center;
`


export const ExpectedCalories = styled.div`
  display: flex;
  line-height: 1.5px;
  margin-top: 20px;
  margin-right: 10px;
`

export const TotalCalories = styled.div`
  color: ${props => props.color};
  font-weight: bold;
  margin-left: 5px;
  font-size: 16px;
`

export const TotalWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  font-size: 16px;
`