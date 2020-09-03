import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { DATA } from "../data";
import { Post } from "../components/Post";

export const MainScreen = ({ navigation }) => {
  navigation.setOptions({
    title: "Мой блог",
    //headerStyle: { backgroundColor: "red" },
    //headerTintColor: "#fff",
  });

  const openPostHandler = (post) => {
    navigation.navigate("Post", { postId: post.id, date: post.date });
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={DATA}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});
