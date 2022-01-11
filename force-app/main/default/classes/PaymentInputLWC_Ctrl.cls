public without sharing class PaymentInputLWC_Ctrl {
    
    @AuraEnabled(cacheable=true)
    public static PaymentDataWrapper completeData(String recordId){
        PaymentDataWrapper paymentData = new PaymentDataWrapper();
        paymentData.firstName = '';
        paymentData.lastName = '';
        paymentData.phoneValue = '';
        paymentData.emailValue = '';
        paymentData.amountValue = 0.0;
        paymentData.invoiceValue = 0.0;
        /* Uncomment below after putting the correct api Name of the object and the fields */
        
        /*Custom_Object__c customObjRecord = [Select Id, Contact.FirstName, Contact.LastName, Contact.Email, Contact.Phone, Ammount__c, Invoive_value__c from Custom_Object__c where Id=:recordId];
        dummyData.firstName = customObjRecord.Contact.FirstName;
        dummyData.lastName = customObjRecord.Contact.LastName;
        dummyData.phoneValue = customObjRecord.Contact.Email;
        dummyData.emailValue = customObjRecord.Contact.Phone;
        dummyData.amountValue = customObjRecord.Ammount__c;
        dummyData.invoiceValue = customObjRecord.Invoive_value__c;*/
        return paymentData;
    }
    
    public class PaymentDataWrapper {
        @AuraEnabled
        public String firstName  {get;set;}
        @AuraEnabled
        public String lastName  {get;set;}
        @AuraEnabled
        public String phoneValue  {get;set;}
        @AuraEnabled
        public String emailValue  {get;set;}
        @AuraEnabled
        public Double amountValue  {get;set;}
        @AuraEnabled
        public Double invoiceValue {get;set;}
    }

}