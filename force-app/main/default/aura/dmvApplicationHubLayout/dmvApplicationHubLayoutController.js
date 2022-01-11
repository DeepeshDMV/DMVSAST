({
  handleFilterChange: function (component, event) {
    console.log("event reached");
    var sPageURL = decodeURIComponent(window.location.search.substring(1)); //You get the whole decoded URL of the page.
    var sURLVariables = sPageURL.split("&"); //Split by & so that you get the key value pairs separately in a list
    var sParameterName;
    var i;
    var BusinessApplicationLicenseId;
    var BusinessAccountId;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("="); //to split the key from the value.

      if (sParameterName[0] === "c__aid") {
        //lets say you are looking for param name - firstName
        BusinessAccountId = sParameterName[1];
      }
      if (sParameterName[0] === "c__ContextId") {
        //lets say you are looking for param name - firstName
        BusinessApplicationLicenseId = sParameterName[1];
      }
    }
    console.log("Param name" + sParameterName[0]);
    console.log("Param value" + sParameterName[1]);

    var inputVariables = [
      {
        name: "BusinessAccountId",
        type: "String",
        value: BusinessAccountId //"0013S000002ihUUQAY"
      },
      {
        name: "BusinessApplicationLicenseId",
        type: "String",
        value: BusinessApplicationLicenseId
      }
    ];
    // Find the component whose aura:id is "flowId"
    var flow = component.find("flowId");
    component.set("v.isFlowActive", true);
    component.set("v.firstFlow", false);
    component.set("v.secondFlow", false);
    component.set("v.showReviewFlow", false);
    component.set("v.showEditFlow",false);
    // In that component, start your flow. Reference the flow's Unique Name.
    flow.startFlow("CADMV_Guest_Schedule_New_Exam", inputVariables);
    //var filters = event.getParam('filters');
    //component.set('v.message', filters.length > 0 ? 'Your selection: ' + filters.join() : 'No selection');
  },
  handleStartLiveScanFlow: function (component, event) {
    console.log("event reached");
    var sPageURL = decodeURIComponent(window.location.search.substring(1)); //You get the whole decoded URL of the page.
    var sURLVariables = sPageURL.split("&"); //Split by & so that you get the key value pairs separately in a list
    var sParameterName;
    var i;
    var BusinessApplicationLicenseId;
    var BusinessAccountId;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("="); //to split the key from the value.

      if (sParameterName[0] === "c__aid") {
        //lets say you are looking for param name - firstName
        BusinessAccountId = sParameterName[1];
      }
      if (sParameterName[0] === "c__ContextId") {
        //lets say you are looking for param name - firstName
        BusinessApplicationLicenseId = sParameterName[1];
      }
    }
    console.log("Param name" + sParameterName[0]);
    console.log("Param value" + sParameterName[1]);

    var inputVariables = [
      {
        name: "BusinessAccountId",
        type: "String",
        value: BusinessAccountId //"0013S000002ihUUQAY"
      },
      {
        name: "BusinessApplicationLicenseId",
        type: "String",
        value: BusinessApplicationLicenseId
      }
    ];
    // Find the component whose aura:id is "flowId"
    var flow = component.find("flowId");
    component.set("v.isFlowActive", true);
    component.set("v.firstFlow", false);
    component.set("v.secondFlow", false);
    component.set("v.showReviewFlow", false);
    component.set("v.showEditFlow",false);
    //component.set("v.secondFlow", false);
    // In that component, start your flow. Reference the flow's Unique Name.
    flow.startFlow("CADMV_View_Live_Scan_Location", inputVariables);
    //var filters = event.getParam('filters');
    //component.set('v.message', filters.length > 0 ? 'Your selection: ' + filters.join() : 'No selection');
  },
  statusChange: function (cmp, event) {
    if (event.getParam("status") === "FINISHED") {
      //Do something
      window.location.reload();
    }
  },
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
        component.set("v.firstFlow", false);
        component.set("v.secondFlow", true);
        component.set("v.isFlowActive", true);
        component.set("v.showReviewFlow", false);
        component.set("v.showEditFlow",false);
        break;
      case "2":
        component.set("v.firstFlow", true);
        component.set("v.secondFlow", false);
        component.set("v.isFlowActive", true);
        component.set("v.showReviewFlow", false);
        component.set("v.showEditFlow",false);
        break;
      default:
        component.set("v.secondFlow", false);
        component.set("v.secondFlow", false);
        component.set("v.isFlowActive", false);
        component.set("v.showReviewFlow", false);
        component.set("v.showEditFlow",false);
        return true;
    }
  },

  handleCloseFlow: function (component, event) {
    console.log("received event - dmvManageBusinessPageLayout");
    var closeFlow = event.getParam("result");
    console.log("Close Flow: ", closeFlow);
    component.set("v.isFlowActive", false);
    component.set("v.secondFlow", false);
    component.set("v.firstFlow", false);
    component.set("v.showEditFlow",false);
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
  },
  handleReviewSubmitFlow: function (component, event) {
    console.log("event fired");
    component.set("v.isFlowActive", true);
    component.set("v.secondFlow", false);
    component.set("v.firstFlow", false);
    component.set("v.showReviewFlow", true);
    component.set("v.showEditFlow",false);
  },
  handleClick: function(component,event){
    console.log("Button Clicked");
    component.set("v.isFlowActive", true);
    component.set("v.secondFlow", false);
    component.set("v.firstFlow", false);
    component.set("v.showReviewFlow", false);
    component.set("v.showEditFlow",true);
  }
});