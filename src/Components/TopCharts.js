import React, { Component } from 'react';
import { Container, Header, Content, List,Title, ListItem, Text,Icon,Left,Button ,Body} from 'native-base';

import { StyleSheet, View, WebView, Platform } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class TopCharts extends Component {


  constructor(props){
    super(props);

  }

  render() {
    const {state} = this.props.navigation;

    return (
      <Container>
      <Header  >

        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>List</Title>
        </Body>
        </Header>
        <View style={{ height: 300 }}>

           <WebView
                   style={ styles.WebViewContainer }
                   javaScriptEnabled={true}

                    automaticallyAdjustContentInsets={false}
                   source={{uri: 'https://www.youtube.com/embed/'+`${state.params.youtubeId}` }}
           />

       </View>
      </Container>
    );
  }
}



const styles = StyleSheet.create({

WebViewContainer: {
    flex:1,
    marginTop: (Platform.OS == 'ios') ? 20 : 0,

  }

});
