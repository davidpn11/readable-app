import React, { Component } from 'react'
import logo from 'images/logo.svg'
import { connect } from 'react-redux'
import './App.css'
import { getCategories } from '../actions'
import PropTypes from 'prop-types'
class App extends Component {
  componentWillMount() {
    let token = localStorage.token
    const URL = 'http://localhost:3001'
    if (!token)
      token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8)

    const headers = {
      // Accept: 'application/json',
      Authorization: token,
    }
    console.log(`mounting`)
    fetch(`${URL}/categories`, headers)
      .then((res) => res.json())
      .then((data) => console.log(data))

    // this.props.getCategories()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps, { getCategories })(App)
