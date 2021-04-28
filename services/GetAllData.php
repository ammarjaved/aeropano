<?php
session_start();
include("connection.php");
class GetAllData extends connection
{
    function __construct()
    {
        $this->connectionDB();

    }
    public function loadData()
    {

        $geom=$_GET['geom'];
		$tbl=$_GET['tbl'];

        $sql = "select * from  $tbl  where st_intersects(geom,st_setsrid(ST_GeomFromGeoJSON ('$geom'),4326))";

        $output = array();

        $result_query = pg_query($sql);
        if($result_query)
        {
            $output = pg_fetch_all($result_query);
        }


        $this->closeConnection();
        return json_encode($output);
    }

}

$json = new GetAllData();
echo $json->loadData();
?>