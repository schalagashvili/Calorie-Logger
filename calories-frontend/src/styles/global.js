import { injectGlobal } from 'styled-components'
import fonts from './fonts'
import Roboto from '../assets/fonts/Roboto-Regular.ttf'

injectGlobal`
  @font-face {
    font-family: Roboto;
    src: url('${Roboto}') format('opentype');
  }

  * {
      font-family: Roboto;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-size: 18;
      text-decoration: none;
  }

  body {
    margin: 0;
  }
`
