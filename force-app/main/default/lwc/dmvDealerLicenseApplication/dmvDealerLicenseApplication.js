import { LightningElement, track, api } from "lwc";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";

export default class DmvBusinessProfileDashboard extends OmniscriptBaseMixin(
  LightningElement
) {
  @api hideProgressBar = false;
  @api uploadedDocStatus;
  @track progressValue = 0;
  @track name;
  @track BLAname;
  @track licenseType;
  @track licenseReference;
  arr = [];

  connectedCallback() {
    const mitCaseUrl = window.location.href;
    const newURL = new URL(mitCaseUrl).searchParams;
    this.accountId = newURL.get("c__aid");
    this.ctxId = newURL.get("c__ContextId");
    const pathName = window.location.pathname;
    if (this.uploadedDocStatus) {
      if (this.uploadedDocStatus && this.uploadedDocStatus[0]) {
        Object.keys(this.uploadedDocStatus[0]).map((i) => {
          if (this.uploadedDocStatus[0][i] === "Complete") {
            this.arr.push(this.uploadedDocStatus[0][i]);
          }
        });
        //   Object.keys(this.uploadedDocStatus[0]).map(i => {
        //     if(this.uploadedDocStatus[0][i] === "Complete") {
        //       this.arr.push(this.uploadedDocStatus[i]);
        //   }
        // });
        this.progressValue = Math.ceil((this.arr.length / 13) * 100);
        console.log("testing API data", this.progressValue);
      }
    }
    if (pathName === "/s/salesperson-application-submission") {
      this.getApplicationLicenseDetails();
      console.log("***************************Tested for license application");
    } else {
      this.getBusinessLicenseDetails();
    }
  }

  getBusinessLicenseDetails() {
    console.log("***result test");
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
        this.userData = response.result.success;
        this.userData.filter((element) => {
          if (element.Id === this.ctxId) {
            this.name = element.AccountName;
            this.BLAname = element.Name;
            this.licenseType = element.LicenseType;
            this.licenseReference = element.LicensePermitName;
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

  getApplicationLicenseDetails() {
    console.log("*************result test", this.ctxId);
    const params = {
      input: { Individualid: this.ctxId },
      sClassName: "DMV_BusninessLicenseApplication",
      sMethodName: "getProgressDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        console.log(response, "Response from Application hub main Card");
        this.userData = response.result.success;
        this.userData.forEach((element) => {
          this.name = element.AccountName;
          this.BLAname = element.Name;
          this.licenseType = element.LicenseType;
          this.licenseReference = element.LicensePermitName.Name;
        });
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
    // getAccountDetails("0013S000002j2LFQAY").then((result)=> {
    //   console.log("***result",result);
    // })
  }
}