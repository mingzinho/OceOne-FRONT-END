import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Modal, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnZnkj-3Bj3uUdi__jNba2weldz7NlHPg",
  authDomain: "global-mobile-e6ad8.firebaseapp.com",
  projectId: "global-mobile-e6ad8",
  storageBucket: "global-mobile-e6ad8.appspot.com",
  messagingSenderId: "607438018466",
  appId: "1:607438018466:web:02731aec64c78f733604fb"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const TelaMapa = (props) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerInfo, setMarkerInfo] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [originalMarkerPositions, setOriginalMarkerPositions] = useState([]); 
  const mapRef = useRef(null);

  useEffect(() => {
    loadMarkersFromFirestore();
  }, []);

  const loadMarkersFromFirestore = async () => {
    const markerCollection = collection(db, 'markers');
    const snapshot = await getDocs(markerCollection);
    const markerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMarkers(markerData);
    setOriginalMarkerPositions(markerData.map(marker => marker.coordinate));
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate);
    setModalVisible(true);
  };

  const handleAddMarker = async () => {
    const markerCollection = collection(db, 'markers');
    await addDoc(markerCollection, {
      coordinate: markerPosition,
      info: markerInfo
    });
    loadMarkersFromFirestore();
    setModalVisible(false);
  };

  const moveMarker = (index) => {
    if (markers.length === 0) {
      alert('Nenhuma denuncia foi feita.');
      return;
    }  
    const newMarkers = [...markers];
    if (newMarkers[index]) {
      const { coordinate } = newMarkers[index];
      const newCoordinate = {
        latitude: coordinate.latitude + 1.5, 
        longitude: coordinate.longitude + 1.5, 
      };
      newMarkers[index].coordinate = newCoordinate;
      setMarkers(newMarkers); 
    }
    
  };

  const resetMarker = () => {
    if (markers.length === 0) {
      alert('Nenhuma denuncia foi feita.');
      return;
    }  
    const newMarkers = markers.map((marker, index) => {
      return { ...marker, coordinate: originalMarkerPositions[index] };
    });
    setMarkers(newMarkers);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...originalMarkerPositions[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate} title={marker.info} />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => moveMarker(0)}>
          <Text style={styles.buttonText}>Previsão 7 dias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetMarker}>
          <Text style={styles.buttonText}>Voltar previsão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('TelaMarcadores')}>
          <Text style={styles.buttonText}>Ver minhas Denuncias</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Escreva qual lixo você esta vendo</Text>
            <TextInput
              placeholder="Garrafa..."
              value={markerInfo}
              onChangeText={(text) => setMarkerInfo(text)}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleAddMarker}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'lightgrey',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: 250,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default TelaMapa;