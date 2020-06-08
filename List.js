import React, { PureComponent } from "react";
import { FlatList,TouchableOpacity, StyleSheet, Image,Text, View } from "react-native";

export default class List extends PureComponent {

  state = {
    data: []
  };

  constructor(props){
    super(props)
    this.page = 1
  }

  async componentDidMount() {
    this.interval = setInterval(() => {
      if(this.page<5){
        this.fetchData();
        this.page =  this.page +1
      }
     }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  fetchData = async () => {
    const response = await fetch(`https://randomuser.me/api/?page=${this.page}&results=10`);
    const json = await response.json();
    this.setState({ data: json.results});
    // this.setState({ data: [...this.state.data, ...json.results] });
  };

  onPress = (index) => {

  }

  renderItem = ({item, index }) => {
    console.log('item',item,'index',index)
    const{ gender,name,email,picture} = item
    return(
      <TouchableOpacity onPress = {() => this.onPress(index)}>
      <View style = {styles.card}>
        <View style = {{flexDirection:'row'}}>
        <Image style = {{width:100,height:100}}  source={{uri: picture.medium}}/>
          <View >
            <Text>Name - {`${name.first} ${name.last}`}</Text>
            <Text>Email - {email}</Text>
            <Text>Gender - {gender}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  loadMore = () => {
    this.page =  this.page +1
    this.fetchData();
   }

  render() {
      console.log('render data ',this.state.data.length)
    return (
      <View style={styles.container}>
          <Text>Page No - {this.page} Total Items ={this.state.data.length}</Text>
          <TouchableOpacity style = {{width:'100%',height:50,backgroundColor:'cyan',justifyContent:'center',alignItems:'center'}}  onPress = {this.loadMore}><Text >Load More</Text></TouchableOpacity>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i+""}
          renderItem={this.renderItem}
           
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 8,
    position: 'relative',
    elevation: 1,
    shadowOpacity: 0.4,
    shadowOffset: { height: 0.3, width: 0 },
    shadowRadius: 1,
    shadowColor: 'black',
    padding:16,
  },
});