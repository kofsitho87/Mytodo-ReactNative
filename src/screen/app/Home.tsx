import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import TodoListContainer from '../../components/TodoListContainer';
import {useTodos} from '../../provider/Todo.provider';

const Home = ({navigation}: any) => {
  const {todos} = useTodos();
  const doneCount = todos.filter(t => t.completed).length;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionSummaryContainer}>
        <Text style={styles.sectionSummaryLeftTodoText}>12</Text>
        <Text style={styles.desctionText}>tasks for</Text>
        <Text style={styles.desctionText}>today</Text>
        <Text style={styles.doneText}>{doneCount} tasks done</Text>
        <Button title="Add" onPress={() => navigation.navigate('CreateTodo')} />
      </View>
      <TodoListContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  sectionSummaryContainer: {
    paddingLeft: 40,
    paddingTop: 50,
    height: 400,
  },
  sectionSummaryLeftTodoText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'red',
  },
  desctionText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  doneText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 10,
  },
});

export default Home;
