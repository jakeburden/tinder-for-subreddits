var has = require('has-deep')

function redditStore (state, emitter) {
  var initial = true
  state.subreddits = []
  state.stream = 'open'

  var subreddit = {}
  var prefixPath = 'data.children[0].data.subreddit_name_prefixed'

  if (state.subreddits.length === 50) {
    emitter.emit('stream:close') // close after 50 subreddits are queued
    state.stream = 'closed'
  }

  emitter.on('data', function () {
    subreddit = state.source
    state.subreddits.push(subreddit)
    if (initial) {
      state.subreddit = has(subreddit, prefixPath)
      initial = false
    }
    emitter.emit('render')
  })

  emitter.on('next', function () {
    // state.subreddits.shift()
    if (!state.subreddits.length) state.subreddit = null
    if ((state.subreddits.length < 3) || state.stream === 'closed') {
      emitter.emit('stream:open')
      state.stream = 'open'
      state.subreddits = []
      state.subreddit = {}
    }
    state.subreddit = has(state.subreddits.shift(), prefixPath)
    emitter.emit('render')
  })

  if (!state.subreddits.length) {
    emitter.emit('stream:open')
  }
}

module.exports = redditStore
