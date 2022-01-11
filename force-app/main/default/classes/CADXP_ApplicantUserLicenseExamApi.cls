/**
*___________________________________________________
*@Name: 	CADXP_ApplicantUserLicenseExamApi
*@Author:   Aman Syed
*@Created: 	June 10, 2021
*@Used_By: 	CA DMV
*___________________________________________________
*/
@RestResource(urlMapping='/ExamResult/*')
global with sharing class CADXP_ApplicantUserLicenseExamApi {
   
     /**
    *————————————————————————————————————————————————————
    * @Name: getLicenseResponse
    * @Author: Aman Syed
    * URI: /services/apexrest/ExamResult
    *————————————————————————————————————————————————————
    **/
    @HttpPost
    global static void getLicenseResponse() {
        RestRequest request = RestContext.request;
        RestResponse response = RestContext.response;

        CADXP_ApplicantUserLicenseExamWrapper.required rr = new CADXP_ApplicantUserLicenseExamWrapper.required();
        CADXP_ApplicantUserLicenseExamWrapper.properties p = new CADXP_ApplicantUserLicenseExamWrapper.properties(); 
        p.NumFields = new CADXP_ApplicantUserLicenseExamWrapper.m_NumFields();
        p.NumRecs = new CADXP_ApplicantUserLicenseExamWrapper.m_NumRecs();
        p.Skipped = new CADXP_ApplicantUserLicenseExamWrapper.m_Skipped();
        p.Affected = new CADXP_ApplicantUserLicenseExamWrapper.m_Affected();
        p.TotRecs = new CADXP_ApplicantUserLicenseExamWrapper.m_TotRecs();
        p.TEST_RESULT_CODE = new CADXP_ApplicantUserLicenseExamWrapper.m_test_result_code();
        p.result = new CADXP_ApplicantUserLicenseExamWrapper.m_result();
        CADXP_ApplicantUserLicenseExamWrapper.items it = new CADXP_ApplicantUserLicenseExamWrapper.items();
        it.required = rr;
        CADXP_ApplicantUserLicenseExamWrapper.m_Records record = new CADXP_ApplicantUserLicenseExamWrapper.m_Records(); record.items = it; 
        p.Records = record;
        CADXP_ApplicantUserLicenseExamWrapper aulw = new CADXP_ApplicantUserLicenseExamWrapper(); aulw.properties = p; aulw.required = null;
        response.statusCode = 200; 
        response.responseBody = Blob.valueOf(JSON.serialize(aulw));
    }
}