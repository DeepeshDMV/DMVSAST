import { LightningElement, track } from "lwc";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { NavigationMixin } from 'lightning/navigation'
// import assets from "@salesforce/resourceUrl/dmvAssets";
import pubsub from "vlocity_ins/pubsub";
export default class DmvBusinessCards extends OmniscriptBaseMixin(NavigationMixin(
  LightningElement
)) {
  // @track imageAssests = assets;
  @track businesses = [
    {
      Id: "1",
      name: "Add a Company",
      addCard: true
    }
  ];

  @track userData;

  @track isCardAvailable = false;

  navigateNewUrl(event) {
    console.log("testing Navigation Mixin", event.target.name);
    
    // console.log("testing",decodeURIComponent(encodeURIComponent(JSON.stringify(event.target.name))));
    // window.location.replace(
    //   "https://cadxpdev-dmvpotdev.cs133.force.com/s/business-detail?param=" +
    //     encodeURIComponent(JSON.stringify(event.target.name))
    // );
    this[NavigationMixin.Navigate]({
      type: 'standard__namedPage',
      attributes: {
          name: "Business_Detail__c",
      },
      state: {
        c__ContextId: event.target.name
      },
  });
  }

  detailCloseData = false;
  @track buttonLabel = "Start";
  /**
   * @function launchFlow - Method to Launch Flow when clicked on Create button.
   */
  launchFlow(event) {
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

  /**
   * @function connectedCallback - Method to be called when component is initialized.
   */
  connectedCallback() {
    try {
      console.log("Inside Connected Callback - Business Cards");
      // loadResource(this, '/resource/1621823445000/dmvAssets');
      pubsub.register("omniscript_action", {
        data: this.handleButtonClick.bind(this)
      });
      this.getLoggedInUserDetails();
    } catch (error) {
      console.error("Error in connectedCallback", error);
    }
  }

  /**
   * @function handleButtonClick - Method called when Event received from the parent component.
   * @param {*} data - Passing the Omniscript component data.
   */
  handleButtonClick(data) {
    // try {
    //   console.log("*step inside handleButtonClick", data);

    //   const params = {
    //     input: {},
    //     sClassName: "DMVBusinessDetails",
    //     sMethodName: "getAccountId",
    //     options: {}
    //   };

    //   // const params = {
    //   //   input: { accountId: data.accountId[0] },
    //   //   sClassName: "DMVBusinessDetails",
    //   //   sMethodName: "getAccountDetails",
    //   //   options: {}
    //   // };

    //   this.omniRemoteCall(params, false)
    //     .then((response) => {
    //       this.businesses = [];
    //       window.console.log(response, "response");
    //       this.userData = response.result.success;
    //       this.isCardAvailable = true;
    //       this.userData.BusinessProfiles.forEach((element) => {
    //         let obj = {};
    //         obj.name = element.BusinessOperatingName;
    //         obj.addCard = false;
    //         obj.Id = this.userData.accountId;
    //         obj.data = this.userData;
    //         this.businesses.push(obj);
    //         console.log("businesses 1", this.businesses);
    //       });

    //       this.businesses.push({
    //         Id: "1",
    //         name: "Apply for a new business license to add a business",
    //         addCard: true
    //       });

    //       console.log("businesses 2", this.businesses);
    //     })
    //     .catch((error) => {
    //       window.console.log(error, "error");
    //     });
    // } catch (error) {
    //   console.error("Error in handleButtonClick", error);
    // }
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
        window.console.log(response, "Response about Current Logged in User");
        this.businesses = [];
        this.userData = response.result.success;
        this.userData.forEach((element) => {
          let obj = {};
          obj.name = element.Name;
          obj.addCard = false;
          obj.Id = element.AccountId;
          obj.data = element;
          this.businesses.push(obj);
          console.log("businesses 1", this.businesses);
        });

        this.businesses.push({
          Id: "1",
          name: "Add a Company",
          addCard: true
        });
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  }
}