/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random character from the below options.
 * @returns {string} A single character.
 */
export function getRandomChar() {
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
export function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
}
