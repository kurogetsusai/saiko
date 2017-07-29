import colors from 'colors';
import * as tools from './tools.js';

export default class Logger {
	/** Creates a new Logger object.
	 * @param {object} options - logging options
	 * @param {boolean} [options.enabled=true] - enables logging
	 * @param {boolean} [options.showDebug=false] - show debug messages
	 * @param {boolean} [options.showWarnings=true] - show warning messages
	 * @param {boolean} [options.showErrors=true] - show error messages
	 * @param {boolean} [options.showPanics=true] - show panic messages
	 * @returns {Logger} - a Logger object */
	constructor({enabled, showDebug, showWarnings, showErrors, showPanics}) {
		this.enabled      = enabled      !== false;
		this.showDebug    = showDebug    === true;
		this.showWarnings = showWarnings !== false;
		this.showErrors   = showErrors   !== false;
		this.showPanics   = showPanics   !== false;
	}

	/** Enables logging.
	 * @returns {void} */
	enable() {
		this.debug('Logger', 'Logging enabled.');
		this.enabled = true;
	}

	/** Disables logging.
	 * @returns {void} */
	disable() {
		this.debug('Logger', 'Logging disabled');
		this.enabled = false;
	}

	/** Formats a module name used in the logging functions.
	 * @param {string} moduleName - the module name to be formatted
	 * @returns {string} - formatted module name */
	formatModuleName(moduleName) {
		return ` ${moduleName} `.bgBlack.white.replace(/(#|\.)/g, '$&'.cyan);
	}

	/** Logs a debug message.
	 * @param {moduleName} - name of the module, which generated the message
	 * @param {string} text - text of the message
	 * @returns {void} */
	debug(moduleName, text) {
		if (!this.enabled || !this.showDebug)
			return;

		const status = ' Debug '.bgCyan.black;
		const module = this.formatModuleName(moduleName);

		console.log(`${status}${module} ${text}\n`);
	}

	/** Logs a warning message.
	 * @param {moduleName} - name of the module, which generated the message
	 * @param {string} text - text of the message
	 * @returns {void} */
	warn(moduleName, text) {
		if (!this.enabled || !this.showWarnings)
			return;

		const status = ' Warning '.bgYellow.black;
		const module = this.formatModuleName(moduleName);

		console.warn(`${status}${module} ${text}\n`);
	}

	/** Logs an error message.
	 * @param {moduleName} - name of the module, which generated the message
	 * @param {string} text - text of the message
	 * @param {...Error} errors - errors to be logged
	 * @returns {void} */
	error(moduleName, text, ...errors) {
		if (!this.enabled || !this.showErrors)
			return;

		const status = ' Error '.bgRed.white;
		const module = this.formatModuleName(moduleName);

		console.error(`${status}${module} ${text}`);
		errors.forEach(error => console.error(error));
		console.error('');
	}

	/** Logs a panic message.
	 * @param {moduleName} - name of the module, which generated the message
	 * @param {string} text - text of the message
	 * @param {...Error} errors - errors to be logged
	 * @returns {void} */
	panic(moduleName, text, ...errors) {
		if (!this.enabled || !this.showPanics)
			return;

		const status = ' Panic '.bgRed.white;
		const module = this.formatModuleName(moduleName);

		console.error(`${status}${module} ${text}`);
		errors.forEach(error => console.error(error));
		console.error('');
		process.exit(1);
	}
}
