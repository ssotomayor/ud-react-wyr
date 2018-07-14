import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import middleware from './middleware'
import reducers from './reducers'
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'

const store = createStore(reducers, middleware)

function getTheme(theme) {
    return createMuiTheme({
      palette: {
        primary: orange,
        secondary: green,
        type: theme.paletteType,
        background: {
          default: theme.paletteType === 'light' ? '#000' : '#fff',
        },
      },
      shape: {
          borderRadius: '10%'
      }
    })
  }
  
  const theme = getTheme({
    paletteType: 'dark',
  })

ReactDOM.render(
<MuiThemeProvider theme={theme}>
    <Provider store={store}>
        <App />
    </Provider>
</MuiThemeProvider>
,document.getElementById('root'))
