import { LightningElement, api } from 'lwc';

export default class CADMV_LaunchCreateAccount extends LightningElement {
    @api buttonText;

    handleClick() {
        console.log("Button Clicked!");
      }
}