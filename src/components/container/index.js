import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import IconButton from 'material-ui/IconButton'
import CategoriesDrawer from 'components/categoriesDrawer'
import PostList from 'components/postList'

class Container extends Component {
  state = {
    isDrawerOpen: false,
  }

  handleFilterClick = () =>
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  toggleDrawer = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen })

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
          isOpen={this.state.isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
        />
        <PostList />
      </div>
    )
  }
}

export default Container
