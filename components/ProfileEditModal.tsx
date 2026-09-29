import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native";

interface ProfileEditModalProps {
  isVisible: boolean;
  closeEditModal: () => void;
  saveInfo: () => void;
  isSaving: boolean;
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
  updateField,
  formData,
}: ProfileEditModalProps) => {
  const handleSaveInfo = () => {
    saveInfo();
    closeEditModal();
  };
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
      <View className="flex-row w-full justify-between">
        <TouchableOpacity onPress={closeEditModal}>
          <Text className="text-blue-500 text-lg">Cancel</Text>
        </TouchableOpacity>
        <Text className="font-bold text-lg">Edit Profile</Text>
        <TouchableOpacity disabled={isSaving} onPress={handleSaveInfo}>
          {isSaving ? (
            <ActivityIndicator size="small" color="#1DA1F2" />
          ) : (
            <Text className="text-blue-500 text-lg font-semibold">Save</Text>
          )}
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
