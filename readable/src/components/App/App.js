import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PostContainer from 'components/PostContainer'
import { Switch, Route } from 'react-router-dom'
import SinglePost from 'components/SinglePost'
import CommentsContainer from 'components/CommentsContainer'
import ActionInfo from 'material-ui/svg-icons/action/info'
import styled from 'styled-components'

const ErrorPage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`

const InfoIcon = styled(ActionInfo)`
  height: 50px !important;
  width: 50px !important;
`

const NotFound = () => (
  <ErrorPage>
    <InfoIcon /> Page not Found
  </ErrorPage>
)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Switch>
            <Route exact path="/" render={() => <PostContainer />} />
            <Route
              exact
              path="/:category"
              component={(props) => <PostContainer {...props} />}
            />
            <Route
              exact
              path="/:category/:id"
              component={(props) => <SinglePost {...props} />}
            />
            <Route
              exact
              path="/comments/:id"
              component={(props) => <CommentsContainer {...props} />}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
