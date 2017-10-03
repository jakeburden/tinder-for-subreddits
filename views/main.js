var html = require('choo/html')

var subreddit = require('../subreddits/view.js')

var TITLE = '🚂🚋🚋'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif">
      ${subreddit(state, emit)}
    </body>
  `
}
