import Gradient from "@/components/gradient";
import { View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Gradient isSpeaking={false} position="bottom" />
    </View>
  );
}
