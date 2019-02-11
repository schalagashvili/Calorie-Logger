import { injectGlobal } from 'styled-components'
import Muli from '../assets/fonts/Muli-Regular.ttf'

injectGlobal`
  @font-face {
    font-family: Muli;
    src: url('${Muli}') format('opentype');
  }

  * {
      font-family: Muli;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-size: 18;
      text-decoration: none;
      letter-spacing:  0.6px;
  }

  body {
    margin: 0;
  }
`
