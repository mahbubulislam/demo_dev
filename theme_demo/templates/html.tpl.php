<?php

/**
 * @file
 * Default theme implementation to display the basic html structure of a single
 * Drupal page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation.
 *   $language->dir contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes String of classes that can be used to style contextually through
 *   CSS.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see template_process()
 *
 * @ingroup themeable
 */

global $base_url;
?>
<!DOCTYPE html>
<html lang="en">
<head profile="<?php print $grddl_profile; ?>">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="NIH Loan Repayment Programs">
    <meta name="robots" content="index,follow" />

    <meta name="robots" content="noindex">
    <meta name="googlebot" content="noindex">

    <?php print $head; ?>

     <title><?php print $head_title; ?></title>


  <?php  
    print $scripts;
    print $styles;
  ?>
    <link rel="stylesheet" href="<?php print $lrp_css_path ;?>main.css" />



  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- NOTE: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>

  <link rel="stylesheet" href="<?php print $lrp_css_path ;?>ie8.css" />

    <script src ="<?php print $lrp_js_path ;?>html5shiv.min.js"></script>
    <script src = "<?php print $lrp_js_path ;?>respond.min.js"></script>
    <![endif]-->

</head>
<body ontouchstart="" class="theme <?php print $classes; ?>" <?php print $attributes;?>>
<a href="#content" id="skip-nav">Skip Navigation Links</a>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>


  <script src="<?php print $lrp_js_path ;?>jquery-1.11.2.min.js"></script>
  <script src="<?php print $lrp_js_path ;?>bootstrap.min.js"></script>
  <script src="<?php print $lrp_js_path ;?>jquery.flexslider.min.js"></script>
  <script src="<?php print $lrp_js_path ;?>jquery.printElement.min.js"></script>
  <script src="<?php print $lrp_js_path ;?>jquery.matchHeight-min.js"></script>
  <script src="<?php print $lrp_js_path ;?>main.js"></script>
  <a class="btn-2top hidden-print">&#9650;<span class="tip">Back to Top</span></a>
</body>
</html>
