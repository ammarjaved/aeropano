<?php
session_start();
$loc = 'http://' . $_SERVER['HTTP_HOST'];
if (isset($_SESSION['logedin'])) {

} 
else {
    header("Location:" . $loc . "/pano_app/login/loginform.php");
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




    <link rel="stylesheet" href="css/main.css">

</head>
<!-- onload="setTimeout(function() { document.myForm.submit() }, 5000)" -->
<body>

<div class="container-fluid">
	<div class="row" id="row-main">

                       



           
			<div id="map" style="z-index: 1">
<!--				<div style="z-index: 1000000;position: absolute;padding-left: 8px;padding-top: 200px;"  >-->
<!--				-->
<!--						-->
<!--						<span id="nl2" class="pull-left toggle-sidebar-left"><i class="glyphicon glyphicon-chevron-left sidegl"></i></span>-->
<!--						<!-- <a href="services/logout.php"><span class="glyphicon glyphicon-log-out sp"></span class="sp"> Logout</a> -->-->
<!--						-->
<!--							<!-- <button id="nr1" type="button" class="btn btn-s btn-default pull-right toggle-sidebar-right"><i class="fa fa-bars"></i></button> -->-->
<!--						<span id="nr2" class="pull-left toggle-sidebar-right"><i class="glyphicon glyphicon-chevron-right sidegl"></i></span>	-->
<!--				</div>	-->

				<div style="z-index: 1000000;position: absolute;margin-left:75%; ; margin-top:10px;float: right;"   class="row">
						
							<img class="d-lg-none d-sm-block" id="logo2" alt="Logo" style="margin-top:7px; " src="imgs/logo.png" height="38">
                    <a href="services/logout.php"><span class="glyphicon glyphicon-log-out logg"></span></a></h4></nobr>


                </div>





				
			</div>
        <div id="wg" class="windowGroup">
<!--            <div id="window1" class="window">-->
<!--                <div class="green">-->
<!--                    <p class="windowTitle">Pano Images</p>-->
<!--                </div>-->
<!--                <div class="mainWindow">-->
<!--                    <canvas id="canvas" width="400" height="480">-->
<!---->
<!--                    </canvas>-->
<!--                </div>-->
<!--            </div>-->
        </div>


    </div>

</div>


	
<script src="http://malsup.github.com/jquery.form.js"></script>
<script src="scripts/main.js"></script>
<link rel="stylesheet" href="lib/window-engine.css" />
<script src="lib/window-engine.js"></script>
<script src="scripts/style.js"></script>

</body>
</html>
