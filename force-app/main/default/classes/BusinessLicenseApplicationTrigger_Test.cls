@isTest
public class BusinessLicenseApplicationTrigger_Test {
@isTest static void getPersonExamination(){
        Account acc = CADXP_TestClassUtil.createAccount('Business_Account');
        insert acc; 
        Contact cc = CADXP_TestClassUtil.createContact(acc.Id);
        insert cc;
        RegulatoryAuthorizationType regType=new RegulatoryAuthorizationType();
        regType.Name='Dealer - Retail New';
        insert regType;
        RegulatoryAuthorizationType regType1=new RegulatoryAuthorizationType();
        regType1.Name='Dealer - Wholesale';
        insert regType1;
        RegulatoryAuthorizationType regType2=new RegulatoryAuthorizationType();
        regType2.Name='Dealer - Retail Used';
        insert regType2;
        RegulatoryAuthorizationType regType3=new RegulatoryAuthorizationType();
        regType3.Name='Salesperson';
        insert regType3;
        try{
            BusinessLicenseApplication indApp=new BusinessLicenseApplication();
            indApp.AccountId=acc.id;
            indApp.Status='Submitted';
            indApp.LicenseTypeId=regType.id;
            insert indApp;
        }catch(Exception ex){
            
        }
        try{
            BusinessLicenseApplication indApp1=new BusinessLicenseApplication();
            indApp1.AccountId=acc.id;
            indApp1.Status='Submitted';
            indApp1.LicenseTypeId=regType1.id;
            insert indApp1;
        }catch(Exception ex){
            
        }try{
            BusinessLicenseApplication indApp2=new BusinessLicenseApplication();
            indApp2.AccountId=acc.id;
            indApp2.Status='Submitted';
            indApp2.LicenseTypeId=regType2.id;
            insert indApp2;
        }catch(Exception ex){
            
        }try{
            BusinessLicenseApplication indApp3=new BusinessLicenseApplication();
            indApp3.AccountId=acc.id;
            indApp3.Status='Submitted';
            indApp3.LicenseTypeId=regType3.id;
            insert indApp3;
        }catch(Exception ex){
            
        }
        
    }
}