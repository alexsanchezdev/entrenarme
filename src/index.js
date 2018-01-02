import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from 'material-ui'
import { indigo, amber, red } from 'material-ui/colors'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

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

  const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Router>
    </Provider>, document.getElementById('root'))
registerServiceWorker()
