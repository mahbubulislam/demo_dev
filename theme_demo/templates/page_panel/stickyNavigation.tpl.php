<?php
$cssClass = isset($overrideOptions['css'])? $overrideOptions['css'] : null;
$divID = isset($overrideOptions['divID'])? 'id="'. $overrideOptions['divID'] .'"' : null;
?>
<div class="sticky-nav <?php print $cssClass;?>" <?php print $divID;?>>
    <div class="container-fluid">
        <?php
        if(isset($header['0']['value'])){
            print $header['0']['value'];
        }
        if(isset($body)){
            foreach($body as $idx => $field){
                print $body[$idx]['value'];
            }
        }
        ?>
    </div>
</div>