interface AwCalendarSimple extends HTMLElement {
	/**
	 * @method	_get_date
	 * 
	 * Return selected date at calendar
	 */
	get_date() : {
		name: string,
		year: number,
		month: number,
		day: number,
		hour: number,
		minute: number,
		string: string,
		date: Date,
		format: {
			long: string,
			longDay: string,
			longFull: string,
			longHour: string,
			numeric: string,
			numericHour: string,
			short: string,
			shortDay: string,
			shortFull: string,
			shortHour: string,
		}
	};

	/**
	 * @method	reset
	 * 
	 * Reset the calendar to its initial state
	 */
	reset() : void;

	/**
	 * @method	set_date
	 * 
	 * Assign a given date to the calendar
	 * 
	 * @param {string} date Date that we want to activate in the calendar
	 */
	set_date( date: string ) : void;
}


declare var AwCalendarSimple: {
	prototype: AwCalendarSimple,
	new(): AwCalendarSimple
}

interface HTMLElementTagNameMap {
	"aw-calendar-simple": AwCalendarSimple;
}
