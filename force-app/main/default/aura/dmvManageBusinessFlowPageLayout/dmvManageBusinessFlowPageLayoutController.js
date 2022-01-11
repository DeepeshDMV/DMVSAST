({


  init : function(component, event, helper) {
    //component.set("v.showErrorModal", true);
    //component.set("v.errorId", 'EXE-1');
    
    try{
      var action = component.get("c.fetchData");
        action.setParams({            
        });
        action.setCallback(this, function(actionResult){
          var state = actionResult.getState();
          if (state === "SUCCESS")
          {
           
            var result = actionResult.getReturnValue(); 
           if(result.mapResponse.Error != undefined || result.mapResponse.Error != null)
            {
             // component.set("v.showErrorModal", true);
             console.log('Error from Server Side');
              /*component.set("v.errorId", result.mapResponse.Error);
              sessionStorage.setItem("errorId", result.mapResponse.Error);
              var str = 'https://cadxpdev-dmvpotdev.cs133.force.com/s/Error';
              var urlEvent = $A.get("e.force:navigateToURL");
                    urlEvent.setParams({
                        "url": str
                    });
                    urlEvent.fire(); 
              
              return false; */             
            }
          }else if(state === "ERROR"){
            console.log("Error from Error Response: ",actionResult.getError()[0].message);                     
            helper.handleErrorLogging(component,event,actionResult.getError()[0].message,'dmvManageBusinessFlowPageLayout','init','');
            
          }
          
        });
        $A.enqueueAction(action);
    }catch(error){
      console.log("Error from Catch: ",error);  
      helper.handleErrorLogging(component,event,error.message,'dmvManageBusinessFlowPageLayout','init',error.stack);        
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
        component.set("v.firstFlow", true);
        component.set("v.isFlowActive", true);
        break;
      default:
        component.set("v.firstFlow", false);
        component.set("v.isFlowActive", false);
        return true;
    }
  },
  
  handleCloseFlow: function (component, event) {
    console.log("received event - dmvManageBusinessPageLayout");
    var closeFlow = event.getParam("result");
    console.log("Close Flow: ", closeFlow);

    if (closeFlow.isCompleted) {
      component.set("v.isFlowActive", false);
      component.set("v.firstFlow", false);
    }
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