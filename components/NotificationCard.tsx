import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Notification } from "../types/types";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../utils/formatter";

interface NotificationCardProps {
  notification: Notification;
  onDelete: (notificationId: string) => void;
}

const NotificationCard = ({
  notification,
  onDelete,
}: NotificationCardProps) => {
  const getNotificationText = () => {
    const name = `${notification.from.firstName}`;
    switch (notification.type) {
      case "like":
        return `${name} liked your post.`;
      case "comment":
        return `${name} commented on your post.`;
      case "follow":
        return `${name} started following you.`;
      default:
        return ` `;
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "like":
        return <Ionicons name="heart" size={19} color="#E0245E" />;
      case "comment":
        return <Ionicons name="chatbox" size={19} color="#17BF63" />;
      case "follow":
        return <Ionicons name="person-add" size={19} color="#657786" />;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Notification?",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDelete(notification._id);
          },
        },
      ],
    );
  };

  return (
    <View className="mt-3">
      {/* Comment Notification */}
      <View className="flex-row gap-2 w-full">
        <Image
          source={{
            uri: notification.from.profilePicture,
          }}
          className="size-13 rounded-full"
          resizeMode="cover"
        />

        <View className="justify-between flex-1">
          <View className="flex-row justify-between">
            <View className="items-start flex-1 justify-center">
              <Text className="flex-row items-center justify-center">
                <Text className="font-bold">{notification.from.firstName}</Text>
                {"  "}
                <Text className="text-gray-500">
                  @{notification.from.username.slice(0, 18)}
                </Text>
              </Text>
              <Text className="flex-row items-center justify-center">
                <Text className="text-sm">{getNotificationText()}</Text>
              </Text>
            </View>
            <TouchableOpacity
              className="justify-center items-center"
              onPress={() => {
                handleDelete();
              }}
            >
              <Ionicons name="trash" size={19} color={"red"} />
            </TouchableOpacity>
          </View>
          {notification.post && (
            <View className="bg-gray-50 rounded-lg p-3 mb-2">
              <Text className="text-gray-700 text-sm mb-1" numberOfLines={3}>
                {notification.post.content}
              </Text>
              {notification.post.image && (
                <Image
                  source={{ uri: notification.post.image }}
                  className="w-full h-32 rounded-lg mt-2"
                  resizeMode="cover"
                />
              )}
            </View>
          )}
          {notification.comment && (
            <View className="p-2 rounded-lg bg-blue-100">
              <Text className="text-sm text-gray-500">Comment:</Text>
              <Text className="font-bold text-sm text-gray-600">
                "{notification.comment.content}"
              </Text>
            </View>
          )}
          <View className="flex-row items-center gap-2 mt-2">
            {getNotificationIcon()}
            <Text className="text-sm text-gray-500">
              {formatDate(notification.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
