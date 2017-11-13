<?php
	require_once("item_based/recommend.php");
	require_once("item_based/sample_list.php");

	$latlon = $_GET['latlon'];
	$keyw = $_GET['keyword'];

	if ($keyw == 'restaurant') {
		$placeList = getPlaceList($latlon,$placeType);

		// Acquire the recommendList for the user
		$re = new Recommend();
		$ratinglist=$re->getRecommendations($restaurants, "Caren");
		arsort($ratinglist);

		// Match the place list with the recommendlist
		$recommendPlaces = array();
		foreach($ratinglist as $key=>$value)
		{
		    foreach ($placeList as $place) {
		    	if ($place == $key) {
		    		array_push($recommendPlaces, $key);
		    	}
		    }
		}

		// Get the tweets about the top 1 place
		$placeTweets = getTwitterContent($recommendPlaces[0],$latlon);
		// $placeTweets = array_unique($placeTweets);
		$recommendation = "The place I would recommend is ".$recommendPlaces[0].". The comments about the place in Twitter is ".$placeTweets[0];
		print_r($recommendation);
	} elseif ($keyw == 'movie' || $keyw =='game' || $keyw == 'music' ) {
		$tweets = getTwitterContent($keyw, $latlon);
		// $tweets = array_unique($tweets);
		$recommendation = "The new I would recommend is ".$tweets[0];
		print_r($recommendation);
	}


	


///////////////////////////////////////////////////////////////////////////////////////////////
// This is the function to acquire a list of places based on the users' interesting keywords //
///////////////////////////////////////////////////////////////////////////////////////////////
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

	function getPlaceList($latlon,$type)
	{
		$contents = readdata("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$latlon."&radius=100000&type=".$keyw); 
		
		$contents =json_decode($contents);
		$place= $contents->results;
		
		$placeList = array(); 
		foreach($place as $value)
		{
			$name=$value->name;
			array_push($placeList,$name);
		}
		
		return $placeList;
	}

///////////////////////////////////////////////////////////////////
// This is the function to acquire the information from twitter  //
///////////////////////////////////////////////////////////////////
	function getTwitterContent($keyword,$latlon)
	{
		$geocode = $latlon.",10mi";
		$geocode = str_replace(',','%2C',$geocode);
		$keyw=$keyword;
		
		require_once('./twitteroauth/twitteroauth.php');
		require_once('./config.php');

			/* If access tokens are not available redirect to connect page. */
			if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
				//    header('Location: ./clearsessions.php');
			}
			/* Get user access tokens out of the session. */
				
			$access_token = $_SESSION['access_token'];
			
			/* Create a TwitterOauth object with consumer/user tokens. */
			
			//Caren's comment - I changed a code a little bit. The consumer_key, consumer_scecret, access_key, and access_secret are defined from config.php
			//So you should define those variables from the config.php (DO NOT Change the following)
			$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_KEY, ACCESS_SECRET);
			/* If method is set change API call made. Test is called by default. */
		
			$contents = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=".$keyw."&geocode=".$geocode."&count=100");
			$result = array();
			$contents = $contents->statuses;

			// Pass the tweets to the build model to check whether the user will read the tweet.
			foreach ($contents as $content) {
				$language = $content->lang;
				$text = $content->text;
				$retweetCount = $content->retweet_count;
				if(strpos($text,'#')!==false){
					if ($language=='en'){
						if ($retweetCount > 2){
							array_push($result, $text);
						} elseif (strlen($text)<=85) {
							array_push($result, $text);
						}
					}
				}
			}

			$decode=$contents;
			return $result;
	}




?>

