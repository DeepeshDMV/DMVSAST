({
  /**
   * @function handleButtonChange - Function called when an event is captured from the LWC Component.
   * @param {*} component - Component parameter to capture the component related attributes.
   * @param {*} event - Event parameter to capture event attributes.
   */
  handleButtonChange: function (component, event) {
    console.log("Inside handleButtonChange - dmvManageBusinessFlowPageLayout ");
    var flowNumber = event.getParam("detail");
    console.log("Flow Activated : ", flowNumber);
    switch (flowNumber) {
      case "1":
        component.set("v.firstFlow", true);
        component.set("v.isFlowActive", true);
        component.set("v.secondFlow", false);
        break;
      case "2":
        component.set("v.secondFlow", true);
        component.set("v.isFlowActive", true);
        component.set("v.firstFlow", false);
        break;
      default:
        component.set("v.firstFlow", false);
        component.set("v.isFlowActive", false);
        component.set("v.secondFlow", false);
        return true;
    }
  },

  handleCloseFlow: function (component, event) {
    console.log("received event - dmvManageBusinessPageLayout");
    var closeFlow = event.getParam("result");
    console.log("Close Flow: ", closeFlow);
    component.set("v.isFlowActive", false);
    component.set("v.firstFlow", false);
    component.set("v.secondFlow", false);
    // if (closeFlow.isCompleted) {
    //   component.set("v.isFlowActive", false);
    //   component.set("v.firstFlow", false);
    // }
  },
  /**
   * @function handleButtonChange - Function called when an event is captured from the LWC Component.
   * @param {*} component - Component parameter to capture the component related attributes.
   * @param {*} event - Event parameter to capture event attributes.
   */
  handleFinishFlow: function (component, event) {
    console.log("inside handleFinishFlow");
    var isFlowActive = event.getParam("detail");
    console.log("Flow Activated inside aura: ", flowNumber);
    component.set("v.isFlowActive", isFlowActive);
  }
});