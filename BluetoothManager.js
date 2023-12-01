// BluetoothManager.js
import { BleManager } from 'react-native-ble-manager';

const bleManager = new BleManager();
let connectedDevice = null;

export const startScan = (onDeviceFound) => {
  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error('Error scanning devices:', error);
      return;
    }

    onDeviceFound(device);
  });
};

export const connectToDevice = (deviceId, onConnected) => {
  bleManager.connectToDevice(deviceId, { autoConnect: true })
    .then((device) => {
      console.log('Connected to device:', device);
      connectedDevice = device;
      onConnected(device);
    })
    .catch((error) => {
      console.error('Error connecting to device:', error);
    });
};

export const sendData = (data) => {
  if (connectedDevice) {
    connectedDevice.writeCharacteristicWithoutResponseForService(
      'serviceUUID',
      'characteristicUUID',
      data
    )
      .then(() => {
        console.log('Data sent successfully');
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  } else {
    console.error('No connected device');
  }
};
