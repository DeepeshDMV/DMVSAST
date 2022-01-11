({
   closeModel: function(component, event, helper) {
      component.set("v.isOpen", false);
   },
    openmodal :function(component, event, helper) {
      component.set("v.isOpen", true);
   },
    onCheck :function(component, event, helper) {
        //if(component.get("v.ischecked"))
            //component.set("v.isOpen", true);
       // else
           // component.set("v.isOpen", false);
   },
    handleChange : function(component, event, helper) {
        // When an option is selected, navigate to the next screen
        var response = event.getSource().getLocalId();
        console.log('response'+response)
        //component.set("v.value", response);
        if(response == 'NEXT' && !component.get('v.ischecked')){
            component.set('v.showError',true);
            return;
        }
        component.set('v.showError',false);
        var navigate = component.get("v.navigateFlow");
        navigate(response);
   }
})