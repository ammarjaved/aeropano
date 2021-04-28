
var map;
var baseLayers;
var dp;
var selectedId;
var identifyme='';

$(document).ready(function() {
       
    setTimeout(function(){
        map = L.map('map').setView([3.016603, 101.858382], 11);
		document.getElementById('map').style.cursor = 'pointer'

        var st=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            //.addTo(map);
        var st1=L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);


       customer = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:pano_layer',
            format: 'image/png',
			maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        customer.addTo(map);
		
		grid = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:5x5_sub_grid',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        grid.addTo(map);
		
		boundary = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:boundary_bangi_east_',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        boundary.addTo(map);

        dp = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:demand_point',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        dp.addTo(map);

        lcj = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:lv_cable_joint',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        lcj.addTo(map);

        lf = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:lv_fuse',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        lf.addTo(map);
		
		 ohc = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:lv_oh_conductor',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        ohc.addTo(map);

        ugc = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:lv_ug_conductor',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        ugc.addTo(map);

        lvdb = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:lvdb_fp',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        lvdb.addTo(map);

        manhole = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:manhole',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        manhole.addTo(map);

        street_light = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:street_light',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        street_light.addTo(map);

        pole = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:pole',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        pole.addTo(map);

        structure_duct = L.tileLayer.wms("http://121.121.232.54:7090/geoserver/cite/wms", {
            layers: 'cite:structure_duct',
            format: 'image/png',
            maxZoom: 20,
            transparent: true
        }, {buffer: 10});
        structure_duct.addTo(map);


        /*  var drawnItems = new L.FeatureGroup();
         map.addLayer(drawnItems);
         var drawControl = new L.Control.Draw({
          draw :{
              circle:false,
            marker: true,
            polygon:false,
            polyline:true,
            rectangle:false
          },
             edit: {
                 featureGroup: drawnItems
             }
         });
         
         map.addControl(drawControl);
         $(".leaflet-draw-draw-circlemarker").hide();

         
        map.on('draw:created', function (e) {

            layer = e.layer;
            console.log(JSON.stringify(layer.toGeoJSON()));

        });*/

        map.on('click', function(e) {
            //map.off('click');
            $("#wg").html('');
            // Build the URL for a GetFeatureInfo
            var url = getFeatureInfoUrl(
                map,
                customer,
                e.latlng,
                {
                    'info_format': 'application/json',
                    'propertyName': 'NAME,AREA_CODE,DESCRIPTIO'
                }
            );
            $.ajax({
                url: 'services/proxy.php?url='+encodeURIComponent(url),
                dataType: 'JSON',
                //data: data,
                method: 'GET',
                async: false,
                success: function callback(data) {

                    //  alert(data
                    var str='<div id="window1" class="window">' +
                        '<div class="green">' +
                        '<p class="windowTitle">Pano Images</p>' +
                        '</div>' +
                        '<div class="mainWindow">' +
                        // '<canvas id="canvas" width="400" height="480">' +
                        // '</canvas>' +
                        '<div id="panorama" width="400px" height="480px"></div>'+
					    '<div class="row"><button style="margin-left: 30%;" onclick=preNext("pre") class="btn btn-success">Previous</button><button  onclick=preNext("next")  style="float: right;margin-right: 35%;" class="btn btn-success">Next</button></div>'

                        '</div>' +
                        '</div>'

                    $("#wg").html(str);

                   
                    console.log(data)
					if(data.features.length!=0){
					 createWindow(1);	
					selectedId=data.features[0].id.split('.')[1];
                    // var canvas = document.getElementById('canvas');
                    // var context = canvas.getContext('2d');
                    // context.clearRect(0,0 ,canvas.width,canvas.height)
                    //     img.src = data.features[0].properties.image_path;
                    //     init_pano('canvas')
                    // setTimeout(function () {
                    //     init_pano('canvas')
                    // },1000)
                    pannellum.viewer('panorama', {
                        "type": "equirectangular",
                        "panorama": data.features[0].properties.photo,
						"compass": true,
                        "autoLoad": true
                    });
					
					if(identifyme!=''){
                         map.removeLayer(identifyme)
                        }
                        identifyme = L.geoJSON(data.features[0].geometry).addTo(map);
					
					}

                }
            });




        });


        baseLayers = {
            "Street": st,
            "Satellite": st1
        };
		
		
		
        var groupedOverlays = {
            "POI": {
                "360 Images":customer,
				 "demand ponts":dp,
				 "5x5 grid":grid,
				 "boundary_bangi_east":boundary,
				  "lv cable joint":lcj,
				   "lv fuse":lf,
				    "lvdb_fp":lvdb,
				    "lv_oh_conductor":ohc,
					"lv_ug_conductor":ugc,
					"manhole":manhole,
					"street_light":street_light,
					"pole":pole,
					"structure_duct":structure_duct

            }
        };




        var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
            collapsed: true,
            position: 'topright'
            // groupCheckboxes: true
        }).addTo(map);



    },1000)
});

function getFeatureInfoUrl(map, layer, latlng, params) {

    var point = map.latLngToContainerPoint(latlng, map.getZoom()),
        size = map.getSize(),

        params = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: 'EPSG:4326',
            styles: layer.wmsParams.styles,
            transparent: layer.wmsParams.transparent,
            version: layer._wmsVersion,
            format:layer.wmsParams.format,
            bbox: map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            layers: layer.wmsParams.layers,
            query_layers: layer.wmsParams.layers,
            info_format: 'application/json'
        };

    params[params.version === '1.3.0' ? 'i' : 'x'] = parseInt(point.x);
    params[params.version === '1.3.0' ? 'j' : 'y'] = parseInt(point.y);

    // return this._url + L.Util.getParamString(params, this._url, true);

    var url = layer._url + L.Util.getParamString(params, layer._url, true);
    if(typeof layer.wmsParams.proxy !== "undefined") {


        // check if proxyParamName is defined (instead, use default value)
        if(typeof layer.wmsParams.proxyParamName !== "undefined")
            layer.wmsParams.proxyParamName = 'url';

        // build proxy (es: "proxy.php?url=" )
        _proxy = layer.wmsParams.proxy + '?' + layer.wmsParams.proxyParamName + '=';

        url = _proxy + encodeURIComponent(url);

    }

    return url.toString();

}


function preNext(status){
    $("#wg").html('');
    $.ajax({
        url: 'services/pre_next.php?id='+selectedId+'&st='+status,
        dataType: 'JSON',
        //data: data,
        method: 'GET',
        async: false,
        success: function callback(data) {

            //  alert(data
            var str='<div id="window1" class="window">' +
                '<div class="green">' +
                '<p class="windowTitle">Pano Images</p>' +
                '</div>' +
                '<div class="mainWindow">' +
                // '<canvas id="canvas" width="400" height="480">' +
                // '</canvas>' +
                '<div id="panorama" width="400px" height="480px"></div>'+
                '<div class="row"><button style="margin-left: 30%;" onclick=preNext("pre") class="btn btn-success">Previous</button><button  onclick=preNext("next")  style="float: right;margin-right: 35%;" class="btn btn-success">Next</button></div>'
            '</div>' +
            '</div>'

            $("#wg").html(str);

            createWindow(1);
            console.log(data)
            // var canvas = document.getElementById('canvas');
            // var context = canvas.getContext('2d');
            // context.clearRect(0,0 ,canvas.width,canvas.height)
            //     img.src = data.features[0].properties.image_path;
            //     init_pano('canvas')
            // setTimeout(function () {
            //     init_pano('canvas')
            // },1000)=
            selectedId=data[0].gid
            pannellum.viewer('panorama', {
                "type": "equirectangular",
                "panorama": data[0].photo,
				"compass": true,
                "autoLoad": true
            });
			
			if(identifyme!=''){
                         map.removeLayer(identifyme)
                        }
            identifyme = L.geoJSON(JSON.parse(data[0].geom)).addTo(map);


        }
    });

}


function activeSelectedLayerPano(val) {
//alert(val)
    map.off('click');
    map.on('click', function(e) {
        //map.off('click');
        $("#wg").html('');
        // Build the URL for a GetFeatureInfo
        var url = getFeatureInfoUrl(
            map,
            customer,
            e.latlng,
            {
                'info_format': 'application/json',
                'propertyName': 'NAME,AREA_CODE,DESCRIPTIO'
            }
        );
        $.ajax({
            url: 'services/proxy.php?url='+encodeURIComponent(url),
            dataType: 'JSON',
            //data: data,
            method: 'GET',
            async: false,
            success: function callback(data) {

                //  alert(data
                var str='<div id="window1" class="window">' +
                    '<div class="green">' +
                    '<p class="windowTitle">Pano Images</p>' +
                    '</div>' +
                    '<div class="mainWindow">' +
                    // '<canvas id="canvas" width="400" height="480">' +
                    // '</canvas>' +
                    '<div id="panorama" width="400px" height="480px"></div>'+
                    '<div class="row"><button style="margin-left: 30%;" onclick=preNext("pre") class="btn btn-success">Previous</button><button  onclick=preNext("next")  style="float: right;margin-right: 35%;" class="btn btn-success">Next</button></div>'

                '</div>' +
                '</div>'

                $("#wg").html(str);


                console.log(data)
                if(data.features.length!=0){
                    createWindow(1);
                    selectedId=data.features[0].id.split('.')[1];
                    // var canvas = document.getElementById('canvas');
                    // var context = canvas.getContext('2d');
                    // context.clearRect(0,0 ,canvas.width,canvas.height)
                    //     img.src = data.features[0].properties.image_path;
                    //     init_pano('canvas')
                    // setTimeout(function () {
                    //     init_pano('canvas')
                    // },1000)
                    pannellum.viewer('panorama', {
                        "type": "equirectangular",
                        "panorama": data.features[0].properties.photo,
                        "compass": true,
                        "autoLoad": true
                    });
                    if(identifyme!=''){
                        map.removeLayer(identifyme)
                    }
                    identifyme = L.geoJSON(data.features[0].geometry).addTo(map);

                }

            }
        });




    });
}

function activeSelectedLayerOther(val) {
//alert(val)
    var sel_lyr=''
	getDeviceIdDataLayer(val);
    if(val=='pano_layer'){
        activeSelectedLayerPano();
    }else {

        if(val=='5x5_sub_grid'){
            sel_lyr=grid
        }
        if(val=='demand_point'){
            sel_lyr=dp
        }
        if(val=='lv_cable_joint'){
            sel_lyr=lcj
        }
        if(val=='lv_fuse'){
            sel_lyr=lf
        }
        if(val=='lv_oh_conductor'){
            sel_lyr=ohc
        }
        if(val=='lv_ug_conductor'){
            sel_lyr=ugc
        }
        if(val=='lvdb_fp'){
            sel_lyr=lvdb
        }
        if(val=='pole'){
            sel_lyr=pole
        }
        if(val=='manhole'){
            sel_lyr=manhole
        }
        if(val=='street_light'){
            sel_lyr=street_light
        }
        map.off('click');
        map.on('click', function (e) {

            // $("#wg").html('');
            // Build the URL for a GetFeatureInfo
            var url = getFeatureInfoUrl(
                map,
                sel_lyr,
                e.latlng,
                {
                    'info_format': 'application/json',
                    'propertyName': 'NAME,AREA_CODE,DESCRIPTIO'
                }
            );
            $.ajax({
                url: 'services/proxy.php?url=' + encodeURIComponent(url),
                dataType: 'JSON',
                //data: data,
                method: 'GET',
                async: false,
                success: function callback(data) {



                    console.log(data)
                    if (data.features.length != 0) {
                        var str='';
                      for(key in data.features[0].properties){
                          //console.log(key);
                          //console.log(data.features[0].properties[key]);
                          if(key=='image_1'||key=='image_2'||key=='image_3'||key=='image_4'||key=='image_5'||key=='image_6'){
                              str = str + '<tr><td>' + key + '</td><td><a href="'+data.features[0].properties[key]+'" class=\'example-image-link\' data-lightbox=\'example-set\' title=\'&lt;button class=&quot;primary &quot; onclick= rotate_img(&quot;pic1&quot)  &gt;Rotate image&lt;/button&gt;\'><img src="' + data.features[0].properties[key] + '" width="20px" height="20px"></a></td></tr>'

                          }
                          else {
                              str = str + '<tr><td>' + key + '</td><td>' + data.features[0].properties[key] + '</td></tr>'
                          }
                      }
                      $("#my_data").html(str);
                        if(identifyme!=''){
                            map.removeLayer(identifyme)
                        }
                        var myStyle = {
                            "fillColor": "#ff7800"
                        };
                        identifyme = L.geoJSON(data.features[0].geometry,
                            {
                                style: myStyle
                            }
                            ).addTo(map);

                    }

                }
            });


        });

    }



}

var my_query=''

$( ".typeahead" ).change(function() {
  mu_query=$('.typeahead').val();
});

function getDeviceIdDataLayer(table){
	
	//var sttr='<input class"col-md-6" type="text" style="margin-bottom: 8px;margin-left: 10px;padding: 6px;border: none;font-size: 15px;border-radius: 10px;box-shadow: 0 2px 5px #ff7c7c, 0 0 0;" id="search_did" name="search_did" placeholder="Serach Device id" class="typeahead">'+
    //            '<button class"col-md-3"  id="ser1" style="margin-bottom: 8px;margin-left: 10px;" onclick="search_did()" class="btn btn-success">Search</button>'
         //  $("#th_id").html('')
		   // $("#th_id").html(sttr)
		   //remote:'services/search.php?key=%QUERY&table='+table,
		   
            $('.typeahead').typeahead({
				remote: {
					url:'services/search.php?key='+my_query+'&table=',
					wildcard: '%QUERY',
					replace: function () {
					var q = 'services/search.php?key='+my_query+'&table=';
						q += encodeURIComponent($("#tableLayer").val());
					return q;
				}
				},	
				name: 'hce',
				  cache: false,
				limit: 10
            });

 

}



    function search_did(){
        var name=$('.typeahead').val();
		var tbl=$("#tableLayer").val();
		if(tbl=="pano_layer"||tbl=="5x5_sub_grid"){
			alert("No device id exist in selected layer ")
			return false;
		}
        $.ajax({
            url: 'services/searchByName.php?name='+name+'&tbl='+tbl,
            dataType: 'JSON',
            //data: data,
            method: 'GET',
            async: false,
            success: function callback(data) {
             
                console.log(data);
				
				 if (data.length != 0) {
                        var str='';
                      for(key in data[0]){
                          //console.log(key);
                          //console.log(data.features[0].properties[key]);
                          if(key=='image_1'||key=='image_2'||key=='image_3'||key=='image_4'||key=='image_5'||key=='image_6'){
                              str = str + '<tr><td>' + key + '</td><td><a href="'+data[0][key]+'" class=\'example-image-link\' data-lightbox=\'example-set\' title=\'&lt;button class=&quot;primary &quot; onclick= rotate_img(&quot;pic1&quot)  &gt;Rotate image&lt;/button&gt;\'><img src="' + data[0][key] + '" width="20px" height="20px"></a></td></tr>'

                          }
                          else {
                              str = str + '<tr><td>' + key + '</td><td>' + data[0][key] + '</td></tr>'
                          }
                      }
                      $("#my_data").html(str);
                        if(identifyme!=''){
                            map.removeLayer(identifyme)
                        }
                        var myStyle = {
                            "fillColor": "#ff7800"
                        };
                        identifyme = L.geoJSON(JSON.parse(data[0].geometry),
                            {
                                style: myStyle
                            }
                            ).addTo(map);
							
							if(tbl=='lv_oh_conductor'||tbl=='lv_ug_conductor'){
							map.setView(new L.LatLng(JSON.parse(data[0].geometry).coordinates[0][0][1],JSON.parse(data[0].geometry).coordinates[0][0][0]), 16);

							}else{
							map.setView(new L.LatLng(JSON.parse(data[0].geometry).coordinates[1],JSON.parse(data[0].geometry).coordinates[0]), 16);
							}

                    }

            }
        });

    }


function drawRect() {
    var polygonDrawer = new L.Draw.Rectangle(map);
    polygonDrawer.enable();
}
$(document).ready(function(){
    setTimeout(function(){
    map.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer.toGeoJSON();
        console.log(layer);
        getLayerAllDataResult(JSON.stringify(layer.geometry))
    });
    },3000)
})

function getLayerAllDataResult(geom){
    var tbl=$("#tableLayer").val();

    $.ajax({
        url: 'services/GetALLData.php?geom='+geom+'&tbl='+tbl,
        dataType: 'JSON',
        //data: data,
        method: 'GET',
        async: false,
        success: function callback(data) {
           // console.log(data);
            var jsonHtmlTable = ConvertJsonToTable(data, 'all_data1', 'table table-border', 'Download');
            $("#all_data").html(jsonHtmlTable);

        }
    });

}

        
