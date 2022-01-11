import { LightningElement, api } from 'lwc';
// import { registerListener, fireEvent } from "c/dmvPubSub";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
export default class DmvDealerTrainingExam extends OmniscriptBaseMixin(LightningElement) {
    showStartButton = true;
    examStatus = "";
    showRescheduleButton = false;
    showSuccessMessage = false;
    showFailedMessage = false;
    cssClassExamResult;
    cssClassTraining;
    cssClass;
    examDate;
    examType;
    showScheduledMessage = false;
    scheduleTraining;
  _uploadedDocStatus;
  @api get uploadedDocStatus() {
    return this._uploadedDocStatus;
  }
  set uploadedDocStatus(value) {
    this._uploadedDocStatus = value;
  }

    
    startFlow () {
        console.log("startflow called");
        this.template.querySelector("c-dmv-start-flow").test();
        // pubsub.fire("filterchange");
        // fireEvent(
        //     this,
        //     "filterchange"
        //   );
    }
    connectedCallback() {
        console.log("training exam");
        const mitCaseUrl = window.location.href;
        const newURL = new URL(mitCaseUrl).searchParams;
        this.blaId = newURL.get("c__ContextId");
        console.log("Inside ConnectedCallBack DMV  Training Exam");
        this.getPersonExamDetails(this.blaId);
      }
      // renderedCallback(){
      //   this.getPersonExamDetails(this.blaId);
      // }
      getPersonExaminationDetails() {
        console.log("***result test");
        // fetch("/services/apexrest/Account/0013S000002j2LFQAY",{
        //   method: "GET"
        // }).then(response => response.json())
        // .then(data => console.log(data));
        const params = {
          input: {blaId:this.blaId},
          sClassName: "DMVBusinessDetails",
          sMethodName: "getPersonExamination",
          options: {}
        };
    
        this.omniRemoteCall(params, false)
          .then((response) => {
            window.console.log("traning exam response", response);
            if (response.result.success === null || response.result.success.length === 0) {
                this.showStartButton = true;
                // this.examStatus = "Not Started";
                this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-not-started";
                this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-not-started";
            } else {
                this.examType = response.result.success[0].Exam_Type__c;
                const examDate = new Date(response.result.success[0].Exam_Date__c);
                this.examDate = examDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                });
                if (!response.result.success[0].Exam_Taken_Flag__c && response.result.success[0].Exam_Status__c === "Not Started") {
                    this.showStartButton = true;
                    //this.examStatus = "Not Started";
                    this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-not-started";
                    this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-not-started";
                } else if (!response.result.success[0].Exam_Taken_Flag__c && response.result.success[0].Exam_Status__c === "Exam Scheduled") {
                    this.showStartButton = false;
                    this.showFailedMessage = false;
                    this.showSuccessMessage = false;
                    this.showRescheduleButton = true;
                    this.showScheduledMessage = true;
                    //this.examStatus = "In Progress";
                    this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-in-progress";
                    this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-complete";
                } else if (response.result.success[0].Exam_Taken_Flag__c && response.result.success[0].Exam_Status__c === "Exam Taken") {
                  this.showStartButton = false;
                  this.showFailedMessage = false;
                  this.showSuccessMessage = false;
                  this.showRescheduleButton = false;
                  this.showScheduledMessage = false;
                  //this.examStatus = "In Progress";
                  this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-in-progress";
                  this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-complete";
                } else if (response.result.success[0].Exam_Status__c === "Canceled") {
                  this.showStartButton = false;
                  this.showFailedMessage = false;
                  this.showSuccessMessage = false;
                  this.showRescheduleButton = true;
                  this.showScheduledMessage = false;
                  //this.examStatus = "In Progress";
                  this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-not-started";
                  this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-complete";
                } else if (response.result.success[0].Exam_Taken_Flag__c && response.result.success[0].Exam_Status__c === "Test Failed") {
                    this.showStartButton = false;
                    this.showRescheduleButton = true;
                    //this.examStatus = "In Progress";
                    this.showFailedMessage = true;
                    this.showSuccessMessage = false;
                    this.showScheduledMessage = false;
                    this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-in-progress";
                    this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-complete";
                } else if (response.result.success[0].Exam_Taken_Flag__c && response.result.success[0].Exam_Status__c === "Test Passed") {
                    this.showStartButton = false;
                    this.showRescheduleButton = false;
                    //this.examStatus = "Complete";
                    this.showSuccessMessage = true;
                    this.showFailedMessage = false;
                    this.showScheduledMessage = false;
                    this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-complete";
                    this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-complete";
                } else if (response.result.success[0].Exam_Taken_Flag__c && response.result.success[0].Exam_Status__c === "Canceled") {
                    this.showStartButton = false;
                    this.showRescheduleButton = true;
                    //this.examStatus = "Cancelled";
                    this.showSuccessMessage = false;
                    this.showFailedMessage = false;
                    this.showScheduledMessage = false;
                    this.cssClass = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-in-cancelled";
                } else if (!response.result.success[0].Exam_Taken_Flag__c && response.result.success[0].Exam_Status__c !== "Exam Taken") {
                    this.showStartButton = true;
                    //this.examStatus = "Not Started";
                    this.cssClassExamResult = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-not-started";
                    this.cssClassTraining = "dmv-businessFlows__pill slds-p-vertical_xx-small slds-p-horizontal_medium dmv-not-started";
                }
            }
            
          })
          .catch((error) => {
            window.console.log(error, "error");
          });
        // getAccountDetails("0013S000002j2LFQAY").then((result)=> {
        //   console.log("***result",result);
        // })
      }

      getPersonExamDetails(blaId) {
        const params = {
          input: {blaId: blaId},
          sClassName: "DMVBusinessDetails",
          sMethodName: "getPersonExamDetails",
          options: {}
        };
    
        this.omniRemoteCall(params, false)
          .then((response) => {
            window.console.log(response, "Exam Details from Dealer Training Exam: ",response);
            const personExamData = response.result.success;
            this.getPersonExaminationDetails();
            // this.getDealerTestingResult(personExamData.Id, personExamData.DriversLicenseNumber);
          })
          .catch((error) => {
            window.console.log(error, "error");
          });
      }
      
      getDealerTestingResult(personExamId,drivingLicenseNumber) {
        const params = {
          input: {personExamRecId: personExamId, dlNo: drivingLicenseNumber},
          sClassName: "CADMVHttpCalloutUtility",
          sMethodName: "checkDealerTestingResult",
          options: {}
        };
        this.omniRemoteCall(params, false)
          .then((response) => {
            window.console.log(response, "Dealer Testing Result : ",response);
            this.getPersonExaminationDetails();
          })
          .catch((error) => {
            window.console.log(error, "error");
          });
      }
}