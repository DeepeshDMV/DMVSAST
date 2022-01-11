/******************************************************************************************** 
* @Name        : DMV_BusninessLicenseApplication 
* @DESCRIPTION :  
* @AUTHOR      : Shubham Kumar
* @DATE        : 06/08/2021
*
*
* MODIFICATION LOG:
* DEVELOPER                         DATE                               DESCRIPTION
* -------------------------------------------------------------------------------------- 
* 
*******************************************************************************************/
Global without sharing class DMV_BusninessLicenseApplication implements vlocity_ins.VlocityOpenInterface2{

    //Interface method of vlocityOpenInterface2
    global Object invokeMethod(String methodName,
       Map<String,Object> inputMap,
       Map<String,Object> outMap, Map<String,Object> options) {
        Map<String, Object> mp;
       Boolean success = true;
       String errors = 'OK';
       try {
          if (methodName == 'getProgressBarDetails') {
            outMap.put('success', getProgressBarDetails(inputMap));
          }
          
          if (methodName == 'getProgressDetails') {
            outMap.put('success', getProgressDetails(inputMap));
          }
          
          if (methodName == 'getSubmissionHubProgressBar') {
            outMap.put('success', getSubmissionHubProgressBar(inputMap));
          }
          
          if (methodName == 'getBLAStatus') {
            outMap.put('success', getBLAStatus(inputMap));
          }
          
          if (methodName == 'getBLAVisitStatusDetails') {
            outMap.put('success', JSON.deserializeUntyped(getBLAVisitStatusDetails(inputMap)));
          }
          
        } catch (Exception e) {
            errors = e.getMessage();
            success = false;
            outMap.put('error', errors);
         }
         return success;
    }
    
    /*************************************************************************
    @MethodName             : getProgressBarDetails
    @description            : 
    @return                 : 
    @params                 : NA
    **************************************************************************/
    
    public static List<BusinessLicenseApplication> getProgressBarDetails(Map<String,Object> inputMap){
    List<Progress_Wrapper> listProgressWrap = new List<Progress_Wrapper>();
    Map<String, Object> mapResponse = new Map<String, Object>();
    String recordId = String.valueOf(inputMap.get('BLAid'));
    try{
        return [SELECT Id,Live_Scan_Status__c,Franchise_Certificate__c,Schedule_your_Live_Scan__c,Owner_Background_Information__c,Property_Details__c
                , Business_Account_Information__c, Schedule_Your_Training__c,Schedule_Your_Dealer_Exam__c,Property_Use_form__c,Seller_s_Permit__c,Certificate_Proposed_Franchise_Agreement__c,Personal_history_questionairre__c,
                Surety_Bond__c,Fictitious_Name_Statement__c,LicenseType.Name,Review_Process__c,Schedule_Your_Inspection__c,Your_Application_Fees__c, Schedule_Complete_Your_Dealer_Training__c  
                 from BusinessLicenseApplication where Id =:recordId ];
           
        }
        catch (Exception ex) { 
            //Catch statement
        }
        return null;
    }
    
    /*************************************************************************
    @MethodName             : getProgressBarSubmissionBarDetails
    @description            : 
    @return                 : 
    @params                 : NA
    **************************************************************************/
    
    public static List<BusinessLicenseApplication> getSubmissionHubProgressBar(Map<String,Object> inputMap){
    List<Progress2_Wrapper> listProgressWrap = new List<Progress2_Wrapper>();
    Map<String, Object> mapResponse = new Map<String, Object>();
    String recordId = String.valueOf(inputMap.get('BLAid'));
    try{
        return [SELECT Id,Review_Process__c,Inspection_Scheduled_Status__c,Your_Application_Fees__c,ApplicationCase.Status
                 from BusinessLicenseApplication where Id =:recordId ];
           
        }
        catch (Exception ex) { 
            //Catch statement
        }
        return null;
    }
    
    /*************************************************************************
    @MethodName             : getBLAStatus
    @description            : 
    @return                 : 
    @params                 : NA
    **************************************************************************/
    
    public static List<BusinessLicenseApplication> getBLAStatus(Map<String,Object> inputMap){
    Map<String, Object> mapResponse = new Map<String, Object>();
    String recordId = String.valueOf(inputMap.get('BLAid'));
    try{
        return [SELECT Id,Status from BusinessLicenseApplication where Id =:recordId ];
           
        }
        catch (Exception ex) { 
            //Catch statement
        }
        return null;
    }
    /*************************************************************************
    @MethodName             : getProgressDetails
    @description            : 
    @return                 : 
    @params                 : NA
    **************************************************************************/
    
    public static List<IndividualApplication> getProgressDetails(Map<String,Object> inputMap){
    List<Progress1_Wrapper> listProgressWrap = new List<Progress1_Wrapper>();
    Map<String, Object> mapResponse = new Map<String, Object>();
    String recordId = String.valueOf(inputMap.get('Individualid'));
    try{
        return [SELECT Id,account.name,Name,Schedule_your_Live_Scan__c,LicensePermitName.name,Complete_Your_Salesperson_Application_Fo__c, Status,
        Print_Your_Wall_License__c, Review_Process__c, Your_Application_Fees__c from IndividualApplication where Id =:recordId ];
           
        }
        catch (Exception ex) { 
            //Catch statement
        }
        return null;
    }
    
    /*************************************************************************
    @MethodName             : getBLAStausDetails
    @description            : 
    @return                 : 
    @params                 : NA
    **************************************************************************/
    
    public static String getBLAVisitStatusDetails(Map<String,Object> inputMap){
        List<Progress2_Wrapper> listProgressWrap = new List<Progress2_Wrapper>();
        Map<String, Object> mapResponse = new Map<String, Object>();
        String recordId = String.valueOf(inputMap.get('BLAid'));
        String outputJson = '';
        JSONGenerator gen = JSON.createGenerator(true);
        try{
            List<BusinessLicenseApplication> BLA = [SELECT Id,Status,Review_Process__c,Inspection_Scheduled_Status__c,Your_Application_Fees__c,(Select Id,Status,CADMV_Status__c,PlannedVisitStartTime,PlannedVisitEndTime,Place.Name from Contexts order by CreatedDate DESC) from BusinessLicenseApplication where Id =:recordId ];
            gen.writeStartObject();
            if(!BLA.isEmpty()){
                if(string.isNotBlank(BLA.get(0).Id)){
                    gen.writeObjectField('Id',BLA.get(0).Id);
                }else{
                    gen.writeObjectField('Id','');
                }
                
                if(string.isNotBlank(BLA.get(0).Status)){
                    gen.writeObjectField('Status',BLA.get(0).Status);
                }else{
                    gen.writeObjectField('Status','');
                }
                
                if(string.isNotBlank(BLA.get(0).Review_Process__c)){
                    gen.writeObjectField('ReviewProcess',BLA.get(0).Review_Process__c);
                }else{
                    gen.writeObjectField('ReviewProcess','');
                }
                
                if(string.isNotBlank(BLA.get(0).Inspection_Scheduled_Status__c)){
                    gen.writeObjectField('InspectionScheduledStatus',BLA.get(0).Inspection_Scheduled_Status__c);
                }else{
                    gen.writeObjectField('InspectionScheduledStatus','');
                }
                
                if(string.isNotBlank(BLA.get(0).Your_Application_Fees__c)){
                    gen.writeObjectField('YourApplicationFees',BLA.get(0).Your_Application_Fees__c);
                }else{
                    gen.writeObjectField('YourApplicationFees','');
                }
                
                if(!BLA.get(0).Contexts.isEmpty()){
                    gen.writeFieldName('Visits');
                    gen.writeStartArray();
                    for(Visit vst :BLA.get(0).Contexts){
                        gen.writeStartObject();
                            if(string.isNotBlank(vst.Id)){
                                gen.writeObjectField('Id',vst.Id);
                            }else{
                                gen.writeObjectField('Id','');
                            }
                            
                            if(string.isNotBlank(vst.Status)){
                                gen.writeObjectField('Status',vst.Status);
                            }else{
                                gen.writeObjectField('Status','');
                            }
                            
                            if(string.isNotBlank(vst.CADMV_Status__c)){
                                gen.writeObjectField('InspectionStatus',vst.CADMV_Status__c);
                            }else{
                                gen.writeObjectField('InspectionStatus','');
                            }
                            
                            if(vst.PlannedVisitStartTime!=null){
                                gen.writeObjectField('PlannedVisitStartTime',vst.PlannedVisitStartTime);
                            }else{
                                gen.writeObjectField('PlannedVisitStartTime','');
                            }
                            
                            if(vst.PlannedVisitEndTime!=null){
                                gen.writeObjectField('PlannedVisitEndTime',vst.PlannedVisitEndTime);
                            }else{
                                gen.writeObjectField('PlannedVisitEndTime','');
                            }
                            
                            if(string.isNotBlank(vst.Place.Name)){
                                gen.writeObjectField('PlaceName',vst.Place.Name);
                            }else{
                                gen.writeObjectField('PlaceName','');
                            }
                        gen.writeEndObject();
                    }
                    gen.writeEndArray();
                }
            }
            gen.writeEndObject();
            outputJson = gen.getAsString();
        }
        catch (Exception ex) { 
            system.debug('Inside Exception' + ex.getMessage());
        }
        return outputJson;
    }
    
    public class Progress_Wrapper{
        
        public Id businessAppId;
        public string scheduleLiveScan;
        public string ownerInfo;
        public string propertyDetails;
        public string accountInfo;
        public string training;
        public string dealerExam;
        public String propertyUseForm;
        public String sellerPermit;
        public string suretyBond;
        public String cdtfaPermit;
        public String nameStatement;
        public String applicationFees;
        public String reviewProcess;
        public String scheduleYourInspection;
        
        
    }
    
    public class Progress1_Wrapper{
        
        public Id individualLicenseId;
        public string scheduleLiveScan;
        public string completeApplication;

    }
    
    public class Progress2_Wrapper{
        
        public Id individualLicenseId;
        public String applicationFees;
        public String reviewProcess;
        public String scheduleYourInspection;

    }
            
}