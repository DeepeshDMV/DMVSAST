/**
* User Story: N/A
* Class Name: CADMV_CreateErrorLogException
* Test Class Name: ****
* Description: Utility Class to log errors in the Error Object
* Date:        Developer/Company                    Description
* ---------------------------------------------------------------------------------------------------------------------------------------- *
* 09/28/2021   Sukrut Nagarkar/Deloitte           Initial Creation
**/
public class CADMV_CreateErrorLogException extends Exception {
    
    //Method to add error in system
    public static void addError(Exception e,String cname,String cmethod) {
        List<CADMV_ExceptionLog__c> LstError = new List<CADMV_ExceptionLog__c>();
        try
        {
            system.debug('inside inside');
            LstError = createErrorLogs(e, cname, cmethod);
            system.debug('error'+LstError);
            if(LstError != NULL && !LstError.isEmpty())
            {
                insert LstError;
            }
            if(Test.isRunningTest())
                    throw new CADMV_CustomException('Test class exception');   
        }
        catch(Exception ex)
        {
            System.debug(ex);
        }

    }

    public static List<CADMV_ExceptionLog__c> createErrorLogs(Exception e,String cname,String cmethod) {
        List<CADMV_ExceptionLog__c> lstError = new List<CADMV_ExceptionLog__c>();
            String QueryLimit = CADMV_AppConstants.NULL_EMPTY_STRING + '1. SOQL Queries used / SOQL Queries allowed: ' + Limits.getQueries() + '/' + Limits.getLimitQueries();
            String DMLimit = CADMV_AppConstants.NULL_EMPTY_STRING + '2. Number of records queried so far /  Number allowed: ' + Limits.getDmlRows() + '/' + Limits.getLimitDmlRows();
            String DMLStat = CADMV_AppConstants.NULL_EMPTY_STRING + '3. Number of DML statements used so far / Number allowed: ' +  Limits.getDmlStatements() + '/' + Limits.getLimitDmlStatements();   
            String CPUT = CADMV_AppConstants.NULL_EMPTY_STRING + '4. Amount of CPU time (in ms) used so far / CPU usage time (in ms) allowed: ' + Limits.getCpuTime() + '/' + Limits.getLimitCpuTime();
            String lan=UserInfo.getLanguage();
            String uid=UserInfo.getUserId();
            String sessid=UserInfo.getSessionId().substring(15);
            LoginHistory lh=[SELECT Browser,LoginTime,SourceIp,UserId,Platform FROM LoginHistory WHERE UserId != null and UserId =:uid ORDER BY LoginTime DESC NULLS LAST LIMIT 1];
            //Create exception record
            CADMV_ExceptionLog__c exc = new CADMV_ExceptionLog__c();
           //exc.CADMV_GovLimits__c= String.format('{0}\n{1}\n{2}\n{3}',new List<QueryLimit, DMLimit,DMLStat,CPUT>);            
            exc.CADMV_ErrorMessage__c = e.getMessage();
            exc.CADMV_ExceptionType__c = e.getTypeName();
            exc.CADMV_LineNumber__c= e.getLineNumber();
            exc.CADMV_StackTrace__c = e.getStackTraceString();
            exc.CADMV_ClassName__c=cname;
            exc.CADMV_ClassMethod__c=cmethod;
            exc.CADMV_Language__c=lan;
            exc.CADMV_SessionId__c=sessid;   
            exc.CADMV_Browser__c=lh.Browser;
            exc.CADMV_SourceIPAddress__c=lh.SourceIp;
            exc.CADMV_Platform__c=lh.Platform;
            exc.CADMV_QueryLimit__c = QueryLimit;
            exc.CADMV_CPUTLimit__c = CPUT;
            exc.CADMV_DMLStat__c = DMLStat;
            exc.CADMV_DMLimit__c = DMLimit;
        lstError.add(exc);
        return lstError;
    }

    public static Id logApplicationError(Exception error,String className,String methodName){
        try{
            if(error != null ){
            CADMV_ExceptionLog__c log = new CADMV_ExceptionLog__c();
            log.CADMV_ErrorMessage__c = error.getMessage();
            log.CADMV_ExceptionType__c = error.getTypeName();
            log.CADMV_LineNumber__c = error.getLineNumber();
            log.CADMV_StackTrace__c = error.getStackTraceString();
            log.CADMV_ClassName__c = className;
            log.CADMV_ClassMethod__c = methodName;
            log.CADMV_LogType__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'ERROR';
            log.CADMV_Source__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Salesforce';
            logToDB(log);
            if(Test.isRunningTest())
                    throw new CADMV_CustomException('Test class exception');
            return log.Id;
            }
        }catch(Exception e){
            System.debug(e);
        }
        return null;        
    }
    
        public static Id logDatabaseError(Database.Error error,String className,String methodName){
        try{
            if(error != null ){
            CADMV_ExceptionLog__c log = new CADMV_ExceptionLog__c();
            log.CADMV_ErrorMessage__c = error.getMessage();
            log.CADMV_ClassName__c = className;
            log.CADMV_ClassMethod__c = methodName;
            log.CADMV_LogType__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'ERROR';
            log.CADMV_Source__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Salesforce';
            logToDB(log);
            if(Test.isRunningTest())
                    throw new CADMV_CustomException('Test class exception');
            return log.Id;
            }
        }catch(Exception e){
            System.debug(e);
        }
        return null;        
    }

    /**
    ** Name             : logApplicationErrorLWCAura
    ** Input            : error Exception
    ** Functionality    : Save input to CADMV_ExceptionLog__c
    ** Return           : String, created Record Name 
    ** Author           : Sukrut Nagarkar
    ** Date             : 10/11/2021
    */
    public static String logApplicationErrorLWCAura (String message,String device,String source,String componentName,String method,String stack){
        CADMV_ExceptionLog__c log = new CADMV_ExceptionLog__c();
        CADMV_ExceptionLog__c logNew = new CADMV_ExceptionLog__c();
        try{            
            log.CADMV_ErrorMessage__c = message;               
            log.CADMV_Device__c = device;
            log.CADMV_ComponentName__c =componentName;
            log.CADMV_ComponentMethod__c = method;  
            log.CADMV_StackTrace__c = stack;              
            log.CADMV_LogType__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'ERROR';
            log.CADMV_Source__c = source;
            log.CADMV_UserName__c = UserInfo.getName();
            log.CADMV_UserEmail__c = UserInfo.getUserEmail();
            logToDB(log);
            if(Test.isRunningTest())
                throw new CADMV_CustomException('Test class exception');
            logNew = [Select Id,Name FROM CADMV_ExceptionLog__c Where Id =: log.Id limit 1];
            System.debug('log--'+logNew.Name);
            return logNew.Name;
            
        }catch(Exception e){
            CADMV_ExceptionLog__c log2 = new CADMV_ExceptionLog__c();
            log2.CADMV_ErrorMessage__c += ' error occured while saving error '+ e.getMessage();
            log2.CADMV_StackTrace__c += ' error occured while saving error '+ e.getStackTraceString();
            if(log2 != null){ 
            insert log2;
            }
        }
        return null; 
    }

    /**
    ** Name             : logApplicationError
    ** Input            : error Exception
    ** Functionality    : Save input to CADMV_ExceptionLog__c
    ** Return           : String, created Record Name 
    ** Author           : Sukrut Nagarkar
    ** Date             : 09/28/2021
    */
    public static String logApplicationError(Exception error){
        CADMV_ExceptionLog__c log = new CADMV_ExceptionLog__c();
        CADMV_ExceptionLog__c logNew = new CADMV_ExceptionLog__c();
        try{
            if(error != null ){
                log.CADMV_ErrorMessage__c = error.getMessage();
                log.CADMV_ExceptionType__c = error.getTypeName();
                log.CADMV_LineNumber__c = error.getLineNumber();
                log.CADMV_StackTrace__c = error.getStackTraceString();
                log.CADMV_ClassName__c = getClassName(error.getStackTraceString());
                log.CADMV_ClassMethod__c = getMethodName(error.getStackTraceString());
                log.CADMV_LogType__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'ERROR';
                log.CADMV_Source__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Salesforce';
                log.CADMV_UserName__c = UserInfo.getName();
                log.CADMV_UserEmail__c = UserInfo.getUserEmail();
                logToDB(log);
                if(Test.isRunningTest())
                        throw new CADMV_CustomException('Test class exception');
                logNew = [Select Id,Name FROM CADMV_ExceptionLog__c Where Id =: log.Id limit 1];
                System.debug('log--'+logNew.Name);
                return logNew.Name;
            }
        }catch(Exception e){
            CADMV_ExceptionLog__c log2 = new CADMV_ExceptionLog__c();
            log2.CADMV_ErrorMessage__c += ' error occured while saving error '+ e.getMessage();
            log2.CADMV_StackTrace__c += ' error occured while saving error '+ e.getStackTraceString();
            if(log2 != null){ 
            insert log2;
            }
        }
        return null; 
    }
    
    /**
    ** Name             : logApplicationError
    ** Input            : error Exception and Transaction Name
    ** Functionality    : Save input to CADMV_ExceptionLog__c
    ** Return           : Id, created Record ID 
    ** Author           : Sukrut Nagarkar
    ** Date             : 09/28/2021
    ** Note             : Transaction Name should not be more than 50 chars
    */
    public static Id logApplicationError(Exception error, String transactionName){
        CADMV_ExceptionLog__c log = new CADMV_ExceptionLog__c();
        try{
            if(error != null ){
                log.CADMV_ErrorMessage__c = error.getMessage();
                log.CADMV_ExceptionType__c = error.getTypeName();
                log.CADMV_LineNumber__c = error.getLineNumber();
                log.CADMV_StackTrace__c = error.getStackTraceString();
                log.CADMV_ClassName__c = getClassName(error.getStackTraceString());
                log.CADMV_ClassMethod__c = getMethodName(error.getStackTraceString());
                log.CADMV_LogType__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'ERROR';
                log.CADMV_Source__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Salesforce';
                log.CADMV_TransactionName__c = transactionName;
                logToDB(log);
                if(Test.isRunningTest())
                        throw new CADMV_CustomException('Test class exception');
                return log.Id;
            }
        }catch(Exception e){
            CADMV_ExceptionLog__c log2 = new CADMV_ExceptionLog__c();
            log2.CADMV_ErrorMessage__c += ' error occured while saving error '+ e.getMessage();
            log2.CADMV_StackTrace__c += ' error occured while saving error '+ e.getStackTraceString();
            if(log2 != null){
            insert log2;
            }
        }
        return null; 
    }

    private static String getClassName(String stackTraceString){
        try{    
           String mstackTraceString = stackTraceString.substringBefore('\n');
            if (mstackTraceString.startsWith('Class.')){
                mstackTraceString = mstackTraceString.substringAfter('Class.');
                }
            return mstackTraceString.substringBefore(':').substringBeforeLast('.');
        }catch(Exception e){
            return '';
        }
    }

    private static String getMethodName(String stackTraceString){
        try{
           String  mstackTraceString = stackTraceString.substringBefore('\n');
            return mstackTraceString.substringBefore(':').substringAfterLast('.');
        }catch(Exception e){
            return '';
        }
    }

    private static void logToDB(CADMV_ExceptionLog__c log){
        String uid=UserInfo.getUserId();
        //LoginHistory lh=[SELECT Browser,LoginTime,SourceIp,UserId,Platform FROM LoginHistory WHERE UserId =:uid ORDER BY LoginTime DESC NULLS LAST LIMIT 1];
        /*if( lh != null){
            log.Browser__c=lh.Browser;
            log.Source_IP_Address__c=lh.SourceIp;
            log.Platform__c=lh.Platform;
        }*/
        
        log.CADMV_QueryLimit__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'SOQL Queries used / SOQL Queries allowed: ' + Limits.getQueries() + '/' + Limits.getLimitQueries();
        log.CADMV_DMLimit__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Number of records queried so far /  Number allowed: ' + Limits.getDmlRows() + '/' + Limits.getLimitDmlRows();
        log.CADMV_DMLStat__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Number of DML statements used so far / Number allowed: ' +  Limits.getDmlStatements() + '/' + Limits.getLimitDmlStatements();   
        log.CADMV_CPUTLimit__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Amount of CPU time (in ms) used so far / CPU usage time (in ms) allowed: ' + Limits.getCpuTime() + '/' + Limits.getLimitCpuTime();
        
        log.CADMV_SessionId__c=UserInfo.getSessionId().substring(15);
        log.CADMV_Language__c=UserInfo.getLanguage();
        if(log != null){
        insert log;
        }       
    }
    
    //Add delete record details
    public static void logDeleteDetails(String message, String cname,String cmethod ){
           CADMV_ExceptionLog__c exc = new CADMV_ExceptionLog__c();
           //exc.Gov_Limits__c= String.format('{0}\n{1}\n{2}\n{3}',new List<QueryLimit, DMLimit,DMLStat,CPUT>);            
            exc.CADMV_ErrorMessage__c = message;
            exc.CADMV_ClassName__c=cname;
            exc.CADMV_ClassMethod__c=cmethod;
            if(exc != null){
            insert exc;
            }
    }
    
    // Add details related to DatabseSave
    public static void logDataBaseSaveDetails(Database.SaveResult[] srList , String cname, String cmethod ){ 
       List<CADMV_ExceptionLog__c> logtoDb = new List<CADMV_ExceptionLog__c>();
        for (Database.SaveResult sr : srList) {
            if (!sr.isSuccess()) {
                for(Database.Error err : sr.getErrors()) {                            
                    CADMV_ExceptionLog__c log = new CADMV_ExceptionLog__c();
                    log.CADMV_ErrorMessage__c = err.getMessage();
                    log.CADMV_ClassName__c = cname;
                    log.CADMV_ClassMethod__c = cmethod;
                    log.CADMV_LogType__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'ERROR';
                    log.CADMV_Source__c = CADMV_AppConstants.NULL_EMPTY_STRING + 'Salesforce';
                    logtoDb.add(log);
                }
            } else  {  
                CADMV_ExceptionLog__c exc = new CADMV_ExceptionLog__c();        
                exc.CADMV_ErrorMessage__c ='Successfully updated License ID: ' + sr.getId();
                exc.CADMV_ClassName__c=cname;
                exc.CADMV_ClassMethod__c=cmethod;
                logtoDb.add(exc);
            }
        }
        try {
            if(logtoDb != null && !logtoDb.isEmpty()) {
                insert logtoDb;
            }
        } catch(Exception ex) {
            system.debug('Error'+ex);
        }

        
    }
}