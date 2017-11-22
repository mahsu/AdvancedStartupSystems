import React from 'react';
import { View,Image, Text,StyleSheet,KeyboardAvoidingView,TextInput, Dimensions, TouchableHighlight } from 'react-native';


export default class Accept extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        var {navigate} = this.props.navigation;
        return (
            <View>
                <View style={[{margin: 20},styles.row]}>
                    <Image source={require('../resource/celebrate.png')} style={styles.left}/>
                    <Text style={{fontSize: 30, paddingLeft: 20, fontWeight: 'bold'}}>Aleo Accepts!</Text>
                </View>

                <Image source={require('../resource/profile.jpg')}
                       style={{width:Dimensions.get('window').width, height: 200 }}></Image>
                <Text style={{margin: 30}}>Aleo has accepted your job. Please make sure to coordinate with him.</Text>

                <View style={styles.row}>
                    <Image source = {require('../resource/truck.png')} style={styles.left}></Image>
                    <Text style={styles.t}>Truck</Text>

                </View>
                <View style={styles.row}>
                    <Image source = {require('../resource/phone.png')} style={styles.left}></Image>
                    <Text style={styles.t}>967-244-2145</Text>
                </View>
                <View style={styles.row}>
                    <Image source = {require('../resource/money.png')} style={styles.left}></Image>
                    <Text style={styles.t}>$450</Text>
                </View>
                <Text style={styles.back}>Message</Text>
            </View>

        );
    };
}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // Probably this style should get moved into a dedicated PhoneValidation component.

    t: {
        marginLeft: 20,
        fontSize: 20,
        color: '#010c30',
        textAlign: 'center'
    },
    left: {
        width: 40,
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
    },
    back:{
        margin:10,
        fontSize: 15,
        textAlign: 'center',
        padding: 5,
        color: '#ff8d8d',
    }
});