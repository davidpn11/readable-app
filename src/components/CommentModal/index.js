import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import uuid from 'uuid'
import { editComment } from 'actions'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

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
    position: 'relative',
    width: '400px',
    top: '40%',
    maxHeight: '100%',
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

const CommentEditForm = styled.form`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const submitStyle = {
  display: 'flex',
  alignSelf: 'flex-end',
}

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

class CommentModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    commentData: PropTypes.object,
    toggleModal: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    Modal.setAppElement('body')
  }

  state = {
    body: '',
    id: '',
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.commentData) return
    const { body, id } = nextProps.commentData
    this.setState({ body, id })
  }

  editComment = (event) => {
    event.preventDefault()
    const { id, body } = this.state
    this.props.editComment(id, body)
    this.setState({})
    this.props.toggleModal()
  }

  handleChange = (event, value) => {
    let obj = {}
    obj[event.target.id] = value
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          style={modalStyle}
          contentLabel="EditComment"
        >
          <CommentEditForm onSubmit={this.editComment}>
            <TextField
              id="body"
              defaultValue={this.state.body}
              floatingLabelText="Text"
              multiLine={true}
              fullWidth={true}
              rowsMax={4}
              onChange={this.handleChange}
            />
            <RaisedButton
              label="EDIT"
              style={submitStyle}
              primary={true}
              type="submit"
            />
          </CommentEditForm>
          <CloseSpan onClick={this.props.toggleModal}>
            <NavigationClose />
          </CloseSpan>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { editComment })(CommentModal)
