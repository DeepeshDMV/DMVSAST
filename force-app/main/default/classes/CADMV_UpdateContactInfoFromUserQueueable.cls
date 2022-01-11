public class CADMV_UpdateContactInfoFromUserQueueable implements Queueable {

    public set<ID> userIdSet {get;set;}
    
       
    public CADMV_UpdateContactInfoFromUserQueueable(Set<Id> userIdSet){
        this.userIdSet = userIdSet;
    }
    
     /**
       *  Execute the process for Queuable
       */
      public void execute(QueueableContext context) {
         
        if(userIdSet.isEmpty() == false){
          updateContactInfoFromUser(this.userIdSet);
        }
          
      }
    
    public static void updateContactInfoFromUser(Set<id> userIdSet){
       
        List<Contact> contactList = new List<Contact>();
        for(User usr:[SELECT
                     ContactId,Email,FirstName,LastName,Title,
                     MiddleName,Suffix,Street,City,State,PostalCode,Country,MobilePhone,Phone
                     FROM USER
                     WHERE
                     Id in :userIdSet]){
           
            if (usr.ContactId!=null) {
               Contact cont = new Contact(
                                       Id=usr.ContactId,Email=usr.Email,
                                       FirstName=usr.FirstName,
                                       LastName=usr.LastName,
                                       Title = usr.Title,
                                       MiddleName = usr.MiddleName,
                                       Suffix = usr.Suffix,
                                       MobilePhone = usr.MobilePhone,
                                       Phone = usr.Phone,
                                       MailingStreet = usr.Street,
                                       MailingCity = usr.City,
                                       MailingState = usr.State,
                                       MailingPostalCode = usr.PostalCode,
                                       MailingCountry = usr.Country
                                       );
                contactList.add(cont);    
                   
            }
           
         }

        if(contactList.isEmpty() == false){
           update contactList;
        }       
    }
}