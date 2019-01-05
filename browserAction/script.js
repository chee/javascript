let javascript = document.getElementById('javascript')
let defaultCode =
`// enter some
// javascript here
// and it will
// run on every page
// on this domain (location.host)`

async function getActiveTab () {
  let tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  })

  return tabs[0]
}

async function getHost () {
  let {url} = await getActiveTab()
  let {host} = new URL(url)
  return host
}

getHost().then(async host => {
  let store = await browser.storage.local.get()
  let code = store[await getHost()] || defaultCode
  javascript.value = code
})

javascript.addEventListener('input', async event => {
  let host = await getHost()
  browser.storage.local.set({
    [host]: javascript.value
  })
})
