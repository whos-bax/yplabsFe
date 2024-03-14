import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MemoProps} from '../pages/TodoListScreen.tsx';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../App.tsx';
// import {useNavigationContainerRef} from '@react-navigation/native';
// import {navigate} from '../../App.tsx';

type ItemProps = {
  content: string;
  create_at: string;
};

const TodoList = ({memoList}: MemoProps): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo-List</Text>
      <FlatList
        data={memoList}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => <Item {...item} />}
      />
    </SafeAreaView>
  );
};

const Item = ({content}: ItemProps): React.JSX.Element => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const handleNavigate = () => {
    navigation.navigate('Detail');
  };
  return (
    <TouchableOpacity style={styles.item} onPress={handleNavigate}>
      <Text style={styles.content} numberOfLines={5} ellipsizeMode="tail">
        {content.replaceAll('\n', '')}
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
  item: {
    backgroundColor: '#f1f3f5',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    fontSize: 16,
    flex: 1,
  },
});
export default TodoList;
