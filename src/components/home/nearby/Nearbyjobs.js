import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS } from '../../../constants';
import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useRouter } from 'expo-router';
import { useJobDetails, useJobList } from '../../../hooks/api-data';

const Nearbyjobs = ({ hideShowAll }) => {
  const router = useRouter();
  const { isLoading, jobs, error } = useJobList(state => state.apiData);
  const setJobIndex = useJobDetails(state => state.setJobIndex)


  const handlePress = (index, job) => {
    setJobIndex(index);
    router.push(`/job-details/${job.job_id}`)
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        {!hideShowAll && (
          <TouchableOpacity onPress={() => router.push('/all-nearby-jobs/nearby-jobs')}>
            <Text style={styles.headerBtn}>Show all</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.cardsContainer}>
        {getData()}
      </View>
    </View>
  )
}

export default Nearbyjobs
