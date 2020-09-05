import React, { useState, useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { useDispatch } from "react-redux"
import { addPost } from "../store/actions/post"
import THEME from "../theme"
import { PhotoPicker } from "../components/PhotoPicker"

export const CreateScreen = ({ navigation }) => {
  dispatch = useDispatch()
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text,
      img,
      booked: false,
    }
    dispatch(addPost(post))
    navigation.navigate("Main")
  }

  const photoPickHandler = (uri) => {
    setImg(uri)
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Создай новый пост</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Введите текст поста"
            value={text}
            onChangeText={setText}
            multiline={true}
          />
          <PhotoPicker
            onPick={photoPickHandler}
            title={!img ? "Сделать фото" : "Изменить фото"}
          />
          <Button
            title="Создать пост"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text || !img}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "open-regular",
    marginVertical: 10,
  },
  textArea: {
    padding: 10,
    marginBottom: 10,
  },
})
