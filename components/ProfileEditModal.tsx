import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { TextInput } from "react-native";

const ProfileEditModal = () => {
  return (
    <Modal
      // visible={modalVis}
      visible={false}
      animationType="slide"
      presentationStyle="pageSheet"
      style={{
        marginTop: 100,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 12,
      }}
      onRequestClose={() => {
        // setModalVis(false);
      }}
    >
      {/* Header */}
      <View className="flex-row w-full justify-between">
        <TouchableOpacity
          onPress={() => {
            // setModalVis(false)
          }}
        >
          <Text className="text-blue-500 text-lg">Cancel</Text>
        </TouchableOpacity>
        <Text className="font-bold text-lg">Edit Profile</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-bold text-lg">Save</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View className="mt-6 gap-2">
          <Text className="text-gray-500">First Name</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            multiline
          />
        </View>
        <View className="mt-3 gap-2">
          <Text className="text-gray-500">Last Name</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            multiline
          />
        </View>
        <View className="mt-3 gap-2">
          <Text className="text-gray-500">Bio</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            multiline
          />
        </View>
        <View className="mt-3 gap-2">
          <Text className="text-gray-500">Location</Text>
          <TextInput
            className="border border-gray-200 px-4 rounded-sm"
            multiline
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProfileEditModal;
