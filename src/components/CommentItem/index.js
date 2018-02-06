import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import PropTypes from 'prop-types'

class CommentItem extends Component {
  static propTypes = {
    commentData: PropTypes.object.isRequired,
  }
  render() {
    const { title, author, body } = this.props.commentData
    return (
      <Card>
        <CardHeader title={title} subtitle={author} />
        <CardText>{body}</CardText>
      </Card>
    )
  }
}

export default CommentItem
