
$(document).ready(function () {

//====================================================================
//-----------------
var sourceModels = [
{ label: "Multi-models mean", value: "EUR-11_all", shortname: "Multi-models mean" },
{ label: "CNRM-CERFACS-CNRM-CM5 (SMHI-RCA4)", value: "EUR-11_CNRM-CERFACS-CNRM-CM5_rcp85_r1i1p1_SMHI-RCA4_v1", shortname: "CNRM-CM5 SMHI-RCA4" },
{ label: "ICHEC-EC-EARTH (SMHI-RCA4)", value: "EUR-11_ICHEC-EC-EARTH_rcp85_r12i1p1_SMHI-RCA4_v1", shortname: "EC-EARTH SMHI-RCA4" },
{ label: "ICHEC-EC-EARTH (DMI-HIRHAM5)", value: "EUR-11_ICHEC-EC-EARTH_rcp85_r3i1p1_DMI-HIRHAM5_v1", shortname: "EC-EARTH DMI-HIRHAM5" },
{ label: "IPSL-IPSL-CM5A-MR (SMHI-RCA4)", value: "EUR-11_IPSL-IPSL-CM5A-MR_rcp85_r1i1p1_SMHI-RCA4_v1", shortname: "IPSL-CM5A-MR SMHI-RCA4" },
{ label: "MOHC-HadGEM2-ES (SMHI-RCA4)", value: "EUR-11_MOHC-HadGEM2-ES_rcp85_r1i1p1_SMHI-RCA4_v1", shortname: "HadGEM2-ES SMHI-RCA4" },
{ label: "MPI-M-MPI-ESM-LR (SMHI-RCA4)", value: "EUR-11_MPI-M-MPI-ESM-LR_rcp85_r1i1p1_SMHI-RCA4_v1", shortname: "MPI-ESM-LR SMHI-RCA4" }
];
$("#selectModels").jqxDropDownList({ source: sourceModels, selectedIndex: 0, checkboxes: true, autoOpen: true, width: '100%', height: '25px'});
$("#selectModels").jqxDropDownList('checkIndex', 0);
//$("#selectModels").jqxDropDownList('checkAll');

$('#selectModels').on('checkChange', function (event) {
	//console.log("change models");
	var models = $("#selectModels").jqxDropDownList('getCheckedItems');
	if ( models.length == 0 )
		return;
	var active_countries = Object.keys(selected);
	unSelectCountries(active_countries);
	selectCountriesFromArray(active_countries);
})

//-----------------
var sourceVariables = [
{ label: "Change in temperature at 2 meters relative to 1971-2000", value: "tas", group: "Variables" },
{ label: "Number of tropical nights", value: "trop", group: "Indices" }
];
$("#selectVariable").jqxComboBox({ source: sourceVariables, selectedIndex: 0, width: '100%', height: '25px'});
$("#selectVariable").jqxComboBox('disableAt', 3);

$('#selectVariable').on('change', function (event) {
	//console.log("change variable");
	var models = $("#selectModels").jqxDropDownList('getCheckedItems');
	if ( models.length == 0 )
		return;
	var newTitle = $('#selectVariable').jqxComboBox('getSelectedItem').label;
	chart.setTitle({text: newTitle});	
	var active_countries = Object.keys(selected);
	unSelectCountries(active_countries);
	selectCountriesFromArray(active_countries);
})

//-----------------
var sourceExperiments = [
{ label: "RCP 8.5", value: "rcp85" },
{ label: "RCP 4.5", value: "rcp45" }
];
$("#selectExperiment").jqxComboBox({ source: sourceExperiments, selectedIndex: 0, width: '100%', height: '25px'});
$("#selectExperiment").jqxComboBox('disableItem', "rcp45");

$('#selectExperiment').on('change', function (event) {
	//console.log("change experiment");
	var models = $("#selectModels").jqxDropDownList('getCheckedItems');
	if ( models.length == 0 )
		return;
	var active_countries = Object.keys(selected);
	unSelectCountries(active_countries);
	selectCountriesFromArray(active_countries);
})

//-----------------
var sourceTime = [
{ label: "Yearly", prefix1: "_yearsanomalies_", prefix2: ""},
{ label: "Winter", prefix1: "_seasanomalies_",  prefix2: "_DJF"},
{ label: "Spring", prefix1: "_seasanomalies_",  prefix2: "_MAM"},
{ label: "Summer", prefix1: "_seasanomalies_",  prefix2: "_JJA"},
{ label: "Autumn", prefix1: "_seasanomalies_",  prefix2: "_SON"}
];
$("#selectTimes").jqxDropDownList({ source: sourceTime, selectedIndex: 0, checkboxes: true, autoOpen: true, width: '100%', height: '25px'});
$("#selectTimes").jqxDropDownList('checkIndex', 0);

$("#selectTimes").on('checkChange', function (event) {
	//console.log("change time");
	var times = $("#selectTimes").jqxDropDownList('getCheckedItems');
	if ( times.length == 0 )
		return;
	var active_countries = Object.keys(selected);
	unSelectCountries(active_countries);
	selectCountriesFromArray(active_countries);
})

//-----------------
$("#jqxButton1").jqxButton({ width: 100 });
$("#jqxButton2").jqxButton({ width: 200 });

$("#jqxButton1").on('click', function (event) {
	unSelectCountries();
})
var countriesBiggest10 = ["FRA", "ESP", "SWE", "DEU", "FIN", "NOR", "UKR", "POL", "BLR", "GBR"];
$("#jqxButton2").on('click', function (event) {
	var models = $("#selectModels").jqxDropDownList('getCheckedItems');
	if ( models.length == 0 )
		return;
	unSelectCountries();
	selectCountriesFromArray(countriesBiggest10);
})

//====================================================================
//var mapmadeUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
//var mapmadeUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
//var mapmadeUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
//var mapmadeUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//var mapmadeUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
//var mapmadeUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
var mapmadeUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    mapmadeAttribution = 'LSCE &copy; 2014 | Baselayer &copy; ArcGis',
    mapmade = new L.TileLayer(mapmadeUrl, {maxZoom: 8, attribution: mapmadeAttribution}),
    maplatlng = new L.LatLng(55, 10);

var map = new L.Map('map', {center: maplatlng, zoom: 3, layers: [mapmade]});

var domainpoly = L.polyline(domain, {color: "#888888", weight: 5, smoothFactor: 0}).addTo(map);

var selected = {};
var colors = {};

function style(feature) {
  var country = feature.properties.adm0_a3;
  colors[country] = '#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).substr(-6);
  //console.log(colors);
  return {
       weight: 1,
       opacity: 1.0,
       color: 'white',
       dashArray: '3',
       fillOpacity: 0.5,
       fillColor: colors[country]
  };
}

function onEachFeature(feature, layer) {
	layer.on({
		click : pushpullFeature
	});
}

var dashStyles = [
    'Solid',
    'ShortDash',
    'ShortDot',
    'ShortDashDot',
    'ShortDashDotDot',
    'Dot',
    'Dash',
    'LongDash',
    'DashDot',
    'LongDashDot',
    'LongDashDotDot'
];

var serieId = 0;

function pushpullFeature(event) {
	$('#selectVariable').change();
	var models = $("#selectModels").jqxDropDownList('getCheckedItems');
	if ( models.length == 0 )		// if not models selected
		return;
	var layer = event.target;
	var country = layer.feature.properties.adm0_a3;
	pushpullCountry(layer, country);
}

function pushpullCountry(layer, country) {
	if ( !(country in selected) ) {
		var models = $("#selectModels").jqxDropDownList('getCheckedItems');
		var variable = $("#selectVariable").jqxComboBox('getSelectedItem');
		var experiment = $("#selectExperiment").jqxComboBox('getSelectedItem');
		var times = $("#selectTimes").jqxDropDownList('getCheckedItems');
		selected[country]={};
		selected[country].series=[];
		for (var j = 0; j < times.length; j++) {
			for (var i = 0; i < models.length; i++) {
				if ( models.length == 1 ) var d = j;
				else var d = i;
				var request = "http://webportals.ipsl.jussieu.fr/thredds/ncss/grid/EUROCORDEX/integration/" + variable.value + "/" + experiment.value + "/" + country + "/" + variable.value + "_" + models[i].value + times[j].originalItem.prefix1 + country + times[j].originalItem.prefix2 + ".nc?var=" + variable.value + "&latitude=0&longitude=0&temporal=all&accept=csv";
				addData(request, colors[country], dashStyles[d], country +  " (" + experiment.value + " / " + times[j].originalItem.label + " / " + models[i].originalItem.shortname + ")", layer, country);
			}
		}
	} else 
		unSelectCountry(country);
	
	if ( !L.Browser.ie && !L.Browser.opera )
		layer.bringToFront();
	//console.log(selected);
}

function selectCountry(country, serieId) {
	var layer = selected[country].layer;
	layer.setStyle({
              weight: 5,
              color: '#666',
              dashArray: '',
              fillOpacity: 0.8
        });
	selected[country].series.push(serieId);
}

function unSelectCountry(country) {
	var layer = selected[country].layer;
        layer.setStyle({
              weight: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.5
        });
	for (var i = 0; i < selected[country].series.length; i++) {
		id = selected[country].series[i];
		chart.get(id).remove();		
		//console.log("remove "+id);
	}
        delete selected[country];
}

function unSelectCountries() {
	for (var country in selected)
		unSelectCountry(country);
}

function selectCountriesFromArray(array) {
	for (var id in countries._layers) {
		var country = countries._layers[id].feature.properties.adm0_a3;
		var layer = countries._layers[id];
		//console.log(country);
		if ( array.indexOf(country) != -1 ) 
			pushpullCountry(layer, country);
	}
}

countries = L.geoJson(countries, {
        style: style,
	onEachFeature: onEachFeature
}).addTo(map);

//====================================================================
var d = [];
var options = {
    chart: {
        renderTo: 'timeChart',
	zoomType: 'xy',
	type: 'spline'
    },
    title: {
        text: '',
	style: {
		color: '#000000',
		fontWeight: 'bold',
		fontSize: '12px'
	},
	x: -320,
	y: 20,
	align: 'right'
    },
    xAxis: {
	type: 'datetime',
	gridLineWidth: 1,
	labels: {
                dateTimeLabelFormats: {
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                }
	}
    },
    yAxis: {
	gridLineWidth: 1,
        title: {
            text: ''
        }
    },
    rangeSelector: {
	inputDateFormat: '%Y',
    	buttons: [{
        	type: 'year',
        	count: 25,
        	text: '25Y'},
    		{
        	type: 'year',
        	count: 50,
        	text: '50Y'},
    		{
        	type: 'all',
        	text: 'All'}
		]
    },
    navigator: {
    	enabled: true,
        series: {
        	id: 'navigator'
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true,
	valueDecimals: 2,
	useHTML: true,
        headerFormat: '<small>{point.key}</small><table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
        		'<td style="text-align: right"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
	xDateFormat: '%Y'
    },
    legend: {
	enabled: true,
        align: 'right',
        verticalAlign: 'top',
	width: 300,
        y: 60
    },
    plotOptions: {
        spline: {
            marker: {
		enabled: false,
                radius: 2,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    exporting: {
        enabled: true,
	filename: "EUROCORDEX_chart",
	sourceWidth: 1200,
	sourceHeight: 600,
	scale: 1
    },
    credits: {
	enabled: true, 
	text: "EUROCORDEX Time Series Viewer - LSCE"
    },
    series: []
};

// Create the chart
var chart = new Highcharts.StockChart(options);
// http://jsfiddle.net/SyyUZ/4/


function addData(request, color, dash, label, layer, country) {

    $.ajax({
    	  async: false,
          type: "GET",
	  url: request,
	  success: function(data) {
	    // Split the lines
	    var lines = data.split('\n');
	    var serie = {
		    data: []
            }; 
	    // Iterate over the lines and add categories or series
	    $.each(lines, function(lineNo, line) {
		//console.log(line);
		// ncss display a empty line at end
		if (line.length == 0) return false;
	        var items = line.split(',');
	        // header line containes categories
	        if (lineNo != 0)
	    		serie.data.push([Date.parse(items[0]),parseFloat(items[3])]);
    	    });
	    serie.name = label;
	    serie.color = color;
	    serie.dashStyle = dash;
	    serie.id = serieId;

	    chart.addSeries(serie);
	    var nav = chart.get('navigator');
	    nav.setData(serie.data);
            chart.xAxis[0].setExtremes();
	    selected[country].layer = layer;
	    selectCountry(country, serieId);
	    serieId++;
	    //console.log(label);
	}
    });
}


})
