import React, {Component} from 'react';
import { connect } from 'react-redux'

import AppComponent from '../components/App'
import Auth from '../components/Auth'
import TaskList from './tasks/TaskList'

import { authInit, authLogin } from '../actions/auth'

class App extends Component {
  componentWillMount(){
    this.props.authInit()
    this.setState({
      login: this.props.login
    })
  }

  loginFieldChange(login){
    console.log('change', login)
    this.setState({
      login
    })
  }

  handleSubscribe(){
    this.props.authLogin(this.state.login)
  }

  render(){
    const {auth} = this.props,
      {login} = this.state,
      component = auth.login && auth.token ? <TaskList /> : <Auth
        login = {login}
        onFieldChange={login => this.loginFieldChange(login)}
        handleSubscribe={() => this.handleSubscribe()}
      />
    return <AppComponent component={component}/>
  }
}

const mapStateToProps = (state) =>{
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { authInit, authLogin }
)(App)