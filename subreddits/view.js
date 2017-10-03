var html = require('choo/html')
var has = require('has-deep')

module.exports = view

function view (state, emit) {
  var subreddit = has(state.subreddits.pop(), 'data.children[0].data.subreddit_name_prefixed') || 'getting data'
  if (state.stream === 'closed') emit('stream:open')

  return html`
    <section class="subreddit">
      <h1 class="f-headline pa3 pa4-ns">
        ${subreddit}
      </h1>
      <a class="f6 link dim ph3 pv2 mb2 dib white bg-dark-red" onclick=${next}>Skip</a>
      <a class="f6 link dim ph3 pv2 mb2 dib white bg-light-green" onclick=${next}>Subscribe</a>
    </section>
  `

  function next () {
    if (!state.subreddits.length) state.stream = 'closed'
    emit('render')
  }
}
