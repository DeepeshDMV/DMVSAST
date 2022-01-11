global class CADMVBusAppController implements vlocity_ins.VlocityOpenInterface {
    
    public Boolean invokeMethod(String methodName, Map<String,Object> input, Map<String,Object> output, Map<String,Object> options) {
        
        if(methodName.equals('getAccounts')) {
            getBusAccounts(input, output, options);
        } else if(methodName.equals('addComplaint')) {
            system.debug(JSON.serialize(input));
        }
        return true;
    }
    
    public static void getBusAccounts(Map<String,Object> input, Map<String,Object> output, Map<String,Object> options) {
        System.debug('Input JSON-->' + JSON.serialize(input));
        String userId = String.valueOf(input.get('userId'));
        List<Account> busAccnts = [Select Id, Name From Account Where OwnerId =: UserInfo.getUserId() Order By CreatedDate Desc];        
        List<Map<String,String>> acctnsList = new List<Map<String,String>>();
        for(Account accObj: busAccnts) {
            Map<String,String> accnt = new Map<String,String>();
            accnt.put('AccountId', accObj.Id);
            accnt.put('Name', accObj.Name);
            acctnsList.add(accnt);
        }
        if(!acctnsList.isEmpty()) {
            output.put('records', acctnsList);
        }
    }
}