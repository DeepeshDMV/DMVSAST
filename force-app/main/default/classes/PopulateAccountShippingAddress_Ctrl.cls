/**
 * @description       : 
 * @author            : Divya JC
 * @group             : 
 * @last modified on  : 6-9-2021
 * @last modified by  : 
 * Modifications Log 
 * Ver   Date         Author            Modification
 * 1.0   6-8-2021     Divya   Initial Version
**/
public without sharing class PopulateAccountShippingAddress_Ctrl {
    @AuraEnabled
    public static String getSiteAddress(String recordId){
        if(!String.isblank(recordId)){
			Account app = [Select Id,ShippingStreet,ShippingCity,ShippingState,ShippingPostalCode,ShippingCountry From Account where id = : recordId];
            return JSON.serialize(app);
        }
        return null;
    }
}