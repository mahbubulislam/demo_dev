<?php

class LRPDataAccessWrapper{

  /*public function getProgramInfoNode($applicantType,$programType,$programName){

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
      'new' => 'New Applicant',
      'renew' => 'Renewal Applicant'
    );

    $mapProgramType = array(
      'intramural' =>'Intramural',
      'extramural'=>'Extramural',
    );

    $mapProgramName = array(
      'clinical-research'=>'Clinical Research',

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

  }*/

}
