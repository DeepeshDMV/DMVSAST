/******************************************************************************************** 
* @Name        : DMV_ProgressBarStatus 
* @DESCRIPTION :  
* @AUTHOR      : Shubham Kumar
* @DATE        : 06/08/2021
*
*
* MODIFICATION LOG:
* DEVELOPER                         DATE                               DESCRIPTION
* -------------------------------------------------------------------------------------- 
*  Shubham Kumar                  06/11/2021                        Not using this class anymore.
*******************************************************************************************/
global without sharing class DMV_ProgressBarStatus {

    /*global Object invokeMethod(String methodName,
       Map<String,Object> inputMap,
       Map<String,Object> outMap, Map<String,Object> options) {
        Map<String, Object> mp;
       Boolean success = true;
       String errors = 'OK';
       try {
          if (methodName == 'getProgressBarDetails') {
            outMap.put('success', getProgressBarDetails());
          }
          else if (methodName == 'setProgressBarDetails'){
              outMap.put('success', setProgressBarDetails(inputMap));
          }
        } catch (Exception e) {
            errors = e.getMessage();
            success = false;
            outMap.put('error', errors);
         }
         //outMap.put('success', JSON.deserializeUntyped(getProgressBarDetails()));
         //outMap.put('error', errors);
         return success;
    }*/
    
    /*************************************************************************
    @MethodName             : getProgressBarDetails
    @description            : 
    @return                 : 
    @params                 : NA
    **************************************************************************/
    /*@AuraEnabled
    public static Map<String, Object> getProgressBarDetails(){
    List<Progress_Wrapper> listProgressWrap = new List<Progress_Wrapper>();
    Map<String, Object> mapResponse = new Map<String, Object>();
    try{
            List<BusinessLicenseApplication> listbusinessApplication = new List<BusinessLicenseApplication>();
            listbusinessApplication = [SELECT Id,Schedule_your_Live_Scan__c,Complete_your_Owner_and_Property_Details__c,
            Schedule_Complete_Your_Dealer_Training__c,Upload_Your_Required_Documents__c from BusinessLicenseApplication];
                    
                for(BusinessLicenseApplication businessApp :listbusinessApplication ){
                       Progress_Wrapper progressWrap = new Progress_Wrapper();
                       progressWrap.scheduleLiveScan = businessApp.Schedule_your_Live_Scan__c;
                       progressWrap.ownerAndPropertyDetails = businessApp.Complete_your_Owner_and_Property_Details__c;
                       progressWrap.dealerTrainings = businessApp.Schedule_Complete_Your_Dealer_Training__c;
                       progressWrap.requiredDocuments= businessApp.Upload_Your_Required_Documents__c ;
                       listProgressWrap.add(progressWrap);

               }
           mapResponse.put('Progress Completion', listProgressWrap);
           
        }
        catch (Exception ex) { 
            //Catch statement
        }
        return mapResponse;
    }*/
    
    /*************************************************************************
    @MethodName             : setProgressBarDetails
    @description            : Save data to BusinessLicenseApplication from mapResponse
    @return                 : 
    @params                 : Map<String, Object> mapResponse
    **************************************************************************/
    /*@AuraEnabled
    public static Map<String, Boolean> setProgressBarDetails(Map<String, Object> mapResponse){
        Map<String, Boolean> response = new Map<String, Boolean>();
        List<Progress_Wrapper> progressWrapperList = new List<Progress_Wrapper>();
        List<BusinessLicenseApplication> businessAppList = new List<BusinessLicenseApplication>();
        try{
            if(!mapResponse.keySet().isEmpty()){
                progressWrapperList = (List<Progress_Wrapper>) mapResponse.get('Progress Completion');
                for(Progress_Wrapper progressWrap: progressWrapperList){
                    BusinessLicenseApplication businessApp = new BusinessLicenseApplication();
                    //businessApp.Id = 
                    businessApp.Schedule_your_Live_Scan__c = progressWrap.scheduleLiveScan;
                    businessApp.Complete_your_Owner_and_Property_Details__c = progressWrap.ownerAndPropertyDetails ;
                    businessApp.Schedule_Complete_Your_Dealer_Training__c = progressWrap.dealerTrainings;
                    businessApp.Upload_Your_Required_Documents__c = progressWrap.requiredDocuments;
                    businessAppList.add(businessApp);
                }
                if(!businessAppList.isEmpty()){
                    upsert businessAppList;
                    response.put('isSuccess', true);
                }
            } 
        }
        catch(Exception ex){
            response.put('isSuccess', false);
          //Error handling    
        }
        return response;
    }*/
    
    /*public class Progress_Wrapper{
        @AuraEnabled
        public string scheduleLiveScan;
        @AuraEnabled
        public string ownerAndPropertyDetails ;
        @AuraEnabled
        public string dealerTrainings;
        @AuraEnabled
        public string requiredDocuments;
    }*/
            
}