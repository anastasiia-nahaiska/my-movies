import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  icon: ReactNode;
}

export const IconButton: React.FC<Props> = ({ icon, ...props }) => (
  <TouchableOpacity hitSlop={20} {...props}>
    {icon}
  </TouchableOpacity>
);
