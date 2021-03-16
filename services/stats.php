<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("connection.php");


class Pss extends connection
{
    function __construct()
    {
        $this->connectionDB();

    }

    public function loadData()
    {

        $output = array();


        $gg=$_REQUEST['kml'];

        $sql3="select district,tehsil,mauza,bricklins,industries FROM smog_pdma.tbl_all_mauzas where  st_intersects(st_setsrid(st_geomfromGeojson('$gg'),4326),geom)";


        $result_query3 = pg_query($sql3);
        if ($result_query3) {
            $output = pg_fetch_all($result_query3);
        }


        $this->closeConnection();
        // echo $output;
        return json_encode($output);
    }
}

$json = new Pss();
//$json->closeConnection();
echo $json->loadData();


?>