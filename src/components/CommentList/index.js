import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getComments, addComment } from 'actions'
import CommentItem from 'components/CommentItem'
import styled from 'styled-components'
import * as _ from 'lodash'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import CommentModal from 'components/CommentModal'
const ListWrapper = styled.div`
  margin-top: 20px;
`

const NewComment = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  alignitems: flex-end;
  padding: 20px;
  margin-top: 15px;
  border: 1px solid lightgray;
  border-radius: 10px;
`

const submitStyle = {
  float: 'right',
}

class CommentList extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    getComments: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    comments: PropTypes.any,
  }

  state = {
    isModalOpen: false,
    isLoaded: false,
    author: '',
    body: '',
    commentData: {},
  }

  componentWillMount() {
    const id = this.props.postId
    id && this.props.getComments(id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postId && !this.state.isLoaded) {
      this.props.getComments(nextProps.postId)
      this.setState({ isLoaded: true })
    }
  }

  handleChange = (event, value) => {
    let obj = {}
    obj[event.target.id] = value
    this.setState(obj)
  }

  submitComment = (event) => {
    event.preventDefault()
    const comment = {
      author: this.state.author,
      body: this.state.body,
      parentId: this.props.postId,
    }
    console.log(comment)
    this.props.addComment(comment)
    this.setState({ body: '', author: '' })
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })

  checkForm = () => {
    if (this.state.author.length === 0 || this.state.body.length === 0) {
      return true
    } else {
      return false
    }
  }

  editComment = (commentData) => {
    this.setState({ commentData })
    this.toggleModal()
  }

  render() {
    const { comments } = this.props
    return (
      <div>
        <ListWrapper>
          {_.map(comments, (comment) => {
            if (!comment.deleted) {
              return (
                <CommentItem
                  key={comment.id}
                  commentData={comment}
                  editComment={this.editComment}
                />
              )
            }
          })}
        </ListWrapper>
        <NewComment>
          <form onSubmit={this.submitComment}>
            <TextField
              id="author"
              floatingLabelText="Author"
              fullWidth={true}
              onChange={this.handleChange}
            />
            <TextField
              id="body"
              floatingLabelText="Write a comment"
              fullWidth={true}
              onChange={this.handleChange}
            />
            <FloatingActionButton
              type="submit"
              style={submitStyle}
              disabled={this.checkForm()}
            >
              <ContentSend />
            </FloatingActionButton>
          </form>
        </NewComment>
        <CommentModal
          isOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          commentData={this.state.commentData}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { comments: state.comments }
}
export default connect(mapStateToProps, { getComments, addComment })(
  CommentList
)
