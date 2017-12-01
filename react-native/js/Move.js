/**
 * Created by daiyuhui on 21/11/2017.
 */
import React from 'react';
import {StyleSheet,Dimensions } from 'react-native';
import MyMap from './MyMap';
import { Container, Button,Content, Icon, Text, Form,Item, Input } from 'native-base';

export default class Move extends React.Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state={
            modalVisible: false,
            activity: false,
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

    // onRequest(){
    //     var {navigate} = this.props.navigation;
    //     this.setState({modalVisible:true});
    //
    //     () => navigate('ACCEPT');
    // };

    render() {
        var {navigate} = this.props.navigation;
        let w = Dimensions.get('window').width;

        return (
        <Container>
            <Content>
                <Content style={styles.map}>
                    <MyMap/>
                </Content>
                <Content style={[{marginTop: 25},styles.row]}>
                    <Content>
                        <Text style={[styles.left, {width: w/2}]}>Number of Rooms to Move:</Text>
                    </Content>
                    <Content>
                        <Form>
                            <Item>
                                <Input keyboardType={'numeric'} style={styles.codeInput} placeholder="4"/>
                            </Item>
                        </Form>

                    </Content>

                </Content>
                <Content style={styles.row}>
                    <Content>
                        <Text style={[styles.left, {width: w/2}]}>Job Start Time:</Text>
                    </Content>
                    <Content>
                        <Form>
                            <Item>
                                <Input style={styles.codeInput} placeholder="12:00 PM" />
                            </Item>
                        </Form>

                    </Content>

                </Content>
                <Content style={styles.row}>
                    <Content>
                        <Text style={[styles.left, {width: w/2}]}>Finish By:</Text>
                    </Content>
                    <Content>
                        <Form>
                            <Item>
                                <Input style={styles.codeInput} placeholder="14:00 PM" />
                            </Item>
                        </Form>

                    </Content>
                </Content>

                <Content style={styles.row}>
                    <Content>
                        <Text style={[styles.left, {fontSize: 30, width: w/2}]}>Max Price:</Text>
                    </Content>
                    <Content>
                        <Form>
                            <Item>
                                <Input style={styles.price} placeholder="$450"/>
                            </Item>
                        </Form>

                    </Content>
                </Content>
                <Content style={[styles.col]}>
                    <Content>
                        <Text style={[styles.left, {width: w}]}>Describe Your Job:</Text>
                    </Content>
                    <Content>
                        <Form>
                            <Item>
                                <Input style={[styles.codeInput,{width: w}]} placeholder="eg: moving sofa" maxLength={120}
                                       onChangeText={this.onChangeText.bind(this)}/>
                            </Item>
                        </Form>
                        <Text style={{textAlign:"right", marginRight:20}}>{this.state.textLength}/120</Text>

                    </Content>

                </Content>


                <Button iconLeft onPress={() => navigate('ACCEPT')}>
                    <Icon name='home' />
                    <Text>SEND</Text>
                </Button>

            </Content>
        </Container>
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