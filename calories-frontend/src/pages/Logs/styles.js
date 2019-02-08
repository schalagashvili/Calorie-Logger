import styled from 'styled-components'
import colors from '../../styles/colors'
import sizes, { tablet } from '../../styles/sizes'
import bgImage from '../../assets/images/bgImage.jpg'
// import Button from '@material-ui/core/Button'

export const Wrapper = styled.div`
  /* background-image: url(${bgImage}); */
  /* background-size: cover; */
  background-color: #F5F6FA;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
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

export const SearchButton = styled.div`
  background-color: ${colors.searchButton};
  max-width: 100px;
  padding: 5px 20px;
  margin-top: ${props => (props.logout ? '0px' : '20px')};
  color: white;
  font-size: 16px;
  display: flex;
  box-shadow: ${colors.primaryBoxShadow};
  font-weight: medium;
  justify-content: center;
  cursor: pointer;
  border-radius: ${sizes.buttonBorderRadius};
`

export const UpdateButton = styled.div`
  background-color: ${colors.thirdButton};
  max-width: 100px;
  padding: 5px 20px;
  margin-top: ${props => (props.logout ? '0px' : '20px')};
  color: white;
  font-size: 14px;
  display: flex;
  box-shadow: ${colors.primaryBoxShadow};
  font-weight: medium;
  justify-content: right;
  cursor: pointer;
  margin-left: '10px';
  border-radius: ${sizes.buttonBorderRadius};
`

export const Title = styled.div`
  color: #193466;
  font-weight: bold;
  font-size: 18px;
`

export const InnerWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 20px auto;
`

export const Records = styled.div`
  display: flex;
  margin: 8px;
  flex-direction: column; 
  /* box-shadow: ${colors.primaryBoxShadow}; */
  border-radius: ${sizes.borderRadius};
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
