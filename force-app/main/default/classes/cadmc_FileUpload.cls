/**
 * @description       : 
 * @author            : Abhishek Keshri
 * @group             : 
 * @last modified on  : 6-8-2021
 * @last modified by  : 
 * Modifications Log 
 * Ver   Date         Author            Modification
 * 1.0   6-8-2021     Abhishek Keshri   Initial Version
**/
global without sharing class cadmc_FileUpload implements vlocity_ins.VlocityOpenInterface2 {

    global Boolean invokeMethod(String methodName,Map<String,Object> inputMap,Map<String,Object> outMap, Map<String,Object> options) {        
        Boolean success;
        String errors = '';
        try {
            if (methodName == 'getStoredFiles') {            
                //getStoredFiles(inputMap);
                outMap.put('success', getStoredFiles(inputMap));
                success = true;
            }
            if (methodName == 'deleteFiles') {            
                //getStoredFiles(inputMap);
                outMap.put('success', deleteFiles(inputMap));
                success = true;
            }
        } catch (Exception e) {
            errors = e.getMessage();
            success = false;
            outMap.put('error', errors);
        }
        
        //outMap.put('error', errors);
        return success;
    }

    @AuraEnabled
    public static list<contentversion> getStoredFiles(Map<String,Object> inputMap){
        list<id> lstConDocs = new list<id>();
        try{
            System.debug('apex line 41 '+inputMap);
            String recordId = String.valueOf(inputMap.get('recordId'));
            String sectionName = String.valueOf(inputMap.get('sectionName'));
            System.debug('apex line 44 '+recordId + ' - '+ sectionName);
            for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:recordId]) {
                lstConDocs.add(cntLink.ContentDocumentId);
            }
            if(!lstConDocs.isEmpty()) {
                return [SELECT Id, Title, ContentDocumentId,FileExtension FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs];
            }
            else {
                return null;
            }
        }catch (Exception e) {
            throw e;
        }
     
    }

    @AuraEnabled
    public static Boolean deleteFiles(Map<String,Object> inputMap){
        Id idFile = String.valueOf(inputMap.get('idFile'));
        list<ContentDocument> listFileToDelete = new list<ContentDocument>();
        if(idFile!=NULL){
        ContentVersion cv=[SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE id = :idFile];
        listFileToDelete.add(new ContentDocument(Id = cv.ContentDocumentId));
            if(!listFileToDelete.isEmpty() && listFileToDelete != null) {
                Database.delete(listFileToDelete, false);
                Database.emptyRecycleBin(listFileToDelete);
                return true;
            }
        }
     return false;
    }
}