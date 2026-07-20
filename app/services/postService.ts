import api from "./api";
const postService = {
  votePoll: async (postId: number, optionIndex: number) => {
    try {
      const response = await api.post("/posts/vote", {
        postId,
        optionIndex,
      });
      return response.data;
    } catch (error) {
      console.log(`Vote error : ${error}`);
      throw error;
    }
  },
};
export default postService;
