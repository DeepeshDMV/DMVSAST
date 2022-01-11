global class CADMV_ComplaintController implements vlocity_ins.VlocityOpenInterface {
    
    public Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options) {
        
        if(methodName.equals('addComplaint')) {
            createComplaint(input, output, options);
        } 
        return true;
    }
    
    public static void createComplaint(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options) {
        System.debug('Input JSON-->' + JSON.serialize(input));
        Map<String,Object> complaint = (Map<String,Object>) input.get('Complaint');
        PublicComplaint cmplntObj = new PublicComplaint();
        String cmpRecId = String.valueOf(input.get('complaintId'));
        cmplntObj.Id = cmpRecId;
        cmplntObj.Status = 'Submitted';
        cmplntObj.CADMV_AddressLine_1__c = String.valueOf(complaint.get('AddressLine1'));
        cmplntObj.CADMV_AddressLine_2__c = String.valueOf(complaint.get('AddressLine2'));
        cmplntObj.CADMV_City__c = String.valueOf(complaint.get('City'));
        cmplntObj.CADMV_State__c = String.valueOf(complaint.get('State'));
        cmplntObj.CADMV_Zipcode__c = String.valueOf(complaint.get('Zipcode'));
        cmplntObj.IncidentDate = Date.valueOf(String.valueOf(complaint.get('IncidentDate')));
        cmplntObj.ComplaintType = String.valueOf(complaint.get('Issue'));
        cmplntObj.Description = String.valueOf(complaint.get('Description'));
        cmplntObj.Subject = String.valueOf(complaint.get('Title'));
        cmplntObj.BusinessName = String.valueOf(complaint.get('AccountName'));
        cmplntObj.FirstName = String.valueOf(complaint.get('FirstName'));
        cmplntObj.LastName = String.valueOf(complaint.get('LastName'));
        cmplntObj.Email = String.valueOf(complaint.get('Email'));
        cmplntObj.MobileNumber = String.valueOf(complaint.get('MobileNumber'));
        
        upsert cmplntObj;
        
        output.put('complaintId', cmplntObj.Id);
        
        PublicComplaint pubCmplntObj = [Select Name,Id From PublicComplaint Where Id =:cmplntObj.Id];
        
        output.put('publicComplaintName', pubCmplntObj.Name);
    }
}