<?php
$cssClass = isset($overrideOptions['css'])? $overrideOptions['css'] : null;
$divID = isset($overrideOptions['divID'])? 'id="'. $overrideOptions['divID'] .'"' : null;
?>
<div class="content-section <?php print $cssClass;?> tiles" <?php print $divID;?>>
    <div class="container-fluid">
        <?php print $header['0']['value']; ?>
        <?php
            $i = 0;
            foreach ($body as $idx => $field) {
                $i++;
        ?>
            <div class="col-md-4 clean">
                <?php print $body[$idx]['value']; ?>
            </div>
        <?php } ?>
        <?php
        if(isset($footer['0']['value'])){?>
            <div class="row">
                <div class="col-xs-12">
                    <?php print $footer['0']['value'];?>
                </div>
            </div>
        <?php
        }
        ?>
    </div>
</div>
