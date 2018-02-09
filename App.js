
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, TouchableHighlight,Dimensions, ScrollView,FlatList,ListView } from 'react-native';
import{Content ,Icon,Container,Button,Header,Drawer,Thumbnail,Footer,Item,Input,Left} from 'native-base';
import { DrawerNavigator,StackNavigator,TabNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import InvertibleScrollView from 'react-native-invertible-scroll-view';

import SideBar from './src/Components/SideBar.js';
import TopChartsScreen from './src/Components/TopCharts.js';

 class App extends Component {



  constructor(props) {
    super(props);

    this.state = {
      chatHistory:[],
      input: '',
      context:'',
      message:[],
      botMS:'',

        };


  }


//fetching bot's greeting message
componentWillMount() {
  var usrinp =  "hello";
  var data = {context: "",
        input : "text : ", usrinp}

  fetch('https://my-app.cession48.hasura-app.io/api/message',{
    method: 'POST',
    body: data,
    headers: {
     'Content-Type':'application/x-www-form-urlencoded'
    }
  })
  .then(results => results.json())
  .then( data => {
    console.log("first");
    console.log(data);
    let mes=data.output.text[0];
    let con=data.context;
    console.log("recieved context" )
    console.log(con);
    this.setState({chatHistory: [
        {
          type: 'bot',
          message: mes,
        }
      ], context: con});
  })
}


onMessageSend(){
var ms = this.state.input;
 var obj= { type: 'user', message: ms};
this.setState({chatHistory: this.state.chatHistory.concat(obj),message: this.state.message.concat(ms),input:''});

}

  render() {
    const {message,chatHistory}=this.state;


    const window = Dimensions.get('window')
    const imageDimensions = {
      height: window.height,
      width: window.width
    }
    return (
      <Container>
        <View>
          <Image style={[imageDimensions, {position: 'absolute',opacity: 0.2 }]} source={{uri:'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg'}}/>
        </View>
        <Content style={{flex: 1}}>

          <ScrollView style={styles.container}>

          {this.state.chatHistory.map( (chat , index) => {
                          (chat.type === 'bot') ?
            (   <View key={index} style={styles.leftBubble}>
              <Left>
                <Thumbnail small source={{ uri: 'https://thumb1.shutterstock.com/display_pic_with_logo/2826565/737510584/stock-vector-chatbot-icon-cute-robot-working-behind-laptop-modern-bot-sign-design-smiling-customer-service-737510584.jpg' }} />
              </Left>
                <View style={styles.leftBubbleText}>
                  <Text style={styles.leftBubbleTextStyle}>{chat.message}</Text>

                </View>
                <View style={styles.leftBubbleTime}>
                  <Text style={styles.leftBubbleTimeStyle}>16:33</Text>
                </View>

              </View>):
              (<View key={index} style={styles.rightBubble}>
                 <View style={styles.leftBubbleText}>
                   <Text key={index} style={styles.leftBubbleTextStyle}>{chat.message}</Text>
                 </View>
                 <View style={styles.leftBubbleTime}>
                   <Text style={styles.leftBubbleTimeStyle}>16:33</Text>
                 </View>
               </View>)})}
          </ScrollView>
      </Content>
      <Footer>
              <Item style={{flex: 1,backgroundColor:'#fff'}}>
                  <Input
                  placeholder='Type your message here'


                  onChangeText={(text) => {
                    this.setState({
                      input:text,
                    });
                  }}
                    value = {this.state.input}

                  />
                  <Button  onPress={()=> this.onMessageSend()}>
                  <Icon active name='send' />

                  </Button>
                </Item>
      </Footer>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  leftBubble: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#cef442',

      borderRadius: 4,
      minWidth: 66,
      maxWidth: 288,
      marginBottom: 8
  },
  rightBubble: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#a4c2f2',

      borderRadius: 4,
      minWidth: 66,
      maxWidth: 288,
      justifyContent: 'flex-end',
      paddingLeft:0,
  },
  leftBubbleText:{
    flex:0,
    maxWidth: 247,
    padding: 8,
    paddingLeft: 12,
    paddingRight:0,
  },
  leftBubbleTextStyle:{
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    color: '#000000',
    lineHeight: 18,
  },
  leftBubbleTime:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 3,
    paddingBottom: 2,
    marginLeft: 5,
  },
  leftBubbleTimeStyle:{
    fontFamily: 'WorkSans-Regular',
    fontSize: 10,
    color: 'rgba(0,0,0,0.54)',
    lineHeight: 16,

  },
});
//DrawerButton
const DrawerButton=({navigation})=>(
  <Button transparent
   onPress={() => navigation.navigate("DrawerOpen")}
  >
  <Icon name="menu" />
  </Button>
);
const Stack = StackNavigator({
                      Listen: {
                        screen:App,
                        navigationOptions:({navigation}) =>({
                          title:'SongBot',
                          headerLeft: <DrawerButton navigation={navigation} />,
                          headerStyle: {
                                              backgroundColor: '#fff',
                                              elevation:0,

                                        },
                        }),
                      },
              });


//DrawerNavigator portion
              const RootDrawer = DrawerNavigator(
                  {
                    Listen:{
                      screen:Stack,
                    },

                          TopCharts: {
                            screen: TopChartsScreen,

                          },





                  },
                      {
                        drawerOpenRoute: 'DrawerOpen',
                        drawerCloseRoute: 'DrawerClose',
                        drawerToggleRoute: 'DrawerToggle',
                        contentComponent: props => <SideBar {...props} />
                      }

                      );

export default RootDrawer;
