<template>
  <div class="home">
    <!-- look for the prop post inside BlogPost, lead to welcomeScreen obj-->
    <BlogPost v-if="!user" :post="welcomeScreen" /> 
    <!--use same component (BlogPost), so make sure the rendered components are different-->
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register to be a donkey today!</h2>
        <router-link class="router-button" :to="{ name: 'Register' }">
          Register for BT3103Donkeys <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost: "Weekly blog articles about donkeys",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "This is a random title",
          blogHTML: "This is a random blog post title",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a random title",
          blogHTML: "This is a random blog post title",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media(min-width: 800px) {
        margin-left: auto; //push all the way to left
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media(min-width: 800px) { //these are for DESKTOP views!
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
