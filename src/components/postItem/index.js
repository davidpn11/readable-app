import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCategoriesPosts } from 'actions'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import styled from 'styled-components'
import './postItem.css'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { green400, red400 } from 'material-ui/styles/colors'

const Post = styled(Card)`
  margin-bottom: 15px;
`

const style = {
  marginBottom: 10,
}

class postItem extends Component {
  static propTypes = {
    postData: PropTypes.object.isRequired,
    getCategoriesPosts: PropTypes.func.isRequired,
  }

  upvotePost = () => {
    console.log('upvote')
  }

  downvotePost = () => {
    console.log('downvote')
  }

  render() {
    const {
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
            <span className="date">{formatedDate}</span>
            <div>
              <span
                className="category"
                onClick={() => this.props.getCategoriesPosts(category)}
              >
                {category}
              </span>
              <span className="comments">
                {commentCount} comments
                <i className="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </div>
        </CardText>
        <CardText expandable={true}>
          <div className="content-wrapper">
            <div>
              <h3>Content</h3>
              {body}
            </div>
            <div className="upvote">
              <div className="vote-wrapper">
                <FloatingActionButton
                  style={style}
                  backgroundColor={green400}
                  mini={true}
                  onClick={this.upvotePost()}
                >
                  <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton
                  onClick={this.downvotePost()}
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
    )
  }
}

function mapStateToProps(state) {
  return
}

export default connect(mapStateToProps, { getCategoriesPosts })(postItem)
