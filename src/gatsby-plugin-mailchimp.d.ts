// declare module "gatsby-plugin-mailchimp" {
//   export default function addToMailchimp(
//     email: string,
//     fields?: object,
//     endpointOverride?: string
//   ): Promise<object>;
// }

declare module "gatsby-plugin-mailchimp" {
  import * as React from "react";

  type MailchimpResult = "success" | "error";

  export interface MailchimpResponse {
    result: MailchimpResult;
    msg: string;
  }

  export interface MailchimpFields {
    [key: string]: string;
  }

  function addToMailchimp(
    email: String,
    listFields?: MailchimpFields
  ): Promise<MailchimpResponse>;
  export default addToMailchimp;
}
