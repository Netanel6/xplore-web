// utils/timeUtils.js
/**
 * Converts a time value from various units to milliseconds.
 *
 * @param {number} value The numerical value of the time.
 * @param {"hours" | "minutes" | "seconds"} unit The unit of time ('hours', 'minutes', or 'seconds').
 * @returns {number} The time value in milliseconds.
 * @throws {Error} If an invalid unit is provided.
 */
export const convertToMilliseconds = (value, unit) => {
  switch (unit) {
      case "hours":
          return value * 60 * 60 * 1000;
      case "minutes":
          return value * 60 * 1000;
      case "seconds":
          return value * 1000;
      default:
          throw new Error(`Invalid time unit: ${unit}`);
  }
};

/**
* Formats a duration in milliseconds into a human-readable string.
*
* @param {number} milliseconds The duration in milliseconds.
* @param {object} [options] Optional configuration for the formatting.
* @param {boolean} [options.leadingZeros=false] Whether to pad numbers with leading zeros.
* @param {boolean} [options.showZeroSeconds=true] Whether show 0 seconds, in case the provided value is 0.
* @returns {string} The formatted time string.
*/
export const formatTime = (milliseconds, options = {}) => {
if (milliseconds < 0) {
  return "Invalid input: Time cannot be negative.";
}

const { leadingZeros = false, showZeroSeconds = true } = options;

// Default units (Hebrew)
const defaultUnits = { hours: "שעות", minutes: "דקות", seconds: "שניות" };

const totalSeconds = Math.floor(milliseconds / 1000); // Correctly convert to seconds
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

const formattedParts = [];

const pad = (num) => (leadingZeros ? String(num).padStart(2, "0") : String(num));

if (hours > 0) {
  formattedParts.push(`${pad(hours)} ${defaultUnits.hours}`);
}
if (minutes > 0) {
  formattedParts.push(`${pad(minutes)} ${defaultUnits.minutes}`);
}
if (seconds > 0 || (showZeroSeconds && hours === 0 && minutes === 0)) {
  formattedParts.push(`${pad(seconds)} ${defaultUnits.seconds}`);
}

return formattedParts.join(" ");
};


/**
* Determines the most appropriate time unit (hours, minutes, or seconds) for a given duration in milliseconds.
*
* @param {number} milliseconds The duration in milliseconds.
* @returns {"hours" | "minutes" | "seconds"} The recommended time unit.
*/
export const getInitialTimeUnit = (milliseconds) => {
if (milliseconds >= convertToMilliseconds(1, "hours")) {
  return "hours";
} else if (milliseconds >= convertToMilliseconds(1, "minutes")) {
  return "minutes";
} else {
  return "seconds";
}
};