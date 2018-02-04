import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import uuid from 'uuid'
import { getCategories, addPost } from 'actions'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    width: '50%',
    top: '100px',
    bottom: '40px',
    height: '40%',
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
  }

  state = {
    category: '',
    title: '',
    author: '',
    text: '',
    btnDisabled: true,
  }

  constructor() {
    super()
    Modal.setAppElement('body')
  }

  componentWillMount() {
    this.props.getCategories()
  }

  submitPost = (event) => {
    event.preventDefault()
    const { title, author, text, category } = this.state
    const post = { title, author, text, category }
    this.props.addPost(post)
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
    const { title, author, text, category } = this.state
    if (
      title.length === 0 ||
      author.length === 0 ||
      text.length === 0 ||
      category.length === 0
    ) {
      !this.state.btnDisabled && this.setState({ btnDisabled: true })
    } else {
      this.state.btnDisabled && this.setState({ btnDisabled: false })
    }
  }

  render() {
    this.checkForm()
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
              floatingLabelText="Title"
              onChange={this.handleChange}
            />
            <TextField
              id="author"
              floatingLabelText="Author"
              onChange={this.handleChange}
            />
            <TextField
              id="text"
              floatingLabelText="Text"
              multiLine={true}
              onChange={this.handleChange}
            />
            <SelectField
              floatingLabelText="Category"
              value={this.state.category}
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
            <RaisedButton
              label="SUBMIT"
              style={submitStyle}
              primary={true}
              type="submit"
              disabled={this.state.btnDisabled}
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

export default connect(mapStateToProps, { getCategories, addPost })(PostModal)
