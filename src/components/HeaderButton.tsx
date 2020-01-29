import React from 'react';
import { HeaderButton as RNHeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { COLORS } from '../utils/constants';

interface Props extends HeaderButtonProps {
  title: string;
}

export const HeaderButton: React.FC<Props> = props => {
  return (
    <RNHeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : COLORS.primary}
    />
  );
};
