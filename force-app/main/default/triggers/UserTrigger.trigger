trigger UserTrigger on User (after insert, after update) {

  CADMV_UserTriggerHandler userTriggerHandler = New CADMV_UserTriggerHandler();
    CADMV_TriggerDispatcher.Run(new CADMV_UserTriggerHandler());
}