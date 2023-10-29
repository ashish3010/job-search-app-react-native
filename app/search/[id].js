import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text, SafeAreaView } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { ScreenHeaderBtn, NearbyJobCard } from '../../src/components'
import { COLORS, icons, SIZES } from '../../src/constants'
import styles from '../../src/styles/search'
import { useJobList } from '../../src/hooks/api-data'

const JobSearch = () => {
  const params = useSearchParams();
  const router = useRouter()
  const { fetchJobList, apiData } = useJobList(state => state, shallow);
  const { isLoading, jobs, error } = apiData || {}
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchJobList();
  }, [])

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1)
      handleSearch()
    } else if (direction === 'right') {
      setPage(page + 1)
      handleSearch()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params?.id?.toUpperCase()}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : error && (
                <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default JobSearch