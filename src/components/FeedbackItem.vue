<template>
    <div class="feedback-item" v-if="feedbackItem">
        <div class="upvotes" @click="$emit('upvote')">
            <div class="icon">
                <fa icon="angle-up" />
            </div>
            <span class="upvotes-count">{{feedbackItem.upvotes}}</span>
        </div>
        <div class="feedback-text">
            <h3>{{feedbackItem.title}}</h3>
            <span>{{feedbackItem.description}}</span>
        </div>
        <div class="comments">
            <div class="icon">
                <fa icon="comment" />
            </div>
            <span class="comments-count">{{feedbackItem.comments}}</span>
        </div>
    </div>
</template>

<script>
export default {
   props: {
       feedbackItem: Object,
   }
}
</script>

<style lang="sass" scoped>
.feedback-item
    display: flex
    padding: 30px 20px
    align-items: center
    background: white
    border-radius: 20px
    margin: 20px 0
    @media (min-width: 1200px)
        width: 800px
    .upvotes
        cursor: pointer
        background: #ecf0f7
        padding: 10px
        border-radius: 10px
        margin-right: 30px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: space-between
        width: 20px
        user-select: none
        .icon
            color: #98a1c9
        span
            font-size: 13px
            font-weight: bold
            color: #67647e
    .feedback-text
        margin: 0 8px
        h3
            color: #67647e
            margin-bottom: 10px
            @media (max-width: 1200px)
                font-size: 17px
        span
            color: #a5a8b1
    .comments
        margin-left: auto
        display: flex
        user-select: none
        .icon
            color: #d8d7ee
        span
            margin-left: 10px
            color: #67647e
            font-weight: bold
</style>