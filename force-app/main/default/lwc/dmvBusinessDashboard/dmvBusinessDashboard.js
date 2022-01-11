import { LightningElement } from "lwc";

export default class DmvBusinessDashboard extends LightningElement {
  columns = [
    {
      label: "Name",
      fieldName: "name",
      type: "url",
      typeAttributes: {
        label: { fieldName: "nameLabel" }
      }
    },
    {
      label: "Company",
      fieldName: "company",
      type: "url",
      typeAttributes: {
        label: { fieldName: "companyLabel" }
      }
    },
    { label: "Type", fieldName: "type", type: "text" },
    { label: "phone", fieldName: "phone", type: "phone" },
    { label: "Email", fieldName: "email", type: "email" }
  ];

  data = [
    {
      name: "google",
      company: "google",
      type: "test Type",
      phone: "1234567890",
      email: "test@mail.com",
      nameLabel: "Soham",
      companyLabel: "XYZ"
    },
    {
      name: "google",
      company: "google",
      type: "test Type",
      phone: "1234567890",
      email: "test@mail.com",
      nameLabel: "Soham",
      companyLabel: "XYZ"
    },
    {
      name: "google",
      company: "google",
      type: "test Type",
      phone: "1234567890",
      email: "test@mail.com",
      nameLabel: "Soham",
      companyLabel: "XYZ"
    }
  ];

  handleChange() {
    let detail = "1";
    this.dispatchEvent(
      new CustomEvent("handlebuttonchange", { detail: { detail } })
    );
  }
}