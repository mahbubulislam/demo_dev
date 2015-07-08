<?php
if(isset($header['0']['value'])){
    print $header['0']['value'];
}
foreach($body as $idx => $field){
  print $body[$idx]['value'];
}
