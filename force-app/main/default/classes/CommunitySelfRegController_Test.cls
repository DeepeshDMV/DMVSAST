/**
*@name          CommunitySelfRegController_Test 
*@author        Aman Syed (Deloitte)
*@date          05/25/2021
*@description   class used to test the community login user logic
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
<Name> <org>  <date of Initial Modification>
*/

@isTest
public with sharing class CommunitySelfRegController_Test{

    /*=============================================================================================
    testCommunityUser
    ==============================================================================================*/
	@isTest static void testCommunityUser(){
        setupData();

        csrc.registerUser();
    
        csrc.password = '2213';
        csrc.confirmPassword = '21321312';
        
        csrc.registerUser();

        csrc.password = '1';
        csrc.confirmPassword = '1';
        
        csrc.registerUser();
	}

    /*=============================================================================================
    setupData
    ==============================================================================================*/
    public static void setupData(){
        csrc = CADXP_TestClassUtil.createCommunitiesSelfRegController();
    }

    private static CommunitiesSelfRegController csrc;
}