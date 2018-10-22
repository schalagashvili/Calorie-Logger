import { injectGlobal } from 'styled-components'
import fonts from './fonts'
import QuicksandRegular from '../assets/fonts/Quicksand-Regular.ttf'

injectGlobal`
  @font-face {
    font-family: QuicksandRegular;
    src: url('${QuicksandRegular}') format('opentype');
  }

  * {
      font-family: QuicksandRegular;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-size: ${fonts.sizes.normal};
  background-color: #fff;
      text-decoration: none;
  }

  body {
    margin: 0;
  }
`
