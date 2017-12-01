import React from 'react';
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export default class EnterAuth extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        textBoxLabel: PropTypes.string,
        buttonLabel: PropTypes.string
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    onPress = async () => {
        if (typeof this.props.onSubmit === 'function') {
            if (await this.props.onSubmit(this.state.text)) {
                console.log("valid authentication");
                this.setState({text:""});
            } else {
                console.log("Invalid authentication");
            }

        }
    };

    render() {
        return (
            <KeyboardAvoidingView behavior={'padding'}
                                  style={[styles.centeredView, {backgroundColor: 'white', padding: 40}]}>

                <TextInput keyboardType={'numeric'} style={styles.phoneNumberInput} placeholder={this.props.textBoxLabel}
                           placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}
                           onChangeText={(text) => this.setState({text})} value={this.state.text}  />
                <TouchableHighlight onPress={() => this.onPress()} underlayColor={'white'}>
                    <Text style={styles.back}>{this.props.buttonLabel}</Text>
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