trigger CADMV_ContentDocumentLink on ContentDocumentLink (before insert,before update, before delete,after insert,after update, after delete, after Undelete) {
    public static boolean runonce = false;
    if(Trigger.isBefore &&Trigger.isInsert && runonce == false) {
        runonce= true;
        CADMV_ContentDocumentLinkHandler.beforeInsert(trigger.new);        
    }
    if(Trigger.isAfter &&Trigger.isInsert && runonce == false) {
        runonce= true;
        CADMV_ContentDocumentLinkHandler.afterInsert(Trigger.newMap);        
    } 
        
    if(Trigger.isBefore &&Trigger.isUpdate && runonce == false) {
        runonce= true;
        CADMV_ContentDocumentLinkHandler.beforeUpdate(Trigger.newMap,Trigger.oldMap);        
    }
    if(Trigger.isAfter &&Trigger.isUpdate && runonce == false) {
        runonce= true;
        CADMV_ContentDocumentLinkHandler.afterUpdate(Trigger.newMap,Trigger.oldMap);       
    } 
    
    if(Trigger.isBefore &&Trigger.isDelete && runonce == false) {
        runonce= true;
        CADMV_ContentDocumentLinkHandler.beforeDelete(Trigger.oldMap);        
    }
    if(Trigger.isAfter &&Trigger.isDelete && runonce == false) {
        runonce= true;
        CADMV_ContentDocumentLinkHandler.afterDelete(Trigger.oldMap);       
    } 

    if(Trigger.isAfter &&Trigger.isunDelete && runonce == false) {
        runonce= true;
        CADMV_ContentDocumentLinkHandler.afterunDelete(Trigger.oldMap);       
    } 
}