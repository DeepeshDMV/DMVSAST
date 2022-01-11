import { LightningElement } from "lwc";
import pubsub from "vlocity_ins/pubsub";

export default class DmvFlowEventHelper extends LightningElement {
  connectedCallback() {
    try {
      console.log("Inside Connected Callback - DMV Flow Event Helper");
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

  handleButtonClick(data) {
    try {
      console.log("Data from Business Account Creation", data);
      console.log("*step inside handleButtonClick", data.isCompleted);
      let result = data;

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
}