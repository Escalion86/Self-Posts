import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { Post } from "../components/Post"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { loadPosts } from "../store/actions/post"
import THEME from "../theme"

export const MainScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const posts = useSelector((state) => state.post.posts)
  const loading = useSelector((state) => state.post.loading)

  navigation.setOptions({
    title: "Мой блог",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Take photo"
          iconName="ios-add-circle"
          onPress={() => navigation.navigate("Create")}
        />
      </HeaderButtons>
    ),
  })

  const openPostHandler = (post) => {
    navigation.navigate("Post", {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    })
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} />
      </View>
    )
  }

  if (!posts.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>
          {!route.params.booked
            ? "Постов пока нет"
            : "Избранных постов пока нет"}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={posts.filter((post) => !route.params.booked || post.booked)}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    fontFamily: "open-regular",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
