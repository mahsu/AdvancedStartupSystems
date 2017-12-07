/**
 * Created by daiyuhui on 06/12/2017.
 */
import React from 'react';
import { ScrollView, View, StyleSheet,Text, RefreshControl, TouchableHighlight,Dimensions, FlatList} from 'react-native';
import {List} from 'native-base';
import MyMap from './MyMap';

class MyListItem extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let w = Dimensions.get('window').width;
        return (
            <View style={[styles.row,{margin:10} ]}>

                <View style={[styles.col,{width:w*0.7}]}>
                    <Text style={[styles.left,{fontSize:20, color:"#fbf5e2"}]}>{this.props.id}</Text>
                    <View style = {styles.row}>
                        <Text style={[styles.left,styles.details]}>Number of Rooms: {this.props.room}</Text>
                        <Text style={[styles.right, styles.details, {fontWeight:'bold'}]}>{this.props.price}</Text>
                    </View>
                    <Text style={[styles.left,styles.time]}>{this.props.start} ~ {this.props.end}</Text>

                </View>
                <TouchableHighlight style={[styles.accept,{width:w*0.3}]} underlayColor={'transparent'}>
                    <Text style={styles.back}>Accept</Text>
                </TouchableHighlight>
            </View>
        );
    }

}

export default class DriverHome extends React.Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);

        this.state={
            data: myJobs,
            refreshing: false,
        };
    }

    _onRefresh() {
        console.log("calling refresh control");
        this.setState({refreshing: true});
        fetchData().then(() => {
            this.setState({refreshing: false});
        });
    }

    render() {
        var {navigate} = this.props.navigation;

        return (

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                style={styles.container}>
                <Text style={styles.title}>Available Jobs</Text>
                    <FlatList

                        data={this.state.data}
                        renderItem={({item}) => <MyListItem
                            id={item.key}
                            price={item.maxPrice}
                            start={item.startTime}
                            end = {item.endTime}
                            room = {item.numRooms}
                        />}
                    />

            </ScrollView>
        );
    };
}
const myJobs=[
    {key: 'Job1', numRooms: '4', startTime: '12:00pm', endTime:'12:45pm', maxPrice: '$450', description: 'xxx'},
    {key: 'Job2', numRooms: '2', startTime: '14:00pm', endTime:'15:00pm', maxPrice: '$500', description: 'zzz'},
    {key: 'Job3', numRooms: '1', startTime: '12:00pm', endTime:'12:45pm', maxPrice: '$40', description: 'xxx'},
    {key: 'Job4', numRooms: '3', startTime: '20:00pm', endTime:'21:00pm', maxPrice: '$50', description: 'zzz'},
    {key: 'Job5', numRooms: '6', startTime: '12:00pm', endTime:'13:40pm', maxPrice: '$650', description: 'xxx'},
    {key: 'Job6', numRooms: '5', startTime: '12:00pm', endTime:'13:40pm', maxPrice: '$150', description: 'xxx'},
]
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#727272',
    },
    title: {
        margin: 30,
        color: "#f2f2f2",
        fontSize: 26,
    },
    time: {
        justifyContent:'center',
        fontSize: 14,
        color: '#d1e1ff',
        marginLeft:10,
        marginTop:10,
        marginRight:10
    },
    details: {
        justifyContent:'center',
        fontSize: 14,
        color: '#ff8d8d',
        marginLeft:10,
        marginTop:10,
        marginRight:10
    },
    left: {
        fontSize: 16,
        paddingLeft: 10,
        textAlign: 'left',
    },
    right: {
        fontSize: 16,
        paddingRight:10,
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        // alignItems:'center',
    },
    col: {
        flexDirection: 'column',
        // justifyContent:'center'
    },
    accept: {
        justifyContent: 'flex-end',
    },
    back:{
        marginBottom:20,
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center',
        padding: 10,
        color: '#fbf5e2',
        borderRadius: 10,
        justifyContent: 'center',
    }
});