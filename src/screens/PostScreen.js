import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import THEME from "../theme"
import { toggleBooked, deletePost } from "../store/actions/post"

export const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const postId = route.params.postId
  const date = route.params.date

  const post = useSelector((state) =>
    state.post.posts.find((post) => post.id === postId)
  )

  const removeHandler = () => {
    Alert.alert(
      "Удаление поста",
      "Вы точно хотите удалить пост?",
      [
        {
          text: "Отменить",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            navigation.navigate("Main")
            dispatch(deletePost(postId))
          },
        },
      ],
      { cancelable: false }
    )
  }

  navigation.setOptions({
    title: "Пост от " + new Date(date).toLocaleDateString(),
    //headerStyle: { backgroundColor: "red" },
    headerTintColor: "#fff",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Take photo"
          iconName={post.booked ? "ios-star" : "ios-star-outline"}
          onPress={() => dispatch(toggleBooked(postId))}
        />
      </HeaderButtons>
    ),
  })

  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title="Удалить"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  )
}

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
})
