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
import { LightningElement, api, wire, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";

export default class Cadmv_FileUpload extends OmniscriptBaseMixin(
  LightningElement
) {
  @api recordId = "";
  @api label = "";
  @api name = "";
  @api fieldvalue = "";
  @api fieldname = "";
  @api acceptedformats = "";
  @api disableupload = "";
  @track showUploadFile = true;
  @track fileNames;
  @track isSpinner = false;

  connectedCallback() {
    console.log(
      "line 31" +
      this.recordId +
      " - " +
      this.fieldvalue +
      " - " +
      this.fieldname
    );
    if (this.disableupload === "Yes") this.showUploadFile = false;
    this.getStoredFiles();
  }

  renderedCallBack() {
    console.log("Line 33" + this.disableupload);
  }

  getStoredFiles() {
    if (this.recordId) {
      const params = {
        input: { recordId: this.recordId, sectionName: this.fieldvalue },
        sClassName: "cadmc_FileUpload",
        sMethodName: "getStoredFiles",
        options: {}
      };

      this.omniRemoteCall(params, false)
        .then((data) => {
          console.log(
            "DataFiles line 45" + JSON.stringify(data.result.success)
          );
          this.fileNames = data.result.success;
          console.log(this.recordId);
          console.log(this.fieldvalue);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return "";
    }
  }

  handleUploadFinished(event) {
    console.log(
      "line 59" +
      this.recordId +
      " - " +
      this.fieldvalue +
      " - " +
      this.fieldname
    );
    //this.showToast('Success!', 'File uploaded successfully', 'success');
    this.fileName = event.detail.files[0].name;
    this.getStoredFiles();
  }

  showToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
      })
    );
  }

  deleteFile(event) {
    this.isSpinner = true;
    const params = {
      input: { idFile: event.target.name },
      sClassName: "cadmc_FileUpload",
      sMethodName: "deleteFiles",
      options: {}
    };
    this.omniRemoteCall(params, false)
      .then((data) => {
        //console.log('DataFiles line 83' + JSON.stringify(data));
        this.getStoredFiles();
        this.isSpinner = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  fileDownlaod(event) {
    //console.log(JSON.stringify(event.currentTarget.dataset.name));
    window.open(
      "/sfc/servlet.shepherd/document/download/" +
      event.currentTarget.dataset.name,
      "_top"
    );
  }
}