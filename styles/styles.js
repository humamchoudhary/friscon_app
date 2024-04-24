import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
export const BG_COLOR = "#FFFFFF";
export const CTA_COLOR = "#00AEFF";
export const SEC_COLOR = "#00000029";
export const DARK_COLOR = "#000000";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: BG_COLOR,
    padding: 8,
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CTA_COLOR,
    width: Dimensions.get("window").width - 60,
    height: 120,
    borderRadius: 9,
    marginRight: 20,
    overflow: "hidden",
  },
  appBar: {
    marginTop: 13,
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    alignSelf: "stretch",
    backgroundColor: "#FFF",
    zIndex: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    height: 50,
    paddingVertical: 14,
    borderRadius: 9,
    marginVertical: 9,
    width: 351,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Catbutton: {
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: 70,
    width: 70,
  },
  buttonFilledText: {
    color: BG_COLOR,
    fontFamily: "Medium",
    fontSize: 16,
    textAlign: "center",
  },
  buttonHollowText: {
    color: CTA_COLOR,
    fontFamily: "Medium",
    fontSize: 16,
    textAlign: "center",
  },
  buttonFilled: {
    backgroundColor: CTA_COLOR,
  },
  buttonHollow: {
    backgroundColor: BG_COLOR,
    borderColor: CTA_COLOR,
    borderWidth: 1,
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    width: "100%",
    fontSize: 16,
    color: DARK_COLOR,
    fontFamily: "Regular",
  },
  CompleteInput: {
    borderBottomWidth: 1,
    borderColor: CTA_COLOR,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  Icon: {
    paddingHorizontal: 10,
  },
  underLinedPrimText: {
    textDecorationLine: "underline",
    textDecorationColor: CTA_COLOR,
    color: CTA_COLOR,
    textDecorationStyle: "solid",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
