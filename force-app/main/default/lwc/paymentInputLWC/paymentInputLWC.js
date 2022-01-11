import { LightningElement, track, wire, api} from 'lwc';
import getData from '@salesforce/apex/PaymentInputLWC_Ctrl.completeData';



export default class paymentInputLWC extends LightningElement {
    @api recordId;
    @track firstName;
    @track lastName;
    @track phoneValue;
    @track emailValue;
    @track amountValue;
    @track invoiceValue;
    renderedflag = false;
    wiredDataResult;
    @track completeData;



    handleClickBuy(){
       
        var location = "https://demo.convergepay.com/hosted-payments/buy_button_script/626b6b586878766c5166326839336d6164704b384451414141586c7342373748";
        var finalLocation = location+'?ssl_amount='+this.amountValue+'&ssl_invoice_number='+this.invoiceValue+'&ssl_first_name='+this.firstName+'&ssl_last_name='+this.lastName+'&ssl_email='+this.emailValue+'&ssl_phone='+this.phoneValue;
        var myscript = document.createElement("script");
        myscript.src = finalLocation;
        //myscript.src = 'https://demo.convergepay.com/hosted-payments/';
        
        var body = document.body;
        body.appendChild(myscript);
        //window.location = location;//'https://demo.convergepay.com/hosted-payments/';
        //window.location.href = finalLocation;
    }

    getQueryParameters() {
        var params = {};
        var search = location.search.substring(1);

        if (search) {
            params = JSON.parse(
                '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                (key, value) => {
                    return key === "" ? value : decodeURIComponent(value);
                }
            );
        }
        return params;
	}

    renderedCallback() {
        if (!this.renderedflag) {
			this.parameters = this.getQueryParameters();       
			this.recordId = this.parameters.recordId;
			this.renderedflag = true;
            if(this.recordId){
                refreshApex(this.wiredDataResult)
            }
        }
    }

    @wire(getData, {recordId : '$recordId'})
    recordData(result) {
        this.wiredDataResult = result;
        if (result.data) {
            this.completeData = result.data;
            if(this.completeData){
                this.firstName = this.completeData.firstName;
                this.lastName = this.completeData.lastName;
                this.phoneValue = this.completeData.phoneValue;
                this.emailValue = this.completeData.emailValue;
                this.amountValue = this.completeData.amountValue;
                this.invoiceValue = this.completeData.invoiceValue;
            }
        } else if (result.error) {
            this.showSpinner = false;
            if(result.error.body.message){
                const evt = new ShowToastEvent({
                    title: 'Error',
                    message: result.error.body.message,
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            }else{
                const evt = new ShowToastEvent({
                    title: 'Error',
                    message: JSON.stringify(result.error),
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            }
        }
    }
}