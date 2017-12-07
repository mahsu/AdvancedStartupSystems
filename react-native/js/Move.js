import React from 'react';
import { View, StyleSheet,Text, TextInput, TouchableHighlight,Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native';
import MyMap from './MyMap';
import {endpoint} from "../src/util";
import {connect} from "react-redux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const mapStateToProps = function(state){
    return {
        currentLoc: state.loc,
    }
};

class Move extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);

        this.state={

            details: {
                numRooms: '',
                startTime: null,
                endTime: null,
                maxPrice: 0,
                description:"",
            },
            textLength: 0,
        };
    }

    onChangeDescription = (text) => {
        this.setState({
            textLength: text.length,
            details: {...this.state.details, description: text}
        });
    };

    onSubmit = async () => {
        var {navigate} = this.props.navigation;
        let [lon, lat] = this.props.currentLoc;
        let body = Object.assign(this.state.details, {lon, lat});
        console.log(body);

        try {
            let response = await fetch(endpoint + 'job/new', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (response.status === 200) {
                var json = await response.body;
                navigate('ACCEPT');
                return true;
            } else {
                return false;
            }
        } catch(error) {
            console.error(error);
            return false;
        }
    };

    _showStartTimePicker = () => {
            Keyboard.dismiss();
            this.setState({isStartTimePickerVisible: true});
    };

    _showEndTimePicker = () => {
        Keyboard.dismiss();
        this.setState({ isEndTimePickerVisible: true });
    };

    _hideStartTimePicker = () => this.setState({ isStartTimePickerVisible: false });

    _hideEndTimePicker = () => this.setState({ isEndTimePickerVisible: false});

    _handleStartTimePicked = (date) => {
        this.setState({details: {...this.state.details, startTime: moment(date)}});
        this._hideStartTimePicker();
    };

    _handleEndTimePicked = (date) => {
        this.setState({details: {...this.state.details, endTime: moment(date)}});
        this._hideEndTimePicker();
    };

    render() {
        var {navigate} = this.props.navigation;
        let {startTime, endTime} = this.state.details;
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
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}
                                    onChangeText={(text) => this.setState({details: {...this.state.details, numRooms: text}})}/>
                    </View>

                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={[styles.left, {width: w/2}]}>Job Start Time:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={styles.codeInput} placeholder={"12:30 PM"}
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}
                                   onFocus={this._showStartTimePicker}
                                   value={startTime ? startTime.format('h:mm A') : ''}
                                    />
                        <DateTimePicker
                            isVisible={this.state.isStartTimePickerVisible}
                            onConfirm={this._handleStartTimePicked}
                            onCancel={this._hideStartTimePicker}
                            mode={'time'}
                        />
                    </View>

                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={[styles.left, {width: w/2}]}>Finish By:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={styles.codeInput} placeholder={"14:00 PM"}
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}
                                    onFocus={this._showEndTimePicker}
                                   value={endTime ? endTime.format('h:mm A') : ''}
                                    />
                        <DateTimePicker
                            isVisible={this.state.isEndTimePickerVisible}
                            onConfirm={this._handleEndTimePicked}
                            onCancel={this._hideEndTimePicker}
                            mode={'time'}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={[styles.left, {fontSize: 30, width: w/2}]}>Max Price:</Text>
                    </View>
                    <View>
                        <TextInput keyboardType={'numeric'} style={styles.price} placeholder={"$450"}
                                   placeholderTextColor={'#bac3e0'} underlineColorAndroid={'rgba(186,195,224,0.5)'}
                                    onChangeText={(text) => {this.setState({details: {...this.state.details, maxPrice: text}})}}/>
                    </View>
                </View>
                <View style={[styles.col]}>
                    <View>
                        <Text style={[styles.left, {width: w}]}>Describe Your Job:</Text>
                    </View>
                    <View>

                        <TextInput style={[styles.codeInput,{width: w}]} placeholder={"eg: moving sofa"}
                                   placeholderTextColor={'#bac3e0'} onChangeText={(text) => this.onChangeDescription(text)}
                                   underlineColorAndroid={'rgba(186,195,224,0.5)'}
                                   value={this.state.details.description}
                                    maxLength={120}/>

                        <Text style={{textAlign:"right", marginRight:20}}>{this.state.textLength}/120</Text>
                    </View>

                </View>
                <TouchableHighlight onPress={() => this.onSubmit()} underlayColor={'transparent'}>
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

export default connect(
    mapStateToProps
)(Move)