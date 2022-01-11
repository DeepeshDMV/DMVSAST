import { LightningElement } from "lwc";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { NavigationMixin } from "lightning/navigation";

const actions = [{ label: "Show details", name: "show_details" }];

const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Created Date", fieldName: "CreatedDate", type: "date" },
  { label: "Created By", fieldName: "CreatedByName" },
  { label: "Status", fieldName: "Status" },
  { label: "Amount", fieldName: "TotalAmount", type: "currency" },
  {
    type: "action",
    typeAttributes: { rowActions: actions }
  }
];

const columns1 = [
  { label: "Checkout", fieldName: "Name" },
  { label: "Checkout Status", fieldName: "CreatedDate", type: "date" },
  { label: "Checkout Submitted By", fieldName: "CreatedByName" },
  { label: "Checkout Date Time", fieldName: "Status" }
];

const columns2 = [
  { label: "Fee Parent", fieldName: "ParentRecordName" },
  { label: "Fee Number", fieldName: "ParentRecordId" },
  { label: "Amount", fieldName: "TotalFeeAmount", type: "currency" },
  {
    label: "Total Checkout Amount",
    fieldName: "TotalFeeAmount",
    type: "currency"
  }
];

const columns3 = [
  { label: "Confirmation Number", fieldName: "Name" },
  { label: "Status", fieldName: "CreatedDate", type: "date" },
  { label: "Payment Method", fieldName: "CreatedByName" },
  { label: "Card Type", fieldName: "Status" },
  { label: "Last 4 Digits", fieldName: "TotalAmount", type: "currency" },
  { label: "Amount", fieldName: "TotalAmount", type: "currency" },
  { label: "Paid Amount", fieldName: "TotalAmount", type: "currency" }
];

export default class DmvBusinessLicenseFees extends OmniscriptBaseMixin(
  NavigationMixin(LightningElement)
) {
  data = [];
  columns = columns;
  columns1 = columns1;
  columns2 = columns2;
  columns3 = columns3;
  openModal = false;
  record = {};
  contextId = "";
  accountId = "";
  regulatory = "";
  // eslint-disable-next-line @lwc/lwc/no-async-await
  connectedCallback() {
    // this.data = [
    //   {
    //     amount: "4.24",
    //     closeAt: "2021-07-15T14:23:34.325Z",
    //     email: "Nikko14@gmail.com",
    //     id: "c45d1f8c-772b-4eec-bf1f-30b3c268a1a5",
    //     name: "Johann Ryan",
    //     phone: "401-894-1235",
    //     website: "https://kiley.name"
    //   },
    //   {
    //     amount: "4.24",
    //     closeAt: "2021-07-15T14:23:34.325Z",
    //     email: "Nikko14@gmail.com",
    //     id: "c45d1f8c-772b-4eec-bf1f-30b3c268a1a6",
    //     name: "Johann Ryan",
    //     phone: "401-894-1235",
    //     website: "https://kiley.name"
    //   },
    //   {
    //     amount: "4.24",
    //     closeAt: "2021-07-15T14:23:34.325Z",
    //     email: "Nikko14@gmail.com",
    //     id: "c45d1f8c-772b-4eec-bf1f-30b3c268a1a7",
    //     name: "Johann Ryan",
    //     phone: "401-894-1235",
    //     website: "https://kiley.name"
    //   },
    //   {
    //     amount: "4.24",
    //     closeAt: "2021-07-15T14:23:34.325Z",
    //     email: "Nikko14@gmail.com",
    //     id: "c45d1f8c-772b-4eec-bf1f-30b3c268a1a8",
    //     name: "Johann Ryan",
    //     phone: "401-894-1235",
    //     website: "https://kiley.name"
    //   },
    //   {
    //     amount: "4.24",
    //     closeAt: "2021-07-15T14:23:34.325Z",
    //     email: "Nikko14@gmail.com",
    //     id: "c45d1f8c-772b-4eec-bf1f-30b3c268a1a9",
    //     name: "Johann Ryan",
    //     phone: "401-894-1235",
    //     website: "https://kiley.name"
    //   }
    // ];

    const mitCaseUrl = window.location.href;
    const newURL = new URL(mitCaseUrl).searchParams;
    this.contextId = newURL.get("c__ContextId");
    this.accountId = newURL.get("c__aid");
    this.regulatory = newURL.get("c__RegTracFee");
    this.getBusinessAccountDetails();
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "delete":
        this.deleteRow(row);
        break;
      case "show_details":
        this.showRowDetails(row);
        break;
      default:
    }
  }

  getBusinessAccountDetails() {
    console.log("***result business test", this.accountId);
    const params = {
      input: { accountId: this.accountId },
      sClassName: "DMVBusinessDetails",
      sMethodName: "getCheckoutDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(response, "response business details");
        this.data = response.result.success;
        this.checkoutId = response.result.success[0].Id;
        this.getRelatedBusinessAccountDetails();
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  }

  getRelatedBusinessAccountDetails() {
    console.log("***result relatedbusiness test", this.accountId);
    const params = {
      input: { checkoutId: this.checkoutId },
      sClassName: "DMVBusinessDetails",
      sMethodName: "getCheckoutRelatedDetails",
      options: {}
    };

    this.omniRemoteCall(params, false)
      .then((response) => {
        window.console.log(response, "response related business details");
        this.regulatoryFeeData =
          response.result.success.RegulatoryTransactionFee;
        console.log("this.regulatoryFeeData", this.regulatoryFeeData);
      })
      .catch((error) => {
        window.console.log(error, "error");
      });
  }

  // deleteRow(row) {
  //     const { id } = row;
  //     const index = this.findRowIndexById(id);
  //     if (index !== -1) {
  //         this.data = this.data
  //             .slice(0, index)
  //             .concat(this.data.slice(index + 1));
  //     }
  // }

  findRowIndexById(id) {
    let ret = -1;
    this.data.some((row, index) => {
      if (row.id === id) {
        ret = index;
        return true;
      }
      return false;
    });
    return ret;
  }

  showRowDetails(row) {
    this.record = row;
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }

  navigateTo() {
    this[NavigationMixin.Navigate]({
      type: "standard__namedPage",
      attributes: {
        name: "Salesperson_Application_Submission__c"
      },
      state: {
        c__ContextId: this.contextId,
        c__aid: this.accountId,
        c__RegTracFee: this.regulatory
      }
    });
  }
}