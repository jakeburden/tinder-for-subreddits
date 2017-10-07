var streamdataio = require('streamdataio-js-sdk')
var applyReducer = require('fast-json-patch').applyReducer

var key = 'ODRlZDNmYmUtMDAxZC00NWJmLTgwMzQtNTkzMWJiYjFhYjVj'

function source (url) {
  return function (state, emitter) {
    var stream = streamdataio.createEventSource(url, key)

    stream
      .onData(function (data) {
        // initialize your data with the initial snapshot
        console.log('data', data)
        state.initial = true
        state.source = data
        emitter.emit('data')
      })
      .onPatch(function (patch) {
        // update the data with the provided patch
        console.log('patch', patch)
        state.source = patch.reduce(applyReducer, state.source)
        emitter.emit('data')
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
