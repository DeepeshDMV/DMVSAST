import { LightningElement, api } from 'lwc';

export default class DmvStartFlow extends LightningElement {

    @api test () {
        console.log("child called");
        const filterChangeEvent = new CustomEvent('filterchange',{detail: {},
        bubbles: true,
        composed: true});
        this.dispatchEvent(filterChangeEvent);
    }

    @api startLiveScanFlow () {
        console.log("child startLiveScanFlow called");
        const startLiveScanFlowEvent = new CustomEvent('startlivescanflow',{detail:{},
        bubbles: true,
        composed: true});
        this.dispatchEvent(startLiveScanFlowEvent);
    }
    // renderedCallback () {
    //     this.test();
    // }
}