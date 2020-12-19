import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 112.5%;

}

body {
  font-family: 'Noto Sans', sans-serif;
  font-weight: 500;
  line-height: 1.4;
  color: #E0E0E0;
  background-color: #333333;
  min-height: 100vh;
}
`
export default GlobalStyles
