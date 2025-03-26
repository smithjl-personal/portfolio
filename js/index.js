/**
 * @format
 * @description This is the main JS file that runs the portfolio page.
 *      You can find the deployemnt at: https://smithjl-personal.github.io/portfolio.github.io/
 */

import { getRandomInt, getRandomChar, setCharAt } from "./modules/general.js";

/**
 * This is the main function, it is called after page load.
 */
function main() {
	initFadeIn();
	initJumblers();
	initSmoothScrollers();
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
			const charChangeRate = getRandomInt(150, 500);
			const charChangeDuration = getRandomInt(150, 2000);

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
 * Initialize elements that have the smooth-scroll class. To make them... well... scroll smoothly.
 */
function initSmoothScrollers() {
	const elements = document.querySelectorAll("a.smooth-scroll");
	for (const el of elements) {
		el.addEventListener("click", function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		});
	}
}

main();
