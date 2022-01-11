import { LightningElement } from "lwc";
import assets from "@salesforce/resourceUrl/dmvAssets";
export default class DmvTemplateHeader extends LightningElement {
  dmvLogo = assets + "/Logos/dmvLogo.PNG";

  logOut() {
    try {
      const urlOrigin = window.location.origin;
      const logOutUrl =
        urlOrigin +
        "/secur/logout.jsp?retUrl=https://cadxpdev-dmvpotdev.cs133.force.com/s/";
      window.location.href = logOutUrl;
    } catch (error) {
      console.error("Error in openLink " + error);
    }
  }
}