/*
* classname         : CADMV_LightningResponse
* @description      : This class is use to get the server information and send response information to LWC UI.
* @author           : Sukrut Nagarkar
* @date             :  05/10/2021
* MODIFICATION LOG  :
* DEVELOPER             DATE            DESCRIPTION
* ---------------------------------------------------------------------------------------------
* Sukrut Nagarkar        05/10/2021      Initial Version
*/
public with sharing class CADMV_LightningResponse {

    @AuraEnabled public Boolean bIsSuccess{get; set;}
    @AuraEnabled public Map<String, Object> mapResponse{get; set;}
    
    public CADMV_LightningResponse() {
        mapResponse = new Map<String, Object>();
    }
    
    /*
    * method        : put
    * @description  : This method is use to set mapResponse key value pair
    * @author       : Sukrut Nagarkar
    * @param        : String sKey       - use to set the Key, 
                      Object objValue   - use to set the value of any type
    * @return       : void
    * */
    public void put(String sKey, Object objValue) {
        mapResponse.put(sKey, objValue);
    }
    
    
}