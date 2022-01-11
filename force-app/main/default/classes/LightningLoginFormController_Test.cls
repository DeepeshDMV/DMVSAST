/**
*@name          LightningLoginFormController_Test 
*@author        Aman Syed (Deloitte)
*@date          06/18/2021
*@description   class used to test logged in user logic
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
<Name> <org>  <date of Initial Modification>
*/

@isTest
public with sharing class LightningLoginFormController_Test{

    /*=============================================================================================
    testLoginUser
    ==============================================================================================*/
	@isTest static void testLoginUser(){
        setupData();
        String result001 = LightningLoginFormController.login(uu.Username, '123121342531', 'https://cadxpdev-dmvpotdev.cs133.force.com');
        System.assertEquals(true, LightningLoginFormController.getIsUsernamePasswordEnabled());
        System.assertEquals(false, LightningLoginFormController.getIsSelfRegistrationEnabled());
        System.assertEquals(null, LightningLoginFormController.getSelfRegistrationUrl());
        LightningLoginFormController.getForgotPasswordUrl();
        LightningLoginFormController llfc = new LightningLoginFormController();
        LightningLoginFormController.setExperienceId(uu.Id);
	}

      /*=============================================================================================
    setupData
      ==============================================================================================*/
	@isTest static void setupData(){
        System.runAs(CADXP_TestClassUtil.getSystemAdminUser()){
            acc = CADXP_TestClassUtil.createAccount('Business_Account');
            insert acc;
            con = CADXP_TestClassUtil.createContact(acc.Id);
            insert con;
            uu = CADXP_TestClassUtil.createExternalCustomerUser(con);
            insert uu;
        }
	}

    public static Account acc;
    public static Contact con;
    public static User uu;
}