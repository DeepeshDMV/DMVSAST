/**
*@name          CADMV_CommunitySelfRegController_Test 
*@author        Aman Syed (Deloitte)
*@date          05/25/2021
*@description   class used to test the community login user logic
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
<Name> <org>  <date of Initial Modification>
*/

@isTest
public with sharing class CADMV_CommunitySelfRegController_Test{

    /*=============================================================================================
    testCommunityUser
    ==============================================================================================*/
	@isTest static void testCommunityUser(){
        setupData();
        User user_response = CADMV_CommunitySelfRegController.createUser(cc, us.Username, '112313423234221', '1111111111');
        String ext_response = CADMV_CommunitySelfRegController.createExternalUser(externalUser.Username, '1221223123', '', externalUser.FirstName, null, externalUser.LastName, null, '112313423234221');
        Account acc_response = CADMV_CommunitySelfRegController.createAccount(acc.FirstName, acc.LastName, acc.vlocity_ins__Email__c, '112313423234221', '1111111111');
        CADMV_CommunitySelfRegController.userRequest ur = new CADMV_CommunitySelfRegController.userRequest();
        ur.username = externalUser.Username;
        ur.fname = externalUser.FirstName;
        ur.mname = '';
        ur.lname = externalUser.LastName;
        ur.phone = '';
        ur.licenseNumber = '112313423234221';
        List<String> reponserec = CADMV_CommunitySelfRegController.createExternalUserInvocable(new List<CADMV_CommunitySelfRegController.userRequest>{ur});
	}

    /*=============================================================================================
    setupData
    ==============================================================================================*/
    public static void setupData(){
        csrc = CADXP_TestClassUtil.createCommunitiesSelfRegController();

        System.runAs(CADXP_TestClassUtil.getSystemAdminUser()){
            acc = CADXP_TestClassUtil.createAccount('PersonAccount');
            insert acc; 
            Account acc2 = CADXP_TestClassUtil.createAccount('Business_Account');
            insert acc2; 
            cc = CADXP_TestClassUtil.createContact(acc2.Id);
            insert cc;
            externalUser = CADXP_TestClassUtil.createExternalCustomerUser(cc);
            insert externalUser; 
            us = CADXP_TestClassUtil.createInternalUser();
            insert us;
        }
    }

    private static Account acc;
    private static Contact cc;
    private static User us;
    private static User externalUser;
    private static CommunitiesSelfRegController csrc;

}