<template>
  <div class="blog-wrapper" :class="{'no-user' : !user}"> <!--temporary NO-USER, will change to using state later-->
    <div class="blog-content">
      <div>
        <!-- if welcomeScreen is TRUE, output the header below-->
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <!-- else if welcomeScreen is FALSE, output the header below-->
        <h2 v-else>{{ post.title }}</h2>

        <!-- same process for paragraphs -->
        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
        <!--give the "else" paragraph a class bc we only show preview of blogPost-->
        <p class="content-preview" v-else>{{ post.blogHTML }}</p>

        <!-- class = XX-light to differentiate for DARK BACKGROUND -->
        <router-link class="link link-light" v-if="post.welcomeScreen" :to="{ name: 'Login' }">
          Login/Register <Arrow class="arrow arrow-light" />
        </router-link>
        <router-link class="link" v-else to="#">
          View The Post <Arrow class="arrow" />
        </router-link>
      </div>
    </div>

    <!-- render photos from asset folder using props -->
    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt=""/>
      <img v-else :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)" alt=""/>
    </div>

  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
  name: "blogPost",
  props: ["post"], //component will look for "post" props, which is defined in Home.vue
  components: {
    Arrow,
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;
      @media(min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media(min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px; //temporary
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: .5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #ffffff;
        }
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media(min-width: 700px) {
      order: 2;
    }

    @media(min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  //for each even numbered wrapper, alternate the content and photo positions
  &:nth-child(even) {
    .blog-content {
      order: 2;
    }

    .blog-photo {
      order: 1;
    }
  }
}

//change first card's display to black ((no user))
.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>