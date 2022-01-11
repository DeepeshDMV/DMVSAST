Global class CADMV_PublicComplaintEmailRemoteAction implements vlocity_ins.VlocityOpenInterface {
    
    global Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options) {
        Boolean result = true;
        try{
            
            if(methodName.equals('sendEmails')){
            sendEmails(input,output,options);
            }else {
                result = false;
            }
            
        }
        catch(Exception ex){
            result = false;
            System.debug('Error Message==>'+ex.getMessage());
        }
        
        return true;
    }
    
    public void sendEmails(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options){
        
       String ComplaintId = (String)input.get('ComplaintId');
       System.debug('ComplaintId===>'+ComplaintId);
       CADMV_PublicComplaintHandler.sendComplaintEmailToComplainantStaff(ComplaintId);
  
    }

}