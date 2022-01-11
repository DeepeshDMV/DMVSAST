export const OMNIDEF = {"userTimeZone":-420,"userProfile":"System Administrator","userName":"rgurubasappa@deloitte.com.dmvol.dev","userId":"0053d000000aobMAAQ","userCurrencyCode":"USD","timeStamp":"2021-10-28T01:37:14.499Z","sOmniScriptId":"a3f3S0000000pL2QAI","sobjPL":{},"RPBundle":"","rMap":{},"response":null,"propSetMap":{"stepChartPlacement":"right","stylesheet":{"lightning":"","newport":""},"disableUnloadWarn":true,"errorMessage":{"custom":[]},"consoleTabIcon":"custom:custom18","consoleTabTitle":null,"rtpSeed":false,"showInputWidth":false,"currencyCode":"","autoFocus":false,"pubsub":false,"message":{},"ssm":false,"wpm":false,"consoleTabLabel":"New","cancelRedirectTemplateUrl":"https://attestlpi.force.com/s/file-a-complaint","cancelRedirectPageName":"https://attestlpi.force.com/s/file-a-complaint","cancelSource":"https://attestlpi.force.com/s/file-a-complaint","allowCancel":false,"cancelType":"URL","visualforcePagesAvailableInPreview":{},"hideStepChart":false,"timeTracking":false,"knowledgeArticleTypeQueryFieldsMap":{},"lkObjName":null,"bLK":false,"enableKnowledge":false,"trackingCustomData":{},"seedDataJSON":{},"elementTypeToHTMLTemplateMapping":{},"autoSaveOnStepNext":false,"saveURLPatterns":{},"saveObjectId":"%ContextId%","saveContentEncoded":false,"saveForLaterRedirectTemplateUrl":"vlcSaveForLaterAcknowledge.html","saveForLaterRedirectPageName":"sflRedirect","saveExpireInDays":null,"saveNameTemplate":null,"allowSaveForLater":false,"persistentComponent":[{"modalConfigurationSetting":{"modalSize":"lg","modalController":"ModalProductCtrl","modalHTMLTemplateId":"vlcProductConfig.html"},"itemsKey":"cartItems","id":"vlcCart","responseJSONNode":"","responseJSONPath":"","sendJSONNode":"","sendJSONPath":"","postTransformBundle":"","preTransformBundle":"","remoteOptions":{"postTransformBundle":"","preTransformBundle":""},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","label":"","render":false},{"modalConfigurationSetting":{"modalSize":"lg","modalController":"","modalHTMLTemplateId":""},"itemsKey":"knowledgeItems","id":"vlcKnowledge","postTransformBundle":"","preTransformBundle":"","remoteOptions":{"postTransformBundle":"","preTransformBundle":""},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","label":"","render":false}]},"prefillJSON":"{}","lwcId":"3e669251-c375-7306-bd56-f77daebb846f","labelMap":{"FileUpload":"ComplaintSubmitted:FileUpload","Thank":"ComplaintSubmitted:Thank","MobileNumber":"Complaint:MobileNumber","Email":"Complaint:Email","LastName":"Complaint:LastName","FirstName":"Complaint:FirstName","YourInfo":"Complaint:YourInfo","LineBreak2":"Complaint:LineBreak2","Description":"Complaint:Description","Title":"Complaint:Title","IncidentDate":"Complaint:IncidentDate","Issue":"Complaint:Issue","complaintDetails":"Complaint:complaintDetails","LineBreak1":"Complaint:LineBreak1","Zipcode":"Complaint:Zipcode","State":"Complaint:State","City":"Complaint:City","AddressLine2":"Complaint:AddressLine2","AddressLine1":"Complaint:AddressLine1","AccountName":"Complaint:AccountName","AccountInfo":"Complaint:AccountInfo","ComplaintSubmitted":"ComplaintSubmitted","PublicComplaintId":"PublicComplaintId","SubmitComplaint":"SubmitComplaint","Complaint":"Complaint","SetContext":"SetContext"},"labelKeyMap":{},"errorMsg":"","error":"OK","dMap":{},"depSOPL":{},"depCusPL":{},"cusPL":{},"children":[{"type":"Set Values","propSetMap":{"disOnTplt":false,"label":"setContext","pubsub":false,"message":{},"ssm":false,"wpm":false,"HTMLTemplateId":"","show":null,"showPersistentComponent":[false,false],"elementValueMap":{"ComplaintStatus":"Submitted","columns":{"Address":"Address","BusinessTypeName":"Business Type","AccountName":"Account Name"}},"controlWidth":12,"aggElements":{}},"offSet":0,"name":"SetContext","level":0,"indexInParent":0,"bHasAttachment":false,"bEmbed":false,"bSetValues":true,"JSONPath":"SetContext","lwcId":"lwc0"},{"type":"Step","propSetMap":{"disOnTplt":false,"message":{},"pubsub":false,"ssm":false,"wpm":false,"errorMessage":{"default":null,"custom":[]},"allowSaveForLater":true,"label":"Complaint Information","chartLabel":null,"instructionKey":"","HTMLTemplateId":"","conditionType":"Hide if False","show":null,"knowledgeOptions":{"typeFilter":"","remoteTimeout":30000,"dataCategoryCriteria":"","keyword":"","publishStatus":"Online","language":"English"},"remoteOptions":{},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","showPersistentComponent":[false,false],"instruction":"","completeMessage":"Are you sure you want to complete the script?","completeLabel":"Complete","saveMessage":"Are you sure you want to save it for later?","saveLabel":"Save for later","cancelMessage":"Are you sure?","cancelLabel":"Cancel","nextWidth":3,"nextLabel":"Next","previousWidth":3,"previousLabel":"Previous","validationRequired":true,"uiElements":{"Complaint":"","AccountName":"","AddressLine1":"","AddressLine2":"","City":"","State":"","Zipcode":"","Issue":"","IncidentDate":"","Title":"","Description":"","FirstName":"","LastName":"","Email":"","MobileNumber":""},"aggElements":{}},"offSet":0,"name":"Complaint","level":0,"indexInParent":1,"bHasAttachment":false,"bEmbed":false,"response":null,"inheritShowProp":null,"children":[{"response":null,"level":1,"indexInParent":0,"eleArray":[{"type":"Headline","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"label":"<h3><strong>Business or Individual details</strong></h3>","labelKey":"","HTMLTemplateId":"","show":null,"controlWidth":12},"name":"AccountInfo","level":1,"JSONPath":"Complaint:AccountInfo","indexInParent":0,"index":0,"children":[],"bHasAttachment":false,"lwcId":"lwc10-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":1,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"label":"What is the name of the business?","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":"","readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"controlWidth":12},"name":"AccountName","level":1,"JSONPath":"Complaint:AccountName","indexInParent":1,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc11-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":2,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"placeholder":"","maxLength":250,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"label":"Address Line 1","controlWidth":6},"name":"AddressLine1","level":1,"JSONPath":"Complaint:AddressLine1","indexInParent":2,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc12-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":3,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"controlWidth":6,"label":"Address Line 2","showInputWidth":false,"inputWidth":12,"required":false,"repeat":false,"repeatClone":false,"repeatLimit":null,"readOnly":false,"defaultValue":null,"help":false,"helpText":"","mask":"","pattern":"","ptrnErrText":"","minLength":0,"maxLength":250,"placeholder":"","show":null,"conditionType":"Hide if False","accessibleInFutureSteps":false,"debounceValue":0,"HTMLTemplateId":"","hide":false,"disOnTplt":false},"name":"AddressLine2","level":1,"JSONPath":"Complaint:AddressLine2","indexInParent":3,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc13-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":4,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"placeholder":"","maxLength":100,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"label":"City","controlWidth":4},"name":"City","level":1,"JSONPath":"Complaint:City","indexInParent":4,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc14-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":5,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"controlWidth":4,"label":"State","showInputWidth":false,"inputWidth":12,"required":false,"repeat":false,"repeatClone":false,"repeatLimit":null,"readOnly":false,"defaultValue":null,"help":false,"helpText":"","mask":"","pattern":"","ptrnErrText":"","minLength":0,"maxLength":40,"placeholder":"","show":null,"conditionType":"Hide if False","accessibleInFutureSteps":false,"debounceValue":0,"HTMLTemplateId":"","hide":false,"disOnTplt":false},"name":"State","level":1,"JSONPath":"Complaint:State","indexInParent":5,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc15-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":6,"eleArray":[{"type":"Number","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"mask":"99999","placeholder":"","ptrnErrText":"","pattern":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"label":"Zipcode","controlWidth":4},"name":"Zipcode","level":1,"JSONPath":"Complaint:Zipcode","indexInParent":6,"index":0,"children":[],"bHasAttachment":false,"bNumber":true,"lwcId":"lwc16-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":7,"eleArray":[{"type":"Line Break","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"label":"LineBreak1","HTMLTemplateId":"","show":null,"padding":25},"name":"LineBreak1","level":1,"JSONPath":"Complaint:LineBreak1","indexInParent":7,"index":0,"children":[],"bHasAttachment":false,"bLineBreak":true,"lwcId":"lwc17-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":8,"eleArray":[{"type":"Headline","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"sanitize":false,"label":"<h3><strong>Complaint Details</strong></h3>","labelKey":"","HTMLTemplateId":"","show":null,"controlWidth":12},"name":"complaintDetails","level":1,"JSONPath":"Complaint:complaintDetails","indexInParent":8,"index":0,"children":[],"bHasAttachment":false,"lwcId":"lwc18-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":9,"eleArray":[{"type":"Select","rootIndex":1,"response":null,"propSetMap":{"label":"Select a category...","disOnTplt":false,"hide":false,"HTMLTemplateId":"","accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"controllingField":{"type":"SObject","source":"","element":""},"optionSource":{"source":"PublicComplaint.ComplaintType","type":""},"options":[{"value":"Safety","name":"Safety"}],"helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"controlWidth":6},"name":"Issue","level":1,"JSONPath":"Complaint:Issue","indexInParent":9,"index":0,"children":[],"bHasAttachment":false,"bSelect":true,"lwcId":"lwc19-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":10,"eleArray":[{"type":"Date","rootIndex":1,"response":null,"propSetMap":{"label":"Incident Date","maxDate":"today","minDate":"","disOnTplt":false,"hide":false,"HTMLTemplateId":"","accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"dateFormat":"MM/dd/yyyy","modelDateFormat":"MM/dd/yyyy","dateType":"string","helpText":"","help":false,"defaultValue":"today","readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":true,"inputWidth":12,"showInputWidth":false,"controlWidth":6},"name":"IncidentDate","level":1,"JSONPath":"Complaint:IncidentDate","indexInParent":10,"index":0,"children":[],"bHasAttachment":false,"bDate":true,"lwcId":"lwc110-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":11,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"label":"Title","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":true,"inputWidth":12,"showInputWidth":false,"controlWidth":12},"name":"Title","level":1,"JSONPath":"Complaint:Title","indexInParent":11,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc111-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":12,"eleArray":[{"type":"Text Area","rootIndex":1,"response":null,"propSetMap":{"label":"Description","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"controlWidth":12},"name":"Description","level":1,"JSONPath":"Complaint:Description","indexInParent":12,"index":0,"children":[],"bHasAttachment":false,"bTextarea":true,"lwcId":"lwc112-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":13,"eleArray":[{"type":"Line Break","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"label":"LineBreak1","HTMLTemplateId":"","show":null,"padding":25},"name":"LineBreak2","level":1,"JSONPath":"Complaint:LineBreak2","indexInParent":13,"index":0,"children":[],"bHasAttachment":false,"bLineBreak":true,"lwcId":"lwc113-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":14,"eleArray":[{"type":"Headline","rootIndex":1,"response":null,"propSetMap":{"disOnTplt":false,"label":"<h3><strong>Your&nbsp;Details (Optional)</strong></h3>","labelKey":"","HTMLTemplateId":"","show":null,"controlWidth":12},"name":"YourInfo","level":1,"JSONPath":"Complaint:YourInfo","indexInParent":14,"index":0,"children":[],"bHasAttachment":false,"lwcId":"lwc114-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":15,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"label":"First Name","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"controlWidth":6},"name":"FirstName","level":1,"JSONPath":"Complaint:FirstName","indexInParent":15,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc115-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":16,"eleArray":[{"type":"Text","rootIndex":1,"response":null,"propSetMap":{"label":"Last Name","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"controlWidth":6},"name":"LastName","level":1,"JSONPath":"Complaint:LastName","indexInParent":16,"index":0,"children":[],"bHasAttachment":false,"bText":true,"lwcId":"lwc116-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":17,"eleArray":[{"type":"Email","rootIndex":1,"response":null,"propSetMap":{"label":"Email","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"ptrnErrText":"","pattern":"","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"controlWidth":6},"name":"Email","level":1,"JSONPath":"Complaint:Email","indexInParent":17,"index":0,"children":[],"bHasAttachment":false,"bEmail":true,"lwcId":"lwc117-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":18,"eleArray":[{"type":"Telephone","rootIndex":1,"response":null,"propSetMap":{"label":"Mobile Number","disOnTplt":false,"hide":false,"HTMLTemplateId":"","debounceValue":0,"accessibleInFutureSteps":false,"conditionType":"Hide if False","show":null,"maxLength":255,"minLength":0,"ptrnErrText":"","pattern":"","mask":"(999) 999-9999","helpText":"","help":false,"defaultValue":null,"readOnly":false,"repeatLimit":null,"repeatClone":false,"repeat":false,"required":false,"inputWidth":12,"showInputWidth":false,"controlWidth":6},"name":"MobileNumber","level":1,"JSONPath":"Complaint:MobileNumber","indexInParent":18,"index":0,"children":[],"bHasAttachment":false,"bTelephone":true,"lwcId":"lwc118-0"}],"bHasAttachment":false}],"bAccordionOpen":false,"bAccordionActive":false,"bStep":true,"isStep":true,"JSONPath":"Complaint","lwcId":"lwc1"},{"type":"DataRaptor Post Action","propSetMap":{"disOnTplt":false,"enableActionMessage":false,"enableDefaultAbort":false,"errorMessage":{"default":null,"custom":[]},"label":"SubmitComplaint","pubsub":false,"message":{},"ssm":false,"wpm":false,"HTMLTemplateId":"","show":null,"showPersistentComponent":[false,false],"redirectPreviousWidth":3,"redirectPreviousLabel":"Previous","redirectNextWidth":3,"redirectNextLabel":"Next","redirectTemplateUrl":"vlcAcknowledge.html","redirectPageName":"Debug","validationRequired":"Submit","failureAbortMessage":"Are you sure?","failureGoBackLabel":"Go Back","failureAbortLabel":"Abort","failureNextLabel":"Continue","postMessage":"Done","inProgressMessage":"In Progress","sendJSONNode":"","sendJSONPath":"","postTransformBundle":"","remoteTimeout":30000,"bundle":"DRSubmitComplaint2","controlWidth":12,"aggElements":{}},"offSet":0,"name":"SubmitComplaint","level":0,"indexInParent":2,"bHasAttachment":false,"bEmbed":false,"bDataRaptorPostAction":true,"JSONPath":"SubmitComplaint","lwcId":"lwc2"},{"type":"DataRaptor Extract Action","propSetMap":{"disOnTplt":false,"enableActionMessage":false,"enableDefaultAbort":false,"errorMessage":{"default":null,"custom":[]},"label":"PublicComplaintId","pubsub":false,"message":{},"ssm":false,"wpm":false,"HTMLTemplateId":"","show":null,"showPersistentComponent":[false,false],"redirectPreviousWidth":3,"redirectPreviousLabel":"Previous","redirectNextWidth":3,"redirectNextLabel":"Next","redirectTemplateUrl":"vlcAcknowledge.html","redirectPageName":"","validationRequired":null,"failureAbortMessage":"Are you sure?","failureGoBackLabel":"Go Back","failureAbortLabel":"Abort","failureNextLabel":"Continue","postMessage":"Done","inProgressMessage":"In Progress","responseJSONNode":"","responseJSONPath":"","remoteTimeout":30000,"dataRaptor Input Parameters":[{"inputParam":"publicComplaintId","element":"DRId_PublicComplaint"}],"bundle":"DRGetPublicComplaintId","controlWidth":12,"aggElements":{}},"offSet":0,"name":"PublicComplaintId","level":0,"indexInParent":3,"bHasAttachment":false,"bEmbed":false,"bDataRaptorExtractAction":true,"JSONPath":"PublicComplaintId","lwcId":"lwc3"},{"type":"Step","propSetMap":{"disOnTplt":false,"errorMessage":{"default":null,"custom":[]},"allowSaveForLater":true,"label":"Receive confirmation","chartLabel":null,"instructionKey":"","HTMLTemplateId":"","conditionType":"Hide if False","show":null,"knowledgeOptions":{"typeFilter":"","remoteTimeout":30000,"dataCategoryCriteria":"","keyword":"","publishStatus":"Online","language":"English"},"remoteOptions":{},"remoteTimeout":30000,"remoteMethod":"","remoteClass":"","showPersistentComponent":[false,false],"instruction":"","completeMessage":"Are you sure you want to complete the script?","completeLabel":"Complete","saveMessage":"Are you sure you want to save it for later?","saveLabel":"Save for later","cancelMessage":"Are you sure to navigate to home?","cancelLabel":"Go Home","nextWidth":"0","nextLabel":"Next","previousWidth":0,"previousLabel":"Previous","validationRequired":true,"uiElements":{"ComplaintSubmitted":"","FileUpload":""},"aggElements":{}},"offSet":0,"name":"ComplaintSubmitted","level":0,"indexInParent":4,"bHasAttachment":false,"bEmbed":false,"response":null,"inheritShowProp":null,"children":[{"response":null,"level":1,"indexInParent":0,"eleArray":[{"type":"Text Block","rootIndex":4,"response":null,"propSetMap":{"disOnTplt":false,"sanitize":false,"label":"Thank you Text","textKey":"","HTMLTemplateId":"","dataJSON":false,"show":null,"text":"<div class=\"slds-illustration slds-illustration_small pc-message-container\">\n<div class=\"slds-text-longform\"><span class=\"success-icon\">&nbsp;</span>\n<h3 class=\"slds-text-heading_medium\">Your complaint against %Complaint:AccountName% was submitted.</h3>\n<p class=\"slds-text-body_regular\">The complaint number is <strong>%publicComplaintName%</strong>.</p>\n<p></p>\n<!-- <p><button class=\"slds-button slds-button_neutral\"> <a href=\"../s/file-a-complaint\" target=\"_top\" style=\"display: block; text-decoration: none;\">File Another Complaint</a> </button></p> --></div>\n</div>\n<div class=\"slds-size--1-of-1 slds-medium-size--12-of-12 button-container\">\n<div class=\"slds-grid slds-wrap slds-grid--pull-padded vlc-slds-small--size-column\" style=\"justify-content: space-between;\">\n<div class=\"slds-size--1-of-1 slds-medium-size--2-of-12 vlc-slds-remote-action--button\">\n<p><button class=\"slds-button slds-button_neutral\"> <a href=\"../s\" target=\"_top\" style=\"display: block; text-decoration: none;\">Go To Home</a> </button></p>\n</div>\n<div class=\"slds-size--1-of-1 slds-medium-size--3-of-12 vlc-slds-remote-action--button button-right\">\n<p><button class=\"slds-button slds-button_neutral\"> <a href=\"../s/file-a-complaint\" target=\"_top\" style=\"display: block; text-decoration: none;\">File Another Complaint</a> </button></p>\n</div>\n</div>\n</div>","controlWidth":12},"name":"Thank","level":1,"JSONPath":"ComplaintSubmitted:Thank","indexInParent":0,"index":0,"children":[],"bHasAttachment":false,"bTextBlock":true,"lwcId":"lwc40-0"}],"bHasAttachment":false},{"response":null,"level":1,"indexInParent":1,"eleArray":[{"type":"File","rootIndex":4,"response":null,"propSetMap":{"errorMessage":{"default":null,"custom":[]},"remoteOptions":{},"remoteMethod":"","remoteClass":"","extraPayload":{},"contentParentId":["%DRId_PublicComplaint%"],"uploadContDoc":true,"HTMLTemplateId":"","conditionType":"Hide if False","show":null,"helpText":"","help":false,"label":"Attach files that support your complaint.","controlWidth":12},"name":"FileUpload","level":1,"JSONPath":"ComplaintSubmitted:FileUpload","indexInParent":1,"index":0,"children":[],"bHasAttachment":true,"bFile":true,"lwcId":"lwc41-0"}],"bHasAttachment":true}],"bAccordionOpen":false,"bAccordionActive":false,"bStep":true,"isStep":true,"JSONPath":"ComplaintSubmitted","lwcId":"lwc4"}],"bReusable":false,"bpVersion":2,"bpType":"Complaints","bpSubType":"PublicComplaint","bpLang":"English","bHasAttachment":false,"lwcVarMap":{}};