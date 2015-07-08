  <div class="col-md-9 content">
    <div class="tab-content">
      <?php
      foreach($programInfo as $info){
        print drupal_render($info);
      }
      ?>
    </div>
  </div>