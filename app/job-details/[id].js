import { Stack, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { View, RefreshControl, SafeAreaView, ScrollView, Text } from 'react-native'
import { COLORS, SIZES, icons } from '../../src/constants';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../src/components'
import { useJobDetails, useJobList } from '../../src/hooks/api-data';
import useShare from '../../src/hooks/use-share';

const tabs = ['About', 'Qualification', 'Responsibilities']

const JobDetails = () => {
  const router = useRouter();
  const { fetchJobList, apiData: { jobs } } = useJobList(state => state, shallow);
  const jobIndex = useJobDetails(state => state.jobIndex)
  const [refreshing, setRefreshing] = useState();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { onShare } = useShare()

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualification':
        return <Specifics
          title='Qualification'
          points={jobs[jobIndex]?.job_highlights?.Qualifications ?? ['N/A']}
        />
      case 'About':
        return <JobAbout info={jobs[jobIndex]?.job_description ?? 'No Data Provided'} />
      case 'Responsibilities':
        return <Specifics
          title='Responsibilities'
          points={jobs[jobIndex]?.job_highlights?.Responsibilities ?? ['N/A']}
        />
      default:
        break;
    }
  }

  const onShareClick = () => {
    if (jobs[jobIndex]) {
      onShare({ data: `Apply for ${jobs[jobIndex]?.job_title} at ${jobs[jobIndex]?.employer_name} ${jobs[jobIndex]?.job_google_link}` })
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchJobList();
    setRefreshing(false);
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />,
          headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' handlePress={onShareClick} />,
          headerTitle: ''
        }} />

      <>
        {jobs?.length && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={jobs[jobIndex]?.employer_logo}
                jobTitle={jobs[jobIndex]?.job_title}
                companyName={jobs[jobIndex]?.employer_name}
                location={jobs[jobIndex]?.job_country}
              />
              <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              {displayTabContent()}
            </View>
          </ScrollView>
        )
        }

        <JobFooter url={jobs?.length ? jobs[jobIndex]?.job_google_link : 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  )
}

export default JobDetails  