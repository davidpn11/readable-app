import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from 'actions'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import PostItem from 'components/postItem'
import { List, ListItem } from 'material-ui/List'
import styled from 'styled-components'

const PList = styled(List)`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
class PostList extends Component {
  static propTypes = {
    posts: PropTypes.any,
    getPosts: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.getPosts()
  }

  getPostList = () => {
    const { posts } = this.props
    return _.map(posts, (post) => (
      <ListItem key={post.title}>
        <PostItem postData={post} />
      </ListItem>
    ))
  }

  render() {
    return (
      <div>
        <PList>{this.getPostList()}</PList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { getPosts })(PostList)
