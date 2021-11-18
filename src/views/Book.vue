<template>
<div class="book-page">
    <div class="container">
        <Loader v-if="loading" />
        <section  v-else>
             <a @click.prevent="toHomePage" class="btn-back">
                <i class="small material-icons">arrow_back</i>
                <span class="btn-back__text">Go back</span>
            </a>
            <div class="book-page__content">
                <img
                    height="400"
                    width="300"
                    :src="`${book.cover_image.url}?auto=webp`"
                    :alt="book.cover_image.title"
                />
                <div class="book-page__info">
                    <h5>{{ book.title }}</h5>
                    <author>{{ book.author }}</author>
                    <span> {{ book.pages }} pages </span>
                    <p class="book__description">{{ book.book_description }}</p>
                    <!-- <a :href="book.amazon_book_s_link.href"></a> -->
                </div>
            </div>   
        </section>
    </div>
</div>
</template>

<script>
import Stack from '@/plugins/contentstack';
export default {
  name: 'Book',
  data() {
    return {
      book: {},
      loading: true,
    };
  },
  async mounted() {
    this.book = await Stack.getEntrie('bookpage', this.$route.params.uid); // get single book entrie
    this.loading = false;
  },
  methods: {
    // back to home page function.
    // Passing limit and skip properties in order to come back to
    // the same pagination number page
    toHomePage() {
      const parameters = {
        limit: +this.$route.params.limit,
        skip: +this.$route.params.skip,
      };
      this.$router.push({ name: 'BookList', params: parameters });
    },
  },
};
</script>

<style scoped>
.btn-back {
    display: flex;
    align-items: center;
}
.btn-back__text {
    font-size: 18px;
    margin-left: 10px;  
}
.book-page {
    padding: 30px 0;
}
.book-page__content {
    padding: 50px 0;
    display: flex;
    align-items: flex-start;
}
.book-page__info {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
}
.book__description {
    font-size: 22px;
    max-height: 300px;
    overflow-y: scroll;
}

.book__description::-webkit-scrollbar {
    width: 4px;
}

.book__description::-webkit-scrollbar-track {
    background: transparent;
}

.book__description::-webkit-scrollbar-thumb {
    background: #08D9D6 !important;
}

</style>