import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { MemoProps } from "../../App";

type ItemProps = {
    content: string
    create_at: string
};

const Item = ({ content }: ItemProps) => (
    <TouchableOpacity style={styles.item}>
        <Text
            style={styles.content}
            numberOfLines={5}
            ellipsizeMode="tail"
        >
            {content.replaceAll("\n", "")}
        </Text>
    </TouchableOpacity>
);

const TodoListScreen = ({ memoList }: MemoProps) => {
    console.log(memoList)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Todo-List</Text>
            <FlatList
                data={memoList}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <Item {...item} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: 'bold',
        marginVertical: 16
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
    }
})
export default TodoListScreen