public with sharing class CADMV_UserTriggerHelper {
	
    public static final String ACTION_PLAN_PERMISSION_SET_NAME = 'ActionPlans';
    
 	public static void updateUserinfoToContact(Set<id> userIdSet){
 
		CADMV_UpdateContactInfoFromUserQueueable contactUpdate = new CADMV_UpdateContactInfoFromUserQueueable(userIdSet);
    	system.enqueueJob(contactUpdate);
     
	}

/**
   * @description On insert and update of Community User Types, check the ActionPlan permission set is assigned to the user record
   * 			  else assign the ActionPlan permissionset.
   * @author Nathan Shilling(Deloitte) | 06/23/2021
   * @param userIdSet Set of user records that were inserted or updated
   * @return void
   **/    
    public static void updateUserPermissionSet(Set<id> userIdSet){
    	ID actionPlanPermissionSetId = [SELECT Id FROM PermissionSet WHERE Name =: ACTION_PLAN_PERMISSION_SET_NAME].Id;

        Map<ID,ID> mapUserPermissionSet = new Map<ID,ID>();
        List<ID> lstUserIds = new List<ID>();
        
        for(PermissionSetAssignment psa : [SELECT PermissionSetId, AssigneeId FROM PermissionSetAssignment 
                                           		WHERE PermissionSetId =: actionPlanPermissionSetId
                                          		AND AssigneeId in: userIdSet]){
        	mapUserPermissionSet.put(psa.AssigneeId,psa.PermissionSetId);
        }
        for(ID userId : userIdSet){
            if(mapUserPermissionSet.get(userId) == null)
                lstUserIds.add(userId);
        }
        
        if(!lstUserIds.isEmpty() )
            CADMV_UserTriggerHelper.createPermissionSet(actionPlanPermissionSetId, lstUserIds);
    }    

/**
   * @description On insert and update of Community User Types, using @future to prevent mixed DML error on User object
   * @author Nathan Shilling(Deloitte) | 06/23/2021
   * @param permissionSetId ID of the particular permissionSet to assign
   * @param lstUserId List<ID> of the users to assign
   * @return void
   **/     
    @future
    public static void createPermissionSet(ID permissionSetId, List<ID> lstUserId) {

        List<PermissionSetAssignment> lstRecords = new List<PermissionSetAssignment>();
        for(ID id : lstUserId)
            lstRecords.add( new PermissionSetAssignment(PermissionSetId = permissionSetId, AssigneeId = id));
        insert lstRecords;    

    }
      
}