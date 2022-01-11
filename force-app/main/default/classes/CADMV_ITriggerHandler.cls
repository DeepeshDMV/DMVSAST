/**
*@name          CADMV_ITriggerHandler 
*@author        Vijayakumar Pethanan (Deloitte)
*@date          05/25/2021
*@description   The Interface of the Trigger Framework which dictactes which method every trigger handler must implement.
*@Class         CADMV_ITriggerHandler
Modification    Log:
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
Vijayakumar Pethanan (Deloitte)      05/25/2021  Initial Implementation.
*/
public interface CADMV_ITriggerHandler  {
    
    void BeforeInsert(List<SObject> lstnewItems);
 
    void BeforeUpdate(Map<Id, SObject> mapNewItems, Map<Id, SObject> mapOldItems);
 
    void BeforeDelete(Map<Id, SObject> mapOldItems);
 
    void AfterInsert(Map<Id, SObject> mapNewItems);
 
    void AfterUpdate(Map<Id, SObject> mapNewItems, Map<Id, SObject> mapOldItems);
 
    void AfterDelete(Map<Id, SObject> mapOldItems);
 
    void AfterUndelete(Map<Id, SObject> mapOldItems);
 
    Boolean IsDisabled();
}