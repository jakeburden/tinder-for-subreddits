var html = require('choo/html')

module.exports = view

function view (state, emit) {
  if (state.subreddit) {
    return html`
      <section class="subreddit">
        <h1 class="f-headline pa3 pa4-ns">
          ${state.subreddit}
        </h1>
        <a class="f6 link dim ph3 pv2 mb2 dib white bg-dark-red pointer" onclick=${next}>Skip</a>
        <a class="f6 link dim ph3 pv2 mb2 dib white bg-light-green pointer" onclick=${next}>Subscribe</a>
      </section>
    `
  } else {
    return html`
      <section class="subreddit">
        <h1 class="f-headline pa3 pa4-ns">getting data...</h1>
      </section>
    `
  }

  function next () {
    emit('next')
  }
}
