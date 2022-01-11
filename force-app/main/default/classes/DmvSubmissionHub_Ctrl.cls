global class DmvSubmissionHub_Ctrl implements vlocity_ins.VlocityOpenInterface2{
    
    global Object invokeMethod(String methodName,Map<String,Object> inputMap,Map<String,Object> outMap, Map<String,Object> options) {        
        Boolean success;
        String errors = '';
        try {
            if (methodName == 'applyForHearingRequest') { 
                string response=applyForHearingRequest(String.valueOf(inputMap.get('recordId')));
                if(response!=NULL){
                    if(response == 'Error Date Exceeded 60 days' || 
                       response == 'Hearing Request already submitted'){
                    	outMap.put('success',(Object)response);    
                    }
                    else{
                        outMap.put('success',JSON.deserializeUntyped(response));
                    }
                    
                }else{
                    outMap.put('success', NULL);
                }
                success = true;
                
            }
            
        } catch (Exception e) {
            errors = e.getMessage();
            success = false;
            outMap.put('error', errors);
        }
        
        outMap.put('error', errors);
        return success;
    }
    @AuraEnabled
    global static String applyForHearingRequest(String sCaseId){
        try{
            if(!String.isBlank(sCaseId)){
                Case cse=[Select id,OwnerId,Status,Hearing_Requested_Date__c,ClosedDate,Rejected_Date__c from case where id=:sCaseId];
                Group aruGroupId=[select Id from Group where  Type = 'Queue' AND NAME = 'Application Review Unit'];
                System.debug(cse);
                System.debug(aruGroupId);
                if(string.isNotBlank(cse.Status) && cse.Status == 'Denied' 
                   && cse.Rejected_Date__c != null){                       
                       Date closedDate = cse.Rejected_Date__c.addDays(60);
                       if(system.today() > closedDate){
                           return 'Error Date Exceeded 60 days';
                       }
                       else{                           
                           if(cse!=NULL && aruGroupId!=NULL && cse.Hearing_Requested_Date__c == null){
                               cse.OwnerId=aruGroupId.id;
                               cse.Status='In Review';
                               cse.Hearing_Requested_Date__c=System.now();
                               update cse;
                               return JSON.serialize(cse); 
                           }
                           else if(cse.Hearing_Requested_Date__c != null){                               
                               return 'Hearing Request already submitted'; 
                           }
                       }
                   }
                
                return NULL;
            }
        }catch(Exception ex){
            System.debug(ex.getMessage()+' '+ex.getLineNumber());
            return NULL;
        }
        return NULL;
    }
}