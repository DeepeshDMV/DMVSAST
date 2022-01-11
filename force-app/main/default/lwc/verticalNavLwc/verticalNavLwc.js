import { LightningElement, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { NavigationMixin } from "lightning/navigation";
//import { registerListener, fireEvent } from "c/dmvPubSub";
export default class VerticalNavLwc extends NavigationMixin(LightningElement) {
  currentPage = "";
  activeTab = "";
  navigate(event) {
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: event.target.name
      }
    });
  }

  connectedCallback() {
    try {
      //registerListener("filterchange", this.fireApplicationEvent, this);
      this.activeTab = this.currentPage;
    } catch (error) {
      console.error("Error in connectedCallback", error);
    }
  }

  // fireApplicationEvent () {
  //   console.log("fire application event");

  // }

  navigateUrl() {
    window.location.href = "/s/profile/home";
  }

  pageRef;
  @wire(CurrentPageReference)
  wirePageRef(data) {
    try {
      if (data) {
        let pageRef = data;
        this.currentPage = pageRef.attributes.name;
      }
    } catch (error) {
      console.error("Error in wirePageRef", error);
    }
  }
  openMenu() {
   this.template.querySelector('.sidepanel').style.width = "-webkit-fill-available";
  }
  closeMenu() {
   this.template.querySelector('.sidepanel').style.width = "0";
  }
}