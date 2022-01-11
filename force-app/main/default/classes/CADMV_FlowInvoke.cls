public with sharing class CADMV_FlowInvoke { 

    @InvocableMethod
    public static void results(List<string> results) {    
        System.debug('::: Test:: ' + results[0]);
    }
}