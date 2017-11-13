<?php
require_once("recommend.php");
require_once("sample_list.php");


$re = new Recommend();

$ratinglist=$re->getRecommendations($restaurants, "Caren");

arsort($ratinglist);

echo "<pre>";
print_r($ratinglist);
echo "</pre>";

$i=1;
foreach($ratinglist as $key=>$value)
{
    if($i<6)
    {
	echo $i.":".$key."<br/>";
    }
	$i++;
}


?>
