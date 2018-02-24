import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import { URL, headers } from 'actions/constants'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import CommentList from 'components/CommentList'
import styled from 'styled-components'
import { cyan100 } from 'material-ui/styles/colors'
import PostItem from 'components/postItem'
import PostModal from 'components/PostModal'

class SinglePost extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    post: {},
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

  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`${URL}/posts/${id}`, { headers })
      .then((res) => res.json())
      .then((post) => {
        _.isEmpty(post) && this.props.history.push('/404')
        this.setState({ post })
      })
      .catch((err) => console.error('err', err))
  }

  render() {
    const { post } = this.state
    return (
      <div>
        <AppBar
          title=""
          onTitleClick={this.handleFilterClick}
          iconElementLeft={
            <Link to={'/'}>
              <IconButton>
                <BackIcon color="#fff" />
              </IconButton>
            </Link>
          }
        />
        <PostItem
          postData={post}
          editPost={this.editPost}
          addVote={() => this.reorderList}
        />
        <PostModal
          isOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          editPostData={this.state.editedPost}
        />
      </div>
    )
  }
}

export default SinglePost
