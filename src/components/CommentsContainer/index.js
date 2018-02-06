import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { URL, headers } from 'actions/constants'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import CommentList from 'components/CommentList'
class CommentsContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    post: {},
  }

  componentWillMount() {
    const id = this.props.match.params.id
    fetch(`${URL}/posts/${id}`, { headers })
      .then((res) => res.json())
      .then((post) => this.setState({ post }))
  }

  render() {
    const { title, author, body } = this.state.post
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
        <Card>
          <CardHeader
            title={title}
            subtitle={author}
            titleStyle={{ fontSize: 20 }}
          />
          <CardText>{body}</CardText>
        </Card>
        <CommentList postId={this.state.post.id || ''} />
      </div>
    )
  }
}

export default CommentsContainer
