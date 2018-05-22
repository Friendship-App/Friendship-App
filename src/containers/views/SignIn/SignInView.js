import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import rest from '../../../utils/rest';
import Input from '../../../components/Input/Input';
import Background from '../../../components/Background';
import Footer from '../../../components/Footer';
import { paddings } from '../../../styles';

/**
 * Maps the auth state from to the props of this component
 * The auth state contains the logging state
 * @param state
 */
const mapStateToProps = state => ({
  auth: state.auth,
});

// Map functions to props
const mapDispatchToProps = dispatch => ({
  signIn: credentials => {
    dispatch(rest.actions.auth({}, { body: JSON.stringify(credentials) }))
      .then(() =>
        dispatch(
          NavigationActions.reset({
            index: 0, // active route = 0 (top of the stack)
            actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
          }),
        ),
      )
      .catch(err => console.log(err));
  },
});

class SignInView extends React.Component {
  state = {
    email: '',
    password: '',
    error: false,
    validationError: '',
    passwordSecure: true,
  };

  componentWillReceiveProps() {
    this.setState({ error: true });
  }

  renderStatus() {
    if (this.state.validationError) {
      return (
        <Text style={styles.statusTextStyle}>{this.state.validationError}</Text>
      );
    }
    const { data, error, loading } = this.props.auth;
    let status = '';
    if (data.decoded) {
      status = `Signed in as ${data.decoded.email}`;
    }
    if (this.state.error && error) {
      status = `${error.message}`;
    }
    if (loading) {
      status = `Loading ...`;
    }

    return (
      <HideWithKeyboard>
        <Text style={styles.statusTextStyle}>{status}</Text>
      </HideWithKeyboard>
    );
  }

  signIn() {
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({
        validationError: 'Please enter both email & password!',
      });
    }
    this.props.signIn({ email, password });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={20}
        style={{ height: '100%', width: '100%' }}
      >
        <Background scrollable>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              width: '100%',
              paddingHorizontal: paddings.MD,
              justifyContent: 'center',
            }}
          >
            <Input
              inputProps={{
                placeholder: 'HELLO@FRIENDSHIP.COM',
                keyboardType: 'email-address',
              }}
              title="EMAIL"
              style={{ marginBottom: 30 }}
              handleChange={value => this.setState({ email: value })}
            />
            <Input
              inputProps={{
                placeholder: '*************',
              }}
              secureTextEntry
              title="PASSWORD"
              handleChange={value => this.setState({ password: value })}
            />
            {this.renderStatus()}
          </View>
        </Background>
        <Footer onPress={() => this.signIn()}>
          <Text>Log in</Text>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  statusTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f7',
    marginTop: 20,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);
