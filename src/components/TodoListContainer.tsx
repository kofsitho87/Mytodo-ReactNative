import React from 'react';
import {FlatList, View, StyleSheet, Button} from 'react-native';
import {useTodos} from '../provider/Todo.provider';
import TodoItem from './TodoItem';

export default ({navigation}: any) => {
  const {todos} = useTodos();
  // const items = [
  //   {id: 1, title: 'hide header in stack navigation', completed: false},
  //   {id: 2, title: 'auth provider', completed: false},
  //   {id: 3, title: 'login screen ui', completed: false},
  //   {id: 4, title: 'login api and go home', completed: false},
  //   {id: 5, title: 'start, stop todo and record time', completed: false},
  // ];

  if (todos.length < 1) {
    return (
      <View style={styles.addBtn}>
        <Button
          title="Add New Task"
          onPress={() => navigation.navigate('CreateTodo')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({item}) => <TodoItem todo={item} />}
      />

      {/* <ScrollView>
        {items.map(item => (<TodoItem todo={item} />))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // backgroundColor: 'red',

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    borderRadius: 26,
  },
  addBtn: {
    borderWidth: 0.5,
  },
});
