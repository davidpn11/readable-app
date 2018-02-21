import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, getCategoriesPosts, getPosts } from 'actions'
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
    getCategoriesPosts: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getCategories()
  }

  getCategoriesList = () => {
    const { categories } = this.props
    return _.map(categories, (category) => (
      <ListItem
        key={category.name}
        primaryText={category.name}
        onClick={() => this.updatePosts(category.name)}
      />
    ))
  }

  updatePosts(category?) {
    const { getCategoriesPosts, getPosts, toggleDrawer } = this.props
    if (category) {
      getCategoriesPosts(category)
    } else {
      getPosts()
    }
    toggleDrawer()
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
          <ListItem
            key="All"
            primaryText="All posts"
            onClick={() => this.updatePosts()}
          />
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
  getCategoriesPosts,
  getPosts,
})(categoriesDrawer)
