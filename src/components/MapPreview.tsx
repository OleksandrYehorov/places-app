import React from 'react';
import {
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { Location } from '../types';
import { config } from '../../config';

interface Props {
  location?: Location;
  style?: StyleProp<ViewStyle>;
  onPress: TouchableOpacityProps['onPress'];
}

export const MapPreview: React.FC<Props> = ({ location, children, style, onPress }) => {
  let imagePreviewUrl: string | undefined;
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=1280x720&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=${config.googleApiKey}`;
  }

  return (
    <TouchableOpacity style={[styles.mapPreview, style]} onPress={onPress}>
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
