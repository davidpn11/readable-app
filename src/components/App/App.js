import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PostContainer from 'components/PostContainer'
import { BrowserRouter, Route } from 'react-router-dom'
import CommentsContainer from 'components/CommentsContainer'
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path="/" render={() => <PostContainer />} />
          <Route
            exact
            path="/comments/:id"
            component={(props) => <CommentsContainer {...props} />}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
