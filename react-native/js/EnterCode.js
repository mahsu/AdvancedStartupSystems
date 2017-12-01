import React from 'react';
import { View, Text,StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight } from 'react-native';


export default class EnterCode extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }



    render() {
        var {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior={'padding'}
                                  style={[styles.centeredView, {backgroundColor: 'white', padding: 40}]}>

                <TextInput keyboardType={'numeric'} style={styles.codeInput} placeholder={"Enter Code"}
                           placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}
                           onChangeText={(text) => this.setState({text})} value={this.state.text}  />
                <TouchableHighlight onPress={() => navigate('ENTER_JOB')} underlayColor={'white'}>
                    <Text style={styles.back}>JOIN</Text>
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
    codeInput: {
        marginBottom: 30,
        fontSize: 20,
        color: '#010c30',
        paddingBottom: 10,
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