import React from 'react';
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator} from 'react-native';

import CodeScreen from './js/EnterCode';
import PhoneScreen from './js/EnterPhone';
import JobScreen from './js/EnterJob';
import AcceptScreen from './js/Acceptance'
import { StackNavigator } from 'react-navigation';

const SimpleApp = StackNavigator({
    ENTER_PHONE: {screen: PhoneScreen},
    ENTER_CODE: {screen: CodeScreen},
    ENTER_JOB: {screen: JobScreen},
    ACCEPT: {screen: AcceptScreen},
});
export default SimpleApp;


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

