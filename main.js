const mouse = {x: 0, y: 0};
	
const css_vars = generateVariables(document.querySelector("style.functions"), [
	new CSSFunction(() => `hsl(${mouse.x / (window.innerWidth / 2) * 360}deg 100% 50%)`, "rainbow"),
	new CSSFunction(offset => mouse.x - offset + "px", "mouseX"),
	new CSSFunction(offset => mouse.y - offset + "px", "mouseY")
]);
	
document.addEventListener("mousemove", ({clientX, clientY}) => {
	mouse.x = clientX;
	mouse.y = clientY;
	updateVariables(css_vars);
}, {passive: true});