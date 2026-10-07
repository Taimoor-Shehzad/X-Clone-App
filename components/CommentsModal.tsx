import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Post } from "../types/types";
import { useComments } from "../hooks/useComments";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface CommentModalProps {
  selectedPost: Post;
  onClose: () => void;
}

const CommentsModal = ({ selectedPost, onClose }: CommentModalProps) => {
  const insets = useSafeAreaInsets();
  const { commentText, setCommentText, createComment, isCreatingComment } =
    useComments();
  const { currentUser } = useCurrentUser();

  const handleClose = () => {
    onClose();
    setCommentText("");
  };

  let fullName, displayName: any;

  if (selectedPost) {
    fullName = `${selectedPost.user.firstName} ${selectedPost.user.lastName}`;
    displayName =
      fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName;
  }

  return (
    <Modal
      visible={!!selectedPost}
      onRequestClose={handleClose}
      presentationStyle="pageSheet"
      animationType="slide"
      style={{
        marginTop: 70 + insets.top,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 10,
        paddingBottom: insets.bottom,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View className="w-full flex-row items-center justify-center relative mb-2">
          <TouchableOpacity
            className="absolute left-0 z-10"
            onPress={() => {
              handleClose();
            }}
          >
            <Text className="text-blue-500">Close</Text>
          </TouchableOpacity>

          <Text className="font-bold text-lg">Comments</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {selectedPost && (
            <>
              {}
              <View className="px-1 border-b border-t py-3 border-b-gray-100 border-t-gray-100">
                <View className="flex-row gap-3">
                  <Image
                    source={{
                      uri: selectedPost.user.profilePicture,
                    }}
                    className="size-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View className="flex-1 justify-center">
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row gap-1 items-center">
                        <Text className="text-lg font-extrabold leading-tight">
                          {displayName}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          @{selectedPost.user.username}
                        </Text>
                      </View>
                    </View>
                    <Text className="mr-1">{selectedPost.content}</Text>
                    {selectedPost.image && (
                      <View className="w-full rounded-2xl aspect-16/10 overflow-hidden mt-4">
                        <Image
                          source={{
                            uri: selectedPost.image,
                          }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
              {selectedPost.comments.length === 0 ? (
                <View className="w-full p-10 items-center justify-center">
                  <Text className="text-lg text-gray-500">
                    No comments yet...
                  </Text>
                </View>
              ) : (
                selectedPost.comments.map((comment) => {
                  return (
                    <View
                      key={comment._id}
                      className="px-1 border-b py-3 border-b-gray-100"
                    >
                      <View className="flex-row gap-3">
                        <Image
                          source={{
                            uri:
                              comment.user.profilePicture ||
                              "https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
                          }}
                          className="size-10 rounded-full"
                          resizeMode="cover"
                        />

                        <View className="flex-1 justify-center">
                          <View className="flex-row justify-between items-center">
                            <View className="flex-row gap-1 items-center">
                              <Text className="text-lg font-extrabold leading-tight">
                                {displayName}
                              </Text>
                              <Text className="text-sm text-gray-500">
                                @{comment.user.username}
                              </Text>
                            </View>
                          </View>
                          <Text className="mr-1">{comment.content}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              )}
            </>
          )}
        </ScrollView>
        {selectedPost && (
          <View className="px-1 border-b py-3 border-b-gray-100 w-full">
            <View className="flex-row gap-3">
              <Image
                source={{
                  uri: currentUser.profilePicture,
                }}
                className="size-10 rounded-full"
                resizeMode="cover"
              />
              <View className="flex-1 gap-3">
                <TextInput
                  placeholder="Write Comment"
                  className="px-4 py-2 border rounded-lg border-gray-300"
                  value={commentText}
                  onChangeText={setCommentText}
                />
                <TouchableOpacity
                  className={`items-center self-start justify-center px-4 py-1 rounded-lg ${commentText.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                  onPress={() => createComment(selectedPost._id)}
                  disabled={isCreatingComment || !commentText.trim()}
                >
                  {isCreatingComment ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      className={`font-bold text-lg  ${commentText.trim() ? "text-white" : "text-gray-600"}`}
                    >
                      Reply
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsModal;
