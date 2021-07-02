# AW-CALENDAR

Este componente crea un calendario simple desarrollado por Arisman Webs. Para añadir el calendario.

```html
<script type="module" src="/node_modules/aw_calendar/aw-calendar-simple.js"></script>
<aw-calendar-simple></aw-calendar-simple>
```

El componente admite las siguientes propiedades:

- `name`: (String) Da un nombre al calendario para poder tratarlo por separado.
- `time`: (Boolean) Indica si se debe poder seleccionar la hora.
- `fechainit`: (String) Selecciona una fecha inicial en el calendario en format "AAAA-MM-DD HH:SS" (La hora no es obligatoria).
- `noselectpast`: (Boolean) Indica si no se deben poder seleccionar las fechas ya pasadas. Def: false.
- `noselectsat`: (Boolean) Inica si no se deben poder seleccionar los sábados. Def: false
- `noselectsun`: (Boolean) Inica si no se deben poder seleccionar los domingos. Def: false
- `noselectfest`: (Boolean) Indica si no se deben poder seleccionar los festivos. Def: false.
- `nomarktoday`: (Boolean) Indica si no debe ir marcado el día actual en el calendario. Def: false.
- `nomarkfest`: (Boolean) Indica si queremos que los festivos salgan marcados. Def: false.
- `ccaa`: (String) Comunidad autónoma sobre la que calculará los festivos. Def: false
- `diasfest`: (Array) Array con días festivos que se quieran añadir manualmente.
- `noink`: (Boolean) Evita el efecto ripple al seleccionar un día en el calendario.
- `responsefunc`: Función de callback al seleccionar un día en el calendario.

#### time:

Si queremos mostrar la hora en el calendario para que se pueda seleccionar:

```html
<aw-calendar-simple unresolved time></aw-calendar-simple>
```

#### fechainit:

Si queremos que el calendario tenga una fecha seleccionada al cargarse (la hora no es obligatoria):

```html
<aw-calendar-simple unresolved time fechainit="2018-02-09 20:42"></aw-calendar-simple>
```

#### ccaa:

Añade los días festivos específicos de una comunidad autónoma. Valores posibles:

- `andalucia`
- `aragon`
- `asturias`
- `baleares`
- `canarias`
- `cantabria`
- `castilla`
- `cataluña`
- `ceuta`
- `extremadura`
- `galicia`
- `madrid`
- `mancha`
- `melilla`
- `murcia`
- `navarra`
- `rioja`
- `valencia`
- `vascongadas`

```html
<aw-calendar-simple unresolved fechainit="2018-02-09" ccaa="andalucia"></aw-calendar-simple>
```

Para el ejemplo anterior vemos que el 28 de febrero está marcado como festivo al ser el día de Andalucía

#### diasfest:

Si se necesitan añadir días festivos concretos, como por ejemplo festivos locales se puede hacer a través de este atributo. Pasar en un Array los días festivos que se necesita.

¡NOTA! Recuerda que para pasar Arrays a Polymer hay que invertir las comillas del atributo y debería quedar asi: diasfest='["1-9","2-11"]'.

```html
<aw-calendar-simple unresolved fechainit="2018-9-14 20:30" ccaa="cataluña" diasfest='["1-9","2-11"]'></aw-calendar-simple>
```
___

## Recoger datos cuando seleccionamos:

Para recoger la fecha seleccionada en el calendario lo podemos hacer de dos maneras diferentes. Podemos hacer uso del atributo **responsefunc**, añadiendo a éste una función de respuesta al que el calendario enviará los datos al hacer una selección. Si este atributo no está definido, podemos recoger los valores del calendario a través del evento `aw-calendar-simple`.

A continuación mostramos dos ejemplos con las diferentes opciones:

<span style="font-size:11px">Con función de callback:</span>
```html
<aw-calendar-simple unresolved name="mi-calendario" responsefunc="myfunc"></aw-calendar-simple>
<script>
	function myfunc( response ) {
		console.log( response );
	}
</script>
```

<span style="font-size:11px">Con evento aw-calendar-simple:</span>
```html
<aw-calendar-simple unresolved name="mi-calendario"></aw-calendar-simple>
<script>
window.addEventListener( "aw-calendar-simple", ( ev ) =&gt; {
    console.log( ev.detail.date );
    if( ev.detail.date.name === "mi-calendario" ) {
        console.log( "Mi calendario tiene esta fecha " + ev.detail.date.string );
    }
});
</script>
```

Como se puede observar en la consola, todos los calendarios lanzan el evento, para poder diferenciarlos cuando hay varios calendarios, se utiliza el atributo name que es enviado en la respuesta. de este modo podemos identificar cual es el calendario que se está enviando.

Con este evento, podremos tratar la fecha y la hora seleccionada en el calendario.
___

## Métodos:

Tenemos a nuestra disposición diferentes métodos para tratar el calendario a través de javascript:

```javascript
/** @type {AwCalendarSimple} */
let calendar = document.querySelector( "aw-calendar-simple" );

// Return selected date at calendar
let date = calendar.get_date();
console.log( date );

// Reset the calendar to its initial state
calendar.reset();

// Assign a given date to the calendar
calendar.set_date( "2030-05-12" );
```

___

## Dando estilo calendario:

Para dar esitlo al calendario podemos utilizar las siguientes variables.

```css
/* Variables de tema asumidas por el calendario */

--aw-font-family
--aw-primary-color
--aw-primary-text-color

/* Titulo del selectable de hora */

--aw-calendar-hour-tit-selectable-font-size: 14px;
--aw-calendar-hour-tit-selectable-font-weight: normal;
--aw-calendar-hour-tit-selectable-font-style: oblique;
--aw-calendar-hour-tit-selectable-color: #888888;
--aw-calendar-hour-background-colo: #f5f3f3;

/* Estilos de los selectables */

--aw-calendar-selectables-max-width: 76px;
--aw-calendar-selectable-font-family: --aw-font-family | arial;
--aw-calendar-selectable-font-size: 14px;
--aw-calendar-selectable-font-style: oblique;
--aw-calendar-selectable-color: --aw-primary-text-color | #333333;

--aw-calendar-input-background-color-focused: #F6F6F6;
--aw-calendar-input-border-color-focused: #DDDDDD;
--aw-calendar-input-color-focused: --aw-calendar-selectable-color | --aw-primary-text-color | #333333;


/* Iconos de los selectables */

--aw-calendar-icon-fill: #777777; 
--aw-calendar-icon-fill-hover: #999999; 

/* Lista de selección de meses */

--aw-calendar-list-color: --aw-primary-text-color | #333333;
--aw-calendar-list-color-hover: white;
--aw-calendar-list-background-color: white; 
--aw-calendar-list-background-color-hover: --aw-primary-color | #999999; 
--aw-calendar-list-font-size: 12px;
--aw-calendar-list-padding: 3px;

/* Región de días del calendario */

--aw-calendar-tit-color: --aw-primary-text-color | #333333;
--aw-calendar-tit-font-size: 14px;
--aw-calendar-tit-font-style: normal;
--aw-calendar-tit-font-weight: bold;

--aw-calendar-color: #333333; 
--aw-calendar-font-weight: normal;
--aw-calendar-font-size: 14px;
--aw-calendar-font-style: normal;

--aw-calendar-day-color-hover: --aw-calendar-color | #333333;
--aw-calendar-day-background-color-hover: #EAEAEA;

--aw-calendar-selected-color: white;
--aw-calendar-selected-radius: 50%;
--aw-calendar-selected-background-color: #444444;

--aw-calendar-today-radius: 50%; 
--aw-calendar-today-background-color: #999999;
--aw-calendar-festivo-color: #ad1414; 
```




<a href="http://www.arismanwebs.es">Arisman Webs - Diseño Web</a>