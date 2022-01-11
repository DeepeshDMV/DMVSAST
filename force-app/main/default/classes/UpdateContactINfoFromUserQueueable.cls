public class UpdateContactINfoFromUserQueueable implements Queueable {

    public set<ID> userIdSet {get;set;}
    
    private UpdateContactINfoFromUserQueueable(){
        
    }
    
    public UpdateContactINfoFromUserQueueable(Set<Id> userIdSet){
        this.userIdSet = userIdSet;
    }
    
     /**
       *  Execute the process for Queuable
       */
      public void execute(QueueableContext context) {
         
        if(userIdSet.isEmpty() == false){
          //  checkSaraAlertCriteria(exposureChanges);
        }
          
      }
    
    public static void updateContactInfoFromUser(Set<id> userIdSet){
        List<Contact> contList = new List<Contact>();
        for(User usr:[select ContactId,Email,FirstName,LastName,Title
                    from User
                      where Id in :userIdSet]){
           
            if (usr.ContactId!=null) {
               Contact c = new Contact(Id=usr.ContactId,Email=usr.Email,
                                       FirstName=usr.FirstName,
                                       LastName=usr.LastName,
                                       Title=usr.Title);
                contList.add(c);        
            }
           
         }

        if(contList.isEmpty() == false){
            update contList;
        }       
    }
}