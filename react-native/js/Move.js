/**
 * Created by daiyuhui on 21/11/2017.
 */
import React from 'react';
import { View, StyleSheet,Text, TextInput, TouchableHighlight,Dimensions } from 'react-native';
import MyMap from './MyMap';


export default class Move extends React.Component {
    // static navigationOptions = {
    //     tabBarIcon: ({ tintColor }) => (
    //         <Image
    //             source={require('../resource/home.png')}
    //             style={[styles.icon, {tintColor: tintColor}]}/>
    //     ),
    //
    // };
    constructor(props) {
        super(props);
        this.state={
            room: '',
            textLength: 0,
            startTime: 0,
            endTime: 0,
            maxPrice: 0,
            jobDescription:""
        };
    }
    onChangeText(text){
        this.setState({
            textLength: text.length
        });
    }

    render() {
        var {navigate} = this.props.navigation;
        let w = Dimensions.get('window').width;

        return (
            <View style={styles.container}>
                <View style={styles.map}>
                    <MyMap/>
                </View>
                <View style={[{marginTop: 25},styles.row]}>
                    <View>
                        <Text style={[styles.left, {width: w/2}]}>Number of Rooms to Move:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={styles.codeInput} placeholder={"4"}
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}/>
                    </View>

                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={[styles.left, {width: w/2}]}>Job Start Time:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={styles.codeInput} placeholder={"12:30 PM"}
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}/>
                    </View>

                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={[styles.left, {width: w/2}]}>Finish By:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={styles.codeInput} placeholder={"14:00 PM"}
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={[styles.left, {fontSize: 30, width: w/2}]}>Max Price:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={styles.price} placeholder={"$450"}
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}/>
                    </View>
                </View>
                <View style={[styles.col]}>
                    <View>
                        <Text style={[styles.left, {width: w}]}>Describe Your Job:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={[styles.codeInput,{width: w}]} placeholder={"eg: moving sofa"}
                                   placeholderTextColor={'#bac3e0'} maxLength={120} onChangeText={this.onChangeText.bind(this)}
                                   underlineColorAndroid={'rgba(186,195,224,0.5)'}/>
                        <Text style={{textAlign:"right"}}>{this.state.textLength}/120</Text>
                    </View>

                </View>
                <TouchableHighlight onPress={() => navigate('ACCEPT')} underlayColor={'white'}>
                    <Text style={styles.back}>SEND</Text>
                </TouchableHighlight>
            </View>
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
    map: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#222'
    },

    left: {
        fontSize: 16,
        paddingLeft: 10,
        textAlign: 'left',
    },
    right: {
        fontSize: 16,

        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    },
    codeInput: {
        fontSize: 15,
        color: '#010c30',
        paddingBottom: 10,
        textAlign: 'center',
        width: 200,
    },
    price: {
        marginBottom: 30,
        fontSize: 30,
        color: '#010c30',
        paddingBottom: 10,
        textAlign: 'center',
        width: 200,
    },
    back:{
        marginBottom:20,
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center',
        padding: 5,
        color: '#010c30',
        backgroundColor: '#d1e1ff',
        width: 120,
        borderRadius: 10,
        justifyContent: 'center',
    }
});