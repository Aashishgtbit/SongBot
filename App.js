
import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, TouchableHighlight,Dimensions, ScrollView,FlatList,ListView, WebView,AppState} from 'react-native';
import{Content ,Icon,Container,Button,Header,Drawer,Thumbnail,Footer,Item,Input,Text,Left} from 'native-base';
import { DrawerNavigator,StackNavigator,TabNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import InvertibleScrollView from 'react-native-invertible-scroll-view';

import SideBar from './src/Components/SideBar.js';
import TopCharts from './src/Components/TopCharts.js';


 class App extends Component {



  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      chatHistory :   [],
      input       :   '',
      context     :   '',
      UserInput   :   [],
      showInput   :   '',
      toggle      :   false,
      type        :   'user',
      VideoData   :   [],
      youtubeId     :   '',
        };



  }



//fetching bot's greeting message
componentWillMount() {

      var inp = ''
      var vcontext = {}

  fetch('https://app.amenable52.hasura-app.io/api/message',{
    method: 'POST',
    body: JSON.stringify({ input : {text: inp}, context : vcontext} ),
    headers: { 'Content-Type':'application/json;charset=UTF-8' }
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
          type: 'BOT : ',
          message: mes,
        }
      ], context: con});


  })
  .catch((error) => {
      console.log(error);
      });

  }


  onMessageSend(){
    let messageTextStyle;
    let mes;

  var ms = this.state.input;
   var obj= { type: 'USER : ', message: ms};
  this.setState({ChatHistory: this.state.chatHistory.push(obj),showInput:ms,input:''});

      var Video = [];
      var inp = ms
      var vcontext = this.state.context

   fetch('https://app.amenable52.hasura-app.io/api/message',
    { method: 'POST',
   body: JSON.stringify({ input : {text: inp}, context : vcontext} ),
    headers: { 'Content-Type':'application/json; charset=UTF-8' }
   })
   .then(results => results.json())
   .then( data => {
     mes=data.output.text[0];
     let con=data.context;
     console.log(mes);
     var newObj = {
         type: 'BOT : ',
         message: mes,
   }
     this.setState({
       chatHistory: this.state.chatHistory.concat(newObj),
       context: con});
         if(mes ==="Sure. Will display results soon")
         {

           return fetch('https://app.amenable52.hasura-app.io/api/playmusic', {
             method: 'POST',
             body: JSON.stringify({
                q: ms
             }),
             headers: {
               "Content-Type": "application/json; charset=UTF-8"
             }
         })
         .then(results => results.json())
         .then(responseJson => {
           Video.push(responseJson);

           let thumbnail = responseJson[0].thumbnailurl;
           let videoId = responseJson[0].videoid;
           let URl = responseJson[0].url;

           var VideoObj = {
              type: 'BOT : ',
              Url : URl,
              ThumbnailUrl:thumbnail,
              videoID:videoId,
            }
            this.setState({
              chatHistory: this.state.chatHistory.concat(VideoObj),
              context: con});
              })
       }
   })

  }

  render() {
    const {navigate} = this.props.navigation;

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

            <View >{this.state.chatHistory.map(( chat,index) =>
                      <View  style={chat.type === 'BOT : ' ? styles.leftBubble : styles.rightBubble}>
                            <Left>
                              <Thumbnail  small source={{  uri: chat.type === 'BOT : ' ? 'https://thumb1.shutterstock.com/display_pic_with_logo/2826565/737510584/stock-vector-chatbot-icon-cute-robot-working-behind-laptop-modern-bot-sign-design-smiling-customer-service-737510584.jpg':'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }} />
                            </Left>

                            <View style={chat.type === 'BOT : ' ? styles.leftBubble : styles.rightBubble}>
                               < Text key={index} style={chat.type === 'BOT : ' ? styles.leftBubbleTextStyle : styles.rightBubbleTextStyle  }>{[chat.message]}</Text>

                               <TouchableHighlight style={{flex:4}} key={chat.videoId}onPress={()=> this.props.navigation.navigate('TopCharts',{youtubeId: chat.videoID})}>
                               <View>
                                    <Image source={{uri: chat.ThumbnailUrl}} style={{width: 320, height: 180}}></Image>
                               </View>
                               </TouchableHighlight>
                            </View>
                      </View>)}
            </View>
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
    padding: 4,

  },
  leftBubble: {
      flex:4,
      flexDirection: 'row',

      justifyContent: 'center',
      borderRadius: 4,
      minWidth: 66,
      maxWidth: 320,
      marginBottom: 8
  },
  rightBubble: {

      flexDirection: 'row',
      flex:4,
      marginBottom: 8,
      borderRadius: 4,
      marginLeft:4,
      marginRight:4,
      minWidth: 66,
      maxWidth: 320,
      justifyContent: 'center',

  },
  leftBubbleText:{
    flex:3,
    backgroundColor: '#271dd6',
    maxWidth: 247,
    borderRadius: 4,
    padding: 8,
    paddingLeft: 12,
    paddingRight:0,
  },

  leftBubbleTextStyle:{
    fontFamily: 'WorkSans-Regular',
    backgroundColor: '#6f68ed',
    borderRadius: 8,
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
  },

  rightBubbleTextStyle:{
    fontFamily: 'WorkSans-Regular',
    backgroundColor: '#067a7a',
    borderRadius: 8,
    marginLeft:4,
    marginRight:4,
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
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
                          title:'MusicBot',
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
                      screen: TopCharts,
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
