import { LightningElement, track } from "lwc";
// import {getAccountDetails} from "vlocity_ins/DMVBusinessDetails";
// import { getNamespaceDotNotation } from "vlocity_ins/omniscriptInternalUtils";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
// import {deepCopy, getDMVData, setDMVData} from "c/dmvUtility"

export default class DmvApplicationHub extends OmniscriptBaseMixin(
  LightningElement
) {
  @track progressValue = 25;
  @track name = "Millions of Miles Porsche";
  accountId = "";
  accountName;
  updatedStatus;
  arr = [];
  launchFlow(event) {
    try {
      console.log("Inside Launch Flow");
      let detail = event.target.dataset.sequence;
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

  startScheduleScan() {
    const filterChangeEvent = new CustomEvent("schedulescan", {
      detail: {},
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(filterChangeEvent);
  }

  connectedCallback() {
    const mitCaseUrl = window.location.href;
    const newURL = new URL(mitCaseUrl).searchParams;
    this.accountId = newURL.get("c__ContextId");
    this.getLoggedInUserDetailsNew();
  }

  getLoggedInUserDetailsNew() {
    const params = {
      input: { Individualid: this.accountId },
      sClassName: "DMV_BusninessLicenseApplication",
      sMethodName: "getProgressDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(
          "Response about Uploaded Docs from Salesperson License Hub"
        );
        if (response.result.success) {
          this.updatedStatus = response.result.success;
          this.accountName = response.result.success[0].Account.Name;
          console.log(
            JSON.parse(JSON.stringify("check data", this.updatedStatus))
          );
          this.showData = true;

          Object.keys(this.updatedStatus[0]).map((i) => {
            if (this.updatedStatus[0][i] === "Completed") {
              this.arr.push(this.updatedStatus[0][i]);
            }
          });
          //   Object.keys(this.uploadedDocStatus[0]).map(i => {
          //     if(this.uploadedDocStatus[0][i] === "Complete") {
          //       this.arr.push(this.uploadedDocStatus[i]);
          //   }
          // });

          let progressInteger = 0;
          if (
            this.updatedStatus[0]
              .Complete_Your_Salesperson_Application_Fo__c === "Completed"
          ) {
            progressInteger = progressInteger + 1;
          }

          if (
            this.updatedStatus[0].Schedule_your_Live_Scan__c === "Completed"
          ) {
            progressInteger = progressInteger + 1;
          }
          this.progressValue = Math.ceil((progressInteger / 2) * 100);

          const list = [
            "Schedule_your_Live_Scan__c",
            "Complete_Your_Salesperson_Application_Fo__c"
          ];
          if (this.updatedStatus && this.updatedStatus[0]) {
            list.find((item) => {
              if (Object.keys(this.updatedStatus[0]).includes(item)) {
                //this.scheduleTraining = this.uploadedDocStatus[0][item];
                if (this.updatedStatus[0][item].toLowerCase() === "completed") {
                  this.template
                    .querySelector(`.${item}`)
                    .classList.add("dmv-complete");
                } else if (
                  this.updatedStatus[0][item].toLowerCase() === "not started"
                ) {
                  this.template
                    .querySelector(`.${item}`)
                    .classList.add("dmv-not-started");
                } else if (
                  this.updatedStatus[0][item].toLowerCase() === "in progress"
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
      })
      .catch((error) => {
        window.console.log(error, "error");
        this.showData = true;
      });
  }
}