import { LightningElement, track } from "lwc";
//import assets from "@salesforce/resourceUrl/dmvAssets";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { NavigationMixin } from "lightning/navigation";

export default class DmvBusinessProfileDashboard extends OmniscriptBaseMixin(
  NavigationMixin(LightningElement)
) {
  //  businessLogo = assets + "/Logos/porsche.PNG";
  @track accountId;
  @track profileData = [];
  @track businessName;
  @track showCheckout = false;

  connectedCallback() {
    const mitCaseUrl = window.location.href;
    const newURL = new URL(mitCaseUrl).searchParams;
    this.accountId = newURL.get("c__ContextId");
    this.getAccountDetails();
    this.getBusinessAccountDetails();

  }
  getAccountDetails() {
    console.log("***result test");
    const params = {
      input: { accountId: this.accountId },
      sClassName: "DMVBusinessDetails",
      sMethodName: "getAccountDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(response, "Response from Profile Dashboard");
        const userData = response.result.success;
        this.businessName = "BusinessName";
        this.businessName = userData.Name;
        this.profileData = [
          { title: "Business owner", body: userData.AccountOwnerName },
          // { title: "Business owner", body: "Username" },
          {
            title: "Mailing Address",
            body:
              userData.ShippingStreet +
              ", " +
              userData.ShippingCity +
              ", " +
              userData.ShippingState +
              " " +
              userData.ShippingPostalCode
          },
          { title: "Telephone Number", body: userData.Phone },
          { title: "Web Address", body: userData.Website }
        ];
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
    // getAccountDetails("0013S000002j2LFQAY").then((result)=> {
    //   console.log("***result",result);
    // })
  }

  launchFlow() {
    let detail = "2";

    const filterChangeEvent = new CustomEvent("handlebuttonchange", {
      detail: { detail },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(filterChangeEvent);
  }

  getBusinessAccountDetails() {
    console.log("***result business test", this.accountId);
    const params = {
      input: { accountId: this.accountId },
      sClassName: "DMVBusinessDetails",
      sMethodName: "getCheckoutDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(response, "response business details");
        if (response.result.success.length > 0)
          this.showCheckout = true;
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  }

  navigateTo() {
    this[NavigationMixin.Navigate]({
      type: "standard__namedPage",
      attributes: {
        name: "business_fee__c"
      },
      state: {
        c__ContextId: this.contextId,
        c__aid: this.accountId
      }
    });
  }
}