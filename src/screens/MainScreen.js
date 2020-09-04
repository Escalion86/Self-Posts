import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View, Button, FlatList } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { Post } from "../components/Post"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { loadPosts } from "../store/actions/post"

export const MainScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const posts = useSelector((state) => state.post.posts)

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
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    //     <Item
    //       title="Toggle Drawer"
    //       iconName="ios-menu"
    //       onPress={() => navigation.toggleDrawer()}
    //     />
    //   </HeaderButtons>
    // ),
    //headerStyle: { backgroundColor: "red" },
    //headerTintColor: "#fff",
  })

  const openPostHandler = (post) => {
    navigation.navigate("Post", {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    })
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
})
