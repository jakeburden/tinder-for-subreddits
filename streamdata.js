var streamdataio = require('streamdataio-js-sdk')
var applyReducer = require('fast-json-patch').applyReducer

var key = 'ODRlZDNmYmUtMDAxZC00NWJmLTgwMzQtNTkzMWJiYjFhYjVj'

function source (state, emitter) {
  return function (url) {
    var stream = streamdataio.createEventSource(url, key)

    stream
      .onData(function (data) {
        // initialize your data with the initial snapshot
        console.log('data', data)
        state.source = data
      })
      .onPatch(function (patch) {
        // update the data with the provided patch
        console.log('patch', patch)
        state.source = patch.reduce(applyReducer, state.source)
      })
      .onError(function (error) {
        console.error(error)
        stream.close()
      })
      .onOpen(function () {
        console.log('opened stream')
      })

    emitter.on('DOMContentLoaded', function () {
      stream.open()
    })

    emitter.on('stream:close', function () {
      stream.close()
    })

    emitter.on('stream:open', function () {
      stream.open()
    })
  }
}

module.exports = source
