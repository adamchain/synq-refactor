export default class RecieptEmailHtml {
  static getHtml = () => {
    return `<table style="border-spacing: 0px; background-color:#f1f5fa; font-family: Arial, Helvetica, sans-serif; padding-top:12px; padding-bottom:12px; border-collapse: collapse" border="0" width="100%">
  <tbody>

    <tr>
      <td style="width: 100%; align-content: center; text-align: center;">
        <div align="center">
          <table style="max-width: 600px; text-align: center; border-spacing: 0px; background-color:#ffffff;">
            <tbody>
              <tr>
                <td>
					<img width="100%" src="Images/DiagonalBKGEstimate3.png">

                </td>
              </tr>

<!--
              <tr align="center">
                <td><div style="z-index:2; background:linear-gradient(45deg, rgb(12, 180, 206) 0%, #a145ff 100%);border:5px solid white; height: 85px; width: 85px; border-radius: 56px; margin-top:-80px; font-family:Arial, Helvetica, sans-serif; font-weight: 800; font-size: 54px; color: #ffffff; vertical-align: middle"><img width="50px" src="estimate.png" style="padding-top:18px; padding-left: 6px" /></div></td>
              </tr> -->
              <tr style="margin: 0px;">
                <td style="padding: 20px; background-color: #ffffff; text-align: center; color:#555555; font-family: Arial, Helvetica, sans-serif;">

                  <span style="font-size: 20px; line-height: 40px; color:#012729">Reciept from  ##branchName</span><br />
					<span style="font-weight: 500; color:#909090">Reciept ##id</span>
                  

                  <br /><br />
                  <div style="text-align: left; padding:16px 24px">

                  <!-- SECTION 2 -->
                  <table width="100%" style="padding-bottom: 24px">
					<tbody>
					<tr>
					<td width="33%" align="left"><span style="font-weight: 600; color:#909090; font-size:12px">TOTAL</span></td>
					<td width="33%" align="left"><span style="font-weight: 600; color:#909090; font-size:12px">DATE PAID</span></td>
					<td width="33%" align="left"><span style="font-weight: 600; color:#909090; font-size:12px">PAYMENT METHOD</span></td>
					
					</tr>
					<tr>
					<td width="33%" align="left"><span style="font-weight: 400; color:#012729; font-size:18px">##total</span></td>
					<td width="33%" align="left"><span style="font-weight: 400; color:#012729; font-size:18px">##date</td>
						<td width="33%" align="left"><span style="font-weight: 400; color:#012729; font-size:18px">TO-DO</td>
					
					</tr>
						
					</tbody>
				</table>
					 
					  <span style="font-weight: 600; color:#909090; font-size:12px;">PAYMENT SUMMARY</span><br /><br />
					  <div style="background: #f7f9fd; border-radius: 6px; padding:12px 12px 24px 12px; margin-bottom: 24px;">
						  
						  <table width="100%" cellpadding="12px"  style="color:#012729; border-collapse: collapse;">
							<tbody>
							<tr style="border-bottom: 1px solid #e7eaef">
								<td width="70%" style="font-size: 12px; color: #909090; font-weight:600">ITEM</td>
								<td align="right" width="10%" style="font-size: 12px; color: #909090; font-weight:600">QTY</td>
								<td align="right" width="20%" style="font-size: 12px; color: #909090; font-weight:600">PRICE</td>
								
							</tr>
							##items
							</tbody>
							</table>
					  
					  </div>
					
					</div>

                  <!-- SECTION 9 -->
                  <table width="100%" border="0" cellpadding="0">
                    <tbody>
                      <tr style="background-color: #e0e0e0;">
                        <td style="font-size: 1px">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                 
                  <table>
					  <tr>
						  <td style="font-size: 16px; line-height: 24px; padding: 24px 24px 24px 24px;">
							  If you have any questions, contact us at <a href="tel:##branchMobile" style="color:#0cb4ce; text-decoration: none">##branchMobile1</a> or email us at <a style="color:#0cb4ce; text-decoration: none" href="mailto:##branchEmail">##branchEmail1</a></span>.
					  </td>
					</tr>
				</table>
			<!-- SECTION 9 -->
                  <table width="100%" border="0" cellpadding="0">
                    <tbody>
                      <tr style="background-color: #e0e0e0;">
                        <td style="font-size: 1px">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
				  <table>
					  <tr>
						  <td style="font-size: 14px; line-height: 24px; padding: 24px 24px 24px 24px; color:#909090;">
							 <!-- Something wrong with the email?  <a href="###" target= "_blank" style="color:#0cb4ce; text-decoration: none">View it in your browser.</a> <br /><br /> -->
							  You're recieving this email because you have requested an estimate from <a href="##branchWebsite" target= "_blank" style="color:#0cb4ce; text-decoration: none">##branchName1</a> located at ##branchAddress<br /><br />
							  Powered by <a href="https://salon.synqsoftware.com" target= "_blank" style="color:#0cb4ce; text-decoration: none">Whskr™</a> 
						  </td>
					  </tr>
				</table>
                  <br />
                  <br />
                </td>
              </tr>
            </tbody>
          </table>

      </td>
    </tr>
  </tbody>
</table>`;
  };
}
