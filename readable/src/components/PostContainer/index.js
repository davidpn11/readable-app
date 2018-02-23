import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getCategoriesPosts } from 'actions'
import AppBar from 'material-ui/AppBar'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
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
    order: 'timestamp',
  }

  setOrder(order) {
    this.state.order !== order && this.setState({ order })
  }

  handleMenuClick = () =>
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  toggleDrawer = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen })

  render() {
    return (
      <div>
        <AppBar
          title="Readable"
          onLeftIconButtonClick={this.handleMenuClick}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <FilterIcon />
                </IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                primaryText="Order by date"
                checked={this.state.order === 'timestamp'}
                onClick={() => this.setOrder('timestamp')}
              />
              <MenuItem
                primaryText="Order by votes"
                checked={this.state.order === 'voteScore'}
                onClick={() => this.setOrder('voteScore')}
              />
            </IconMenu>
          }
        />
        <CategoriesDrawer
          isOpen={this.state.isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
        />
        <PostList orderValue={this.state.order} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getCategoriesPosts })(Container)
