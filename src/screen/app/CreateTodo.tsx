import React, {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DismissKeyboardView, {
  hideKeyboard,
} from '../../components/common/DismissKeyboard.view';

import {useTodos} from '../../provider/Todo.provider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import {ButtonGroup, Icon} from '@rneui/themed';

type RootStackParamList = {
  CreateTodo: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'CreateTodo'>;

const CreateTodo = ({navigation}: Props) => {
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
  const addEndDate = (idx: number) => {
    // idx == 0 => 1min
    // idx == 1 => 10min
    // idx == 2 => 30min
    // idx == 3 => 1h

    let min = 0;
    switch (idx) {
      case 0:
        min = 1;
        break;
      case 1:
        min = 10;
        break;
      case 2:
        min = 30;
        break;
      case 3:
        min = 60;
        break;
    }
    setEndDate(new Date(endDate.getTime() + 1000 * 60 * min));
  };
  const confirmCreateTodo = useCallback(() => {
    createTodo(title, endDate);
    navigation.pop();
  }, [createTodo, title, endDate, navigation]);
  useEffect(() => {
    navigation.setOptions({
      title:
        step === 1 ? 'Write your todo title...' : 'Select End todo date...',
      headerRight: () =>
        step === 2 ? (
          <TouchableOpacity onPress={confirmCreateTodo}>
            <Icon name="add-task" type="material" style={{marginRight: 10}} />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, step, confirmCreateTodo]);
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        {step === 1 ? (
          <>
            <View style={styles.sectionContainer}>
              <TextInput
                style={styles.answerText}
                autoFocus
                multiline
                maxLength={20}
                returnKeyType="done"
                onSubmitEditing={submitAction}
              />
            </View>
          </>
        ) : (
          <>
            <View style={{paddingHorizontal: 12, paddingTop: 20}}>
              <Text style={styles.todoAnswerTitleText}>Title: {title}</Text>
              <Text style={styles.todoAnswerTitleText}>
                EndDate: Today {moment(endDate).format('HH:mm')}
              </Text>
            </View>
            <ButtonGroup
              containerStyle={{margin: 0}}
              onPress={addEndDate}
              buttons={['+1min', '+10min', '+30min', '+1h']}
              selectedButtonStyle={{backgroundColor: 'red'}}
            />
          </>
        )}
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
    padding: 12,
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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  controlButton: {
    backgroundColor: 'red',
  },
});

export default CreateTodo;
