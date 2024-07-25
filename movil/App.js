import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable} from "react-native";

const ico = require("./assets/icon.png");

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HOla MUndo</Text>
      <StatusBar style="auto" />
      <Image source={ico} style={{  resizeMode:"center" }} />
      <Pressable>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
