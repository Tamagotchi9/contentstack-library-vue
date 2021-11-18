<template>
  <div class="home">
    <header
    class="header"
    :style="{
        backgroundImage: `url('${getBanner().url}?auto=webp ')`,
      }"
    >
      <h1 class="header__title">{{ all_homepage.items[0].title }}</h1>
    </header>
    <main class="content">
      <div class="container">
        <div class="books-wrapper">
          <book-item 
            @click.prevent="goToBook({uid: book.system.uid, limit, skip})"
            v-for="book of all_bookpage.items" 
            :key="book.title" 
            :book="getBook(book)"
          />
        </div>
        <Pagination
            @get-data="getData"
            :size="limit"
            :totalpages="all_bookpage.total"
            :initialPageNumber="skip / limit"
          />
      </div>
    </main>
  </div>
</template>

<script>
import { ALL_BOOKS, HOMEPAGE }  from "../graphql/query";
import { getImage, getBookInfo } from '@/helpers';
import BookItem from "../components/BookItem.vue";
import Pagination from '@/components/Pagination.vue';

export default {
  name: "BookList",
  components: {
    BookItem,
    Pagination
  },
  data() {
    return {
      // Default values for graphql
      all_bookpage: {
        items: [
          {
            system: {
              uid: ''
            },
            title: '',
            cover_imageConnection: {
              edges: [
                {
                  node: {
                    url: null,
                  },
                },
              ],
            },
          },
        ],
        total: 0,
      },
      all_homepage: {
        items: [
          {
            title: '',
            hero_imageConnection: {
              edges: [
                {
                  node: {
                    url: null,
                  },
                },
              ],
            },
          },
        ],
      },
      // take limit and skip parameters from router, if not, then 3 and 0
      limit: +this.$route.params.limit || 5,
      skip: +this.$route.params.skip || 0,
    };
  },
  methods: {
    async getData(params) {
      this.limit = params.limit;
      this.skip = params.skip;
      await this.$apollo.queries.all_bookpage.refetch(params);
    },
    getBook(book) {
      return getBookInfo(book)
    },
    getBanner() {
      return getImage(this.all_homepage.items[0].hero_imageConnection);
    },
    goToBook(params) {
      this.$router.push({ name: 'Book', params: params })
    }
  },

  apollo: {
    all_bookpage: {
      query: ALL_BOOKS,
      variables() {
        return {
          limit: this.limit,
          skip: this.skip,
        };
      },
    },
    all_homepage: {
      query: HOMEPAGE,
    },
  },
  async mounted() {
    if (this.$route.params.limit) {
      await this.getData({
        limit: this.limit,
        skip: this.skip,
      });
    }
  },
};
</script>

<style>
header {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__title {
  font-size: 72px;
  font-weight: 600;
  font-style: italic;
  color: white;
}
.content {
  padding: 50px 0;
}
.books-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.books {
  display: flex;
  align-content: center;
  justify-content: space-around;
}
</style>