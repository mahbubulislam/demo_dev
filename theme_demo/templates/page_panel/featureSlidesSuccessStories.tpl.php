<?php
$cssClass = isset($overrideOptions['css'])? $overrideOptions['css'] : null;
$divID = isset($overrideOptions['divID'])? 'id="'. $overrideOptions['divID'] .'"' : null;
?>
<div class="featured-slider <?php print $cssClass;?>" <?php print $divID;?>>
  <ul class="slides">

    <?php
    $i = 0;
    foreach ($body as $idx => $field) {
      $i++;
      ?>
      <li class="parallax" id="slide<?php print $i; ?>f">
        <div class="featured image-bg-container">
          <div class="image-bg">
          </div>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-2 col-md-offset-2 gradient"></div>
              <?php print $body[$idx]['value']; ?>
            </div>
          </div>
        </div>
      </li>

    <?php } ?>
  </ul>
</div>
