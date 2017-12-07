/**
 * Created by daiyuhui on 06/12/2017.
 */
import React from 'react';
import { ScrollView, Animated,View, StyleSheet,Text, RefreshControl, TouchableHighlight,Dimensions, FlatList} from 'react-native';
import {List} from 'native-base';
import MyMap from './MyMap';
import {endpoint} from "../src/util";

class ListRow extends React.Component {
    constructor(props) {
        super(props)

        this._animated = new Animated.Value(0);
    }

    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount() {
        Animated.timing(this.state.fadeAnim,
            {
                toValue: 1,
                duration: 3000,
            }
        ).start();
    }

    render() {
        let { fadeAnim } = this.state; //_animated;

        return (
            <Animated.View style={[{...this.props.style, opacity: fadeAnim,}]}>
                {this.props.children}
            </Animated.View>
        );
    }
}



class MyListItem extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {

        let w = Dimensions.get('window').width;
        return (
            <ListRow>
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
            </ListRow>
        );
    }

}

export default class DriverHome extends React.Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.renderJobs();
        this.state={
            data: null,
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

    renderJobs = async () => {
        try {
            let response = await fetch(endpoint + '/jobs/available', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                let responseJson = await response.json();
                console.log(responseJson.length);


                var data = [];
                for (var i=0; i< responseJson.length; i++) {
                    var obj = {
                        key: "Job ID "+ (i+1),
                        numRooms: responseJson[i].details.numRooms,
                        startTime:responseJson[i].details.startTime.split("T")[0],
                        endTime:responseJson[i].details.endTime.split("T")[0],
                        maxPrice: "$"+responseJson[i].details.maxPrice,
                        description: responseJson[i].details.description
                    }
                    data.push(obj);

                }

                this.setState({
                    data: data,
                });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    render() {

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
                            id={item.description}
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
    },
    row_item: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        height: 70,
    },
});