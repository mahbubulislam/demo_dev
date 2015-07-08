<?php
$cssClass = isset($overrideOptions['css'])? $overrideOptions['css'] : null;
$divID = isset($overrideOptions['divID'])? 'id="'. $overrideOptions['divID'] .'"' : null;
?>
<div class="container-fluid content <?php print $cssClass;?>" <?php print $divID;?>>
    <div class="programs tabpanel" id="programs">
        <?php
        if(isset($header['0']['value'])){
            print $header['0']['value'];
        }
        ?>
        <ul class="programs-nav nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#extramural" aria-controls="extramural" role="tab" data-toggle="tab">Research Outside the NIH<br>(Extramural)</a>
            </li>
            <li role="presentation"><a href="#intramural" aria-controls="intramural" role="tab" data-toggle="tab">Research Inside the NIH<br>(Intramural)</a>
            </li>
        </ul>

        <?php
        $i = 0;
        //foreach ($body as $idx => $field) {
            $i++;
            ?>
           <!-- <div class="col-md-4 clean">-->
                <?php print $body['0']['value']; ?>
            <!--</div>-->

        <?php //} ?>
    </div>
</div>
