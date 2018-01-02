import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from 'material-ui'
import { indigo, amber, red } from 'material-ui/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
          ...indigo,
          500: '#115566',
          700: '#2683ad',
          'A700': '#2683ad'
      },
      secondary: {
        ...amber,
        500: '#f4b350',
      },
      error: red,
    },
  });

ReactDOM.render(
    <Router>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Router>, document.getElementById('root'))
registerServiceWorker()
