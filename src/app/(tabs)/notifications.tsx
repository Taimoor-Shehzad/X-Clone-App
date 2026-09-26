import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNotification } from "../../../hooks/useNotification";
import { Ionicons } from "@expo/vector-icons";
import { Notification } from "../../../types/types";
import NoNotifications from "../../../components/NoNotifications";
import NotificationCard from "../../../components/NotificationCard";

const notifications = () => {
  const {
    notifications,
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
    isDeletingNotification,
  } = useNotification();

  if (error) {
    return (
      <View className="flex-1 bg-white w-full justify-center items-center gap-4 p-8">
        <Text className="text-gray-500 text-lg">
          Failed to load notifications
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => {
            refetch();
          }}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4">
      <View className="flex-row justify-between items-center mt-6 font-bold border-b border-b-gray-100 pb-4">
        <Text className="font-bold text-xl leading-tight">Notifications</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#657786" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 50 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={"#1DA1F2"}
          />
        }
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center p-8 mt-40">
            <ActivityIndicator size={"large"} color="#1DA1F2" />
            <Text className="text-gray-500 text-lg mt-2">
              Loading notifications...
            </Text>
          </View>
        ) : notifications.length === 0 ? (
          <NoNotifications />
        ) : (
          notifications.map((notification: Notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onDelete={deleteNotification}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default notifications;
