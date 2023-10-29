import { Stack, useRouter } from 'expo-router';
import { View, SafeAreaView, ScrollView, ActivityIndicator, Text, Vibration } from 'react-native';
import { shallow } from 'zustand/shallow'
import { ScreenHeaderBtn, Nearbyjobs, Popularjobs, Welcome } from '../src/components'
import { COLORS, icons, SIZES } from '../src/constants';
import { useEffect, useState } from 'react';
import { useJobList, useUserData } from '../src/hooks/api-data';
import SliderDrawer from '../src/components/common/slider-drawer';


const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [openList, setOpenList] = useState(false)
  const fetchJobList = useJobList(state => state.fetchJobList)
  const { fetchUserData, apiData: userInfo } = useUserData(state => state, shallow);
  const { isLoading, userData, error } = userInfo || {};

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (userData) {
      Vibration.vibrate(500, true)
      fetchJobList();
    }
  }, [userData])

  const getHomePageData = () => {
    if (isLoading) {
      return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </View>
      )
    }
    if (error) {
      return <Text>Something went wrong</Text>
    }
    return (
      <>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => !openList && <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' handlePress={() => setOpenList(true)} />,
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={userData?.profileImage}
                dimension='100%'
                ImageUrl
                handlePress={() => router.push('/profile/profile')}
              />
            ),
            // headerShown: !openList,
            headerTitle: ''
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {openList && <SliderDrawer setOpenList={setOpenList} />}
          <View style={{ flex: 1, padding: SIZES.medium, marginTop: 24 }}>
            <Welcome
              userData={userData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  router.push(`/search/${searchTerm}`)
                }
              }}
            />
            <Popularjobs />
            <Nearbyjobs />
          </View>
        </ScrollView>
      </>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {getHomePageData()}
    </SafeAreaView>
  )
}

export default Home 