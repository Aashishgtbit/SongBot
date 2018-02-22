
import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, TouchableHighlight,Dimensions, ScrollView,FlatList,ListView, WebView} from 'react-native';
import{Content ,Icon,Container,Button,Header,Drawer,Thumbnail,Footer,Item,Input,Text,Left} from 'native-base';
import { DrawerNavigator,StackNavigator,TabNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import InvertibleScrollView from 'react-native-invertible-scroll-view';

import SideBar from './src/Components/SideBar.js';
import TopChartsScreen from './src/Components/TopCharts.js';
import user from './src/Components/user.js';

 class App extends Component {



  constructor(props) {
    super(props);

    this.state = {

      chatHistory :   [],
      input       :   '',
      context     :   '',
      UserInput   :   [],
      showInput   :   '',
      toggle      :   false,
      type        :   'user',
      VideoData   :   [],
        };



  }



//fetching bot's greeting message
componentDidMount() {

      var inp = 'hello'
      var vcontext = {}

  fetch('https://my-app.cession48.hasura-app.io/api/message',{
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

   fetch('https://my-app.cession48.hasura-app.io/api/message',
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
     console.log(mes);



     return fetch('https://my-app.cession48.hasura-app.io/api/playmusic', {
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
     console.log("Video");
     console.log(responseJson);


     Video.push(responseJson);

     let thumbnail = responseJson[0].thumbnailurl;
     let videoId = responseJson[0].videoid;

     console.log(videoId);

     this.setState({VideoData: [
         {
           ThumbnailUrl:thumbnail,
          VideoID:videoId,
        },
       ]});


     console.log(this.state);
   })
 }
   })

  }


//bot message render function.



  render() {


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


        <View>{this.state.chatHistory.map(( chat,index) =>
          <View  style={chat.type === 'BOT : ' ? styles.leftBubble : styles.rightBubble}>
                <Left>
                  <Thumbnail small source={{  uri: chat.type === 'BOT : ' ?'https://thumb1.shutterstock.com/display_pic_with_logo/2826565/737510584/stock-vector-chatbot-icon-cute-robot-working-behind-laptop-modern-bot-sign-design-smiling-customer-service-737510584.jpg':'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }} />
                </Left>

                <View style={chat.type === 'BOT : ' ? styles.leftBubble : styles.rightBubble}>
                   < Text key={index}style={styles.leftBubbleTextStyle}>{[chat.message]}</Text>
                </View>


          </View>)}
          <View>{this.state.VideoData.map(( Video,i) =>
            <TouchableHighlight key>
            <View>
            <Image source={{uri: Video.ThumbnailUrl}} style={{width: 320, height: 180}}></Image>

            </View>
            </TouchableHighlight>
          )}
          </View>

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
    padding: 16,

  },
  leftBubble: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#cef442',
      justifyContent: 'center',
      borderRadius: 4,
      minWidth: 66,
      maxWidth: 288,
      marginBottom: 8
  },
  rightBubble: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#e2a3d7',
      marginBottom: 8,
      borderRadius: 4,
      minWidth: 66,
      maxWidth: 288,
      justifyContent: 'center',
      paddingRight:0,
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

  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
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
  WebViewContainer: {
      flex:1,
      marginTop: (Platform.OS == 'ios') ? 20 : 0,

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
