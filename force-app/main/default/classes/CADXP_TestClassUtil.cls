/**
*@name          CADXP_TestClassUtil 
*@author        Aman Syed (Deloitte)
*@date          05/25/2021
*@description   Class used to manage creation, deletion of metadata to perform full unit test.
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
<Name> <org>  <date of Initial Modification>
*/

@isTest
public with sharing class CADXP_TestClassUtil {
     /*=============================================================================================
    createInternalUser
    ==============================================================================================*/
    public static User createInternalUser() {
        User myUser = new User(Alias = 'standt', 
                          Email='createdtestuser' + getUserNamePrefix() + '@domiantest.com', 
            			  EmailEncodingKey='UTF-8',  
                          Title = 'TitleTest', 
                          FirstName = 'FirstNameTest', 
                          LastName='LastNameTest', 
                          LanguageLocaleKey='en_US', 
            			  LocaleSidKey='en_US', 
                          ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'LIMIT 1].Id,
						  UserRoleId = [SELECT Id FROM UserRole WHERE Name = 'User Manager' LIMIT 1].Id,
            			  TimeZoneSidKey='America/Los_Angeles', 
                          UserName = getUserNamePrefix() + 'testuser@domaintest.com'
                      );        
        return myUser;
    }
    
    /*=============================================================================================
    createExternalCustomerUser
    ==============================================================================================*/
    public static User createExternalCustomerUser(Contact cc) {                    
        User externalCustomerUser = new User(
            Alias = 'standt',
            Email = 'createdtestuser' + getUserNamePrefix() + '@cadmv.com',
            EmailEncodingKey = 'UTF-8',
            Title = 'TesterTitle',
            FirstName = 'FirstNameTest',
            LastName = 'LastNameTest',
            ContactId = cc.id,
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'CA DMV Customer Community Plus User' LIMIT 1].Id,
            TimeZoneSidKey = 'America/New_York',
            Username = getUserNamePrefix() + 'testuser@domaintest.com'
        );
        return externalCustomerUser;
    }

    /*=============================================================================================
    getSystemAdminUser
    ==============================================================================================*/
    public static User getSystemAdminUser(){
        Id currentUserId = UserInfo.getUserId();
        User myAdmin = [SELECT id FROM User WHERE Profile.Name = 'System Administrator' AND id != :currentUserId AND isActive=true AND UserRoleId != null LIMIT 1];
        return myAdmin;
    }

      /*=============================================================================================
    createAccount
    ==============================================================================================*/
    public static Account createAccount(String accountType) {
        Account newacc = new Account(  
            Phone = '111-111-1111',                                                                                                                          
            Type = 'Customer',                                                                                                                      
            vlocity_ins__Email__c = 'accounttest@test.com',                                                                                                           
            ParentId = null,          
            RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get(accountType).getRecordTypeId(),                                                                                                                                                                                              
            NumberOfEmployees = 10,
            vlocity_ins__DateFounded__c = null,            
            vlocity_ins__DateOfFirstInsurance__c = null,
            vlocity_ins__Active__c = 'Yes',
            Website = null, 
            Industry = null
        );   

        if(accountType == 'PersonAccount'){
            newacc.FirstName = 'Test';
            newacc.LastName = 'Person Account';
            newacc.PersonMailingCountry = 'USA';
            newacc.PersonMailingCity = 'Avon';
            newacc.PersonMailingState = 'CT';
            newacc.PersonMailingStreet = 'CA Street test';
            newacc.PersonMailingPostalCode = '00000';
            newacc.PersonMobilePhone = '111-111-1111';
            newacc.vlocity_ins__NetWorth__pc = null;
            newacc.vlocity_ins__TaxId__pc = null;
            newacc.vlocity_ins__IsPersonAccount__c = true;
        }else{
            newacc.vlocity_ins__IsPersonAccount__c = false;
            newacc.Name = 'Test Account';
            newacc.ShippingCountry = 'USA';
            newacc.ShippingCity = 'Avon';
            newacc.ShippingState = 'CT';
            newacc.ShippingStreet = 'CA Street test';
            newacc.ShippingPostalCode = '00000';
        }

        return newacc;
    }

    /*=============================================================================================
    createContact
    ==============================================================================================*/
    public static Contact createContact(Id accountId) {                                                                                                                                                                                            
        Contact cc = new Contact(
                FirstName = 'Test',
                LastName = 'Contact',
                Phone = '111-111-1111',                             
                AccountId = accountId,    
                MobilePhone = null,                        
                Title = 'Test Contact',                 
                Email = 'contacttest@test.com',             
                vlocity_ins__UserId__c = null,              
                vlocity_ins__PrimaryEmployerId__c = null,    
                vlocity_ins__SocialSecurityNumber__c = null, 
                vlocity_ins__EmploymentStatus__c = 'Unemployed',      
                vlocity_ins__StateOfIssuance__c = 'VA',    
                vlocity_ins__Occupation__c = null,            
                vlocity_ins__DriversLicenseNumber__c = null,  
                vlocity_ins__AnnualIncome__c = null,          
                vlocity_ins__NetWorth__c = null,
                RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByDeveloperName().get('Contact').getRecordTypeId()     
            );
        return cc;
    }

    /*=============================================================================================
    createLicense
    // ==============================================================================================*/
    // public static License__c createLicense(Id accountId, Id contactId) {
    //     License__c license = new License__c(
    //         Name = 'Test license',                                
    //         Program_Type__c = 'Salesperson',  
    //         License_Type__c = 'Salesperson',  
    //         Issue_Date__c = System.today(),
    //         Applicant__c = contactId,
    //         Account__c = accountId, 
    //         Application_Method__c = 'Original',
    //         Expiration_Date__c = System.today()+10,
    //         Status__c = 'Active',
    //         Sub_Status__c = 'Additional Information Required',	
    //         Total_Fees__c = 1000,
    //         Total_Fees_Paid__c = 500,
    //         Ultimate_Parent_Account__c = null
    //     );
    //     return license;
    // }

    // /*=============================================================================================
    // createApplicationFee (fee)
    // ==============================================================================================*/
    // public static Application_Fee_Table__c createApplicationFee(Id masterfee, Id accountId, Id individualAppId, Id contactId, Id licenseId, Id transId) {
    //     Application_Fee_Table__c appfee = new Application_Fee_Table__c(
    //         Name = 'Test Fee',                                
    //         Account__c = accountId,  
    //         Application__c = individualAppId,
    //         Contact__c = contactId,
    //         License__c = licenseId,  
    //         CADMV_LineItemCost__c = 10,
    //         Master_Fee_Table__c = masterfee,
    //         Transaction__c = transId
    //     );
    //     return appfee;
    // }

    // /*=============================================================================================
    // createMasterFee
    // ==============================================================================================*/
    // public static Master_Fee_Table__c createMasterFee(Id masterfeescheduleId) {
    //     Master_Fee_Table__c masterfee = new Master_Fee_Table__c(
    //         Name = 'Test Master Fee',                                
    //         Base_Amount__c = 10, 
    //         Board__c = 'Salesperson',  
    //         Endorsement_Type__c = 'None',
    //         Exam_Type__c = 'None',
    //         Fee_Type__c = 'Application Fee', 
    //         Application_Type__c = 'Original',
    //         Formula_Amount__c = '1000',  
    //         License_Type__c = 'Salesperson',
    //         Maintenance_Type__c = 'None',
    //         Mandatory_for_POT__c = 'No',                                
    //         Master_Fee_Schedule__c = masterfeescheduleId, 
    //         Portal_Display_Name__c = 'Test Portal Display',  
    //         Program_Type__c = 'Salesperson',
    //         Units__c = 10,
    //         Variable_Amount_Formula__c = 20, 
    //         Waiver_Percent__c = 3.00
    //     );
    //     return masterfee;
    // }

    // /*=============================================================================================
    // createMasterFeeSchedule
    // ==============================================================================================*/
    // public static Master_Fee_Schedule__c createMasterFeeSchedule() {
    //     Master_Fee_Schedule__c feeschedule = new Master_Fee_Schedule__c(
    //         Name = 'Test Fee Schedule',                                
    //         Approved__c = true,  
    //         Effective_End_Date__c = Date.valueOf('2021-05-29'),
    //         Effective_Start_Date__c = Date.valueOf('2021-05-10')
    //     );
    //     return feeschedule;
    // }

    // /*=============================================================================================
    // createApplicationPayment
    // ==============================================================================================*/
    // public static Application_Payment_Table__c createApplicationPayment(Id masterfee, Id applicationfee) {
    //     Application_Payment_Table__c apppay = new Application_Payment_Table__c(
    //         Name = 'Test App Payment',                                
    //         Application_Payment_Status__c = 'In Progress', 
    //         Application_Fee_Table__c = applicationfee,
    //         Fee_Name__c = 'Application fee',  
    //         Master_Fee_Table__c = masterfee,
    //         Paid_Amount__c	 = 10,
    //         Payment_Amount__c = 10,  
    //         Pending_Amount__c = 10
    //     );
    //     return apppay;
    // }

    // /*=============================================================================================
    // createCheckout
    // ==============================================================================================*/
    // public static Checkout__c createCheckout(Id accountId, Id contId) {
    //     Checkout__c check_out = new Checkout__c(
    //         Contact__c = contId,                                
    //         Account__c = accountId,  
    //         Intake_Method__c = 'Portal',
    //         Status__c = 'Pending'
    //     );
    //     return check_out;
    // }

    //  /*=============================================================================================
    // createRegulatoryTransactionFee
    // ==============================================================================================*/
    // public static RegulatoryTrxnFee createRegulatoryTransactionFee(Id accountId, Id contId, Id checkoutId, Id businessAppId) {
    //     RegulatoryTrxnFee rtf = new RegulatoryTrxnFee(
    //         ParentRecordId = businessAppId,                       
    //         AccountId = accountId,                              
    //         Checkout__c = checkoutId,                          
    //         Status = 'Draft',                                     
    //         DueDate = Datetime.valueOf(System.now()+10),    
    //         CalculationDate = Datetime.valueOf(System.now()-1),
    //         Comments = 'Testing application regulatory fee'                                         
    //       );
    //     return rtf;
    // }

    /*=============================================================================================
    BusinessLicenseApplication
    ==============================================================================================*/
    public static BusinessLicenseApplication createBusinessApplication(Id accountId, Contact contId, Case caseId, Id businessType, Id licenseType) {
        BusinessLicenseApplication bla = new BusinessLicenseApplication(
                Status = 'Gathering Prerequisites',                 
                AppliedDate = Datetime.valueOf(System.now()+1),
                AccountId = accountId,
                LicenseTypeId = licenseType,
                Applicant = contId,
                PrimaryOwner = contId,
                ApplicationCase = caseId,
                BusinessTypeId = businessType,                      
                Category = 'License',                                   
                Submission_Payment_Deadline_Missed__c = false,            
                Autobroker_Endorsement_Attached_Provided__c = false,      
                Course_is_complete__c = false,                          
                Exam_is_complete__c = false,                         
                Live_Scan_Fingerprint_Request__c = false,                
                Application_Background_Personal_History__c = false,      
                Background_Check_DMV__c = false,                        
                Certificate_Proposed_Franchise_Agreement__c = false,    
                Appointment_of_Director_as_Agent__c = false,      
                Copy_of_Fictitous_Name__c = false,               
                State_Board_Equalization_Resale_Permit__c = false,     
                Photograph_of_Business_Location__c = false,            
                IF_CORP_LLC_Statement_Of_Information_SOS__c = false,     
                Letter_of_Authorization_new_trailer_only__c = false,   
                Note_requirements_after_licensed__c = false,            
                Application_pre_requisites_met__c = false,           
                CADMV_MeetsPropertyUseRequirements__c = false,       
                Is_Autobroker_Endorsement__c = false
        );
        return bla;
    }

     /*=============================================================================================
    createRegulatoryAuthorizationType
    ==============================================================================================*/
    public static RegulatoryAuthorizationType createRegulatoryAuthorizationType() {
        RegulatoryAuthorizationType rat = new RegulatoryAuthorizationType(
            Name = 'Test - Retail New',       
            Description = 'Test Regulatory Type', 
            RegulatoryAuthCode = '111111111',      
            RegulatoryAuthCategory = 'License',   
            Jurisdiction = 'none',             
            ProcessingDuration = '12',         
            DurationType = 'Month'              
        );
        return rat;
    }

     /*=============================================================================================
    createCommunitiesSelfRegController
    ==============================================================================================*/
    public static CommunitiesSelfRegController createCommunitiesSelfRegController() {
        CommunitiesSelfRegController csrc = new CommunitiesSelfRegController();
        csrc.firstName = 'Test - Retail New';   
        csrc.lastName = 'Test Regulatory Type';
        csrc.email = '111111111';
        csrc.communityNickname = 'License';
        csrc.password = 'abcd1234';
        csrc.confirmPassword = 'abcd1234';         
        return csrc;
    }

    /*=============================================================================================
    getUserNamePrefix
    ==============================================================================================*/
    public static String getUserNamePrefix(){
        return UserInfo.getOrganizationId() + System.now().millisecond();
    }


}