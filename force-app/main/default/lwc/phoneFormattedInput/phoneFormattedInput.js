import {
    LightningElement,
    track,
    wire,
    api
} from 'lwc';
import { FlowNavigationBackEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent, registerListener, unregisterAllListeners } from 'c/pubsub';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class phoneFormattedInput extends LightningElement {
    @api availableActions = [];
    @track showMessage = false;
    @wire(CurrentPageReference) pageRef;
    @api accessKey;
    @api checked;
    @api conditionalClass;
    @api disabled;
    @api formatter;
    @api isLoading;
    @api label;
    @api max;
    @api maxLength;
    @api messageToggleActive;
    @api messageToggleInactive;
    @api messageWhenBadInput;
    @api messageWhenPatternMismatch;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenStepMismatch;
    @api messageWhenTooLong;
    @api messageWhenTooShort;
    @api messageWhenTypeMismatch;
    @api messageWhenValueMissing;
    @api min;
    @api minLength;
    @api multiple;
    @api name;
    @api pattern;
    @api placeholder;
    @api readonly;
    @api required;
    @api step;
    @api title;
    @api type;
    @api value;                         
    @api variant;
    @api fieldlLevelHelp;
    

    connectedCallback() {
        if(!this.pageRef)
        {
            this.pageRef = {};
            this.pageRef.attributes = {};
            this.pageRef.attributes.LightningApp = "LightningApp";
        }          
        registerListener('flowvalidation', this.handleNotification, this);
      }    

      handleNotification(event) {
        if(event.detail.isValid == undefined || event.detail.isValid == true)
        return;
        var validationFlag = true;
      
        var inputFields = this.template.querySelectorAll("lightning-input");
        if (inputFields !== null && inputFields !== undefined) {
            inputFields.forEach(function(field) {

                field.reportValidity();
            });
        } 
      }       

    @api
    validate() {
      
        try {
            //debugger;
            // validation code starts

            var validationFlag = false;
      
            //var validateOptional = false;
            var inputFields = this.template.querySelectorAll("lightning-input");
            if (inputFields !== null && inputFields !== undefined) {
                inputFields.forEach(function(field) {
                    field.reportValidity();
                });
                for (var i = 0; i < inputFields.length; i++) {
                    validationFlag = inputFields[i].checkValidity();
                    if (!validationFlag) {
                        break;
                    }
                }
                if(validationFlag) { 
                    return { isValid: true }; 
                } 
                else { 
                    // If the component is invalid, return the isValid parameter 
                    // as false and return an error message.     
                    fireEvent(this.pageRef, 'flowvalidation', {detail: { isValid: false }});
                    
        
                    return { 
                        isValid: false, 
                        errorMessage: '' 
                     }; 
                 }
            }  
        } catch (error) {
            
            this.spinner = false;
            console.log(error);

        };         

    }

    /*nblurHandler(event) {
        
     
        dateField.reportValidity();
        this.hideHelpElem(event);
        const attributeChangeEvent = new FlowAttributeChangeEvent('value', event.target.value);
        this.dispatchEvent(attributeChangeEvent);  

         
        this.value = event.target.value;
    }*/


    handleKeyPress(event) {
        var charCode = event.keyCode;
        if (charCode !== 229 && charCode !== 8 && (charCode < 48 || (charCode > 57 && charCode < 96) || charCode > 105)) {
            this.specChar = true;
        } else {
            this.specChar = false;
        }
    }



    onchangeHandler(event) {
        var dateField = event.target;
        var dateEntered = event.target.value;

        if (!this.specChar) {

            if (dateEntered.length == 3) {
                this.mobile = dateEntered + '-';
                dateField.value = this.mobile;
            } else if (dateEntered.length == 7) {
                this.mobile = dateEntered + '-';
                dateField.value = this.mobile;
            } else {
                this.mobile = dateEntered;
                dateField.value = this.mobile;
            }

        } else {
            event.target.value = dateEntered.substr(0, dateEntered.length - 1);
        }
        this.value = event.target.value;
        dateField.reportValidity();

        const attributeChangeEvent = new FlowAttributeChangeEvent('value', event.target.value);
        this.dispatchEvent(attributeChangeEvent);   
        

    }

    
    onSave(){
        if(this.showMessage == false){
            this.handleFlowGoNext();
        }
    }

    handleFlowGoNext(){
        if (this.availableActions.find(action => action === 'NEXT')) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
}