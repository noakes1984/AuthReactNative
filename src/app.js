import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyBt_3ye4qTuSLA0Hk4SkwNX3SCWnB1AAkM',
    authDomain: 'authentication-8dbd4.firebaseapp.com',
    databaseURL: 'https://authentication-8dbd4.firebaseio.com',
    projectId: 'authentication-8dbd4',
    storageBucket: 'authentication-8dbd4.appspot.com',
    messagingSenderId: '107420063497'
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  });
}

renderContent() {
    switch (this.state.loggedIn) {
      case true:
          return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }



  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
