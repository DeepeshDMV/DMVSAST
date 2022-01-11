({
    handleErrorLogging : function(component,event,message,componentName,method,stack){
        var actionLogError = component.get("c.errorLoggingLWCAura");
            actionLogError.setParams({   
              "message" : message,
              "device" : $A.get("$Browser.formFactor"),
              "source" : "Aura",
              "componentName" : componentName,
              "method" : method,
              "stack" : stack

              });
            actionLogError.setCallback(this, function(actionLogErrorResult){
            var stateError = actionLogErrorResult.getState();
            console.log("ErrorState: ",stateError);
            if (stateError === "SUCCESS")
            {
           
                var result = actionLogErrorResult.getReturnValue(); 
                if(result.mapResponse.Error != undefined || result.mapResponse.Error != null)
                {
                   // component.set("v.showErrorModal", true);
                    component.set("v.errorId", result.mapResponse.Error);
                    sessionStorage.setItem("errorId", result.mapResponse.Error);
                    //window.location.href = $A.get('https://cadxpdev-dmvpotdev.cs133.force.com/s/Error');
                    var str = 'https://cadxpdev-dmvpotdev.cs133.force.com/s/Error';
                    var urlEvent = $A.get("e.force:navigateToURL");
                          urlEvent.setParams({
                              "url": str
                          });
                          urlEvent.fire();
                    return false;
                }
            }
            });
            $A.enqueueAction(actionLogError);
    }
})