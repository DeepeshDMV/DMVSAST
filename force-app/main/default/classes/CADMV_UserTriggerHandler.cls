/*
*@name          CADMV_UserTriggerHandler 
*@author        Vijayakumar Pethanan (Deloitte)
*@date          05/25/2021
*@description   This class handle User object trigger
*@Class         CADMV_UserTriggerHandler
Modification    Log:
------------------------------------------------------------------------------------
Developer                          Date         Description
------------------------------------------------------------------------------------
Vijayakumar Pethanan (Deloitte)     05/25/2021   Initial Implementation.
*/
public with sharing class CADMV_UserTriggerHandler implements CADMV_ITriggerHandler {
    
    public static final String COMMUNITY_USER_TYPE = 'PowerCustomerSuccess';
    
/**
   * @description Method to handle before insert trigger traffic
   * @author Vijayakumar Pethanan(Deloitte) | 10/08/2020
   * @param lstNewExposures List of new records
   * @return void
   **/
  public
  void beforeInsert(List<SObject> lstNewExposures) {

  }
  public
  Boolean isDisabled() {
    return false;
  }
 
  

  /**
   * @description Method to handle before update trigger traffic
   * @author Vijayakumar Pethanan(Deloitte) | 10/08/2020
   * @param newItems Map of new records
   * @param oldItems Map of old records
   * @return void
   **/
  public
  void beforeUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {
  }

  /**
   * @description Method to handle before delete trigger traffic
   * @author Vijayakumar Pethanan(Deloitte) | 10/08/2020
   * @param oldItems Map of old records
   * @return void
   **/
  public
  void beforeDelete(Map<Id, SObject> oldItems) {
  }

  /**
   * @description Method to handle after insert trigger traffic
   * @author Vijayakumar Pethanan(Deloitte) | 10/08/2020
   * @param newItems Map of new records
   * @return void
   **/
  public
  void afterInsert(Map<Id, SObject> newItems) {
        Set<id> communityUserIdSet = new Set<id>();
        
         for(Object user:newItems.values()){ 
            if(((User)user).UserType == COMMUNITY_USER_TYPE){
              communityUserIdSet.add(((User)user).Id);
            }
        }
        if(communityUserIdSet.isEmpty() == false){
            CADMV_UserTriggerHelper.updateUserPermissionSet(communityUserIdSet);
        }         
  }

  /**
   * @description Method to handle after update trigger traffic
   * @author Vijayakumar Pethanan(Deloitte) | 10/08/2020
   * @param newItems Map of new records
   * @param oldItems Map of old records
   * @return void
   **/
  public
  void afterUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {
        Set<id> userIdSet = new Set<id>();
        
         for(Id userId:newItems.keyset()){ 
            if(!CADMV_TriggerUtill.isRecordIdExist(userId)){
              userIdSet.add(userId);
            }
        }
        if(userIdSet.isEmpty() == false){
            CADMV_UserTriggerHelper.updateUserinfoToContact(userIdSet);
        }

        Set<id> communityUserIdSet = new Set<id>();
        
         for(Object user:newItems.values()){ 
            if(((User)user).UserType == COMMUNITY_USER_TYPE){
              communityUserIdSet.add(((User)user).Id);
            }
        }
        if(communityUserIdSet.isEmpty() == false){
            CADMV_UserTriggerHelper.updateUserPermissionSet(communityUserIdSet);
        }      
  }
  /**
   * @description Method to handle after delete trigger traffic
   * @author Vijayakumar Pethanan(Deloitte) | 10/08/2020
   * @param oldItems Map of old records
   * @return void
   **/
  public
  void afterDelete(Map<Id, SObject> oldItems) {
  }

  /**
   * @description Method to handle after undelete trigger traffic
   * @author Vijayakumar Pethanan(Deloitte) | 10/08/2020
   * @param oldItems Map of old records
   * @return void
   **/
  public
  void afterUndelete(Map<Id, SObject> oldItems) {
  }
  
 

}