import React from 'react';
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator} from 'react-native';
import {Root} from 'native-base';

import EnterAuth from './js/components/EnterAuth';
import JobScreen from './js/EnterJob';
import AcceptScreen from './js/Acceptance'
import { StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
    ENTER_JOB: {screen: JobScreen},
    ACCEPT: {screen: AcceptScreen},
});

const AUTH_STATES = Object.freeze({phone: 1, code: 2, auth: 3});

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsAreLoaded: false,
            authState: AUTH_STATES.phone
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

    authenticate = async(input) => {
        console.log("auth", input);
        console.log(this.state.authState);
        switch (this.state.authState) {
            case AUTH_STATES.phone:
                //todo auth with server
                this.setState({authState: AUTH_STATES.code});
                console.log("state -> code")
                break;
            case AUTH_STATES.code:
                //todo auth with server
                this.setState({authState: AUTH_STATES.auth});
                break;
        }
        return true;
    };

    render() {
        if (!this.state.fontsAreLoaded) {
            return <View><Text>Loading</Text></View>;
        }
        if (this.state.authState !== AUTH_STATES.auth) {
            return (
                //<Provider store={store}>
                    <Root>
                        {this.state.authState === AUTH_STATES.phone
                        ? <EnterAuth onSubmit={this.authenticate} textBoxLabel="Enter Phone" buttonLabel="SEND CODE"/>
                        : <EnterAuth onSubmit={this.authenticate} textBoxLabel="Enter Code" buttonLabel="SEND"/>}
                    </Root>
                //</Provider>
            );
        }

        return (
           // <Provider store={store}>
                <Root>
                    <AppNavigator/>
                </Root>
            //</Provider>
        )

    }
}

// Possible Screen States (JS doesn't have Enum's)
// const ENTER_PHONE = 'ep';
// const ENTER_CODE = 'ec';
// const ENTER_JOB = 'ej';
// const SEARCHING = 'sr';

// This is the main application class.
// 'export' means it can be accessed via an 'import' in another file
// 'export default' is the idiomatic way to package a component in RN
// export default class App extends React.Component {
//     // This is how you implement a class constructor in ES6
//     constructor(props) {
//         super(props);  // this is idiomatic boilerplate for Component Constructor
//
//         // Application state currently only consists of
//         // 1. Which SCREEN are we looking at (see the SWITCH stmt in render())
//         // 2. If some loading or similar ACTIVITY is happening
//         //
//         // We may expect to extend the state significantly as the app grows,
//         // Although much state should be encapsulated in individual components
//         this.state = {
//             fontsAreLoaded: false,
//             activity: false,
//             screen: ENTER_PHONE
//         }
//     }
//
//     async componentWillMount() {
//         await Expo.Font.loadAsync({
//             'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
//             'Roboto': require('native-base/Fonts/Roboto.ttf'),
//             'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
//         });
//         this.setState({fontsAreLoaded: true});
//     }
//
//
// // This function is the main render function for the whole application.
// // We really just SWITCH between different views.
// // Probably all the views should really be defined in individual components
// // where each component represents a page of the application
//     render() {
//         // Copying state into a CONST really makes it clear that it is not possible
//         // to change state directly (you must use setState() at the appropriate time and place!)
//         if (!this.state.fontsAreLoaded) {
//             return <View><Text>Loading</Text></View>
//         }
//         const {screen} = this.state;
//         switch (screen) {
//             case ENTER_JOB:
//                 return enterJob();
//             case ENTER_CODE:
//                 return enterCode();
//             case ENTER_PHONE:
//                 // return (
//                 //         <EnterPhone></EnterPhone>
//
//                 // );
//                 return (
//                     <StyleProvider style={getTheme('material')}>
//                         <EnterPhone></EnterPhone>
//                     </StyleProvider>
//                 );
//         }
//     }
// }

