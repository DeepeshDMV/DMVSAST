import { LightningElement , track} from "lwc";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import pubsub from "vlocity_ins/pubsub";

export default class DmvSubmissionHub extends  OmniscriptBaseMixin(NavigationMixin(LightningElement)) {
    showData = true;
    progressStatus;
    contentType;
    content;
    caseId;//Added by Divya JC 6/24/2021
    showApplyForHearing=false;//Added by Divya JC 6/24/2021
    dbDisable = false;
    isSalesHub = false;
    downloadUrl;
    docDownloaded = false;
    bShowModal = false;
    @track disableHearingBtn = false;
    getLoggedInUserDetailsNew() {
        const params = {
          input: { BLAid: this.accountId },
          sClassName: "DMV_BusninessLicenseApplication",
          sMethodName: "getSubmissionHubProgressBar",
          options: {}
        };
    
        this.omniRemoteCall(params, false)
          .then((response) => {
            window.console.log("Response from Business Hub", response);
            //this.progressStatus = response.result.success;
            if (response.result.success) {
                this.progressStatus = response.result.success;
              this.showData = true;
            }
            
          })
          .catch((error) => {
            // window.console.log(error, "error");
            // this.showData = true;
          });
      }

      connectedCallback() {
        const mitCaseUrl = window.location.href;
        const newURL = new URL(mitCaseUrl).searchParams;
        this.accountId = newURL.get("c__ContextId");
        this.getLoggedInUserDetailsNew();        
        pubsub.register("omniscript_action", {
            data: this.handleButtonClick.bind(this)
        });
        //this.startFlow();
        console.log('ACC'+this.accountId);
        this.caseId=newURL.get("c__CaseId");
        this.showApplyForHearing=newURL.get("c__ApplyForHearing");
        console.log('CASE'+this.caseId);
        console.log('showApplyForHearing'+this.showApplyForHearing);
        this.dbDisable = false;
        this.startFlow();
      }

    /**
     * @function handleButtonClick - Method called when Event received from the parent component.
     * @param {*} data - Passing the Omniscript component data.
     */
    handleButtonClick(data) {
        try {
        console.log("*step inside handleButtonClick DMV Submission hub",data.paymentUrl);
        console.log("*step inside handleButtonClick");
        // if (data.URLFromService.indexOf("https://") > -1) {
        //     window.location.href = data.URLFromService;
        // } else {
        //     window.location.href = `https://${data.URLFromService}`;
        // }
        window.location.href = data.URLFromService.paymentUrl;
        // let result = data.isAccountCreated ? true : false;
        // if (result) {
        //   this.buttonLabel = "Completed";
        // }
        } catch (error) {
        console.error("Error in handleButtonClick", error);
        }
    }
    closeModal() {    
      this.bShowModal = false;
    }
    downloadFile() {
      //this.dbDisable = true;
      if(this.docDownloaded == true) {
          this.bShowModal = true;
      } else {
        this.bShowModal = false;
        this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
            url: this.downloadUrl
          }
        });

        if(this.isSalesHub != 'true') {
          const mitCaseUrl = window.location.href;
          const newURL = new URL(mitCaseUrl).searchParams;
          this.accountId = newURL.get("c__ContextId");
          const params = {
            input: { BLAid: this.accountId },
            sClassName: "CADMVWallLicenseCallout",
            sMethodName: "updDocDownloaded",
            options: {}
          };
          this.omniRemoteCall(params, false)
            .then((response) => {
              this.docDownloaded = true;
              window.console.log("Response from Business Hub startFlow", response);  
            })
            .catch((error) => {
              console.log('Error-->' + error);
              // this.showData = true;
            });
          }
        }
    }
    startFlow() {      
      const mitCaseUrl = window.location.href;
      const newURL = new URL(mitCaseUrl).searchParams;
      this.accountId = newURL.get("c__ContextId");
      this.isSalesHub = newURL.get("c__isSalesHub");
      if(this.isSalesHub == 'true') {
        console.log('Sales Hub-->' + new URL(mitCaseUrl).hostname);
        this.dbDisable = false;
        //this.downloadUrl = "https://" + new URL(mitCaseUrl).hostname + "/apex/CADMVWallLicensePdf?id=" + this.accountId;
        this.downloadUrl = "https://" + new URL(mitCaseUrl).hostname + "/apex/SPLicenseDownload?id=" + this.accountId;

      } else {
        const params = {
          input: { BLAid: this.accountId },
          sClassName: "CADMVWallLicenseCallout",
          sMethodName: "getDocId",
          options: {}
        };    
        this.omniRemoteCall(params, false)
          .then((response) => {
            window.console.log("Response from Business Hub startFlow", response);             
            if (response.result.downloadUrl) {
              if(response.result.downloadUrl == 'DOWNLOADED') {
                this.docDownloaded = true;              
              } else {          
                this.downloadUrl = response.result.downloadUrl;              
                this.docDownloaded = false;
              }
              this.dbDisable = false;
            } else {
              this.dbDisable = true;
            }
            
          })
          .catch((error) => {
            console.log('Error-->' + error);
            // this.showData = true;
          });
        } 
      }
      handleHearingRequest(event){
        console.log('CASEE'+this.caseId);
        
        const params = {
          input: { recordId: this.caseId },
          sClassName: "DmvSubmissionHub_Ctrl",
          sMethodName: "applyForHearingRequest",
          options: {}
        };
  
        this.omniRemoteCall(params, false)
          .then((data) => {
            console.log(
              "DataFiles line 45" + JSON.stringify(data.result.success));
              var res=JSON.stringify(data.result.success);
              if(data.result.success){
                if(data.result.success === 'Error Date Exceeded 60 days'){
                  this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error!',
                        message: 'Your application was denied more than 60 days ago. You are no longer eligible to submit hearing requests.',
                        variant: 'error',
                    })
                );
                }else if(data.result.success === 'Hearing Request already submitted'){
                  this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error!',
                        message: 'Hearing request already submitted.',
                        variant: 'error',
                    })
                );
                }else{
                  this.disableHearingBtn = true;
                  this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!!',
                        message: 'You have successfully applied for Hearing',
                        variant: 'success',
                    })
                );
                }
              
              }
          })
          .catch((error) => {
            console.log(error);
          });
    
      }
}