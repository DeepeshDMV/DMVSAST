import { LightningElement, track } from "lwc";
import pubsub from "vlocity_ins/pubsub";
export default class DmvOwnerAndPropertyDetails extends LightningElement {
  @track disabled = true;
  connectedCallback() {
    try {
      console.log("Inside Connected Callback - DMV Flow Event Helper");
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

  handleButtonClick(data) {
    try {
      console.log("Data from Business Owner and Property Details", data);
      let result = data;
      this.dispatchEvent(
        new CustomEvent("handlecloseflow", { detail: { result } })
      );
    } catch (error) {
      console.error("Error in handleButtonClick", error);
    }
  }
  startReviewSubmit() {
    console.log("button clicked");
    this.dispatchEvent(
      new CustomEvent("startreviewandsubmit", {detail:{},
      bubbles: true,
      composed: true})
    );
  }
}