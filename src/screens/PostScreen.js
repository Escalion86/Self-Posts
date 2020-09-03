import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { THEME } from "../theme";
import { DATA } from "../data";

export const PostScreen = ({ navigation, route }) => {
  const postId = route.params.postId;
  const date = route.params.date;

  const post = DATA.find((p) => p.id === postId);

  navigation.setOptions({
    title: "Пост от " + new Date(date).toLocaleDateString(),
    //headerStyle: { backgroundColor: "red" },
    headerTintColor: "#fff",
  });

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title="Удалить" color={THEME.DANGER_COLOR} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: "open-regular",
  },
});
