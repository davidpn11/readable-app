import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import IconButton from 'material-ui/IconButton'
import CategoriesDrawer from '../categoriesDrawer'
import PostList from '../postList'

class Container extends Component {
  state = {
    isOpen: false,
  }

  handleFilterClick = () => this.setState({ isOpen: !this.state.isOpen })
  toggleDrawer = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <div>
        <AppBar
          title="Readable"
          onTitleClick={this.handleFilterClick}
          showMenuIconButton={false}
          iconElementRight={
            <IconButton onClick={this.handleFilterClick}>
              <FilterIcon />
            </IconButton>
          }
        />
        <CategoriesDrawer
          isOpen={this.state.isOpen}
          toggleDrawer={this.toggleDrawer}
        />
        <PostList />
      </div>
    )
  }
}

export default Container
