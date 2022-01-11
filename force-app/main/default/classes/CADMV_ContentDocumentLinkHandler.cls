public with sharing class CADMV_ContentDocumentLinkHandler implements CADMV_ITriggerHandler {

    public static void BeforeInsert(List<ContentDocumentLink> lstnewItems){

            Set<Id> contentDocumentIdSet = new Set<Id>();
            Set<Id> contentDocumentParentIdSet = new Set<Id>();
            Set<Id> rcvCDVerify = new Set<Id>();
            Integer sizeLimit = 8000000;
            Map<String,List<ContentDocumentLink>> totalDocCountMap = new Map<String,List<ContentDocumentLink>>();
            
            for(ContentDocumentLink cd : lstnewItems) {
                    system.debug('cd=='+cd);
                    system.debug('cd.LinkedE=='+cd.LinkedEntityId);
                
                if(cd.LinkedEntityId.getSObjectType().getDescribe().getName()=='InspectionAssessmentInd'){
                    contentDocumentIdSet.add(cd.ContentDocumentId);
                    contentDocumentParentIdSet.add(cd.LinkedEntityId);
                }

                if(cd.LinkedEntityId.getSObjectType().getDescribe().getName()=='RegulatoryCodeViolation'){
                    rcvCDVerify.add(cd.LinkedEntityId);
                }
            }

            // List<InspectionAssessmentInd> inspectionAssessmentList = [SELECT AssessmentIndDefinitionId,AssessmentTaskId,Id FROM InspectionAssessmentInd Where Id IN: contentDocumentParentIdSet ];
            List<ContentDocument> contentDocumentList = [SELECT ParentId,ContentSize,FileExtension,FileType,Id,Title FROM ContentDocument WHERE Id IN: contentDocumentIdSet];
            //system.debug('record '+contentDocumentList);
            List<CADMV_OrganizationSettings__mdt> orgSett = [select CADMV_OmniContainer__c from CADMV_OrganizationSettings__mdt where DeveloperName='FileTypes' limit 1];
            String filetypevar = orgsett[0].CADMV_OmniContainer__c;
            
            for(ContentDocument cdoc : contentDocumentList )
            {
                String s =cdoc.FileExtension; 
                if(!(filetypevar.contains(s.toUpperCase())))
                {
                    ContentDocumentlink docErr = lstnewItems[0];
                    //Trigger.oldmap.get(cdoc.Id).addError('This type is not supported');
                    docErr.addError('This file type is not supported');
                }
                system.debug('Size--'+cdoc.ContentSize);
                if(cdoc.ContentSize > sizeLimit )
                {
                    ContentDocumentlink docErr = lstnewItems[0];
                    //Trigger.oldmap.get(cdoc.Id).addError('File Size is too large');
                    docErr.addError('File Size is too large');
                }
            
            } 
                system.debug('contentDocumentParentIdSet=='+contentDocumentParentIdSet);
            
            
            if(!contentDocumentParentIdSet.isEmpty()){
                List<ContentDocumentLink> contentDocumentParentList = [SELECT Id,LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId IN: contentDocumentParentIdSet];
                for(ContentDocumentLink cdoc : contentDocumentParentList )
                {
                    if(totalDocCountMap!=null && totalDocCountMap.containsKey(cdoc.LinkedEntityId ))
                    {
                        totalDocCountMap.get(cdoc.LinkedEntityId ).add(cdoc);
                    }
                    else{
                        totalDocCountMap.put(cdoc.LinkedEntityId ,new List<ContentDocumentLink>{cdoc});
                    }            
                }
                
                for(Id key: totalDocCountMap.keySet())
                {
                system.debug('DocCount--'+totalDocCountMap.get(key).size());
                system.debug('key--'+key);
                system.debug('totalDocCountMap--'+totalDocCountMap);
                    if(totalDocCountMap.get(key).size() >= 2)
                    {
                        lstnewItems[0].addError('Can not attach more than 2 files');
                    }
                }
            }

             //Will the portal upload have the same limiation as inspection uploads?
            if(!rcvCDVerify.isEmpty()){
                RegulatoryCodeViolation rcvObj = [Select Id, Inspection.Visitor.Id, Inspection.Visitor.Email,  InspectionId From RegulatoryCodeViolation WHERE Inspection.CADMV_Status__c = 'Failed - Photos Required' AND Id IN : rcvCDVerify LIMIT 1];
                Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
                message.setTargetObjectId(rcvObj.Inspection.Visitor.Id); 
                //message.setReplyTo('dxp_noreply@info.dmvonline.ca.gov');
                message.setOrgWideEmailAddressId([Select Id From OrgWideEmailAddress Where Address = 'dxp_noreply@info.dmvonline.ca.gov' LIMIT 1].Id);
                message.setUseSignature(false); 
                message.setBccSender(false); 
                message.setSaveAsActivity(false); 

                EmailTemplate emailTemplate = [Select Id from EmailTemplate where DeveloperName = 'CADMV_InspectionPhotoFollowNotification'];
                message.setTemplateID(emailTemplate.Id); 
                message.setWhatId(rcvObj.InspectionId);
                message.toAddresses = new String[] {rcvObj.Inspection.Visitor.Email};
               
                Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
                Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
                
                if (results[0].success){
                    System.debug('The email was sent successfully.');
                } else {
                    System.debug('The email failed to send: ' +  results[0].errors[0].message);
                }
                
            }
   }
 
    public static void BeforeUpdate(Map<Id, SObject> mapNewItems, Map<Id, SObject> mapOldItems){
    }
 
    public static void BeforeDelete(Map<Id, SObject> mapOldItems){
    }
 
    public static void AfterInsert(Map<Id, SObject> mapNewItems){
    }
 
    public static void AfterUpdate(Map<Id, SObject> mapNewItems, Map<Id, SObject> mapOldItems){
    }
 
    public static void AfterDelete(Map<Id, SObject> mapOldItems){
    }
 
    public static void AfterUndelete(Map<Id, SObject> mapOldItems){
    }
 
    public Boolean IsDisabled(){
    return false;
    }
}