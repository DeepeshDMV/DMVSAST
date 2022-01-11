import { LightningElement, track, api } from "lwc";
import pubsub from "vlocity_ins/pubsub";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { NavigationMixin } from "lightning/navigation";
// import assets from "@salesforce/resourceUrl/dmvAssets";
export default class DmvBusinessCards extends OmniscriptBaseMixin(
  NavigationMixin(LightningElement)
) {
  // @track imageAssests = assets;
  @track progressValue = 0;
  arr = [];
  refresh;
  @api uploadedDocStatus;

  businesses = [
    {
      Id: "1",
      name: "Apply for a new business license to add a business",
      addCard: true
    }
  ];

  connectedCallback() {
    try {
      const mitCaseUrl = window.location.href;
      const newURL = new URL(mitCaseUrl).searchParams;
      this.accountId = newURL.get("c__ContextId");
      //this.getBlaStatus();
      // if (this.uploadedDocStatus) {
      //   console.log("BUSINESS LICENSE DASHBOARD : ", this.uploadedDocStatus);
      //   Object.keys(this.uploadedDocStatus[0]).map((i) => {
      //     if (this.uploadedDocStatus[0][i] === "Complete") {
      //       this.arr.push(this.uploadedDocStatus[0][i]);
      //     }
      //   });
      //   //   Object.keys(this.uploadedDocStatus[0]).map(i => {
      //   //     if(this.uploadedDocStatus[0][i] === "Complete") {
      //   //       this.arr.push(this.uploadedDocStatus[i]);
      //   //   }
      //   // });
      //   this.progressValue = Math.ceil((this.arr.length / 17) * 100);
      //   console.log("testing API data", this.progressValue);
      // }

      console.log("Inside Connected Callback - DMV Flow Event Helper");
      pubsub.register("omniscript_action", {
        data: this.handleButtonClick.bind(this)
      });
      pubsub.register("omniscript_step", {
        data: this.handleButtonClick.bind(this)
      });
      this.getBusinessLicenseDetails();
    } catch (error) {
      console.error("Error in connectedCallback", error);
    }
  }

  getBlaStatus(index, blaId) {
    try {
      const params = {
        input: { BLAid: blaId },
        sClassName: "DMV_BusninessLicenseApplication",
        sMethodName: "getBLAStatus",
        options: {}
      };

      this.omniRemoteCall(params, false)
        .then((response) => {
          console.log("bla status in dashboard", response);
          if (response.result.success[0].Status === "Gathering Prerequisites") {
            this.businesses[index].label = "Finish Your Application";
            this.businesses[index] = this.businesses[index];
            // this[NavigationMixin.Navigate]({
            //   type: "standard__namedPage",
            //   attributes: {
            //     name: "Business_Submission__c"
            //   },
            //   state: {
            //     c__ContextId: blaId,
            //     c__aid: this.accountId
            //   }
            // });
          } else {
            this.businesses[index].label = "Manage Submitted Application";
            this.businesses[index] = this.businesses[index];
            // this[NavigationMixin.Navigate]({
            //   type: "standard__namedPage",
            //   attributes: {
            //     name: "Application_Hub__c"
            //   },
            //   state: {
            //     c__ContextId: blaId,
            //     c__aid: this.accountId
            //   }
            // });
          }
          this.refresh = !this.refresh;
        })
        .catch((error) => {
          window.console.log(error, "error");
        });
    } catch (error) {
      console.log("Error in getProfessionalLicenses : ", error);
    }
  }

  handleButtonClick(data) {
    try {
      console.log("Data from Business Licenses", data);
      if (data.OmniScriptSubType === "GenericApplicationInformationLWC") {
        this.businesses = [];
        let obj = {};
        obj.name = data.businessLicenseApplicationName;
        obj.addCard = false;
        obj.Id = data.businessLicenseApplicationId;
        this.businesses.push(obj);
        console.log("businesses 1", this.businesses);
        this.businesses.push({
          Id: "1",
          name: "Apply for a new business license to add a business",
          addCard: true
        });
      }
    } catch (error) {
      console.error("Error in handleButtonClick", error);
    }
  }

  getProgressBarDetails(blaId, index) {
    console.log("Account ID  : ", blaId);
    const params = {
      input: { BLAid: blaId },
      sClassName: "DMV_BusninessLicenseApplication",
      sMethodName: "getProgressBarDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log("Response about Uploaded Docs");
        if (response.result.success) {
          let arr = [];
          let uploadedDocStatus = response.result.success;
          console.log("uploaded data to be checked by us", uploadedDocStatus);
          this.showData = true;
          Object.keys(uploadedDocStatus[0]).map((i) => {
            if (uploadedDocStatus[0][i] === "Complete") {
              arr.push(uploadedDocStatus[0][i]);
            }
          });
          let progressValue = 0;
          progressValue = Math.ceil((arr.length / 13) * 100);
          this.businesses[index].progressValue = progressValue;
          console.log("testing API data", progressValue);
          let businessData = this.businesses;
          this.businesses = null;
          this.businesses = {};
          this.businesses = businessData;
        }
      })
      .catch((error) => {
        window.console.log(error, "error");
        this.showData = true;
      });
  }

  navigateNewUrl(event) {
    //this.getBlaStatus(event.target.name);

    if (event.target.dataset.buttonlabel === "Manage Submitted Application") {
      this[NavigationMixin.Navigate]({
        type: "standard__namedPage",
        attributes: {
          name: "Business_Submission__c"
        },
        state: {
          c__ContextId: event.target.name,
          c__aid: this.accountId,
          c__RegTracFee: event.target.dataset.regtracfee
        }
      });
    } else {
      this[NavigationMixin.Navigate]({
        type: "standard__namedPage",
        attributes: {
          name: "Application_Hub__c"
        },
        state: {
          c__ContextId: event.target.name,
          c__aid: this.accountId
        }
      });
    }
  }

  launchFlow() {
    try {
      console.log("Inside Launch Flow");
      let detail = "1";
      this.dispatchEvent(
        new CustomEvent("handlebuttonchange", { detail: { detail } })
      );
    } catch (error) {
      console.error("Error in launchFlow", error);
    }
  }

  getBusinessLicenseDetails() {
    console.log("***result test - >");
    const params = {
      input: { accountId: this.accountId },
      sClassName: "DMVBusinessDetails",
      sMethodName: "getBusnessLicenceApplication",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(
          response,
          "Response from BusinessLicenseApplication main Card"
        );
        this.businesses = [];
        this.userData = response.result.success;
        this.userData.forEach((element, index) => {
          if (element.AccountName !== "") {
            let obj = {};
            // this.progressValue = 0;
            obj.name = element.Name;
            obj.licenseType = element.LicenseType;
            obj.addCard = false;
            obj.Id = element.Id;
            obj.data = element;
            console.log("Progress Bar Value : ", this.progressValue);
            this.businesses.push(obj);
            console.log("businesses 1", this.businesses);
            // this.getProgressBarDetails(element.Id);
            this.getBlaStatus(index, element.Id);
            this.getRegulatoryTransactionFee(element.Id, index);
          }
        });

        this.businesses.push({
          Id: "1",
          name: "Apply for a new business license to add a business",
          addCard: true
        });

        this.businesses.forEach((element, index) => {
          if (!element.addCard) {
            this.getProgressBarDetails(element.Id, index);
          }
        });
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
    // getAccountDetails("0013S000002j2LFQAY").then((result)=> {
    //   console.log("***result",result);
    // })
  }

  getRegulatoryTransactionFee(blaId, index) {
    try {
      const params = {
        input: { blaId: blaId },
        sClassName: "DMVBusinessDetails",
        sMethodName: "getRegulatoryTrnxFee",
        options: {}
      };

      this.omniRemoteCall(params, false)
        .then((response) => {
          console.log("Regulatory Transaction Fee : ", response);
          // document.location.href = document.location.href + "&c__RegTracFee="+response.result.success[0].Id;
          this.businesses[index].regTracFee = response.result.success[0].Id;
        })
        .catch((error) => {
          window.console.log(error, "error");
        });
    } catch (error) {
      console.log("Error in getProfessionalLicenses : ", error);
    }
  }

  // updateProgressBar() {
  //   if (this.uploadedDocStatus) {
  //     Object.keys(this.uploadedDocStatus[0]).map((i) => {
  //       if (this.uploadedDocStatus[0][i] === "Complete") {
  //         this.arr.push(this.uploadedDocStatus[0][i]);
  //       }
  //     });
  //     //   Object.keys(this.uploadedDocStatus[0]).map(i => {
  //     //     if(this.uploadedDocStatus[0][i] === "Complete") {
  //     //       this.arr.push(this.uploadedDocStatus[i]);
  //     //   }
  //     // });
  //     this.progressValue = Math.ceil((this.arr.length / 17) * 100);
  //     console.log("testing API data", this.progressValue);
  //   }
  // }
}