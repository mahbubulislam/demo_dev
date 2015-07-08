<?php if ($messages): ?>
  <div id="messages"><div class="section clearfix">
      <?php print $messages; ?>
    </div></div> <!-- /.section, /#messages -->
<?php endif; ?>
<?php
  print $FeatureSlide;
?>
<div class="header">
  <div class="ribbon">
    <div class="row">
        <?php   print $TippyTopPageHeader;?>
    </div>
  </div>

  <div class="container-fluid navbar navbar-default" role="navigation">
    <?php print $LRPMainNavigation; ?>

  </div>
  <?php print $LRPHomePageRollOver;?>

</div>
<?php
  print $HomePageIconBar;
?>
<div id="content">
  <div class="container-fluid">
    <div class="row content-section">
      <?php if ($messages): ?>
        <div id="messages"><div class="section clearfix">
            <?php print $messages; ?>
          </div></div> <!-- /.section, /#messages -->
      <?php endif; ?>
      <?php if (($tabs) && ($logged_in)): ?>
        <div class="tabs">
          <?php print render($tabs); ?>
        </div>
      <?php endif; ?>
      <?php print render($page['content']); ?>
      <?php
        print render($page['left_sidebar']);
      ?>
    </div>
  </div>
    <?php
    print render($page['page_panel']);
    ?>
</div>

<?php
  print $PageFooter;
?>








