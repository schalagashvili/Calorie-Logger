import styled from 'styled-components'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'

export const Add = styled.div`
  border-bottom: none;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin: 10px 0;
`

export const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  padding-bottom: 10px;
`

export const Button = styled.div`
  background-color: ${colors.primaryButton};
  max-width: 100px;
  padding: 5px 20px;
  margin-top: 20px;
  color: white;
  font-size: 18px;
  display: flex;
  box-shadow: ${colors.primaryBoxShadow};
  font-weight: medium;
  justify-content: center;
  cursor: pointer;
  margin-left: auto;
  border-radius: ${sizes.buttonBorderRadius};
`

export const InnerWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
`

export const RecordsHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
`

export const Role = styled.div`
  width: 50%;
  margin-top: 20px;
`

export const Buttons = styled.div`
  margin-left: auto;
  display: flex;
  align-items: baseline;
  width: 140px;
`
