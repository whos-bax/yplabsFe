import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TodoListPropsType} from '../pages/TodoListScreen.tsx';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../RootNavigation.tsx';
import todoDetailSlice from '../redux/store/slice/todoDetailSlice.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/rootReducer.ts';
import {useAppDispatch} from '../redux/store';
import TodoStatusComponent, {TodoStatusType} from './TodoStatusComponent.tsx';

const TodoList = ({
  memoList,
  refreshing,
  onRefresh,
  onEndReached,
  handleListToggle,
  todoStatusProps,
}: TodoListPropsType): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo-List</Text>
      <FlatList
        contentContainerStyle={styles.listView}
        data={memoList}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <Item
            item={item}
            todoStatusProps={todoStatusProps}
            handleListToggle={handleListToggle}
          />
        )}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

const Item = ({
  item,
  todoStatusProps,
  handleListToggle,
}: TodoStatusType): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.common.loading);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const handleNavigate = () => {
    dispatch(todoDetailSlice.actions.setTodoDetail(item));
    navigation.navigate('Detail');
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handleNavigate}>
      <Switch
        trackColor={{false: 'gray', true: '#3d67fc'}}
        thumbColor={'white'}
        onValueChange={(value: boolean) => {
          if (handleListToggle) {
            handleListToggle(value, item);
          }
        }}
        value={item.is_finished || false}
        disabled={isLoading}
      />
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
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#f1f3f5',
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 40,
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
