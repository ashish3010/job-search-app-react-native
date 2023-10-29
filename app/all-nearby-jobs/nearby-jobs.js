import { SafeAreaView, ScrollView, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { Nearbyjobs, ScreenHeaderBtn } from '../../src/components'
import { COLORS, SIZES, icons } from '../../src/constants'

const AllNearbyJobs = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />,
          headerTitle: ''
        }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, paddingTop: 0 }}>
          <Nearbyjobs hideShowAll />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllNearbyJobs