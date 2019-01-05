browser.storage.local.get().then(store => {
	let javascript = store[location.host]

	if (!javascript) {
		return
	}

	let script = document.createElement('script')
	script.textContent = javascript
	document.body.append(script)
})
