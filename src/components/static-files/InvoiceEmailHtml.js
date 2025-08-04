export default class InvoiceEmailHtml {
  static getHtml = () => {
    return `<!doctype html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Medical Record Print</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
	<style type="text/css">
	/* Gumby Grid */
	.row {
		width: 100%;
		max-width: 980px;
		min-width: 320px;
		margin: 0 auto;
		padding-left: 20px;
		padding-right: 20px;
	}
	.row .row {
		min-width: 0;
		padding-left: 0;
		padding-right: 0;
	}
	/* To fix the grid into a different size, set max-width to your desired width */
	.column, .columns {
		margin-left: 2.12766%;
		float: left;
		min-height: 1px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.column:first-child, .columns:first-child, .alpha {
		margin-left: 0;
	}
	.column.omega, .columns.omega {
		float: right;
	}
	/* Column Classes */
	.row .one.column {
		width: 6.38298%;
	}
	.row .one.columns {
		width: 6.38298%;
	}
	.row .two.columns {
		width: 14.89362%;
	}
	.row .three.columns {
		width: 23.40426%;
	}
	.row .four.columns {
		width: 31.91489%;
	}
	.row .five.columns {
		width: 40.42553%;
	}
	.row .six.columns {
		width: 48.93617%;
	}
	.row .seven.columns {
		width: 57.44681%;
	}
	.row .eight.columns {
		width: 65.95745%;
	}
	.row .nine.columns {
		width: 74.46809%;
	}
	.row .ten.columns {
		width: 82.97872%;
	}
	.row .eleven.columns {
		width: 91.48936%;
	}
	.row .twelve.columns {
		width: 100%;
	}
	/* Push and Pull Classes */
	.row .push_one {
		margin-left: 10.6383%;
	}
	.row .push_one:first-child {
		margin-left: 8.51064%;
	}
	.row .pull_one.one.column {
		margin-left: -14.89362%;
	}
	.row .pull_one.two.columns {
		margin-left: -23.40426%;
	}
	.row .pull_one.three.columns {
		margin-left: -31.91489%;
	}
	.row .pull_one.four.columns {
		margin-left: -40.42553%;
	}
	.row .pull_one.five.columns {
		margin-left: -48.93617%;
	}
	.row .pull_one.six.columns {
		margin-left: -57.44681%;
	}
	.row .pull_one.seven.columns {
		margin-left: -65.95745%;
	}
	.row .pull_one.eight.columns {
		margin-left: -74.46809%;
	}
	.row .pull_one.nine.columns {
		margin-left: -82.97872%;
	}
	.row .pull_one.ten.columns {
		margin-left: -91.48936%;
	}
	.row .push_two {
		margin-left: 19.14894%;
	}
	.row .push_two:first-child {
		margin-left: 17.02128%;
	}
	.row .pull_two.one.column {
		margin-left: -23.40426%;
	}
	.row .pull_two.two.columns {
		margin-left: -31.91489%;
	}
	.row .pull_two.three.columns {
		margin-left: -40.42553%;
	}
	.row .pull_two.four.columns {
		margin-left: -48.93617%;
	}
	.row .pull_two.five.columns {
		margin-left: -57.44681%;
	}
	.row .pull_two.six.columns {
		margin-left: -65.95745%;
	}
	.row .pull_two.seven.columns {
		margin-left: -74.46809%;
	}
	.row .pull_two.eight.columns {
		margin-left: -82.97872%;
	}
	.row .pull_two.nine.columns {
		margin-left: -91.48936%;
	}
	.row .pull_two.eleven.columns {
		margin-left: -108.51064%;
	}
	.row .push_three {
		margin-left: 27.65957%;
	}
	.row .push_three:first-child {
		margin-left: 25.53191%;
	}
	.row .pull_three.one.column {
		margin-left: -31.91489%;
	}
	.row .pull_three.two.columns {
		margin-left: -40.42553%;
	}
	.row .pull_three.three.columns {
		margin-left: -48.93617%;
	}
	.row .pull_three.four.columns {
		margin-left: -57.44681%;
	}
	.row .pull_three.five.columns {
		margin-left: -65.95745%;
	}
	.row .pull_three.six.columns {
		margin-left: -74.46809%;
	}
	.row .pull_three.seven.columns {
		margin-left: -82.97872%;
	}
	.row .pull_three.eight.columns {
		margin-left: -91.48936%;
	}
	.row .pull_three.ten.columns {
		margin-left: -108.51064%;
	}
	.row .pull_three.eleven.columns {
		margin-left: -117.02128%;
	}
	.row .push_four {
		margin-left: 36.17021%;
	}
	.row .push_four:first-child {
		margin-left: 34.04255%;
	}
	.row .pull_four.one.column {
		margin-left: -40.42553%;
	}
	.row .pull_four.two.columns {
		margin-left: -48.93617%;
	}
	.row .pull_four.three.columns {
		margin-left: -57.44681%;
	}
	.row .pull_four.four.columns {
		margin-left: -65.95745%;
	}
	.row .pull_four.five.columns {
		margin-left: -74.46809%;
	}
	.row .pull_four.six.columns {
		margin-left: -82.97872%;
	}
	.row .pull_four.seven.columns {
		margin-left: -91.48936%;
	}
	.row .pull_four.nine.columns {
		margin-left: -108.51064%;
	}
	.row .pull_four.ten.columns {
		margin-left: -117.02128%;
	}
	.row .pull_four.eleven.columns {
		margin-left: -125.53191%;
	}
	.row .push_five {
		margin-left: 44.68085%;
	}
	.row .push_five:first-child {
		margin-left: 42.55319%;
	}
	.row .pull_five.one.column {
		margin-left: -48.93617%;
	}
	.row .pull_five.two.columns {
		margin-left: -57.44681%;
	}
	.row .pull_five.three.columns {
		margin-left: -65.95745%;
	}
	.row .pull_five.four.columns {
		margin-left: -74.46809%;
	}
	.row .pull_five.five.columns {
		margin-left: -82.97872%;
	}
	.row .pull_five.six.columns {
		margin-left: -91.48936%;
	}
	.row .pull_five.eight.columns {
		margin-left: -108.51064%;
	}
	.row .pull_five.nine.columns {
		margin-left: -117.02128%;
	}
	.row .pull_five.ten.columns {
		margin-left: -125.53191%;
	}
	.row .pull_five.eleven.columns {
		margin-left: -134.04255%;
	}
	.row .push_six {
		margin-left: 53.19149%;
	}
	.row .push_six:first-child {
		margin-left: 51.06383%;
	}
	.row .pull_six.one.column {
		margin-left: -57.44681%;
	}
	.row .pull_six.two.columns {
		margin-left: -65.95745%;
	}
	.row .pull_six.three.columns {
		margin-left: -74.46809%;
	}
	.row .pull_six.four.columns {
		margin-left: -82.97872%;
	}
	.row .pull_six.five.columns {
		margin-left: -91.48936%;
	}
	.row .pull_six.seven.columns {
		margin-left: -108.51064%;
	}
	.row .pull_six.eight.columns {
		margin-left: -117.02128%;
	}
	.row .pull_six.nine.columns {
		margin-left: -125.53191%;
	}
	.row .pull_six.ten.columns {
		margin-left: -134.04255%;
	}
	.row .pull_six.eleven.columns {
		margin-left: -142.55319%;
	}
	.row .push_seven {
		margin-left: 61.70213%;
	}
	.row .push_seven:first-child {
		margin-left: 59.57447%;
	}
	.row .pull_seven.one.column {
		margin-left: -65.95745%;
	}
	.row .pull_seven.two.columns {
		margin-left: -74.46809%;
	}
	.row .pull_seven.three.columns {
		margin-left: -82.97872%;
	}
	.row .pull_seven.four.columns {
		margin-left: -91.48936%;
	}
	.row .pull_seven.six.columns {
		margin-left: -108.51064%;
	}
	.row .pull_seven.seven.columns {
		margin-left: -117.02128%;
	}
	.row .pull_seven.eight.columns {
		margin-left: -125.53191%;
	}
	.row .pull_seven.nine.columns {
		margin-left: -134.04255%;
	}
	.row .pull_seven.ten.columns {
		margin-left: -142.55319%;
	}
	.row .pull_seven.eleven.columns {
		margin-left: -151.06383%;
	}
	.row .push_eight {
		margin-left: 70.21277%;
	}
	.row .push_eight:first-child {
		margin-left: 68.08511%;
	}
	.row .pull_eight.one.column {
		margin-left: -74.46809%;
	}
	.row .pull_eight.two.columns {
		margin-left: -82.97872%;
	}
	.row .pull_eight.three.columns {
		margin-left: -91.48936%;
	}
	.row .pull_eight.five.columns {
		margin-left: -108.51064%;
	}
	.row .pull_eight.six.columns {
		margin-left: -117.02128%;
	}
	.row .pull_eight.seven.columns {
		margin-left: -125.53191%;
	}
	.row .pull_eight.eight.columns {
		margin-left: -134.04255%;
	}
	.row .pull_eight.nine.columns {
		margin-left: -142.55319%;
	}
	.row .pull_eight.ten.columns {
		margin-left: -151.06383%;
	}
	.row .pull_eight.eleven.columns {
		margin-left: -159.57447%;
	}
	.row .push_nine {
		margin-left: 78.7234%;
	}
	.row .push_nine:first-child {
		margin-left: 76.59574%;
	}
	.row .pull_nine.one.column {
		margin-left: -82.97872%;
	}
	.row .pull_nine.two.columns {
		margin-left: -91.48936%;
	}
	.row .pull_nine.four.columns {
		margin-left: -108.51064%;
	}
	.row .pull_nine.five.columns {
		margin-left: -117.02128%;
	}
	.row .pull_nine.six.columns {
		margin-left: -125.53191%;
	}
	.row .pull_nine.seven.columns {
		margin-left: -134.04255%;
	}
	.row .pull_nine.eight.columns {
		margin-left: -142.55319%;
	}
	.row .pull_nine.nine.columns {
		margin-left: -151.06383%;
	}
	.row .pull_nine.ten.columns {
		margin-left: -159.57447%;
	}
	.row .pull_nine.eleven.columns {
		margin-left: -168.08511%;
	}
	.row .push_ten {
		margin-left: 87.23404%;
	}
	.row .push_ten:first-child {
		margin-left: 85.10638%;
	}
	.row .pull_ten.one.column {
		margin-left: -91.48936%;
	}
	.row .pull_ten.three.columns {
		margin-left: -108.51064%;
	}
	.row .pull_ten.four.columns {
		margin-left: -117.02128%;
	}
	.row .pull_ten.five.columns {
		margin-left: -125.53191%;
	}
	.row .pull_ten.six.columns {
		margin-left: -134.04255%;
	}
	.row .pull_ten.seven.columns {
		margin-left: -142.55319%;
	}
	.row .pull_ten.eight.columns {
		margin-left: -151.06383%;
	}
	.row .pull_ten.nine.columns {
		margin-left: -159.57447%;
	}
	.row .pull_ten.ten.columns {
		margin-left: -168.08511%;
	}
	.row .pull_ten.eleven.columns {
		margin-left: -176.59574%;
	}
	.row .push_eleven {
		margin-left: 95.74468%;
	}
	.row .push_eleven:first-child {
		margin-left: 93.61702%;
	}
	.row .pull_eleven.two.columns {
		margin-left: -108.51064%;
	}
	.row .pull_eleven.three.columns {
		margin-left: -117.02128%;
	}
	.row .pull_eleven.four.columns {
		margin-left: -125.53191%;
	}
	.row .pull_eleven.five.columns {
		margin-left: -134.04255%;
	}
	.row .pull_eleven.six.columns {
		margin-left: -142.55319%;
	}
	.row .pull_eleven.seven.columns {
		margin-left: -151.06383%;
	}
	.row .pull_eleven.eight.columns {
		margin-left: -159.57447%;
	}
	.row .pull_eleven.nine.columns {
		margin-left: -168.08511%;
	}
	.row .pull_eleven.ten.columns {
		margin-left: -176.59574%;
	}
	.row .pull_eleven.eleven.columns {
		margin-left: -185.10638%;
	}
	/* Centered Classes */
	.row .one.centered {
		margin-left: 46.80851%;
	}
	.row .two.centered {
		margin-left: 42.55319%;
	}
	.row .three.centered {
		margin-left: 38.29787%;
	}
	.row .four.centered {
		margin-left: 34.04255%;
	}
	.row .five.centered {
		margin-left: 29.78723%;
	}
	.row .six.centered {
		margin-left: 25.53191%;
	}
	.row .seven.centered {
		margin-left: 21.2766%;
	}
	.row .eight.centered {
		margin-left: 17.02128%;
	}
	.row .nine.centered {
		margin-left: 12.76596%;
	}
	.row .ten.centered {
		margin-left: 8.51064%;
	}
	.row .eleven.centered {
		margin-left: 4.25532%;
	}
	.row {
	*zoom: 1;
	}
	.row:before, .row:after {
		content: "";
		display: table;
	}
	.row:after {
		clear: both;
	}
	/* Actual CSS */
	* {
		box-sizing: border-box;
	}
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
		color: #e0e0e0;
		background-color: #e0e0e0;
	}
	.historyBlock {
		background-color: #f5f5f5;
		padding: 0px 12px;
		border-radius: 12px;
		min-height: 400px
	}
	.paper {
		background-color: white;
		box-shadow: 2px 2px 10px 2px #CCCCCC;
		// height: 275mm;
		margin: 1em auto;
		overflow: hidden;
	/*    padding: 1.5cm 2cm;*/
		padding: 0.5cm 1cm;
		width: 210mm;
	}
	.paper2 {
		background-color: white;
		box-shadow: 2px 2px 10px 2px #CCCCCC;
		margin: 1em auto;
		overflow: hidden;
		/*    padding: 1.5cm 2cm;*/
		padding: 0.5cm 1cm;
		width: 210mm;
	}
		
	.itemBlock {
			background-color:#f7f9fd;
			-webkit-print-color-adjust: exact;
		}
	
	@media print {
	.paper {
		border: none;
		box-shadow: none;
		margin: 0;
		page-break-after: auto;
	}
	.paper2 {
		border: none;
		box-shadow: none;
		margin: 0;
		page-break-after: always;
	}
	hr {
		height: 1px;
		border-width: 0;
		color: #e0e0e0;
		background-color: #e0e0e0;
		-webkit-print-color-adjust: exact;
	}
	.historyBlock {
		background-color: #f5f5f5;
		-webkit-print-color-adjust: exact;
	}
		.itemBlock {
			background-color:#f7f9fd;
			-webkit-print-color-adjust: exact;
		}
	}
	</style>
	</head>
	
	<body>
	<div class="paper"> 
	  
	  <!-- Heading with Clinic Info -->
	  <div class="row" style="padding-bottom:0px">
		<div class="twelve columns"> <img width="100%" src="../../images/DiagonalBKGEstimate3.png"> </div>
		
	  </div>
	  <!-- Patient Info Section Info Row -->
	  <div class="row" style="padding-bottom:12px">
		<div class="twelve columns" align="center"> <span style="font-size: 18px; line-height: 40px; color:#012729">##invoiceType from ##branchName</span><br />
						<span style="font-weight: 400; color:#909090">##invoiceType ##invoiceId</span> </div>
		
	  </div>
		
		 <!-- Reciept Top Labels -->
	  <div class="row" style="padding:0px 36px 0px 36px">
		<div class="three columns" align="center">
						<span style="font-weight: 600; color:#909090; font-size:12px">TOTAL</span> </div>
		  
		  <div class="three columns" align="center">
						<span style="font-weight: 600; color:#909090; font-size:12px">STATUS</span> </div>
		  <div class="three columns" align="center">
						<span style="font-weight: 600; color:#909090; font-size:12px">DATE PAID</span> </div>
		  <div class="three columns" align="center">
						<span style="font-weight: 600; color:#909090; font-size:12px">PAYMENT METHOD</span> </div>
		
	  </div>
		
		 <!-- Reciept Top Inputs -->
		
		
		<div class="row" style="padding:0px 36px 24px 36px">
		<div class="three columns" align="center">
						<span style="font-weight: 500; color:#012729; font-size:15px">##total</span></div>
		  
		  <div class="three columns" align="center" >
						<span style="font-weight: 500; color: ##scolor; font-size:15px">##status</span> </div>
			
			<div class="three columns" align="center">
						<span style="font-weight: 500; color:#012729; font-size:15px">##invoiceDate</span> </div>
			
		  <div class="three columns" align="center">
						<span style="font-weight: 500; color:#012729; font-size:15px">##paymentMethod</span> </div>
		
	  </div>
		
		 <!-- PAYMENT SUMMARY SECTION -->
		
		<div class="row" style="padding-bottom:12px">
		<div class="twelve columns" align="left"> <span style="font-weight: 600; color:#909090; font-size:12px;">PAYMENT SUMMARY&nbsp;</span>
						 </div>
		</div>
		
			 <!-- PAYMENT LINE ITEMS Container -->
		<div class="row itemBlock" style="padding:12px 24px;">
		<div class="twelve columns" align="left">
			
		<!-- PAYMENT LINE ITEMS Inner -->
			
			<!-- PAYMENT LINE ITEMS LABEL -->
			<div class="row" style="border-bottom: 1px solid #e7eaef; padding:12px">
				<div class="nine columns" align="left" style="font-size: 12px; color: #909090; font-weight:600">ITEM</div> 
				<div class="one columns" align="right" style="font-size:12px; color:#909090; font-weight:600">QTY</div> 
				<div class="two columns" align="right" style="font-size: 12px; color: #909090; font-weight:600">PRICE</div> 
			</div>
			##items
			
			<!-- PAYMENT LINE ITEMS --Subtotal Area-->
		  <div class="row" style="padding:12px 12px 0px 12px;color: #012729;">
				<div class="eight columns" align="left" style="font-size: 13px; font-weight:400"> </div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:400;">Service Fees</div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:500;">##serviceFees</div> 
			</div>
			<div class="row" style="padding:4px 12px 0px 12px;color: #012729;">
				<div class="eight columns" align="left" style="font-size: 13px; font-weight:400"> </div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:400;">Discounts</div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:500;">##discounts</div> 
			</div>
			<div class="row" style="padding:4px 12px 0px 12px;color: #012729;">
				<div class="eight columns" align="left" style="font-size: 13px; font-weight:400"> </div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:400;">Taxes</div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:500;">##taxes</div> 
			</div>
			<div class="row" style="padding:4px 12px 0px 12px;color: #012729;">
				<div class="eight columns" align="left" style="font-size: 13px; font-weight:400"> </div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:400;">Total&nbsp;</div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:500;">##total</div> 
			</div>
		  <div class="row" style="padding:4px 12px 0px 12px;color: #012729;">
				<div class="eight columns" align="left" style="font-size: 13px; font-weight:400"> </div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:400;">Paid</div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:500;">##paid</div> 
			</div>
			<div class="row" style="padding:4px 12px;">
				<div class="eight columns" align="left" style="font-size: 13px; font-weight:400"> </div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:400;color: ##remcolor;">Remaining</div> 
				<div class="two columns" align="right" style="font-size: 13px; font-weight:500;color: ##remcolor;">##remaining</div> 
			</div>
				
			<!-- PAYMENT LINE ITEMS Inner END @@@@@@ -->
			
		</div>
		</div>
		
			 <!-- PAYMENT LINE ITEMS SECTION -->
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		</div>
	</body>
	</html>`;
  };
}
