import React, { Component } from 'react'
import logo from 'images/logo.svg'
import { connect } from 'react-redux'
import './App.css'
import { getCategories } from '../actions'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
class App extends Component {
  static propTypes = {
    categories: PropTypes.any,
    getCategories: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const { categories } = this.props
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {_.map(categories, (category) => {
          return <li key={category.name}>{category.name}</li>
        })}
        <ul />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { categories: state.categories }
}

export default connect(mapStateToProps, { getCategories })(App)
