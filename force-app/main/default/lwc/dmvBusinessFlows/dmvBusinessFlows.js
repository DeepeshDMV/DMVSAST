import { LightningElement, track,api } from "lwc";
import pubsub from "vlocity_ins/pubsub";

export default class DmvBusinessFlows extends LightningElement {
  detailCloseData = false;
  @track buttonLabel = "Start";
  @api uploadedDocStatus;
  /**
   * @function launchFlow - Method to Launch Flow when clicked on Create button.
   */
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

  /**
   * @function connectedCallback - Method to be called when component is initialized.
   */
  connectedCallback() {
    try {
      console.log("Inside Connected Callback");
      pubsub.register("omniscript_action", {
        data: this.handleButtonClick.bind(this)
      });
      pubsub.register("omniscript_step", {
        data: this.handleButtonClick.bind(this)
      });
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
      console.log("*step inside handleButtonClick- Business Flows");
      console.log("*step inside handleButtonClick", data.isCompleted);
      let result = data.isCompleted ? true : false;
      if (result) {
        this.buttonLabel = "Completed";
      }
    } catch (error) {
      console.error("Error in handleButtonClick", error);
    }
  }
  renderedCallback(){
    console.log("uploadedDocStatus", this.uploadedDocStatus);
  const list = ["Owner_Background_Information__c","Property_Details__c","Business_Account_Information__c"];
  if (this.uploadedDocStatus && this.uploadedDocStatus[0]) {
  list.find((item) => {
    if(Object.keys(this.uploadedDocStatus[0]).includes(item)) {
      //this.scheduleTraining = this.uploadedDocStatus[0][item];
      if (this.uploadedDocStatus[0][item].toLowerCase() === "complete") {
        this.template.querySelector(`.${item}`).classList.add("dmv-complete");
      } else if (this.uploadedDocStatus[0][item].toLowerCase() === "not started") {
        this.template.querySelector(`.${item}`).classList.add("dmv-not-started");
      } else if (this.uploadedDocStatus[0][item].toLowerCase() === "in progress") {
        this.template.querySelector(`.${item}`).classList.add("dmv-in-progress");
      } else {
        this.template.querySelector(`.${item}`).classList.add("dmv-not-started");
      }
      
    } else {
      this.template.querySelector(`.${item}`).classList.add("dmv-not-started");
    }
  })
}
}
}