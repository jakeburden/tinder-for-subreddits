var html = require('choo/html')
var has = require('has-deep')

var TITLE = '🚂🚋🚋'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  var subreddit = has(state.subreddit, 'data.children[0].data.subreddit_name_prefixed') || 'getting data'

  return html`
    <body class="sans-serif">
      <h1 class="f-headline pa3 pa4-ns">
        ${subreddit}
      </h1>
    </body>
  `
}
