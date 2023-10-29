import { Share } from 'react-native';

const useShare = () => {
  const onShare = async ({ data = '' }) => {
    try {
      const result = await Share.share({
        message: data
      });
      console.log(result, 'result')
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.log(error)
    }
  };
  return ({ onShare })
};

export default useShare;