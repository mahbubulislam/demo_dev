<?php
$cssClass = isset($overrideOptions['css'])? $overrideOptions['css'] : null;
$divID = isset($overrideOptions['divID'])? 'id="'. $overrideOptions['divID'] .'"' : null;
?>

<div class="featured image-bg-container <?php print $cssClass;?>" <?php print $divID;?>>
    <div class="image-bg">
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 col-md-offset-2 gradient"></div>
            <div class="col-md-8 featured-content">
                <?php
                if(isset($header['0']['value'])){
                    print $header['0']['value'];
                }
                foreach($body as $idx => $field){
                    print $body[$idx]['value'];
                }
                ?>

            </div>
        </div>
    </div>
</div>