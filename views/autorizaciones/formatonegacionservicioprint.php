<html lang="en" ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Genesis</title>
  <link rel="icon" href="../../assets/images/icon.ico" />
  <link rel="stylesheet" href="../../bower_components/materialize/bin/materializeformat.css" />
  <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
  <script src="../../bower_components/angular/angular.js"></script>
  <script src="../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../scripts/controllers/autorizaciones/formatonegacionServicioController.js"></script>
  <script src="../../js/jQuery.print.min.js"></script>
  <script src="../../bower_components/materialize/bin/materialize.js"></script>

</head>
<style type="text/css">
  .block_ {
    color: black;
    display: block;
    font-family: serif;
    font-size: 1.125em;
    line-height: 1.2;
    margin-bottom: 10pt;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: center
  }

  .block_1 {
    color: black;
    display: block;
    font-size: 1em;
    line-height: 1;
    margin-bottom: 5pt;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: center
  }

  .block_2 {
    display: block;
    font-size: 10px;
    line-height: 1;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding: 3px;
    text-align: center
  }

  .block_3 {
    color: black;
    display: block;
    font-family: serif;
    font-size: 10px;
    line-height: 1;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: center
  }

  .block_4 {
    color: black;
    display: block;
    font-family: serif;
    font-size: 0.9em;
    line-height: 1;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0
  }

  .block_5 {
    display: block;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: center;
    font-size: 10px;
  }

  .block_6 {
    color: black;
    display: block;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: center;
    font-size: 10px;
  }

  .block_7 {
    display: list-item;
    font-size: 10px;
    line-height: 1;
    margin-bottom: 0;
    margin-left: 36pt;
    padding-bottom: 0;
    padding-top: 0;
    text-align: center
  }

  .block_8 {
    display: block;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: right;
    font-size: 10px;
  }

  .block_9 {
    color: black;
    display: block;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: right;
    font-size: 10px;
  }

  .block_10 {
    display: block;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    font-size: 10px;
  }

  .block_11 {
    color: black;
    display: block;
    font-family: serif;
    font-size: 11px;
    line-height: 1;
    margin-bottom: 10pt;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0
  }

  .block_12 {
    color: black;
    display: block;
    font-size: 11px;
    line-height: 1;
    margin-bottom: 10pt;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0
  }

  .calibre {
    color: #FFF;
    display: block;
    font-family: "Arial", sans-serif;
    font-size: 0.8em;
    margin-bottom: 0;
    margin-left: 5pt;
    margin-right: 5pt;
    margin-top: 0;
    padding-left: 0;
    padding-right: 0
  }

  .calibre1 {
    display: block
  }

  .calibre2 {
    display: table-row-group;
    vertical-align: middle
  }

  .calibre3 {
    display: table-row;
    vertical-align: inherit
  }

  .calibre4 {
    /*font-weight: bold*/
  }

  .list_ {
    display: block;
    list-style-type: decimal;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    padding-top: 0
  }

  .table_ {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    border-collapse: collapse;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    border-spacing: 2px;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table;
    margin-bottom: 0;
    margin-left: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-indent: 0
  }

  .table_1 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    border-collapse: collapse;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    border-spacing: 2px;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table;
    float: left;
    margin-bottom: 0;
    margin-left: 7.05pt;
    margin-right: 7.05pt;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-indent: 0
  }

  .td_ {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #4F81BD; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #4F81BD; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #4F81BD; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #4F81BD; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: inherit;
    vertical-align: middle;
    width: 354pt
  }

  .td_1 {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #4F81BD; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #4F81BD; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #4F81BD; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #4F81BD; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: inherit;
    vertical-align: middle;
    width: 116pt
  }

  .td_2 {
    background-color: #FFF;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 354pt
  }

  .td_3 {
    background-color: #FFF;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 116pt
  }

  .td_4 {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #4F81BD; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #4F81BD; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #4F81BD; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #4F81BD; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: inherit;
    vertical-align: top;
    width: 153pt
  }

  .td_5 {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #4F81BD; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #4F81BD; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #4F81BD; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #4F81BD; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: inherit;
    vertical-align: top;
    width: 147pt
  }

  .td_6 {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #4F81BD; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #4F81BD; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #4F81BD; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #4F81BD; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    text-align: inherit;
    vertical-align: top;
    width: 170pt
  }

  .td_7 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 54.5pt
  }

  .td_8 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 67.2pt
  }

  .td_9 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 30.9pt
  }

  .td_10 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 147pt
  }

  .td_11 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 54.9pt
  }

  .td_12 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 58.6pt
  }

  .td_13 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 56.2pt
  }

  .td_14 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 54.5pt
  }

  .td_15 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 67.2pt
  }

  .td_16 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 30.9pt
  }

  .td_17 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 147pt
  }

  .td_18 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 54.9pt
  }

  .td_19 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 58.6pt
  }

  .td_20 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 56.2pt
  }

  .td_21 {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #4F81BD; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-top-color: #4F81BD; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 470pt
  }

  .td_22 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 133pt
  }

  .td_23 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 198pt
  }

  .td_24 {
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 138pt
  }

  .td_25 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 133pt
  }

  .td_26 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 198pt
  }

  .td_27 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 138pt
  }

  .td_28 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 34pt
  }

  .td_29 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 32.5pt
  }

  .td_30 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 33.1pt
  }

  .td_31 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 33.2pt
  }

  .td_32 {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 470pt
  }

  .td_33 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 40.8pt
  }

  .td_34 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 13.8pt
  }

  .td_35 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 53.5pt
  }

  .td_36 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 132pt
  }

  .td_37 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 19.6pt
  }

  .td_38 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 180pt
  }

  .td_39 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 16.4pt
  }

  .td_40 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 254pt
  }

  .td_41 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 196pt
  }

  .td_42 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 76.8pt
  }

  .td_43 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 139pt
  }

  .td_44 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 187pt
  }

  .td_45 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 54.1pt
  }

  .td_46 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 13.3pt
  }

  .td_47 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 62pt
  }

  .td_48 {
    /* background-color: #DBE5F1;
    border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 14.8pt
  }

  .td_49 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 122pt
  }

  .td_50 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 470pt
  }

  .td_51 {
    /* background-color: #DBE5F1; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: top;
    width: 470pt
  }

  .td_52 {
    /* background-color: #4F81BD;
    border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 283pt
  }

  .td_53 {
    /* background-color: #4F81BD; */
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 186pt
  }

  .td_54 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-right-color: #95B3D7; */
    border-right-style: solid;
    border-right-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 283pt
  }

  .td_55 {
    background-color: #FFF;
    /* border-bottom-color: #95B3D7; */
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    /* border-left-color: #95B3D7; */
    border-left-style: solid;
    border-left-width: 1pt;
    /* border-top-color: #95B3D7; */
    border-top-style: solid;
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 186pt
  }

  .td_56 {
    /* background-color: #FFF;
    border-top-color: #95B3D7;
    border-top-style: solid; */
    border-top-width: 1pt;
    display: table-cell;
    padding-bottom: 0.5ex;
    padding-left: 5.4pt;
    padding-right: 5.4pt;
    padding-top: 0.5ex;
    text-align: inherit;
    vertical-align: middle;
    width: 470pt
  }

  .text_ {
    color: black;
    font-size: 1em;
    font-weight: bold;
    line-height: 1
  }

  .text_1 {
    font-size: 0.8em;
    line-height: 1
  }

  @page {
    /*margin-bottom: 5pt;             */
    /*margin-top: 5pt;*/
  }

  p.eslogan {
    margin-top: 0px;
    margin-bottom: 0px;
    position: fixed;
  }

  .nom {
    top: 5px;
    font-size: x-large;    
  }

  .nit {
    top: 35px;
  }

  .dir {
    top: 54px;
  }

  .tel {
    top: 73px;
  }

  .ubi {
    top: 92px;
  }
</style>

<body ng-controller="formatonegacionController">
  <div class="container">
    <div class="row">
      <div class="col s12 m12 l12">
        <div class="col s4 m4 l4" style="float: right;">
          <p class="eslogan nom">CAJACOPI EPS SAS</p>
          <p class="eslogan nit" style="font-size:14px">{{datosNA.DatosBasico[0].Nit}}</p>
          <p class="eslogan dir" style="font-size:14px">{{datosNA.DatosBasico[0].dirc}}</p>
          <p class="eslogan tel" style="font-size:14px">{{datosNA.DatosBasico[0].telc}}</p>
          <p class="eslogan ubi" style="font-size:14px">{{datosNA.DatosBasico[0].ciup}}</p>
        </div>
        <div class="col s2 m2 l2" style="padding-top: 30px;">
          <img src="../../assets/images/logo_cajacopieps.png" width="140" height="80" alt="Logo CajacopiEPS" />
        </div>
      </div>
    </div>    
      <p id="calibre_link-1" class="block_1" style="margin-top: 10px">        
        <span class="text_">FORMATO NEGACIÓN DE SERVICIOS DE SALUD Y/O MEDICAMENTOS</span>
        <hr style="width: 650px">
      </p>

      <p id="calibre_link-1" class="block_1" style="text-align: justify;margin-right: 15px;padding: 10px">
        <span class="text_1">
          CUANDO NO SE AUTORICE LA PRESTACIÓN DE UN SERVICIO DE SALUD O EL SUMINISTRO DE MEDICAMENTOS, ENTREGUE ESTE
          FORMULARIO AL USUARIO, DEBIDAMENTE DILIGENCIADO
        </span>
      </p>    
    <div class="row">
      <table class="table_1">
        <tbody class="calibre2">
          <tr class="calibre3">
          <tr class="calibre3">
            <td class="td_" colspan="15">
              <p class="block_2">NOMBRE DE LA ADMINISTRADORA I.P.S. O ENTIDAD TERRITORIAL</p>
            </td>
            <td class="td_1" colspan="7">
              <p class="block_2">NÚMERO</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td class="td_2" colspan="15">
              <p class="block_3"> {{datosNA.DatosBasico[0].nomp}} </p>
            </td>
            <td class="td_3" colspan="7">
              <p class="block_3">{{datosNA.DatosBasico[0].numero}}</p>
            </td>
          </tr>
          <tr>
            <td colspan="9" class="td_4">
              <p class="block_2">FECHA DE SOLICITUD</p>
            </td>
            <td colspan="6" class="td_5">
              <p class="block_4">&nbsp;</p>
            </td>
            <td colspan="7" class="td_6">
              <p class="block_2">FECHA DE DILIGENCIAMIENTO</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="2" class="td_7">
              <p class="block_5">DÍA</p>
            </td>
            <td colspan="3" class="td_8">
              <p class="block_6">MES</p>
            </td>
            <td colspan="4" class="td_9">
              <p class="block_6">AÑO</p>
            </td>
            <td colspan="6" class="td_10">
              <p class="block_3">&nbsp;</p>
            </td>
            <td colspan="4" class="td_11">
              <p class="block_6">DÍA</p>
            </td>
            <td class="td_12">
              <p class="block_6">MES</p>
            </td>
            <td colspan="2" class="td_13">
              <p class="block_6">AÑO</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="2" class="td_14">
              <p class="block_3">{{datosNA.DatosBasico[0].fecha_orden.split('/')[0]}}</p>
            </td>
            <td colspan="3" class="td_15">
              <p class="block_3">{{datosNA.DatosBasico[0].fecha_orden.split('/')[1]}}</p>
            </td>
            <td colspan="4" class="td_16">
              <p class="block_3">{{datosNA.DatosBasico[0].fecha_orden.split('/')[2]}}</p>
            </td>
            <td colspan="6" class="td_17">
              <p class="block_3">&nbsp;</p>
            </td>
            <td colspan="4" class="td_18">
              <p class="block_3">{{datosNA.DatosBasico[0].fecha_aut.split('/')[0]}} </p>
            </td>
            <td class="td_19">
              <p class="block_3">{{datosNA.DatosBasico[0].fecha_aut.split('/')[1]}}</p>
            </td>
            <td colspan="2" class="td_20">
              <p class="block_3">{{datosNA.DatosBasico[0].fecha_aut.split('/')[2]}}</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="22" class="td_21">
              <ol class="list_">
                <li class="block_7"><b class="calibre4">DATOS GENERALES DEL SOLICITANTE DEL SERVICIO</b></li>
              </ol>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="8" class="td_22">
              <p class="block_5">PRIMER APELLIDO</p>
            </td>
            <td colspan="10" class="td_23">
              <p class="block_6">SEGUNDO APELLIDO</p>
            </td>
            <td colspan="4" class="td_24">
              <p class="block_6">NOMBRES</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="8" class="td_25">
              <p class="block_3">{{datosNA.DatosBasico[0].apellido1}}</p>
            </td>
            <td colspan="10" class="td_26">
              <p class="block_3">{{datosNA.DatosBasico[0].apellido2}}</p>
            </td>
            <td colspan="4" class="td_27">
              <p class="block_3">{{datosNA.DatosBasico[0].nombre1}} {{datosNA.DatosBasico[0].nombre2}}</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="8" class="td_22">
              <p class="block_5">TIPO DE IDENTIFICACIÓN</p>
            </td>
            <td colspan="10" class="td_23">
              <p class="block_6">NÚMERO DE DOCUMENTO DE IDENTIFICACIÓN</p>
            </td>
            <td colspan="4" class="td_24">
              <p class="block_6">REGIMEN</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td class="td_28">
              <p class="block_8">C.C.</p>
            </td>
            <td colspan="3" class="td_29">
              <p class="block_3"> {{datosNA.DatosBasico[0].tipodoc=='CC'? 'X':''}}</p>
            </td>
            <td class="td_30">
              <p class="block_9">C.E.</p>
            </td>
            <td colspan="3" class="td_31">
              <p class="block_3">{{datosNA.DatosBasico[0].tipodoc=='CE'? 'X':''}}</p>
            </td>
            <td colspan="10" class="td_26">
              <p class="block_3">{{datosNA.DatosBasico[0].doc_afil}}</p>
            </td>
            <td colspan="4" class="td_27">
              <p class="block_3">{{datosNA.DatosBasico[0].regb}} </p>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="8" class="td_22">
              <p class="block_5">TELÉFONO</p>
            </td>
            <td colspan="10" class="td_23">
              <p class="block_6">CIUDAD / MUNICIPIO</p>
            </td>
            <td colspan="4" class="td_24">
              <p class="block_6">DEPARTAMENTO</p>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="8" class="td_25">
              <p class="block_3">{{datosNA.DatosBasico[0].telb}}</p>
            </td>
            <td colspan="10" class="td_26">
              <p class="block_3">{{datosNA.DatosBasico[0].sedeb}}</p>
            </td>
            <td colspan="4" class="td_27">
              <p class="block_3">{{datosNA.DatosBasico[0].dpto_afi}}</p>
            </td>
          </tr>
          <!--     <tr class="calibre3">
                   <td colspan="22" class="td_32"><p class="block_2">TIPO DE PLAN DEL USUARIO</p></td>
               </tr>
               <tr class="calibre3">
                   <td colspan="2" class="td_33"><p class="block_8">PBS</p></td>
                   <td class="td_34"><p class="block_3">&nbsp;</p></td>
                   <td colspan="3" class="td_35"><p class="block_9">NO PBS</p></td>
                   <td class="td_34"><p class="block_3">&nbsp;</p></td>
                   <td colspan="5" class="td_36"><p class="block_9">PLAN COMPLEMENTARIO (PAC)</p></td>
                   <td class="td_37"><p class="block_3">&nbsp;</p></td>
                   <td colspan="8" class="td_38"><p class="block_9">PLAN DE MEDICINA PREPAGADA (PMP)</p></td>
                   <td class="td_39"><p class="block_3">&nbsp;</p></td>
               </tr>
               <tr class="calibre3">
                   <td colspan="12" class="td_40"><p class="block_8">POBLACIÓN POBRE NO CUBIERTA CON SUBSIDIO A LA DEMANDA</p></td>
                   <td class="td_37"><p class="block_3">&nbsp;</p></td>
                   <td colspan="9" class="td_41"><p class="block_3">&nbsp;</p></td>
               </tr>
               <tr class="calibre3">
                   <td colspan="12" class="td_40"><p class="block_8">NÚMERO DE SEMANAS COTIZADAS POR EL USUARIO AL SGSSS</p></td>
                   <td colspan="5" class="td_42"><p class="block_3">&nbsp;</p></td>
                   <td colspan="5" class="td_43"><p class="block_3">&nbsp;</p></td>
               </tr>
               <tr class="calibre3">
                   <td colspan="10" class="td_44"><p class="block_8">ESTADO DE LA AFILIACIÓN / </p><p class="block_8">CONTRATO DEL USUARIO</p></td>
                   <td class="td_45"><p class="block_6">VIGENTE</p></td>
                   <td class="td_46"><p class="block_3">&nbsp;</p></td>
                   <td colspan="4" class="td_47"><p class="block_6">SUSPENDIDO</p></td>
                   <td class="td_48"><p class="block_3">&nbsp;</p></td>
                   <td colspan="4" class="td_49"><p class="block_6">REMITIR SIN ASEGURAMIENTO</p></td>
                   <td class="td_39"><p class="block_3">&nbsp;</p></td>
               </tr> -->
          <tr class="calibre3">
            <td colspan="22" class="td_21">
              <ol class="list_">
                <li value="2" class="block_7"><b class="calibre4">CLASE DE SERVICIO NO AUTORIZADO Y RECOMENDACIONES AL
                    USUARIO</b></li>
              </ol>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="22" class="td_50">
              <p class="block_10">SERVICIO NO AUTORIZADO &ndash; CÓDIGO O MEDICAMENTO NO AUTORIZADO</p>
              <ol style="margin-bottom: 0;margin-top: 0;font-size: 12px;">
                <li ng-repeat="s in datosNA.Servicios">{{s.producto}} - {{s.servicio}}</li>
              </ol>

            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="22" class="td_51">
              <p class="block_10">DESCRIPCIÓN: (Señale el servicio &ndash; procedimiento &ndash; intervención)</p>
              <ol style="margin-bottom: 0;margin-top: 0;font-size: 12px;">
                <li>{{datosNA.DatosBasico[0].nombre_servicio}}</li>
              </ol>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="22" class="td_50">
              <p class="block_10">JUSTIFICACIÓN: (Indique el motivo de la negación)</p>
              <ol style="margin-bottom: 0;margin-top: 0;font-size: 12px;">
                <li>{{datosNA.DatosBasico[0].justificacion}}</li>
              </ol>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="22" class="td_51">
              <p class="block_10">FUNDAMENTO LEGAL: (Relacione las disposiciones que presuntamente respaldan la
                decisión)
              </p>
              <ol style="margin-bottom: 0;margin-top: 0;font-size: 12px;">
                <li>{{datosNA.DatosBasico[0].fundamento_legal}}</li>
              </ol>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="22" class="td_21">             
                  <ol class="list_">
                <li class="block_7" value="3"><b class="calibre4">ALTERNATIVAS PARA QUE EL USUARIO ACCEDA AL SERVICIO DE SALUD O
                  MEDICAMENTO SOLICITADO Y HAGA VALER SUS DERECHOS LEGALES Y CONSTITUCIONALES</b></b></li>
              </ol>
            </td>
          </tr>
          <tr class="calibre3">
            <td colspan="22" class="td_50">
              <ol style="margin-bottom: 0;margin-top: 0;font-size: 12px;">
                <li>{{datosNA.DatosBasico[0].alternativas}}</li>
              </ol>
            </td>
          </tr>
          <tr class="calibre3">
            <th class="td_" colspan="14">
              <p class="block_2">NOMBRE Y CARGO DEL FUNCIONARIO QUE NIEGA EL SERVICIO</p>
            </th>
            <th class="td_1" colspan="8">
              <p class="block_2">FIRMA</p>
            </th>
          </tr>
          <tr class="calibre3">
            <td class="td_2" colspan="14">
              <p class="block_3">{{datosNA.DatosBasico[0].autpor}}</p>
            </td>
            <td class="td_2" colspan="8">
              <p class="block_3">&nbsp;</p>
              <p class="block_3">&nbsp;</p>
              <p class="block_3">&nbsp;</p>
            </td>
          </tr>
          <tr class="calibre3">
            <th colspan="22" class="td_32">
              <p class="block_2">FIRMA DEL USUARIO O DE QUIEN RECIBE</p>
            </th>
          </tr>
          <tr class="calibre3">
            <td colspan="22">
              <p class="block_3">&nbsp;</p>
              <p class="block_3">&nbsp;</p>
              <p class="block_3">&nbsp;</p>
              <p class="block_3">&nbsp;</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="margin-right: 15px;padding: 10px">
        <p class="block_3">&nbsp;</p>
        <p class="block_12">El Formato Negación de Servicios de Salud y/o Medicamentos es una exigencia para los
          vigilados
          (EPS, IPS, Entidades Territoriales) conforme la Circular Única 047 de 2007 - Título XI - Anexos Técnicos de la
          Superintendencia Nacional de Salud.</p>
        <p class="block_12">Si está en desacuerdo con la decisión adoptada, acuda a la Oficina de Atención al Usuario de
          su EPS, si su queja no es resuelta, eleve consulta a la Superintendencia Nacional de Salud, anexando copia de
          este formato totalmente diligenciado a la Avenida Ciudad de Cali N.º 51-66, Local 10</p>
      </div>
    </div>

  </div>
  </div>


</body>

</html>