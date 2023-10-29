import { View, Text, SafeAreaView, Image, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native'
import React, { useState } from 'react'
import { ScreenHeaderBtn } from '../../src/components'
import { COLORS, icons } from '../../src/constants'
import { Stack, useRouter } from 'expo-router'
import { useUserData } from '../../src/hooks/api-data'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { styles } from './style'

const Profile = () => {
  const router = useRouter();
  const [seeMore, setSeeMore] = useState({})
  const apiData = useUserData(state => state.apiData);
  const [profileImgAction, setProfileImgAction] = useState(false)
  const { profileImage, coverImage, userName, headline, currentJob, location, about, experience } = apiData?.userData || {};

  const handleSeeMore = (value) => {
    setSeeMore({ [value]: true })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, position: 'relative' }} >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => !profileImgAction ? router.back() : setProfileImgAction(!profileImgAction)} />,
          headerTitle: ''
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => setSeeMore(null)}>
          <View style={{ display: 'flex', paddingBottom: 24 }}>
            <View>
              <Image source={{ uri: coverImage }} resizeMode='cover' style={styles.coverImage} />
              <TouchableWithoutFeedback onPress={() => { setProfileImgAction(true); console.log('hello') }}>
                <Image source={{ uri: profileImage }} resizeMode='cover' style={styles.profileImage} />
              </TouchableWithoutFeedback>
              <View style={styles.editIcon}>
                <FontAwesome name="pencil" size={20} />
              </View>
            </View>
            <View style={{ marginTop: 45, marginLeft: 10, marginRight: 10 }}>
              <View>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.headline}>{headline}</Text>
                <Text style={styles.currentJob}>{currentJob}</Text>
                <Text style={styles.location}>{location}</Text>
                <View style={styles.divider} />
                <View style={{ marginBottom: 10 }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View>
                      <Text style={styles.currentJob}>About</Text>
                    </View>
                    <View style={styles.editIcon}>
                      <FontAwesome name="pencil" size={20} />
                    </View>
                  </View>
                  <Text style={styles.about}>{seeMore?.about ? about : `${about?.substring(0, 125)}...`}
                    < Text
                      onPress={() => handleSeeMore('about')}
                      style={styles.seeMore}>see more</Text>
                  </Text>
                </View>
                <View style={styles.divider} />
                {!!experience?.length && (
                  <View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View>
                        <Text style={styles.currentJob}>Experience</Text>
                      </View>
                      <View style={styles.editIcon}>
                        <FontAwesome name="plus" size={20} />x
                        <FontAwesome name="pencil" size={20} />
                      </View>
                    </View>
                    {experience?.map(({ designation, comapnayLogo, company, duration, jobType, period, location, description, skills }, index) => (
                      <View key={company}>
                        <View style={styles.experienceContainer}>
                          <View>
                            <Image source={{ uri: comapnayLogo }} resizeMode='cover' style={styles.companyLogo} />
                          </View>
                          <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text style={styles.companyName}>{designation}</Text>
                            <Text style={styles.headline}>{company} |
                              <Text style={styles.headline}>{` ${jobType}`}</Text>
                            </Text>
                            <Text style={styles.duration}>{duration} |
                              <Text style={styles.duration}>{` ${period}`}</Text>
                            </Text>
                            <Text style={styles.duration}>{location}</Text>
                            <Text style={styles.about}>{seeMore?.[index] ? description : `${description?.substring(0, 125)}...`}
                              <Text
                                onPress={() => handleSeeMore(index)}
                                style={styles.seeMore}>see more</Text>
                            </Text>
                            <Text style={styles.skills}>{`Skills: ${skills}`}</Text>
                          </View>
                        </View>
                        {index !== experience.length - 1 && <View style={styles.divider} />}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={profileImgAction}
            onRequestClose={() => {
              setProfileImgAction(!profileImgAction);
            }}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}>
              <View style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <Text>Hello World!</Text>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView >
    </SafeAreaView >
  )
}

export default Profile