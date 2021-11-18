<template>
  <div class="buttons-wrapper">
    <button
      class="waves-effect waves-light btn"
      @click="prevPage"
      :disabled="pageNumber === 0"
    >
      Previous
    </button>
    <button
      class="waves-effect waves-light btn"
      @click="nextPage"
      :disabled="pageNumber >= pageCount - 1"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return { 
        pageNumber: this.initialPageNumber || 0 
    };
  },
  props: {
    totalpages: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    initialPageNumber: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    changePage() {
      const params = {
        limit: this.size,
        skip: this.pageNumber * this.size,
      };
      this.$emit('get-data', params);
    },
    nextPage() {
      this.pageNumber += 1;
      this.changePage();
    },
    prevPage() {
      this.pageNumber -= 1;
      this.changePage();
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalpages / this.size);
    },
  },
};
</script>

<style scoped>
button {
  width: 120px;
  margin-right: 10px;
}
.buttons-wrapper {
    margin-top: 30px;
    text-align: center;
}
</style>