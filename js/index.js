/**
 * @format
 * @description This is the main JS file that runs the portfolio page.
 *      You can find the deployemnt at: https://smithjl-personal.github.io/portfolio/
 */

import { getRandomInt, getRandomChar, setCharAt } from "./modules/general.js";

/**
 * This is the main function, it is called after page load.
 */
function main() {
	initFadeIn();
	initJumblers();
	initSmoothScrollers();
	initNavbarLinkHighlighting();
	initNavbarToggling();
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

/**
 * Initializes scroll event listener to update the highlighted main navbar links.
 */
function initNavbarLinkHighlighting() {
	const navbar = document.getElementById("main-nav");
	if (navbar === null) {
		throw Error(
			"Could not find the navbar on the document. Did you remove/rename it? Looking for ID `main-nav`."
		);
	}

	const navbarHeight = navbar.offsetHeight + 1;
	const links = navbar.querySelectorAll("a");
	const sections = document.querySelectorAll("section");

	if (!links.length) {
		throw Error("No links found on the main navbar. Looking for all `a` tags.");
	}
	if (!sections.length) {
		throw Error(
			"No sections found that correspond to navbar links. Looking for all `section` tags."
		);
	}

	// Track the closest section outside of the event listener.
	let closestSectionID = null;
	window.addEventListener("scroll", function () {
		// Get container scroll position
		const scrollDistanceFromTop = window.pageYOffset + navbarHeight + 40;

		// Get the closest section. Assume it is the first.
		let closestSection = sections[0];
		let closestSectionDistance = Math.abs(closestSection.offsetTop - scrollDistanceFromTop);
		for (const section of sections) {
			const sectionDistance = Math.abs(section.offsetTop - scrollDistanceFromTop);
			if (sectionDistance < closestSectionDistance) {
				closestSection = section;
				closestSectionDistance = sectionDistance;
			}
		}

		// If the link is the same, early exit.
		if (closestSection.id === closestSectionID) {
			return;
		}

		// Otherwise, update the link.
		closestSectionID = closestSection.id;
		for (const link of links) {
			link.classList.remove("active");
			if (link.getAttribute("href") === `#${closestSectionID}`) {
				link.classList.add("active");
			}
		}
	});
}

function initNavbarToggling() {
	const navbar = document.getElementById("main-nav");
	if (navbar === null) {
		throw Error("Tried to toggle navbar when it could not be found on the dom.");
	}

	// Find the menu icon.
	const menuIcon = navbar.querySelector("a.menu-toggle");
	if (menuIcon === null) {
		throw Error(
			"Could not find the menu icon on the dom, so could not attach click event listener."
		);
	}

	// When the icon is clicked, toggle expand/collapse.
	menuIcon.addEventListener("click", function () {
		if (navbar.classList.contains("collapsed")) {
			navbar.classList.remove("collapsed");
		} else {
			navbar.classList.add("collapsed");
		}
	});

	// When any other link is clicked, collapse the navbar if it is expanded.
	const navLinks = navbar.querySelectorAll("a.nav-link");
	for (const link of navLinks) {
		link.addEventListener("click", function () {
			// TODO: Fix this timeout issue. If we add the class,
			// element dissapears while scrolling, messing up scroll destination.
			if (!navbar.classList.contains("collapsed")) {
				setTimeout(() => {
					navbar.classList.add("collapsed");
				}, 750);
			}
		});
	}
}

main();
