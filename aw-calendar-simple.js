import { PolymerElement, html, Polymer }		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwExternsFunctionsMixin } 				from "../aw_extern_functions/aw-extern-functions-mixin.js"

import "../aw_polymer_3/iron-icons/iron-icons.js";

class AwCalendarSimple extends AwExternsFunctionsMixin( PolymerElement ) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					font-family: "arial";
					display: block;
					width: 300px;
				}

				:host([unresolved]) {
					display: none;
				}

				/* #region Seleccionables del calendario */

				.tit_selectable_hour_cal {
					position: relative;
					text-align: center;
					font-size: var(--aw-calendar-hour-tit-selectable-font-size,14px);
					font-weight: var(--aw-calendar-hour-tit-selectable-font-weight,normal);
					font-style: var(--aw-calendar-hour-tit-selectable-font-style,oblique);
					color: var(--aw-calendar-hour-tit-selectable-color,#888888);
					padding: 10px 0 3px;
				}

				.cont_slider_selectable_cal {
					position: relative;
					max-width: var(--aw-calendar-selectables-max-width,76px);
					margin: 0 auto;
					margin-bottom: 2px;
				}

				.cont_slider_selectable_cal .slider {
					position: relative;
					overflow: hidden;
				}

				.cont_slider_selectable_cal .slider > div {
					position: absolute;
					width: 100%;
					text-align: center;
					top: 0px;
					left: 100%;
					opacity: 0;
					font-size: var(--aw-calendar-selectable-font-size,14px);
					font-style: var(--aw-calendar-selectable-font-style,oblique);
					font-family: var(--aw-calendar-selectable-font-family,var(--aw-font-family,"arial"));
					font-weight: var(--aw-calendar-selectable-font-weight,normal);
					padding: 3px 0;
					color: var(--aw-calendar-selectable-color,var(--aw-primary-text-color,#333333));
				}
				.cont_slider_selectable_cal .slider > div input {
					color: var(--aw-calendar-selectable-color,var(--aw-primary-text-color,#333333));
					font-family: var(--aw-calendar-selectable-font-family,var(--aw-font-family,"arial"));
					font-size: var(--aw-calendar-selectable-font-size,14px);
					font-style: var(--aw-calendar-selectable-font-style,oblique);
					font-weight: var(--aw-calendar-selectable-font-weight,normal);
				}

				.cont_slider_selectable_cal .slider > div[active] {
					position: relative;
					left: 0;
					opacity: 1;
				}

				.cont_slider_selectable_cal iron-icon {
					position: absolute;
					top: 0;
					left: -24px;
					fill: var(--aw-calendar-icon-fill,#777777);
					cursor: pointer;
					transition: fill .3s;
				}
				.cont_slider_selectable_cal iron-icon.right {
					left: auto;
					right: -24px;
				}
				.cont_slider_selectable_cal iron-icon:hover {
					fill: var(--aw-calendar-icon-fill-hover,var(--aw-primary-color,#999999));
				}
				.cont_slider_selectable_cal input {
					padding: 0px;
					margin: 0px;
					text-align: center;
					width: 100%;
					border: solid 1px transparent;
					transition: all .2s;
					box-sizing: border-box;
				}
				.cont_slider_selectable_cal input:focus {
					background-color: var(--aw-calendar-input-background-color-focused,#F6F6F6);
					border-color: var(--aw-calendar-input-border-color-focused,#DDDDDD);
					color: var(--aw-calendar-input-color-focused,var(--aw-calendar-selectable-color,var(--aw-primary-text-color,#333333)));
					outline: 0;
				}
				.list_slider_selectable_cal {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					z-index: 2;
					box-shadow: 0 0 2px #444444;
					display: none;
				}
				.list_slider_selectable_cal > div {
					padding: var(--aw-calendar-list-padding,3px);
					color: var(--aw-calendar-list-color,var(--aw-primary-text-color,#333333));
					background-color: var(--aw-calendar-list-background-color,white);
					font-size: var(--aw-calendar-list-font-size,12px);
					transition: background .3s;
					cursor: pointer;
				}
				.list_slider_selectable_cal > div:hover {
					background-color: var(--aw-calendar-list-background-color-hover,var(--aw-primary-color,#999999));
					color: var(--aw-calendar-list-color-hover,white);
				}
				
				/* #region Contenedor de calendario */

				.cont_slider_calendar {
					position: relative;
					padding: 0 5px;
					overflow: hidden;
				}
				.tabla_calendar {
					position: relative;
					display: table;
					width: 100%;
					top: 0px;
					left: 0px;
					opacity: 1;
					-webkit-user-select: none;
					-moz-user-select: none;
					-khtml-user-select: none;
					-ms-user-select:none;
				}
				.tabla_calendar[inactive] {
					position: absolute;
					left: 100%;
					opacity: 0;
				}
				.tabla_calendar > div {
					position: relative;
					display: table-row;
				}
				.tabla_calendar > div > div {
					position: relative;
					display: table-cell;
					vertical-align: middle;
					width: 14.2%;
					text-align: center;
					font-weight: normal;
					font-size: 14px;
					padding: 7px 7px;
					transition: background .3s;
					box-sizing: border-box;
				}
				.tabla_calendar > div > div.tit {
					color: var(--aw-calendar-tit-color,var(--aw-primary-text-color,#333333));
					font-weight: var(--aw-calendar-tit-font-weight,bold);
					font-size: var(--aw-calendar-tit-font-size,14px);
					font-style: var(--aw-calendar-tit-font-style,normal);
					cursor: default;
				}
				.tabla_calendar > div > .dia {
					opacity: .7;
				}
				.tabla_calendar > div > div > span {
					position: relative;
					color: var(--aw-calendar-color,var(--aw-primary-text-color,#333333));
					font-weight: var(--aw-calendar-font-weight,normal);
					font-size: var(--aw-calendar-font-size,14px);
					font-style: var(--aw-calendar-font-style,normal);
					display: inline-block;
				}
				.tabla_calendar > div > .dia[selectable] {
					cursor: pointer;
					opacity: 1;
				}
				.tabla_calendar > div > .dia[selectable]:hover > span {
					color: var(--aw-calendar-day-color-hover,var(--aw-calendar-color,var(--aw-primary-text-color,#333333)));
				}
				.tabla_calendar > div > .dia[selectable]:hover::before {
					position: absolute;
					width: 30px;
					height: 30px;
					top: calc(50% - 15px);
					left: calc(50% - 15px);
					border-radius: var(--aw-calendar-selected-radius,50%);
					content: "";
					background: var(--aw-calendar-day-background-color-hover,#EAEAEA);
					animation: animate_bg_awcalendar_simple .3s forwards;
				}
				.tabla_calendar > div > .dia[selected] > span {
					color: var(--aw-calendar-selected-color,white) !important;
					font-weight: bold;
				}
				.tabla_calendar > div > .dia[selectable][selected]::before {
					position: absolute;
					width: 30px;
					height: 30px;
					top: calc(50% - 15px);
					left: calc(50% - 15px);
					border-radius: var(--aw-calendar-selected-radius,50%);
					content: "";
					background-color:  var(--aw-calendar-selected-background-color,#444444);
					animation: animate_bg_awcalendar_simple .3s forwards;
				}
				.tabla_calendar > div > .dia[hoy]::after {
					position: absolute;
					width: 30px;
					height: 30px;
					top: calc(50% - 17px);
					left: calc(50% - 17px);
					border-radius: var(--aw-calendar-today-radius,50%);
					border: solid 2px var(--aw-calendar-today-background-color,#999999);
					content: "";
				}
				.tabla_calendar > div > .dia.festivo > span {
					color: var(--aw-calendar-festivo-color,#ad1414);
				}

				@keyframes animate_bg_awcalendar_simple {
					from {
						top: 50%;
						left: 50%;
						width: 0;
						height: 0;
					}

					to {
						top: calc(50% - 15px);
						left: calc(50% - 15px);
						width: 30px;
						height: 30px;
					}
				}
			</style>
			<div id="selectable_years" class="cont_slider_selectable_cal">
				<div class="slider"></div>
				<iron-icon class="left" data-type="year" data-action="previus" icon="chevron-left" on-click="_changeCalendar"></iron-icon>
				<iron-icon class="right" data-type="year" data-action="next" icon="chevron-right" on-click="_changeCalendar"></iron-icon>
			</div>
			<div id="selectable_months" class="cont_slider_selectable_cal">
				<div class="slider"></div>
				<iron-icon class="left" data-type="month" data-action="previus" icon="chevron-left" on-click="_changeCalendar"></iron-icon>
				<iron-icon class="right" data-type="month" data-action="next" icon="chevron-right" on-click="_changeCalendar"></iron-icon>
				<div class="list_slider_selectable_cal">
					<div data-month="0" on-click="_changeMonth">{{meses.0}}</div>
					<div data-month="1" on-click="_changeMonth">{{meses.1}}</div>
					<div data-month="2" on-click="_changeMonth">{{meses.2}}</div>
					<div data-month="3" on-click="_changeMonth">{{meses.3}}</div>
					<div data-month="4" on-click="_changeMonth">{{meses.4}}</div>
					<div data-month="5" on-click="_changeMonth">{{meses.5}}</div>
					<div data-month="6" on-click="_changeMonth">{{meses.6}}</div>
					<div data-month="7" on-click="_changeMonth">{{meses.7}}</div>
					<div data-month="8" on-click="_changeMonth">{{meses.8}}</div>
					<div data-month="9" on-click="_changeMonth">{{meses.9}}</div>
					<div data-month="10" on-click="_changeMonth">{{meses.10}}</div>
					<div data-month="11" on-click="_changeMonth">{{meses.11}}</div>
				</div>
			</div>
			<div class="tabla_calendar">
				<div>
					<div class="tit">
						{{diasinitial.0}}
					</div>
					<div class="tit">
						{{diasinitial.1}}
					</div>
					<div class="tit">
						{{diasinitial.2}}
					</div>
					<div class="tit">
						{{diasinitial.3}}
					</div>
					<div class="tit">
						{{diasinitial.4}}
					</div>
					<div class="tit">
						{{diasinitial.5}}
					</div>
					<div class="tit">
						{{diasinitial.6}}
					</div>
				</div>
			</div>
			<div class="cont_slider_calendar"></div>

			<template is="dom-if" if="{{time}}">
				<div class="tit_selectable_hour_cal">{{txtHora}}</div>
			</template>

			<div id="selectable_hour" class="cont_slider_selectable_cal" style="display: none;">
				<div class="slider"></div>
				<iron-icon class="left" data-type="hour" data-action="previus" icon="chevron-left" on-click="_changeSliderHour"></iron-icon>
				<iron-icon class="right" data-type="hour" data-action="next" icon="chevron-right" on-click="_changeSliderHour"></iron-icon>
			</div>
		`;
	}

	static get properties() {
		return {
			ccaa: { type: String },
			diasfest: { type: Array },
			fechainit: { type: String },
			lang: { type: String },
			name: { type: String },
			noink: { type: Boolean },
			nomarkfest: { type: Boolean },
			nomarktoday: { type: Boolean },
			noselectfest: { type: Boolean },
			noselectpast: { type: Boolean },
			noselectsat: { type: Boolean },
			noselectsun: { type: Boolean },
			time: { type: Boolean },
		};
	}

	constructor() {
		super();

		this.ccaa = undefined;
		this.diasfest = undefined;
		this.fechainit = "";
		this.lang = "es";
		this.name = "";
		this.noink = false;
		this.nomarktoday = false;
		this.noselectfest = false;
		this.noselectpast = false;
		this.noselectsat = false;
		this.noselectsun = false;
		this.time = false;

		/** @type {CalendarInputsSelects} */
		this.inputsYears = { ant: undefined, act: undefined, sig: undefined };
		/** @type {CalendarInputsSelects} */
		this.inputsHours = { ant: undefined, act: undefined, sig: undefined };

		/** @type {HTMLElement[]} */
		this.diasMonth = [];

		// Traducciones de los días
		this.diasinitial = [];
		this.dias = [];
		this.diasshort = [];
		this.meses = [];
		this.mesesshort = [];
		this.txtHora = "";

		// Funciones del calendario
		this.listenInputsYear = undefined;
		this.listenInputsHour = undefined;
		this.listenPestSliderOpen = undefined;
		this.listenPestSlider = undefined;
		this.listenCellDay = undefined;

		this.isanimate = false;

		/** @type {CustomEvent} */
		this.event = {};
		/** @type {{dia: number, mes: number}[]} */
		this.festivos = [];
		this.selectAnyDate = false;
		this.fechaSetted = "";
		this.fecha = { ano: null, mes: null, dia: null, hora: null, minuto: null };
		this.fechaSelected = { date: null, day: null, format: {numeric: null, numericHour: null, short: null, shortHour: null, shortDay: null, shortFull: null, long: null, longHour: null, longDay: null, longFull: null  }, hour: null, minute: null, month: null, name: null, string: null, year: null, };
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar cuando se conecta el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Funciones de control de listeners

		this._propertiesControl();
		
		// Traducimos los días

		this._translateDates();

		// Creamos el evento si no hay responsefunc

		if( !this.responsefunc ) {
			this.event = new CustomEvent( "aw-calendar-simple", { 
				detail: { date: this.fechaSelected }, 
				bubbles: true, 
				composed: true 
			});
		}

		if( this.fechainit ) {
			this.selectAnyDate = true;
		}

		// Creamos el calendario

		this._createCalendar();

		// Ponemos a la escucha los inputs de años

		this._listeners();

		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Acciones a realizar cuando se desconecta el componente.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();

		// Dejamos de escuchar elementos

		this._unlisteners();
	}

	/**
	 * @method	_get_date
	 * 
	 * Devuelve la fecha seleccionada en el calendario
	 */
	get_date()
	{
		if( !this.selectAnyDate ) {
			return null;
		}

		this.fechaSelected.name = this.name;

		this.fechaSelected.year = this.fecha.ano;
		this.fechaSelected.month = this.fecha.mes + 1;
		this.fechaSelected.day = this.fecha.dia;
		this.fechaSelected.hour = ( this.fecha.hora ) ? this.fecha.hora : 0;
		this.fechaSelected.minute = ( this.fecha.minuto ) ? this.fecha.minuto: 0;
		
		// Ponemos el string

		var string = this.fechaSelected.year + "-" + this.fechaSelected.month + "-" + this.fechaSelected.day;
		if( this.time ) {
			string += " " + this._printableHour( this.fechaSelected );
		}

		this.fechaSelected.string = string;

		// Functión de formatear fecha

		this.fechaSelected.format = {
			numeric: this._getFormatDate(),
			numericHour: this._getFormatDate( "numerica", false, true ),
			short: this._getFormatDate( "corta" ),
			shortHour: this._getFormatDate( "corta", false, true ),
			shortDay: this._getFormatDate( "corta", true, false ),
			shortFull: this._getFormatDate( "corta", true, true ),
			long: this._getFormatDate( "larga" ),
			longHour: this._getFormatDate( "larga", false, true ),
			longDay: this._getFormatDate( "larga", true, false ),
			longFull: this._getFormatDate( "larga", true, true )
		}
		
		// Asignamos el objeto de fecha
		this.fechaSelected.date = new Date( this.fechaSelected.string ); 

		return this.fechaSelected;
	}

	/**
	 * @method	reset
	 * 
	 * Resetea el calendario a su estado inicial
	 */
	reset()
	{
		this.setAttribute( "unresolved", "" );

		// Resetamos variables de control
		if( !this.fechainit ) {
			this.selectAnyDate = false;
		} else {
			this.selectAnyDate = true;
		}

		// Reseteamos la fecha selected
		this.fechaSelected = { date: null, day: null, format: {numeric: null, numericHour: null, short: null, shortHour: null, shortDay: null, shortFull: null, long: null, longHour: null, longDay: null, longFull: null  }, hour: null, minute: null, month: null, name: null, string: null, year: null, };
		
		// Dejamos de escuchar los eventos en el día actual
		this._unlisteners();

		// Creamos el calendarop
		this._createCalendar();

		// Ponemos a la escucha
		this._listeners();

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	set_date
	 * 
	 * Asigna una fecha dada al calendario
	 * 
	 * @param {string} date Fecha que queremos activar en el calendario
	 */
	set_date( date )
	{
		if(!this._isValidDate(date)) {
			console.error( "[aw-calendar-simple.js#set_date]: You have not passed a correct date" );
			return;
		}

		// Ponemos la fecha dada como fecha de inicio
		this.fechaSetted = date;

		// Reseteamos el formulario
		this.reset();

		// Ponemos que hay fecha seleccionada
		this.selectAnyDate = true;

		// Resteamos el fecha setted
		this.fechaSetted = "";
	}

	/**
	 * @method	_isValidDate
	 * 
	 * Valida si una fecha es valida
	 * 
	 * @param {string} d 
	 */
	_isValidDate(d) {
		const date = new Date(d);
		if( date === "Invalid Date") {
			return false;
		}

		return true;
	}

	/**
	 * @method	_formatDate
	 * 
	 * Formatea la fecha dada a la actual si no se pasa ninguna.
	 * 
	 * @param	{object}	fecha		Objeto de fecha.
	 */
	_formatDate( fecha ) {
		if( !fecha ) {
			fecha = new Date();
		}

		return {
			ano: fecha.getFullYear(),
			mes: fecha.getMonth(),
			dia: fecha.getDate(),
			hora: fecha.getHours(),
			minuto: fecha.getMinutes()
		};
	}

	/**
	 * @method	getFormatDate
	 * 
	 * Formatea la fecha a un formato específico.
	 * 
	 * @param	{string}	tipo		Longitud en el que queremos la fecha (numerica|corta|larga).
	 * @param	{boolean}	ponerDia	Determina si queremos mostrar el día de la semana. 
	 * @param	{boolean}	ponerHora	Determina si queremos mostrar la hora.
	 * @return	{string}				Fecha formateada.
	 */
	_getFormatDate( tipo = "numerica", ponerDia = false, ponerHora = false ) {
		let mesToDate = this.fechaSelected.month - 1;
		var fecha = new Date( this.fechaSelected.year, mesToDate, this.fechaSelected.day );
		var fechaFormat = null;
		var conj = ( this.lang == "es" || this.lang == "ca" ) ? "de" : "";

		// Ajustamos el formato de la fecha

		if( tipo === "numerica" ) {
			if( this.lang != "en" ) {
				fechaFormat = this.fechaSelected.day + "/" + this.fechaSelected.month + "/" + this.fechaSelected.year;
			} else {
				fechaFormat = this.fechaSelected.year + "/" + this.fechaSelected.month + "/" + this.fechaSelected.day;
			}			
		} else if ( tipo === "corta" ) {
			fechaFormat = this.fechaSelected.day + " " + this.mesesshort[ mesToDate ] + " " + this.fechaSelected.year;
		} else {
			fechaFormat = this.fechaSelected.day + " " + conj + " " + this.meses[ mesToDate ] + " " + conj + " " + this.fechaSelected.year;
		}
		
		// Ponemos el día si corresponde

		if( ponerDia && tipo === "corta" ) {
			fechaFormat = this.diasshort[ ( fecha.getDay() > 0 ) ? fecha.getDay() - 1 : 6 ] + ", " + fechaFormat;
		} else if( ponerDia ) {
			fechaFormat = this.dias[ ( fecha.getDay() > 0 ) ? fecha.getDay() - 1 : 6 ] + ", " + fechaFormat;
		}

		// Ponemos la hora si corresponde

		if( ponerHora && this.time ) {
			fechaFormat += " " + this._printableHour( this.fechaSelected );
		}

		return fechaFormat;
	}

	/**
	 * @method	_printableHour
	 * 
	 * Imprime la tabla de la hora.
	 * 
	 * @param	{object}	fecha		Objeto de fecha.
	 */
	_printableHour( fecha ) {
		var minuto = ( fecha.minute !== undefined ) ? fecha.minute : fecha.minuto;
		var hora = ( fecha.hour !== undefined ) ? fecha.hour : fecha.hora;
		
		if( minuto < 10 ) {
			minuto = "0" + minuto;
		}

		if( hora < 10 ) {
			hora = "0" + hora;
		}

		return hora + ":" + minuto;
	}

	/**
	 * @method	_getPreviusMonth
	 * 
	 * Obtiene el mes anterior de una fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getPreviusMonth( oFecha ) {
		var fecha = new Date( oFecha.ano, oFecha.mes - 1, 1 );
		fecha.setHours( oFecha.hora );
		fecha.setMinutes( oFecha.minuto );

		return this._formatDate( fecha );
	}

	/**
	 * @method	_getNextMonth
	 * 
	 * Obtiene el mes siguiente de una fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getNextMonth( oFecha ) {
		var fecha = new Date( oFecha.ano, oFecha.mes + 1, 1 );
		fecha.setHours( oFecha.hora );
		fecha.setMinutes( oFecha.minuto );

		return this._formatDate( fecha );
	}
	
	/**
	 * @method	_getPreviusYear
	 * 
	 * Obtiene el año anterior de una fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getPreviusYear( oFecha ) {
		var fecha = new Date( oFecha.ano - 1, oFecha.mes, 1 );
		fecha.setHours( oFecha.hora );
		fecha.setMinutes( oFecha.minuto );

		return this._formatDate( fecha );
	}

	/**
	 * @method	_getNextYear
	 * 
	 * Obtiene el año siguiente de una fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getNextYear( oFecha ) {
		var fecha = new Date( oFecha.ano + 1, oFecha.mes, 1 );
		fecha.setHours( oFecha.hora );
		fecha.setMinutes( oFecha.minuto );

		return this._formatDate( fecha );
	}

	/**
	 * @method	_getFirstWeekDayOfMonth
	 * 
	 * Obtiene el primer día de la semana del mes de la fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getFirstWeekDayOfMonth( oFecha ) {
		var fecha = new Date( oFecha.ano, oFecha.mes, 1 );
		return fecha.getDay();
	}

	/**
	 * @method	_getLastDayOfMonth
	 * 
	 * Obtiene el último día del mes de la fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getLastDayOfMonth( oFecha ) {
		var lasDay = null;
		var mesAct = oFecha.mes;
		var fecha = new Date( oFecha.ano, oFecha.mes, 1 );

		oFecha = {
			ano: fecha.getFullYear(),
			mes: fecha.getMonth(),
			dia: fecha.getDate()
		};

		while( oFecha.mes ==  mesAct ) {
			lasDay = oFecha.dia;
			oFecha.dia++;
			fecha = new Date( oFecha.ano, oFecha.mes, oFecha.dia );
			oFecha = {
				ano: fecha.getFullYear(),
				mes: fecha.getMonth(),
				dia: fecha.getDate()
			};
		}

	   return lasDay;
	}

	/**
	 * @method	_getPreviousQuarter
	 * 
	 * Obtiene el cuarto de hora anterior de la fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getPreviousQuarter( oFecha ) {
		var newMin = null;
		var newHour = oFecha.hora;
		
		if( oFecha.minuto > 45 ) {
			newMin = 45;
		} else if( oFecha.minuto > 30 ) {
			newMin = 30;
		} else if ( oFecha.minuto > 15 ) {
			newMin = 15;
		} else if( oFecha.minuto > 0 ) {
			newMin = 0;
		} else {
			newMin = 45;
			newHour = oFecha.hora - 1;
		}
		
		var fecha = new Date( oFecha.ano, oFecha.mes, oFecha.dia );
		fecha.setHours( newHour );
		fecha.setMinutes( newMin );
		
		return this._formatDate( fecha );
	}

	/**
	 * @method	_getNextQuarter
	 * 
	 * Obtiene el cuarto de hora siguiente de la fecha dada.
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_getNextQuarter( oFecha ) {
		var newMin = null;
		var newHour = oFecha.hora;
		
		if( oFecha.minuto >= 45 ) {
			newMin = 0;
			newHour = oFecha.hora + 1;
		} else if( oFecha.minuto >= 30 ) {
			newMin = 45;
		} else if ( oFecha.minuto >= 15 ) {
			newMin = 30;
		} else {
			newMin = 15;
		}
		
		var fecha = new Date( oFecha.ano, oFecha.mes, oFecha.dia );
		fecha.setHours( newHour );
		fecha.setMinutes( newMin );
		
		return this._formatDate( fecha );
	}

	/**
	 * @method	_handleHourKeyPress
	 * 
	 * @param {event} ev 
	 */
	_handleHourKeyPress(ev) {
		if( isNaN(ev.key) && ev.key !== ":" && ev.key !== "Enter" && ev.key !== "Backspace" ) {
			ev.preventDefault();
		}
	}

	/**
	 * @method	_handleHourKeyPress
	 * 
	 * @param {event} ev 
	 */
	_handleHourKeyUp(ev) {
		const value = ev.target.value;
		
		if( value.length === 2 && ev.key !== "Backspace" ) {
			ev.target.value += ":";
		}

		if( value.length > 2 && value.indexOf(":") === -1) {
			ev.target.value = value[0] + "" + value[1] + ":" + value[2];
		}

		if( value.length === 6 ) {
			ev.target.value = ev.target.value.slice(0,-1);
		}
	}

	/**
	 * @method	_handleHourFocus
	 * 
	 * @param {event} ev 
	 */
	_handleHourFocus(ev) {
		ev.target.setSelectionRange(0, ev.target.value.length)
	}

	/**
	 * @method	_handleYearKeyPress
	 * 
	 * @param {event} ev 
	 */
	_handleYearKeyPress(ev) {
		if( isNaN(ev.key) && ev.key !== "Enter" ) {
			ev.preventDefault();
		}
	}

	/**
	 * @method	_handleYearKeyUp
	 * 
	 * @param {event} ev 
	 */
	_handleYearKeyUp(ev) {
		const value = ev.target.value;

		if( value.length === 5 ) {
			ev.target.value = ev.target.value.slice(0,-1);
		}
	}

	/**
	 * @method	_handleYearFocus
	 * 
	 * @param {event} ev 
	 */
	_handleYearFocus(ev) {
		ev.target.setSelectionRange(0, ev.target.value.length)
	}

	/**
	 * @method	_createCalendar
	 * 
	 * Crea el calendario del componente.
	 */
	_createCalendar() {
		this.$.selectable_years.querySelector( ".slider" ).textContent = '';
		this.$.selectable_months.querySelector( ".slider" ).textContent = '';
		this.$.selectable_hour.querySelector( ".slider" ).textContent = '';
		this.shadowRoot.querySelector( ".cont_slider_calendar" ).textContent = '';

		// Damos formato a la fecha

		var fecha = new Date();

		// Asignamos si ha fecha de inicio

		if( this.fechainit || this.fechaSetted ) {
			var sf = ( this.fechaSetted ) ? this.fechaSetted.split( " " ) : this.fechainit.split( " " );

			fecha = new Date( sf[ 0 ] );
			fecha.setHours( 0 );
			fecha.setMinutes( 0 );

			if( sf[ 1 ] ) {
				var sh = sf[ 1 ].split( ":" );
				fecha.setHours( sh[ 0 ] );
				fecha.setMinutes( sh[ 1 ] );
			}
		}

		
		// Damos formato a la fecha

		this.fecha = this._formatDate( fecha );   

		// Si hay fecha de inicio disparamos el evento

		if( this.fechainit || this.fechaSetted ) {
			this._fechaDispatch();
		}

		// Obtenemos los días festivos

		this._getFestivos( this.fecha.ano );
		
		// Creamos el interior de los años

		var divAnoAnt = document.createElement( "DIV" );
		this.inputsYears.ant = document.createElement( "INPUT" );
		this.inputsYears.ant.value = this.fecha.ano - 1;
		this.inputsYears.ant.onkeydown = this._handleYearKeyPress;
		this.inputsYears.ant.onkeyup = this._handleYearKeyUp;
		this.inputsYears.ant.onfocus = this._handleYearFocus;
		divAnoAnt.appendChild( this.inputsYears.ant );

		var divAnoAct = document.createElement( "DIV" );
		divAnoAct.setAttribute( "active", "" );
		this.inputsYears.act = document.createElement( "INPUT" );
		this.inputsYears.act.onkeydown = this._handleYearKeyPress;
		this.inputsYears.act.onkeyup = this._handleYearKeyUp;
		this.inputsYears.act.onfocus = this._handleYearFocus;
		this.inputsYears.act.value = this.fecha.ano;
		divAnoAct.appendChild( this.inputsYears.act );


		var divAnoSig = document.createElement( "DIV" );
		this.inputsYears.sig = document.createElement( "INPUT" );
		this.inputsYears.sig.onkeydown = this._handleYearKeyPress;
		this.inputsYears.sig.onkeyup = this._handleYearKeyUp;
		this.inputsYears.sig.onfocus = this._handleYearFocus;
		this.inputsYears.sig.value = this.fecha.ano + 1;
		divAnoSig.appendChild( this.inputsYears.sig );

		this.$.selectable_years.querySelector( ".slider" ).appendChild( divAnoAnt );
		this.$.selectable_years.querySelector( ".slider" ).appendChild( divAnoAct );
		this.$.selectable_years.querySelector( ".slider" ).appendChild( divAnoSig );

		// Creamos el interior de los meses

		var divMesAnt = document.createElement( "DIV" );
		divMesAnt.innerHTML = this.meses[ ( this.fecha.mes > 1 ) ? this.fecha.mes - 1 : 11 ];

		var divMesAct = document.createElement( "DIV" );
		divMesAct.setAttribute( "active", "" );
		divMesAct.innerHTML = this.meses[ this.fecha.mes ];

		var divMesSig = document.createElement( "DIV" );
		divMesSig.innerHTML = this.meses[ ( this.fecha.mes < 10 ) ? this.fecha.mes + 1 : 0 ];

		this.$.selectable_months.querySelector( ".slider" ).appendChild( divMesAnt );
		this.$.selectable_months.querySelector( ".slider" ).appendChild( divMesAct );
		this.$.selectable_months.querySelector( ".slider" ).appendChild( divMesSig );
		
		// Creamos el interior de las tablas

		var divActiveMonth = this._printMonthTable( this.fecha );

		// Creamos tablas de meses

		var tablaMesAct = document.createElement( "DIV" );
		tablaMesAct.classList.add( "tabla_calendar" );
		tablaMesAct.setAttribute( "active", "" );
		tablaMesAct.innerHTML = divActiveMonth;

		var tablaInactive = document.createElement( "DIV" );
		tablaInactive.classList.add( "tabla_calendar" );
		tablaInactive.setAttribute( "inactive", "" );

		// Introducimos las tablas

		this.shadowRoot.querySelector( ".cont_slider_calendar" ).appendChild( tablaMesAct );
		this.shadowRoot.querySelector( ".cont_slider_calendar" ).appendChild( tablaInactive );

		// Ponemos a la escucha los días del mes actual

		this._setListenersMesAct();

		// Si hay que poner la hora
		
		if( this.time ) {
			var previusQuarter = this._getPreviousQuarter( this.fecha );
			var nextQuarter = this._getNextQuarter( this.fecha );

			var divHoraAnt = document.createElement( "DIV" );
			this.inputsHours.ant = document.createElement( "INPUT" );
			this.inputsHours.ant.value = this._printableHour( previusQuarter );
			this.inputsHours.ant.onkeydown = this._handleHourKeyPress;
			this.inputsHours.ant.onkeyup = this._handleHourKeyUp;
			this.inputsHours.ant.onfocus = this._handleHourFocus;
			divHoraAnt.appendChild( this.inputsHours.ant );

			var divHoraAct = document.createElement( "DIV" );
			divHoraAct.setAttribute( "active", "" );
			this.inputsHours.act = document.createElement( "INPUT" );
			this.inputsHours.act.value = this._printableHour( this.fecha );
			this.inputsHours.act.onkeydown = this._handleHourKeyPress;
			this.inputsHours.act.onkeyup = this._handleHourKeyUp;
			this.inputsHours.act.onfocus = this._handleHourFocus;
			divHoraAct.appendChild( this.inputsHours.act );
			
			var divHoraSig = document.createElement( "DIV" );
			this.inputsHours.sig = document.createElement( "INPUT" );
			this.inputsHours.sig.value = this._printableHour( nextQuarter );
			this.inputsHours.sig.onkeydown = this._handleHourKeyPress;
			this.inputsHours.sig.onkeyup = this._handleHourKeyUp;
			this.inputsHours.sig.onfocus = this._handleHourFocus;
			divHoraSig.appendChild( this.inputsHours.sig );

			this.$.selectable_hour.style.display = "block";
			this.$.selectable_hour.querySelector( ".slider" ).appendChild( divHoraAnt );
			this.$.selectable_hour.querySelector( ".slider" ).appendChild( divHoraAct );
			this.$.selectable_hour.querySelector( ".slider" ).appendChild( divHoraSig );
			
		}
	}

	/**
	 * @method	_printMonthTable
	 * 
	 * Imprime la tabla de los meses del calendario
	 * 
	 * @param	{object}	oFecha		Objeto de fecha.
	 */
	_printMonthTable( fecha ) {
		this._getSemanaSanta( this.fecha );
		// Obtenemos la fecha actual

		var fact = this._formatDate();

		// Obtenemos el número de día de la semana y el último día del mes

		var firstWeekDay = this._getFirstWeekDayOfMonth( fecha );
		var lastDayOfMonth = this._getLastDayOfMonth( fecha );

		if( firstWeekDay === 0 ) {
			firstWeekDay = 7;
		}
		
		// Imprimimos los huecos anteriores

		var div = '';
		if( firstWeekDay !== 1 ) {
			div += '<div>';
			for( var i = 1; i < firstWeekDay; i++ ) {
				div += '<div></div>';
			}
		}

		// Imprimimos los días del mes

		var dia = firstWeekDay;
		for( var i = 1; i <= lastDayOfMonth; i++ ) {
			// Ponemos row si es el primer día de la semana

			if( dia === 1 ) {
				div += '<div>';
			}

			// Comprobamos si es festivo

			var festivo = this._isFestivo( fecha.mes, i );

			// Marcamos el día actual

			var attrHoy = "";
			if( fact.ano === fecha.ano && fact.mes === fecha.mes && fact.dia === i && !this.nomarktoday ) {
				attrHoy = " hoy";
			}

			// Marcamos el día seleccionado

			var attrSel = "";
			if( fecha.ano === this.fechaSelected.year && fecha.mes == (this.fechaSelected.month - 1) && this.fechaSelected.day === i ) {
				attrSel = " selected";
			}

			// Impedimos que se puedan seleccionar los fines de semana

			var attrFest = " selectable";
			var ripple = '<paper-ripple></paper-ripple>';

			// Impedimos que se seleccionen los sábados

			if( this.noselectsat && dia === 6 && this.noselectsun ) {
				attrFest = "";
				ripple = "";
			}

			// Impedimos que se seleccionen los fines de semana

			if( this.noselectsun && ( dia === 7 || ( dia === 6 && this.noselectsat ))) {
				attrFest = "";
				ripple = "";
			}
			
			// Impedimos que se seleccionen los festivos

			if( this.noselectfest && festivo ) {
				attrFest = "";
				ripple = "";
			}

			// Impedimos que se pueda seleccionar los días pasados

			if(( this.noselectpast ) && (( fact.ano > fecha.ano ) || ( fact.ano == fecha.ano && fact.mes > fecha.mes ) || ( fact.ano === fecha.ano && fact.mes === fecha.mes && fact.dia > i ))) {
				attrFest = "";
				ripple = "";
			}

			// Quitamos el paper-ripple si es noink

			if( this.noink ) {
				ripple = "";
			}

			// Ponemos clase si es festivo

			var style = "";
			if( festivo && !this.nomarkfest ) {
				style = " festivo";
			}

			// Imprimimos el día

			div += '<div class="dia' + style + '" data-dia="' + i + '"' + attrHoy + '' + attrSel + '' + attrFest + '>' + ripple + '<span>' + i + '</span></div>';

			// Ponemos row si el último día de la semana

			if( dia === 7 ) {
				div += '</div>';
				dia = 1;
			} else {
				dia++;
			}
		}

		// Imprimimos los huecos finales si el útlimo día no es domingo

		if( dia > 1 ) {
			for( var i = dia; i <= 7; i++ ) {
				div += '<div></div>';
			}
			div += '</div>';
		}

		// Devolvemos la tabla del calendario

		return div;
	}

	/**
	 * @method	_nextSlider
	 * 
	 * Pasa al siguiente valor del slider.
	 * 
	 * @param	{node}		slider		Nodo actual que se quiere pasar.
	 */
	_nextSlider( slider ) {
		if( slider === "year" ) {
			var container = this.$.selectable_years.querySelector( ".slider" );
		} else if ( slider === "month" ) {
			var container = this.$.selectable_months.querySelector( ".slider" );
		} else if ( slider === "hour" ) {
			var container = this.$.selectable_hour.querySelector( ".slider" );
		}

		var activeEl = container.querySelector( "div[active]" );
		var nextEl = activeEl.nextElementSibling;

		if( !nextEl ) {
			nextEl = container.firstElementChild;
		}
		
		Polymer.Animate( activeEl, { left: "-100%", opacity: 0 }, { speed: 200 } );
		Polymer.Animate( nextEl, { left: "0px", opacity: 1 }, { speed: 200 }, () => {
			activeEl.removeAttribute( "active" );
			activeEl.removeAttribute( "style" );
			nextEl.setAttribute( "active", "" );
			nextEl.removeAttribute( "style" );
		});
	}

	/**
	 * @method	_previusSlider
	 * 
	 * Pasa al anterior valor del slider.
	 * 
	 * @param	{node}		slider		Nodo actual que se quiere pasar.
	 */
	_previusSlider( slider ) {
		if( slider === "year" ) {
			var container = this.$.selectable_years.querySelector( ".slider" );
		} else if ( slider === "month" ) {
			var container = this.$.selectable_months.querySelector( ".slider" );
		} else if ( slider === "hour" ) {
			var container = this.$.selectable_hour.querySelector( ".slider" );
		}

		var activeEl = container.querySelector( "div[active]" );
		var previusEl = activeEl.previousElementSibling;

		if( !previusEl ) {
			previusEl = container.lastElementChild;
		}

		previusEl.style.left = "-100%";
		
		Polymer.Animate( activeEl, { left: "100%", opacity: 0 }, { speed: 200 } );
		Polymer.Animate( previusEl, { left: "0px", opacity: 1 }, { speed: 200 }, () => {
			activeEl.removeAttribute( "active" );
			activeEl.removeAttribute( "style" );
			previusEl.setAttribute( "active", "" );
			previusEl.removeAttribute( "style" );
		});
	}

	/**
	 * @method	_passCalendar
	 * 
	 * Pasa el calendario creando un efecto de movimiento.
	 * 
	 * @param	{string}	action		Acción que queremos realizar (next|previous)
	 */
	_passCalendar( action ) {
		this.isanimate = true;

		// Obtenemos tablas del mes

		var container = this.shadowRoot.querySelector( ".cont_slider_calendar" );
		var activeEl = this.shadowRoot.querySelector( ".cont_slider_calendar div[active]" );
		var inactiveEl = this.shadowRoot.querySelector( ".cont_slider_calendar div[inactive]" );

		// Ponemos la altura del nuevo slider al container

		var altActive = activeEl.offsetHeight;
		var altInactive = inactiveEl.offsetHeight;

		if( altInactive > altActive ) {
			container.style.height = altInactive + "px";
		}

		// Animamos el calendario
		
		if( action === "next" ) {
			Polymer.Animate( activeEl, { left: "-100%", opacity: 0 }, { speed: 200 });
			Polymer.Animate( inactiveEl, { left: "0px", opacity: 1 }, { speed: 200 }, () => {
				activeEl.removeAttribute( "active" );
				activeEl.setAttribute( "inactive", "" );
				activeEl.removeAttribute( "style" );
				inactiveEl.removeAttribute( "inactive" );
				inactiveEl.setAttribute( "active", "" );
				inactiveEl.removeAttribute( "style" );
				container.removeAttribute( "style" );

				this.isanimate = false;

				// Ponemos a la escucha los días del mes actual

				this._setListenersMesAct();
			});
		} else {
			inactiveEl.style.left = "-100%";

			Polymer.Animate( activeEl, { left: "100%", opacity: 0 }, { speed: 200 });
			Polymer.Animate( inactiveEl, { left: "0px", opacity: 1 }, { speed: 200 }, () => {
				activeEl.removeAttribute( "active" );
				activeEl.setAttribute( "inactive", "" );
				activeEl.removeAttribute( "style" );
				inactiveEl.removeAttribute( "inactive" );
				inactiveEl.setAttribute( "active", "" );
				inactiveEl.removeAttribute( "style" );
				container.removeAttribute( "style" );

				this.isanimate = false;

				// Ponemos a la escucha los días del mes actual

				this._setListenersMesAct();
			});
		}
	}

	/**
	 * @method	_isFestivo
	 * 
	 * Devuelve si un día es festivo o no lo es.
	 * 
	 * @param	{number}	mes			Mes del que queremos saber si es festivo.
	 * @param	{number}	dia			Día que queremos saber si es festivo.
	 * @return	{boolean}				TRUE si es festivo.
	 */
	_isFestivo( mes, dia ) {
		for( var i = 0; i < this.festivos.length; i++ ) {
			if( dia == this.festivos[ i ].dia && mes === this.festivos[ i ].mes ) {
				return true;
			}
		}

		return false;
	}
	
	/**
	 * @method	_getFestivos
	 * 
	 * Obtiene los días festivos de un año concreto.
	 * 
	 * @param	{number}	ano			Año del que queremos extraer los festivos.
	 */
	_getFestivos( ano ) {
		// Obtenemos la semana santa

		var ss = this._getSemanaSanta( ano );

		// Festivos nacionales

		this.festivos = [
			{ dia: 1, mes: 0 },                                 // Año nuevo
			{ dia: 6, mes: 0 },                                 // Reyes magos
			{ dia: ss.vie_sa.dia, mes: ss.vie_sa.mes },         // Viernes santo
			{ dia: 1, mes: 4 },                                 // Día trabajador
			{ dia: 15, mes: 7 },                                // Asunción
			{ dia: 12, mes: 9 },                                // Fiesta nacional
			{ dia: 1, mes: 10 },                                // Todos los santos
			{ dia: 6, mes: 11 },                                // Día de la constitución
			{ dia: 8, mes: 11 },                                // Inmaculada
			{ dia: 25, mes: 11 }                                // Navidad
		];

		// Ponemos los festivos por autonomías

		if( this.ccaa ) {
			// Pasamos a minúsculas

			this.ccaa = this.ccaa.toLowerCase();

			// Añadimos el jueves santo

			if( this.ccaa !== "cataluña" && this.ccaa !== "cantabria" && this.ccaa !== "valencia" ) {
				this.festivos.push( { dia: ss.jue_sa.dia, mes: ss.jue_sa.mes } );
			}

			// Añadimos el lunes de pascua

			if( this.ccaa === "cataluña" || this.ccaa === "vascongadas" || this.ccaa === "baleares" || this.ccaa === "navarra" || this.ccaa === "valencia" ) {
				this.festivos.push( { dia: ss.lun_pa.dia, mes: ss.lun_pa.mes } );
			}

			// Añadimos el día de san josé

			if( this.ccaa === "madrid" || this.ccaa === "murcia" ) {
				var sanjose = new Date( fecha.ano, 2, 19 );

				if( sanjose.getDay() === 1 ) {
					this.festivos.push( { dia: sanjose.getDate(), mes: sanjose.getMonth() } );
				} else if( sanjose.getDay() === 0 ) {
					this.festivos.push( { dia: sanjose.getDate() + 1, mes: sanjose.getMonth() } );
				} else {
					this.festivos.push( { dia: sanjose.getDate() + ( 8 - sanjose.getDay() ), mes: sanjose.getMonth() } );
				}
			}

			// Andalucía

			if( this.ccaa === "andalucia" || this.ccaa === "andalucía" ) {
				this.festivos.push( { dia: 28, mes: 1 } );      // Día de Andalucía
			}

			// Aragón

			if( this.ccaa == "aragon" || this.ccaa == "aragón" ) {
				this.festivos.push( { dia: 23, mes: 3 } );       // Día de Aragón
			}

			// Asturias

			if( this.ccaa == "asturias" ) {
				this.festivos.push( { dia: 8, mes: 8 } );        // Día de Asturias
			}

			// Baleares

			if( this.ccaa == "baleares" ) {
				this.festivos.push( { dia: 23, mes: 3 } );      // Día de Baleares
			}

			// Canarias

			if( this.ccaa == "canarias" ) {
				this.festivos.push( { dia: 30, mes: 4 } );      // Día de Canarias
			}

			// Cantabria

			if( this.ccaa == "cantabria" ) {
				this.festivos.push( { dia: 28, mes: 6 } );      // Día de Instituciones cátabras
				this.festivos.push( { dia: 15, mes: 8 } );      // Día de Cantabria
			}

			// Castilla y león

			if( this.ccaa == "castilla" ) {
				this.festivos.push( { dia: 23, mes: 3 } );       // Día Castilla y león
			}

			// Cataluña

			if( this.ccaa == "cataluña" ) {
				this.festivos.push( { dia: 11, mes: 8 } );      // Día de Cataluña
				this.festivos.push( { dia: 26, mes: 11 } );     // Día San Esteban
			}

			// Ceuta

			if( this.ccaa == "ceuta" ) {
				this.festivos.push( { dia: 13, mes: 5 } );      // Día de Ceuta
				this.festivos.push( { dia: 6, mes: 7 } );       // Nuestra señora de África
				this.festivos.push( { dia: 22, mes: 7 } );      // Fiesta del sacrificio
			}

			// Extremadura

			if( this.ccaa == "extremadura" ) {
				this.festivos.push( { dia: 8, mes: 8 } );       // Día de Extremadura
			}

			// Galicia

			if( this.ccaa == "galicia" ) {
				this.festivos.push( { dia: 17, mes: 4 } );      // Día de letras gallegas
				this.festivos.push( { dia: 25, mes: 6 } );      // Día de Galicia
			}

			// Madrid

			if( this.ccaa == "madrid" ) {
				this.festivos.push( { dia: 2, mes: 4 } );       // Día de Madrid
				this.festivos.push( { dia: 15, mes: 4 } );      // Día de San Isidro
				this.festivos.push( { dia: 9, mes: 10 } );      // Día de La Almudena
			}

			// La mancha

			if( this.ccaa == "mancha" ) {
				this.festivos.push( { dia: 31, mes: 4 } );      // Día de La Mancha
			}

			// Melilla

			if( this.ccaa == "melilla" ) {
				this.festivos.push( { dia: 22, mes: 7 } );      // Fiesta del sacrificio
				this.festivos.push( { dia: 8, mes: 8 } );       // Día de Melilla
				this.festivos.push( { dia: 17, mes: 8 } );      // Día de Cantabria
			}

			// Murcia

			if( this.ccaa == "murcia" ) {
				this.festivos.push( { dia: 9, mes: 5 } );       // Día de Murcia
			}

			// Navarra

			if( this.ccaa == "navarra" ) {
				this.festivos.push( { dia: 3, mes: 11 } );      // Día de Navarra
			}

			// La Rioja

			if( this.ccaa == "rioja" ) {
				this.festivos.push( { dia: 9, mes: 5 } );       // Día de La Rioja
			}

			// Valencia

			if( this.ccaa == "valencia" ) {
				this.festivos.push( { dia: 9, mes: 9 } );       // Día de La Valencia
			}
		}
		
		// Añadimos festivos manuales
		
		if( typeof this.diasfest == "object" && this.diasfest.length > 0 ) {
			for( var i = 0; i < this.diasfest.length; i++ ) {
				var sf = this.diasfest[ i ].split( "-" );
				var d = parseInt( sf[ 0 ] );
				var m = parseInt( sf[ 1 ] );

				if( !isNaN( d ) && !isNaN( m ) ) {
					this.festivos.push( { dia: d, mes: m - 1 } );
				}
			}
		}
	}

	/**
	 * @method	_getSemanaSanta
	 * 
	 * Calcula cuando cae la semana santa de un año concreto
	 * 
	 * @param	{number}	ano			Año del que queremos saber cuando es semana santa.
	 */
	_getSemanaSanta( ano ) {
		var M = null;
		var N = null;

		if ( ano > 1900 && ano < 2099 ) { 
			M = 24;
			N = 5; 
		} else if ( ano > 2100 && ano < 2199 ) { 
			M = 24;
			N = 6; 
		} else if ( ano > 2200 && ano < 2299 ) { 
			M = 25;
			N = 0; 
		}

		var a = ano % 19;
		var b = ano % 4;
		var c = ano % 7;
		var d = (( 19 * a ) + M ) % 30;
		var e = (( 2 * b ) + ( 4 * c ) + ( 6 * d ) + N ) % 7;
		var f = d + e;

		if ( f < 10 ) { 
			var dia = f + 22;
			var mes = 3;
		} else  {
			var dia = f - 9;
			var mes = 4;
		};

		if ( dia == 26 && mes == 4 ){ 
			dia = 19;
		};

		if ( dia == 25 && mes == 4 && d == 28 && e == 6 && a > 10 ){
			dia = 18;
		};

		var domResurr = new Date( ano, mes - 1, dia );
		domResurr = this._formatDate( domResurr );

		var juevesSan = new Date( domResurr.ano, domResurr.mes, domResurr.dia - 3 );
		juevesSan = this._formatDate( juevesSan );

		var viernesSan = new Date( domResurr.ano, domResurr.mes, domResurr.dia - 2 );
		viernesSan = this._formatDate( viernesSan );

		var lunesPas = new Date( domResurr.ano, domResurr.mes, domResurr.dia + 1 );
		lunesPas = this._formatDate( lunesPas );


		return {
			jue_sa: juevesSan,
			vie_sa: viernesSan,
			dom_re: domResurr,
			lun_pa: lunesPas
		};
	}
	
	/**
	 * @method	_changeCalendar
	 * 
	 * Cambia el calendario al hacer click sobre una de las flechas del slider.
	 * 
	 * @param	{object}	ev			Objeto devuelto por el evento **click**.
	 */
	_changeCalendar( ev ) {
		if( this.isanimate ) {
			return false;
		}

		var fAnt = this.fecha;

		// Obtenemos data del iron-icon

		var type = ev.target.dataset.type;
		var action = ev.target.dataset.action;

		// Obtenemos tablas inactiva

		var inactiveEl = this.shadowRoot.querySelector( ".cont_slider_calendar div[inactive]" );
		
		// Calculamos nueva fecha

		if( type === "year" ) {
			if( action === "next" ) {
				this.fecha = this._getNextYear( this.fecha );
			} else {
				this.fecha = this._getPreviusYear( this.fecha );
			}
		} else {
			if( action === "next" ) {
				this.fecha = this._getNextMonth( this.fecha );
			} else {
				this.fecha = this._getPreviusMonth( this.fecha );
			}
		}

		// Creamos nueva tabla del mes

		var tablaMes = this._printMonthTable( this.fecha );

		// Introducimos la tabla del mes y la pasamos

		inactiveEl.innerHTML = tablaMes;
		this._passCalendar( action );

		// Cambiamos el slider
		
		if( type === "year" ) {
			this._changeSliderYear( action );
		} else {
			this._changeSliderMonth( action );
		}

		// Volvemos a coger los festivos

		if( fAnt.ano !== this.fecha.ano ) {
			this._getFestivos( this.fecha.ano );
		}
	}

	/**
	 * @method	_changeInputYear
	 * 
	 * Detecta el cambio en el input de los años cuando se hace manualmente.
	 * 
	 * @param	{object}	ev			Objeto devuelto por el evento **change**
	 */
	_changeInputYear( ev ) {
		if( this.isanimate ) {
			return false;
		}

		// Ajustamos el nuevo año

		var newAno = parseInt( ev.target.value );

		if( isNaN( newAno )) {
			newAno = new Date().getFullYear();
		}
		
		if( newAno < 1901 ) {
			newAno = 1901;
		}
		
		if( newAno > 2199 ) {
			newAno = 2199;
		}

		ev.target.value = newAno;

		// Asignamos la acción

		if( this.fecha.ano < newAno ) {
			var action = "next";
		} else {
			var action = "previus";
		}

		// Obtenemos tablas inactiva

		var inactiveEl = this.shadowRoot.querySelector( ".cont_slider_calendar div[inactive]" );

		// Fecha anterior y nuevo año

		this.fecha.ano = newAno;

		// Creamos nueva tabla del mes

		var tablaMes = this._printMonthTable( this.fecha );

		// Introducimos la tabla del mes y la pasamos

		inactiveEl.innerHTML = tablaMes;
		this._passCalendar( action );

		// Volvemos a coger los festivos

		this._getFestivos( newAno );
	}

	/**
	 * @method	_changeMonth
	 * 
	 * Detecta el cambio en el select de meses.
	 * 
	 * @param	{object}	ev			Objeto devuelto por el evento **change**
	 */
	_changeMonth( ev ) {
		if( this.isanimate ) {
			return false;
		}

		var newMonth = parseInt( ev.target.dataset.month );

		if( this.fecha.mes === newMonth ) {
			return false;
		} else if( this.fecha.mes < newMonth ) {
			var action = "next";
		} else {
			var action = "previus";
		}

		// Obtenemos tablas inactiva

		var inactiveEl = this.shadowRoot.querySelector( ".cont_slider_calendar div[inactive]" );

		// Fecha anterior y nuevo año

		this.fecha.mes = newMonth;

		// Creamos nueva tabla del mes

		var tablaMes = this._printMonthTable( this.fecha );

		// Introducimos la tabla del mes y la pasamos

		inactiveEl.innerHTML = tablaMes;
		this._passCalendar( action );
		this._changeSliderMonth( action );
	}

	/**
	 * @method	_changeInputHour
	 * 
	 * Detecta el cambio en el input de horas.
	 * 
	 * @param	{object}	ev			Objeto devuelto por el evento **change**
	 */
	_changeInputHour( ev ) {
		if( this.isanimate ) {
			return false;
		}

		var hora = null;
		var minuto = null;

		// Ajustamos la nueva hora

		var sh = ev.target.value.split( ":" );
		if( !sh[ 1 ] ) {
			sh = ev.target.value.split( "." );

			if( !sh[ 1 ] ) {
				sh = ev.target.value.split( "," );
			}
		}

		if( !sh[ 1 ] ) {
			hora = parseInt( sh[ 0 ] );
			minuto = 0;
		} else {
			hora = parseInt( sh[ 0 ] );
			minuto =parseInt( sh[ 1 ] );
		}

		if( isNaN( hora )) {
			hora = new Date().getHours();
		}

		if( isNaN( minuto )) {
			minuto = new Date().getMinutes();
		}

		if( hora > 23 ) {
			hora = 23;
		}

		if( hora < 0 ) {
			hora = 0;
		}

		if( minuto > 59 ) {
			minuto = 0;
		}

		if( minuto < 0 ) {
			minuto = 0;
		}

		// Asignamos la acción

		if ( this.fecha.hora < hora ) {
			var action = "next";
		} else if( this.fecha.hora === hora && this.fecha.minuto < minuto ) {
			var action = "next";
		} else {
			var action = "previus";
		}

		// Asignamos la nueva hora

		this.fecha.hora = hora;
		this.fecha.minuto = minuto;

		// Escribimos correctamente en el iniput

		ev.target.value = this._printableHour( this.fecha );

		// Cambiamos las horas previas y posteriores

		var container = this.$.selectable_hour.querySelector( ".slider" );
		var activeEl = this.$.selectable_hour.querySelector( ".slider > div[active]" );
		var previusEl = activeEl.previousElementSibling;
		var nextEl = activeEl.nextElementSibling;

		if( !previusEl ) {
			previusEl = container.lastElementChild;
		}

		if( !nextEl ) {
			nextEl = container.firstElementChild;
		}

		var previousQuarter = this._getPreviousQuarter( this.fecha );
		previusEl.querySelector( "input" ).value = this._printableHour( previousQuarter );
		
		var nextQuarter = this._getNextQuarter( this.fecha );
		nextEl.querySelector( "input" ).value = this._printableHour( nextQuarter );

		// Disparamos el evento si hay fecha completa

		if( this.fechaSelected.year ) {
			this._fechaDispatch();
		}
	}

	/**
	 * @method	_changeSliderYear
	 * 
	 * Detecta el cambio realizado a través del slider de años.
	 * 
	 * @param	{string}	action		Acción realizada sobre el slider.
	 */
	_changeSliderYear( action ) {
		var container = this.$.selectable_years.querySelector( ".slider" );
		var activeEl = this.$.selectable_years.querySelector( ".slider > div[active]" );
		var previusEl = activeEl.previousElementSibling;
		var nextEl = activeEl.nextElementSibling;

		if( !previusEl ) {
			previusEl = container.lastElementChild;
		}

		if( !nextEl ) {
			nextEl = container.firstElementChild;
		}

		if( action == "next" ) {
			// Pasamos el slider

			nextEl.querySelector( "input" ).value = this.fecha.ano;
			this._nextSlider( "year" );

			// Ponemos en el previus el año siguiente

			var nextYear = this._getNextYear( this.fecha );
			previusEl.querySelector( "input" ).value = nextYear.ano;
		} else {
			// Pasamos el slider

			previusEl.querySelector( "input" ).value = this.fecha.ano;
			this._previusSlider( "year" );

			// Ponemos en el next el año anterior

			var prevYear = this._getPreviusYear( this.fecha );
			nextEl.querySelector( "input" ).value = prevYear.ano;
		}
	}

	/**
	 * @method	_changeSliderMonth
	 * 
	 * Detecta el cambio realizado a través del slider de meses.
	 * 
	 * @param	{string}	action		Acción realizada sobre el slider.
	 */
	_changeSliderMonth( action ) {
		var container = this.$.selectable_months.querySelector( ".slider" );
		var activeEl = this.$.selectable_months.querySelector( ".slider > div[active]" );
		var previusEl = activeEl.previousElementSibling;
		var nextEl = activeEl.nextElementSibling;

		if( !previusEl ) {
			previusEl = container.lastElementChild;
		}

		if( !nextEl ) {
			nextEl = container.firstElementChild;
		}

		if( action == "next" ) {
			// Pasamos el slider

			nextEl.innerHTML = this.meses[ this.fecha.mes ];
			this._nextSlider( "month" );
			
			// Si el mes es enero, pasamos el año

			if( this.fecha.mes === 0 ) {
				this._changeSliderYear( "next" );
			}

			// Ponemos en el previus el mes siguiente

			var nextMonth = this._getNextMonth( this.fecha );
			previusEl.innerHTML = this.meses[ nextMonth.mes ];
		} else {
			// Pasamos el slider

			previusEl.innerHTML = this.meses[ this.fecha.mes ];
			this._previusSlider( "month" );

			// Si el mes es diciembre pasamos el año

			if( this.fecha.mes === 11 ) {
				this._changeSliderYear( "previus" );
			}

			// Ponemos en el next el mes anterior
			
			var prevMonth = this._getPreviusMonth( this.fecha );
			nextEl.innerHTML = this.meses[ prevMonth.mes ];
		}
	}

	/**
	 * @method	_changeSliderHour
	 * 
	 * Detecta el cambio realizado a través del slider de horas.
	 * 
	 * @param	{string}	action		Acción realizada sobre el slider.
	 */
	_changeSliderHour( ev, action ) {
		if( ev ) {
			action = ev.target.dataset.action;
		} else if ( !action ) {
			action = "next";
		}

		var container = this.$.selectable_hour.querySelector( ".slider" );
		var activeEl = this.$.selectable_hour.querySelector( ".slider > div[active]" );
		var previusEl = activeEl.previousElementSibling;
		var nextEl = activeEl.nextElementSibling;

		if( !previusEl ) {
			previusEl = container.lastElementChild;
		}

		if( !nextEl ) {
			nextEl = container.firstElementChild;
		}

		if( action == "next" ) {
			var valNext = nextEl.querySelector( "input" ).value;
			this.fecha.hora = parseInt( valNext.split( ":" )[ 0 ] );
			this.fecha.minuto = parseInt( valNext.split( ":" )[ 1 ] );
			
			this._nextSlider( "hour" );

			setTimeout(() => {
				var previousQuarter = this._getPreviousQuarter( this.fecha );
				activeEl.querySelector( "input" ).value = this._printableHour( previousQuarter );

				var nextQuarter = this._getNextQuarter( this.fecha );
				previusEl.querySelector( "input" ).value = this._printableHour( nextQuarter );
			}, 200);
		} else {
			var valNext = previusEl.querySelector( "input" ).value;
			this.fecha.hora = parseInt( valNext.split( ":" )[ 0 ] );
			this.fecha.minuto = parseInt( valNext.split( ":" )[ 1 ] );

			this._previusSlider( "hour" );

			setTimeout(() => {
				var previousQuarter = this._getPreviousQuarter( this.fecha );
				nextEl.querySelector( "input" ).value = this._printableHour( previousQuarter );

				var nextQuarter = this._getNextQuarter( this.fecha );
				activeEl.querySelector( "input" ).value = this._printableHour( nextQuarter );
			}, 200);
		}

		// Disparamos el evento si hay fecha completa

		if( this.fechaSelected.year ) {
			this._fechaDispatch();
		}
	}

	/**
	 * @method	_openSelectableList
	 * 
	 * Abre la liste de seleccionables del calendario.
	 * 
	 * @param 	{object}	ev			Objeto devuelto por el evento **click**
	 */
	_openSelectableList( ev ) {
		var selectable = ev.target.parentElement.parentElement;
		var options = selectable.querySelector( ".list_slider_selectable_cal" );

		// Mostramos los options

		Polymer.Slide.down( options, { speed: 200 } );
	}

	/**
	 * @method	_closeSelectableList
	 * 
	 * Cierra la liste de seleccionables del calendario.
	 */
	_closeSelectableList() {
		var pest = this.shadowRoot.querySelectorAll( ".list_slider_selectable_cal" );

		for( var i = 0; i < pest.length; i++ ) {
			if( pest[ i ].offsetHeight > 0 ) {
				Polymer.Slide.up( pest[ i ], { speed: 200 } );
			}
		}
	}

	/**
	 * @method	_translateDates
	 * 
	 * Traduce las fechas a cuatro idiomas (es,ca,en,fr).
	 */
	_translateDates() {
		var trans = {
			es: {
				txtHora : "Hora",
				diasinitial: [ "L", "M", "X", "J", "V", "S", "D" ],
				dias: [ "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo" ],
				diasshort: [ "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do" ],
				meses: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
				mesesshort:  [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ]
			},
			ca: {
				txtHora : "Hora",
				diasinitial: [ "Dl", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg" ],
				dias: [ "Diluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge" ],
				diasshort: [ "Dl", "Dm", "Dc", "Dj", "Dv", "Ds", "Dm" ],
				meses: [ "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
				mesesshort:  [ "Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des" ]
			},
			en: {
				txtHora : "Hour",
				diasinitial: [ "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ],
				dias: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
				diasshort: [ "Mon", "Tue", "Wed", "thu", "Fri", "Sat", "Sun" ],
				meses: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
				mesesshort:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			},
			fr: {
				txtHora : "Heure",
				diasinitial: [ "L", "M", "X", "J", "V", "S", "D" ],
				dias: [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" ],
				diasshort: [ "Lun", "Mar", "er", "Jeu", "Ven", "Sam", "Dim" ],
				meses: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
				mesesshort:  [ "Janv", "Fevr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Dec" ]
			}
		};

		this.txtHora = trans[ this.lang ].txtHora;
		this.diasinitial = trans[ this.lang ].diasinitial;
		this.dias = trans[ this.lang ].dias;
		this.diasshort = trans[ this.lang ].diasshort;
		this.meses = trans[ this.lang ].meses;
		this.mesesshort = trans[ this.lang ].mesesshort;
	}

	/**
	 * @method	_fechaDispatch
	 * 
	 * Dispara el evento personalizado del calendario.
	 */
	_fechaDispatch() {
		this.fechaSelected.name = this.name;

		this.fechaSelected.year = this.fecha.ano;
		this.fechaSelected.month = this.fecha.mes + 1;
		this.fechaSelected.day = this.fecha.dia;
		this.fechaSelected.hour = ( this.fecha.hora ) ? this.fecha.hora : 0;
		this.fechaSelected.minute = ( this.fecha.minuto ) ? this.fecha.minuto: 0;
		
		// Ponemos el string

		var string = this.fechaSelected.year + "-" + this.fechaSelected.month + "-" + this.fechaSelected.day;
		if( this.time ) {
			string += " " + this._printableHour( this.fechaSelected );
		}

		this.fechaSelected.string = string;

		// Functión de formatear fecha

		this.fechaSelected.format = {
			numeric: this._getFormatDate(),
			numericHour: this._getFormatDate( "numerica", false, true ),
			short: this._getFormatDate( "corta" ),
			shortHour: this._getFormatDate( "corta", false, true ),
			shortDay: this._getFormatDate( "corta", true, false ),
			shortFull: this._getFormatDate( "corta", true, true ),
			long: this._getFormatDate( "larga" ),
			longHour: this._getFormatDate( "larga", false, true ),
			longDay: this._getFormatDate( "larga", true, false ),
			longFull: this._getFormatDate( "larga", true, true )
		}
		
		// Asignamos el objeto de fecha
		this.fechaSelected.date = new Date( this.fechaSelected.string );

		// Disparamos el evento

		setTimeout(() => {
			if( !this.responsefunc ) {
				this.event.detail.date = this.fechaSelected;
				this.dispatchEvent( this.event );
			} else if( typeof this.responsefunc == "function" ) {
				this.responsefunc( this.fechaSelected );
			}
		}, 100);
		
		// NOTE: Quitamos el disparador del evento al cargar el conenido debido
		//		 a que no le encuentro funcionalidad.

		//document.addEventListener( "DOMContentLoaded", () => {
		//	this.dispatchEvent( this.event );
		//});
	}

	/**
	 * @method	_selectDay
	 * 
	 * Selecciona un día del calendario.
	 * 
	 * @param	{object}	ev			Objeto devuelto por el evento **click**
	 */
	_selectDay( ev ) {
		this.selectAnyDate = true;

		// Ponemos el nombre
		this.fechaSelected.name = this.name;

		// Quitamos los seleccionados

		for( var i = 0; i < this.diasMonth.length; i++ ) {
			if( this.diasMonth[ i ].hasAttribute( "selected" )) {
				this.diasMonth[ i ].removeAttribute( "selected" );
				break;
			}
		}
		
		// Asignamos el seleccionado
		
		var diaEl = ev.target;
		if( ev.target.tagName == "SPAN" ) {
			diaEl = ev.target.parentElement;
		}

		diaEl.setAttribute( "selected", "" );

		// Asignamos el día a la fecha

		this.fecha.dia = parseInt( diaEl.dataset.dia );

		// Asignamos la fecha al objeto

		this.fechaSelected.year = this.fecha.ano;
		this.fechaSelected.month = this.fecha.mes + 1;
		this.fechaSelected.day = this.fecha.dia;
		this.fechaSelected.hour = ( this.time ) ? this.fecha.hora: 0;
		this.fechaSelected.minute = ( this.time) ? this.fecha.minuto: 0;

		// Ponemos el string

		var string = this.fechaSelected.year + "-" + this.fechaSelected.month + "-" + this.fechaSelected.day;
		if( this.time ) {
			string += " " + this._printableHour( this.fechaSelected );
		}

		this.fechaSelected.string = string;

		// Functión de formatear fecha

		this.fechaSelected.format = {
			numeric: this._getFormatDate(),
			numericHour: this._getFormatDate( "numerica", false, true ),
			short: this._getFormatDate( "corta" ),
			shortHour: this._getFormatDate( "corta", false, true ),
			shortDay: this._getFormatDate( "corta", true, false ),
			shortFull: this._getFormatDate( "corta", true, true ),
			long: this._getFormatDate( "larga" ),
			longHour: this._getFormatDate( "larga", false, true ),
			longDay: this._getFormatDate( "larga", true, false ),
			longFull: this._getFormatDate( "larga", true, true )
		}
		
		// Asignamos el objeto de fecha
		this.fechaSelected.date = new Date( this.fechaSelected.string );

		// Disparamos el evento

		if( !this.responsefunc ) {
			this.event.detail.date = this.fechaSelected;
			this.dispatchEvent( this.event );
		} else if( typeof this.responsefunc == "function" ) {
			this.responsefunc( this.fechaSelected );
		}
	}

	/**
	 * @method	_propertiesControl
	 * 
	 * Control de propiedades para los lísteners.
	 */
	_propertiesControl() {
		// Propiedad de control de inputs de años

		this.listenInputsYear = ( ev ) => {
			this._changeInputYear( ev );
		};

		// Propiedad de control de inputs de horas

		this.listenInputsHour = ( ev ) => {
			this._changeInputHour( ev );
		};

		// Propiedad de control de listas ocultas (abrir)

		this.listenPestSliderOpen = ( ev ) => {
			this._openSelectableList( ev );
		};

		// Propiedad de control de listas ocultas (cerrar)

		this.listenPestSliderClose = ( ev ) => {
			this._closeSelectableList( ev );
		};

		// Propiedad de control de los días del calenadrio

		this.listenCellDay = ( ev ) => {
			this._selectDay( ev );
		};
	}

	/**
	 * @method	_setListenersMesAct
	 * 
	 * Pone a la escucha los días del mes acutal.
	 */
	_setListenersMesAct() {
		// Eliminamos los lísteners anteriores

		if( this.diasMonth.length > 0 ) {
			for( var i = 0; i < this.diasMonth.length; i++ ) {
				this.diasMonth[ i ].removeEventListener( "click", this.listenCellDay );
			}
		}

		// Asignamos los nuevos días del mes
		this.diasMonth = this.shadowRoot.querySelectorAll( ".cont_slider_calendar div[active] .dia" );

		// Asignamos los lísteners a los nuevos días
		for( var i = 0; i < this.diasMonth.length; i++ ) {
			if( this.diasMonth[ i ].hasAttribute( "selectable" )) {
				this.diasMonth[ i ].addEventListener( "click", this.listenCellDay );
			}                    
		}
	}

	/**
	 * @method	_listeners
	 * 
	 * Pone a la escucha los elementos necesarios del calendario.
	 */
	_listeners() {
		// Escuchamos los inputs de años

		this.inputsYears.ant.addEventListener( "change", this.listenInputsYear );
		this.inputsYears.act.addEventListener( "change", this.listenInputsYear );
		this.inputsYears.sig.addEventListener( "change", this.listenInputsYear );

		// Escuchamos el seleecion de meses

		var slideMonth = this.$.selectable_months.querySelector( ".slider" );
		slideMonth.addEventListener( "click", this.listenPestSliderOpen );

		// Escuchamos los inputs de horas

		if( this.time ) {
			this.inputsHours.ant.addEventListener( "change", this.listenInputsHour );
			this.inputsHours.act.addEventListener( "change", this.listenInputsHour );
			this.inputsHours.sig.addEventListener( "change", this.listenInputsHour );
		}

		// Escuchamos el click en el documento

		window.addEventListener( "click", this.listenPestSliderClose );
	}

	/**
	 * @method	_unlisteners
	 * 
	 * Elimna los listeners del calendario.
	 */
	_unlisteners() {
		// Dejamos de escuchar inputs de años

		this.inputsYears.ant.removeEventListener( "change", this.listenInputsYear );
		this.inputsYears.act.removeEventListener( "change", this.listenInputsYear );
		this.inputsYears.sig.removeEventListener( "change", this.listenInputsYear );

		// Dejamos de escuchar los inputs de horas

		if( this.time ) {
			this.inputsHours.ant.removeEventListener( "change", this.listenInputsHour );
			this.inputsHours.act.removeEventListener( "change", this.listenInputsHour );
			this.inputsHours.sig.removeEventListener( "change", this.listenInputsHour );
		}

		// Dejamos de escuchar la seleecion de meses

		var slideMonth = this.$.selectable_months.querySelector( ".slider" );
		slideMonth.removeEventListener( "click", this.listenPestSliderOpen );

		// Dejamos de escuchar los días del mes

		if( this.diasMonth.length > 0 ) {
			for( var i = 0; i < this.diasMonth.length; i++ ) {
				this.diasMonth[ i ].removeEventListener( "click", this.listenCellDay );
			}
		}

		// Dejamos de escuchar el click en el documento

		window.removeEventListener( "click", this.listenPestSliderClose );
	}
}

window.customElements.define( "aw-calendar-simple", AwCalendarSimple );

/**
 * @typedef {{
 * 	ant: HTMLInputElement,
 *  act: HTMLInputElement,
 * 	sig: HTMLInputElement
 * }} CalendarInputsSelects
 */