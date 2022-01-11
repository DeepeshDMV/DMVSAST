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
global without sharing class CADMV_electronicSignatureHelper implements vlocity_ins.VlocityOpenInterface2 {
    
    global Object invokeMethod(String methodName,Map<String,Object> inputMap,Map<String,Object> outMap, Map<String,Object> options) {        
        Boolean success;
        String errors = '';
        try {
            if (methodName == 'saveSign') {            
                outMap.put('success',saveSign(inputMap));
                success = true;
            }
        } catch (Exception e) {
            errors = e.getMessage();
            success = false;
            outMap.put('error', errors);
        }
        
        return success;
    }
    
    @AuraEnabled
    public static String saveSign(Map<String,Object> inputMap){	//String strSignElement,Id recId){
        system.debug('inputMap++'+inputMap);
        Id recId = String.valueOf(inputMap.get('recId'));
        String strSignElement = String.valueOf(inputMap.get('strSignElement'));
        String sObjName = recId.getSObjectType().getDescribe().getName();
        try {
            // Create Salesforce File
            //Insert ContentVersion
            
            ContentVersion cVersion = new ContentVersion();
            cVersion.ContentLocation = 'S'; //S-Document is in Salesforce. E-Document is outside of Salesforce. L-Document is on a Social Netork.
            cVersion.PathOnClient = 'Signature-'+System.now() +'.png';//File name with extention
            cVersion.Origin = 'H';//C-Content Origin. H-Chatter Origin.
            //cVersion.OwnerId = attach.OwnerId;//Owner of the file
            //cVersion.FirstPublishLocationId = recId;
            cVersion.Title = 'Signature-'+System.now() +'.png';//Name of the file
            cVersion.VersionData = EncodingUtil.base64Decode(strSignElement);//File content
            Insert cVersion;
            
            //After saved the Content Verison, get the ContentDocumentId
            Id conDocument = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cVersion.Id].ContentDocumentId;
            
            //Insert ContentDocumentLink
            ContentDocumentLink cDocLink = new ContentDocumentLink();
            cDocLink.ContentDocumentId = conDocument;//Add ContentDocumentId
            cDocLink.LinkedEntityId = recId;//Add attachment parentId
            cDocLink.ShareType = 'I';//V - Viewer permission. C - Collaborator permission. I - Inferred permission.
            cDocLink.Visibility = 'AllUsers';//AllUsers, InternalUsers, SharedUsers
            Insert cDocLink;
            return cVersion.Id;
        } catch (Exception e) {
            throw e;
            //System.debug('Execption - ' + e);
        }
    }
}