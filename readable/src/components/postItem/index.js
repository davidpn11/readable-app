import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { votePost, deletePost } from 'actions'
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import styled from 'styled-components'
import './postItem.css'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionEdit from 'material-ui/svg-icons/image/edit'
import { green400, red400, blue400 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

const Post = styled(Card)`
  margin-bottom: 15px;
`

const ActionSpan = styled.span`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: flex-end;
`

const fabStyle = {
  marginBottom: 10,
}

class postItem extends Component {
  static propTypes = {
    postData: PropTypes.object.isRequired,
    votePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    editPost: PropTypes.func,
    addVote: PropTypes.func,
    expandable: PropTypes.bool,
  }

  setVote(id, value) {
    this.props.votePost(id, value).then(() => this.props.addVote())
  }

  render() {
    const {
      id,
      title,
      author,
      timestamp,
      body,
      category,
      voteScore,
      commentCount,
    } = this.props.postData

    let date = new Date(timestamp)
    let formatedDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
    // Hours part from the timestamp
    return (
      <div>
        {this.props.expandable ? (
          <Post>
            <CardHeader
              title={title}
              subtitle={author}
              titleStyle={{ fontSize: 20 }}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText>
              <div className="post-wrapper">
                <ActionSpan>
                  <ActionDelete
                    color={red400}
                    onClick={() => this.props.deletePost(id)}
                  />{' '}
                  <ActionEdit
                    color={blue400}
                    onClick={() => this.props.editPost(this.props.postData)}
                  />
                </ActionSpan>
                <span className="date">{formatedDate}</span>
                <div>
                  <Link to={`/${category}`}>
                    <span className="category">{category}</span>
                  </Link>
                  <Link to={`/comments/${id}`}>
                    <span className="comments">
                      {commentCount} comments
                      <i className="material-icons">keyboard_arrow_right</i>
                    </span>
                  </Link>
                </div>
              </div>
            </CardText>
            <CardActions>
              <Link to={`/${category}/${id}`}>
                <FlatButton label="See Details" />
              </Link>
            </CardActions>
            <CardText expandable={true}>
              <div className="content-wrapper">
                <div>
                  <h3>Content</h3>
                  {body}
                </div>
                <div className="upvote">
                  <div className="vote-wrapper">
                    <FloatingActionButton
                      style={fabStyle}
                      backgroundColor={green400}
                      mini={true}
                      onClick={() => this.setVote(id, 'upVote')}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                    <FloatingActionButton
                      onClick={() => this.setVote(id, 'downVote')}
                      backgroundColor={red400}
                      mini={true}
                    >
                      <ContentRemove />
                    </FloatingActionButton>
                  </div>
                  <span className="vote-count">{voteScore}</span>
                </div>
              </div>
            </CardText>
          </Post>
        ) : (
          <Post>
            <CardHeader
              title={title}
              subtitle={author}
              titleStyle={{ fontSize: 20 }}
            />
            <CardText>
              <div className="post-wrapper">
                <ActionSpan>
                  <ActionDelete
                    color={red400}
                    onClick={() => this.props.deletePost(id)}
                  />{' '}
                  <ActionEdit
                    color={blue400}
                    onClick={() => this.props.editPost(this.props.postData)}
                  />
                </ActionSpan>
                <span className="date">{formatedDate}</span>
                <div>
                  <Link to={`/${category}`}>
                    <span className="category">{category}</span>
                  </Link>
                  <Link to={`/comments/${id}`}>
                    <span className="comments">
                      {commentCount} comments
                      <i className="material-icons">keyboard_arrow_right</i>
                    </span>
                  </Link>
                </div>
              </div>
            </CardText>
            <CardActions>
              <Link to={`/${category}/${id}`}>
                <FlatButton label="See Details" />
              </Link>
            </CardActions>
            <CardText>
              <div className="content-wrapper">
                <div>
                  <h3>Content</h3>
                  {body}
                </div>
                <div className="upvote">
                  <div className="vote-wrapper">
                    <FloatingActionButton
                      style={fabStyle}
                      backgroundColor={green400}
                      mini={true}
                      onClick={() => this.setVote(id, 'upVote')}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                    <FloatingActionButton
                      onClick={() => this.setVote(id, 'downVote')}
                      backgroundColor={red400}
                      mini={true}
                    >
                      <ContentRemove />
                    </FloatingActionButton>
                  </div>
                  <span className="vote-count">{voteScore}</span>
                </div>
              </div>
            </CardText>
          </Post>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  votePost,
  deletePost,
})(postItem)
