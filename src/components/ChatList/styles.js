import { StyleSheet } from 'react-native';
import { colors, fonts, paddings } from '../../styles';

export default StyleSheet.create({
  chatList: {
    flex: 1,
    marginTop: paddings.SM,
  },
  chats: {
    flex: 1,
    backgroundColor: colors.WHITE,
    minHeight: 300,
  },
});
