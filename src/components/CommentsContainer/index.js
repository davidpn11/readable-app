import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { URL, headers } from 'actions/constants'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import CommentList from 'components/CommentList'
import styled from 'styled-components'
import { cyan100 } from 'material-ui/styles/colors'

const Wrapper = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`
const fabStyle = {
  position: 'fixed',
  right: '30px',
  bottom: '30px',
}
class CommentsContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    post: {},
  }

  componentWillMount() {
    const id = this.props.match.params.id
    fetch(`${URL}/posts/${id}`, { headers })
      .then((res) => res.json())
      .then((post) => this.setState({ post }))
  }

  render() {
    const { title, author, body } = this.state.post
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
          <Card style={{ backgroundColor: cyan100 }}>
            <CardHeader
              title={title}
              titleStyle={{ fontSize: 30 }}
              subtitle={author}
              subtitleStyle={{ fontSize: 20 }}
            />
            <CardText style={{ fontSize: 20 }}>{body}</CardText>
          </Card>
          <h2>Comments</h2>
          <CommentList postId={this.state.post.id || ''} />
        </Wrapper>
      </div>
    )
  }
}

export default CommentsContainer
