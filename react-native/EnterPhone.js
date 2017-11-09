import React from 'react';
import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Image, ActivityIndicator} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

export default class EnterPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: false
        }
    }

    // This function gets called when someone finishes entering their number.
    // It should probably get moved into a Component like
    // PhoneVerification in PhoneVerification.js for example
    onPhoneNumber = (inputText) => {

        // We immediately indicate some activity is happening
        this.setState({activity: true});

        // And second we initiate the activity.  This should be a `fetch` api call,
        // however for now we'll just use a Timeout
        setTimeout(() => {
            // When the timeout completes, we indicate activity no longer happening,
            // and we change screens.  See my SWITCH statement in the render() func.
            this.setState({
                activity: false,
                screen: ENTER_CODE,
            });
        }, 1500);
    };

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Header</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
        );

        return (
            <KeyboardAvoidingView behavior={'padding'}
                                  style={[styles.centeredView, {backgroundColor: 'black', padding: 40}]}>
                <Text style={{color: 'white'}}>
                    Welcome. In order to connect you with hundreds of nearby helpers,
                    let's to make sure you can receive SMS Messages.
                </Text>
                <TextInput keyboardType={'numeric'} maxLength={12} style={styles.phoneNumberInput}
                           onEndEditing={this.onPhoneNumber} editable={!this.state.activity}/>
                <ActivityIndicator animating={this.state.activity} size={'large'} style={{margin: 20}}/>
            </KeyboardAvoidingView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },

    // Probably this style should get moved into a dedicated PhoneValidation component.
    phoneNumberInput: {
        marginTop: 20,
        fontSize: 45,
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#222'
    }
});