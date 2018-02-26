import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem,Thumbnail,Icon, Card,CardItem,Body,Footer,FooterTab,Button,Left,Right} from "native-base";


const datas = [

  {
    name:"MusicBot",
    route:"Listen",
    icon:"musical-note"
  },
];


export default class SideBar extends React.Component {

  render() {
    return (
      <Container>
        <Content>
        <Card>
          <CardItem>
          <List
            dataArray={datas}
            renderRow={data =>

                  <ListItem
                      button
                      onPress={() => this.props.navigation.navigate(data.route)}>

                    <Left>
                      <Icon
                        active
                        name={data.icon}
                        style={{ color: "#000", fontSize: 26, width: 30 }}
                      />
                      <Text >
                        {data.name}
                      </Text>

                    </Left>
                    </ListItem>
                  }
            />
            </CardItem>

            </Card>


          </Content>
        </Container>
      );
    }
  }
