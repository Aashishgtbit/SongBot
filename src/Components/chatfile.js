import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';
import {Container,Content,Button,Icon,Header,Footer,Drawer,Thumbnail,Right, Body,Title,Left , Item,Input} from 'native-base';
export default class Movies extends Component {
  constructor(props) {
      super(props);
      this.state = {text: ''};
    }



  render() {


    return (
      <Container>
      <Header>
          <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      <Content  style={{flex: 9, paddingTop: 20,flexDirection: 'column'}}>
      <Item rounded>
                  <Input placeholder='Rounded Textbox'/>
                </Item>




          </Content>
          <Footer>
                  <Item style={{flex: 1, paddingTop: 20,backgroundColor:'#fff'}}>
                      <Input
                      placeholder='Type your message here'
                      onChangeText={(text) => this.setState({text})}/>
                      <Icon active name='send' />
                    </Item>
          </Footer>
      </Container>
    );
  }
}
