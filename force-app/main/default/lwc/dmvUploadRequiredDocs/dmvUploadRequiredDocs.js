import { LightningElement, track, api } from "lwc";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import pubsub from "vlocity_ins/pubsub";
export default class DmvUploadRequiredDocs extends OmniscriptBaseMixin(
  LightningElement
) {
  @track accountId = "";
  @api uploadedDocStatus;
  connectedCallback() {
    try {
      console.log("Inside Connected Callback - DMV Flow Event Helper");
      pubsub.register("omniscript_action", {
        data: this.handleButtonClick.bind(this)
      });

      const mitCaseUrl = window.location.href;
      const newURL = new URL(mitCaseUrl).searchParams;
      this.accountId = newURL.get("c__ContextId");
      // pubsub.register("omniscript_step", {
      //   data: this.handleButtonClick.bind(this)
      // });

      this.getLoggedInUserDetails();
    } catch (error) {
      console.error("Error in connectedCallback", error);
    }
  }

  handleButtonClick(data) {
    try {
      console.log("Data from Upload Reauirements n", data);
      let result = data;
      if (data.OmniScriptSubType === "UploadDocuments") {
        this.template
          .querySelector(".dmv-not-started")
          .classList.add("dmv-complete");
        this.template
          .querySelector(".dmv-not-started")
          .classList.remove("dmv-not-started");
      }
      // let newResult = data.isAccountCreated ? true : false;
      // console.log('Received New Result  : ', newResult);
      // this.detailCloseData = null;
      // this.detailCloseData = false;
      // this.detailCloseData = detail;
      this.dispatchEvent(
        new CustomEvent("handlecloseflow", { detail: { result } })
      );
    } catch (error) {
      console.error("Error in handleButtonClick", error);
    }
  }

  getLoggedInUserDetails() {
    const params = {
      input: { BLAid: this.accountId },
      sClassName: "DMV_BusninessLicenseApplication",
      sMethodName: "getProgressBarDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(
          response,
          "Response about Uploaded Docs upload required"
        );
        // this.businesses = [];
        // this.userData = response.result.success;
        // this.userData.forEach((element) => {
        //   let obj = {};
        //   obj.name = element.BusinessOperatingName;
        //   obj.addCard = false;
        //   obj.Id = element.AccountId;
        //   obj.data = element;
        //   this.businesses.push(obj);
        //   console.log("businesses 1", this.businesses);
        // });

        // this.businesses.push({
        //   Id: "1",
        //   name: "Apply for a new business license to add a business",
        //   addCard: true
        // });
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  }

  requiredDocs = [
    {
      relatedList: [],
      title: "Live Scan Receipt",
      description:
        "California requires you to register as a qualified purchaser so you can pay Sales and Use tax on your vehicles.",
      className:
        "dmv-not-started slds-p-horizontal_small slds-p-vertical_xx-small Schedule_your_Live_Scan__c"
    },
    {
      relatedList: [],
      title: "Personal History Questionairre",
      description:
        "Personal history questionnaire is required for each owner named in the application.  It is your personal information relating to employment history, background and criminal convictions.",
      className:
        "dmv-not-started slds-p-horizontal_small slds-p-vertical_xx-small Personal_history_questionairre__c"
    },
    {
      relatedList: [],
      title: "Surety Bond",
      description:
        "California Auto Dealer Surety Bonds are required by the California Department of Motor Vehicles for auto dealers conducting business in the state.",
      className:
        "dmv-not-started slds-p-horizontal_small slds-p-vertical_xx-small Surety_Bond__c"
    },
    {
      relatedList: [],
      title: "Property Use Agreement",
      description:
        "This is required to verify your business location meets all city and county property use requirements.",
      className:
        "dmv-not-started slds-p-horizontal_small slds-p-vertical_xx-small Property_Use_form__c"
    },
    {
      relatedList: [],
      title: "Seller's Permit",
      description:
        "This permit allows you to collect sales tax. It's obtained through the CDTFA. You will need to provide your projected monthly sales, monthly taxable sales and products to be sold.",
      className:
        "dmv-not-started slds-p-horizontal_small slds-p-vertical_xx-small Seller_s_Permit__c"
    },
    {
      relatedList: [],
      title: "Fictitious Name Statement",
      description:
        "You will need this if you are operating under a different name.",
      className:
        "dmv-not-started slds-p-horizontal_small slds-p-vertical_xx-small Fictitious_Name_Statement__c"
    },
    {
      relatedList: [],
      title: "Certificate of Proposed Franchise",
      description:
        "Certificate of Proposed Franchise Agreement must be signed by the Manufacturer or Distributor.  This is an agreement from the Manufacturer or Distributor that they are establishing a franchise with the Dealer.",
      className:
        "dmv-not-started slds-p-horizontal_small slds-p-vertical_xx-small Franchise_Certificate__c"
    }
  ];
  /**
   * @function launchFlow - Method to Launch Flow when clicked on Create button.
   */
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
    console.log("uploadedDocStatus", this.uploadedDocStatus);
    const list = [
      "Schedule_your_Live_Scan__c",
      "Property_Use_form__c",
      "Seller_s_Permit__c",
      "Surety_Bond__c",
      "Fictitious_Name_Statement__c",
      "Personal_history_questionairre__c",
      "Franchise_Certificate__c"
    ];
    // Oject.keys(this.uploadedDocStatus).find((item) => {
    //   item.
    // })
    if (this.uploadedDocStatus && this.uploadedDocStatus[0]) {
    list.find((item) => {
      if (Object.keys(this.uploadedDocStatus[0]).includes(item)) {
        //this.scheduleTraining = this.uploadedDocStatus[0][item];
        if (
          (typeof this.uploadedDocStatus[0][item] === "string" &&
            this.uploadedDocStatus[0][item].toLowerCase() === "complete") ||
          (typeof this.uploadedDocStatus[0][item] === "boolean" &&
            this.uploadedDocStatus[0][item] === true)
        ) {
          this.template.querySelector(`.${item}`).classList.add("dmv-complete");
        } else if (
          (typeof this.uploadedDocStatus[0][item] === "string" &&
            this.uploadedDocStatus[0][item].toLowerCase() === "start") ||
          (typeof this.uploadedDocStatus[0][item] === "boolean" &&
            this.uploadedDocStatus[0][item] === false)
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
        }
      }
    });
  }
  }
}