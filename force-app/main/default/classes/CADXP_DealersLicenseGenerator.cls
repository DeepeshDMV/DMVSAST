/**
*@name          CADXP_DealersLicenseGenerator 
*@author        Aman Syed (Deloitte)
*@date          06/18/2021
*@description   class used to generate the dealers license and to invoke email alert.
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
<Name> <org>  <date of Initial Modification>
*/

public with sharing class CADXP_DealersLicenseGenerator {
  
    /*=============================================================================================
    generateLicenseRequest 
    ==============================================================================================*/
    @InvocableMethod(label='Dealer License Generator' description='Perform License Request')
    public static void generateLicenseRequest(List<ResultWrap> result){
        System.debug('I am here:: ' );

        BusinessLicense bl = new BusinessLicense();
        bl.Name = (result[0].licenseName != null) ? result[0].licenseName + ' - License' : '';
        bl.IsActive = true; 
        bl.Status = 'Active';
        bl.AccountId =  result[0].accountName;
        bl.UserId = result[0].userName;
        bl.RegulatoryAuthorizationTypeId = result[0].licenseTypeId;
        bl.ContactId =  result[0].applicantName;
        bl.BusinessLicenseApplicationName__c = (result[0].licenseName != null) ? result[0].licenseName : '';

        if(result[0].transactionType == 'BusinessApplicantion'){
            bl.PeriodStart = System.now();
            bl.PeriodEnd = System.now().addYears(3);
            if(result[0].licenseType.contains('Sales')){ bl.CADXP_LicenseType__c = 'S';}
            insert bl; 

        }else{
            bl.BusinessLicenseApplicationName__c = (result[0].licenseName != null) ? result[0].licenseName : '';
            bl.PeriodStart = System.now();
            bl.PeriodEnd = System.now().addDays(59);
            bl.CADXP_LicenseType__c = 'S';
            insert bl; 
        }

        if(result[0].businesslicense != null && result[0].businesslicense.getSObjectType().getDescribe().getName().equalsIgnoreCase('BusinessLicenseApplication')){
            BusinessLicenseApplication bla = new BusinessLicenseApplication(Id=result[0].businesslicense, LicensePermitNameId=bl.Id);
            update bla;
        }else if(result[0].businesslicense != null && result[0].businesslicense.getSObjectType().getDescribe().getName().equalsIgnoreCase('IndividualApplication')){
            IndividualApplication IA = new IndividualApplication(Id=result[0].businesslicense, LicensePermitNameId=bl.Id);
            update IA;
        }

        if(bl!=null){
            bl.Name = [Select Id,CADXP_DealersLicenseNumber__c From BusinessLicense Where Id =: bl.Id].CADXP_DealersLicenseNumber__c;
            update bl;
        }
    }

    public class ResultWrap {
        @InvocableVariable
        public Id businesslicense; 

        @InvocableVariable
        public string licenseName; 

        @InvocableVariable
        public string licenseType;

        @InvocableVariable
        public Id  applicantName;

        @InvocableVariable
        public Id accountName;
        
        @InvocableVariable
        public Id userName;

        @InvocableVariable
        public Id licenseTypeId;
       
        @InvocableVariable
        public string transactionType;
    }	
    
}