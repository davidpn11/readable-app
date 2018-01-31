import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import styled from 'styled-components'

const Post = styled(Card)`
  margin: 0;
`

class postItem extends Component {
  static propTypes = {
    postData: PropTypes.object.isRequired,
  }
  render() {
    const { title } = this.props.postData
    return (
      <Post>
        <h2>{title}</h2>
      </Post>
    )
  }
}

export default postItem
