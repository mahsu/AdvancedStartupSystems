import React from 'react';
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator} from 'react-native';
import {Root} from 'native-base';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import EnterAuth from './js/components/EnterAuth';
import JobScreen from './js/EnterJob';
import AcceptScreen from './js/Acceptance';
import {StackNavigator} from 'react-navigation';
import reduxApp from './js/redux/reducers';
import {endpoint} from "./src/util";
import DriverScreen from "./js/DriverHome";

const AppNavigator = StackNavigator({
    ENTER_JOB: {screen: JobScreen},
    ACCEPT: {screen: AcceptScreen},
});

let store = createStore(reduxApp);

const AUTH_STATES = Object.freeze({phone: 1, code: 2, auth: 3, driver: 4});

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsAreLoaded: false,
            authState: AUTH_STATES.auth,
            phone: ""
        }
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({fontsAreLoaded: true});
    }

    authenticatePhone = async (phone) => {
        try {
            let response = await fetch(endpoint + 'auth/phone', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({phone})
            });

            if (response.status === 200) {
                let responseJson = await response.json();
                this.setState({
                    authState: AUTH_STATES.code,
                    phone: responseJson.phone,
                    type: responseJson.type,
                });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    authenticateCode = async (code) => {
        try {
            let response = await fetch(endpoint + 'auth/code', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({phone: this.state.phone, code})
            });

            if (response.status === 200) {
                let newauthstate = this.state.type == "driver" ? AUTH_STATES.driver : AUTH_STATES.auth;
                this.setState({
                    authState: newauthstate,
                    phone: "",
                    type: ""
                });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    authenticate = async (input) => {
        console.log("auth", input);
        console.log(this.state.authState);
        switch (this.state.authState) {
            case AUTH_STATES.phone:
                return this.authenticatePhone(input);
            case AUTH_STATES.code:
                return this.authenticateCode(input);
        }
        return false;
    };

    render() {
        if (!this.state.fontsAreLoaded) {
            return <View><Text>Loading</Text></View>;
        }

        if (this.state.authState === AUTH_STATES.driver) {
            return (
                <Provider store={store}>
                    <Root>
                        <DriverScreen/>
                    </Root>
                </Provider>

            );
        }
        if (this.state.authState !== AUTH_STATES.auth) {
            return (
                <Provider store={store}>
                    <Root>
                        {this.state.authState === AUTH_STATES.phone
                            ? <EnterAuth onSubmit={this.authenticate} textBoxLabel="Enter Phone" buttonLabel="SEND CODE"/>
                            : <EnterAuth onSubmit={this.authenticate} textBoxLabel="Enter Code" buttonLabel="VERIFY"/>}
                    </Root>
                </Provider>
            );
        }

        return (
            <Provider store={store}>
                <Root>
                    <AppNavigator/>
                </Root>
            </Provider>
        )

    }
}