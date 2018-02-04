import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import IconButton from 'material-ui/IconButton'
import CategoriesDrawer from 'components/categoriesDrawer'
import PostList from 'components/postList'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import PostModal from 'components/PostModal'

const fabStyle = {
  position: 'absolute',
  right: '30px',
  bottom: '30px',
}

class Container extends Component {
  state = {
    isDrawerOpen: false,
    isModalOpen: true,
  }

  handleFilterClick = () =>
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  toggleDrawer = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }
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
        <FloatingActionButton style={fabStyle} onClick={this.toggleModal}>
          <ContentAdd />
        </FloatingActionButton>
        <PostModal
          isOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
        />
      </div>
    )
  }
}

export default Container
