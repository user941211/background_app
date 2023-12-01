// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { startScan, connectToDevice, sendData } from './BluetoothManager';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const handleDeviceFound = (device) => {
      setDevices((prevDevices) => [...prevDevices, device]);
    };

    startScan(handleDeviceFound);

    // Cleanup: Stop scanning when the component unmounts
    return () => bleManager.stopDeviceScan();
  }, []);

  const handleConnect = (deviceId) => {
    connectToDevice(deviceId, (device) => {
      setSelectedDevice(device);
    });
  };

  const handleSendData = () => {
    // Example data to send
    const data = 'Hello, BLE!';

    sendData(data);
  };

  return (
    <View>
      <Text>Bluetooth App</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button title={`Connect to ${item.name}`} onPress={() => handleConnect(item.id)} />
        )}
      />
      {selectedDevice && (
        <View>
          <Text>Connected to: {selectedDevice.name}</Text>
          <Button title="Send Data" onPress={handleSendData} />
        </View>
      )}
    </View>
  );
};

export default App;
