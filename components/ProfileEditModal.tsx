import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";

interface ProfileEditModalProps {
  isVisible: boolean;
  closeEditModal: () => void;
  saveInfo: () => void;
  isSaving: boolean;
  profileImage: string;
  bannerImage: string;
  pickProfileImage: () => void;
  pickBannerImage: () => void;
  updateField: (field: string, value: string) => void;
  formData: {
    firstName: string;
    lastName: string;
    bio: string;
    location: string;
  };
}

const ProfileEditModal = ({
  isVisible,
  closeEditModal,
  saveInfo,
  isSaving,
  profileImage,
  bannerImage,
  pickProfileImage,
  pickBannerImage,
  updateField,
  formData,
}: ProfileEditModalProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      style={{
        marginTop: 100,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 12,
      }}
      onRequestClose={closeEditModal}
    >
      {/* Header */}
      <View className="flex-row w-full justify-between mb-10">
        <TouchableOpacity onPress={closeEditModal}>
          <Text className="text-blue-500 text-lg">Cancel</Text>
        </TouchableOpacity>
        <Text className="font-bold text-lg">Edit Profile</Text>
        <TouchableOpacity disabled={isSaving} onPress={saveInfo}>
          {isSaving ? (
            <ActivityIndicator size="small" color="#1DA1F2" />
          ) : (
            <Text className="text-blue-500 text-lg font-semibold">Save</Text>
          )}
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={{
            uri:
              bannerImage ||
              "https://static.vecteezy.com/system/resources/previews/060/844/016/non_2x/snow-capped-mountains-reflected-in-a-still-lake-hd-background-luxury-hd-wallpaper-image-popular-high-resolution-desktop-background-free-photo.jpg",
          }}
          resizeMode="cover"
          className="aspect-21/9"
        />
        <View className="-mt-7 w-full items-end">
          <TouchableOpacity
            className="bg-blue-500 rounded-full p-2"
            onPress={pickBannerImage}
          >
            <Ionicons name="pencil" color={"white"} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      {/* User Profile Image */}
      <View className=" px-4 flex-row items-end">
        <Image
          source={{
            uri:
              profileImage ||
              "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
          }}
          resizeMode="cover"
          className="size-28 rounded-full border-4 border-white -mt-15"
        />
        <TouchableOpacity
          className="bg-blue-500 rounded-full p-2 -ml-8"
          onPress={pickProfileImage}
        >
          <Ionicons name="pencil" color={"white"} size={15} />
        </TouchableOpacity>
      </View>
      <View>
        <View className="mt-6 gap-2">
          <Text className="text-gray-500">First Name</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            value={formData.firstName}
            onChangeText={(text) => {
              updateField("firstName", text);
            }}
            placeholder="Your first name"
            multiline
          />
        </View>
        <View className="mt-3 gap-2">
          <Text className="text-gray-500">Last Name</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            multiline
            value={formData.lastName}
            onChangeText={(text) => {
              updateField("lastName", text);
            }}
            placeholder="Your last name"
          />
        </View>
        <View className="mt-3 gap-2">
          <Text className="text-gray-500">Bio</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            multiline
            value={formData.bio}
            onChangeText={(text) => {
              updateField("bio", text);
            }}
            placeholder="Your bio"
          />
        </View>
        <View className="mt-3 gap-2">
          <Text className="text-gray-500">Location</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            multiline
            value={formData.location}
            onChangeText={(text) => {
              updateField("location", text);
            }}
            placeholder="Your location"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProfileEditModal;
