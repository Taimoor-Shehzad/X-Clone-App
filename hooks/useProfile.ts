import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { useCurrentUser } from "./useCurrentUser";
import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import type { ImagePickerAsset } from "expo-image-picker";
import { isAxiosError } from "axios";

const imageMimeTypes: Record<string, string> = {
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

type NativeImageFile = {
  uri: string;
  name: string;
  type: string;
};

type ProfileUpdate = {
  formData: {
    firstName: string;
    lastName: string;
    bio: string;
    location: string;
  };
  profileImage: ImagePickerAsset | null;
  bannerImage: ImagePickerAsset | null;
  currentProfilePicture: string;
  currentBannerImage: string;
};

const getImageFile = (asset: ImagePickerAsset) => {
  const assetName =
    asset.fileName ?? asset.uri.split(/[?#]/)[0].split("/").pop();
  const extension = assetName?.includes(".")
    ? assetName.split(".").pop()?.toLowerCase() || "jpg"
    : asset.mimeType?.split("/")[1] || "jpg";
  const filename = assetName?.includes(".")
    ? assetName
    : `image.${extension}`;

  return {
    uri: asset.uri,
    name: filename,
    type: asset.mimeType ?? imageMimeTypes[extension] ?? "image/jpeg",
  };
};

const appendImageFile = (
  formData: FormData,
  field: string,
  file: NativeImageFile,
) => {
  const nativeFormData = formData as unknown as {
    append: (key: string, value: NativeImageFile) => void;
  };
  nativeFormData.append(field, file);
};

export const useProfile = () => {
  const [selectedProfileImage, setSelectedProfileImage] =
    useState<ImagePickerAsset | null>(null);
  const [selectedBannerImage, setSelectedBannerImage] =
    useState<ImagePickerAsset | null>(null);
  const api = useApiClient();
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({
      formData,
      profileImage,
      bannerImage,
      currentProfilePicture,
      currentBannerImage,
    }: ProfileUpdate) => {
      if (!profileImage && !bannerImage) {
        return userApi.updateProfile(api, formData);
      }

      const multipartData = new FormData();

      Object.entries(formData).forEach(([field, value]) => {
        multipartData.append(field, value);
      });

      if (profileImage) {
        appendImageFile(
          multipartData,
          "profilePicture",
          getImageFile(profileImage),
        );
      }

      if (bannerImage) {
        appendImageFile(
          multipartData,
          "bannerImage",
          getImageFile(bannerImage),
        );
      }

      const response = await userApi.updateProfile(api, multipartData);
      const updatedUser = response.data?.user;

      if (
        (profileImage &&
          (!updatedUser?.profilePicture ||
            updatedUser.profilePicture === currentProfilePicture)) ||
        (bannerImage &&
          (!updatedUser?.bannerImage ||
            updatedUser.bannerImage === currentBannerImage))
      ) {
        throw new Error(
          "The server did not save the selected image. Deploy the latest backend upload route and try again.",
        );
      }

      return response;
    },
    onSuccess: async (response) => {
      queryClient.setQueryData(["authUser"], response);
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setSelectedProfileImage(null);
      setSelectedBannerImage(null);
      setIsEditingModalVisible(false);
      Alert.alert("Success", "User information updated successfully");
    },
    onError: (error) => {
      const responseData = isAxiosError(error) ? error.response?.data : null;
      const message =
        (typeof responseData?.message === "string" && responseData.message) ||
        (typeof responseData?.error === "string" && responseData.error) ||
        (error instanceof Error ? error.message : "") ||
        "Unable to update user information.";
      Alert.alert("Error", message);
    },
  });

  const pickImage = async (
    setImage: (asset: ImagePickerAsset) => void,
    aspect: [number, number],
  ) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert("Permission denied", "Storage permission is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });

    if (!result.canceled) setImage(result.assets[0]);
  };

  const pickProfileImage = () => pickImage(setSelectedProfileImage, [1, 1]);
  const pickBannerImage = () => pickImage(setSelectedBannerImage, [21, 9]);

  const openEditModal = () => {
    setSelectedProfileImage(null);
    setSelectedBannerImage(null);
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        bio: currentUser.bio || "",
        location: currentUser.location || "",
      });
    }
    setIsEditingModalVisible(true);
  };

  const closeEditModal = () => {
    setSelectedProfileImage(null);
    setSelectedBannerImage(null);
    setIsEditingModalVisible(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    isEditingModalVisible,
    openEditModal,
    closeEditModal,
    pickProfileImage,
    pickBannerImage,
    profileImage:
      selectedProfileImage?.uri ?? currentUser?.profilePicture ?? "",
    bannerImage: selectedBannerImage?.uri ?? currentUser?.bannerImage ?? "",
    updateField,
    formData,
    saveInfo: () =>
      updateProfileMutation.mutate({
        formData,
        profileImage: selectedProfileImage,
        bannerImage: selectedBannerImage,
        currentProfilePicture: currentUser?.profilePicture ?? "",
        currentBannerImage: currentUser?.bannerImage ?? "",
      }),
    isSavingInfo: updateProfileMutation.isPending,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  };
};
