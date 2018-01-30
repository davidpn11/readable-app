import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from 'actions'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

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
        <Card>
          <h2>{post.title}</h2>
        </Card>
      </ListItem>
    ))
  }

  render() {
    return (
      <div>
        <List>{this.getPostList()}</List>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { getPosts })(PostList)
