var streamdataio = require('streamdataio-js-sdk')
var jsonpatch = require('fast-json-patch')

var key = 'ODRlZDNmYmUtMDAxZC00NWJmLTgwMzQtNTkzMWJiYjFhYjVj'

var endpoints = {
  random: 'https://www.reddit.com/r/subreddit/random.json'
}

function redditStore (state, emitter) {
  state.subreddit = {}

  var randomSubreddit = streamdataio.createEventSource(endpoints.random, key)

  randomSubreddit
    .onData(function (data) {
      // initialize your data with the initial snapshot
      console.log('data', data)
      state.subreddit = data
    })
    .onPatch(function (patch) {
      // update the data with the provided patch
      console.log('patch', patch)
      state.subreddit = patch.reduce(jsonpatch.applyReducer, state.subreddit)
      // randomSubreddit.close()
    })
    .onError(function (error) {
      console.error(error)
      randomSubreddit.close()
    })
    .onOpen(function () {
      console.log('opened stream')
    })

  randomSubreddit.open()
}

module.exports = redditStore
