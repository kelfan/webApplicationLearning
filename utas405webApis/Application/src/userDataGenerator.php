<?php
	$keyw="all";
	$geocode="-42.8981724%2C147.330728%2C10mi";
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


		$contents = $contents->statuses;
		foreach ($contents as $content) {
			$twitterText = $content->text;

			///////////////////////////////////////////////
			// calculate the length of the twitter text  //
			///////////////////////////////////////////////
			echo strlen($twitterText).', ';
			// if(strpos($twitterText,'#')!==false||strpos($twitterText,'@')!==false)
			 
			////////////////////////////////////////////////////////////////////////////////
			// Check whether the text contains the keywords of users' interesting topics  //
			////////////////////////////////////////////////////////////////////////////////
			if(strpos($twitterText,'movie')!==false||strpos($twitterText,'game')!==false||strpos($twitterText,'music')!==false){
				echo 'TRUE'.', ';
			}else{
				echo 'FALSE'.', ';
			}


			///////////////////////////////////////////////////////////////////////////////////////////////
			// Check whether the language of the text is suitable for the users, normally it is English  //
			///////////////////////////////////////////////////////////////////////////////////////////////
			
			$tweetLanguage = $content->lang;
			echo $tweetLanguage.', ';
			
			///////////////////////////////////////////////////////
			// the number of followers of the owner of the tweet //
			///////////////////////////////////////////////////////
			echo $content->user->followers_count.', ';
			echo $content->retweet_count.', ';
			echo $content->favorite_count.', ';
			echo "<br>";	
		}

		$decode=$contents;
		
?>
