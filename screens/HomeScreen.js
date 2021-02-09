import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Alert } from 'react-native';
import dictionary from '../database';

export default class HomeScreen extends React.Component {
constructor(){
  super();
  this.state={
    text:'',
    isSearchedPressed:false,
    word:'',
  }
}

getWord=(text)=>{
/*var searchKeyword=word.toLowerCase();
var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
return fetch(url)
.then((data)=>{
  if(data.status===200){
    return data.json()
  }else{
    return null;
  }
})
.then((response)=>{
  var responseObject=response;
*/
var text = text.toLowerCase()
try{
  var wordData=dictionary[text]["word"]
    var definition=dictionary[text]["definition"]
    var lexicalCategory=dictionary[text]["lexicalCategory"]
    this.setState({
      "word":wordData,
      "definition":definition,
      "lexicalCategory":lexicalCategory,
    })
    /*this.state({
      "word":this.state.text,
      "definition":"Not Found"
    })*/
}
catch(err){
  alert("Sorry, this word isn't available.")
  this.setState({
    'text':'',
    'isSearchedPressed':false
  })
}
    
}

  render(){
    return(
      <View>
      <TextInput
      style={styles.text}
      onChangeText={text=>{
        this.setState({
          text:text,
          isSearchedPressed:false,
          word:"Loading...",
          lexicalCategory:"Loading...",
          examples:[],
          definition:"Loading...",
        })
      }}
      value={this.state.text}
      />

      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        this.setState({isSearchedPressed:true});
        this.getWord(this.state.text);
      }}
      >
      <Text style={{alignSelf:'center'}}>Search</Text>
      </TouchableOpacity>

      <View>
      <Text style={{marginTop:15}}>Word :{""}</Text>
      <Text>{this.state.word}</Text>
      </View>

      <View>
      <Text style={{marginTop:15}}>Type :{""}</Text>
      <Text>{this.state.lexicalCategory}</Text>
      </View>

      <View>
      <Text style={{marginTop:15}}>Definition :{""}</Text>
      <Text>{this.state.definition}</Text>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    marginLeft:130,
    borderWidth:.5,
    width:100,
    height:25,
    marginTop:100,
    borderRadius:20
  },
  text:{
    borderWidth:1.5,
    marginTop:10,
  }
});