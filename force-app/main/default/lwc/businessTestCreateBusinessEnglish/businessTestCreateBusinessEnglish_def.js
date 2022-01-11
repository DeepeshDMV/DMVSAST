export const OMNIDEF = {"userTimeZone":-420,"userProfile":"System Administrator","userName":"mantss@deloitte.com","userId":"0053S000000IwYvQAK","userCurrencyCode":"USD","timeStamp":"2021-05-30T09:37:36.476Z","sOmniScriptId":"a3r3S000000034BQAQ","sobjPL":{},"RPBundle":"","rMap":{},"response":null,"propSetMap":{"currentLanguage":"en_US","scrollBehavior":"auto","stepChartPlacement":"right","mergeSavedData":false,"stylesheet":{"lightningRtl":"","newportRtl":"","lightning":"","newport":""},"disableUnloadWarn":true,"errorMessage":{"custom":[]},"consoleTabIcon":"custom:custom18","consoleTabTitle":null,"rtpSeed":false,"showInputWidth":false,"currencyCode":"","autoFocus":false,"pubsub":false,"message":{},"ssm":false,"wpm":false,"consoleTabLabel":"New","cancelRedirectTemplateUrl":"vlcCancelled.html","cancelRedirectPageName":"OmniScriptCancelled","cancelSource":"%ContextId%","allowCancel":true,"cancelType":"SObject","visualforcePagesAvailableInPreview":{},"hideStepChart":false,"timeTracking":false,"knowledgeArticleTypeQueryFieldsMap":{},"lkObjName":null,"bLK":false,"enableKnowledge":false,"trackingCustomData":{},"seedDataJSON":{},"elementTypeToHTMLTemplateMapping":{},"autoSaveOnStepNext":false,"saveURLPatterns":{},"saveObjectId":"%ContextId%","saveContentEncoded":false,"saveForLaterRedirectTemplateUrl":"vlcSaveForLaterAcknowledge.html","saveForLaterRedirectPageName":"sflRedirect","saveExpireInDays":null,"saveNameTemplate":null,"allowSaveForLater":true,"persistentComponent":[{"modalConfigurationSetting":{"modalSize":"lg","modalController":"ModalProductCtrl","modalHTMLTemplateId":"vlcProductConfig.html"},"itemsKey":"cartItems","id":"vlcCart","responseJSONNode":"","responseJSONPath":"","sendJSONNode":"","sendJSONPath":"","postTransformBundle":"","preTransformBundle":"","remoteOptions":{"postTransformBundle":"","preTransformBundle":""},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","label":"","render":false},{"modalConfigurationSetting":{"modalSize":"lg","modalController":"","modalHTMLTemplateId":""},"itemsKey":"knowledgeItems","id":"vlcKnowledge","postTransformBundle":"","preTransformBundle":"","remoteOptions":{"postTransformBundle":"","preTransformBundle":""},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","label":"","dispOutsideOmni":false,"render":false}]},"prefillJSON":"{}","lwcId":"b44bdd3c-d647-3885-a519-895c41153848","labelMap":{"AccountWebsite":"StepAccount:BasicInformation:AccountWebsite","AccountPhone":"StepAccount:BasicInformation:AccountPhone","AccountName":"StepAccount:BasicInformation:AccountName","AccountZipCode":"StepAccount:AddressInformationBlock:AccountZipCode","AccountState":"StepAccount:AddressInformationBlock:AccountState","AccountCity":"StepAccount:AddressInformationBlock:AccountCity","AccountStreet":"StepAccount:AddressInformationBlock:AccountStreet","AddressInformationBlock":"StepAccount:AddressInformationBlock","BasicInformation":"StepAccount:BasicInformation","IPSaveAccountDetails":"IPSaveAccountDetails","StepAccount":"StepAccount","IPGetAccountDetails":"IPGetAccountDetails"},"labelKeyMap":{},"errorMsg":"","error":"OK","dMap":{},"depSOPL":{},"depCusPL":{},"cusPL":{},"children":[{"type":"Integration Procedure Action","propSetMap":{"businessEvent":"","businessCategory":"","enableActionMessage":false,"enableDefaultAbort":false,"errorMessage":{"default":null,"custom":[]},"label":"IPGetAccountDetails","svgIcon":"","svgSprite":"","pubsub":false,"message":{},"ssm":false,"wpm":false,"HTMLTemplateId":"","show":null,"showPersistentComponent":[true,false],"redirectPreviousWidth":3,"redirectPreviousLabel":"Previous","redirectNextWidth":3,"redirectNextLabel":"Next","redirectTemplateUrl":"vlcAcknowledge.html","redirectPageName":"","validationRequired":"Step","failureAbortMessage":"Are you sure?","failureGoBackLabel":"Go Back","failureAbortLabel":"Abort","failureNextLabel":"Continue","postMessage":"Done","inProgressMessage":"In Progress","extraPayload":{"AccountId":"%ContextId%"},"responseJSONNode":"","responseJSONPath":"","sendJSONNode":"","sendJSONPath":"","postTransformBundle":"","preTransformBundle":"","remoteTimeout":30000,"remoteOptions":{"":null,"postTransformBundle":"","preTransformBundle":"","chainable":false,"useFuture":false},"useContinuation":false,"integrationProcedureKey":"Licensing_And_Permitting_DS_GetAccount","controlWidth":12,"aggElements":{}},"offSet":0,"name":"IPGetAccountDetails","level":0,"indexInParent":0,"bHasAttachment":false,"bEmbed":false,"bIntegrationProcedureAction":true,"JSONPath":"IPGetAccountDetails","lwcId":"lwc0"},{"type":"Step","propSetMap":{"businessEvent":"","businessCategory":"","message":{},"pubsub":false,"ssm":false,"wpm":false,"errorMessage":{"default":null,"custom":[]},"allowSaveForLater":true,"label":"Account Details","chartLabel":"Step 1","instructionKey":"","HTMLTemplateId":"","conditionType":"Hide if False","show":null,"knowledgeOptions":{"typeFilter":"","remoteTimeout":30000,"dataCategoryCriteria":"","keyword":"","publishStatus":"Online","language":"English"},"remoteOptions":{},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","showPersistentComponent":[true,false],"instruction":"","completeMessage":"Are you sure you want to complete the script?","completeLabel":"Complete","saveMessage":"Are you sure you want to save it for later?","saveLabel":"Save for later","cancelMessage":"Are you sure?","cancelLabel":"Cancel","nextWidth":3,"nextLabel":"Next","previousWidth":3,"previousLabel":"Previous","validationRequired":true,"uiElements":{"StepAccount":"","AccountName":"","AccountPhone":"","AccountWebsite":"","BasicInformation":"","AccountStreet":"","AccountCity":"","AccountState":"","AccountZipCode":"","AddressInformationBlock":""},"aggElements":{}},"offSet":0,"name":"StepAccount","level":0,"indexInParent":1,"bHasAttachment":false,"bEmbed":false,"response":null,"inheritShowProp":null,"children":[{"response":null,"level":1,"indexInParent":0,"eleArray":[{"type":"Block","rootIndex":1,"response":null,"propSetMap":{"bus":true,"label":"Basic Information","hide":false,"HTMLTemplateId":"","accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"repeatLimit":null,"repeatClone":false,"repeat":false,"collapse":false,"controlWidth":12},"name":"BasicInformation","level":1,"JSONPath":"StepAccount:BasicInformation","indexInParent":0,"index":0,"children":[{"response":null,"level":2,"indexInParent":0,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"placeholder":"Name","label":"Account Name","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":"","readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":true,"inputWidth":12,"showInputWidth":false,"controlWidth":12},"name":"AccountName","level":2,"JSONPath":"StepAccount:BasicInformation|1:AccountName","indexInParent":0,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc1000-0"}],"bHasAttachment":false},{"response":null,"level":2,"indexInParent":1,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"controlWidth":12,"label":"Company Phone","showInputWidth":false,"inputWidth":12,"required":false,"repeat":false,"repeatClone":false,"repeatLimit":null,"readOnly":false,"defaultValue":null,"help":false,"helpText":"","mask":"","pattern":"","ptrnErrText":"","minLength":0,"maxLength":255,"placeholder":"Phone","show":null,"conditionType":"Hide if False","accessibleInFutureSteps":false,"debounceValue":0,"HTMLTemplateId":"","hide":false,"disOnTplt":false},"name":"AccountPhone","level":2,"JSONPath":"StepAccount:BasicInformation|1:AccountPhone","indexInParent":1,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc1001-0"}],"bHasAttachment":false},{"response":null,"level":2,"indexInParent":2,"eleArray":[{"type":"URL","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"placeholder":"Website","ptrnErrText":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"label":"Website","controlWidth":12},"name":"AccountWebsite","level":2,"JSONPath":"StepAccount:BasicInformation|1:AccountWebsite","indexInParent":2,"index":0,"children":[],"bHasAttachment":false,"bURL":true,"lwcId":"lwc1002-0"}],"bHasAttachment":false}],"bHasAttachment":false,"bBlock":true,"lwcId":"lwc10-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":1,"eleArray":[{"type":"Block","rootIndex":1,"response":null,"propSetMap":{"bus":true,"hide":false,"HTMLTemplateId":"","accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"repeatLimit":null,"repeatClone":false,"repeat":false,"collapse":false,"label":"Address Information","controlWidth":12},"name":"AddressInformationBlock","level":1,"JSONPath":"StepAccount:AddressInformationBlock","indexInParent":1,"index":0,"children":[{"response":null,"level":2,"indexInParent":0,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"placeholder":"Address","maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"label":"Street Address","controlWidth":12},"name":"AccountStreet","level":2,"JSONPath":"StepAccount:AddressInformationBlock|1:AccountStreet","indexInParent":0,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc1100-0"}],"bHasAttachment":false},{"response":null,"level":2,"indexInParent":1,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"controlWidth":12,"label":"City","showInputWidth":false,"inputWidth":12,"required":false,"repeat":false,"repeatClone":false,"repeatLimit":null,"readOnly":false,"defaultValue":null,"help":false,"helpText":"","mask":"","pattern":"","ptrnErrText":"","minLength":0,"maxLength":255,"placeholder":"City","show":null,"conditionType":"Hide if False","accessibleInFutureSteps":false,"debounceValue":0,"HTMLTemplateId":"","hide":false,"disOnTplt":false},"name":"AccountCity","level":2,"JSONPath":"StepAccount:AddressInformationBlock|1:AccountCity","indexInParent":1,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc1101-0"}],"bHasAttachment":false},{"response":null,"level":2,"indexInParent":2,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"placeholder":"State","maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"label":"State","controlWidth":6},"name":"AccountState","level":2,"JSONPath":"StepAccount:AddressInformationBlock|1:AccountState","indexInParent":2,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc1102-0"}],"bHasAttachment":false},{"response":null,"level":2,"indexInParent":3,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"controlWidth":6,"label":"Zip Code","showInputWidth":false,"inputWidth":12,"required":false,"repeat":false,"repeatClone":false,"repeatLimit":null,"readOnly":false,"defaultValue":null,"help":false,"helpText":"","mask":"","pattern":"","ptrnErrText":"","minLength":0,"maxLength":255,"placeholder":"Zip Code","show":null,"conditionType":"Hide if False","accessibleInFutureSteps":false,"debounceValue":0,"HTMLTemplateId":"","hide":false,"disOnTplt":false},"name":"AccountZipCode","level":2,"JSONPath":"StepAccount:AddressInformationBlock|1:AccountZipCode","indexInParent":3,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc1103-0"}],"bHasAttachment":false}],"bHasAttachment":false,"bBlock":true,"lwcId":"lwc11-0"}],"bHasAttachment":false}],"bAccordionOpen":false,"bAccordionActive":false,"bStep":true,"isStep":true,"JSONPath":"StepAccount","lwcId":"lwc1"},{"type":"Integration Procedure Action","propSetMap":{"businessEvent":"","businessCategory":"","enableActionMessage":false,"enableDefaultAbort":false,"errorMessage":{"default":null,"custom":[]},"label":"IPSaveAccountDetails","svgIcon":"","svgSprite":"","pubsub":true,"message":{"isCompleted":true},"ssm":false,"wpm":false,"HTMLTemplateId":"","show":null,"showPersistentComponent":[true,false],"redirectPreviousWidth":3,"redirectPreviousLabel":"Previous","redirectNextWidth":3,"redirectNextLabel":"Next","redirectTemplateUrl":"vlcAcknowledge.html","redirectPageName":"","validationRequired":"Step","failureAbortMessage":"Are you sure?","failureGoBackLabel":"Go Back","failureAbortLabel":"Abort","failureNextLabel":"Continue","postMessage":"Done","inProgressMessage":"In Progress","extraPayload":{},"responseJSONNode":"","responseJSONPath":"","sendJSONNode":"","sendJSONPath":"","postTransformBundle":"","preTransformBundle":"","remoteTimeout":30000,"remoteOptions":{"chainable":false,"useFuture":false,"postTransformBundle":"","preTransformBundle":""},"useContinuation":false,"integrationProcedureKey":"Licensing_And_Permitting_DS_SaveAccount","controlWidth":12,"aggElements":{}},"offSet":0,"name":"IPSaveAccountDetails","level":0,"indexInParent":2,"bHasAttachment":false,"bEmbed":false,"bIntegrationProcedureAction":true,"JSONPath":"IPSaveAccountDetails","lwcId":"lwc2"}],"bReusable":true,"bpVersion":1,"bpType":"businessTest","bpSubType":"CreateBusiness","bpLang":"English","bHasAttachment":false,"lwcVarMap":{}};