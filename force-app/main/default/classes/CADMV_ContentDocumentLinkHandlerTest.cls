/**
*@name          CADMV_UserTriggerHandlerTest 
*@author        Pallavi Attarde (Deloitte)
*@date          05/25/2021
*@description   class to test the File type, size and number of files while uploading document.
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
<Name> <org>  <date of Initial Modification>
*/

@isTest(SeeAllData=true)
public with sharing class CADMV_ContentDocumentLinkHandlerTest {
    
     public class MyException extends Exception {}
           
	  static testmethod void checkUploadFile() 
     { 
        InspectionAssessmentInd assess = [SELECT AssessmentIndDefinitionId,AssessmentTaskId,DisplayOrder,Id FROM InspectionAssessmentInd where result<>'' limit 1];
        
        ContentVersion content1 = new ContentVersion(); 
        content1.Title = 'Test_File1'; 
        content1.PathOnClient = '/' + content1.Title + '.jpg'; 
        Blob bodyBlob1 = Blob.valueOf('snc'); 
        content1.VersionData = bodyBlob1;	
        content1.origin = 'H';
        insert content1;

        ContentVersion content2 = new ContentVersion(); 
        content2.Title = 'Test_File2'; 
        content2.PathOnClient = '/' + content2.Title + '.png'; 
        Blob bodyBlob2 = Blob.valueOf('ABCDE'); 
        content2.VersionData = bodyBlob2;	
        content2.origin = 'H';
        insert content2;
        
        ContentVersion content3 = new ContentVersion(); 
        content3.Title = 'Test_File3'; 
        content3.PathOnClient = '/' + content3.Title + '.png'; 
        Blob bodyBlob3 = Blob.valueOf('ABCDE'); 
        content3.VersionData = bodyBlob3;	
        content3.origin = 'H';
        insert content3;
        
        ContentVersion testContent = [SELECT id, ContentDocumentId FROM ContentVersion where Id = :content1.Id];
        ContentVersion testContent2 = [SELECT id, ContentDocumentId FROM ContentVersion where Id = :content2.Id];
        ContentVersion testContent3 = [SELECT id, ContentDocumentId FROM ContentVersion where Id = :content3.Id];
        
        ContentDocumentLink contentlink=new ContentDocumentLink();
        contentlink.LinkedEntityId=assess.id;
        contentlink.ShareType= 'V';
        contentlink.ContentDocumentId=testcontent.ContentDocumentId;
		insert contentlink;
         
        ContentDocumentLink contentlink2=new ContentDocumentLink();
        contentlink2.LinkedEntityId=assess.id;
        contentlink2.ShareType= 'V';
        contentlink2.ContentDocumentId=testcontent2.ContentDocumentId;
        insert contentlink2;
         
        ContentDocumentLink contentlink3=new ContentDocumentLink();
        contentlink3.LinkedEntityId=assess.id;
        contentlink3.ShareType= 'V';
        contentlink3.ContentDocumentId=testcontent2.ContentDocumentId;   
         try{
         insert contentlink3;
         }
         catch(exception e)
         {
             System.assert(e.getMessage().contains('Can not attach more than 2 files'));
         }
         
        update contentlink2;
       	delete contentlink2;
        //undelete contentlink2;
     }
  
}