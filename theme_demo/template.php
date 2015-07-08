<?php

include_once('lrpDataAccessWrapper.php');
include_once('lrpTemplateHelper.php');

/**
 * @param $variables
 */
function lrp_preprocess(&$variables,$hook){
  global $base_url;

  $css_path = $base_url.'/'.drupal_get_path('theme','lrp').'/css/';
  $js_path = $base_url.'/'.drupal_get_path('theme','lrp').'/js/';

  $variables['lrp_css_path']= $css_path ;
  $variables['lrp_js_path']= $js_path;

  //dpm($hook);

}

function lrp_preprocess_html(&$vars)
{
    if($vars['is_front']){
        $vars['classes_array'][] = 'index';
    }
    else{
        if(isset($GLOBALS['_REQUEST']['q'])){
            $requestPath = $GLOBALS['_REQUEST']['q'];
            $pathArray = explode('/', $requestPath);
            $vars['classes_array'][]='subpage';

            if(count($pathArray)==1) {
                foreach ($pathArray as $idx => $cssClass) {
                    $vars['classes_array'][] = $cssClass;
                }
            }
        }
    }
}

function lrp_preprocess_node(&$variables){

    if(!isset($_SESSION['NodeLastUpdate'])){
        $_SESSION['NodeLastUpdate'] =  $variables['changed'];
    }
    else{

        if($_SESSION['NodeLastUpdate'] < $variables['changed']){
            $_SESSION['NodeLastUpdate'] = $variables['changed'];
        }
    }


  $variables['theme_hook_suggestions'][]='node__'.$variables['type'];
  $variables['pageLastUpdateDate']= date (' F j, Y',$_SESSION['NodeLastUpdate']);

    switch($variables['type']){

        case 'page_panel':
            // Apply node specific settings

        break;

    }

}


function lrp_preprocess_page(&$variables){

  $variables['TippyTopPageHeader'] = null;
  $variables['LRPMainNavigation'] = null;

  $variables['LRPHomePageRollOver'] = null;

  $variables['PageHeader'] = null;
  $variables['PageFooter'] = null;
  $variables['FeatureSlide'] = null;
  $variables['FeatureSlidesSuccessStories'] = null;

  $variables['HomePageIconBar'] = null;
  $variables['HomePageConnectEngageTile'] = null;
  $variables['HomePageSidebar1'] = null;

  $pageVar = new PageHelper();

  $variables['TippyTopPageHeader'] = $pageVar->getTippyTopGlobalHeader();
  $variables['LRPMainNavigation'] = $pageVar->getLRPMainNavigation();

  $variables['PageHeader'] = $pageVar->getGlobalHeader();
  $variables['PageFooter'] = $pageVar->getGlobalFooter();


  if ((isset($variables['node']->nid)) &&($variables['node']->nid > 0)) {
    $path = drupal_get_path_alias('node/' . $variables['node']->nid);

    switch ($path){
          case 'index':
              $variables['LRPHomePageRollOver'] = $pageVar->getLRPHomePageRollOver();
              $variables['FeatureSlide'] = $pageVar->getFeatureSlide();
              $variables['HomePageIconBar'] = $pageVar->getHomePageIconBar();
              break;
    }
  }
}

function lrp_theme($existing, $type, $theme, $path){

  $pagePanelThemeArray = array('idempotentContent',
      'globalHeader',
      'featureSlidesSuccessStories',
      'featureSlides',
      'simpleFeatures',
      'threeColumnsTile',
      'applicantsProgramTab',
      'simplePagePanel',
      'sidebar',
      'stickyNavigation',
      );

  $themeArray =array();
  foreach($pagePanelThemeArray as $thmName){
    $themeArray[$thmName] = array(
          'variables' => array('header'=>NULL,'body'=>null, 'footer'=>null,'overrideOptions'=>null),
          'path' => drupal_get_path('theme','lrp'). '/templates/page_panel',
          'template' => $thmName,
    );
  }

  $themeArray['globalFooter'] = array(
    'variables' => array('header'=>NULL,'body'=>null ,'pageLastUpdate'=>null),
    'path' => drupal_get_path('theme','lrp'). '/templates/page_panel',
    'template' => 'globalFooter'
  );

  $themeArray['programInfoWrapper'] = array(
    'variables' => array('programInfo'=>null),
    'path' => drupal_get_path('theme','lrp'). '/templates/programs',
    'template' => 'programInfoWrapper'
  );

  $themeArray['my_theme_wrapper'] = array(
        'render element' => 'element',
        'function'=> 'mywrapper_function',
  );

  return $themeArray;

}

function mywrapper_function(&$var){
    //dpm($var);

    return '<p>' . $var['element']['#children']. '</p>';
}


function getPagePanelDivIDFromTitle($title){

    return preg_replace('/[^A-Za-z0-9\-]/', '', $title);
}

function setCSSClass($cssClass){
    return array('css'=>$cssClass );
}