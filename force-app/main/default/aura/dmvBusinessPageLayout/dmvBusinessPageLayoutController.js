({
  /**
   * @function handleButtonChange - Function called when an event is captured from the LWC Component.
   * @param {*} component - Component parameter to capture the component related attributes.
   * @param {*} event - Event parameter to capture event attributes.
   */
  handleButtonChange: function (component, event) {
    var flowNumber = event.getParam("detail");
    console.log("Flow Activated : ", flowNumber);
    switch (flowNumber) {
      case "1":
        component.set("v.firstFlow", true);
        component.set("v.secondFlow", false);
        component.set("v.thirdFlow", false);
        component.set("v.isFlowActive", true);
        break;
      case "2":
        component.set("v.firstFlow", false);
        component.set("v.secondFlow", true);
        component.set("v.thirdFlow", false);
        component.set("v.isFlowActive", true);
        break;
      case "3":
        component.set("v.firstFlow", false);
        component.set("v.secondFlow", false);
        component.set("v.thirdFlow", true);
        component.set("v.isFlowActive", true);
        break;
      default:
        component.set("v.isFlowActive", false);
        return true;
    }
  },

  handleCloseFlow: function (component, event) {
    console.log("received event");
    var closeFlow = event.getParam("result");
    console.log("Close Flow: ", closeFlow);

    if (closeFlow) {
      component.set("v.firstFlow", false);
      component.set("v.secondFlow", false);
      component.set("v.thirdFlow", false);
      component.set("v.isFlowActive", false);
    }
  },
  /**
   * @function handleButtonChange - Function called when an event is captured from the LWC Component.
   * @param {*} component - Component parameter to capture the component related attributes.
   * @param {*} event - Event parameter to capture event attributes.
   */
  handleFinishFlow: function (component, event) {
    var isFlowActive = event.getParam("detail");
    console.log("Flow Activated inside aura: ", flowNumber);
    component.set("v.isFlowActive", isFlowActive);
  }
});