import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, Alert } from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';
import { askAsync, PermissionStatus, CAMERA, CAMERA_ROLL } from 'expo-permissions';

import { COLORS } from '../utils/constants';

interface Props {
  onTakeImage: (uri: string) => void;
}

export const ImageSelect: React.FC<Props> = ({ onTakeImage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>();

  const verifyPermissions = async () => {
    const { status } = await askAsync(CAMERA, CAMERA_ROLL);

    if (status !== PermissionStatus.GRANTED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }],
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (image.cancelled === true) {
      return;
    }

    setSelectedImage(image.uri);
    onTakeImage(image.uri);
  };

  return (
    <View style={styles.imageSelect}>
      <View style={styles.imagePreview}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text>No image selected yet.</Text>
        )}
      </View>
      <Button title="Take Image" color={COLORS.primary} onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageSelect: {
    alignItems: 'center',
    marginBottom: 8,
  },
  imagePreview: {
    width: '100%',
    height: 220,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
