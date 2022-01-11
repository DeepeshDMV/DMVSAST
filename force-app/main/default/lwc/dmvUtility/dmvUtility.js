/**
 * @function deepCopy - To deep copy the Objects and store locally.
 * @param {*} obj - Passing obj as a parameter to deep copy the same into the output object.
 */
export function deepCopy(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    if (obj instanceof Array) {
      return obj.reduce((arr, item, i) => {
        arr[i] = deepCopy(item);
        return arr;
      }, []);
    }
    if (obj instanceof Object) {
      return Object.keys(obj).reduce((newObj, key) => {
        newObj[key] = deepCopy(obj[key]);
        return newObj;
      }, {});
    }
  }

 /**
 * @function isUndefinedOrNull - Checks if the object is undefined or null.
 * @param {object} obj - The object to check for.
 */
const isUndefinedOrNull = (obj) => obj === undefined || obj === null;

/**
 * @function setDMVData - Setting the local object which we received from SF in the very first SF call.
 * @param {*} data - Local object.
 */
export const setDMVData = data => {
    if (!isUndefinedOrNull(data)) {
        dmvDataWrapper.dmvWorkflowContext.AccountContactRelations = data.AccountContactRelations;
        dmvDataWrapper.dmvWorkflowContext.BusinessProfiles = data.BusinessProfiles;
        dmvDataWrapper.dmvWorkflowContext.Phone = data.Phone;
        dmvDataWrapper.dmvWorkflowContext.ShippingCity = data.ShippingCity;
        dmvDataWrapper.dmvWorkflowContext.ShippingPostalCode = data.ShippingPostalCode;
        dmvDataWrapper.dmvWorkflowContext.ShippingState = data.ShippingState;
        dmvDataWrapper.dmvWorkflowContext.ShippingStreet = data.ShippingStreet;
        dmvDataWrapper.dmvWorkflowContext.Website = data.Website;
        dmvDataWrapper.dmvWorkflowContext.id = data.id;
        dmvDataWrapper.dmvWorkflowContext.recordtypeid = data.recordtypeid;
    }
  };
  
  /**
   * @constant dmvDataWrapper - DMV Data Wrapper to maintain the local Data structure.
   */
  const dmvDataWrapper = Object.assign(
    {},
    {
      dmvWorkflowContext: {
        AccountContactRelations: [],
        BusinessProfiles: [],
        Phone: "",
        ShippingCity: "",
        ShippingPostalCode: "",
        ShippingState: "",
        ShippingStreet: "",
        Website: "",
        id: "",
        recordtypeid:""
      },
    }
  );
  
  /**
   * @function getDMVData - Getting the local object which we received from SF in the very first SF call.
   */
  export const getDMVData = () => dmvDataWrapper.dmvWorkflowContext;