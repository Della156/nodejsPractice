import Vue from "vue";
import Router from "vue-router";
import cnodeWrp from "../components/navSideContent/cnodeWrp.vue";
import itemjsTopics from "../components/navSideContent/itemContent/unodejsTopics.vue";
import user from "../components/navSideContent/itemContent/user.vue";
import article from "../components/navSideContent/itemContent/article.vue";
import createTopic from "../components/navSideContent/itemContent/createTopic.vue";
import cnodeProfile from "../components/navSideContent/itemContent/cnodeProfile.vue";
import messages from "../components/navSideContent/itemContent/messages.vue";
import aboutCnode from "../components/navSideContent/about.vue";
import defaultContent from "../components/navSideContent/defaultContent.vue";
import notFoundComponent from "../components/navSideContent/notFoundComponent.vue";

Vue.use(Router);

export default new Router({
  // 由于无法配置服务端，打开history模式之后，打包的项目运行时刷新可能会出现404错误
  mode: "history",
  routes: [
    // (欢迎页)根路由配置
    {
      path: "/",
      components: {
        defaultContent: defaultContent
      }
    },
    // 除已配置路由之外的路由配置
    {
      path: "*",
      components: {
        notFoundComponent: notFoundComponent
      }
    },
    // 社区路由配置
    {
      path: "/itemCommunity",
      components: {
        cnodeWrp: cnodeWrp
      },
      children: [
        {
          path: "itemjsTopics",
          components: {
            itemjsTopics
          }
        },
        {
          path: "itemjsTopics/:id",
          name: "ArticleRoute",
          components: {
            article
          }
        },
        {
          path: "user/:name",
          name: "UserRoute",
          components: {
            user
          }
        },
        {
          path: "createTopic",
          components: {
            createTopic
          }
        },
        {
          path: "profile",
          components: {
            cnodeProfile
          }
        },
        {
          path: "messages",
          components: {
            messages
          }
        }
      ]
    },
    // 关于社区
    {
      path: "/about-community",
      components: {
        aboutCnode: aboutCnode
      }
    }
  ]
});
