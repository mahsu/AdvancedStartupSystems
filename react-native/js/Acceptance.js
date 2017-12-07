import React from 'react';
import { View,Image, Text,StyleSheet,KeyboardAvoidingView,TextInput, Dimensions, TouchableHighlight } from 'react-native';


export default class Accept extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state={
            mover: props.navigation.state.params.mover,
            job:props.navigation.state.params.job
        };

    }




    render() {

        var name = this.state.mover.name.first + " " + this.state.mover.name.last;

        return (
            <View style={{backgroundColor: '#727272'}}>
                <View style={[{margin: 20},styles.row]}>
                    <Image source={require('../resource/celebrate.png')} style={styles.left}/>
                    <Text style={{fontSize: 30, paddingLeft: 20, color: '#fbf5e2',fontWeight: 'bold'}}>{this.state.mover.name.first} Accepts!</Text>
                </View>

                <Image source={{uri: this.state.mover.image}}
                       style={{width:Dimensions.get('window').width, height: 250 }}></Image>
                <Text style={{color: '#fbf5e2',margin: 30}}>{name} has accepted your job. Please make sure to coordinate with him. Don't forget to pay him at the end of the day :)</Text>

                <View style={styles.row}>
                    <Image source = {require('../resource/job.png')} style={styles.left}></Image>
                    <Text style={styles.t}>{this.state.job.details.description}</Text>

                </View>
                <View style={styles.row}>
                    <Image source = {require('../resource/phone.png')} style={styles.left}></Image>
                    <Text style={styles.t}>{this.state.mover.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Image source = {require('../resource/money.png')} style={styles.left}></Image>
                    <Text style={styles.t}>{"$"+this.state.job.details.maxPrice}</Text>
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
    t: {
        marginLeft: 20,
        fontSize: 20,
        color: '#fbf5e2',
        textAlign: 'center',
        justifyContent: 'center'
    },
    left: {
        width: 40,
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        justifyContent: 'center'
    },
    back:{
        margin:10,
        fontSize: 15,
        textAlign: 'center',
        padding: 5,
        color: '#ff8d8d',
        fontWeight:"bold"
    }
});