import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const hamburgerList = ['Home', 'Profile', 'Nearby Jobs', 'Popular Jobs', 'Saved Jobs']

const SliderDrawer = ({ setOpenList }) => {
  return (
    <ScrollView style={{ zIndex: 10, position: 'absolute', top: 0, left: 0, width: 200, height: 600, backgroundColor: 'red' }}>
      <View>
        {hamburgerList?.map((item) => (
          <View key={item}>
            <Text>{item}</Text>
          </View>
        ))}
        <TouchableOpacity onPress={() => setOpenList(false)}>
          <FontAwesome name="plus" size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SliderDrawer