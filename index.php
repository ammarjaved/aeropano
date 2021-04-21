<?php
session_start();
$loc = 'http://' . $_SERVER['HTTP_HOST'];
if (isset($_SESSION['logedin'])) {

} 
else {
    header("Location:" . $loc . "/aeropano/login/loginform.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Aero</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
	 <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

	  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />

	  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>

	   <script src="https://unpkg.com/esri-leaflet@2.1.1/dist/esri-leaflet.js"></script>
    <script type="text/javascript" src="scripts/html5pano.js"></script>
<!-- leaflet library  end-->


        <!--shapefile modules-->


		<link rel="stylesheet" href="resources/draw/leaflet.draw.css"/>
    <script src="resources/draw/leaflet.draw-custom.js"></script>
    <script src="lib/leaflet-groupedlayercontrol/leaflet.groupedlayercontrol.js"></script>
    <script type="text/javascript" src="scripts/turf.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>




    <link rel="stylesheet" href="css/main.css">
    <style>
        #panorama {
            width: 400px;
            height: 400px;
        }
    </style>
</head>
<!-- onload="setTimeout(function() { document.myForm.submit() }, 5000)" -->
<body>

<div class="container-fluid">
<!--	<div class="row" id="row-main">-->
<!--    </div>-->
                       


  <div class="row">
           
			<div id="map" class="col-md-9" style="z-index: 1">


				
            </div>
        <div class="col-md-3">
		<div style="margin-top:10px;padding-left:40px;padding-bottom:20px;" class="row">

							<img class="d-lg-none d-sm-block" id="logo2" alt="Logo" style="margin-top:7px; " src="imgs/logo.png" height="38">
                   <a href="services/logout.php"><span class="glyphicon glyphicon-log-out logg"></span></a></h4></nobr>





			</div>
            <div class="col-md-12" class="form-group">
                <label >Select Layer:</label>
                <select class="form-control" id="tableLayer" onchange="activeSelectedLayerOther(this.value)">
                    <option value="pano_layer">Pano Layer</option>
                    <option value="5x5_sub_grid">5x5_sub_grid</option>
                    <option value="demand_point">Demand Point</option>
                    <option value="lv_cable_joint">lv_cable_joint</option>
                    <option value="lv_fuse">lv_fuse</option>
                    <option value="lv_oh_conductor">lv_oh_conductor</option>
                    <option value="lv_ug_conductor">lv_ug_conductor</option>
                    <option value="lvdb_fp">lvdb_fp</option>
                    <option value="pole">pole</option>
                    <option value="manhole">manhole</option>
                    <option value="street_light">street_light</option>
                </select>
            </div>
			
			 <div class="col-md-12" class="form-group">
			 <label class"col-md-3">Type Device Id:</label>
			 <div id="th_id" class="row"> 
				<input class"col-md-6" type="text" style="margin-bottom: 8px;margin-left: 10px;padding: 6px;border: none;font-size: 15px;border-radius: 10px;box-shadow: 0 2px 5px #ff7c7c, 0 0 0;" id="search_did" name="search_did" placeholder="Search Device id" class="typeahead">
                <button class"col-md-3"  id="ser1" style="margin-bottom: 8px;margin-left: 10px;" onclick="search_did()" class="btn btn-success">Search</button>
				</div>

			</div>	   
			

            <div class="col-md-12" style="height: 70vh ;overflow-y: scroll;">
                <table class="table table-border">
                    <tr>
                        <td>Field</td>
                        <td>value</td>
                    </tr>
                    <tbody id="my_data" >

                    </tbody>
                </table>
            </div>

        </div>
  </div>
        <div id="wg" class="windowGroup">

        </div>



</div>


	
<script src="login/jquery.form.js"></script>
<script src="scripts/main.js"></script>
<link rel="stylesheet" href="lib/window-engine.css" />
<script src="lib/window-engine.js"></script>
<script src="scripts/style.js"></script>

<link rel="stylesheet" href="lib/images_slider/css-view/lightbox.css" type="text/css" />
<script src="lib/images_slider/js-view/lightbox-2.6.min.js"></script>
<script src="lib/images_slider/js-view/jQueryRotate.js"></script>
<script src="scripts/typeahead.min.js"></script>



</body>
</html>




