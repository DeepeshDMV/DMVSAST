global  without sharing class CADMVWallLicenseCallout implements vlocity_ins.VlocityOpenInterface2 {    
    
    global Object invokeMethod(String methodName, Map<String,Object> inputMap,Map<String,Object> outMap, Map<String,Object> options) {
        if(methodName.equals('getDocId')) {
            getDocId(inputMap, outMap);
        } else if(methodName.equals('updDocDownloaded')) {
            updDocDownloaded(inputMap, outMap);
        }
        return true;
    }    
    public static void updDocDownloaded(Map<String,Object> inputMap, Map<String,Object> outMap) {
        String blaId = String.valueOf(inputMap.get('BLAid')); 
        BusinessLicenseApplication bla = new BusinessLicenseApplication(Id=blaId, CADMV_IsDocDownloaded__c = true);
        update bla;
        outMap.put('Msg', 'Download updated');
    }
    public static void getDocId(Map<String,Object> inputMap, Map<String,Object> outMap) {
        String blaId = String.valueOf(inputMap.get('BLAid'));
        String docId = getDocumentId(blaId, outMap);        
    }
    public static HttpResponse callout(String contentData) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://morgjubnob.execute-api.us-west-1.amazonaws.com/Test/communications');
        request.setMethod('POST');
        request.setHeader('x-api-key', 'GZdzi0zhxU8uov7hKZ4Py8qhfnbs1WrhjiCq6bi0');        
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');        
        Map<String,Object> inputJsonMap = new Map<String,Object>();
        inputJsonMap.put('username', 'dmvvendor');
        inputJsonMap.put('password', 'dMzVend0r');
        inputJsonMap.put('name', 'firmwall_pdf');
        inputJsonMap.put('version', 1);
        Map<String,Object> content = new Map<String,Object>();
        content.put('contentType', 'text/plain');
        content.put('data', contentData);
        inputJsonMap.put('content',content);        
        Map<String,Object> Payload = new Map<String,Object>(); 
        Payload.put('body', inputJsonMap);        
        request.setBody(JSON.serialize(Payload));        
        system.debug('Payload' + request.getBody());
        
        HttpResponse response = http.send(request);
        
        system.debug('Response Status ---> ' + response.getStatusCode() + '--' + response.getStatus());
        system.debug('Response body--->' + response.getBody());
        return response;
    }
    
    public static void processResponse(HttpResponse response, String linkedEntityId) {
        if (response.getStatusCode() == 200) {    
            system.debug('Response Body ---> ' + response.getBody());            
            Map<String,Object> resMap = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
            Integer stsCd =  Integer.valueOf(resMap.get('statusCode'));
            Blob cntntData = null;
            if(stsCd == 200) {
                Map<String,Object> bodyMap = (Map<String,Object>) resMap.get('body');
                Map<String,Object> dataMap = (Map<String,Object>) bodyMap.get('data');
                List<Object> result = (List<Object>) dataMap.get('result');
                Map<String,Object> resultMap = (Map<String,Object>) result.get(0);
                Map<String,Object> contectMap = (Map<String,Object>) resultMap.get('content');                
                cntntData = EncodingUtil.base64Decode(String.valueOf(contectMap.get('data')));
                createContent(cntntData, linkedEntityId);      
            } else {
                String errMsg = String.valueOf(resMap.get('message'));
                cntntData = Blob.valueOf('PDF Document generation failed:' + errMsg);
            }
            //createContent(cntntData, linkedEntityId);      
        }
    }
    public static void createContent(Blob contentData, String linkEntityId) {
        ContentVersion cntntVer = new ContentVersion(Title='Wall License', PathOnClient='WallLicense.pdf',
                                                     VersionData=contentData, Origin='H');
        insert cntntVer;
        
        ContentVersion  cntntVerDocId = [Select Id, Title, ContentDocumentId From ContentVersion Where 
                                         Id =: cntntVer.Id Limit 1];
        ContentDocumentLink cntntDocLnk = new ContentDocumentLink(LinkedEntityId=linkEntityId, 			
                                                                  ContentDocumentId=cntntVerDocId.ContentDocumentId,ShareType='V', Visibility='AllUsers');
        insert cntntDocLnk;
    }    
    
    @future (callout = true)
    public static void generateLicense(String blaId) {
        BusinessLicenseApplication bucLicApp = [Select Name, LicenseType.Name, SiteStreet, SiteCity, SiteState, SitePostalCode, LicensePermitName.CADXP_LicenseNum__c, LicensePermitName.PeriodStart, LicensePermitName.PeriodEnd,
                                                LicensePermitName.Name, LicensePermitName.BusinessLicenseApplicationName__c,CADMV_PropOwnerCity__c, CADMV_PropOwnerStreet__c, CADMV_PropOwnerState__c, CADMV_PropOwnerZip__c
                                                From BusinessLicenseApplication Where Id=:blaId Limit 1];
        
        HttpResponse response = callout(getBase64String(bucLicApp));
        processResponse(response, blaId);
        
    }
    public static void generateWallLicense(List<BusinessLicenseApplication> newBusLicApp, Map<Id,BusinessLicenseApplication> oldBusLicApp) {               
        BusinessLicenseApplication oldObjMap = oldBusLicApp.get(newBusLicApp.get(0).Id);        
        if(!String.isEmpty(newBusLicApp.get(0).LicensePermitNameId) && !newBusLicApp.get(0).LicensePermitNameId.equals(oldObjMap.LicensePermitNameId)) {
            generateLicense(newBusLicApp.get(0).Id);
        }
    }
    public static String getBase64String(BusinessLicenseApplication bucLicApp) {
        system.debug('BLA Data--->' + JSON.serialize(bucLicApp));
        //String base64Str = ((bucLicApp.LicensePermitName.CADXP_LicenseNum__c == null ? '12345' : bucLicApp.LicensePermitName.CADXP_LicenseNum__c.right(5)) +';    ;     ;' +(bucLicApp.LicensePermitName.Name.length() > 32 ? bucLicApp.LicensePermitName.Name.substring(0,32) : bucLicApp.LicensePermitName.Name.rightPad(32)) +            ';                                ;'+             bucLicApp.LicensePermitName.PeriodStart.format('MMM').toUppercase() +' 1, '+ bucLicApp.LicensePermitName.PeriodStart.day() +             ', ' + bucLicApp.LicensePermitName.PeriodStart.year() +';'+             bucLicApp.LicensePermitName.PeriodEnd.format('MMM').toUppercase() +            ' ' + bucLicApp.LicensePermitName.PeriodEnd.day() +             ', ' + bucLicApp.LicensePermitName.PeriodEnd.year() +';                              ;                              ; ;' +            (bucLicApp.LicensePermitName.Name.length() > 30 ? bucLicApp.LicensePermitName.Name.substring(0,30) : bucLicApp.LicensePermitName.Name.rightPad(30)) +            ';                              ;'+            (bucLicApp.CADMV_PropOwnerStreet__c.length() > 30 ?  bucLicApp.CADMV_PropOwnerStreet__c.substring(0,30) : bucLicApp.CADMV_PropOwnerStreet__c.rightPad(30))+            ';                              ;' +            (bucLicApp.CADMV_PropOwnerCity__c.length() > 15 ? bucLicApp.CADMV_PropOwnerCity__c.substring(0,15) :  bucLicApp.CADMV_PropOwnerCity__c.rightPad(15)) + '  ' +            bucLicApp.CADMV_PropOwnerState__c + '  ' +            bucLicApp.CADMV_PropOwnerZip__c + '    ' +            ';        ;        ;        ;        ;        ;        ;        ;        ;        ;        ;  ;' +            (System.today().month() > 9 ? (System.today().month() +'') : ('0' + System.today().month()))  + (System.today().day() > 9 ? (System.today().day()+'') : ('0' + System.today().day())) + String.valueOf(System.today().year()).substring(2) +             ';' + System.now().format('hh:mm'));
        //String base64Str = ((bucLicApp.LicensePermitName.CADXP_LicenseNum__c == null ? '12345' : bucLicApp.LicensePermitName.CADXP_LicenseNum__c.right(5)) +';    ;     ;' +(bucLicApp.LicensePermitName.Name.length() > 32 ? bucLicApp.LicensePermitName.Name.substring(0,32) : bucLicApp.LicensePermitName.Name.rightPad(32)) +            ';                                ;'+             bucLicApp.LicensePermitName.PeriodStart.format('MMM').toUppercase() +' 1, '+ bucLicApp.LicensePermitName.PeriodStart.year() +';'+             bucLicApp.LicensePermitName.PeriodEnd.format('MMM').toUppercase() +            ' ' + bucLicApp.LicensePermitName.PeriodEnd.day() +             ', ' + bucLicApp.LicensePermitName.PeriodEnd.year() +';                              ;                              ; ;' +            (bucLicApp.LicensePermitName.Name.length() > 30 ? bucLicApp.LicensePermitName.Name.substring(0,30) : bucLicApp.LicensePermitName.Name.rightPad(30)) +            ';                              ;'+            (bucLicApp.CADMV_PropOwnerStreet__c.length() > 30 ?  bucLicApp.CADMV_PropOwnerStreet__c.substring(0,30) : bucLicApp.CADMV_PropOwnerStreet__c.rightPad(30))+            ';                              ;' +            (bucLicApp.CADMV_PropOwnerCity__c.length() > 15 ? bucLicApp.CADMV_PropOwnerCity__c.substring(0,15) :  bucLicApp.CADMV_PropOwnerCity__c.rightPad(15)) + '  ' +            bucLicApp.CADMV_PropOwnerState__c + '  ' +            bucLicApp.CADMV_PropOwnerZip__c + '    ' +            ';        ;        ;        ;        ;        ;        ;        ;        ;        ;        ;  ;' +            (System.today().month() > 9 ? (System.today().month() +'') : ('0' + System.today().month()))  + (System.today().day() > 9 ? (System.today().day()+'') : ('0' + System.today().day())) + String.valueOf(System.today().year()).substring(2) +             ';' + System.now().format('hh:mm'))+'\r';
        //String base64Str = ((bucLicApp.LicensePermitName.CADXP_LicenseNum__c == null ? '12345' : bucLicApp.LicensePermitName.CADXP_LicenseNum__c.right(5)) +';    ;     ;' +(bucLicApp.LicensePermitName.Name.length() > 32 ? bucLicApp.LicensePermitName.Name.substring(0,32) : bucLicApp.LicensePermitName.Name.rightPad(32)) +            ';                                ;'+             bucLicApp.LicensePermitName.PeriodStart.format('MMM').toUppercase() +' 1, '+ bucLicApp.LicensePermitName.PeriodStart.year() +';'+             bucLicApp.LicensePermitName.PeriodEnd.format('MMM').toUppercase() +            ' ' + bucLicApp.LicensePermitName.PeriodEnd.day() +             ', ' + bucLicApp.LicensePermitName.PeriodEnd.year() +';                              ;                              ; ;' +            (bucLicApp.LicensePermitName.Name.length() > 30 ? bucLicApp.LicensePermitName.Name.substring(0,30) : bucLicApp.LicensePermitName.Name.rightPad(30)) +            ';                              ;'+            (bucLicApp.CADMV_PropOwnerStreet__c.length() > 30 ?  bucLicApp.CADMV_PropOwnerStreet__c.substring(0,30) : bucLicApp.CADMV_PropOwnerStreet__c.rightPad(30))+            ';                              ;' +            (bucLicApp.CADMV_PropOwnerCity__c.length() > 15 ? bucLicApp.CADMV_PropOwnerCity__c.substring(0,15) :  bucLicApp.CADMV_PropOwnerCity__c.rightPad(15)) + '  ' +            bucLicApp.CADMV_PropOwnerState__c + '  ' +            bucLicApp.CADMV_PropOwnerZip__c + '    ' +            ';        ;        ;        ;        ;        ;        ;        ;        ;        ;        ;  ;' +            (System.today().month() > 9 ? (System.today().month() +'') : ('0' + System.today().month()))  + (System.today().day() > 9 ? (System.today().day()+'') : ('0' + System.today().day())) + String.valueOf(System.today().year()).substring(2) +             ';' + System.now().format('hh:mm')) + '\r';
        //String base64Str = ((bucLicApp.LicensePermitName.CADXP_LicenseNum__c == null ? '12345' : bucLicApp.LicensePermitName.CADXP_LicenseNum__c.right(5)) +';    ;     ;' +(bucLicApp.LicenseType.Name.length() > 32 ? bucLicApp.LicenseType.Name.substring(0,32) : bucLicApp.LicenseType.Name.rightPad(32)) +            ';                                ;'+             bucLicApp.LicensePermitName.PeriodStart.format('MMM').toUppercase() +' 1, '+ bucLicApp.LicensePermitName.PeriodStart.year() +';'+             bucLicApp.LicensePermitName.PeriodEnd.format('MMM').toUppercase() +            ' ' + bucLicApp.LicensePermitName.PeriodEnd.day() +             ', ' + bucLicApp.LicensePermitName.PeriodEnd.year() +';                              ;                              ; ;' +            (bucLicApp.LicensePermitName.Name.length() > 30 ? bucLicApp.LicensePermitName.Name.substring(0,30) : bucLicApp.LicensePermitName.Name.rightPad(30)) +            ';                              ;'+            (bucLicApp.SiteStreet.length() > 30 ?  bucLicApp.SiteStreet.substring(0,30) : bucLicApp.SiteStreet.rightPad(30))+            ';                              ;' +            (bucLicApp.SiteStre.length() > 15 ? bucLicApp.CADMV_PropOwnerCity__c.substring(0,15) :  bucLicApp.CADMV_PropOwnerCity__c.rightPad(15)) + '  ' +            bucLicApp.CADMV_PropOwnerState__c + '  ' +            bucLicApp.CADMV_PropOwnerZip__c + '    ' +            ';        ;        ;        ;        ;        ;        ;        ;        ;        ;        ;  ;' +            (System.today().month() > 9 ? (System.today().month() +'') : ('0' + System.today().month()))  + (System.today().day() > 9 ? (System.today().day()+'') : ('0' + System.today().day())) + String.valueOf(System.today().year()).substring(2) +             ';' + System.now().format('hh:mm')) + '\r';
        //String base64Str = ((bucLicApp.LicensePermitName.CADXP_LicenseNum__c == null ? '12345' : bucLicApp.LicensePermitName.CADXP_LicenseNum__c.right(5)) +';    ;     ;' +(bucLicApp.LicenseType.Name.length() > 32 ? bucLicApp.LicenseType.Name.substring(0,32) : bucLicApp.LicenseType.Name.rightPad(32)) +            ';                                ;'+             bucLicApp.LicensePermitName.PeriodStart.format('MMM').toUppercase() +' 1, '+ bucLicApp.LicensePermitName.PeriodStart.year() +';'+             bucLicApp.LicensePermitName.PeriodEnd.format('MMM').toUppercase() +            ' ' + bucLicApp.LicensePermitName.PeriodEnd.day() +             ', ' + bucLicApp.LicensePermitName.PeriodEnd.year() +';                              ;                              ; ;' +            (bucLicAppLicensePermitName.BusinessLicenseApplicationName__c.length() > 30 ? bucLicApp.LicensePermitName.Name.substring(0,30) : bucLicApp.LicensePermitName.Name.rightPad(30)) +            ';                              ;'+            (bucLicApp.SiteStreet.length() > 30 ?  bucLicApp.SiteStreet.substring(0,30) : bucLicApp.SiteStreet.rightPad(30))+            ';                              ;' +            (bucLicApp.SiteCity.length() > 15 ? bucLicApp.SiteCity.substring(0,15) :  bucLicApp.SiteCity.rightPad(15)) + '  ' +            bucLicApp.SiteState + '  ' +            bucLicApp.SitePostalCode + '    ' +            ';        ;        ;        ;        ;        ;        ;        ;        ;        ;        ;  ;' +            (System.today().month() > 9 ? (System.today().month() +'') : ('0' + System.today().month()))  + (System.today().day() > 9 ? (System.today().day()+'') : ('0' + System.today().day())) + String.valueOf(System.today().year()).substring(2) +             ';' + System.now().format('hh:mm')) + '\r';
        String base64Str = ((bucLicApp.LicensePermitName.CADXP_LicenseNum__c == null ? '12345' : bucLicApp.LicensePermitName.CADXP_LicenseNum__c.right(5)) +';    ;     ;' +(bucLicApp.LicenseType.Name.length() > 32 ? bucLicApp.LicenseType.Name.substring(0,32) : bucLicApp.LicenseType.Name.rightPad(32)) +            ';                                ;'+             bucLicApp.LicensePermitName.PeriodStart.format('MMM').toUppercase() +' 1, '+ bucLicApp.LicensePermitName.PeriodStart.year() +';'+             bucLicApp.LicensePermitName.PeriodEnd.format('MMM').toUppercase() +            ' ' + bucLicApp.LicensePermitName.PeriodEnd.day() +             ', ' + bucLicApp.LicensePermitName.PeriodEnd.year() +';                              ;                              ; ;' +            (bucLicApp.LicensePermitName.BusinessLicenseApplicationName__c.length() > 30 ? bucLicApp.LicensePermitName.BusinessLicenseApplicationName__c.substring(0,30) : bucLicApp.LicensePermitName.BusinessLicenseApplicationName__c.rightPad(30)) +            ';                              ;'+            (bucLicApp.SiteStreet.length() > 30 ?  bucLicApp.SiteStreet.substring(0,30) : bucLicApp.SiteStreet.rightPad(30))+            ';                              ;' +            (bucLicApp.SiteCity.length() > 15 ? bucLicApp.SiteCity.substring(0,15) :  bucLicApp.SiteCity.rightPad(15)) + '  ' +            bucLicApp.SiteState + '  ' +            bucLicApp.SitePostalCode + '    ' +            ';        ;        ;        ;        ;        ;        ;        ;        ;        ;        ;  ;' +            (System.today().month() > 9 ? (System.today().month() +'') : ('0' + System.today().month()))  + (System.today().day() > 9 ? (System.today().day()+'') : ('0' + System.today().day())) + String.valueOf(System.today().year()).substring(2) +             ';' + System.now().format('hh:mm')) + '\r';
        system.debug('base64Str-->' + base64Str);
        String result = EncodingUtil.Base64Encode( Blob.valueOf(base64Str));
        return result; 
    }
    @AuraEnabled(cacheable=true)
    public static String getDocumentId(String linkEntityId, Map<String,Object> outMap) {
        //List<BusinessLicenseApplication> busLicAppLst = [Select Id, Status, CADMV_IsDocDownloaded__c  From  BusinessLicenseApplication Where Id =:linkEntityId AND Status='Approved' AND CADMV_IsDocDownloaded__c = false];
        List<BusinessLicenseApplication> busLicAppLst = [Select Id, Status, CADMV_IsDocDownloaded__c  From  BusinessLicenseApplication Where Id =:linkEntityId AND Status='Approved'];
        String docId='';
        if(busLicAppLst.isEmpty()) {
            outMap.put('downloadUrl', null);
            //return docId;
        } else {
            if(busLicAppLst.get(0).CADMV_IsDocDownloaded__c) {
                outMap.put('downloadUrl', 'DOWNLOADED');
            } else {
                List<ContentDocumentLink> cntntDocLnk = [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId=:linkEntityId];            
                if(!cntntDocLnk.isEmpty()) {
                    Set<String> cntntDocIds = new Set<String>();
                    for(ContentDocumentLink cntntDoc: cntntDocLnk) {
                        cntntDocIds.add(cntntDoc.ContentDocumentId);
                    }
                    List<ContentVersion> cntntVer = [Select ContentDocumentId From ContentVersion Where ContentDocumentId=:cntntDocIds AND Title='Wall License' Order by createddate desc];
                    if(!cntntVer.isEmpty()) {
                        docId =  cntntVer.get(0).ContentDocumentId;
                    }
                }
                if(String.isEmpty(docId)) {
                    outMap.put('downloadUrl', null); 
                } else {
                    outMap.put('downloadUrl', URL.getSalesforceBaseUrl().toExternalForm() +'/sfc/servlet.shepherd/document/download/'+docId+'?operationContext=S1');
                }
            }            
        }        
        return docId;
    }
}