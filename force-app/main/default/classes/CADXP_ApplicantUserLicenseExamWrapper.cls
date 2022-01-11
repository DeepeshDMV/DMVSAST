/**
*___________________________________________________
*@Name: 	CADXP_ApplicantUserLicenseExamWrapper
*@Author:   Aman Syed
*@Created: 	June 10, 2021
*@Used_By: 	CA DMV
*___________________________________________________
*/
public with sharing class CADXP_ApplicantUserLicenseExamWrapper {

    public string schema = 'http://json-schema.org/draft-04/schema#';
    public string type = 'object';
    public properties properties;
    public required[] required;

    public class properties{
       public m_test_result_code TEST_RESULT_CODE;
       public m_result result;
       public m_Affected Affected;
       public m_TotRecs TotRecs;
       public m_Skipped Skipped;
       public m_NumRecs NumRecs;
       public m_NumFields NumFields;
       public m_Records Records;
    }

    public class m_Affected{
        public Integer type = 10;
    }

    public class m_TotRecs{
        public Integer type = 10;
    }

    public class m_Skipped{
        public Integer type = 10;
    }

    public class m_NumRecs{
        public Integer type = 10;
    }

    public class m_NumFields{
        public Integer type = 10;
    }

    public class m_Records{
        public string type = '';
        public items items;
    }
    
    public class items{
        public string type = 'Test'; 
        //public properties properties;
        public required required;
    }

    public class m_test_result_code{
        public string description = ''; //{name: 02390909123, dataFormat: CHARACTER, type: CHAR}
        public string type = 'result';
    }

    public class required{
        public string result = '80%';
        public string skipped = '0%';
        public string totrecs = '100';
        public string numfields = '60';
        public string affected = '0';
    }

    public class m_result{
        public string type = 'P';
    }
}