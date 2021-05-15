class CSSFunction {
	constructor(func, name = func.name) {
		name = name.replace(/[^A-Za-z0-9_-]/g, "");

		this.func = func;
		this.name = name;
		this.regex = new RegExp(`(?<=(?::|,|\\()\\s*)${name}\\s*\\(\\s*(.*?)\\s*\\)(?=\\s*(?:;|,|!|\\b|$|}))`, "g");
	}
}

function generateVariables(element, CSS_Functions) {
	const varChanges = [];
	let variable = 0;
	let newContent = element.textContent;
	newContent = newContent.replace(/var\(--.+\)\/\*func_origin=(.+?)\*\//g, "$1");

	for (const cssFunc of CSS_Functions) {
		newContent = newContent.replace(cssFunc.regex, (str, args, index) => {
			const value = () => cssFunc.func(args),
				varName = "--func_" + (variable++).toString(36);

			varChanges.push([varName, value]);
			return `var(${varName})/*func_origin=${str}*/`;
		});
	}

	element.textContent = newContent;
	return varChanges;
}

function updateVariables(varChanges) {
	for (const [varName, value] of varChanges) {
		document.body.style.setProperty(varName, value());
	}
}
