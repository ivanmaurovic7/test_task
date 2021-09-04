<template>
  <div class="feedback-board">
    <SortAndFilter
     :sortSelectedOption="sortSelectedOption"
     @set-sort-option="$emit('set-sort-option', $event)" />
    <div class="feedback-items">
      <FeedbackItem
        v-for="(feedbackItem, i) in feedbackItems" 
        :key="i" 
        :feedbackItem="feedbackItem"
        @upvote="$emit('upvote', i)" />
    </div>
  </div>
</template>

<script>
import SortAndFilter from "@/components/SortAndFilter"
import FeedbackItem from "@/components/FeedbackItem"
export default {
  props: {
    feedbackItems: Array,
    sortSelectedOption: String,
  },
  components: {
    SortAndFilter,
    FeedbackItem,
  },
}
</script>

<style lang="sass" scoped>
.feedback-board
  @media (max-width: 1200px)
    margin-top: 35px
  @media (min-width: 1200px)
    margin-left: 35px
</style>
