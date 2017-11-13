<?php
  $dialog = $_GET['dialog'];
  if (PHP_SAPI != 'cli') {
    echo "<pre>";
  }

  require_once __DIR__ . '/../autoload.php';
  

  function senti($string) {
    $sentiment = new \PHPInsight\Sentiment();
    // calculations:
    $scores = $sentiment->score($string);

      // output:
    if ($scores['pos']/$scores['neg'] == 1)  {
      return 'neu';
    } elseif ($scores['pos']/$scores['neg'] > 1) {
      return 'pos';
    } else {
      return 'neg';
    }
  }

  $result=senti($dialog).$dialog;
  echo $result;

?>