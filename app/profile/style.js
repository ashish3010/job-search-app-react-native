import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../src/constants";

export const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 100,
  },
  profileImage: {
    width: 120,
    height: 120,
    objectFit: 'cover',
    position: 'absolute',
    top: 40,
    left: 10,
    borderRadius: 100
  },
  editIcon: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 10
  },
  userName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  headline: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  currentJob: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginTop: 10
  },
  location: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: 2
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.secondary,
    marginTop: 10
  },
  about: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginTop: 10
  },
  seeMore: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: 10
  },
  experienceContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    marginRight: 10
  },
  companyLogo: {
    width: 40,
    height: 40,
    marginTop: 2,
  },
  companyName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginTop: 2,
  },
  duration: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: 2
  },
  skills: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginTop: 10,
    width: '100%',
    marginBottom: 10,
  },
})