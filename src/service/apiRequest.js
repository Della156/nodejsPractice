import http from "./apiUtil.js";

export default {
  // 【用户】注册
  registerUsers: function(data, resolve, reject) {
    http.ajaxRequest("/register", "post", {}, data, resolve, reject);
  },
  // 【用户】登录
  verifyUsers: function(data, resolve, reject) {
    http.ajaxRequest("/login", "post", {}, data, resolve, reject);
  },
  // 【用户】请求用户基本信息
  getUserInfo: function(userName, resolve, reject) {
    http.ajaxRequest("/user/" + userName, "get", {}, {}, resolve, reject);
  },
  // 【用户】获取用户所收藏的文章
  getUserCollectedTopic: function(userName, resolve, reject) {
    http.ajaxRequest(
      "/topic_collect/" + userName,
      "get",
      {},
      {},
      resolve,
      reject
    );
  },
  // 【用户】获取用户的新消息数量
  getUserMsgNum: function(params, resolve, reject) {
    http.ajaxRequest("/message/count", "get", params, {}, resolve, reject);
  },
  // 【用户】获取用户的已读与未读消息
  getUserMsg: function(params, resolve, reject) {
    http.ajaxRequest("/messages", "get", params, {}, resolve, reject);
  },
  // 【操作】给评论点赞
  commentLike: function(replyId, data, resolve, reject) {
    http.ajaxRequest(
      "/reply/" + replyId + "/ups",
      "post",
      {},
      data,
      resolve,
      reject
    );
  },
  // 【操作】收藏文章
  collectTopic: function(data, resolve, reject) {
    http.ajaxRequest(
      "/topic_collect/collect",
      "post",
      {},
      data,
      resolve,
      reject
    );
  },
  // 【操作】取消文章收藏
  deCollectTopic: function(data, resolve, reject) {
    http.ajaxRequest(
      "/topic_collect/de_collect",
      "post",
      {},
      data,
      resolve,
      reject
    );
  },
  // 【操作】发布评论
  createComment: function(topicId, data, resolve, reject) {
    http.ajaxRequest(
      "/topic/" + topicId + "/replies",
      "post",
      {},
      data,
      resolve,
      reject
    );
  },
  // 【操作】发布文章
  createTopic: function(data, resolve, reject) {
    http.ajaxRequest("/topics", "post", {}, data, resolve, reject);
  },
  // 【操作】提交修改的文章
  modifyTopic: function(data, resolve, reject) {
    http.ajaxRequest("/topics/update", "post", {}, data, resolve, reject);
  },
  // 【操作】将所有消息标记为已读
  markAllMsgToRead: function(data, resolve, reject) {
    http.ajaxRequest("/message/mark_all", "post", {}, data, resolve, reject);
  },
  // 【操作】将单条消息标记为已读
  markOneMsgToRead: function(msgId, data, resolve, reject) {
    http.ajaxRequest(
      "/message/mark_one/" + msgId,
      "post",
      {},
      data,
      resolve,
      reject
    );
  },
  // 【文章】获取文章详情
  getTopicDetail: function(articleId, params, resolve, reject) {
    http.ajaxRequest("topic/" + articleId, "get", params, {}, resolve, reject);
  },
  // 【文章】获取首页文章列表
  getItemTopics: function(params, resolve, reject) {
    http.ajaxRequest("/topics", "get", params, {}, resolve, reject);
  },

  // 【用户】更换用户头像
  uploadAvatar(avatar, params, resolve, reject) {
    // headers: { 'content-type': 'multipart/form-data' }
    let data = new FormData();
    data.append('avatar', avatar);
    http.ajaxRequest("/upload-avatar", "get", params, {}, resolve, reject);
  }
};
