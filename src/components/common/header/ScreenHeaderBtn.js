import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, ImageUrl }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image source={ImageUrl ? { uri: iconUrl } : iconUrl} resizeMode='cover' style={styles.btnImg(dimension)} />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn