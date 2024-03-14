import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TodoListPropsType} from '../pages/TodoListScreen.tsx';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../RootNavigation.tsx';
import todoDetailSlice, {ItemType} from '../redux/slice/todoDetailSlice.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer.ts';
import {useAppDispatch} from '../redux/store.ts';
import TodoStatusComponent, {TodoStatusType} from './TodoStatusComponent.tsx';

const TodoList = ({
  memoList,
  refreshing,
  onRefresh,
  onEndReached,
  todoStatusProps,
}: TodoListPropsType): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.common.loading);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo-List</Text>
      <FlatList
        contentContainerStyle={styles.listView}
        data={memoList}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <Item item={item} todoStatusProps={todoStatusProps} />
        )}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

const Item = ({item, todoStatusProps}: TodoStatusType): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const handleNavigate = () => {
    dispatch(todoDetailSlice.actions.setTodoDetail(item));
    navigation.navigate('Detail');
  };
  return (
    <TouchableOpacity style={styles.item} onPress={handleNavigate}>
      <Text style={styles.content} numberOfLines={5} ellipsizeMode="tail">
        {item.content}
      </Text>
      <TodoStatusComponent item={item} todoStatusProps={todoStatusProps} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 16,
  },
  listView: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#f1f3f5',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  content: {
    fontSize: 16,
    flex: 1,
  },
});
export default TodoList;
