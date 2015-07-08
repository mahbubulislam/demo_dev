<?php
$cssClass = isset($overrideOptions['css'])? $overrideOptions['css'] : null;
$divID = isset($overrideOptions['divID'])? 'id="'. $overrideOptions['divID'] .'"' : null;
?>
<div class="content-section <?php print $cssClass;?>" <?php print $divID;?>>
    <div class="container-fluid">
         <div class="row">
            <?php
            if(isset($header['0']['value'])){
                print $header['0']['value'];
            }
            foreach($body as $idx => $field){
              print $body[$idx]['value'];
            }?>
         </div>
    </div>
</div>
