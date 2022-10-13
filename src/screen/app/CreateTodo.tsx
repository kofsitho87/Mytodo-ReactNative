import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import DismissKeyboardView, {
  hideKeyboard,
} from '../../components/common/DismissKeyboard.view';

import DatePicker from 'react-native-date-picker';
import {useTodos} from '../../provider/Todo.provider';

const CreateTodo = ({navigation}: any) => {
  const {createTodo} = useTodos();
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [step, setStep] = useState(1);

  const submitAction = ({nativeEvent: {text}}: any) => {
    if (text.trim()) {
      setTitle(text);
      hideKeyboard();
      setStep(2);
    }
  };
  const confirmEndDate = () => {
    createTodo(title, endDate);
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        <View style={styles.sectionContainer}>
          {step === 1 ? (
            <>
              <Text style={styles.questText}>Write your todo title...</Text>
              <TextInput
                style={styles.answerText}
                autoFocus
                multiline
                maxLength={20}
                returnKeyType="done"
                onSubmitEditing={submitAction}
              />
            </>
          ) : (
            <>
              <Text style={styles.questText}>Select End todo date...</Text>
              <Text style={styles.todoAnswerTitleText}>Title: {title}</Text>
              <Text style={styles.todoAnswerTitleText}>
                EndDate: {endDate.toString()}
              </Text>
              <View style={styles.pickerContainer}>
                <DatePicker
                  date={endDate}
                  mode="datetime"
                  textColor="black"
                  confirmText="confirm"
                  title="set title"
                  minimumDate={new Date()}
                  onDateChange={setEndDate}
                  onConfirm={confirmEndDate}
                />
                <Button title="confirm" onPress={confirmEndDate} />
              </View>
            </>
          )}
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    padding: 20,
  },
  questText: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  answerText: {
    fontSize: 20,
    flex: 1,
  },
  todoAnswerTitleText: {
    fontSize: 20,
  },
  pickerContainer: {
    // backgroundColor: 'red',
  },
});

export default CreateTodo;
