import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import TodoListScreen from './src/pages/TodoListScreen';
import api from './src/api/apiService';

export type MemoType = {
  id: number
  content: string
  create_at: string
  update_at: string
}

export type MemoProps = {
  memoList: MemoType[]
}

function App(): React.JSX.Element {

  const [memoList, setMemoList] = useState<MemoType[]>([])

  useEffect(() => {
    getMemoList();
  }, [])

  const getMemoList = async () => {
    const res = await api.getMemoAll();
    // console.log(res)
    setMemoList([
      {
        "id": 220,
        "content": "ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ",
        "update_at": "2024-02-29T05:49:22.162371Z",
        "create_at": "2023-06-19T02:03:36.672979Z"
      },
      {
        "id": 221,
        "content": "ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ",
        "update_at": "2024-02-29T05:49:22.162371Z",
        "create_at": "2023-06-19T02:03:36.672979Z"
      },
      {
        "id": 223,
        "content": "ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ",
        "update_at": "2024-02-29T05:49:22.162371Z",
        "create_at": "2023-06-19T02:03:36.672979Z"
      },])
  }

  const props = {
    memoList,
  }
  return (
    <SafeAreaView style={styles.container}>
      <TodoListScreen {...props} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white"
  }
});

export default App;
