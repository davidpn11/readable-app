import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import PropTypes from 'prop-types'
import './CommentItem.css'
import * as _ from 'lodash'
import compose from 'lodash/fp/compose'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionEdit from 'material-ui/svg-icons/image/edit'
import { green400, red400, blue400 } from 'material-ui/styles/colors'

class CommentItem extends Component {
  static propTypes = {
    commentData: PropTypes.object.isRequired,
  }

  render() {
    const { title, author, body, voteScore } = this.props.commentData
    return (
      <div className="wrapper">
        <Card>
          <span className="actions-wrapper">
            <ActionDelete
              color={red400}
              // onClick={() => this.props.deletePost(id)}
            />
            <ActionEdit
              color={blue400}
              // onClick={() => this.props.editPost(this.props.postData)}
            />
          </span>
          <CardText>
            <div className="text-wrapper">
              <span className="comment-body">{body}</span>
              <span className="comment-author">{author}</span>
            </div>
            <div className="upvote">
              <div className="comment-vote-wrapper">
                <FloatingActionButton
                  backgroundColor={green400}
                  mini={true}
                  // onClick={() => this.props.votePost(id, 'upVote')}
                >
                  <ContentAdd />
                </FloatingActionButton>
                <span className="vote-count">{voteScore}</span>
                <FloatingActionButton
                  // onClick={() => this.props.votePost(id, 'downVote')}
                  backgroundColor={red400}
                  mini={true}
                >
                  <ContentRemove />
                </FloatingActionButton>
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default CommentItem
