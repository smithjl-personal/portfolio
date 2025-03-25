/**
 * @format
 * @description This is the main JS file that runs the portfolio page.
 *      You can find the deployemnt at: https://smithjl-personal.github.io/portfolio.github.io/
 */

/**
 * This is the main function, it is called after page load.
 */
function main() {
	initFadeIn();
	initJumblers();
}

/**
 * Initializes elements that should fade in.
 */
function initFadeIn() {
	const elements = document.querySelectorAll(".fade-in");
	for (const el of elements) {
		el.classList.add("visible");
	}
}

/**
 * Initializes elements that should jumble.
 */
function initJumblers() {
	// Get all elements we should jumble.
	const elements = document.querySelectorAll(".jumbled");

	// For each element we should jumble...
	for (const el of elements) {
		// Track the target text.
		const targetText = el.innerHTML;

		// For each character in it...
		for (let i = 0; i < targetText.length; i++) {
			// Keep track of what the character should end up as, then do an initial jumble.
			const finalChar = targetText[i];
			el.innerHTML = setCharAt(el.innerHTML, i, getRandomChar());

			// Set some variables that determine the jumble rate and duration.
			const charChangeRate = getRandomInt(250, 500);
			const charChangeDuration = getRandomInt(150, 1750);

			// Jumble! Store a reference to the interval so we can stop it.
			const jumbleInterval = setInterval(() => {
				el.innerHTML = setCharAt(el.innerHTML, i, getRandomChar());
			}, charChangeRate);

			// Stop the interval, and update character to it's destination.
			setTimeout(() => {
				clearInterval(jumbleInterval);
				el.innerHTML = setCharAt(el.innerHTML, i, finalChar);
			}, charChangeDuration);
		}
	}
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random character from the below options.
 * @returns {string} A single character.
 */
function getRandomChar() {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	const index = Math.floor(Math.random() * chars.length);
	return chars.charAt(index);
}

/**
 * Strings are immutable in JavaScript. This function is a workaround that allows replacement of a character
 * at a given position in a string.
 * @param {string} str The input string.
 * @param {number} index The index of the string we are 'mutating'.
 * @param {string} chr Single character that we are replacing in the string.
 * @returns {string} The new modified string.
 */
function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
}

main();
