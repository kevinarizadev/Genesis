<?php
session_start();
if (!isset($_SESSION['nombre'])) {
    header("Location: ../../../index.html");
}
?>
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Solicitud De Portabilidad</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/consultaafiliados/soportes/SolicitudPortabilidad.js"></script>
    <script src="../../../scripts/const/const.js"></script>
    <script type="text/javascript" src="../../../js/ngStorage.js"></script>

</head>

<body style="margin: 0;" ng-controller="SolicitudPortabilidad">

    <div id="p1" style="overflow: hidden; position: relative; background-color: white; width: 909px; height: 1286px;">

        <style class="shared-css" type="text/css">
            .t {
                -webkit-transform-origin: bottom left;
                -ms-transform-origin: bottom left;
                transform-origin: bottom left;
                -webkit-transform: scale(0.25);
                -ms-transform: scale(0.25);
                transform: scale(0.25);
                z-index: 2;
                position: absolute;
                white-space: pre;
                overflow: visible;
            }
        </style>
        <style type="text/css">
            #t1_1 {
                left: 93px;
                bottom: 1114px;
                word-spacing: 0.2px;
            }

            #t2_1 {
                left: 85px;
                bottom: 996px;
                word-spacing: 0.2px;
            }

            #t3_1 {
                left: 207px;
                bottom: 996px;
                letter-spacing: -0.2px;
            }

            #t4_1 {
                left: 368px;
                bottom: 968px;
                letter-spacing: -0.1px;
                word-spacing: 0.3px;
            }

            #t5_1 {
                left: 505px;
                bottom: 968px;
                word-spacing: 0.1px;
            }

            #t6_1 {
                left: 634px;
                bottom: 968px;
                letter-spacing: -0.1px;
                word-spacing: 0.3px;
            }

            #t7_1 {
                left: 747px;
                bottom: 968px;
                word-spacing: 0.2px;
            }

            #t8_1 {
                left: 273px;
                bottom: 861px;
                letter-spacing: -0.2px;
            }

            #t9_1 {
                left: 233px;
                bottom: 843px;
                word-spacing: -0.1px;
            }

            #ta_1 {
                left: 273px;
                bottom: 764px;
                letter-spacing: -0.2px;
            }

            #tb_1 {
                left: 241px;
                bottom: 749px;
                letter-spacing: 0.1px;
                word-spacing: -0.3px;
            }

            #tc_1 {
                left: 234px;
                bottom: 705px;
            }

            #td_1 {
                left: 333px;
                bottom: 705px;
                letter-spacing: -0.1px;
            }

            #te_1 {
                left: 253px;
                bottom: 693px;
            }

            #tf_1 {
                left: 280px;
                bottom: 682px;
                letter-spacing: 0.1px;
            }

            #tg_1 {
                left: 377px;
                bottom: 694px;
            }

            #th_1 {
                left: 396px;
                bottom: 699px;
                letter-spacing: 0.1px;
            }

            #ti_1 {
                left: 492px;
                bottom: 699px;
                letter-spacing: 0.2px;
            }

            #tj_1 {
                left: 413px;
                bottom: 688px;
                letter-spacing: -0.1px;
                word-spacing: 0.1px;
            }

            #tk_1 {
                left: 514px;
                bottom: 694px;
            }

            #tl_1 {
                left: 556px;
                bottom: 709px;
            }

            #tm_1 {
                left: 535px;
                bottom: 697px;
                letter-spacing: -0.1px;
            }

            #tn_1 {
                left: 590px;
                bottom: 697px;
                word-spacing: 0.1px;
            }

            #to_1 {
                left: 560px;
                bottom: 686px;
                letter-spacing: -0.1px;
                word-spacing: 0.1px;
            }

            #tp_1 {
                left: 643px;
                bottom: 693px;
            }

            #tq_1 {
                left: 703px;
                bottom: 693px;
                letter-spacing: 0.2px;
                word-spacing: -0.4px;
            }

            #tr_1 {
                left: 755px;
                bottom: 692px;
            }

            #ts_1 {
                left: 395px;
                bottom: 594px;
                letter-spacing: 0.2px;
            }

            #tt_1 {
                left: 431px;
                bottom: 574px;
                letter-spacing: 0.1px;
            }

            #tu_1 {
                left: 810px;
                bottom: 574px;
                letter-spacing: 0.1px;
            }

            #tv_1 {
                left: 395px;
                bottom: 554px;
                letter-spacing: 0.2px;
            }

            #tw_1 {
                left: 427px;
                bottom: 535px;
                letter-spacing: 0.2px;
            }

            #tx_1 {
                left: 806px;
                bottom: 535px;
                letter-spacing: 0.2px;
            }

            #ty_1 {
                left: 423px;
                bottom: 997px;
                letter-spacing: -0.2px;
            }

            #tz_1 {
                left: 668px;
                bottom: 997px;
                letter-spacing: -0.3px;
            }

            #t10_1 {
                left: 785px;
                bottom: 997px;
                letter-spacing: -0.1px;
            }

            #t11_1 {
                left: 605px;
                bottom: 575px;
                letter-spacing: -0.1px;
            }

            #t12_1 {
                left: 624px;
                bottom: 616px;
                letter-spacing: -0.2px;
                word-spacing: 0.4px;
            }

            #t13_1 {
                left: 725px;
                bottom: 749px;
                letter-spacing: 0.1px;
                word-spacing: -0.3px;
            }

            #t14_1 {
                left: 422px;
                bottom: 862px;
                letter-spacing: -0.2px;
            }

            #t15_1 {
                left: 425px;
                bottom: 844px;
                letter-spacing: 0.1px;
            }

            #t16_1 {
                left: 569px;
                bottom: 862px;
                letter-spacing: -0.2px;
            }

            #t17_1 {
                left: 202px;
                bottom: 536px;
                letter-spacing: 0.1px;
            }

            #t18_1 {
                left: 183px;
                bottom: 516px;
                letter-spacing: 0.2px;
            }

            #t19_1 {
                left: 180px;
                bottom: 496px;
                letter-spacing: 0.1px;
                word-spacing: -0.3px;
            }

            #t1a_1 {
                left: 183px;
                bottom: 553px;
                letter-spacing: 0.2px;
            }

            #t1b_1 {
                left: 254px;
                bottom: 1116px;
                letter-spacing: -0.1px;
            }

            #t1c_1 {
                left: 408px;
                bottom: 1064px;
                letter-spacing: -0.2px;
                word-spacing: 0.3px;
            }

            #t1d_1 {
                left: 110px;
                bottom: 749px;
                letter-spacing: 0.1px;
                word-spacing: -0.3px;
            }

            #t1e_1 {
                left: 425px;
                bottom: 749px;
                letter-spacing: 0.1px;
            }

            #t1f_1 {
                left: 574px;
                bottom: 749px;
                letter-spacing: 0.2px;
            }

            #t1g_1 {
                left: 541px;
                bottom: 997px;
                letter-spacing: -0.1px;
                word-spacing: 0.3px;
            }

            #t1h_1 {
                left: 261px;
                bottom: 1000px;
                letter-spacing: -0.2px;
                word-spacing: 0.4px;
            }

            #t1i_1 {
                left: 131px;
                bottom: 862px;
                letter-spacing: -0.2px;
            }

            #t1j_1 {
                left: 101px;
                bottom: 844px;
                letter-spacing: 0.1px;
                word-spacing: -0.2px;
            }

            #t1k_1 {
                left: 168px;
                bottom: 844px;
                letter-spacing: -0.2px;
            }

            #t1l_1 {
                left: 343px;
                bottom: 912px;
                letter-spacing: -0.1px;
                word-spacing: 0.3px;
            }

            #t1m_1 {
                left: 370px;
                bottom: 1169px;
                letter-spacing: -0.1px;
            }

            #t1n_1 {
                left: 746px;
                bottom: 1176px;
                letter-spacing: 0.1px;
            }

            #t1o_1 {
                left: 746px;
                bottom: 1162px;
            }

            #t1p_1 {
                left: 351px;
                bottom: 1147px;
                letter-spacing: -0.1px;
                word-spacing: -0.1px;
            }

            #t1q_1 {
                left: 746px;
                bottom: 1148px;
            }

            #t1r_1 {
                left: 579px;
                bottom: 496px;
                letter-spacing: 0.1px;
                word-spacing: -0.3px;
            }

            #t1s_1 {
                left: 574px;
                bottom: 844px;
                letter-spacing: 0.2px;
            }

            #t1t_1 {
                left: 736px;
                bottom: 862px;
                letter-spacing: -0.2px;
            }

            #t1u_1 {
                left: 725px;
                bottom: 844px;
                letter-spacing: 0.1px;
                word-spacing: -0.3px;
            }

            #t1v_1 {
                left: 338px;
                bottom: 795px;
                letter-spacing: -0.2px;
                word-spacing: 0.4px;
            }

            #t1w_1 {
                left: 140px;
                bottom: 764px;
                letter-spacing: -0.2px;
            }

            #t1x_1 {
                left: 422px;
                bottom: 764px;
                letter-spacing: -0.2px;
            }

            #t1y_1 {
                left: 569px;
                bottom: 764px;
                letter-spacing: -0.2px;
            }

            #t1z_1 {
                left: 736px;
                bottom: 764px;
                letter-spacing: -0.2px;
            }

            #t20_1 {
                left: 206px;
                bottom: 575px;
                letter-spacing: -0.1px;
            }

            #t21_1 {
                left: 96px;
                bottom: 694px;
                letter-spacing: 0.1px;
                word-spacing: -0.3px;
            }

            #t22_1 {
                left: 171px;
                bottom: 409px;
                word-spacing: 0.2px;
            }

            #t23_1 {
                left: 643px;
                bottom: 409px;
                word-spacing: 0.2px;
            }

            #t24_1 {
                left: 424px;
                bottom: 635px;
                letter-spacing: -0.1px;
                word-spacing: 0.3px;
            }

            #t25_1 {
                left: 190px;
                bottom: 616px;
                letter-spacing: -0.4px;
                word-spacing: 0.6px;
            }

            #t26_1 {
                left: 183px;
                bottom: 595px;
                letter-spacing: 0.2px;
            }

            #t27_1 {
                left: 601px;
                bottom: 536px;
                letter-spacing: 0.1px;
            }

            .s1_1 {
                FONT-SIZE: 44px;
                FONT-FAMILY: Arial-BoldMT_6;
                color: rgb(0, 0, 0);
            }

            .s2_1 {
                FONT-SIZE: 44px;
                FONT-FAMILY: ArialMT_a;
                color: rgb(0, 0, 0);
            }

            .s3_1 {
                FONT-SIZE: 40.3px;
                FONT-FAMILY: Arial-BoldMT_6;
                color: rgb(0, 0, 0);
            }

            .s4_1 {
                FONT-SIZE: 36.7px;
                /* FONT-FAMILY: Arial-BoldMT_6; */
                font-family: 'Open Sans', sans-serif;
                font-weight: 600;
                color: rgb(0, 0, 0);
            }

            .s5_1 {
                FONT-SIZE: 36.7px;
                FONT-FAMILY: ArialMT_a;
                color: rgb(0, 0, 0);
            }

            .s6_1 {
                FONT-SIZE: 40.3px;
                FONT-FAMILY: ArialMT_a;
                color: rgb(0, 0, 0);
            }
        </style>
        <!-- End inline CSS -->


        <style id="fonts1" type="text/css">
            @font-face {
                font-family: Arial-BoldMT_6;
                src: url("formato_portabilidad/fonts/Arial-BoldMT_6.woff") format("woff");
            }

            @font-face {
                font-family: ArialMT_a;
                src: url("formato_portabilidad/fonts/ArialMT_a.woff") format("woff");
            }
        </style>



        <div id="pg1Overlay" style="width:100%; height:100%; position:absolute; z-index:1; background-color:rgba(0,0,0,0); -webkit-user-select: none;"></div>
        <div id="pg1" style="-webkit-user-select: none;"><object width="909" height="1286" data="formato_portabilidad/1.svg" type="image/svg+xml" id="pdf1" style="width:909px; height:1286px; -moz-transform:scale(1); z-index: 0;"></object></div>

        <div id="t1_1" class="t s1_1">Fecha de Solicitud</div>
        <div id="t2_1" class="t s1_1">Tipo de Documento</div>
        <div id="t3_1" class="t s1_1">{{datos.TIPODOCUMENTO}}</div>
        <div id="t4_1" class="t s1_1">Primer Nombre</div>
        <div id="t5_1" class="t s1_1">Segundo Nombre</div>
        <div id="t6_1" class="t s1_1">Primer Apellido</div>
        <div id="t7_1" class="t s1_1">Segundo Apellido</div>
        <div id="t8_1" class="t s2_1">{{datos.DEPARTAMENTO}}</div>
        <div id="t9_1" class="t s3_1">Departamento de Afiliación</div>
        <div id="ta_1" class="t s2_1"> </div>
        <div id="tb_1" class="t s3_1">Departamento Receptor</div>
        <div id="tc_1" class="t s4_1">Emigración Ocasional</div>
        <div id="td_1" class="t s5_1">(menos </div>
        <div id="te_1" class="t s5_1">de 1 mes en municipio </div>
        <div id="tf_1" class="t s5_1">receptor)</div>
        <div id="tg_1" class="t s4_1"> </div>
        <div id="th_1" class="t s4_1">Emigración Temporal</div>
        <div id="ti_1" class="t s5_1">(1 </div>
        <div id="tj_1" class="t s5_1">mes a 12 meses)</div>
        <div id="tk_1" class="t s4_1"> </div>
        <div id="tl_1" class="t s4_1">Emigración </div>
        <div id="tm_1" class="t s4_1">Permanente</div>
        <div id="tn_1" class="t s5_1">(mayor a </div>
        <div id="to_1" class="t s5_1">12 meses)</div>
        <div id="tp_1" class="t s1_1"> </div>
        <div id="tq_1" class="t s3_1">No sabe</div>
        <div id="tr_1" class="t s1_1"> </div>
        <div id="ts_1" class="t s6_1">{{datos.UBICACION_IPS}}</div>
        <div id="tt_1" class="t s3_1">Ciudad</div>
        <div id="tu_1" class="t s3_1">Ciudad</div>
        <div id="tv_1" class="t s6_1">{{datos.TELEFONO_IPS}}</div>
        <div id="tw_1" class="t s3_1">Teléfono</div>
        <div id="tx_1" class="t s3_1">Teléfono</div>
        <div id="ty_1" class="t s2_1">{{datos.PRIMER_NOMBRE}}</div>
        <div id="tz_1" class="t s2_1">{{datos.PRIMER_APELLIDO}}</div>
        <div id="t10_1" class="t s2_1">{{datos.SEGUNDO_APELLIDO}}</div>
        <div id="t11_1" class="t s3_1">Nombre</div>
        <div id="t12_1" class="t s1_1">IPS RECEPTORA (NUEVA)</div>
        <div id="t13_1" class="t s3_1">Correo Electrónico</div>
        <div id="t14_1" class="t s2_1">{{datos.DIRECCION}}</div>
        <div id="t15_1" class="t s3_1">Dirección</div>
        <div id="t16_1" class="t s2_1">{{datos.CELULAR}}</div>
        <div id="t17_1" class="t s3_1">Dirección</div>
        <div id="t18_1" class="t s6_1">{{datos.EMAIL_IPS}}</div>
        <div id="t19_1" class="t s3_1">Correo Electrónico</div>
        <div id="t1a_1" class="t s6_1">{{datos.DIRECCION_IPS}}</div>
        <div id="t1b_1" class="t s2_1">{{dia}}-{{mes}}-{{ano}}</div>
        <div id="t1c_1" class="t s1_1">DATOS DE IDENTIFICACION</div>
        <div id="t1d_1" class="t s3_1">Municipio Receptor</div>
        <div id="t1e_1" class="t s3_1">Dirección</div>
        <div id="t1f_1" class="t s3_1">Teléfono</div>
        <div id="t1g_1" class="t s2_1">{{datos.SEGUNDO_NOMBRE}}</div>
        <div id="t1h_1" class="t s1_1">N° {{datos.DOCUMENTO}}</div>
        <div id="t1i_1" class="t s2_1">{{datos.MUNICIPIO}}</div>
        <div id="t1j_1" class="t s3_1">Municipio de </div>
        <div id="t1k_1" class="t s3_1">Afiliación</div>
        <div id="t1l_1" class="t s1_1">DATOS DE AFILIACION INICIAL (MUNICIPIO ORIGEN)</div>
        <div id="t1m_1" class="t s3_1">FORMATO DE SOLICITUD DE PORTABILIDAD</div>
        <div id="t1n_1" class="t s4_1">Codigo: OP-FR-10</div>
        <div id="t1o_1" class="t s4_1">Version: 05</div>
        <div id="t1p_1" class="t s3_1">PROCEDIMIENTO PARA TRÁMITE DE PORTABILIDAD </div>
        <div id="t1q_1" class="t s4_1">Fecha: Julio 2022</div>
        <div id="t1r_1" class="t s3_1">Correo Electrónico</div>
        <div id="t1s_1" class="t s3_1">Teléfono</div>
        <div id="t1t_1" class="t s2_1">{{datos.CORREO}}</div>
        <div id="t1u_1" class="t s3_1">Correo Electrónico</div>
        <div id="t1v_1" class="t s1_1">DATOS PARA PORTABILIDAD (MUNICIPIO RECEPTOR)</div>
        <div id="t1w_1" class="t s2_1"> </div>
        <div id="t1x_1" class="t s2_1"> </div>
        <div id="t1y_1" class="t s2_1"> </div>
        <div id="t1z_1" class="t s2_1"> </div>
        <div id="t20_1" class="t s3_1">Nombre</div>
        <div id="t21_1" class="t s3_1">Tiempo de la Portabilidad</div>
        <div id="t22_1" class="t s1_1">Firma del Solicitante</div>
        <div id="t23_1" class="t s1_1">Responsable por la EPS</div>
        <div id="t24_1" class="t s1_1">INFORMACION DE IPS</div>
        <div id="t25_1" class="t s1_1">IPS EN LA QUE ESTABA ASIGNADO (A)</div>
        <div id="t26_1" class="t s6_1">{{datos.IPS}}</div>
        <div id="t27_1" class="t s3_1">Dirección</div>

    </div>
</body>

</html>
