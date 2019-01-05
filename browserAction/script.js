
let javascript = document.getElementById("javascript")

let editor = CodeMirror.fromTextArea(javascript, {
	lineNumbers: true,
	mode: "application/javascript",
	matchBrackets: true,
	tabSize: 2,
	indentWithTabs: true,
	lint: CodeMirror.lint.javascript,
	theme: "gruvbox-dark"
})

editor.setOption("lint", {
	options: {
		esversion: 6
	}
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

getHost().then(async (host) => {
	let store = await browser.storage.local.get()
	let code = store[await getHost()] || defaultCode
	editor.setValue(code)
})

editor.on("change", async (editor) => {
	let host = await getHost()
	browser.storage.local.set({
		[host]: editor.getValue()
	})
})
