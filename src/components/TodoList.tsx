import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { MemoProps } from "../pages/TodoListStack";
import { useNavigationContainerRef } from "@react-navigation/native";

type ItemProps = {
    content: string
    create_at: string
};

const TodoList = ({ memoList }: MemoProps) => {
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

const Item = ({ content }: ItemProps) => {
    const navigationRef = useNavigationContainerRef();
    const handleNavigate = () => {
        // navigationRef.navigate("Detail")
        console.log(navigationRef.current)
    }
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={handleNavigate}
        >
            <Text
                style={styles.content}
                numberOfLines={5}
                ellipsizeMode="tail"
            >
                {content.replaceAll("\n", "")}
            </Text>
        </TouchableOpacity>
    )
};

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
export default TodoList