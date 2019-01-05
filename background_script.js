browser.runtime.onMessage.addListener(message => {
	let {
		idea,
		charge
	} = message

	if (idea == 'person did a do') {
		let {
			host,
			javascript
		} = charge

		browser.storage.local.set({
			[host]: javascript
		})
	}
})
