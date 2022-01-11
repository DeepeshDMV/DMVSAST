global without sharing class DMVBusinessDetails implements vlocity_ins.VlocityOpenInterface2 {
    
    global Object invokeMethod(String methodName,Map<String,Object> inputMap,Map<String,Object> outMap, Map<String,Object> options) {        
        Boolean success;
        String errors = '';
        try {
            if (methodName == 'getAccountDetails') {            
                outMap.put('success', JSON.deserializeUntyped(getAccountDetails(inputMap, outMap, options)));
                success = true;
            }
            if (methodName == 'getAccountId') {            
                outMap.put('success', JSON.deserializeUntyped(getAccountId()));
                success = true;
            }
            if (methodName == 'getBusnessLicenceApplication') {            
                outMap.put('success', JSON.deserializeUntyped(getBusnessLicenceApplication(inputMap)));
                success = true;
            }
            if (methodName == 'getBLARegulatoryTFee') {            
                outMap.put('success', JSON.deserializeUntyped(getBLARegulatoryTFee(inputMap)));
                success = true;
            }
            
            if (methodName == 'getIndividualLicenceApplication') {            
                outMap.put('success', JSON.deserializeUntyped(getIndividualLicenceApplication(inputMap)));
                success = true;
            }
            
            if (methodName == 'getCheckoutDetails') {            
                outMap.put('success', JSON.deserializeUntyped(getCheckoutDetails(inputMap)));
                success = true;
            }
            
            if (methodName == 'getVisit') {            
                outMap.put('success', JSON.deserializeUntyped(getVisit(inputMap)));
                success = true;
            }
            
            if (methodName == 'getCheckoutRelatedDetails') {            
                outMap.put('success', JSON.deserializeUntyped(getCheckoutRelatedDetails(inputMap)));
                success = true;
            }
            
            if (methodName == 'getPersonAccountId') {            
                outMap.put('success', JSON.deserializeUntyped(getPersonAccountId()));
                success = true;
            }
            
            if (methodName == 'getPersonExamDetails') {            
                outMap.put('success', JSON.deserializeUntyped(getPersonExamDetails(inputMap)));
                success = true;
            }
            if (methodName == 'getRegulatoryTrnxFee') {            
                outMap.put('success', JSON.deserializeUntyped(getRegulatoryTrnxFee(inputMap)));
                success = true;
            }
            
            if (methodName == 'getServiceAppointment') {            
                outMap.put('success', JSON.deserializeUntyped(getServiceAppointment(inputMap)));
                success = true;
            }
            
            if (methodName == 'getPersonExamination') {            
                outMap.put('success', JSON.deserializeUntyped(getPersonExamination(inputMap)));
                success = true;
            }
            
            
        } catch (Exception e) {
            errors = e.getMessage();
            success = false;
            outMap.put('error', errors);
        }
        
        outMap.put('error', errors);
        return success;
    }
            
    public static String getAccountDetails(Map<String,Object> accountId, Map<String,Object> outputMap, Map<String,Object> options){
        system.debug('inside getAccountDetails' + accountId.get('accountId'));
        String outputJson = '';
        try{
            if(String.isNotBlank(String.valueOf(accountId.get('accountId')))){
                system.debug('inside if block');
                List<string> lstFields = new List<String>{'id','Name','Phone','Website','ShippingStreet','ShippingCity','ShippingState','ShippingPostalCode','recordtypeid','AccountOwnerName'};
                    List<account> lstAccounts = [select id,Phone,Website,ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode,
                                                 recordtypeid,Name,Owner.Name from account where id =: String.valueOf(accountId.get('accountId'))];
                List<accountcontactrelation> lstACR = [select id,roles,accountid,contactid from accountcontactrelation where accountid =: String.valueOf(accountId.get('accountId'))];
                List<BusinessProfile> lstBP = [select id,BusinessOperatingName,BusinessStructure,BusinessTaxIdentifier from BusinessProfile where accountid =: String.valueOf(accountId.get('accountId'))];
                system.debug('Query Run ' + lstAccounts);
                List<user> lstUser = [select id,contactid from user where id =: userinfo.getUserId()];
                List<contact> lstContact = [select id,name,email from contact where id =: lstUser[0].contactid];
                
                if(!lstAccounts.isEmpty()){
                    JSONGenerator gen = JSON.createGenerator(true);
                    gen.writeStartObject();
                    for(String field : lstFields){
                        if(field == 'AccountOwnerName'){
                            if(lstAccounts[0].Owner.Name != null){
                                 gen.writeObjectField(field, lstAccounts[0].Owner.Name);
                            }else{
                                gen.writeObjectField(field, '');
                            }
                        }else{
                            if(lstAccounts[0].get(field) != null)
                                gen.writeObjectField(field, lstAccounts[0].get(field));
                            else
                                gen.writeObjectField(field, '');   
                        }             
                    }
                    if(!lstContact.isEmpty()){
                        //gen.writeStartObject();
                        if(string.isNotBlank(lstContact[0].name))
                            gen.writeObjectField('BusinessOwner',lstContact[0].name);
                        else
                            gen.writeObjectField('BusinessOwner','');
                        if(string.isNotBlank(lstContact[0].email))
                            gen.writeObjectField('Email',lstContact[0].email);
                        else
                            gen.writeObjectField('Email','');
                        //gen.writeEndObject();
                    }
                    gen.writeFieldName('AccountContactRelations');
                    gen.writeStartArray();
                    for(accountcontactrelation acr : lstACR){
                        if(acr !=null){
                            gen.writeStartObject();                
                            if(string.isNotBlank(acr.Roles))
                                gen.writeObjectField('Role',acr.roles);
                            else
                                gen.writeObjectField('Role','');
                            if(string.isNotBlank(acr.contactid))
                                gen.writeObjectField('ContactId',acr.contactid);
                            else
                                gen.writeObjectField('ContactId','');
                            if(string.isNotBlank(acr.accountid))
                                gen.writeObjectField('AccountId',acr.accountid);
                            else
                                gen.writeObjectField('AccountId','');
                            
                            gen.writeEndObject();
                        }
                    }
                    gen.writeEndArray();                                        
                    gen.writeFieldName('BusinessProfiles');
                    gen.writeStartArray();
                    for(BusinessProfile bp : lstBP){
                        gen.writeStartObject();                
                        if(string.isNotBlank(bp.BusinessOperatingName))
                            gen.writeObjectField('BusinessOperatingName',bp.BusinessOperatingName);
                        else
                            gen.writeObjectField('BusinessOperatingName','');
                        if(string.isNotBlank(bp.BusinessStructure))
                            gen.writeObjectField('BusinessStructure',bp.BusinessStructure);
                        else
                            gen.writeObjectField('BusinessStructure','');
                        if(string.isNotBlank(bp.BusinessTaxIdentifier))
                            gen.writeObjectField('BusinessTaxIdentifier',bp.BusinessTaxIdentifier);
                        else
                            gen.writeObjectField('BusinessTaxIdentifier','');
                        gen.writeEndObject();
                    }
                    gen.writeEndArray();
                    gen.writeEndObject();
                    outputJson = gen.getAsString();                        
                }
            }
        }catch(Exception e){
            system.debug('Inside Exception' + e.getMessage());
            throw e;
        }
        system.debug('outputJson++'+outputJson);
        return outputJson;
    }
    public static String getAccountId(){
        Id businessRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Business_Account').getRecordTypeId();
        String outputJson = '';
        try{
            system.debug('User Id from DMVBUsiness Details ' + UserInfo.GetUserId());
            List<Account> lstAccount = [Select id,name,(select id,BusinessOperatingName,BusinessStructure,BusinessTaxIdentifier from BusinessProfiles order by LastModifiedDate DESC LIMIT 1) from Account where RecordTypeId =:businessRecordTypeId and OwnerId=:UserInfo.GetUserId()];
            JSONGenerator gen = JSON.createGenerator(true);
            gen.writeStartArray();
            for(Account acc :lstAccount){
                gen.writeStartObject(); 
                gen.writeObjectField('AccountId', acc.Id);
                if(acc.BusinessProfiles !=null && !acc.BusinessProfiles.isEmpty()){
                    if(string.isNotBlank(acc.BusinessProfiles.get(0).BusinessOperatingName))
                        gen.writeObjectField('BusinessOperatingName',acc.BusinessProfiles.get(0).BusinessOperatingName);
                    else
                        gen.writeObjectField('BusinessOperatingName','');
                    if(string.isNotBlank(acc.BusinessProfiles.get(0).BusinessStructure))
                        gen.writeObjectField('BusinessStructure',acc.BusinessProfiles.get(0).BusinessStructure);
                    else
                        gen.writeObjectField('BusinessStructure','');
                    if(string.isNotBlank(acc.BusinessProfiles.get(0).BusinessTaxIdentifier))
                        gen.writeObjectField('BusinessTaxIdentifier',acc.BusinessProfiles.get(0).BusinessTaxIdentifier);
                    else
                        gen.writeObjectField('BusinessTaxIdentifier','');
                    if(string.isNotBlank(acc.name))
                        gen.writeObjectField('Name',acc.name);
                    else
                        gen.writeObjectField('Name','');
                    /*gen.writeFieldName('BusinessProfiles');
                    gen.writeStartArray();
                    for(BusinessProfile bp : acc.BusinessProfiles){
                        gen.writeStartObject();                
                        if(string.isNotBlank(bp.BusinessOperatingName))
                            gen.writeObjectField('BusinessOperatingName',bp.BusinessOperatingName);
                        else
                            gen.writeObjectField('BusinessOperatingName','');
                        if(string.isNotBlank(bp.BusinessStructure))
                            gen.writeObjectField('BusinessStructure',bp.BusinessStructure);
                        else
                            gen.writeObjectField('BusinessStructure','');
                        if(string.isNotBlank(bp.BusinessTaxIdentifier))
                            gen.writeObjectField('BusinessTaxIdentifier',bp.BusinessTaxIdentifier);
                        else
                            gen.writeObjectField('BusinessTaxIdentifier','');
                        gen.writeEndObject();
                    }
                    gen.writeEndArray();
                    */
                }
                gen.writeEndObject();
            }
            gen.writeEndArray();
            outputJson = gen.getAsString();
        }catch(Exception ex){
            system.debug('Inside Exception' + ex.getMessage());
        }
        return outputJson;
    }
    public static String getBusnessLicenceApplication(Map<String,Object> accountId){
        String outputJson = '';
        JSONGenerator gen = JSON.createGenerator(true);
        try{
            List<BusinessLicenseApplication> lstBLA = [Select id,AccountId,Name,Account.name,LicenseType.Name,LicensePermitName.Name from BusinessLicenseApplication where AccountId =: String.valueOf(accountId.get('accountId'))];
            gen.writeStartArray();
            for(BusinessLicenseApplication BLA :lstBLA){
                gen.writeStartObject();
                    if(string.isNotBlank(BLA.Id))
                        gen.writeObjectField('Id',BLA.Id);
                    else
                        gen.writeObjectField('Id','');
                        
                    if(string.isNotBlank(BLA.Account.Name))
                        gen.writeObjectField('AccountName',BLA.Account.Name);
                    else
                        gen.writeObjectField('AccountName','');
                        
                    if(string.isNotBlank(BLA.LicenseType.Name))
                        gen.writeObjectField('LicenseType',BLA.LicenseType.Name);
                    else
                        gen.writeObjectField('LicenseType','');
                        
                    if(string.isNotBlank(BLA.Name))
                        gen.writeObjectField('Name',BLA.Name);
                    else
                        gen.writeObjectField('Name','');
                        
                    if(string.isNotBlank(BLA.LicensePermitName.Name))
                        gen.writeObjectField('LicensePermitName',BLA.LicensePermitName.Name);
                    else
                        gen.writeObjectField('LicensePermitName','');
                        
                    
                        
                gen.writeEndObject();
            }
            gen.writeEndArray();
            outputJson = gen.getAsString();
        }catch(Exception ex){
            system.debug('Inside Exception' + ex.getMessage());
        }
        return outputJson;
    }
    
    public static String getCheckoutDetails(Map<String,Object> accountId){
        String outputJson = '';
        // JSONGenerator gen = JSON.createGenerator(true);
        // try{
        //     List<Checkout__c> lstCheckout = [Select id,Account__c,Name,CreatedBy.Name,Payment_Amount__c,Status__c, Total_Amount__c,CreatedDate from Checkout__c where Account__c =: String.valueOf(accountId.get('accountId'))];
        //     gen.writeStartArray();
        //     for(Checkout__c checkout :lstCheckout){
        //         gen.writeStartObject();
        //             if(string.isNotBlank(checkout.Id))
        //                 gen.writeObjectField('Id',checkout.Id);
        //             else
        //                 gen.writeObjectField('Id','');
                        
        //             if(string.isNotBlank(checkout.Name))
        //                 gen.writeObjectField('Name',checkout.Name);
        //             else
        //                 gen.writeObjectField('Name','');
                        
        //             if(string.isNotBlank(checkout.CreatedBy.Name))
        //                 gen.writeObjectField('CreatedByName',checkout.CreatedBy.Name);
        //             else
        //                 gen.writeObjectField('CreatedByName','');
                        
        //             if(string.isNotBlank(checkout.Status__c))
        //                 gen.writeObjectField('Status',checkout.Status__c);
        //             else
        //                 gen.writeObjectField('Status','');
                        
        //             if(checkout.Total_Amount__c!= null)
        //                 gen.writeObjectField('TotalAmount',checkout.Total_Amount__c);
        //             else
        //                 gen.writeObjectField('TotalAmount','');
                        
        //             if(checkout.CreatedDate !=null)
        //                 gen.writeObjectField('CreatedDate',checkout.CreatedDate);
        //             else
        //                 gen.writeObjectField('CreatedDate','');
                        
        //         gen.writeEndObject();
        //     }
        //     gen.writeEndArray();
        //     outputJson = gen.getAsString();
        // }catch(Exception ex){
        //     system.debug('Inside Exception' + ex.getMessage());
        // }
        return outputJson;
    }
    
    public static String getBLARegulatoryTFee(Map<String,Object> accountId){
        String outputJson = '';
        // JSONGenerator gen = JSON.createGenerator(true);
        // try{
        //     List<BusinessLicenseApplication> lstBLA = [Select id,AccountId,Name,Account.name,LicenseType.Name,(Select id,CreatedDate,CreatedBy.Name,Status,TotalFeeAmount,Checkout__c from RegulatoryTrxnFees) from BusinessLicenseApplication where AccountId =: String.valueOf(accountId.get('accountId'))];
        //     gen.writeStartArray();
        //     for(BusinessLicenseApplication BLA :lstBLA){
        //         gen.writeStartObject();
        //             if(string.isNotBlank(BLA.Id))
        //                 gen.writeObjectField('Id',BLA.Id);
        //             else
        //                 gen.writeObjectField('Id','');
                        
        //             if(string.isNotBlank(BLA.Name))
        //                 gen.writeObjectField('Name',BLA.Name);
        //             else
        //                 gen.writeObjectField('Name','');
                    
        //             if(!BLA.RegulatoryTrxnFees.isEmpty()){
        //                 gen.writeFieldName('Regulatory Transaction Fee');
        //                 gen.writeStartArray();    
        //                 for(RegulatoryTrxnFee RTrxnFee : BLA.RegulatoryTrxnFees){
        //                     gen.writeStartObject();
        //                         if(string.isNotBlank(RTrxnFee.Id))
        //                             gen.writeObjectField('Id',RTrxnFee.Id);
        //                         else
        //                             gen.writeObjectField('Id','');
                                    
        //                         if(RTrxnFee.CreatedDate !=null)
        //                             gen.writeObjectField('CreatedDate',RTrxnFee.CreatedDate);
        //                         else
        //                             gen.writeObjectField('CreatedDate','');
                                    
        //                         if(string.isNotBlank(RTrxnFee.CreatedBy.Name))
        //                             gen.writeObjectField('CreatedByName',RTrxnFee.CreatedBy.Name);
        //                         else
        //                             gen.writeObjectField('CreatedByName','');
                                    
        //                         if(string.isNotBlank(RTrxnFee.Status))
        //                             gen.writeObjectField('Status',RTrxnFee.Status);
        //                         else
        //                             gen.writeObjectField('Status','');
                                    
        //                         if(RTrxnFee.TotalFeeAmount !=null)
        //                             gen.writeObjectField('TotalFeeAmount',RTrxnFee.TotalFeeAmount);
        //                         else
        //                             gen.writeObjectField('TotalFeeAmount','');
                                
        //                         if(string.isNotBlank(RTrxnFee.Checkout__c ))
        //                             gen.writeObjectField('CheckoutId',RTrxnFee.Checkout__c );
        //                         else
        //                             gen.writeObjectField('CheckoutId','');
                                        
        //                     gen.writeEndObject();
        //                 }
        //                 gen.writeEndArray();
        //             }
                    
        //         gen.writeEndObject();
        //     }
        //     gen.writeEndArray();
        //     outputJson = gen.getAsString();
        // }catch(Exception ex){
        //     system.debug('Inside Exception' + ex.getMessage()+'  Line No'+ex.getLineNumber());
        // }
        return outputJson;
    }
    
    public static String getIndividualLicenceApplication(Map<String,Object> accountId){
        String outputJson = '';
        JSONGenerator gen = JSON.createGenerator(true);
        try{
            List<IndividualApplication> lstILA = [Select id,AccountId,Name,Account.name,LicenseType.Name from IndividualApplication where AccountId =: String.valueOf(accountId.get('accountId'))];
            gen.writeStartArray();
            for(IndividualApplication ILA :lstILA){
                gen.writeStartObject();
                    if(string.isNotBlank(ILA.Id))
                        gen.writeObjectField('Id',ILA.Id);
                    else
                        gen.writeObjectField('Id','');
                        
                    if(string.isNotBlank(ILA.Account.Name))
                        gen.writeObjectField('AccountName',ILA.Account.Name);
                    else
                        gen.writeObjectField('AccountName','');
                    if(string.isNotBlank(ILA.LicenseType.Name))
                        gen.writeObjectField('LicenseType',ILA.LicenseType.Name);
                    else
                        gen.writeObjectField('LicenseType','');
                    if(string.isNotBlank(ILA.Name))
                        gen.writeObjectField('Name',ILA.Name);
                    else
                        gen.writeObjectField('Name','');
                        
                gen.writeEndObject();
            }
            gen.writeEndArray();
            outputJson = gen.getAsString();
        }catch(Exception ex){
            system.debug('Inside Exception' + ex.getMessage());
        }
        return outputJson;
    }
    
    //Added by Shubham to get Inspection Visit details
    public static String getVisit (Map<String,Object> blaId){
        String outputJson = '';
        JSONGenerator gen = JSON.createGenerator(true);
        try{
            List<Visit> lstSA = [Select id,ContextId,PlaceId,Place.Name,PlannedVisitStartTime from Visit where ContextId =: String.valueOf(blaId.get('blaId'))];
            gen.writeStartArray();
            for(Visit SA :lstSA){
                gen.writeStartObject();
                    if(string.isNotBlank(SA.Id))
                        gen.writeObjectField('Id',SA.Id);
                    else
                        gen.writeObjectField('Id','');
                    
                    if(string.isNotBlank(SA.Place.Name))
                        gen.writeObjectField('Place',SA.Place.Name);
                    else
                        gen.writeObjectField('Place','');
                        
                    if(SA.PlannedVisitStartTime != null)
                        gen.writeObjectField('StartDateTime',SA.PlannedVisitStartTime );
                    else
                        gen.writeObjectField('StartDateTime','');
                        
                 gen.writeEndObject();
            }
            gen.writeEndArray();
            outputJson = gen.getAsString();
        }catch(Exception ex){
            system.debug('Inside Exception' + ex.getMessage());
        }
        return outputJson;
    }
    
    //Added by shahzad for SCDP-28
     public static String getCheckoutRelatedDetails(Map<String,Object> checkoutId){
        String outputJson = '';
        // JSONGenerator gen = JSON.createGenerator(true);
        // try{
        //     List<Checkout__c> checkout = [Select id,Account__c,Name,CreatedBy.Name,Payment_Amount__c,Status__c, Total_Amount__c,CreatedDate from Checkout__c where Id =: String.valueOf(checkoutId.get('checkoutId'))];
        //     List<RegulatoryTrxnFee> lstTrxnFee = [Select id,ParentRecordId,ParentRecord.Name,TotalFeeAmount,Checkout__c from RegulatoryTrxnFee where Checkout__c =: String.valueOf(checkoutId.get('checkoutId'))];
        //     List<Payment__c> lstpayments = [Select id,Checkout__c,Confirmation_Number__c, Status__c, Payment_Method__c, Card_Type__c, Last_4_Digits__c, Amount__c from Payment__c where Checkout__c =: String.valueOf(checkoutId.get('checkoutId'))];
        //     gen.writeStartObject();
        //     if(!checkout.isEmpty()){
                
        //             if(string.isNotBlank(checkout.get(0).Id))
        //                 gen.writeObjectField('Id',checkout.get(0).Id);
        //             else
        //                 gen.writeObjectField('Id','');
                        
        //             if(string.isNotBlank(checkout.get(0).Name))
        //                 gen.writeObjectField('Name',checkout.get(0).Name);
        //             else
        //                 gen.writeObjectField('Name','');
                        
        //             if(string.isNotBlank(checkout.get(0).CreatedBy.Name))
        //                 gen.writeObjectField('CreatedByName',checkout.get(0).CreatedBy.Name);
        //             else
        //                 gen.writeObjectField('CreatedByName','');
                        
        //             if(string.isNotBlank(checkout.get(0).Status__c))
        //                 gen.writeObjectField('Status',checkout.get(0).Status__c);
        //             else
        //                 gen.writeObjectField('Status','');
                        
        //             if(checkout.get(0).Total_Amount__c!= null)
        //                 gen.writeObjectField('TotalAmount',checkout.get(0).Total_Amount__c);
        //             else
        //                 gen.writeObjectField('TotalAmount','');
                        
        //             if(checkout.get(0).CreatedDate !=null)
        //                 gen.writeObjectField('CreatedDate',checkout.get(0).CreatedDate);
        //             else
        //                 gen.writeObjectField('CreatedDate','');   
               
        //     }
        //     if(!lstTrxnFee.isEmpty()){
        //         gen.writeFieldName('RegulatoryTransactionFee');
        //         gen.writeStartArray();
        //         for(RegulatoryTrxnFee RTrxnFee : lstTrxnFee){
        //             gen.writeStartObject();
        //                 if(string.isNotBlank(RTrxnFee.Id))
        //                     gen.writeObjectField('Id',RTrxnFee.Id);
        //                 else
        //                     gen.writeObjectField('Id','');
                            
        //                 if(string.isNotBlank(RTrxnFee.ParentRecordId))
        //                     gen.writeObjectField('ParentRecordId',RTrxnFee.ParentRecordId);
        //                 else
        //                     gen.writeObjectField('ParentRecordId','');

        //                 if(string.isNotBlank(RTrxnFee.ParentRecord.Name))
        //                     gen.writeObjectField('ParentRecordName',RTrxnFee.ParentRecord.Name);
        //                 else
        //                     gen.writeObjectField('ParentRecordName','');

        //                 if(RTrxnFee.TotalFeeAmount !=null)
        //                     gen.writeObjectField('TotalFeeAmount',RTrxnFee.TotalFeeAmount);
        //                 else
        //                     gen.writeObjectField('TotalFeeAmount','');
                        
                                
        //             gen.writeEndObject();
        //         }
        //         gen.writeEndArray(); 
        //     }
        //     if(!lstpayments.isEmpty()){
        //         gen.writeFieldName('Payments');
        //         gen.writeStartArray();
        //         for(Payment__c payment : lstpayments){
        //             gen.writeStartObject();
        //                 if(string.isNotBlank(payment.Id))
        //                     gen.writeObjectField('Id',payment.Id);
        //                 else
        //                     gen.writeObjectField('Id','');
                            
        //                 if(string.isNotBlank(payment.Confirmation_Number__c))
        //                     gen.writeObjectField('ConfirmationNumber',payment.Confirmation_Number__c);
        //                 else
        //                     gen.writeObjectField('ConfirmationNumber','');

        //                 if(string.isNotBlank(payment.Status__c))
        //                     gen.writeObjectField('Status',payment.Status__c);
        //                 else
        //                     gen.writeObjectField('Status','');

        //                 if(string.isNotBlank(payment.Payment_Method__c))
        //                     gen.writeObjectField('PaymentMethod',payment.Payment_Method__c);
        //                 else
        //                     gen.writeObjectField('PaymentMethod','');

        //                 if(string.isNotBlank(payment.Card_Type__c))
        //                     gen.writeObjectField('CardType',payment.Card_Type__c);
        //                 else
        //                     gen.writeObjectField('CardType','');

        //                 if(string.isNotBlank(payment.Last_4_Digits__c))
        //                     gen.writeObjectField('Last4Digits',payment.Last_4_Digits__c);
        //                 else
        //                     gen.writeObjectField('Last4Digits','');

        //                 if(payment.Amount__c !=null)
        //                     gen.writeObjectField('Amount',payment.Amount__c);
        //                 else
        //                     gen.writeObjectField('Amount','');
                        
                                
        //             gen.writeEndObject();
        //         }
        //         gen.writeEndArray(); 
        //     }
        //     gen.writeEndObject();
        //     outputJson = gen.getAsString();
        // }catch(Exception ex){
        //     system.debug('Inside Exception' + ex.getMessage());
        // }
        return outputJson;
    }
    
     public static String getPersonAccountId(){
        String outputJson = '';
        try{
            system.debug('User Id from DMVBUsiness Details ' + UserInfo.GetUserId());
            List<user> lstUser = [select id,contactid from user where id =: userinfo.getUserId()];
            List<contact> lstContact = [select id,AccountId,name,email from contact where id =: lstUser[0].contactid];
            
            JSONGenerator gen = JSON.createGenerator(true);

            if(!lstContact.isEmpty()){
                gen.writeStartObject(); 
                gen.writeObjectField('AccountId', lstContact[0].AccountId); 
                gen.writeEndObject();
            }
            
            outputJson = gen.getAsString();
        }catch(Exception ex){
            system.debug('Inside Exception' + ex.getMessage());
        }
        return outputJson;
    }
    
    public static String getPersonExamDetails(Map<String,Object> blaId){
         String outputJson = '';
        // try{
        //     List<PersonExamination> personExam = [select id,ExaminationId,Name, ContactId, Contact.Account.DriversLicenseNumber__c,Business_License_Application__c from PersonExamination where Business_License_Application__c =: String.valueOf(blaId.get('blaId'))];
        //     JSONGenerator gen = JSON.createGenerator(true);

        //     if(!personExam.isEmpty()){
        //         gen.writeStartObject();
        //             if(string.isNotBlank(personExam.get(0).Id))
        //                     gen.writeObjectField('Id',personExam.get(0).Id);
        //             else
        //                 gen.writeObjectField('Id','');
                        
        //             if(string.isNotBlank(personExam.get(0).ExaminationId))
        //                     gen.writeObjectField('ExaminationId',personExam.get(0).ExaminationId);
        //             else
        //                 gen.writeObjectField('ExaminationId','');
                        
        //              if(string.isNotBlank(personExam.get(0).Contact.Account.DriversLicenseNumber__c))
        //                     gen.writeObjectField('DriversLicenseNumber',personExam.get(0).Contact.Account.DriversLicenseNumber__c);
        //             else
        //                 gen.writeObjectField('DriversLicenseNumber','');
                         
        //         gen.writeEndObject();
        //     }
            
        //     outputJson = gen.getAsString();
        // }catch(Exception ex){
        //     system.debug('Inside Exception' + ex.getMessage());
        // }
        return outputJson;
    }
    
    //Added by Shahzad to get Regulatorytrxn fee of BLA
    public static String getRegulatoryTrnxFee(Map<String,Object> blaId){
        String outputJson = '';
        JSONGenerator gen = JSON.createGenerator(true);
        try{
            List<RegulatoryTrxnFee> lstRegTrnxFee = [Select id,ParentRecordId from RegulatoryTrxnFee where ParentRecordId =: String.valueOf(blaId.get('blaId')) order by createdDate DESC];
            if(!lstRegTrnxFee.isEmpty()){
                gen.writeStartArray();
                for(RegulatoryTrxnFee RtrnxFee: lstRegTrnxFee){
                    gen.writeStartObject();
                        if(string.isNotBlank(RtrnxFee.Id))
                            gen.writeObjectField('Id',RtrnxFee.Id);
                        else
                            gen.writeObjectField('Id','');
                                 
                     gen.writeEndObject();
                }
                gen.writeEndArray();
            }
            outputJson = gen.getAsString();
        }catch(Exception ex){
            system.debug('Inside Exception' + ex.getMessage());
        }
        return outputJson;
    }
    
    public static String getServiceAppointment(Map<String,Object> blaId){
        String outputJson = '';
        // JSONGenerator gen = JSON.createGenerator(true);
        // try{
        //     List<ServiceAppointment> lstSA = [Select id,Scheduled_Start_Time__c,SchedStartTime,Business_License_Application__c from ServiceAppointment where Business_License_Application__c =: String.valueOf(blaId.get('blaId'))];
        //     gen.writeStartArray();
        //     for(ServiceAppointment SA :lstSA){
        //         gen.writeStartObject();
        //             if(string.isNotBlank(SA.Id))
        //                 gen.writeObjectField('Id',SA.Id);
        //             else
        //                 gen.writeObjectField('Id','');
                        
        //             if(SA.Scheduled_Start_Time__c != null)
        //                 gen.writeObjectField('StartTime',SA.Scheduled_Start_Time__c);
        //             else
        //                 gen.writeObjectField('StartTime','');
                        
        //             if(SA.SchedStartTime != null)
        //                 gen.writeObjectField('Date',SA.SchedStartTime);
        //             else
        //                 gen.writeObjectField('Date','');
                    
                        
        //         gen.writeEndObject();
        //     }
        //     gen.writeEndArray();
        //     outputJson = gen.getAsString();
        // }catch(Exception ex){
        //     system.debug('Inside Exception' + ex.getMessage());
        // }
        return outputJson;
    }
    // Public static CADXP_LightningResponse errorLoggingLWCAura(String message,String device,String source,String componentName,String method,String stack){
    //     CADXP_LightningResponse resultMap = new CADXP_LightningResponse();
    //     try{
    //         String LogId = CADXP_CreateErrorLog_Exception.logApplicationErrorLWCAura(message,device,source,componentName,method,stack);
    //         System.debug('LogId--'+LogId);
    //         resultMap.put('ERROR',LogId);
    //         return resultMap;
    //     }
    //     catch(Exception ex){
    //         String LogId = CADXP_CreateErrorLog_Exception.logApplicationError(ex);
    //         System.debug('LogId Catch--'+LogId);
    //         resultMap.put('ERROR',LogId);
    //         return resultMap;
    //     }
    // }
    public static String getPersonExamination(Map<String,Object> blaId){
        String outputJson = '';
        // JSONGenerator gen = JSON.createGenerator(true);
        // try{
        //     List<PersonExamination> lstSA = [Select Id,Exam_Taken_Flag__c,Exam_Date__c,Exam_Type__c,Result,Exam_Status__c From PersonExamination where Business_License_Application__c =: String.valueOf(blaId.get('blaId'))];
        //     gen.writeStartArray();
        //     for(PersonExamination SA :lstSA){
        //         gen.writeStartObject();
        //             if(string.isNotBlank(SA.Id))
        //                 gen.writeObjectField('Id',SA.Id);
        //             else
        //                 gen.writeObjectField('Id','');
                        
        //             if(SA.Exam_Taken_Flag__c!= null)
        //                 gen.writeObjectField('Exam_Taken_Flag__c',SA.Exam_Taken_Flag__c);
        //             else
        //                 gen.writeObjectField('Exam_Taken_Flag__c','');
                        
        //             if(SA.Exam_Date__c!= null)
        //                 gen.writeObjectField('Exam_Date__c',SA.Exam_Date__c);
        //             else
        //                 gen.writeObjectField('Exam_Date__c','');
                        
        //             if(SA.Exam_Type__c!= null)
        //                 gen.writeObjectField('Exam_Type__c',SA.Exam_Type__c);
        //             else
        //                 gen.writeObjectField('Exam_Type__c','');
                        
        //             if(SA.Result!= null)
        //                 gen.writeObjectField('Result',SA.Result);
        //             else
        //                 gen.writeObjectField('Result','');
                        
        //             if(SA.Exam_Status__c != null)
        //                 gen.writeObjectField('Exam_Status__c',SA.Exam_Status__c );
        //             else
        //                 gen.writeObjectField('Exam_Status__c','');
                    
                        
        //         gen.writeEndObject();
        //     }
        //     gen.writeEndArray();
        //     outputJson = gen.getAsString();
        // }catch(Exception ex){
        //     system.debug('Inside Exception' + ex.getMessage());
        // }
        return outputJson;
    }
}