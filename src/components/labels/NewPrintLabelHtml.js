export default class NewPrintLabelHtml {
  static getHtml = () => {
    return `<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Label Print</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
	
<style type="text/css">
	
html, body {
    background-color: #F0F0F0;
    font-family: 'Poppins', sans-serif;
}
h3 {
    font-weight: 600;
    font-size: 16px
}
p {
    font-weight: 300;
    font-size: 14px;
}
hr {
    height: 1px;
    border-width: 0;
	margin: 5px;
    color: #e0e0e0;
    background-color: #e0e0e0;
}

.paper {
    background-color: white;
    box-shadow: 2px 2px 10px 2px #CCCCCC;
    margin: 0em auto;
    overflow: hidden;
/*    padding: 1.5cm 2cm;*/
	padding: 0.5cm 0.5cm;
    width: 102mm;
	height:50mm;
	zoom:200%;
}


@media print {
.paper {
	zoom:100%;
    border: none;
    box-shadow: none;
    margin: 0;

}

hr {
    height: 1px;
    border-width: 0;
    color: #252525;
	margin: 5px;
    background-color: #252525;
    -webkit-print-color-adjust: exact;
}
	.warningStrip {
		-webkit-print-color-adjust: exact;
	}
	
.historyBlock {
    background-color: #f5f5f5;
    -webkit-print-color-adjust: exact;
}
}
	</style>
	
	</head>

<body>
	<div class="paper"> 
	<table width="100%" border="0" margin="0px">
  <tbody>
    <tr>
      	<td width="50%" align="left" style="font-size: 8px"> <strong style="font-size:10px">##companyName</strong><br />1234 Main Rd., Ste C309 <br /> Sandy Springs ,GA 303200</td>
		<td width="50%" align="right" style="font-size: 8px">##mobile <br /> Date: ##dateFilled</td>
    </tr>
  </tbody>
</table>
		<hr/>
		<table width="100%" border="0">
  <tbody>
    <tr>
      <td width="85%" style="font-size: 10px; font-weight: 500">##dispensableName</td>
		 <td width="15%" style="font-size: 10px">QTY: ##quantity</td>
    </tr>
	  <tr>
      <td style="font-size: 8px">##rxInstructions</td>
    </tr>
  </tbody>
</table>
		<hr/>
		<table width="100%" border="0">
  <tbody>
    <tr style="font-size: 9px">
      <td width="25%">Refills: ##refills</td>
      <td width="33%">Exp: ##refillExpirationDate</td>
      <td width="33%" align="right">##veterinarian</td>
    </tr>
  </tbody>
</table>
		<hr/>
		<table width="100%" border="0">
  <tbody>
    <tr style="font-size: 10px">
      <td>##patientName ##animalFamily</td>
      <td align="right">##clientName (Owner)</td>
    </tr>
  </tbody>
</table>
		<table width="100%" border="0" style="margin-top:5px">
  <tbody>
    <tr class="warningStrip" style="font-size: 8px; font-weight: 500; color:#ffffff; background-color:#252525">
      <td align="center">KEEP OUT OF REACH OF CHILDREN - FOR VETERINARY USE ONLY</td>
    </tr>
  </tbody>
</table>


	</div>
</body>
</html>`;
  };
}
