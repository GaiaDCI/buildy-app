import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';

export default class LoginView extends Component {
	static navigationOptions = {
		title            : 'Login',
		headerStyle      : { backgroundColor: '#173746' },
		headerTintColor  : 'white',
		headerTitleStyle : { color: 'white' }
	};
	constructor(props) {
		super(props);
		state = {
			email        : '',
			password     : '',
			userLoggedIn : false
		};
	}

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	onClickListener = (viewId) => {
		Alert.alert('Alert', 'Button pressed ' + viewId);
	};

	login = () => {
		return axios
			.post('http://10.0.1.130:3001/api/user/login', { email: this.state.email, password: this.state.password })
			.then((response) => {
				this.setState({
					userLoggedIn : true
				});
				return response;
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	render() {
		if (this.state.userLoggedIn === true) {
			this.props.navigation.navigate('Home');
		}
		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<Image
						style={styles.inputIcon}
						source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }}
					/>
					<TextInput
						style={styles.inputs}
						placeholder="Email"
						keyboardType="email-address"
						underlineColorAndroid="transparent"
						onChangeText={(email) => this.setState({ email })}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Image
						style={styles.inputIcon}
						source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }}
					/>
					<TextInput
						style={styles.inputs}
						placeholder="Password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
						onChangeText={(password) => this.setState({ password })}
					/>
				</View>

				<TouchableHighlight style={[ styles.buttonContainer, styles.loginButton ]} onPress={() => this.login()}>
					<Text style={styles.loginText}>Login</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={styles.buttonContainer}
					onPress={() => this.props.navigation.navigate('UsersignUp')}
				>
					<Text>Register as user</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={styles.buttonContainer}
					onPress={() => this.props.navigation.navigate('SignUp')}
				>
					<Text>Register as profi</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container       : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#DCDCDC'
	},
	inputContainer  : {
		borderBottomColor : '#F5FCFF',
		backgroundColor   : '#FFFFFF',
		borderRadius      : 30,
		borderBottomWidth : 1,
		width             : 250,
		height            : 45,
		marginBottom      : 20,
		flexDirection     : 'row',
		alignItems        : 'center'
	},
	inputs          : {
		height            : 45,
		marginLeft        : 16,
		borderBottomColor : '#FFFFFF',
		flex              : 1
	},
	inputIcon       : {
		width          : 30,
		height         : 30,
		marginLeft     : 15,
		justifyContent : 'center'
	},
	buttonContainer : {
		height         : 45,
		flexDirection  : 'row',
		justifyContent : 'center',
		alignItems     : 'center',
		marginBottom   : 20,
		width          : 250,
		borderRadius   : 30
	},
	loginButton     : {
		backgroundColor : '#00b5ec'
	},
	loginText       : {
		color : 'white'
	}
});