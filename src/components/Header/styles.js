import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  header: {
    height: 35,
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
});
