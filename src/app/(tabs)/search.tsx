import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#GPT6-Astra", tweets: "325K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "567K" },
  { topic: "#TechNews", tweets: "98K" },
];

const search = () => {
  return (
    <View className="flex-1 px-5 pt-14 gap-5 bg-white">
      <View className="w-full bg-gray-300 rounded-full px-4 flex-row items-center gap-1">
        <Ionicons name="search" size={20} color={"#657786"} />
        <TextInput
          className="w-full color-black"
          placeholder="Search Twitter"
          placeholderTextColor={"#657786"}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="border-t border-t-gray-200 flex-1 py-3"
      >
        <Text className="text-xl font-bold text-gray-900">
          Trending for you
        </Text>
        {TRENDING_TOPICS.map((item, index) => (
          <TouchableOpacity
            key={index}
            className=" border-b border-b-gray-200 py-3"
          >
            <Text className="text-sm text-gray-500">
              Trending in Technology
            </Text>
            <Text className="font-bold text-lg text-gray-900">
              {item.topic}
            </Text>
            <Text className="text-sm text-gray-500">{item.tweets} Tweets</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default search;
