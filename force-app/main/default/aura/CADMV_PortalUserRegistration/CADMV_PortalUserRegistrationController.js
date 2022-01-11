({
    init : function(cmp) {
        cmp.set("v.loading", true);
        
        let email = cmp.get("v.email"), 
            fname = cmp.get("v.fname"), 
            mname = cmp.get("v.mname"), 
            lname = cmp.get("v.lname"), 
            pass = cmp.get("v.password"),
            phone = cmp.get("v.phone"), 
            startUrl = cmp.get("v.starturl");
       
        let action = cmp.get("c.createExternalUser");
        action.setParams(
            { 
                username: email, 
                password: pass, 
                startUrl: startUrl,
                fname: fname,
                mname: mname,
                lname: lname,
                phone: phone,
            });

        action.setCallback(this, function(res) {
             cmp.set("v.loading", false);
            var state = res.getState();
            let errors = res.getError();
            let message = '';
            console.log("Current State: " + state);
            if (state === "SUCCESS") {
                //console.log("Success Return Value: " + res.getReturnValue());
                //cmp.set("v.op_url", res.getReturnValue());
            }
            else{
                console.log("Failed with State: " + state);
                debugger;
                console.log("Error Message: " + res.getError()[0].message);
                cmp.set("v.errorMessage",res.getError()[0].message);             
            }
        });
        $A.enqueueAction(action);
    }, 
    
    login: function(cmp){
        let url = cmp.get("v.op_url"); 
        window.location.href = url;  
    }
})