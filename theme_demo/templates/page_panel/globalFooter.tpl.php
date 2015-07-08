<div class="footer" role="navigation">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div id="readers"><span class="sr-only">Readers for Documents on the Page</span>
        </div>
      </div>
    </div>
    <div class="row">

      <?php
      foreach ($body as $idx => $field) {
        print $body[$idx]['value'];
      }
      ?>

      <div class="col-md-12">
        <p>&nbsp;</p>

        <p>Page Last Updated on <?php print $pageLastUpdate?></p>

        <p>&nbsp;</p>

        <p>NIH...Turning Discovery into Health ® </p>
      </div>
    </div>
  </div>
</div>