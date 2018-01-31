import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Container from 'components/container'
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Container />
      </MuiThemeProvider>
    )
  }
}

export default App
