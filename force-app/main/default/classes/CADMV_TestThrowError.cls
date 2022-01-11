public with sharing class CADMV_TestThrowError {
    public CADMV_TestThrowError() {

    }
    @AuraEnabled
    Public static CADMV_LightningResponse fetchData(){
        CADMV_LightningResponse resultMap = new CADMV_LightningResponse();
        try{
            Account ac = new Account();
            insert ac;
            resultMap.put('Data',ac);
            
            return resultMap;
        }
        catch(Exception ex){
            String LogId = CADMV_CreateErrorLogException.logApplicationError(ex);
            resultMap.put('Error',LogId);
            return resultMap;
        }
      
    }

    @AuraEnabled
    Public static CADMV_LightningResponse errorLoggingLWCAura(String message,String device,String source,String componentName,String method,String stack){
        CADMV_LightningResponse resultMap = new CADMV_LightningResponse();
        try{
            system.debug('Message -- '+message);
            system.debug('device -- '+device);
            system.debug('source -- '+source);
            system.debug('componentName -- '+componentName);
            
            String LogId = CADMV_CreateErrorLogException.logApplicationErrorLWCAura(message,device,source,componentName,method,stack);
            resultMap.put('Error',LogId);
            return resultMap;
        }
        catch(Exception ex){
            String LogId = CADMV_CreateErrorLogException.logApplicationError(ex);
            resultMap.put('Error',LogId);
            return resultMap;
        }
    }
}