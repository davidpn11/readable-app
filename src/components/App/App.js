import React, { Component } from 'react'
import logo from 'images/logo.svg'
import { connect } from 'react-redux'
import './App.css'
import { getCategories } from 'actions'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import IconButton from 'material-ui/IconButton'

class App extends Component {
  static propTypes = {
    categories: PropTypes.any,
    getCategories: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const iconStyles = {
      fontSize: 36,
    }

    const { categories } = this.props
    console.log(this.props)
    return (
      <MuiThemeProvider>
        <AppBar
          title="Readable"
          showMenuIconButton={false}
          iconElementRight={
            <IconButton>
              <FilterIcon />
            </IconButton>
          }
        />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { categories: state.categories }
}

export default connect(mapStateToProps, { getCategories })(App)
