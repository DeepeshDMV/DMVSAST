public with sharing class CADMV_TriggerUtill {

  
   private Static Set<Id> recordIdset = new Set<Id>();

   public static boolean isRecordIdExist(Id recordId){
       boolean isExist = false;
        if(recordIdset.contains(recordId)){
            isExist = true;
        }else{
          recordIdset.add(recordId);
        }
        return isExist;
   }
}