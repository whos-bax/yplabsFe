import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MemoProps} from '../pages/TodoListScreen.tsx';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../RootNavigation.tsx';
// import {useAppDispatch} from '../redux/store.ts';
import todoDetailSlice from '../redux/slice/todoDetailSlice.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer.ts';
import commonSlice from '../redux/slice/commonSlice.ts';
import {useAppDispatch} from '../redux/store.ts';

export type ItemProps = {
  id: number | null;
  content: string;
  create_at: string;
  update_at: string;
};

const TodoList = ({memoList, getMemoList}: MemoProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.common.loading);
  console.log('isLoadingisLoading', isLoading);

  const onRefresh = () => {
    getMemoList();
  };

  const handleTest = () => {
    dispatch(commonSlice.actions.setTodoDetail(false));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo-List</Text>
      <FlatList
        contentContainerStyle={styles.listView}
        data={memoList}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => <Item {...item} />}
        onRefresh={onRefresh}
        refreshing={isLoading || false}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 50,
          height: 50,
          backgroundColor: 'black',
        }}
        onPress={handleTest}></TouchableOpacity>
    </SafeAreaView>
  );
};

const Item = (item: ItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const handleNavigate = () => {
    dispatch(todoDetailSlice.actions.setTodoDetail(item));
    navigation.navigate('Detail');
  };
  return (
    <TouchableOpacity style={styles.item} onPress={handleNavigate}>
      <Text style={styles.content} numberOfLines={5} ellipsizeMode="tail">
        {item.content.replaceAll('\n', '')}
      </Text>
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
