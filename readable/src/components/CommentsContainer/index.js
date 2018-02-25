import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSinglePost } from 'actions'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import { URL, headers } from 'actions/constants'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import CommentList from 'components/CommentList'
import styled from 'styled-components'
import { cyan100 } from 'material-ui/styles/colors'
import PostItem from 'components/postItem'
import PostModal from 'components/PostModal'

const Wrapper = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`
class CommentsContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getSinglePost: PropTypes.func.isRequired,
  }

  state = {
    isModalOpen: false,
    editedPost: undefined,
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      editedPost: undefined,
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSinglePost(id).then((data) => {
      _.isEmpty(data.payload) && this.props.history.push('/404')
    })
  }

  deletePost(event) {
    this.props.history.push('/')
  }

  editPost = (editedPost) => {
    this.setState({ isModalOpen: !this.state.isModalOpen, editedPost })
  }

  render() {
    const { post } = this.props
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
        <Wrapper>
          <PostModal
            isOpen={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            editPostData={this.state.editedPost}
          />
          <PostItem
            key={post.id}
            postData={post}
            editPost={this.editPost}
            parentCallback={(event) => this.deletePost(event)}
          />
          <h2>Comments</h2>
          <CommentList postId={post.id || ''} />
        </Wrapper>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const post = state.posts[0] || {}
  return { post }
}

export default connect(mapStateToProps, { getSinglePost })(CommentsContainer)
