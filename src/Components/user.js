import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, TouchableHighlight,Dimensions, ScrollView,FlatList,ListView } from 'react-native';
import{Content ,Icon,Container,Button,Header,Drawer,Thumbnail,Footer,Item,Input,Left} from 'native-base';


export defautl class user extends Component{
  render{
    return(
      <container>
      <Content>
      <View  style={styles.leftBubble}>
            <Left>
              <Thumbnail small source={{ uri: 'https://thumb1.shutterstock.com/display_pic_with_logo/2826565/737510584/stock-vector-chatbot-icon-cute-robot-working-behind-laptop-modern-bot-sign-design-smiling-customer-service-737510584.jpg' }} />
            </Left>
              <View style={styles.leftBubbleText}>
                <Text style={styles.leftBubbleTextStyle}>hello</Text>
              </View>

            <View style={styles.leftBubbleTime}>
              <Text style={styles.leftBubbleTimeStyle}>16:33</Text>
            </View>

      </View>
      </Content>
      </Container>
    );
  }
}
