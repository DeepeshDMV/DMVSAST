import { LightningElement, api } from "lwc";

export default class DmvScheduleLiveScan extends LightningElement {
  @api uploadedDocStatus;
  startFlow() {
    console.log("startflow called");
    this.template.querySelector("c-dmv-start-flow").startLiveScanFlow();
  }

  renderedCallback() {
    console.log("uploadedDocStatus", this.uploadedDocStatus);
    const list = ["Live_Scan_Status__c"];
    if (this.uploadedDocStatus && this.uploadedDocStatus[0]) {
    list.find((item) => {
      if (Object.keys(this.uploadedDocStatus[0]).includes(item)) {
        //this.scheduleTraining = this.uploadedDocStatus[0][item];
        if (this.uploadedDocStatus[0][item].toLowerCase() === "complete") {
          this.template.querySelector(`.${item}`).classList.add("dmv-complete");
        } else if (
          this.uploadedDocStatus[0][item].toLowerCase() === "not started"
        ) {
          this.template
            .querySelector(`.${item}`)
            .classList.add("dmv-not-started");
        } else if (
          this.uploadedDocStatus[0][item].toLowerCase() === "in progress"
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