/**
	@type {HTMLTextAreaElement}
*/
let textarea = document.getElementById("textarea")
let saveButton =document.getElementById("save-button")
let parseErrorElement = document.getElementById("parse-error")
let doneMessageElement = document.getElementById("done-message")

let editor = CodeMirror.fromTextArea(textarea, {
	lineNumbers: true,
	mode: "application/json",
	matchBrackets: true,
	tabSize: 2,
	indentWithTabs: true,
	lint: CodeMirror.lint.json,
	theme: "cobalt"
})

browser.storage.local.get().then(storage => {
	 editor.setValue(JSON.stringify(storage, null, "\t"))
})

function hide(element) {
	element.setAttribute("hidden", "hidden")
}

function show(element) {
	element.removeAttribute("hidden")
}


saveButton.addEventListener("click", async () => {
	hide(doneMessageElement)
	hide(parseErrorElement)
	try {
		let config = JSON.parse(editor.getValue())
		await browser.storage.local.clear()
		await browser.storage.local.set(config)
      show(doneMessageElement)
	} catch (error) {
		show(parseErrorElement)
	}
})
