import { LightningElement, track } from "lwc";
// import {getAccountDetails} from "vlocity_ins/DMVBusinessDetails";
// import { getNamespaceDotNotation } from "vlocity_ins/omniscriptInternalUtils";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
// import {deepCopy, getDMVData, setDMVData} from "c/dmvUtility"

export default class DmvApplicationHub extends OmniscriptBaseMixin(
  LightningElement
) {
  //@track dmvData;
  //@track progressValue = 25;
  //@track disabled = true;

  @track accountId;
  uploadedDocStatus;
  showData = false;
  requiredDocs = [
    {
      relatedList: [],
      title: "Property Use form",
      description:
        "This is required to verify your business location meets all city and county property use requirements."
    },
    {
      relatedList: [],
      title: "Seller's Permit",
      description:
        "This permit allows you to collect sales tax. It's obtained through the CDTFA. You will need to provide your projected monthly sales, monthly taxable sales and products to be sold."
    },
    {
      relatedList: [],
      title: "Surety Bond",
      description:
        "California Auto Dealer Surety Bonds are required by the California Department of Motor Vehicles for auto dealers conducting business in the state."
    },
    {
      relatedList: [],
      title: "CDTFA Permit",
      description:
        "California requires you to register as a qualified purchaser so you can pay Sales and Use tax on your vehicles."
    },
    {
      relatedList: [],
      title: "Fictitious Name Statement",
      description:
        "You will need this if you are operating under a different name."
    }
  ];
  connectedCallback() {
    const mitCaseUrl = window.location.href;
    const newURL = new URL(mitCaseUrl).searchParams;
    this.accountId = newURL.get("c__ContextId");
    console.log("Inside ConnectedCallBack apHub");
    this.getAccountDetails();
    this.getLoggedInUserDetailsNew();
  }

  getLoggedInUserDetailsNew() {
    const params = {
      input: { BLAid: this.accountId },
      sClassName: "DMV_BusninessLicenseApplication",
      sMethodName: "getProgressBarDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log("Response about Uploaded Docs from Application Hub");
        if (response.result.success) {
          this.uploadedDocStatus = response.result.success;
          this.showData = true;
        }
        
      })
      .catch((error) => {
        window.console.log(error, "error");
        this.showData = true;
      });
  }
  getAccountDetails() {
    console.log("***result test");
    const params = {
      input: { accountId: "0013S000002j2LFQAY" },
      sClassName: "DMVBusinessDetails",
      sMethodName: "getAccountDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(response, "response");
        // this.dmvData = deepCopy(response);
        // setDMVData(this.dmvData);
        // console.log("GET DMV DATA : ", getDMVData());
        // localStorage.setItem("businessLicenseDetails",response);
        // console.log('OUTPUT : ', JSON.parse(JSON.stringify(localStorage.getItem("businessLicenseDetails"))));
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
    // getAccountDetails("0013S000002j2LFQAY").then((result)=> {
    //   console.log("***result",result);
    // })
  }

  getLoggedInUserDetails() {
    const params = {
      input: {},
      sClassName: "DMVBusinessDetails",
      sMethodName: "getAccountId",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(
          response,
          "Response about Current Logged in User from App Hub "
        );
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  }
}