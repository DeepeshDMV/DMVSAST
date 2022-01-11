/****************************************************************************************************************
 Name:  CADMV_PublicComplaintHandler
 Scope: Project
 Execution Type: Trigger Handler class
==================================================================================================================
Purpose: Contains methods for Public Complaint trigger and to send email to Complainant  
==================================================================================================================
Version Control :

*****************************************************************************************************************/             
public with sharing class CADMV_PublicComplaintHandler {

   /*********************************************************************
    * Method Name: sendComplaintEmailToComplainantStaff
    * Description:This method is used to send emails to Complainant
    * Return Type: void
    * Parameter: String (Complaint Id)
    * ******************************************************************/

    public static void sendComplaintEmailToComplainantStaff(String newComplaintList){
        
        List<Attachment> complaintAttachmentList = new List<Attachment>(); 
        List<Messaging.SingleEmailMessage> emailList = new list<Messaging.SingleEmailMessage>();
        List<PublicComplaint> allPublicComplaints = new List<PublicComplaint>();
        String doNotReplyAddress = Label.CADMV_DoNotReplyOrgWideEmail;
        OrgWideEmailAddress owea = [select Id from OrgWideEmailAddress where Address =: doNotReplyAddress];
        EmailTemplate  etempComplainant = [select id,HtmlValue,Subject,Body from EmailTemplate where Name =: CADMV_AppConstants.complainantEmailTemplate limit 1];
        
        try{
        if(newComplaintList != null){
           
            allPublicComplaints = [select id,Email,CreatedById,FirstName,LastName,Name from PublicComplaint where id =:newComplaintList];
        }
        
        if(allPublicComplaints != null && allPublicComplaints.size() > 0){
                complaintAttachmentList = [SELECT Id,Name,Body,BodyLength,ContentType,CreatedById,CreatedDate,
                                    Description,IsDeleted,IsPrivate,LastModifiedById, //IsEncrypted
                                    LastModifiedDate,OwnerId,ParentId,SystemModstamp
                                    FROM Attachment 
                                    where ParentID =: allPublicComplaints[0].Id 
                                    AND Name LIKE '%ComplainForm%' 
                                    ];
            }
         
        
        if(!allPublicComplaints.isEmpty() && allPublicComplaints[0].Email != null && complaintAttachmentList != null){
            Messaging.SingleEmailMessage messageToComplainant = new Messaging.SingleEmailMessage();
            Messaging.SingleEmailMessage messageToComplainantFinal = new Messaging.SingleEmailMessage();
            Attachment attach = new Attachment();
            attach = complaintAttachmentList[0];
            messageToComplainant.setToAddresses(new String[]{allPublicComplaints[0].Email});
            messageToComplainant.setOrgWideEmailAddressId(owea.Id);
            messageToComplainant.setTemplateId(etempComplainant.Id);
            messageToComplainant.setTargetObjectId(allPublicComplaints[0].CreatedById);
            messageToComplainant.setSaveAsActivity(false);
            Savepoint sp = Database.setSavepoint();
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {messageToComplainant});
            Database.rollback(sp);
            
            messageToComplainantFinal.setToAddresses(new String[]{allPublicComplaints[0].Email});
            messageToComplainantFinal.setOrgWideEmailAddressId(owea.Id);
            messageToComplainantFinal.setSaveAsActivity(false);
            String complainantPlainBody = messageToComplainant.getPlainTextBody();
            String htmlBodyComplainant = messageToComplainant.getHTMLBody();
            
            htmlBodyComplainant = htmlBodyComplainant.replace('ComplaintFirstName', allPublicComplaints[0].FirstName);
            htmlBodyComplainant = htmlBodyComplainant.replace('ComplaintLastName', allPublicComplaints[0].LastName);
            htmlBodyComplainant = htmlBodyComplainant.replace('ComplaintName', allPublicComplaints[0].Name);
                    
            complainantPlainBody = complainantPlainBody.replace('ComplaintFirstName', allPublicComplaints[0].FirstName);
            complainantPlainBody = complainantPlainBody.replace('ComplaintLastName', allPublicComplaints[0].LastName);
            complainantPlainBody = complainantPlainBody.replace('ComplaintName', allPublicComplaints[0].Name);
            
            messageToComplainantFinal.setHtmlBody(htmlBodyComplainant);
                    
            messageToComplainantFinal.setSubject(etempComplainant.Subject);
                    
            messageToComplainantFinal.setPlainTextBody(complainantPlainBody);
            
            if(attach != null){
                        Messaging.EmailFileAttachment emailAttach = new Messaging.EmailFileAttachment();
                        emailAttach.setFileName(attach.Name);
                        emailAttach.setInline(false);
                        emailAttach.Body = attach.Body;
                        messageToComplainantFinal.setFileAttachments(new Messaging.EmailFileAttachment[] { emailAttach });
                        
                    }
            emailList.add(messageToComplainantFinal);
            
            Messaging.SendEmailResult[] results = Messaging.sendEmail(emailList);
        }
       }catch(Exception ex){
        CADMV_CreateErrorLogException.addError(ex,'CADMV_PublicComplaintHandler','sendComplaintEmailToComplainantStaff');
       }

        
    }
}