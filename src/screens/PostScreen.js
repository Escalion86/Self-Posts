import React from "react";
import { StyleSheet, Text, View } from "react-native";

// export class PostScreen extends React.Component {
//   // static navigationOptions = (props) => {
//   //   console.log(props.navigation);
//   //   return {
//   //     title: this.props.navigation.setParams({
//   //       title: "A Nested Details Screen",
//   //     }),
//   //   };
//   // };

//   render() {
//     //this.props.navigation.setParams("title", "A Nested Details Screen");
//     //this.props.route.name = "123";
//     console.log(this.props);
//     return (
//       <View style={styles.center}>
//         <Text>PostScreen</Text>
//       </View>
//     );
//   }
// }

export const PostScreen = ({ navigation, route }) => {
  navigation.setOptions({
    title: "Пост номер 42",
    headerStyle: { backgroundColor: "red" },
    headerTintColor: "#fff",
  });

  return (
    <View style={styles.center}>
      <Text>PostScreen</Text>
    </View>
  );
};

// PostScreen.navigationOptions = {
//   title: "123",
//   headerStyle: { backgroundColor: "red" },
// };
// PostScreen.defaultNavigationOptions = {
//   tabBarLabel: "Пост номер 42",
//   title: "123",
// };

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
