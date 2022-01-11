import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FORM_FACTOR from '@salesforce/client/formFactor';
import errorLoggingLWCAura from '@salesforce/apex/CADMV_TestThrowError.errorLoggingLWCAura';

export default class Cadmv_LWCErrorLogging extends NavigationMixin(LightningElement) {
    @track message;
    device;
    source;
    componentName;
    method;
    stack;

    throwError(){
        try{
            if(FORM_FACTOR == 'Large')
        {
            this.device = 'DESKTOP';
        }else if(FORM_FACTOR == 'Medium')
        {
            this.device = 'TABLET';
        }
        else if(FORM_FACTOR == 'Small')
        {
            this.device = 'PHONE';
        }
        console.log('form factor',FORM_FACTOR);
        console.log('form factorerr',FORM_FACTORerr);
        }catch (error) {
            console.log('Error',error);
            this.message = error.message;
            this.stack = error.stack;
            this.method ='throwError';
            this.componentName ='cadmv_LWCErrorLogging';
            this.source = 'LWC';
            this.handleErrorLogging();
        }
        
        
    }

    /**
   * @function handleErrorLogging - Method called when error received.
   * @param {*}  - Passing the message,device,component name,method and stack
   */
  handleErrorLogging() {
    console.log('In errorHandling');
    console.log('message-->',this.message);
                console.log('componentName-->',this.componentName);
                console.log('method-->',this.method);
   errorLoggingLWCAura({message:this.message,device:this.device,source:this.source,componentName:this.componentName,method:this.method,stack:this.stack})
          .then(response => {    
            debugger
            console.log('Response--',response); 
            console.log('Response result--',response.mapResponse.Error);        
            sessionStorage.setItem("errorId", response.mapResponse.Error);
            //this.handleNavigate();  
            this[NavigationMixin.Navigate]({
                type: "standard__webPage",
                    attributes: {
                        url: "https://cadxpdev-dmvpotdev.cs133.force.com/s/Error"
                    }                 
            }); 

          })
          .catch((error) => {
            window.console.log(error, "error");
          });
  }

  handleNavigate() {
    this[NavigationMixin.Navigate]({
        type: "standard__webPage",
            attributes: {
                url: "https://cadxpdev-dmvpotdev.cs133.force.com/s/Error"
            }                 
    });

  }
}