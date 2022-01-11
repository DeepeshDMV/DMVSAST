import { LightningElement, track, api } from "lwc";
// import assets from "@salesforce/resourceUrl/dmvAssets";
import pubsub from "vlocity_ins/pubsub";
export default class DmvBusinessLicenses extends LightningElement {
  // @track imageAssests = assets;
  businesses = [
    // {
    //   Id: "1",
    //   name: "Millions of Miles Porsche",
    //   // image: this.imageAssests + "/Illustrations/businessIllustration.PNG",
    //   addCard: false
    // },
    {
      Id: "1",
      name: "Apply for a new business license",
      addCard: true
    }
  ];

  navigateNewUrl() {
    window.location.replace(
      "https://cadxpdev-dmvpotdev.cs133.force.com/s/create-account"
    );
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
      console.log("*step inside handleButtonClick DMV Business Card");
      console.log("*step inside handleButtonClick", data.isAccountCreated);
      // let result = data.isAccountCreated ? true : false;
      // if (result) {
      //   this.buttonLabel = "Completed";
      // }
    } catch (error) {
      console.error("Error in handleButtonClick", error);
    }
  }
}