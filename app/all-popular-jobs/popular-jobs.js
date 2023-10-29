import React from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { NearbyJobCard, ScreenHeaderBtn } from '../../src/components'
import { Stack, useRouter } from 'expo-router'
import { COLORS, SIZES, icons } from '../../src/constants'
import { useJobDetails, useJobList } from '../../src/hooks/api-data'
import styles from '../../src/components/home/nearby/nearbyjobs.style'

const AllPopularJobs = () => {
  const router = useRouter();
  const { isLoading, jobs, error } = useJobList(state => state.apiData);
  const setJobIndex = useJobDetails(state => state.setJobIndex)

  const handlePress = (index, item) => {
    setJobIndex(index);
    router.push(`/job-details/${item.job_id}`)
  }

  const getData = () => {
    if (isLoading) {
      return <ActivityIndicator size='large' color={COLORs.primary} />
    }
    if (error) {
      return <Text>Something went wrong</Text>
    }
    if (jobs?.length) {
      return (
        jobs?.map((job, index) => (
          <NearbyJobCard
            job={job}
            key={`nearby-job-${job?.job_id}`}
            handleNavigate={() => handlePress(index, job)}
          />
        ))
      )
    }
  }
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
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Popular jobs</Text>
            </View>

            <View style={styles.cardsContainer}>
              {getData()}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllPopularJobs