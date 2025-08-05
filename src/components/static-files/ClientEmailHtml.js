export default class ClientEmailHtml {
  static getHtml = () => {
    return `
      <table style="border-spacing: 0px; background-color:#f1f5fa; font-family: Arial, Helvetica, sans-serif; padding-top:12px; padding-bottom:12px; border-collapse: collapse" border="0" width="100%">
          <tbody>
              <tr>
                  <td style="width: 100%; align-content: center; text-align: center;">
                      <div align="center">
                          <table style="max-width: 600px; text-align: center; border-spacing: 0px; background-color:#ffffff;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <img width="600" src="../../images/DiagonalBKGMessagePrint.png">
                                      </td>
                                  </tr>

                                  <tr style="margin: 0px;">
                                      <td style="padding: 20px; background-color: #ffffff; text-align: center; color:#555555; font-family: Arial, Helvetica, sans-serif;">
                                          <span style="font-size: 20px; line-height: 40px; color:#012729">
                                              Message from ##branchName
                                          </span><br />

                                          <br />
                                          <div style="text-align: left; padding:16px 24px">
                                              <span style="font-size: 15px; line-height: 18px; color:#012729">
                                                  Hey ##clientFirstName,<br /><br />

                                                  <p>##message</p><br />

                                                  <p><strong>Appointment Time: ##appointmentTime</strong></p><br />

                                                  <strong>##staffName</strong><br />
                                              </span>
                                              <span style="font-size:13px;">##branchName<br />
                                                  ##branchAddress <br />
                                              </span>
                                          </div>

                                          <!-- SECTION 9 -->
                                          <table width="100%" border="0" cellpadding="0">
                                              <tbody><tr style="background-color: #e0e0e0;"><td style="font-size: 1px">&nbsp;</td></tr></tbody>
                                          </table>

                                          <table>
                                              <tr>
                                                  <td style="font-size: 16px; line-height: 24px; padding: 24px 24px 24px 24px;">
                                                      If you have any questions, contact us at <a href="tel:##branchMobile" style="color:#0cb4ce; text-decoration: none">##branchMobile</a> or email us at <a style="color:#0cb4ce; text-decoration: none" href="mailto:##branchEmail">##branchEmail</a>.
                                                  </td>
                                              </tr>
                                          </table>

                                          <!-- SECTION 9 -->
                                          <table width="100%" border="0" cellpadding="0">
                                              <tbody><tr style="background-color: #e0e0e0;"><td style="font-size: 1px">&nbsp;</td></tr></tbody>
                                          </table>

                                          <table>
                                              <tr>
                                                  <td style="font-size: 14px; line-height: 24px; padding: 24px 24px 24px 24px; color:#909090;">
                                                      Something wrong with the email?  <a href="###" style="color:#0cb4ce; text-decoration: none">View it in your browser.</a> <br /><br />
                                                      You're receiving this email because you are a client of <a href="##branchWebsite" target="_blank" style="color:#0cb4ce; text-decoration: none">##branchName</a> located at ##branchAddress.<br /><br />
                                                      Powered by <a href="https://whskr.com" target="_blank" style="color:#0cb4ce; text-decoration: none">Whskr™</a> 
                                                  </td>
                                              </tr>
                                          </table>

                                          <br /><br />
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
      &nbsp;
      `;
  };
}
