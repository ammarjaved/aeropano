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


        $sql = "select id,com_exly_2  from kml_data.layer1";
		
		//echo   $sql;

        $output = array();

        $result_query = pg_query($sql);
        if($result_query)
        {
           // $output = pg_fetch_assoc($result_query);
            while($row=pg_fetch_assoc($result_query))
            {
                $out = json_decode($row['com_exly_2']);
                $id=$row['id'];
               // print_r($out);
                echo  sizeof($out);
             // if(sizeof($out)>0) {
                $k=1;
                  for ($i = 0; $i < sizeof($out); $i++) {
                      $img= $out[$i]->file_rel_path . $out[$i]->file_extension;
                      //$j=$i+1;
                      $sql1 = "update kml_data.layer1 set img".$k."="."'".$img."'"."  where  id=".$id;
                      echo $sql1;
                      pg_query($sql1);
                      $k++;

                  }
                echo'<br />';
              //}
               // $i=0;
//                while($out){
//                 print_r($out[0]);
//                 $i++;
//                }

            }
        }

        $this->closeConnection();
        return json_encode($output);
    }

}

$json = new Divisions();
echo $json->loadData();
?>