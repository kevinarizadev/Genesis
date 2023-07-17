<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>

<!DOCTYPE>
<html ng-app="GenesisApp">
   <head>
      <meta charset="utf-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      <link rel="stylesheet" href="base.min.css"/>
      <link rel="stylesheet" href="fancy.min.css"/>
      <link rel="stylesheet" href="main.css"/>
      <script src="compatibility.min.js"></script>
      <script src="theViewer.min.js"></script>
      <script src="../../../bower_components/angular/angular.js"></script>
      <script src="../../../bower_components/jquery/dist/jquery.js"></script>
      <script src="../../../scripts/controllers/salud/formato/formatoglosaController.js"></script>
      <script src="../../../scripts/const/const.js"></script>
      <script type="text/javascript" src="../../../js/ngStorage.js"></script>
      <script>
         try{
         theViewer.defaultViewer = new theViewer.Viewer({});
         }catch(e){}
      </script>
      <title></title>
   </head>
   <body ng-controller="formatoglosaController" ng-cloak> 
      <div id="sidebar">
         <div id="outline"></div>
      </div>
      <div id="page-container">
         <div id="pf1" class="pf w0 h0" data-page-no="1">
            <div class="pc pc1 w0 h0">
               <img class="bi x0 y0 w1 h1" alt="" src="bg1.png"/>
               <div class="c x1 y1 w2 h2">
                  <div class="t m0 x2 h3 y2 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
               </div>
               <div class="c x3 y3 w3 h4">
                  <div class="t m0 x4 h5 y4 ff2 fs1 fc0 sc0 ls0 ws0">FORM<span class="_ _0"></span>A<span class="_ _1"></span>TO DE OB<span class="_ _0"></span>JECCIO<span class="_ _0"></span>N DE FACTUR<span class="_ _0"></span>A </div>
               </div>
               <div class="c x5 y5 w4 h6">
                  <div class="t m0 x6 h7 y6 ff3 fs2 fc0 sc0 ls0 ws0">Código: GADS -0<span class="ls1">11</span>-FR  </div>
               </div>
               <div class="c x5 y3 w4 h8">
                  <div class="t m0 x6 h7 y7 ff3 fs2 fc0 sc0 ls0 ws0">Versión: 2 </div>
               </div>
               <div class="c x3 y1 w3 h9">
                  <div class="t m0 x7 h5 y8 ff2 fs1 fc0 sc0 ls0 ws0">PROCEDIM<span class="_ _0"></span>IENTO DE <span class="_ _0"></span>AUDITORIA </div>
                  <div class="t m0 x1 h5 y9 ff2 fs1 fc0 sc0 ls0 ws0">CONCURRENT<span class="_ _0"></span>E  </div>
               </div>
               <div class="c x5 ya w4 ha">
                  <div class="t m0 x6 h7 yb ff3 fs2 fc0 sc0 ls0 ws0">Fecha: Enero 2017 </div>
               </div>
               <div class="c x5 y1 w4 hb">
                  <div class="t m0 x6 hc yc ff3 fs2 fc0 sc0 ls0 ws0">Aprobado:<span class="ff2"> </span>Representante de </div>
                  <div class="t m0 x6 hc yd ff3 fs2 fc0 sc0 ls0 ws0">Calidad<span class="ff2"> </span></div>
               </div>
               <div class="c x8 y2 w5 h0">
                  <div class="t m0 x9 h5 ye ff2 fs1 fc0 sc0 ls0 ws0"> </div>
               </div>
               <div class="c x9 yf w6 hd">
                  <div class="t m0 xa hc y10 ff2 fs2 fc0 sc0 ls0 ws0">IPS </div>
               </div>
               <div class="c  yf w7 hd">
                  <div class="t m0 xc he y11 ff3 fs1 fc0 sc0 ls0 ws0">{{ips}}</div>
               </div>
               <div class="c x9 y12 w6 hf">
                  <div class="t m0 xa hc y13 ff2 fs2 fc0 sc0 ls0 ws0">Seccional </div>
               </div>
               <div class="c xb y12 w7 hf">
                  <div class="t m0 xa he y14 ff3 fs1 fc0 sc0 ls0 ws0"> {{seccional}}</div>
               </div>
               <div class="c x9 y15 w6 hd">
                  <div class="t m0 xa hc y10 ff2 fs2 fc0 sc0 ls1 ws0"><span class="ls0">Nombre </span></div>
               </div>
               <div class="c xb y15 w7 hd">
                  <div class="t m0 xa he y11 ff3 fs1 fc0 sc0 ls0 ws0"> {{nombreafiliado}}</div>
               </div>
               <div class="c x9 y16 w6 h10">
                  <div class="t m0 xa hc y17 ff2 fs2 fc0 sc0 ls0 ws0">Documento de </div>
                  <div class="t m0 xa hc y18 ff2 fs2 fc0 sc0 ls0 ws0">Identificación </div>
               </div>
               <div class="c xb y16 w7 h10">
                  <div class="t m0 xa he y19 ff3 fs1 fc0 sc0 ls0 ws0"> {{documentoaf}}</div>
               </div>
               <div class="c x9 y1a w6 hf">
                  <div class="t m0 xa hc y13 ff2 fs2 fc0 sc0 ls1 ws0"><span class="ls0">Edad </span></div>
               </div>
               <div class="c xb y1a w7 hf">
                  <div class="t m0 xa he y14 ff3 fs1 fc0 sc0 ls0 ws0">{{edad}} </div>
               </div>
               <div class="c x9 y1b w6 hb">
                  <div class="t m0 xa hc y1c ff2 fs2 fc0 sc0 ls0 ws0">Fecha de Ingreso </div>
               </div>
               <div class="c xb y1b w7 hb">
                  <div class="t m0 xa he y1d ff3 fs1 fc0 sc0 ls0 ws0"> {{fechaingreso}}</div>
               </div>
               <div class="c x9 y1e w6 hd">
                  <div class="t m0 xa hc y10 ff2 fs2 fc0 sc0 ls1 ws0"><span class="ls0">Fecha de Egreso </span></div>
               </div>
               <div class="c xb y1e w7 hd">
                  <div class="t m0 xa he y11 ff3 fs1 fc0 sc0 ls0 ws0"> {{fechaegreso}}</div>
               </div>
               <div class="c x9 y1f w6 hf">
                  <div class="t m0 xa hc y13 ff2 fs2 fc0 sc0 ls0 ws0">Diagnostico</div>
               </div>
               <div class="c xb y1f w7 hf">
                  <div class="t m0 xa he y14 ff3 fs1 fc0 sc0 ls0 ws0">{{diagnostico}} </div>
               </div>
               <div class="c x9 y20 w6 hd">
                  <div class="t m0 xa hc y10 ff2 fs2 fc0 sc0 ls0 ws0">Hospitalizacion<span class="ls2">  </span> </div>
               </div>
               <div class="c xb y20 w7 hd">
                  <div class="t m0 xa he y11 ff3 fs1 fc0 sc0 ls0 ws0">{{hosp}}  </div>
               </div>
               <div class="c x9 y21 glosa h11">
                  <div class="t m0 xa hc yc ff2 fs2 fc0 sc0 ls1 ws0">Fecha glosa</div> 
               </div>
               <div class="c xb y21 w8 h11">
                  <div class="t m0 xa hc yc ff2 fs2 fc0 sc0 ls0 ws0">{{fechaglosa}} </div>
               </div>
               <div class="c xd y21 w9 h11">
                  <div class="t m0 xa hc yc ff2 fs2 fc0 sc0 ls1 ws0">Total glosa<span class="ls0"> </span></div>
               </div>
               <div class="c xe y21 w9 h11">
                  <div class="t m0 xa hc y22 ff2 fs2 fc0 sc0 ls0 ws0"> {{totalglosa}} </div>
               </div>
              <!--  <div class="c x8 y2 w5 h0">
                  <div class="t m0 x9 he y23 ff3 fs1 fc0 sc0 ls0 ws0"> </div>
               </div>
               <div class="c x9 y24 wa hd">
                  <div class="t m0 xa h5 y11 ff2 fs1 fc0 sc0 ls0 ws0">Fecha de Objeción<span class="_ _0"></span> {{fechaobj}} </div>
               </div> -->
               <div class="c x9 y25 wa hf">
                  <div class="t m0 xa h5 y14 ff2 fs1 fc0 sc0 ls0 ws0">Nombre del <span class="_ _0"></span>Auditor EPS:<span class="_ _0"></span>  {{nombreau}} </div>
               </div> 
               <div class="c x9 y26 wa h12">
                  <textarea class="texta">{{Hallazgos}}</textarea> 
               </div>
              <div>
                <div class="c x8 y2 w5 h0" style="top:20px">
                   <div class="t m0 xf h5 y29 ff2 fs1 fc0 sc0 ls0 ws0">__________________________ <br>Firma Auditor</div>
                </div>
              </div>
              <div>
                 <div class="c x8 y2 w5 h0" style="top:20px;margin-left: 25%;">
                    <div class="t m0 xf2 h5 y29 ff2 fs1 fc0 sc0 ls0 ws0">__________________________ <br>Firma IPS</div>
                 </div>
              </div>
              </div>
            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
         </div>
      </div>
      <div class="loading-indicator">
      </div>
   </body>
</html>
