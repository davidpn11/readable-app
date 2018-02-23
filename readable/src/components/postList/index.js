import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from 'actions'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import PostItem from 'components/postItem'
import styled from 'styled-components'
import PostModal from 'components/PostModal'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const PList = styled.ul`
  list-style-type: none;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PItem = styled.li`
  list-style-type: none;
  width: 100%;
`

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const fabStyle = {
  position: 'fixed',
  right: '30px',
  bottom: '30px',
}

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.any,
    getPosts: PropTypes.func.isRequired,
    orderValue: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.getPosts()
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

  editPost = (editedPost) => {
    this.setState({ isModalOpen: !this.state.isModalOpen, editedPost })
  }

  reorderList() {
    this.props.orderValue === 'voteScore' && this.getPostList()
  }

  getPostList = () => {
    let { posts, orderValue } = this.props
    posts = _.sortBy(posts, orderValue)
    return _.map(posts, (post) => {
      if (!post.deleted) {
        return (
          <PItem key={post.title}>
            <PostItem
              postData={post}
              editPost={this.editPost}
              addVote={() => this.reorderList}
            />
          </PItem>
        )
      }
    })
  }

  render() {
    const posts = this.getPostList()
    return (
      <div>
        <ListWrapper>
          <PList>{posts}</PList>
        </ListWrapper>
        <PostModal
          isOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          editPostData={this.state.editedPost}
        />
        <FloatingActionButton style={fabStyle} onClick={this.toggleModal}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { getPosts })(PostList)
