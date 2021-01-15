import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from "axios";

const ItemDetailsScreen = (props) => {
  const itemId = props.navigation.getParam('itemId');
  const URI = 'http://localhost:8000';
  const [item,setItem] = useState({});

  const fetchItem = async () => {
    try {
      const response = await axios.get(URI + '/api/items/' + itemId);
      console.log(response.data);
      setItem(response.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <View style={styles.screen}>
      <Text>{item.title}!</Text>
      <Text>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ItemDetailsScreen;
