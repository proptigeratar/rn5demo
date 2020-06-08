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
    this.props.navigation.navigate('detail')
  }

  renderItem = ({item, index }) => {
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

    // make mqt_js super busy
  actBusy = () => {
    setTimeout(() => { this.actBusyFor(8000); }, 500);
  }
  
  actBusyFor = (milliseconds) => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  spamBridge = () => {
    for (var i = 0; i < 1000; i++) {
      this.initTimer();
    }
  }
  
  // setTimeout sends a message over MessageQueue.js to trigger the Native "Timing.createTimer()"
  initTimer = () => {
    const that = this;
    setTimeout(function() {
      that.initTimer();
    }, 1);
  }

  render() {

    return (
      <View style={styles.container}>
          <Text>Page No - {this.page} Total Items ={this.state.data.length}</Text>
          <TouchableOpacity style = {{width:'100%',height:50,backgroundColor:'cyan',justifyContent:'center',alignItems:'center'}}  onPress = {this.loadMore}><Text >Load More</Text></TouchableOpacity>
          <TouchableOpacity style = {{width:'100%',height:50,marginTop:10,backgroundColor:'cyan',justifyContent:'center',alignItems:'center'}}  onPress = {this.actBusy}><Text >Make JS Thread busy</Text></TouchableOpacity>
          <TouchableOpacity style = {{width:'100%',height:50,marginTop:10,backgroundColor:'cyan',justifyContent:'center',alignItems:'center'}}  onPress = {this.spamBridge}><Text >Make RN Bridge busy</Text></TouchableOpacity>
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