/* eslint-disable @lwc/lwc/no-api-reassignments */
/**
 * @description       : 
 * @author            : Abhishek Keshri
 * @group             : 
 * @last modified on  : 6-8-2021
 * @last modified by  : 
 * Modifications Log 
 * Ver   Date         Author            Modification
 * 1.0   6-8-2021     Abhishek Keshri   Initial Version
**/
import { LightningElement, api, track } from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
//import saveSign from '@salesforce/apex/CADMV_electronicSignatureHelper.saveSign';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


//declaration of variables for calculations
let isDownFlag,
    isDotFlag = false,
    submitDisabled = true,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;

let x = "#0000A0"; //blue color
let y = 1.5; //weight of line width and dot.       

let canvasElement, ctx; //storing canvas context
let dataURL, convertedDataURI; //holds image data

export default class Cadmvelectronicsignature extends OmniscriptBaseMixin(LightningElement) {


    @api ceocmosign = false;
    @api recordId;
    @api isLoaded = false;
    @api previousFileId;

    //event listeners added fotouchDotr drawing the signature within shadow boundary
    constructor() {
        super();
        this.template.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.template.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.template.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.template.addEventListener('mouseout', this.handleMouseOut.bind(this));
        this.template.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.template.addEventListener('touchstart', this.handleTouchDown.bind(this));
        this.template.addEventListener('touchend', this.handleTouchUp.bind(this));
    }

    //retrieve canvase and context
    renderedCallback() {
        //console.log('Rendered called');
        canvasElement = this.template.querySelector('canvas');
        if (canvasElement != null) {
            ctx = canvasElement.getContext("2d");
        }
    }

    //handler for mouse move operation
    handleMouseMove(event) {
        //console.log('move called');
        this.searchCoordinatesForEvent('move', event);
    }

    handleTouchMove(event) {
        //console.log('touchmove called');
        this.searchCoordinatesForEvent('touchmove', event);
    }

    //handler for mouse down operation
    handleMouseDown(event) {
        //console.log('down called');
        canvasElement = this.template.querySelector('canvas');
        canvasElement.focus();
        this.searchCoordinatesForEvent('down', event);
    }

    handleTouchDown(event) {
    }

    handleTouchUp(event) {
        isDownFlag = false;
    }

    //handler for mouse up operation
    handleMouseUp(event) {
        //console.log('up called');
        this.searchCoordinatesForEvent('up', event);
    }

    //handler for mouse out operation
    handleMouseOut(event) {
        //console.log('out called');
        this.searchCoordinatesForEvent('out', event);
    }

    /*
        handler to perform save operation.
        save signature as attachment.
        after saving shows success or failure message as toast
    */
    @api
    handleSaveClick() {
        //set to draw behind current content
        //console.log('Line 119 - ' + submitDisabled);
        //console.log('Line 108 ' + this.previousFileId);
        if (submitDisabled) {

            const evt = new ShowToastEvent({
                title: 'Please sign the agreement before submitting the Application',
                message: '',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }

        else {
            this.isLoaded = !this.isLoaded;
            if (this.previousFileId != null || this.previousFileId !== undefined) {
                //console.log('Line 122 ' + this.previousFileId);
                this.deleteFile(this.previousFileId);
            }
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "#FFF"; //white
            ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            //convert to png image as dataURL
            dataURL = canvasElement.toDataURL("image/png");
            //convert that as base64 encoding
            convertedDataURI = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            //this.dispatchEvent(new CustomEvent('finalsubmit'));
            //call Apex method imperatively and use promise for handling sucess & failure

            const params = {
                input: { strSignElement: convertedDataURI, recId: this.recordId },
                sClassName: "CADMV_electronicSignatureHelper",
                sMethodName: "saveSign",
                options: {}
            };
            this.omniRemoteCall(params, false)
                .then((response) => {
                    //this.dispatchEvent(new CustomEvent('nav', { detail: { name: 'Signature', nav: 'Submit' } }));
                    this.isLoaded = !this.isLoaded;
                    console.log('Line 146 ' + this.previousFileId + ' ' + JSON.stringify(response));
                    // eslint-disable-next-line @lwc/lwc/no-api-reassignments
                    this.previousFileId = response.result.success;
                    //console.log('Line 144 ' + this.previousFileId + ' ' + JSON.stringify(response));
                    //this.omniApplyCallResp(response);
                    this.omniNextStep();
                })
                .catch((error) => {
                    window.console.log(error, "error");
                    this.isLoaded = !this.isLoaded;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error saving Application',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                });

            /*saveSign({ strSignElement: convertedDataURI, recId: this.recordId })
                .then(result => {

                    this.dispatchEvent(new CustomEvent('nav', { detail: { name: 'Signature', nav: 'Submit' } }));
                })
                .catch(error => {
                    //show error message
                    this.isLoaded = !this.isLoaded;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error saving Application',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                });*/
        }

    }

    deleteFile(event) {
        //console.log('Line 185 ' + event);
        const params = {
            input: { idFile: event },
            sClassName: "cadmc_FileUpload",
            sMethodName: "deleteFiles",
            options: {}
        };
        this.omniRemoteCall(params, false)
            .then((data) => {

            })
            .catch((error) => {
                console.log(error);
            });
    }


    //clear the signature from canvas
    handleClearClick() {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        submitDisabled = true;
    }

    searchCoordinatesForEvent(requestedEvent, event) {
        //console.log('Line 127 - ' + requestedEvent);
        event.preventDefault();
        //console.log('Line 129');
        if (requestedEvent === 'down') {
            this.setupCoordinate(event);
            isDownFlag = true;
            isDotFlag = true;
            if (isDotFlag) {
                this.drawDot();
                isDotFlag = false;
            }
        }

        if (requestedEvent === 'touchdown') {
            this.setupCoordinate(event.touches[0]);
            isDownFlag = true;
            isDotFlag = true;
            if (isDotFlag) {
                //console.log('Line 151');
                this.drawDot();
                //console.log('Line 153');
                isDotFlag = false;
            }
        }
        if (requestedEvent === 'up' || requestedEvent === "out") {
            isDownFlag = false;
        }
        if (requestedEvent === 'move') {
            if (isDownFlag) {
                this.setupCoordinate(event);
                this.redraw();
                if (!this.isCanvasEmpty(canvasElement))
                    submitDisabled = false;
            }
        }
        if (requestedEvent === 'touchmove') {
            //console.log('Line 127 - ' + isDownFlag + ' ' + isDotFlag);
            //isDownFlag = true;
            if (isDownFlag) {
                console.log('Line 152');
                this.setupCoordinate(event.touches[0]);
                this.redraw();
                if (!this.isCanvasEmpty(canvasElement))
                    submitDisabled = false;
            }
            else {
                this.searchCoordinatesForEvent('touchdown', event);
            }
        }
    }

    //This method is primary called from mouse down & move to setup cordinates.
    setupCoordinate(eventParam) {
        //get size of an element and its position relative to the viewport 
        //using getBoundingClientRect which returns left, top, right, bottom, x, y, width, height.
        //console.log('Line 165');
        const clientRect = canvasElement.getBoundingClientRect();
        //console.log('Line 167');
        //console.log('Line 168' + eventParam.clientX + ' - ' + eventParam.clientY);
        prevX = currX;
        prevY = currY;
        currX = eventParam.clientX - clientRect.left;
        currY = eventParam.clientY - clientRect.top;
    }

    //For every mouse move based on the coordinates line to redrawn
    redraw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x; //sets the color, gradient and pattern of stroke
        ctx.lineWidth = y;
        ctx.closePath(); //create a path from current point to starting point
        ctx.stroke(); //draws the path
        //console.log('Line 160' + ctx);
    }

    //this draws the dot
    drawDot() {
        ctx.beginPath();
        ctx.fillStyle = x; //blue color
        ctx.fillRect(currX, currY, y, y); //fill rectrangle with coordinates
        ctx.closePath();
    }

    handleNav(e) {
        //console.log('called method');
        if (e.target.name == 'Back') {
            this.dispatchEvent(new CustomEvent('nav', { detail: { name: 'Signature', nav: 'Back' } }));
        }
        else if (e.target.name == 'Next') {
            if (false) {
                this.showToast('Error!', 'Please upload all the documents before clicking on next', 'error');
            }
            this.dispatchEvent(new CustomEvent('nav', { detail: { name: 'Signature', nav: 'Next' } }));
        }
    }
    isCanvasEmpty(cnv) {
        const blank = document.createElement('canvas');

        blank.width = cnv.width;
        blank.height = cnv.height;

        return cnv.toDataURL() === blank.toDataURL();
    }
}