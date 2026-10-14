<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-pa-md">
        <!-- Back Button -->
        <q-btn
          @click="$router.back()"
          flat
          round
          dense
          icon="fas fa-arrow-left"
          class="q-mb-md"
        />

        <!-- Loading State -->
        <div v-if="loading" class="text-center q-py-lg">
          <q-spinner color="primary" size="50px" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center q-py-lg">
          <q-icon name="fas fa-exclamation-circle" size="50px" color="negative" />
          <p class="text-h6 q-mt-md">{{ error }}</p>
          <q-btn
            @click="$router.push('/')"
            color="primary"
            label="Back to Home"
            rounded
            unelevated
            no-caps
          />
        </div>

        <!-- Qweet Detail -->
        <div v-else-if="qweet" class="qweet-detail">
          <div class="row items-start q-gutter-md q-mb-lg">
            <q-avatar size="xl">
              <img src="https://s.gravatar.com/avatar/ce7f3697e231df38b3ca6065848520da?s=80">
            </q-avatar>
            <div class="col">
              <q-item-label class="text-subtitle1">
                <strong>Danny Connell</strong>
                <span class="text-grey-7">@danny__connell</span>
              </q-item-label>
              <q-item-label class="text-grey-7 text-caption">
                {{ qweet.date | relativeDate }}
              </q-item-label>
            </div>
          </div>

          <q-item-label class="qweet-content text-h6 q-mb-lg">
            {{ qweet.content }}
          </q-item-label>

          <q-separator class="q-my-md" />

          <!-- Qweet Actions -->
          <div class="qweet-icons row justify-between q-my-md">
            <q-btn
              color="grey"
              icon="far fa-comment"
              size="sm"
              flat
              round
            />
            <q-btn
              color="grey"
              icon="fas fa-retweet"
              size="sm"
              flat
              round
            />
            <q-btn
              @click="toggleLiked"
              :color="qweet.liked ? 'pink' : 'grey'"
              :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
              size="sm"
              flat
              round
            />
            <q-btn
              @click="deleteQweet"
              color="grey"
              icon="fas fa-trash"
              size="sm"
              flat
              round
            />
          </div>

          <q-separator class="q-my-md" />

          <!-- Qweet ID -->
          <div class="text-caption text-grey-7 q-mt-lg">
            <strong>ID:</strong> {{ qweet.id }}
          </div>
        </div>

        <!-- Not Found State -->
        <div v-else class="text-center q-py-lg">
          <q-icon name="fas fa-search" size="50px" color="grey-5" />
          <p class="text-h6 q-mt-md">Qweet not found</p>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'

export default {
  name: 'PageQweetDetail',
  data() {
    return {
      qweet: null,
      loading: true,
      error: null
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date())
    }
  },
  methods: {
    fetchQweetById(id) {
      this.loading = true
      this.error = null
      
      db.collection('qweets').doc(id).get()
        .then(doc => {
          if (doc.exists) {
            this.qweet = doc.data()
            this.qweet.id = doc.id
            console.log('Qweet found:', this.qweet)
          } else {
            this.error = 'Qweet not found'
            console.log('No qweet with ID:', id)
          }
        })
        .catch(error => {
          this.error = 'Error loading qweet: ' + error.message
          console.error('Error fetching qweet:', error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    toggleLiked() {
      if (!this.qweet) return
      
      db.collection('qweets').doc(this.qweet.id).update({
        liked: !this.qweet.liked
      })
        .then(() => {
          this.qweet.liked = !this.qweet.liked
          console.log('Qweet liked status updated')
        })
        .catch(error => {
          console.error('Error updating qweet:', error)
        })
    },
    deleteQweet() {
      if (!this.qweet) return
      
      this.$q.dialog({
        title: 'Delete Qweet',
        message: 'Are you sure you want to delete this qweet?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        db.collection('qweets').doc(this.qweet.id).delete()
          .then(() => {
            console.log('Qweet deleted successfully')
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error deleting qweet:', error)
          })
      })
    }
  },
  mounted() {
    const qweetId = this.$route.params.id
    if (qweetId) {
      this.fetchQweetById(qweetId)
    } else {
      this.error = 'No qweet ID provided'
      this.loading = false
    }
  }
}
</script>

<style lang="sass" scoped>
.qweet-detail
  max-width: 600px
  margin: 0 auto

.qweet-content
  white-space: pre-line
  line-height: 1.5

.qweet-icons
  margin-left: -5px
</style>
