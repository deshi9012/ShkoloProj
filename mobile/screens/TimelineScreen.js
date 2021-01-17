import React, {useState,useRef, useEffect} from 'react';
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Text
} from 'react-native';
import axios from 'axios';
import Item from "../components/Item";

const TimelineScreen = props => {
  const URI = 'http://localhost:8000';

  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    try {
      const response = await axios.get(URI + '/api/items');
      setItems(response.data);
    } catch (err){
      console.log(err);
    }
  }

  const navigateItemHandler = (itemId) => {
    props.navigation.navigate({
      routeName: 'ItemDetails', params: {
        itemId: itemId
      }
    })
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.screen}>
      <Text>The Timeline Screen!</Text>
      <FlatList
        keyExtractor={(item,index) => index.toString()}
        data={items}
        renderItem={itemData => (
          <Item
            id={itemData.item.id}
            title={itemData.item.title}
            onPress={navigateItemHandler}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
});


export default TimelineScreen;
