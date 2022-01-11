import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getDocId from '@salesforce/apex/CADMVWallLicenseCallout.getDocumentId';

export default class CadmvDownloadLicense extends LightningElement {
    currentPageReference = null; 
    urlStateParameters = null;
 
    /* Params from Url */
    contextId = null;
    disabled = false;
    docId = '';
    error = null;
    docUrl="/sfc/servlet.shepherd/document/download/0693S0000000r3zQAA?operationContext=S1";
 
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        console.log('getStateParameters' )  ;  
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          console.log('url params-->' + JSON.stringify(this.urlStateParameters));
          this.setParametersBasedOnUrl();
       }
    }
 
    setParametersBasedOnUrl() {
        this.contextId = this.urlStateParameters.c__ContextId || null;  
        console.log('License Context Id ' +  this.contextId )  ;  
        getDocId({ linkEntityId : this.contextId })
            .then((result) => {
                if(result) {
                    this.docUrl = "/sfc/servlet.shepherd/document/download/"+result+"?operationContext=S1";           
                    this.disabled = false;
                }
                else {
                    this.disabled = true;
                }
            })
            .catch((error) => {
                this.error = error;   
                this.disabled = true;             
            });
    }

    downloadLicense() {
        console.log("donwload license");
        window.open(this.docUrl);
    }
}