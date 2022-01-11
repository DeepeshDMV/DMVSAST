/**
*@name          CADMV_UserTriggerHandlerTest 
*@author        Aman Syed (Deloitte)
*@date          05/25/2021
*@description   class to test the user and contact logic where at user registration a contact should be created.
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
<Name> <org>  <date of Initial Modification>
*/

@IsTest
public with sharing class CADMV_UserTriggerHandlerTest {

    /*=============================================================================================
    testUpdateContacts
    ==============================================================================================*/
    static testMethod void testUpdateContacts() {
        Test.startTest(); 
        User u = [select Id,ContactId,FirstName from User where ContactId<>'' limit 1]; 
        u.FirstName='Bar'; 
        update u; 
        Test.stopTest(); 

        Contact c = [select FirstName from Contact where Id=:u.ContactId]; 
        System.assertEquals(c.FirstName,u.FirstName); 

        CADMV_UpdateContactInfoFromUserQueueable queuejob = new CADMV_UpdateContactInfoFromUserQueueable(new Set<Id>{u.Id});
        Id jobId = System.enqueueJob(queuejob);
        System.assert(jobId!=null, 'Error during queue : CADMV_UpdateContactInfoFromUserQueueable'); 
    }

}