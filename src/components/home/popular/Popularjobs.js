import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { COLORS, SIZES } from '../../../constants';
import styles from './popularjobs.style'
import { useRouter } from 'expo-router';
import { useJobDetails, useJobList } from '../../../hooks/api-data';

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const { isLoading, jobs, error } = useJobList(state => state.apiData)
  const setJobIndex = useJobDetails(state => state.setJobIndex)

  const handlePress = (index, item) => {
    setJobIndex(index);
    setSelectedJob(item.job_id)
    router.push(`/job-details/${item.job_id}`)
  }


  const getData = () => {
    if (isLoading) {
      return <ActivityIndicator size='large' color={COLORS.primary} />
    }
    if (error) {
      return <Text>Something went wrong</Text>
    }
    if (jobs?.length) {
      return (
        <FlatList
          data={jobs}
          renderItem={({ item, index }) => (
            <PopularJobCard
              item={item}
              selectedJob={selectedJob}
              handlePress={() => handlePress(index, item)} />
          )
          }
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={() => router.push('/all-popular-jobs/popular-jobs')}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {getData()}
      </View>
    </View>
  )
}

export default Popularjobs
