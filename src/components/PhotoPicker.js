import React, { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { View, StyleSheet, Image, Button, Alert } from "react-native"
import * as Permissions from "expo-permissions"

async function askForPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  )
  if (status !== "granted") {
    Alert.alert("Ошибка", "Вы не дали прав на создание фото")
    return false
  }
  return true
}

export const PhotoPicker = ({ onPick, title, img }) => {
  const takePhoto = async () => {
    const hasPermissions = await askForPermissions()

    if (!hasPermissions) {
      return
    }

    const image = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
    })

    onPick(image.uri)
  }

  return (
    <View style={styles.wrapper}>
      <Button title={title} onPress={takePhoto} />
      {img && <Image style={styles.image} source={{ uri: img }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
})
