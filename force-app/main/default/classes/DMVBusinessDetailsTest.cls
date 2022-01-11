@isTest
public class DMVBusinessDetailsTest {
    
    @testSetup static void setupData(){
        Account acc = CADXP_TestClassUtil.createAccount('Business_Account');
        insert acc; 
        Contact con = CADXP_TestClassUtil.createContact(acc.Id);
        insert con;
        Accountcontactrelation acr = new Accountcontactrelation();
        acr.AccountId = acc.id;
        acr.ContactId = con.id;
        //insert acr;
        BusinessProfile bp = new BusinessProfile();
        bp.accountid = acc.id;
        insert bp;
        RegulatoryAuthorizationType license = new RegulatoryAuthorizationType();
        license.name = 'Distributor';
        insert license;
        BusinessLicenseApplication bla = new BusinessLicenseApplication();
        bla.accountid = acc.id;
        bla.Category = 'License';
        bla.AppliedDate = system.now();
        bla.LicenseTypeId = license.Id;
        insert bla;        
    }
    
    @isTest 
    public static void testAccountDetails(){   
        List<Account> lstAccount = [select id from account limit 1];        
        Map<String,Object> inputMap = new Map<String,Object>{'accountId' => (object) lstAccount[0].Id};
        Map<String,Object> outputMap = new Map<String,Object>();
        Map<String,Object> options=new Map<String,Object>();
        Test.startTest();
        DMVBusinessDetails objDMV =new DMVBusinessDetails();
        objDMV.invokeMethod('getAccountDetails',inputMap,outputMap,options);
        objDMV.invokeMethod('getAccountId',inputMap,outputMap,options);
        objDMV.invokeMethod('getBusnessLicenceApplication',inputMap,outputMap,options);
        Test.stopTest();
        system.assertEquals(lstAccount.size(), 1);
    }
    
    
}