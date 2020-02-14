import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import firebase from "firebase";

//import firebase from '@firebase/app';
//import '@firebase/auth';
import { connect } from "react-redux";

import { tryLogin } from "../actions";

import FormRow from "../components/FormRow";

class pages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: "",
      password: "",
      isLoading: false,
      message: ""
    };
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDa5xR9xYq1Fo7fxs9xzkVRWSlpUB6OTvA",
      authDomain: "series-e7fd2.firebaseapp.com",
      databaseURL: "https://series-e7fd2.firebaseio.com",
      projectId: "series-e7fd2",
      storageBucket: "series-e7fd2.appspot.com",
      messagingSenderId: "954141092421",
      appId: "1:954141092421:web:f24ea88824fa653503512c",
      measurementId: "G-ZR8T5SPY1G"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();
  }

  onChangeHandler(field, value) {
    this.setState({
      [field]: value
    });
  }

  tryLogin() {
    this.setState({ isLoading: true, message: "" });
    const { mail: email, password } = this.state;

    this.props
      .tryLogin({ email, password })
      .then(user => {
        if (user) {
          return this.props.navigation.replace("Main");
        }
        this.setState({
          isLoading: false,
          message: ""
        });
      })
      .catch(error => {
        this.setState({
          isLoading: true,
          message: this.getMessageByErrorCode(error.code)
        });
      });
  }

  //Tratando os erros possiveis
  getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      default:
        return "Erro desconhecido";
    }
  }

  renderButton() {
    if (this.state.isLoading) return <ActivityIndicator />;

    return <Button title="Entrar" onPress={() => this.tryLogin()} />;
  }

  renderMessage() {
    const { message } = this.state;
    if (!message) return null;

    return (
      <View>
        <Text>{message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FormRow first>
          <TextInput
            style={styles.input}
            placeholder="user@email.com"
            value={this.state.mail}
            onChangeText={value => this.onChangeHandler("mail", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </FormRow>
        <FormRow last>
          <TextInput
            style={styles.input}
            placeholder="******"
            secureTextEntry
            value={this.state.password}
            onChangeText={value => this.onChangeHandler("password", value)}
          />
        </FormRow>
        {this.renderButton()}
        {this.renderMessage()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
});

export default connect(null, { tryLogin })(pages);
