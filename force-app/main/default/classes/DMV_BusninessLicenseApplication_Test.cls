@isTest
public class DMV_BusninessLicenseApplication_Test {
    
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
    public static void testgetProgressBarDetails(){   
        
        List<BusinessLicenseApplication> lstBla =  [select id from BusinessLicenseApplication limit 1];       
        Map<String,Object> inputMap = new Map<String,Object>{'blaId' => (object) lstBla[0].Id};
        Test.startTest();
        DMV_BusninessLicenseApplication objDMV =new DMV_BusninessLicenseApplication();
        //objDMV.invokeMethod('getProgressBarDetails',inputMap);
        //objDMV.getProgressBarDetails(inputMap);
        Test.stopTest();
        system.assertEquals(lstBla.size(), 1);
    }
    
    
}