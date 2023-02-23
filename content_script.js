function id() {
	return `javascript.chee.${location.host}`
}

function inject() {
	browser.storage.local.get().then(store => {
		let javascript = store[location.host]

		if (!javascript) {
			return
		}

		let script = document.createElement("script")
		script.id = id()
		script.textContent = javascript
		document.body.append(script)
	})
}

inject()

browser.runtime.onMessage.addListener(request => {
	if (request.rerun) {
		let script = document.getElementById(id())
		if (script) {
			document.body.removeChild(script)
		}
		inject()
	}
})
