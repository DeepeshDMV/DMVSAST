({
    handleButtonChange: function (component, event) {
        console.log("Inside handleButtonChange - dmvManageBusinessFlowPageLayout ");
        var flowNumber = event.getParam("detail");
        console.log("Flow Activated : ", flowNumber);
        switch (flowNumber) {
          case "1":
            component.set("v.firstFlow", true);
            component.set("v.isFlowActive", true);
            break;
          default:
            component.set("v.secondFlow", false);
            component.set("v.secondFlow", false);
            component.set("v.isFlowActive", false);
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
      },

      handleInspectionFlow: function(component, event){
          try {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)); //You get the whole decoded URL of the page.
            var sURLVariables = sPageURL.split('&'); //Split by & so that you get the key value pairs separately in a list
            var sParameterName;
            var i;
            var BusinessApplicationLicenseId;
            var BusinessAccountId;
        
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('='); //to split the key from the value.
        
                if (sParameterName[0] === 'c__aid') { //lets say you are looking for param name - firstName
                  BusinessAccountId = sParameterName[1];
                }
                if (sParameterName[0] === 'c__ContextId') { //lets say you are looking for param name - firstName
                  BusinessApplicationLicenseId = sParameterName[1];
              }        
            }
            console.log('Param name'+sParameterName[0]);
            console.log('Param value'+sParameterName[1]);
        
            var inputVariables = [
              {
                name: "BusinessAccountId",
                type: "String",
                value: BusinessAccountId        //"0013S000002ihUUQAY"
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
            //component.set("v.secondFlow", false);
            // In that component, start your flow. Reference the flow's Unique Name.
            flow.startFlow("CA_DMV_Guest_Schedule_New_Dealership_Inspection",  inputVariables);
          } catch (error) {
              console.error("Error in handleInspectionFlow: ", error);
          }
      },
      statusChange: function (cmp, event) {
        if (event.getParam("status") === "FINISHED") {
          //Do something
          window.location.reload();
        }
      }
})