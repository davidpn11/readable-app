import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getComments } from 'actions'
import CommentItem from 'components/CommentItem'
import styled from 'styled-components'
import * as _ from 'lodash'

const ListWrapper = styled.div`
  margin-top: 20px;
`

class CommentList extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    getComments: PropTypes.func.isRequired,
    comments: PropTypes.any,
  }

  state = {
    isLoaded: false,
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

  render() {
    const { comments } = this.props
    return (
      <ListWrapper>
        {_.map(comments, (comment) => (
          <CommentItem key={comment.id} commentData={comment} />
        ))}
      </ListWrapper>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.comments)
  return { comments: state.comments }
}
export default connect(mapStateToProps, { getComments })(CommentList)
