<?php
$cssClass = isset($overrideOptions['css'])? $overrideOptions['css'] : null;
$divID = isset($overrideOptions['divID'])? 'id="'. $overrideOptions['divID'] .'"' : null;
?>

<div class="flexslider header-bg-slider <?php print $cssClass;?>" <?php print $divID;?>>
  <ul class="slides">

    <?php
    $i = 0;
    foreach ($body as $idx => $field) {
      $i++;
      ?>
      <li class="parallax" id="slide<?php print $i;?>">
        <?php print $body[$idx]['value']; ?>
      </li>

    <?php   }   ?>
  </ul>
</div>
