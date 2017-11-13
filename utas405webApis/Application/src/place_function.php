<?php
	getPlaceList('-42.8824225,147.3191067','100000','hotel');
	function readdata($url)
	{
		//put your api key 
		$apikey="AIzaSyDnuQrr0vlEa4SeLUHoiByspd1GXPjXdfA";
		
		$curl = curl_init();
		$url = $url."&key=$apikey";
		curl_setopt($curl, CURLOPT_URL, $url);
		
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($curl, CURLOPT_SSLVERSION, 1);
		
		$contents = curl_exec($curl);
		return $contents;
	}

	function getPlaceList($geocode,$radius,$type)
	{
		$contents = readdata("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$geocode."&radius=".$radius."&type=".$type); 
		
		$contents =json_decode($contents);
		$place= $contents->results;
		
		$placeList = array(); 
		foreach($place as $value)
		{
			$name=$value->name;
			array_push($placeList,$name);
		}
		
		print_r($placeList);
	}
	

?>
