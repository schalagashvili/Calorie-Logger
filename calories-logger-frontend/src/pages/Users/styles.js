import styled from 'styled-components'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f5f6fa;
  min-height: 100vh;
  height: 100%;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
  align-items: center;
`

export const HeaderDecoration = styled.div`
  height: 115px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  background: ${colors.primaryBackground};
`

export const NavigationTab = styled.div`
  border-bottom: 1px solid #dce0e0;
  width: 100%;
`

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

export const Title = styled.div`
  color: #193466;
  font-weight: bold;
  font-size: 18px;
`

export const InnerWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
`

export const Record = styled.div`
  display: flex;
  padding: 15px;
  margin-top: 10px;
  background-color: white;
  color: black;
  justify-content: space-between;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.18);
  }
`

export const Records = styled.div`
  display: flex;
  margin: 8px;
  flex-direction: column;
  border-radius: ${sizes.borderRadius};
`

export const IconsWrapper = styled.div`
  display: flex;
  width: 40px;
  justify-content: space-between;
`

export const RecordsHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
`

export const CaloriesInfo = styled.div`
  display: flex;
  width: 560px;
  margin: auto;
  justify-content: space-between;
  align-items: baseline;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    width: auto;
    margin: 15px auto;
    align-items: center;
  }
`

export const AddRecordButton = styled.div`
  background-color: ${colors.primaryButton};
  max-width: 115px;
  padding: 5px 20px;
  margin-top: 20px;
  margin-left: 20px;
  height: 35px;
  line-height: 25px;
  color: white;
  font-size: 16px;
  display: flex;
  box-shadow: ${colors.primaryBoxShadow};
  font-weight: medium;
  justify-content: center;
  cursor: pointer;
  border-radius: ${sizes.buttonBorderRadius};
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
