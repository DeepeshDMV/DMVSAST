export const OMNIDEF = {"userTimeZone":-420,"userProfile":"System Administrator","userName":"jjobes@deloitte.com.cadxpdev","userId":"0053S000000J4VcQAK","userCurrencyCode":"USD","timeStamp":"2021-09-16T22:45:14.357Z","sOmniScriptId":"a3r3S00000007a7QAA","sobjPL":{},"RPBundle":"","rMap":{},"response":null,"propSetMap":{"stepChartPlacement":"right","stylesheet":{"lightning":"","newport":""},"disableUnloadWarn":true,"errorMessage":{"custom":[]},"consoleTabIcon":"custom:custom18","consoleTabTitle":null,"rtpSeed":false,"showInputWidth":false,"currencyCode":"","autoFocus":false,"pubsub":false,"message":{},"ssm":false,"wpm":false,"consoleTabLabel":"New","cancelRedirectTemplateUrl":"vlcCancelled.html","cancelRedirectPageName":"OmniScriptCancelled","cancelSource":"%ContextId%","allowCancel":false,"cancelType":"SObject","visualforcePagesAvailableInPreview":{},"hideStepChart":true,"timeTracking":false,"knowledgeArticleTypeQueryFieldsMap":{},"lkObjName":null,"bLK":false,"enableKnowledge":false,"trackingCustomData":{},"seedDataJSON":{},"elementTypeToHTMLTemplateMapping":{},"autoSaveOnStepNext":false,"saveURLPatterns":{},"saveObjectId":"%ContextId%","saveContentEncoded":false,"saveForLaterRedirectTemplateUrl":"vlcSaveForLaterAcknowledge.html","saveForLaterRedirectPageName":"sflRedirect","saveExpireInDays":null,"saveNameTemplate":null,"allowSaveForLater":false,"persistentComponent":[{"modalConfigurationSetting":{"modalSize":"lg","modalController":"ModalProductCtrl","modalHTMLTemplateId":"vlcProductConfig.html"},"itemsKey":"cartItems","id":"vlcCart","responseJSONNode":"","responseJSONPath":"","sendJSONNode":"","sendJSONPath":"","postTransformBundle":"","preTransformBundle":"","remoteOptions":{"postTransformBundle":"","preTransformBundle":""},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","label":"","render":false},{"modalConfigurationSetting":{"modalSize":"lg","modalController":"","modalHTMLTemplateId":""},"itemsKey":"knowledgeItems","id":"vlcKnowledge","postTransformBundle":"","preTransformBundle":"","remoteOptions":{"postTransformBundle":"","preTransformBundle":""},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","label":"","render":false}]},"prefillJSON":"{}","lwcId":"1f377b15-839e-2079-21ba-1446cb3c00a3","labelMap":{"IPGetLicenses":"Search:SearchControls:IPGetLicenses","SearchAccount":"Search:SearchControls:SearchAccount","SearchType":"Search:SearchControls:SearchType","licenseList":"Search:licenseList","SearchControls":"Search:SearchControls","Search":"Search","SetColumns":"SetColumns"},"labelKeyMap":{},"errorMsg":"","error":"OK","dMap":{},"depSOPL":{},"depCusPL":{},"cusPL":{},"children":[{"type":"Set Values","propSetMap":{"disOnTplt":false,"label":"setColumns","pubsub":false,"message":{},"ssm":false,"wpm":false,"HTMLTemplateId":"","show":null,"showPersistentComponent":[false,false],"elementValueMap":{"columns":{"BusinessOperatingName":"Business Operating Name","Address":"Address","BusinessTypeName":"Business Type","AccountName":"Account Name"}},"controlWidth":12,"aggElements":{}},"offSet":0,"name":"SetColumns","level":0,"indexInParent":0,"bHasAttachment":false,"bEmbed":false,"bSetValues":true,"JSONPath":"SetColumns","lwcId":"lwc0"},{"type":"Step","propSetMap":{"disOnTplt":false,"errorMessage":{"default":null,"custom":[]},"allowSaveForLater":false,"label":null,"chartLabel":null,"instructionKey":"","HTMLTemplateId":"","conditionType":"Hide if False","show":null,"knowledgeOptions":{"typeFilter":"","remoteTimeout":30000,"dataCategoryCriteria":"","keyword":"","publishStatus":"Online","language":"English"},"remoteOptions":{},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","showPersistentComponent":[false,false],"instruction":"<p>Steps to file a complaint</p>","completeMessage":"Are you sure you want to complete the script?","completeLabel":"Complete","saveMessage":"Are you sure you want to save it for later?","saveLabel":"Save for later","cancelMessage":"Are you sure?","cancelLabel":"Cancel","nextWidth":0,"nextLabel":"Next","previousWidth":0,"previousLabel":"Previous","validationRequired":true,"uiElements":{"Search":"","SearchType":"","SearchAccount":"","SearchControls":""},"aggElements":{}},"offSet":0,"name":"Search","level":0,"indexInParent":1,"bHasAttachment":false,"bEmbed":false,"response":null,"inheritShowProp":null,"children":[{"response":null,"level":1,"indexInParent":0,"eleArray":[{"type":"Block","rootIndex":1,"response":null,"propSetMap":{"bus":true,"disOnTplt":false,"label":null,"hide":false,"HTMLTemplateId":"","accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"repeatLimit":null,"repeatClone":false,"repeat":false,"collapse":false,"controlWidth":12},"name":"SearchControls","level":1,"JSONPath":"Search:SearchControls","indexInParent":0,"index":0,"children":[{"response":null,"level":2,"indexInParent":0,"eleArray":[{"type":"Select","rootIndex":1,"response":null,"propSetMap":{"label":"Select Type","disOnTplt":false,"hide":false,"HTMLTemplateId":"","accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"controllingField":{"source":"","type":"","element":""},"optionSource":{"source":"","type":""},"options":[{"name":"1","value":"Business Name"},{"name":"2","value":"Individual Name"},{"name":"3","value":"License Number"}],"helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":true,"inputWidth":12,"showInputWidth":false,"controlWidth":5},"name":"SearchType","level":2,"JSONPath":"Search:SearchControls|1:SearchType","indexInParent":0,"index":0,"children":[],"bHasAttachment":false,"bSelect":true,"lwcId":"lwc1000-0"}],"bHasAttachment":false},{"response":null,"level":2,"indexInParent":1,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"label":"Search Licenses...","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":3,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":true,"inputWidth":12,"showInputWidth":false,"controlWidth":5},"name":"SearchAccount","level":2,"JSONPath":"Search:SearchControls|1:SearchAccount","indexInParent":1,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc1001-0"}],"bHasAttachment":false},{"response":null,"level":2,"indexInParent":2,"eleArray":[{"type":"Integration Procedure Action","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"enableActionMessage":false,"enableDefaultAbort":false,"errorMessage":{"default":null,"custom":[]},"label":"Search","svgIcon":"","svgSprite":"","pubsub":false,"message":{},"ssm":false,"wpm":false,"HTMLTemplateId":"","show":null,"showPersistentComponent":[false,false],"redirectPreviousWidth":3,"redirectPreviousLabel":"Previous","redirectNextWidth":3,"redirectNextLabel":"Next","redirectTemplateUrl":"vlcAcknowledge.html","redirectPageName":"","validationRequired":"Step","failureAbortMessage":"Are you sure?","failureGoBackLabel":"Go Back","failureAbortLabel":"Abort","failureNextLabel":"Continue","postMessage":"Done","inProgressMessage":"In Progress","extraPayload":{"gridColumns":"%columns%","searchTerm":"%SearchAccount%","searchType":"%SearchType%"},"responseJSONNode":"","responseJSONPath":"","sendJSONNode":"","sendJSONPath":"","postTransformBundle":"","preTransformBundle":"","remoteTimeout":30000,"remoteOptions":{"chainable":false,"useFuture":false,"postTransformBundle":"","preTransformBundle":""},"useContinuation":false,"integrationProcedureKey":"License_Search","controlWidth":2},"name":"IPGetLicenses","level":2,"JSONPath":"Search:SearchControls|1:IPGetLicenses","indexInParent":2,"index":0,"children":[],"bHasAttachment":false,"bIntegrationProcedureAction":true,"lwcId":"lwc1002-0"}],"bHasAttachment":false}],"bHasAttachment":false,"bBlock":true,"lwcId":"lwc10-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":1,"eleArray":[{"type":"Selectable Items","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"label":null,"accessibleInFutureSteps":false,"show":null,"modalConfigurationSetting":{"modalSize":"lg","modalController":"ModalProductCtrl","modalHTMLTemplateId":"vlcProductConfig.html"},"maxCompareSize":4,"modalSize":"","modalController":"ModalInstanceCtrl","modalHTMLTemplateId":"vlcModalContent.html","dataJSON":false,"selectMode":"Single","itemsKey":"recSet","HTMLTemplateId":"licensesList","responseJSONNode":"","responseJSONPath":"","sendJSONNode":"setColumns","sendJSONPath":"setColumns","postTransformBundle":"","preTransformBundle":"","remoteTimeout":30000,"remoteOptions":{"postTransformBundle":"","preTransformBundle":""},"remoteMethod":"","remoteClass":""},"name":"licenseList","level":1,"JSONPath":"Search:licenseList","indexInParent":1,"index":0,"children":[],"bHasAttachment":false,"lwcId":"lwc11-0"}],"bHasAttachment":false}],"bAccordionOpen":false,"bAccordionActive":false,"bStep":true,"isStep":true,"JSONPath":"Search","lwcId":"lwc1"}],"bReusable":false,"bpVersion":1,"bpType":"LicensingAndPermitting","bpSubType":"LPSearch","bpLang":"English","bHasAttachment":false,"lwcVarMap":{}};