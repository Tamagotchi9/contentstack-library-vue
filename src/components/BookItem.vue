<template>
    <div class="book">
        <img 
        width="150"
        height="200"
        :src="book.url" alt=""
        >
        <h6 class="book__title">{{ book.title }}</h6>
    </div>
</template>

<script>
export default {
    name: "BookItem",
    props: {
        book: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.book {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.book__title {
    margin-top: 35px;
    font-weight: 700;
    position: relative;
}
.book__title::before {
    content: '';
    width: 50px;
    height: 2px;
    background: rgba(0, 0, 0, 0.637);
    position: absolute;
    top: -10px;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);

}
</style>