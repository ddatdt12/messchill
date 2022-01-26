import axios from './axios';

const conversationApi = {
  getConversationDetails(conversationId) {
    return axios.get(`/api/conversations/${conversationId}`);
  },
  getConversationList() {
    return axios.get(`/api/conversations`);
  },
};
export default conversationApi;
