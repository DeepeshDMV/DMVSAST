import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";

export default class DmvScheduleYourInspection extends OmniscriptBaseMixin(LightningElement) {
  @api progressStatus;
  blaId = "";
  inspectionDateTime = "";
  inspectionLocation = "";
  inspectionTime = "";
  inspectionStatus;
  buttonDisabled = false;
  visits;
  className;
  informationMessage = "";
  plannedStartDate;
  plannedEndDate;
  inspectionEndTime;
  startFlow() {
      console.log("startflow called");
      const startInspectionFlowEvent = new CustomEvent('startinspectionflow',{detail:{},
      bubbles: true,
      composed: true});
      this.dispatchEvent(startInspectionFlowEvent);
    }

    connectedCallback() {
      const mitCaseUrl = window.location.href;
      const newURL = new URL(mitCaseUrl).searchParams;
      this.blaId = newURL.get("c__ContextId");
      console.log("Inside ConnectedCallBack apHub");
      // this.getScheduleLiveScanDetails();
      this.getInspectionStatus();
    }

    getInspectionStatus() {
      const params = {
        input: {BLAid: this.blaId},
        sClassName: "DMV_BusninessLicenseApplication",
        sMethodName: "getBLAVisitStatusDetails",
        options: {}
      };
      this.omniRemoteCall(params, false)
        .then((response) => {
          window.console.log("Status detail : ",response);
          //this.getPersonExaminationDetails();
          this.inspectionStatus = response.result.success.Status;
          this.visits = response.result.success.Visits;
          //this.plannedStartDate = response.result.success.Visits[0].PlannedVisitStartTime;
          const convertDate = new Date(response.result.success.Visits[0].PlannedVisitStartTime);
          this.plannedStartDate =  convertDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC"
            });
            const convertTime = new Date(response.result.success.Visits[0].PlannedVisitStartTime).toISOString().slice(11, -8);
            const hours = convertTime.substr(0, 2);
            const dayNight = hours < 12 || hours === 24 ? "AM" : "PM";
            this.inspectionTime = (hours % 12 || 12).toString() + convertTime.substr(2, 3) + " " + dayNight;
            //this.plannedEndDate = response.result.success.Visits[0].PlannedVisitEndTime;
            this.inspectionLocation = response.result.success.Visits[0].PlaceName;


            const convertEndDate = new Date(response.result.success.Visits[0].PlannedVisitEndTime);
            this.plannedEndDate =  convertEndDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC"
            });
            const convertEndTime = new Date(response.result.success.Visits[0].PlannedVisitEndTime).toISOString().slice(11, -8);
            const endHours = convertTime.substr(0, 2);
            const dayNightEnd = endHours < 12 || endHours === 24 ? "AM" : "PM";
            this.inspectionEndTime = (endHours % 12 || 12).toString() + convertEndTime.substr(2, 3) + " " + dayNightEnd;
        })
        .catch((error) => {
          window.console.log(error, "error");
        });
    }
 
    renderedCallback() {
      console.log("progressStatus api", this.progressStatus);
      const list = ["Inspection_Scheduled_Status__c"];
      if(this.inspectionStatus === "Gathering Prerequisites" || this.inspectionStatus === "Submitted" || this.inspectionStatus === "Application Accepted" || this.inspectionStatus === "In Review") {
        this.buttonDisabled = true;
        this.showTime = false;
        this.className = "slds-p-bottom_medium";
        this.template.querySelector(`.Inspection_Scheduled_Status__c`).classList.add("dmv-not-started");
        this.template.querySelector(`.Receive_Inspection_Result__c`).classList.add("dmv-not-started");
        this.informationMessage = "Your application is being reviewed. Once that is complete you will receive an email to schedule your inspection."
      } else if (this.inspectionStatus === "Inspection Phase" && this.visits === undefined) {
        this.buttonDisabled = false;
        this.template.querySelector(`.Inspection_Scheduled_Status__c`).classList.add("dmv-not-started");
        this.template.querySelector(`.Receive_Inspection_Result__c`).classList.add("dmv-not-started");
        this.informationMessage = "Your application is ready for inspection. Please schedule your inspection.";
        this.showTime = false;
      } else if (this.inspectionStatus === "Inspection Phase" && this.visits && !this.visits[0].InspectionStatus) {
        this.buttonDisabled = true;
        this.showTime = true;
        this.template.querySelector(`.Inspection_Scheduled_Status__c`).classList.add("dmv-complete");
        this.template.querySelector(`.Receive_Inspection_Result__c`).classList.add("dmv-not-started");
        this.informationMessage = "Your inspection is scheduled. Please see details below:";
      } else if (this.inspectionStatus === "Inspection Phase" && this.visits && this.visits[0].InspectionStatus === "Pass") {
        this.buttonDisabled = true;
        this.showTime = false;
        this.className = "slds-p-bottom_medium dmv-success";
        this.template.querySelector(`.Inspection_Scheduled_Status__c`).classList.add("dmv-complete");
        this.template.querySelector(`.Receive_Inspection_Result__c`).classList.add("dmv-complete");
        this.informationMessage = "Your inspection has passed. Please view your inspection reports on the home page.";
      } else if (this.inspectionStatus === "Violations Observed" && this.visits && this.visits[0].InspectionStatus === "Fail") {
        this.buttonDisabled = false;
        this.showTime = false;
        this.className = "slds-p-bottom_medium dmv-fail";
        this.template.querySelector(`.Inspection_Scheduled_Status__c`).classList.add("dmv-not-started");
        this.template.querySelector(`.Receive_Inspection_Result__c`).classList.add("dmv-not-started");
        this.informationMessage = "Your inspection has failed. Please view your inspection reports on the home page."
      }

      
      // if (this.progressStatus && this.progressStatus[0]) {
      //   list.find((item) => {
      //     if (Object.keys(this.progressStatus[0]).includes(item)) {
      //       //this.scheduleTraining = this.uploadedDocStatus[0][item];
      //       if (this.progressStatus[0][item].toLowerCase() === "completed") {
      //         this.template.querySelector(`.${item}`).classList.add("dmv-complete");
      //       }  else if (
      //         this.progressStatus[0][item].toLowerCase() === "start"
      //       ) {
      //         this.template
      //           .querySelector(`.${item}`)
      //           .classList.add("dmv-in-progress");
      //       } else {
      //         this.template
      //           .querySelector(`.${item}`)
      //           .classList.add("dmv-not-started");
      //       }
      //     } else {
      //       this.template
      //         .querySelector(`.${item}`)
      //         .classList.add("dmv-not-started");
      //     }
      //   });
      // }
    }

    getScheduleLiveScanDetails() {
      const params = {
        input: {blaId:this.blaId},
        sClassName: "DMVBusinessDetails",
        sMethodName: "getVisit",
        options: {}
      };
  
      this.omniRemoteCall(params, false)
        .then((response) => {
          window.console.log("Inspection Details : ", response);
          const inspectionData = response.result.success.length > 1 ? response.result.success[response.result.success.length-1]:response.result.success[0];
          const convertDate = new Date(inspectionData.StartDateTime);
          this.inspectionDate =  convertDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC"
            });
          const convertTime = new Date(inspectionData.StartDateTime).toISOString().slice(11, -8);
          const hours = convertTime.substr(0, 2);
          const dayNight = hours < 12 || hours === 24 ? "AM" : "PM";
          this.inspectionTime = (hours % 12 || 12).toString() + convertTime.substr(2, 3) + " " + dayNight;
          this.inspectionLocation = inspectionData.Place;

          this.inspectionDate = response.success[0].Place;
        }).catch((error) => {
          window.console.log(error, "error");
        });
      }

}