<?php
session_start();
include("connection.php");
class Divisions extends connection
{
    function __construct()
    {
        $this->connectionDB();

    }
    public function loadData()
    {

        $key=$_GET['name'];
		$tbl=$_GET['tbl'];

        $sql = "select st_asgeojson(geom) as geometry,* from  $tbl  where device_id='$key' limit 1";

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

$json = new Divisions();
echo $json->loadData();
?>