import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, collection, addDoc, getDocs, deleteDoc, doc } from '../services/firebaseConfig';
import LojaItem from '../../components/LojaItem';

export default function TelaMarcadores() {
  const [title, setTitle] = useState('');
  const [markersList, setMarkersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItem = async () => {
    let d = [];
    const querySnapshot = await getDocs(collection(db, "markers"));
    querySnapshot.forEach((doc) => {
      const markers = {
        id: doc.id,
        title: doc.data().title,
        isChecked: doc.data().isChecked
      };

      d.push(markers);
    });
    setMarkersList(d);
    setIsLoading(false);
  };

  const deleteItemList = async () => {
    const querySnapshot = await getDocs(collection(db, "markers"));
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "markers", item.id)));
    getItem();
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.heading}>Lista de Denuncias</Text>
        <Text style={styles.numItem}>{markersList.length}</Text>
        <MaterialIcons name="delete" size={24} color="black" onPress={deleteItemList} />
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={markersList}
          renderItem={({ item }) => (
            <LojaItem title={item.info} isChecked={item.isChecked} id={item.id} getItem={getItem} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e29494',
  },
  header: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    flex: 1,
    fontSize: 20,
    color: 'black',
  },
  numItem: {
    fontSize: 20,
    marginRight: 20,
  },
  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});