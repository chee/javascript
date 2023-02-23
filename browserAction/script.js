let javascript = document.getElementById("javascript")
let lettersButton = document.getElementById("letters-js")
let rerunButton = document.getElementById("rerun")

rerunButton.addEventListener("click", async () => {
	let [tab] = await browser.tabs.query({
		currentWindow: true,
		active: true,
	})
	await browser.tabs.sendMessage(tab.id, {rerun: true})
})

lettersButton.addEventListener("click", () => {
	browser.runtime.openOptionsPage()
	window.close()
})

let editor = CodeMirror.fromTextArea(javascript, {
	lineNumbers: true,
	mode: "application/javascript",
	matchBrackets: true,
	tabSize: 2,
	indentWithTabs: true,
	theme: "monokai"
})

let defaultCode = `\
// enter some javascript here and it will run
// on every page on this domain (location.host)
`

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

getHost().then(async () => {
	let store = await browser.storage.local.get()
	let code = store[await getHost()] || defaultCode
	editor.setValue(code)
})

editor.on("change", async (editor) => {
	let host = await getHost()
	await browser.storage.local.set({
		[host]: editor.getValue()
	})
})
