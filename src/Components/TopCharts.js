import React, { Component } from 'react';
import { Container, Header, Content, List,Title, ListItem, Text,Icon,Left,Button ,Body} from 'native-base';

import { StyleSheet, View, WebView, Platform } from 'react-native';

export default class TopChartsScreen extends Component {
  render() {
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
                   domStorageEnabled={true}
                   source={{uri: 'https://www.youtube.com/watch?v=pJaBe6k9eMw' }}
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
