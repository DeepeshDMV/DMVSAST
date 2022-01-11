/**
 * @description       : 
 * @author            : Divya JC
 * @group             : 
 * @last modified on  : 6-8-2021
 * @last modified by  : 
 * Modifications Log 
 * Ver   Date         Author            Modification
 * 1.0   6-9-2021     Divya JC  Initial Version
**/
import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSiteAddress from '@salesforce/apex/PopulateAccountShippingAddress_Ctrl.getSiteAddress';

export default class Cadmv_populateAccountShippingAddress extends LightningElement {
    @api recordId = '';
    @api SiteStreet;
    @api SiteCity;
    @api SiteState;
    @api SitePostalCode;
    @api SiteCountry;
    blaObj;

    connectedCallback() {
        this.getSiteAddress();
    }


    getSiteAddress() {
        if (this.recordId) {
            getSiteAddress({ 'recordId': this.recordId })
                .then(data => {
                    blaObj = JSON.parse(data);
                    this.SiteStreet=blaObj.SiteStreet;
                    this.SiteCity=blaObj.SiteCity
                    this.SiteState=blaObj.SiteState
                    this.SitePostalCode=blaObj.SitePostalCode
                    this.SiteCountry=blaObj.SiteCountry
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            return '';
        }
    }



}