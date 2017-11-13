# Developer Manual

## 1\. Allocation Topic - Social Search

The topic of application is to develop a voice-driven web software to recommend personalized contents to the user, who drive the car on the road, based on the user's location and personal interesting topics. The process of the system could be shown in Firgure 1.

![](./Documentation/Flow Chart.png)

    Figure 1\. The flow chart of the system

## 2\. Web Service (API)

The Web Services have been used in this project are as follows:

*   Webspeech API
*   GEO API
*   Place API
*   Twitter API


## 2.1 Webspeech API

It is used for oral communication between the user and the system. Some of the codes are as follows:

```javascript
$.ajaxSetup({async: false});
$.get("./senti_php/examples/senti.php",{dialog:dialog},function(data){
  console.log(data);
  var senti = data.slice(0,8);
  console.log(senti);
  var dialog = data.slice(8);
  console.log(dialog);
  if (senti=='<pre>neg') {
    aText = 'That sounds bad.';
    if(dialog=='I am sad'){
      aText = 'That sounds bad. May be try some delicious foods?';
    }else if (dialog == 'not for game now') {
      aText = 'Then how about some news about movie?';
    }else{
      aText = 'Sorry, the system could not find anything for you.';
    }
  } else if (senti =='<pre>pos') {
    aText = "that's great.";
    if (dialog=='I am happy') {
      aText = 'You seems have a good day. Would you like to listen to some news about game?';
    }else if (dialog == 'movie sounds good') {
      aText = 'I am searching, it may take a little long.';
      keyword='movie';
      getLocation();
    }else if (dialog == 'music sounds good') {
      aText = 'I am searching, it may take a little long.';
      keyword='music';
      getLocation();
    }else{
      aText = 'Sorry, the system could not find anything for you.';
    }
  } else {
    aText = 'Maybe try to have a rest';
    if(dialog == 'I would have a try' ){
      keyword = 'restaurant';
      getLocation();
      aText = 'I am searching, it may take a little long.';
    }else if (dialog == 'I would not have a try') {
      aText = 'Try to have a relax';
    }else if (dialog == 'game sounds good'){
      aText = 'I am searching, it may take a little long.';
      keyword='game';
      getLocation();
    }else if (dialog == 'not for movie now') {
      aText = 'Would you like to know some news about music?';
    }else if (dialog == 'not for music now') {
      aText = 'Try to have a rest is a good chioce for you';
    }else{
      aText = 'Sorry, the system could not find anything for you.';
    }
  }
}
```

## 2.2 Geo API

It is used for getting the longtitude and latitude of the user's location. Some of the codes are as follows:
```javascript
function getLocation() {
    if (navigator.geolocation) {
        var latlon = navigator.geolocation.getCurrentPosition(showPosition, showGeoError);
    } else {
        var text =  "Geolocation is not supported by this browser.";
        return text;
    }
}

function showPosition(position) {
    latlon = position.coords.latitude + "," + position.coords.longitude;
    $.ajaxSetup({async: false});
    $.get("./handler.php",{latlon:latlon,keyword:keyword},function(data){
      console.log(data);
      var u = new SpeechSynthesisUtterance();
      u.text = data;
      u.lang = 'en-AU';
      u.rate = 1;
      u.volume=1;
      speechSynthesis.speak(u);

    });
}

function showGeoError(error) {
    var u = new SpeechSynthesisUtterance();
    u.text = '';
    u.lang = 'en-AU';
    u.rate = 1;
    u.volume=1;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            u.text = "The Geolocation cannot be acquired because of the request are denied."
            break;
        case error.POSITION_UNAVAILABLE:
            u.text = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            u.text = "The request to get the location timed out."
            break;
        case error.UNKNOWN_ERROR:
            u.text = "An unknown error occurred."
            break;
    }
    speechSynthesis.speak(u);
}
```

## 2.3 Place API

It is used for getting the name of places based on user's interesting and location(longtitde and latitude).
```javascript
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
```

## 2.4 Twitter API

It is used for capturing tweets in Twitter that the user might feel interested.
```javascript
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
```

## 3\. Dialog Scripts 1
```
[When the user starts a system]
System: Hello Master. How are you doing today?
User: I am sad.
System: That sounds bad. May be try some delicious foods?
	If the user say yes: I would have a try.
		System: I am searching, it may take a little long. ... The place I would recommend is {{place}}. The comments about the place in Twitter is {{tweet content}}.
	If the user say no: I would not have a try.
		System: Try to have a relax.
```

## 4\. Dialog Scripts 2
```
[When the user starts a system]
System: Hello Master. How are you doing today?
User: I am happy.
System: You seems have a good day. Would you like to listen to some news about game?
If the user say yes: game sounds good.
	System: I am searching, it may take a little long. ... The new I would recommend is {{tweet content}}.
If the user say no: not for game now.
	System: Then how about some news about movie?
	If the user say yes: movie sounds good.
		System: I am searching, it may take a little long. ... The new I would recommend is {{tweet content}}
	If the user say no: not for movie now.
		System: Would you like to know some news about music?
		If the user say yes: music sounds good.
			System: I am searching, it may take a little long. ... The new I would recommend is {{tweet content}}
		If the user say no: not for music now.
			System: Try to have a rest is a good chioce for you.
```
## 5\. AI Techniques

The AI techniques have been used in this project are as follows:

### 1\. Natrual Language Process - Sentiment Analysis

It is used to judege the mood of the user during the interaction with the system. Based on the sentiment factors of different words in the users' speech, the system could identify the users' dialog is positive, negative or neutral. Therefore the system could give different responses based on the user's words.

The main file of the system is: [senti.php](../Application/src/senti_php/examples/senti.php)

*   **Input: **a string
*   **Input: **pos, neg or neu

For example:

*   The user says: "I am happy."

*   The system: "You seems have a good day. "

*   The user says: "I am sad."

*   The system: "That sounds bad."

### 2\. Recommendation System:

A recommendation system would be used to generate the places that the user may be interested based on the data of other people, who are similar to the user.

*   **Input: **the user's name and a list of other people's data ([sample_list](../Application/src/item_based/sample_list.php))

*   **Output: **The outcome of the recommendation system is a list of places that the user may be interested. These places will be matched with the places of the user's location, which are generated by the Place API.

The code of the system is in the[ item_based folder](../Application/src/item_based)

### 3\. Decision Tree Model

There is a decision tree model built by Weka J48 to check whether the user would read a tweet or not, based on the user's previous historic records ([twitterModel4.arff](../application/data/twitterModel4.arff)).

*   **Input: **a tweet
*   **Output: **True or False to show whether the user read or not

![](./Documentation/twitterModel.png)

## 6\. Past User's Behaviour Data

 **### Pre-defined User's Interested Topics and Place Type**

In this case, I pre-define the user's interesting topics are: game, movie, music, whichi will be used in the Twitter API to search the tweets for meeting the user's interesting.

I also pre-define the user's interesting place type is restaurant, which will be used in the Place API and recommendation system.

In the further development, the system could get the user's interning topcis and place types based on the analysis of the words and sentences from the user.

 **### Sample Data for Recommendation System**

The recommendation system need have records of other people about their rates of different places. In this case, it is the number of different restaurants. Based on these data, the recommendation system could have a list of places that could be recommended to the user.

The file of the data is [sample_list](../Application/src/item_based/sample_list.php)

Parf of the records could be as follows:

$restaurants =  array(

    "Shuang" => array("Customs House Hotel" => 2.5, "The Old Woolstore Apartment Hotel" => 3.5,
                    "The Henry Jones Art Hotel" => 3, "Annapurna Indian Cuisine" => 4,
                    "Salamanca Inn" => 2.5,
                    "Hearth Pizza & Small Plates" => 3.5),

    "Alex" => array("The Waratah Hotel" => 2.5, "The Old Woolstore Apartment Hotel" => 3.5,
                      "Riversdale Estate French Bistro, High Tea Orangery & Peter Rabbit Garden" => 3, "Annapurna Indian Cuisine" => 3.5,
                      "Salamanca Inn" => 2.5, "Hearth Pizza & Small Plates" => 1),

 **### History of Reading Tweets**

There are list of user's reading records of tweets to be used to generate a decision tree model. The feature of this data are

*   **twitterLength: **It is a number about the lenght of the tweet. Records are numbers.
*   **haveKeyword: **This will check whether the tweet has the keywords of the user's interested topics (game, movie, music in this case). Records are TRUE or FAlSE.
*   **language: **This is the lanugage of the tweet, normally is en as English. But some user may prefer for zh as Chinese or other languages. Reocrds are "en,und,fr,de,ja,zh" (und as undefined)
*   **followersCount: **This is the followers of the user who publish the tweet. Records are numbers.
*   **retweetCount: **Tis is the number of tweets that retweet the original tweet. Reocrds are numbers.
*   **favoriteCount: **This is the number of people who favorite the tweet. Records are numbers.
*   **haveHash: **This is about whether the tweet has a "#" hash tag. Records are TRUE or FALSE.
*   **read: **This is about whether the user read the tweet or not. Records are TRUE or False.

Although there are only "hasHash", "language", "retweetCount" and "twitterLength" used in this case, the model for other users maybe different, which may use all of the features mentioned above.

The file of the data is [sample_list](../Application/data/twitterModel4.arff)

A sample of the records could be generated by [userDataGenerator.php](../Application/src/userDataGenerator.php)

Some records could be as follows:
```
@relation twitterModel

@attribute twitterLength real
@attribute haveKeyword {TRUE,FALSE}
@attribute language {en,und,fr,de,ja,zh}
@attribute followersCount real
@attribute retweetCount real
@attribute favoriteCount real
@attribute haveHash {TRUE, FALSE}
@attribute read {TRUE, FALSE}

@data
34, TRUE, en, 292, 0, 0, FALSE, FALSE
117, TRUE, en, 292, 0, 0, FALSE, FALSE
44, TRUE, en, 342, 0, 0, FALSE, FALSE
107, TRUE, en, 367, 0, 0, FALSE, FALSE
58, FALSE, en, 433, 0, 0, FALSE, FALSE
65, TRUE, en, 463, 0, 0, FALSE, FALSE
123, TRUE, en, 473, 0, 0, FALSE, FALSE
39, TRUE, en, 518, 0, 0, FALSE, FALSE
139, TRUE, en, 570, 0, 0, FALSE, FALSE
43, TRUE, en, 599, 0, 0, FALSE, FALSE
92, TRUE, en, 599, 0, 0, FALSE, FALSE
93, TRUE, en, 603, 0, 0, FALSE, FALSE
33, FALSE, en, 623, 0, 0, FALSE, FALSE
```
## 7\. Other issues

### News API

The news API doesn't work as expected due to the fact that many services providers are charging for the services. Therefore, it is not suitable for this project.

### Twitter Results

Unlike the news from news API, the text in tweets are short and sometimes with symbols and hashtags. Combining with the limitation of time, the result of the recommended tweets, sometimes, could wired and non-sense. Therefore, the further development should consider rules to rule out some wired tweets.

### Change of Scope

Due to the lack of news APi and the limitation of time, the scope of the project has changed from location-based event recommendation to location-based tweet recommendation. As the original project requiring keywords and location terms from news to identify events, the text in tweets are short and miss factors like keywords and location terms, which means hard to identify events from Twitter. Therefore, the scope of the project narrow down to just recommend tweets to the user based on the user's location and interesting topics.

### Change of Radius

Because the original setting of radius (1ms) in Twitter API could not acquire any tweets in the test location, the redius of the system has changed to 10 ms, which could get some results as expected.
