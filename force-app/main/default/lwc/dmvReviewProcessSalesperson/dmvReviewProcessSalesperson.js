import { LightningElement, api } from "lwc";

export default class DmvReviewProcess extends LightningElement {
  @api progressStatus;
  boolCaseStatusDenied = false;
  startFlow() {
    console.log("startflow called");
  }
  steps = [
    { label: "Contacted", value: "step-1" },
    { label: "Open", value: "step-2" },
    { label: "Review Step 3", value: "step-3" },
    { label: "Complete", value: "step-4" }
  ];

  connectedCallback() {
    console.log("connectd progressStatus api", this.progressStatus);
  }

  renderedCallback() {
    console.log("progressStatus api", this.progressStatus);
    const list = ["Review_Process__c"];
    if (this.progressStatus && this.progressStatus[0]) {
      list.find((item) => {
        if (Object.keys(this.progressStatus[0]).includes(item)) {
          //this.scheduleTraining = this.uploadedDocStatus[0][item];
          if (this.progressStatus[0][item].toLowerCase() === "completed") {
            this.template
              .querySelector(`.${item}`)
              .classList.add("dmv-complete");
          } else if (this.progressStatus[0][item].toLowerCase() === "start") {
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
    //   if (this.progressStatus && this.progressStatus[0]) {
    //     if(this.progressStatus[0].ApplicationCase.Status != null &&
    //       this.progressStatus[0].ApplicationCase.Status === 'Denied')
    //       this.boolCaseStatusDenied = true;
    //   }
  }
}