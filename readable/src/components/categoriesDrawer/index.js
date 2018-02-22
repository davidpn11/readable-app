import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from 'actions'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { List, ListItem } from 'material-ui/List'

class categoriesDrawer extends Component {
  static propTypes = {
    categories: PropTypes.any,
    getCategories: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getCategories()
  }

  getCategoriesList = () => {
    const { categories } = this.props
    return _.map(categories, (category) => (
      <Link to={`/${category.path}`} key={category.name}>
        <ListItem
          primaryText={category.name}
          onClick={() => this.updatePosts(category.name)}
        />
      </Link>
    ))
  }

  render() {
    return (
      <Drawer width={300} openSecondary={true} open={this.props.isOpen}>
        <AppBar
          title={<span>Categories</span>}
          iconElementLeft={
            <IconButton onClick={this.props.toggleDrawer}>
              <NavigationClose />
            </IconButton>
          }
        />
        <List>
          <Link to={`/`}>
            <ListItem
              key="All"
              primaryText="All posts"
              onClick={() => this.props.toggleDrawer()}
            />
          </Link>
          {this.getCategoriesList()}
        </List>
      </Drawer>
    )
  }
}

function mapStateToProps(state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps, {
  getCategories,
})(categoriesDrawer)
