import CommonUtil from "../util/CommonUtil";
import { momentLocal } from "../util/TimeUtil";
import React from "react";
import { Row, Col, Typography, Image } from "antd";
const { Text } = Typography;

export default class RabiescertificateHtml {
  static rabiespage = `
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Certificate of Rabies Vaccination</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=WindSong:wght@400;500&display=swap" rel="stylesheet">
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
    height: 260mm;
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

@media print {
.paper {
    border: none;
    box-shadow: none;
    margin: 0;
    page-break-after:avoid;
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
	.labelRow {
		background-color:#f1f5fa;
		-webkit-print-color-adjust: exact;
	}
}
</style>
</head>

<body>
<div class="paper"> 
  
  <!-- Heading with Rabies Info -->
  <div class="row" style="padding-bottom:16px">
    <div class="twelve columns" align="center"> <div style="float:left"> <img alt="Whskr Veterinary Management" height="50" src="../favicon.ico"> </div>
   
      <span style="font-weight: 600; font-size:16px">Certificate of Rabies Vaccination</span> <br/>
		<span style="font-size:16px"> Tag#{rabiesTagNumber}</span>
        
	  </div>
    
  </div>
	
  <!-- Title Row 1 -->
  <div class="row labelRow" style="background-color:#f1f5fa; border:1px solid #e0e0e0; border-width:1px 1px 0px 1px">
    <div class="six columns" style="padding:12px 8px; background-color: #f1f5fa; font-weight: 600; font-size: 16px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">Patient Information
      
      
    </div>
	 <div class="six columns" style="padding:8px; background-color: #f1f5fa; font-weight: 600; font-size: 16px">Rabies Vaccination
      
      
    </div>
  </div>
	<!-- Label Title Row 1 -->
	
	<div class="row labelRow" style="background-color:#f1f5fa; border:1px solid #e0e0e0; border-width:1px 1px 1px 1px">
    <div class="three columns" style="padding:12px 8px; font-weight: 500; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">Rabies Tag#
      
    </div>
		
	 <div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;"> Microchip Number
      
      
    </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;">Vaccination Date
      
      
    </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:500; font-size: 14px;">Vaccination Expires
      
      
    </div>
  </div>
 
  <!-- Data Input Row -->
	<div class="row" style="background-color:#ffffff; border:1px solid #e0e0e0; border-width:0px 1px 0px 1px">
    <div class="three columns" style="padding:12px 8px; font-weight: 400; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">{RabiesTag}
      
    </div>
		
	 <div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:400; font-size: 14px;">{Microchip#}
      
      
    </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:400; font-size: 14px;">{VaccinationDate}
      
      
      </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:400; font-size: 14px;">{VaccinationDue}
      
      
    </div>
  </div>
	
	  <!-- Label Title Row 2-->
	<div class="row labelRow" style="background-color:#f1f5fa; border:1px solid #e0e0e0; border-width:1px 1px 1px 1px">
    <div class="six columns" style="padding:12px 8px; font-weight: 500; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">Animal Name
      
    </div>
		
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;">Product
      
      
      </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:500; font-size: 14px;">Manufacturer
      
      
      </div>
  </div>
	
	<!-- Data Input Row -->
  <div class="row" style="border:1px solid #e0e0e0; border-width:0px 1px 1px 1px">
    <div class="six columns" style="padding:12px 8px; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">{Patient First Name} {PatientLastname}
      
    </div>
		
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 400; border-width: 0px 1px 0px 0px; font-size: 14px;">{ProductName}
      
      
      </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 400; border-width: 0px 0px 0px 0px; font-size: 14px;">{InventoryManufacturer}
      
      
      </div>
  </div>
	
	<!-- Label Title Row 3 -->
	
	<div class="row labelRow" style="background-color:#f1f5fa; border:1px solid #e0e0e0; border-width:0px 1px 1px 1px">
    <div class="three columns" style="padding:12px 8px; background-color: #f1f5fa; font-weight: 500; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">Species
      
    </div>
		
	 <div class="three columns" style="padding:12px 8px; background-color: #f1f5fa; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;"> Breed
      
      
    </div>
		<div class="three columns" style="padding:12px 8px; background-color: #f1f5fa; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;">Vaccine Type
      
      
      </div>
		<div class="three columns" style="padding:12px 8px; background-color: #f1f5fa; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:500; font-size: 14px;">Serial Number
      
      
      </div>
  </div>
	
	<!-- Data Input Row 3 -->
	<div class="row" style="background-color:#ffffff; border:1px solid #e0e0e0; border-width:0px 1px 0px 1px">
    <div class="three columns" style="padding:12px 8px; font-weight: 400; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">{PatientSpecies}
      
    </div>
		
	 <div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:400; font-size: 14px;">{PatientBreed}
      
      
     </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:400; font-size: 14px;">{VaccineType}
      
      
      </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:400; font-size: 14px;">{VaccineSerial}
      
      
      </div>
  </div>
	
	<!-- Label Title Row 4 -->
	
	<div class="row labelRow" style="background-color:#f1f5fa; border:1px solid #e0e0e0; border-width:1px 1px 1px 1px">
    <div class="three columns" style="padding:12px 8px; font-weight: 500; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">Gender
      
    </div>
		
	 <div class="three columns" style="padding:12px 8px; background-color: #f1f5fa; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;"> Color
      
      
    </div>
		<div class="three columns" style="padding:12px 8px; background-color: #f1f5fa; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;">Animal Ctl&nbsp; License
      
      
      </div>
		<div class="three columns" style="padding:12px 8px; background-color: #f1f5fa; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:500; font-size: 14px;">USDA License
      
      
      </div>
  </div>
	
	<!-- Data Input Row 4 -->
	<div class="row" style="background-color:#ffffff; border:1px solid #e0e0e0; border-width:0px 1px 0px 1px">
    <div class="three columns" style="padding:12px 8px; font-weight: 400; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">{PatientGender}
      
    </div>
		
	 <div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:400; font-size: 14px;">{PatientColor}
      
      
     </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:400; font-size: 14px;">{ACLLicense} 
      
      
      </div>
		<div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:400; font-size: 14px;">{USDALicense} 
      
      
      </div>
  </div>
	
	<!-- Label Title Row 5 -->
	
	<div class="row labelRow" style="background-color:#f1f5fa; border:1px solid #e0e0e0; border-width:1px 1px 1px 1px">
    <div class="three columns" style="padding:12px 8px; font-weight: 500; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">Age
      
    </div>
		
	 <div class="three columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:500; font-size: 14px;"> Weight
      
      
    </div>
		<div class="six columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 600; border-width: 0px 0px 0px 0px; font-size: 14px;">Issuing Veterinarian
      
      
      </div>
		
  </div>
	
	<!-- Data Input Row 5 -->
	<div style="display: -ms-flexbox;
display: -webkit-flex;
display: flex;background-color:#ffffff; border:1px solid #e0e0e0; border-width:0px 1px 0px 1px; ">
    <div class="three columns" style="width:25%; padding:12px 8px; font-weight: 400; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px">{PatientAge}
      
    </div>
		
	 <div class="three columns" style="width: 25%; margin-left:0px; padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 1px 0px 0px; font-weight:400; font-size: 14px;">{PatientWeight} {PatientWeightUnit}
      
      
     </div>
		<div class="six columns" style="width:50%;padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 500; border-width: 0px 0px 0px 0px; font-weight:400; font-size: 14px;">{DocFirst} {DocLast} <br />
{ClinicAddressFormatted} <br />
{ClinicPhone}<br />
License: {VeterinarianLicence#}<br />
      
      
      </div>
		
	
  </div>
	
	<!-- Label Title Row 6 -->
	
  <div class="row labelRow" style="background-color:#f1f5fa; border:1px solid #e0e0e0; border-width:1px 1px 1px 1px">
    <div class="six columns" style="padding:12px 8px; font-weight: 600; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px; height:100%">Owner Information
      
    </div>
		
	
		<div class="six columns" style="padding:12px 8px; border: 1px solid #e0e0e0; font-weight: 600; border-width: 0px 0px 0px 0px; font-size: 14px;">Veterinarian Signature
      
      
      </div>
		
  </div>
	
 <!-- Data Input Row 6 -->
	<div style="display: -ms-flexbox;
display: -webkit-flex;
display: flex;background-color:#ffffff; border:1px solid #e0e0e0; border-width:0px 1px 0px 1px; ">
    <div class="six columns" style="width:50%; padding:12px 8px; font-weight: 400; font-size: 14px; border:1px solid #e0e0e0; border-width: 0px 1px 0px 0px"><span style="font-weight: 500">{ClientFirst} {ClientLast} </span> <br /> {ClientAddressFormatted} <br />{ClientPhone}
      
    </div>
		
	 
	<div class="six columns" style="width: 50%; padding:12px;  border-width: 0px 1px 1px 1px;  font-weight:400; font-size: 30px;font-family: 'WindSong', cursive; min-height:120px">
  {signFirst} {signLast}
      
      </div>
		
	
  </div>
	
	<div class="row" style="border:1px solid #e0e0e0; border-width:1px 1px 1px 1px">
    <div class="twelve columns" align="center" style="padding:12px 8px; font-weight: 400; color:#717171; font-size: 13px; border:1px solid #e0e0e0; border-width: 0px 0px 0px 0px">Whskr™ Rabies Vaccination Certificate contains all data fields as found on NASPHV Form 51
      
    </div>
		
		
	
  </div>
	
	
	
	
  
</div>

<!-- APPOINTMENT DATA PAGE -->


</body>
</html>


`;

  static rabiesPreview = () => {
    return (
      <>
        <Row>
          <Col span={24}>
            <Row
              width="958px"
              style={{
                fontFamily: "'Poppins', sans-serif",
                border: "1px solid #e0e0e0",
              }}
            >
              <Col
                span={24}
                style={{
                  align: "center",
                  padding: "12px",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                <div style={{ float: "left" }}>
                  <Image
                    src="../favicon.ico"
                    alt="Whskr Veterinary Solutions"
                    style={{ width: 50 }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "20px" }}>
                    Certificate of Rabies Vaccination <br />
                  </span>
                  <span style={{ fontWeight: 400, fontSize: "18px" }}>
                    RabiesTagNumber
                  </span>
                </div>
              </Col>
            </Row>
            <Row width="958px">
              <Col span={12}>
                <Row style={{ background: "#f1f5fa" }}>
                  <Col span={24} className="certColLabel CertColLeftSideBE">
                    Animal Information
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Rabies Tag #
                  </Col>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Microchip #
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientRabiesTag#
                  </Col>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientMicrochip#
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="CertColSubLabel CertColLeftSideBE">
                    Animal Name
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="CertColEntry CertColLeftSideBE">
                    PatientFirstNmae PatientLastName
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Species
                  </Col>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Breed
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientSpecies
                  </Col>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientBreed
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Gender
                  </Col>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Color
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientGender
                  </Col>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientColor
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Age
                  </Col>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Weight
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientAGE
                  </Col>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientWeight
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="CertColSubLabel CertColLeftSideBE">
                    Owner Information
                  </Col>
                </Row>
                <Row>
                  <Col
                    span={24}
                    className="CertColEntry CertColLeftSideBE"
                    style={{ minHeight: 281 }}
                  >
                    <strong>ClientFirstNmae ClientLastName</strong> <br />
                    ClientAddressFormatted <br />
                    ClientCity, ClientStateABR, ClientZip
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row style={{ background: "#f1f5fa" }}>
                  <Col span={24} className="certColLabel">
                    Rabies Vaccination
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Vaccination Date
                  </Col>
                  <Col span={12} className="CertColSubLabel">
                    Vaccination Expiration
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    PatientVaccinationDate
                  </Col>
                  <Col span={12} className="CertColEntry">
                    PatientVaccineExpirationDate
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Product
                  </Col>
                  <Col span={12} className="CertColSubLabel">
                    Manufacturer
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    VaccineName
                  </Col>
                  <Col span={12} className="CertColEntry">
                    VaccineManufacturer
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Vaccine Type
                  </Col>
                  <Col span={12} className="CertColSubLabel">
                    Serial Number
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    VaccineType
                  </Col>
                  <Col span={12} className="CertColEntry">
                    VaccineSerial
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColSubLabel CertColLeftSideBE">
                    Animal Control License
                  </Col>
                  <Col span={12} className="CertColSubLabel">
                    USDA License
                  </Col>
                </Row>
                <Row>
                  <Col span={12} className="CertColEntry CertColLeftSideBE">
                    VaccineACL
                  </Col>
                  <Col span={12} className="CertColEntry">
                    VaccineUSDA
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="CertColSubLabel">
                    Issuing Veterinarian
                  </Col>
                </Row>
                <Row>
                  <Col
                    span={24}
                    className="CertColEntry"
                    style={{ minHeight: 140 }}
                  >
                    <span style={{ fontWeight: 600 }}>DocFirst DocLast</span>
                    <br />
                    License #: License# <br />
                    ClinicName <br />
                    ClinicAddressFormatted
                    <br />
                    ClinicCity, ClinicStateABR, ClinicZIP
                    <br />
                    ClinicPhone
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="CertColSubLabel">
                    Veterinarian Signature
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="CertColEntry">
                    <div className="vetSig">Carla Politte</div>
                    <Col span={24} className="appointmentSig">
                      Date: AppointmentDate
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row
              width="958px"
              style={{
                fontFamily: "'Poppins', sans-serif",
                border: "1px solid #e0e0e0",
                borderWidth: "0px 1px 1px 1px",
                textAlign: "center",
              }}
            >
              <Col className="CertBottomBar" span={24}>
                Whskr™ Rabies Vaccination Certificate contains all data fields
                as found on NASPHV Form 51
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  static getHtml = () => {
    let labelData = JSON.parse(
      localStorage.getItem("whskr-print-rabiescertificate"),
    );
    let clientAddress = "";
    let clinicAddress = "";
    if (labelData.client.clientAddress1)
      clientAddress += labelData.client.clientAddress1;
    if (labelData.client.clientAddress2)
      clientAddress += " , " + labelData.client.clientAddress2;
    if (labelData.client.clientCity)
      clientAddress += " , " + labelData.client.clientCity;
    if (labelData.client.clientState)
      clientAddress += " , " + labelData.client.clientState;
    if (labelData.client.clientZipCode)
      clientAddress += " - " + labelData.client.clientZipCode;

    if (labelData.clinic.branchAddress1)
      clinicAddress += labelData.clinic.branchAddress1;
    if (labelData.clinic.branchAddress2)
      clinicAddress += " , " + labelData.clinic.branchAddress2;
    if (labelData.clinic.branchCity)
      clinicAddress += " , " + labelData.clinic.branchCity;
    if (labelData.clinic.branchState)
      clinicAddress += " , " + labelData.clinic.branchState;
    if (labelData.clinic.branchZipCode)
      clinicAddress += " - " + labelData.clinic.branchZipCode;

    return (
      //this.rabiesPreview()
      this.rabiespage
        .replaceAll(
          "{rabiesTagNumber}",
          labelData.patient.patientRabiesTag ?? "-",
        )
        .replace("{RabiesTag}", labelData.patient.patientRabiesTag ?? "-")
        .replace("{Microchip#}", labelData.patient.patientMicrochip ?? "-")
        .replace(
          "{VaccinationDate}",
          momentLocal(labelData.vaccine.vaccinatedDate).format("MM/DD/YYYY") ??
            "-",
        )
        .replace(
          "{VaccinationDue}",
          momentLocal(labelData.vaccine.nextVaccinatedDate).format(
            "MM/DD/YYYY",
          ) ?? "-",
        )
        .replace(
          "{Patient First Name}",
          labelData.patient.patientFirstName ?? "-",
        )
        .replace("{PatientLastname}", labelData.client.clientLastName ?? "-")
        .replace("{PatientSpecies}", labelData.patient.patientSpecies ?? "-")
        .replace("{PatientBreed}", labelData.patient.patientBreed ?? "-")
        .replace("{PatientGender}", labelData.patient.patientSex ?? "-")
        .replace("{PatientColor}", labelData.patient.patientColor ?? "-")
        .replace(
          "{PatientAge}",
          CommonUtil.getAgeFromYear(labelData.patient.patientDob) ?? "-",
        )
        .replace(
          "{PatientWeight}",
          CommonUtil.fixedWeight(labelData.patient.patientWeight) ?? "-",
        )
        .replace(
          "{PatientWeightUnit}",
          labelData.patient.patientWeightUnit ?? "",
        )
        .replace("{ProductName}", labelData.vaccine.inventoryProductName ?? "-")
        .replace(
          "{InventoryManufacturer}",
          labelData.vaccine.inventoryManufacturer ?? "-",
        )
        .replace("{VaccineType}", labelData.vaccine.inventoryVaccineType ?? "-")
        .replace("{VaccineSerial}", labelData.vaccine.inventorySerial ?? "-")
        .replace(
          "{ACLLicense}",
          labelData.vaccine.inventoryAnimalControlLicensing
            ? labelData.vaccine.inventoryAnimalControlLicensing + " years"
            : "-",
        )
        .replace(
          "{USDALicense}",
          labelData.vaccine.inventoryUsdaLicensing
            ? labelData.vaccine.inventoryUsdaLicensing + " years"
            : "-",
        )
        .replace(
          "{DocFirst}",
          labelData.provider.providerFirstName
            ? "Dr." + labelData.provider.providerFirstName
            : " ",
        )
        .replace("{DocLast}", labelData.provider.providerLastName ?? " ")
        .replace(
          "{signFirst}",
          labelData.provider.providerFirstName
            ? labelData.provider.providerFirstName
            : " ",
        )
        .replace("{signLast}", labelData.provider.providerLastName ?? " ")
        .replace(
          "{AppointmentDate}",
          momentLocal(new Date()).format("MM/DD/YYYY"),
        )
        .replace(
          "{VeterinarianLicence#}",
          labelData.provider.providerLicense ?? "-",
        )
        .replace("{ClinicPhone}", labelData.clinic.branchPhone ?? " ")
        .replace("{ClinicAddressFormatted}", clinicAddress)
        .replace(
          "{ClinicCityFormatted}",
          labelData.clinic.branchCity +
            ", " +
            labelData.clinic.branchState +
            " " +
            labelData.clinic.branchZipCode,
        )
        .replace("{ClientFirst}", labelData.client.clientFirstName ?? "-")
        .replace("{ClientLast}", labelData.client.clientLastName ?? "-")
        .replace("{ClientPhone}", labelData.client.clientPhone ?? " ")
        .replace("{ClientAddressFormatted}", clientAddress)
        .replace(
          "{ClientCityFormatted}",
          labelData.client.clientCity +
            " , " +
            labelData.client.clientState +
            " " +
            labelData.client.clientZipCode,
        )
    );
  };
}
