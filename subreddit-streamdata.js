var streamdataio = require('streamdataio-js-sdk')
var applyReducer = require('fast-json-patch').applyReducer

var key = 'ODRlZDNmYmUtMDAxZC00NWJmLTgwMzQtNTkzMWJiYjFhYjVj'

var endpoints = {
  random: 'https://www.reddit.com/r/random.json'
}

function redditStore (state, emitter) {
  state.subreddits = []
  var subreddit = {}

  var stream = streamdataio.createEventSource(endpoints.random, key)

  stream
    .onData(function (data) {
      // initialize your data with the initial snapshot
      console.log('data', data)
      subreddit = data
      state.subreddits.push(subreddit)
      emitter.emit('render')
    })
    .onPatch(function (patch) {
      // update the data with the provided patch
      console.log('patch', patch)
      var sub = patch.reduce(applyReducer, subreddit)
      state.subreddits.push(sub)
    })
    .onError(function (error) {
      console.error(error)
      stream.close()
    })
    .onOpen(function () {
      console.log('opened stream')
    })

  stream.open()
}

module.exports = redditStore
