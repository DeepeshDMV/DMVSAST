import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { NavigationMixin } from "lightning/navigation";

export default class DmvYourApplicationFees extends OmniscriptBaseMixin(
  NavigationMixin(LightningElement)
) {
  @api progressStatus;
  accountId;
  enablePaymentButton;
  isSalesHub;
  label;
    startFlow() {
        console.log("startflow called");
    }

    connectedCallback() {
      const mitCaseUrl = window.location.href;
      const newURL = new URL(mitCaseUrl).searchParams;
      this.accountId = newURL.get("c__ContextId");
      this.isSalesHub = newURL.get("c__isSalesHub");
      console.log("context id====", this.accountId);
      if(this.isSalesHub !== "true"){
        this.enablePaymentButton = true;
        this.label = "Your fees are based on the type of license you selected and applicable fees.  After payment is made, we will begin review of your application.";//"Fees are based on your selections and due after you submit your application. After payment, we will begin to review your application."
        this.getBlaStatus();
      }
      this.getRegulatoryTransactionFee();
    }

    getBlaStatus(){
      try {
        const params = {
          input: {"BLAid": this.accountId},
          sClassName: "DMV_BusninessLicenseApplication",
          sMethodName: "getBLAStatus",
          options: {}
        };
    
        this.omniRemoteCall(params, false)
          .then((response) => {
            console.log("bla status", response);
            if(response.result.success[0].Status === "Submitted") {
              this.enablePaymentButton = true;
              this.label = "Fees are based on your selections and due after you submit your application. After payment, we will begin to review your application."
            } else {
              this.enablePaymentButton = false;
              this.label = "Fees are based on your selections and due after you submit your application. After payment, we will begin to review your application."
            }
          }).catch((error) => {
            window.console.log(error, "error");
          });
        } catch (error) {
          console.log('Error in getProfessionalLicenses : ',error);
        }
      }
      
      getRegulatoryTransactionFee(){
      try {
        const params = {
          input: {blaId: this.accountId},
          sClassName: "DMVBusinessDetails",
          sMethodName: "getRegulatoryTrnxFee",
          options: {}
        };
    
        this.omniRemoteCall(params, false)
          .then((response) => {
            console.log("Regulatory Transaction Fee : ", response);
            // document.location.href = document.location.href + "&c__RegTracFee="+response.result.success[0].Id;
          }).catch((error) => {
            window.console.log(error, "error");
          });
        } catch (error) {
          console.log('Error in getProfessionalLicenses : ',error);
        }
      }

    launchFlow(event) {
        try {
          console.log("Inside Launch Flow");
          let detail = "1";
    
          const filterChangeEvent = new CustomEvent("handlebuttonchange", {
            detail: { detail },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(filterChangeEvent);
        } catch (error) {
          console.error("Error in launchFlow", error);
        }
      }

      renderedCallback() {
        console.log("progressStatus api", this.progressStatus);
        const list = ["Your_Application_Fees__c"];
        if (this.progressStatus && this.progressStatus[0]) {
        list.find((item) => {
          if (Object.keys(this.progressStatus[0]).includes(item)) {
            //this.scheduleTraining = this.uploadedDocStatus[0][item];
            if (this.progressStatus[0][item].toLowerCase() === "completed") {
              this.template.querySelector(`.${item}`).classList.add("dmv-complete");
            }  else if (
              this.progressStatus[0][item].toLowerCase() === "start"
            ) {
              this.template
                .querySelector(`.${item}`)
                .classList.add("dmv-in-progress");
            } else {
              this.template
                .querySelector(`.${item}`)
                .classList.add("dmv-not-started");
            }
          } else {
            this.template
              .querySelector(`.${item}`)
              .classList.add("dmv-not-started");
          }
        });
      }
      }
}