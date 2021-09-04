<template>
    <div class="container-with-title">
        <h2>{{title}}</h2>
    </div>
</template>

<script>
export default {
   props: {
       title: String,
   },
}
</script>

<style lang="sass" scoped>
.container-with-title
    width: 300px
    height: 150px
    background: linear-gradient(105deg, #6ac0f9, #d500e9, #ffab9f)
    border-radius: 20px
    display: flex
    align-items: flex-end
    h2
        font-size: 15px
        color: white
        padding: 15px 20px
</style>