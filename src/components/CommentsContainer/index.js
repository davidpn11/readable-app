import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
class CommentsList extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const id = this.props.match.params.id
    console.log(id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <AppBar
          title="Comments"
          onTitleClick={this.handleFilterClick}
          iconElementLeft={
            <Link to={'/'}>
              <IconButton>
                <BackIcon color="#fff" />
              </IconButton>
            </Link>
          }
        />
      </div>
    )
  }
}

export default CommentsList
