import { LightningElement, track, api } from "lwc";
// import assets from "@salesforce/resourceUrl/dmvAssets";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import pubsub from "vlocity_ins/pubsub";
import { NavigationMixin } from "lightning/navigation";
export default class DmvProfessionalLicenses extends OmniscriptBaseMixin(
  NavigationMixin(LightningElement)
) {
  // @track imageAssests = assets;
  accountId;
  businesses = [
    // {
    //   Id: "1",
    //   name: "Millions of Miles Porsche",
    //   // image: this.imageAssests + "/Illustrations/businessIllustration.PNG",
    //   addCard: false
    // },
    {
      Id: "1",
      name: "Apply for a new professional license",
      addCard: true
    }
  ];

  navigateNewUrl(event) {
    // let pageSet = event.target.dataset.object;
    // console.log("pageSet", pageSet);
    if (event.target.dataset.buttonlabel === "Manage Submitted Application") {
      this[NavigationMixin.Navigate]({
        type: "standard__namedPage",
        attributes: {
          name: "Salesperson_Application_Submission__c"
        },
        state: {
          c__ContextId: event.target.name,
          c__aid: this.accountId
        }
      });
    } else {
      this[NavigationMixin.Navigate]({
        type: "standard__namedPage",
        attributes: {
          name: "Salesperson_License_Application__c"
        },
        state: {
          c__ContextId: event.target.name,
          c__aid: this.accountId
        }
      });
    }
  }

  detailCloseData = false;
  @track buttonLabel = "Start";
  /**
   * @function launchFlow - Method to Launch Flow when clicked on Create button.
   */
  launchFlow(event) {
    try {
      console.log("Inside Launch Flow");
      let detail = "2";
      this.dispatchEvent(
        new CustomEvent("handlebuttonchange", { detail: { detail } })
      );
    } catch (error) {
      console.error("Error in launchFlow", error);
    }
  }

  /**
   * @function connectedCallback - Method to be called when component is initialized.
   */
  connectedCallback() {
    try {
      // const mitCaseUrl = window.location.href;
      // const newURL = new URL(mitCaseUrl).searchParams;
      // this.accountId = newURL.get("c__ContextId");
      this.getLoggedInUserDetails();
      console.log("Inside Connected Callback - Business Cards");
      pubsub.register("omniscript_action", {
        data: this.handleButtonClick.bind(this)
      });
      // pubsub.register("omniscript_step", {
      //   data: this.handleButtonClick.bind(this)
      // });
    } catch (error) {
      console.error("Error in connectedCallback", error);
    }
  }

  /**
   * @function handleButtonClick - Method called when Event received from the parent component.
   * @param {*} data - Passing the Omniscript component data.
   */
  handleButtonClick(data) {
    try {
      console.log("--- Professional License ---");
      console.log(
        "Professional License Created : ",
        data.isProfessionalLicenseCreated
      );
      console.log("Individual License : ", data.IndivLicId);
      console.log("Account Id  : ", data.accountId);
    } catch (error) {
      console.error("Error in handleButtonClick", error);
    }
  }

  getLoggedInUserDetails() {
    const params = {
      input: {},
      sClassName: "DMVBusinessDetails",
      sMethodName: "getPersonAccountId",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(response, "Current Logged In User : ", response);
        //this.accountId = response.result.success.AccountId;
        this.getProfessionalLicenses(response.result.success.AccountId);
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  }

  getProfessionalLicenses(accountId) {
    try {
      console.log("Account Id  : ", accountId);
      this.accountId = accountId;
      const params = {
        input: { accountId: accountId },
        sClassName: "DMVBusinessDetails",
        sMethodName: "getIndividualLicenceApplication",
        options: {}
      };

      this.omniRemoteCall(params, false)
        .then((response) => {
          window.console.log(response, "DMV Professional Licenses");
          this.businesses = [];
          this.userData = response.result.success;
          console.log("***********************show status", this.userData);
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
            }
          });

          this.businesses.push({
            Id: "1",
            name: "Apply for a new professional license",
            addCard: true
          });

          this.businesses.forEach((element, index) => {
            if (!element.addCard) {
              this.getProgressBarDetails(element.Id, index);
            }
          });
          // this.businesses = [];
          // this.userData = response.result.success;
          // this.userData.forEach((element) => {
          //   let obj = {};
          //   obj.name = element.Name;
          //   obj.addCard = false;
          //   obj.Id = element.AccountId;
          //   obj.data = element;
          //   this.businesses.push(obj);
          //   console.log("businesses 1", this.businesses);
          // });

          // this.businesses.push({
          //   Id: "1",
          //   name: "Add a Company",
          //   addCard: true
          // });
        })
        .catch((error) => {
          window.console.log(error, "error");
        });
    } catch (error) {
      console.log("Error in getProfessionalLicenses : ", error);
    }
  }

  getProgressBarDetails(blaId, index) {
    console.log("BLA Id : ", blaId);
    const params = {
      input: { Individualid: blaId },
      sClassName: "DMV_BusninessLicenseApplication",
      sMethodName: "getProgressDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(
          "***************************************progress bar data",
          response
        );

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

        if (response.result.success) {
          let arr = [];
          let uploadedDocStatus = response.result.success;
          console.log("uploaded data to be checked by us", uploadedDocStatus);
          this.showData = true;
          Object.keys(uploadedDocStatus[0]).map((item) => {
            console.log("in loop", uploadedDocStatus[0][item]);
            if (uploadedDocStatus[0][item] === "Completed") {
              arr.push(uploadedDocStatus[0][item]);
            }
          });
          let progressInteger = 0;
          if (
            uploadedDocStatus[0].Complete_Your_Salesperson_Application_Fo__c ===
            "Completed"
          ) {
            progressInteger = progressInteger + 1;
          }

          if (uploadedDocStatus[0].Schedule_your_Live_Scan__c === "Completed") {
            progressInteger = progressInteger + 1;
          }
          console.log("arr", arr);
          let progressValue = 0;
          progressValue = Math.ceil((progressInteger / 2) * 100);
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
}