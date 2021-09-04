<template>
  <div id="app">
    <ContainerWithTitle title="Feedback Board" />
    <FeedbackBoard 
      :feedbackItems="feedbackItems"
      :sortSelectedOption="sortSelectedOption"
      @set-sort-option="sortSelectedOption = $event"
      @upvote="upvoteFeedbackItem($event)" />
  </div>
</template>

<script>
import ContainerWithTitle from "@/components/ContainerWithTitle"
import FeedbackBoard from "@/components/FeedbackBoard"
import { MOST_UPVOTES, MOST_COMMENTS } from "@/constants/sortOptions"
const LOCAL_STORAGE_KEY = 'task-z_local_data';

export default {
  components: {
    ContainerWithTitle,
    FeedbackBoard,
  },
  mounted() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedData) {
      const { sortSelectedOption, feedbackItems } = JSON.parse(savedData);
      this.sortSelectedOption = sortSelectedOption
      this.feedbackItems = feedbackItems; 
    }
    this.sortFeedbackItems()
  },
  data() {
    return {
      sortSelectedOption: MOST_UPVOTES,
      feedbackItems: [
        {
          title: 'Add tags for solutions',
          description: 'Easier to search for solutions based on a specific stack.',
          upvotes: 112,
          comments: 2,
        },
        {
          title: 'Add a dark theme option',
          description: 'It would help people with light sensitivities and who prefer dark mode.',
          upvotes: 99,
          comments: 4,
        },
        {
          title: 'Q&A within the challenge hubs',
          description: 'Challenge specific Q&A would make for easy reference.',
          upvotes: 65,
          comments: 1,
        },
      ],
    }
  },
  methods: {
    upvoteFeedbackItem(feedbackIndex) {
      this.feedbackItems[feedbackIndex].upvotes++
    },
    sortFeedbackItems() {
      const value = this.sortSelectedOption
      if (value === MOST_UPVOTES) {
        this.feedbackItems.sort((a, b) => b.upvotes - a.upvotes)
      } else if (value === MOST_COMMENTS) {
        this.feedbackItems.sort((a, b) => b.comments - a.comments)
      }
    },
    storeDataToLocalStorage() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        sortSelectedOption: this.sortSelectedOption,
        feedbackItems: this.feedbackItems,
      }))
    }
  },
  watch: {
    sortSelectedOption() {
      this.sortFeedbackItems()
      this.storeDataToLocalStorage()
    },
    feedbackItems: {
      handler: function () {
        this.storeDataToLocalStorage()
      },
      deep: true,
    }
  },
}
</script>

<style lang="sass">
#app 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  display: flex
  justify-content: center
  margin-top: 150px
  @media (max-width: 1200px)
    flex-direction: column
    padding: 10px

#app, body
  background: #f9fafd
</style>
