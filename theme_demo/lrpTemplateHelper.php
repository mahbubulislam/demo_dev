<?php

  class PagePanelHelper {

    private function page_panel_view($node, $view_mode = 'full', $langcode = NULL,$overrideOptions = null) {
      if (!isset($langcode)) {
        $langcode = $GLOBALS['language_content']->language;
      }

      // Populate $node->content with a render() array.
      node_build_content($node, $view_mode, $langcode);

      $build = $node->content;
      // We don't need duplicate rendering info in node->content.
      unset($node->content);

      $build += array(
        '#theme' => 'node',
        '#node' => $node,
        '#view_mode' => $view_mode,
        '#language' => $langcode,
        '#overrideOptions' => $overrideOptions,
      );

      // Add contextual links for this node, except when the node is already being
      // displayed on its own page. Modules may alter this behavior (for example,
      // to restrict contextual links to certain view modes) by implementing
      // hook_node_view_alter().

      $build['#contextual_links']['node'] = array('node', array($node->nid));


      // Allow modules to modify the structured node.
      $type = 'node';
      //drupal_alter(array('node_view', 'entity_view'), $build, $type);

      return $build;
    }


    private function getNodeIDByTitle($title) {

      $nid = NULL;
      try {

        $query = db_select('node', 'n');
        $query->fields('n', array('nid'));
        $query->condition('title', $title, '=');
        $query->condition('status', 1, '=');

        $result = $query->execute();
        foreach ($result as $row) {
          $nid = $row->nid;
        }


      } catch (Exception $e) {
        $nid = NULL;

      }
      return $nid;
    }


    public function getPagePanel($pageTitle,$layoutType,$overrideOptions = null) {
      $output = NULL;
      try {
        $nodeId = $this->getNodeIDByTitle($pageTitle);
        if (empty($nodeId)) {
          throw new Exception('Node ID not Found');
        }

        $node = node_load($nodeId);
        $panelMarkup = $this->page_panel_view($node, $layoutType,null,$overrideOptions);
        $output = drupal_render($panelMarkup);

      } catch (Exception $e) {
        $output = NULL;
        watchdog_exception('Page Panel', $e);
      }

      return $output;
    }

    public function getProgramInfoNode($applicantType,$programType,$programName){

      $output = null;
      try{

        $this->mapProgramInfoParameter($applicantType,$programType,$programName);

        if(isset($applicantType)){
          $paramArray[] = ' @applicantType=N\'' . $applicantType . '\'';
        }

        if(isset($programName)){
          $paramArray[] = ' @programName=N\'' . $programName . '\'';
        }

        if(isset($programType)){
          $paramArray[] = ' @programType=N\'' . $programType . '\'';
        }

        $params = implode(',', $paramArray);

        $stored_procedure_query = 'EXECUTE getProgramInfoNode '.$params;
        $result = db_query($stored_procedure_query);

        $nodeIds = array();

        foreach($result as $row){
          $nodeIds[$row->nid]=$row->title;
        }

        if(count($nodeIds)<1){
          throw new Exception('No news Node Found ' );
        }
        else{
          $output = $nodeIds;
        }

      }catch(Exception $e){
        $output = null;
        watchdog_exception('Program Info Node',$e);
      }

      return $output;

    }

    private function mapProgramInfoParameter(&$applicantType,&$programType,&$programName){

      $mapApplicantType = array(
        'applicants' => 'New Applicant',
        'renew' => 'Renewal Applicant'
      );

      $mapProgramType = array(
        'intramural' =>'Intramural',
        'extramural'=>'Extramural',
      );

      $mapProgramName = array(
        'clinical-research'=>'Clinical Research',
        'health-disparities-research'=>'Health Disparities Research' ,
        'contraception-infertility-research'=>'Contraception and Infertility Research',
        'pediatric-research'=>'Pediatric Research',
        'clinical-research-disadvantaged-backgrounds-intramural'=>'Clinical Research for Disadvantaged Backgrounds (Intramural)',
        'clinical-research-disadvantaged-backgrounds-extramural'=>'Clinical Research for Disadvantaged Backgrounds (Extramural)',
        'aids-research'=>'AIDS Research',
        'general-research'=>'General Research (Including ACGME fellows)',
        'general-research-acgme-fellows' => 'General Research for ACGME Fellows',

      );

      try{

        $applicantType = $mapApplicantType[$applicantType];
        $programType = $mapProgramType[$programType];
        $programName = $mapProgramName[$programName];

        if(!isset($applicantType) || !isset($programType) || !isset($programName)){
          throw new Exception('Program data not found');
        }

      }catch(Exception $e){
        watchdog_exception('Program info param map',$e);
      }

    }

    public function renderProgramInfo($node){
        try{
            $programInfoMarkup = $this->page_panel_view($node);
            return $programInfoMarkup;

        }catch(Exception $e){
        watchdog_exception('Program info Render',$e);
        }

    }





  }


 class PageHelper extends PagePanelHelper {

   public  function getTippyTopGlobalHeader(){
     $output = null;
     try{

       $output = $this->getPagePanel('LRP Global Tippy Top Header','idempotentContent');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }

   public  function getLRPMainNavigation(){
     $output = null;
     try{

       $output = $this->getPagePanel('LRP Main Navigation','idempotentContent');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }

     public  function getProgramDetailsSideBar(){
         $output = null;
         try{

             $output = $this->getPagePanel('Program Details Sidebar 1','sidebar');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getApplicantSideBar(){
         $output = null;
         try{

             $output = $this->getPagePanel('Applicants Sidebar 1','sidebar');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getApplicantProgramTab(){
         $output = null;
         try{

             $output = $this->getPagePanel('Applicants Programs','applicantsProgramTab');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getProgramEligibilityProgramsTab(){
         $output = null;
         try{

             $output = $this->getPagePanel('Programs & Eligibility Programs','applicantsProgramTab');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getRenewalApplicantProgramTab(){
         $output = null;
         try{

             $output = $this->getPagePanel('Renew Programs','applicantsProgramTab');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }



     public  function getProgramEligibilityEligibilityTile(){
         $output = null;
         try{

             $output = $this->getPagePanel('Programs & Eligibility Eligibility Tile','simplePagePanel');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getConnectEngageContactTile(){
         $output = null;
         try{

             $output = $this->getPagePanel('Contact & Engage Contact Tile','simplePagePanel');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getAwardeesPaymentTitle(){
         $output = null;
         try{

             $output = $this->getPagePanel('Awardees Payment Tile','simplePagePanel');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }



     public  function getDataReportFindingAnalysisTile(){
         $output = null;
         try{

             $output = $this->getPagePanel('Data & Reports Findings and Analyses Tile','simplePagePanelExtra');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getDataReportNIHRePorterTile(){
         $output = null;
         try{

             $output = $this->getPagePanel('Data & Reports NIH RePorter Tile','simpleFeatures');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }



     public  function getProgramEligibilityLRPBenefitTile(){
         $output = null;
         try{

             $output = $this->getPagePanel('Programs & Eligibility LRP Benefits Tile','simplePagePanelExtra');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }





   public  function getLRPHomePageRollOver(){
     $output = null;
     try{

       $output = $this->getPagePanel('LRP Home Page Rollover','idempotentContent');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }

  public  function getGlobalHeader(){
     $output = null;
     try{

       $output = $this->getPagePanel('LRP Global Header','idempotentContent');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
  }

   public  function getGlobalFooter(){
     $output = null;
     try{

       $output = $this->getPagePanel('LRP Global Footer','globalFooter');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }

   public  function getFeatureSlide(){
     $output = null;
     try{

       $output = $this->getPagePanel('Home Page Feature Slides','featureSlides');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }


   public  function getHomePageIconBar(){
     $output = null;
     try{

       $output = $this->getPagePanel('Home page IconBar','idempotentContent');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }

   public  function getHomePageFeaturedSuccessStorySlides(){
     $output = null;
     try{

       $output = $this->getPagePanel('Home Page Featured Success Story Slides','featureSlidesSuccessStories');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }


   public  function getHomePageConnectEngageTile(){
     $output = null;
     try{

       $output = $this->getPagePanel('Home page Connect and Engage Tile','threeColumnsTile');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }

     public  function getAmbassadorResourcesTile(){
         $output = null;
         try{

             $output = $this->getPagePanel('Ambassadors Resources Tile','threeColumnsTile');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getAboutLRPTile(){
         $output = null;
         try{

             $cssOption = array();
             $cssOption['css'] = array('content-extra');

             $output = $this->getPagePanel('About NIH LRP Programs Tile','simplePagePanelExtra');

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getConnectEngageConnectTile(){
         $output = null;
         try{

             $cssOption = array();
             $cssOption['css'] = array('content-extra');

             $output = $this->getPagePanel('Contact & Engage Connect with Us Tile','threeColumnsTile',$cssOption);

         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }

     public  function getstickyNavigationAwardees(){
         $output = null;
         try{
             $output = $this->getPagePanel('Contact & Engage Connect with Us Tile','stickyNavigationAwardees');
         }catch(Exception $e){
             $output = null;
         }

         return $output;
     }



   public  function getHomePageSidebar1(){
     $output = null;
     try{

       $output = $this->getPagePanel('Home page Sidebar1','sidebar');

     }catch(Exception $e){
       $output = null;
     }

     return $output;
   }

   public function getProgramInfo($applicantType,$programType,$programName){

     $output = null;
     try{

       $programInfoNodeIds = $this->getProgramInfoNode($applicantType,$programType,$programName);

         $filteredNodeId = $this->filterProgramInfoNode($programInfoNodeIds);
       $arrProgramInfo = array();
       foreach ($filteredNodeId as $title=>$nid){

          $node = node_load($nid);
          $arrProgramInfo[$title] = $this->renderProgramInfo($node);

       }

       $output = theme('programInfoWrapper',array('programInfo'=>$arrProgramInfo));


     }catch(Exception $e){
       $output = null;
     }

     return $output;

   }

     function filterProgramInfoNode($nodeIds){
         $nodeIDArray = array();

         foreach($nodeIds as $nid=>$title){
             $titleArray = explode('-',$title);
             $trimmedTitleArray = array_map('trim',$titleArray);// array_walk($titleArray,'trim') ;
             $titleIndex = implode('-',$trimmedTitleArray);
             $nodeIDArray[$titleIndex] = $nid;

             if(count($trimmedTitleArray)=='4')
             {
                // $fourthParam = $trimmedTitleArray[3];

                 array_pop($trimmedTitleArray);
                 $delTitleIndex = implode('-',$trimmedTitleArray);
                 unset($nodeIDArray[$delTitleIndex]);

             }
         }
         return $nodeIDArray;
     }

}


