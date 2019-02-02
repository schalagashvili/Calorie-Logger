import { injectGlobal } from 'styled-components'
import fonts from './fonts'
import KrubRegular from '../assets/fonts/Krub-Regular.ttf'

injectGlobal`
  @font-face {
    font-family: KrubRegular;
    src: url('${KrubRegular}') format('opentype');
  }

  * {
      font-family: KrubRegular;
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
