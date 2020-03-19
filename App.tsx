import React, {useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {AppState} from './src/store';
import {sendMessage, deleteMessage} from './src/store/chat/3_actions';
import {Message} from './src/store/chat/1_models';
import {bindActionCreators, Dispatch} from 'redux';
const mapStateToProps = (state: AppState) => ({
  chat: state.chat,
  // otherReducer: state.otherReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({sendMessage, deleteMessage}, dispatch);
type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
const App: React.FC<AppProps> = (props: AppProps) => {
  const initMessage: Message = {
    user: 'zafer',
    timestamp: new Date().getTime(),
    text: '',
  };
  const [message, setMessage] = useState<Message>(initMessage);
  const handleSend = () => {
    console.log('Message:' + message.text);
    if (message.text === '') {
      return;
    }
    props.sendMessage(message);
    setMessage(initMessage);
  };
  const handleChangeText = (e: string) => {
    setMessage({
      text: e,
      timestamp: new Date().getTime(),
      user: 'zafer',
    });
  };
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursText = hours < 10 ? `0${hours}` : hours;
    const minutesText = minutes < 10 ? `0${minutes}` : hours;
    return `${hoursText}:${minutesText}`;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.chat.messages}
        keyExtractor={item => item.timestamp.toString()}
        renderItem={({item}) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          returnKeyType="send"
          onChangeText={handleChangeText}
          onSubmitEditing={handleSend}
          value={message.text}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  messageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#448aff',
    borderRadius: 3,
    marginBottom: 5,
    flexDirection: 'row',
    maxWidth: 300,
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
    marginEnd: 40,
  },
  messageTime: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
    marginStart: 10,
    position: 'absolute',
    end: 10,
    bottom: 10,
  },
  inputContainer: {flexDirection: 'row', alignItems: 'center'},
  textInput: {
    flex: 1,
    borderColor: '#448aff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    marginBottom: 20,
  },
  sendButton: {paddingHorizontal: 10, marginBottom: 20},
  sendButtonText: {color: '#448aff'},
});
