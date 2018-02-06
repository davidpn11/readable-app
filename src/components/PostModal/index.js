import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import uuid from 'uuid'
import { getCategories, addPost, editPost } from 'actions'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

const PostForm = styled.form`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CloseSpan = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const submitStyle = {
  display: 'flex',
  alignSelf: 'flex-end',
}
const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30,30,30, 0.75)',
  },
  content: {
    position: 'absolute',
    width: '400px',
    top: '100px',
    bottom: '40px',
    maxHeight: '40%',
    margin: 'auto',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
}
class PostModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    categories: PropTypes.any,
    getCategories: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    editPostData: PropTypes.object,
  }

  state = {
    category: '',
    title: '',
    author: '',
    body: '',
  }

  constructor() {
    super()
    Modal.setAppElement('body')
  }

  componentWillMount() {
    this.props.getCategories()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editPostData == undefined) return

    const { title, author, category, body } = nextProps.editPostData
    this.setState({ title, author, category, body })
  }

  submitPost = (event) => {
    event.preventDefault()
    const { title, author, body, category } = this.state
    if (this.props.editPostData) {
      const post = { title, body }
      this.props.editPost(this.props.editPostData.id, post)
    } else {
      const post = { title, author, body, category }
      this.props.addPost(post)
    }
    this.props.toggleModal()
  }

  handleSelectChange = (event, index, category) => {
    this.setState({ category })
  }

  handleChange = (event, value) => {
    let obj = {}
    obj[event.target.id] = value
    this.setState(obj)
  }

  checkForm = () => {
    const { title, author, body, category } = this.state
    if (
      title.length === 0 ||
      author.length === 0 ||
      body.length === 0 ||
      category.length === 0
    ) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          style={modalStyle}
          contentLabel="Modal"
        >
          <PostForm onSubmit={this.submitPost}>
            <TextField
              id="title"
              defaultValue={this.state.title}
              floatingLabelText="Title"
              fullWidth={true}
              onChange={this.handleChange}
            />
            <TextField
              id="body"
              defaultValue={this.state.body}
              floatingLabelText="Text"
              multiLine={true}
              fullWidth={true}
              onChange={this.handleChange}
            />
            {!this.props.editPostData && (
              <div>
                <TextField
                  id="author"
                  defaultValue={this.state.author}
                  floatingLabelText="Author"
                  fullWidth={true}
                  onChange={this.handleChange}
                />
                <SelectField
                  floatingLabelText="Category"
                  value={this.state.category}
                  fullWidth={true}
                  onChange={this.handleSelectChange}
                >
                  {_.map(this.props.categories, (category) => (
                    <MenuItem
                      key={category.name}
                      value={category.name}
                      primaryText={category.name}
                    />
                  ))}
                </SelectField>
              </div>
            )}
            <RaisedButton
              label="SUBMIT"
              style={submitStyle}
              primary={true}
              type="submit"
              disabled={this.checkForm()}
            />
          </PostForm>
          <CloseSpan onClick={this.props.toggleModal}>
            <NavigationClose />
          </CloseSpan>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps, { getCategories, addPost, editPost })(
  PostModal
)
