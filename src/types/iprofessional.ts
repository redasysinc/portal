import * as mongoose from "mongoose";

mongoose.connect(`${import.meta.env.VITE_CONNSTR}/portal`)

export interface IProfessional extends mongoose.Document {
  NPI: string
  Entity_Type_Code: string
  Replacement_NPI: string
  Employer_Identification_Number: string
  ProviderOrganizationName_Legal_Business_Name: string
  ProviderLastName_Legal_Name: string
  Provider_First_Name: string
  Provider_Middle_Name: string
  Provider_Name_Prefix_Text: string
  Provider_Name_Suffix_Text: string
  Provider_Credential_Text: string
  Provider_Other_Organization_Name: string
  Provider_Other_Organization_Name_Type_Code: string
  Provider_Other_Last_Name: string
  Provider_Other_First_Name: string
  Provider_Other_Middle_Name: string
  Provider_Other_Name_Prefix_Text: string
  Provider_Other_Name_Suffix_Text: string
  Provider_Other_Credential_Text: string
  Provider_Other_Last_Name_Type_Code: string
  Provider_First_Line_Business_Mailing_Address: string
  Provider_Second_Line_Business_Mailing_Address: string
  Provider_Business_Mailing_Address_City_Name: string
  Provider_Business_Mailing_Address_State_Name: string
  Provider_Business_Mailing_Address_Postal_Code: string
  Provider_Business_Mailing_Address_Country_Code: string
  Provider_Business_Mailing_Address_Telephone_Number: string
  Provider_Business_Mailing_Address_Fax_Number: string
  Provider_First_Line_Business_Practice_Location_Address: string
  Provider_Second_Line_Business_Practice_Location_Address: string
  Provider_Business_Practice_Location_Address_City_Name: string
  Provider_Business_Practice_Location_Address_State_Name: string
  Provider_Business_Practice_Location_Address_Postal_Code: string
  Provider_Business_Practice_Location_Address_Country_Code: string
  Provider_Business_Practice_Location_Address_Telephone_Number: string
  Provider_Business_Practice_Location_Address_Fax_Number: string
  Provider_Enumeration_Date: string
  Last_Update_Date: string
  NPI_Deactivation_Reason_Code: string
  NPI_Deactivation_Date: string
  NPI_Reactivation_Date: string
  Provider_Gender_Code: string
  Authorized_Official_Last_Name: string
  Authorized_Official_First_Name: string
  Authorized_Official_Middle_Name: string
  Authorized_Official_Title_Or_Position: string
  Authorized_Official_Telephone_Number: string
  Is_Sole_Proprietor: string
  Is_Organization_Subpart: string
  Parent_Organization_LBN: string
  Parent_Organization_TIN: string
  Authorized_Official_Name_Prefix_Text: string
  Authorized_Official_Name_Suffix_Text: string
  Authorized_Official_Credential_Text: string
  Certification_Date: string
  HealthcareProviderData: HealthcareProviderDaum[]
  HealthcareProviderTaxonomyGroupData: any[]
  OtherProviderData: any[]
  OtherNameReferenceLayout: any[]
  PracticeLocationReferenceLayout: any[]
  Endpoint_Layout: any[]
}

export const ProfSchema = new mongoose.Schema({
  NPI: {type:String, required:false},
  Entity_Type_Code: {type:String, required:false},
  Replacement_NPI: {type:String, required:false},
  Employer_Identification_Number: {type:String, required:false},
  ProviderOrganizationName_Legal_Business_Name: {type:String, required:false},
  ProviderLastName_Legal_Name: {type:String, required:false},
  Provider_First_Name: {type:String, required:false},
  Provider_Middle_Name: {type:String, required:false},
  Provider_Name_Prefix_Text: {type:String, required:false},
  Provider_Name_Suffix_Text: {type:String, required:false},
  Provider_Credential_Text: {type:String, required:false},
  Provider_Other_Organization_Name: {type:String, required:false},
  Provider_Other_Organization_Name_Type_Code: {type:String, required:false},
  Provider_Other_Last_Name: {type:String, required:false},
  Provider_Other_First_Name: {type:String, required:false},
  Provider_Other_Middle_Name: {type:String, required:false},
  Provider_Other_Name_Prefix_Text: {type:String, required:false},
  Provider_Other_Name_Suffix_Text: {type:String, required:false},
  Provider_Other_Credential_Text: {type:String, required:false},
  Provider_Other_Last_Name_Type_Code: {type:String, required:false},
  Provider_First_Line_Business_Mailing_Address: {type:String, required:false},
  Provider_Second_Line_Business_Mailing_Address: {type:String, required:false},
  Provider_Business_Mailing_Address_City_Name: {type:String, required:false},
  Provider_Business_Mailing_Address_State_Name: {type:String, required:false},
  Provider_Business_Mailing_Address_Postal_Code: {type:String, required:false},
  Provider_Business_Mailing_Address_Country_Code: {type:String, required:false},
  Provider_Business_Mailing_Address_Telephone_Number: {type:String, required:false},
  Provider_Business_Mailing_Address_Fax_Number: {type:String, required:false},
  Provider_First_Line_Business_Practice_Location_Address: {type:String, required:false},
  Provider_Second_Line_Business_Practice_Location_Address: {type:String, required:false},
  Provider_Business_Practice_Location_Address_City_Name: {type:String, required:false},
  Provider_Business_Practice_Location_Address_State_Name: {type:String, required:false},
  Provider_Business_Practice_Location_Address_Postal_Code: {type:String, required:false},
  Provider_Business_Practice_Location_Address_Country_Code: {type:String, required:false},
  Provider_Business_Practice_Location_Address_Telephone_Number: {type:String, required:false},
  Provider_Business_Practice_Location_Address_Fax_Number: {type:String, required:false},
  Provider_Enumeration_Date: {type:String, required:false},
  Last_Update_Date: {type:String, required:false},
  NPI_Deactivation_Reason_Code: {type:String, required:false},
  NPI_Deactivation_Date: {type:String, required:false},
  NPI_Reactivation_Date: {type:String, required:false},
  Provider_Gender_Code: {type:String, required:false},
  Authorized_Official_Last_Name: {type:String, required:false},
  Authorized_Official_First_Name: {type:String, required:false},
  Authorized_Official_Middle_Name: {type:String, required:false},
  Authorized_Official_Title_Or_Position: {type:String, required:false},
  Authorized_Official_Telephone_Number: {type:String, required:false},
  Is_Sole_Proprietor: {type:String, required:false},
  Is_Organization_Subpart: {type:String, required:false},
  Parent_Organization_LBN: {type:String, required:false},
  Parent_Organization_TIN: {type:String, required:false},
  Authorized_Official_Name_Prefix_Text: {type:String, required:false},
  Authorized_Official_Name_Suffix_Text: {type:String, required:false},
  Authorized_Official_Credential_Text: {type:String, required:false},
  Certification_Date: {type:String, required:false}
})

const Provider = mongoose.model<IProfessional>('Professional', ProfSchema)

export default Provider
