global without sharing class CADMV_CommunitySelfRegController {
    public static final String NULL_EMPTY_STRING = '';
    public static final String DEFAULT_COMMUNITY_PROFILE_NAME = 'CADMV Customer Community Plus User';

    @InvocableMethod(label='Invoke the Community User Creation' description='Invoke the Community User Creation')
    public static List<String> createExternalUserInvocable( List<userRequest> lstRequests){
        List<String> lstResponse = new List<String>{};
        for(userRequest ur : lstRequests){
            lstResponse.add( CADMV_CommunitySelfRegController.createExternalUser(ur.username, null, null, ur.fname, ur.mname, 
            ur.lname, ur.phone, ur.licenseNumber));                
        }
        return lstResponse;
    }


    global class userRequest {
        @InvocableVariable
        global string username; 
        
        @InvocableVariable
        global string fname;
        
        @InvocableVariable
        global string mname;     
        
        @InvocableVariable
        global string lname;
        
        @InvocableVariable
        global string phone; 
        
        @InvocableVariable
        global string licenseNumber;
    }	
    
    @AuraEnabled
    public static String createExternalUser(
        String username, String password, String startUrl, String fname, String mname,
        String lname, String phone, String lNumber) {
            Savepoint sp = null;
            Id recordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();

            //try {
                //sp = Database.setsavepoint();
                //
            
                Account newAcc = createAccount(fname, lname, username, lNumber, phone);

                Contact newContact = [Select id, FirstName, LastName, Email, AccountId from Contact where AccountId= :newAcc.ID];

                User finalUser = createUser(newContact,username,lNumber,phone);                
                String userId = Site.createExternalUser(finalUser, newAcc.Id, password);
                // create a fake userId for test.
                if (Test.isRunningTest()) {
                    userId = 'fakeUserId';           
                }
                if (userId != null) { 
                    if (password != null && password.length() > 1) {
                        ApexPages.PageReference lgn = Site.login(username, password, startUrl);                    
                        if(!Test.isRunningTest()) {
                            System.debug('I am here!! ' + lgn);
                            aura.redirect(lgn);
                        }
                    }
                }
                    
                // return login url. 
                /*if (finalUser.Id != null && password != null && password.length() > 1) {  
                    ApexPages.PageReference lgn = Site.login(username, password, null); //startUrl
                    return lgn.getUrl();
                }*/
            /*}
            catch (Exception ex) {
                Database.rollback(sp); //won't actually rollback due to user creation/mixed DML
                System.debug(ex.getMessage());
                
                AuraHandledException e = new AuraHandledException(ex.getMessage());
                e.setMessage(ex.getMessage());
                system.debug(e);
                throw e;                       
            }*/
            return null; 
        }   
    
    
    public static Account createAccount(String firstName, String lastName, String email, String lNumber, String phoneNumEnt) {
        ID storeRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Person Account').getRecordTypeId();

        //NDS 05.07.2021 already checking in Flow
        Account account; /* = getExistingContact(email); //PersonAccounts
        if(account == null)*/
         	account = new Account(
            FirstName = firstName,
            LastName = lastName,
            PersonEmail = email,
            Phone = phoneNumEnt,
            PersonHomePhone	= phoneNumEnt,
            PersonMobilePhone = phoneNumEnt,
            //OwnerId = DEFAULT_ACCOUNT_OWNERID,
            DriversLicenseNumber__c = lNumber,
            RecordTypeId = storeRecordTypeId
        );

        upsert account ID;

        return account;
    }
    
    @TestVisible 
    public static User createUser(Contact contact, String username, String lNumber, String phoneNumEnt) {
        Profile p = [
            SELECT Id 
            FROM Profile 
            WHERE name =: DEFAULT_COMMUNITY_PROFILE_NAME
            LIMIT 1
        ];
        
        User user = new User(
            ProfileId = p.Id,
           	IsActive = true,
            Languagelocalekey = 'en_US',
            Phone = phoneNumEnt,
            Localesidkey = 'en_US',
            Timezonesidkey = 'America/Los_Angeles',
            Emailencodingkey = 'UTF-8',
            FirstName = contact.FirstName,
            LastName = contact.LastName,
			Email = contact.Email,
            ContactId = contact.Id,
            Username = username,
            CADMV_DriversLicenseNumber__c = lNumber
        );
        
        if (String.isNotBlank(username)) {
            String alias = NULL_EMPTY_STRING + '';
            if (username != null && username.length() > 5) {
                alias = username.substring(0, 5);
            }
            else if (username != null && username.length() <= 5) {
                alias = username;
            }
            user.Alias = alias;
            if (username.length() > 30) {
                user.CommunityNickname = username.substring(0, 30);
            }
            else user.CommunityNickname = username;
        }
        
        /*if (!String.IsBlank(fedId)) {
            user.FederationIdentifier = fedId;
        }
        
        Contact c = [
            SELECT Id, AccountId, Account.OwnerId, OwnerId
            FROM Contact
            WHERE Id = :contact.Id
        ];*/

        return user;
    }
        
}