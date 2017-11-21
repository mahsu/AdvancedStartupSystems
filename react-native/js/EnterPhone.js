import React from 'react';
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, TouchableHighlight} from 'react-native';

export default class EnterPhone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    onPhoneNumber = (inputText) => {
        var {navigate} = this.props.navigation;

        () => navigate('ENTER_CODE');

        console.log(this.props);
    };

    render() {
        var {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior={'padding'}
                                  style={[styles.centeredView, {backgroundColor: 'white', padding: 40}]}>

                <TextInput keyboardType={'numeric'} style={styles.phoneNumberInput} placeholder={"Enter Number"}
                           placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}
                           onChangeText={(text) => this.setState({text})} value={this.state.text}  />
                <TouchableHighlight onPress={() => navigate('ENTER_CODE')} underlayColor={'white'}>
                    <Text style={styles.back}>SEND CODE</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        );
    };
}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    // Probably this style should get moved into a dedicated PhoneValidation component.
    phoneNumberInput: {
        marginBottom: 30,
        fontSize: 20,
        paddingBottom: 10,
        color: '#010c30',
        textAlign: 'center',
        width: 200,
    },
    back:{
        marginTop:30,
        fontSize: 15,
        textAlign: 'center',
        padding: 5,
        color: '#010c30',
        backgroundColor: '#d1e1ff',
        width: 120,
        borderRadius: 10,
    }
});