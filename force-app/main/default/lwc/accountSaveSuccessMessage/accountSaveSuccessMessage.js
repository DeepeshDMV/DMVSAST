import { api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AccountSaveSuccessMessage extends LightningElement {
    connectedCallback() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success!!',
                message: 'You have successfully created an account',
                variant: 'success',
            })
        );
    }
}