import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getCategoriesPosts } from 'actions'
import AppBar from 'material-ui/AppBar'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import IconButton from 'material-ui/IconButton'
import CategoriesDrawer from 'components/categoriesDrawer'
import PostList from 'components/postList'
import { connect } from 'react-redux'

class Container extends Component {
  static propTypes = {
    match: PropTypes.object,
    getCategoriesPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.match) {
      const category = this.props.match.params.category
      this.props.getCategoriesPosts(category)
    }
  }

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

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getCategoriesPosts })(Container)
