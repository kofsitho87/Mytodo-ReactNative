import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

import {ITodo} from '../provider/Todo.provider';

const TodoItem = ({todo}: {todo: ITodo}) => {
  const endedAtString = moment(todo.ended_at).format('MM-DD');
  return (
    <View key={todo.id} style={styles.container}>
      <Text style={(styles.text, {flex: 1})}>{todo.title}</Text>
      <Text style={styles.text}>{endedAtString}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
  },
});

export default TodoItem;
