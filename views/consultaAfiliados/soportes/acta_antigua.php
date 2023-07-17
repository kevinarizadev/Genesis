<?php
session_start();
if (!isset($_SESSION['nombre'])) {
    header("Location: ../../../index.html");
}
?>


<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Acta de entrega</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/consultaafiliados/soportes/actacontroller.js"></script>
    <script src="../../../scripts/const/const.js"></script>
    <script type="text/javascript" src="../../../js/ngStorage.js"></script>

    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="utf-8" />
</head>

<body style="margin: 0;" ng-controller="actaController">

    <div id="p1" style="overflow: hidden; position: relative; background-color: white; width: 935px; height: 1210px;">


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
            #t1_2 {
                left: 37px;
                bottom: 1078px;
                word-spacing: -0.1px;
            }
            
            #t1_1 {
                left: 303px;
                bottom: 1123px;
                word-spacing: -0.1px;
            }

            #t2_1 {
                left: 597px;
                bottom: 1132px;
                word-spacing: 0.1px;
            }

            #t3_1 {
                left: 597px;
                bottom: 1110px;
                word-spacing: 0.1px;
            }

            #t4_1 {
                left: 265px;
                bottom: 1091px;
                word-spacing: 0.1px;
            }

            #t5_1 {
                left: 373px;
                bottom: 1074px;
            }

            #t6_1 {
                left: 597px;
                bottom: 1082px;
                letter-spacing: 0.1px;
            }

            #t7_1 {
                left: 654px;
                bottom: 1082px;
                word-spacing: -0.5px;
            }

            #t8_1 {
                left: 365px;
                bottom: 987px;
                word-spacing: -0.2px;
            }

            #t9_1 {
                left: 166px;
                bottom: 959px;
                word-spacing: -0.1px;
            }

            #ta_1 {
                left: 138px;
                bottom: 931px;
                letter-spacing: -0.1px;
                word-spacing: 0.3px;
            }

            #tb_1 {
                left: 307px;
                bottom: 931px;
                word-spacing: -0.1px;
            }

            #tc_1 {
                left: 138px;
                bottom: 916px;
                word-spacing: 0.2px;
            }

            #td_1 {
                left: 307px;
                bottom: 916px;
            }

            #te_1 {
                left: 476px;
                bottom: 916px;
                word-spacing: -0.1px;
            }

            #tf_1 {
                left: 644px;
                bottom: 916px;
                letter-spacing: -0.2px;
            }

            #tg_1 {
                left: 138px;
                bottom: 901px;
                letter-spacing: -0.1px;
            }

            #th_1 {
                left: 307px;
                bottom: 901px;
                letter-spacing: -0.1px;
            }

            #ti_1 {
                left: 476px;
                bottom: 901px;
                letter-spacing: -0.1px;
            }

            #tj_1 {
                left: 644px;
                bottom: 901px;
                letter-spacing: -0.1px;
            }

            #tk_1 {
                left: 138px;
                bottom: 887px;
                letter-spacing: -0.1px;
            }

            #tl_1 {
                left: 307px;
                bottom: 887px;
                letter-spacing: -0.2px;
            }

            #tm_1 {
                left: 476px;
                bottom: 887px;
                letter-spacing: -0.1px;
            }

            #tn_1 {
                left: 644px;
                bottom: 887px;
                letter-spacing: 0.1px;
            }

            #to_1 {
                left: 138px;
                bottom: 872px;
            }

            #tp_1 {
                left: 307px;
                bottom: 872px;
                letter-spacing: -0.2px;
            }

            #tq_1 {
                left: 476px;
                bottom: 872px;
                letter-spacing: -0.1px;
            }

            #tr_1 {
                left: 644px;
                bottom: 872px;
                letter-spacing: -0.2px;
            }

            #to_2 {
                left: 138px;
                bottom: 856px;
            }

            #to_3 {
                left: 358px;
                bottom: 858px;
                padding: 18px 40px;
                border: 6px solid black;
            }

            #tp_2 {
                left: 313px;
                bottom: 856px;
                letter-spacing: -0.2px;
            }

            #tp_3 {
                left: 518px;
                bottom: 858px;
                padding: 18px 40px;
                border: 6px solid black;
            }

            #tq_2 {
                left: 476px;
                bottom: 856px;
                letter-spacing: -0.1px;
            }

            /* #tr_2 {
                left: 644px;
                bottom: 856px;
                letter-spacing: -0.2px;
            } */

            #ts_1 {
                left: 130px;
                bottom: 748px;
            }

            #tt_1 {
                left: 368px;
                bottom: 748px;
                word-spacing: -0.1px;
            }

            #tu_1 {
                left: 742px;
                bottom: 748px;
                letter-spacing: 0.1px;
            }

            #tv_1 {
                left: 784px;
                bottom: 748px;
                letter-spacing: 0.1px;
            }

            #tw_1 {
                left: 130px;
                bottom: 714px;
            }

            #tx_1 {
                left: 168px;
                bottom: 715px;
                word-spacing: 0.1px;
            }

            #ty_1 {
                left: 168px;
                bottom: 700px;
            }

            #tz_1 {
                left: 130px;
                bottom: 672px;
                letter-spacing: 0.1px;
            }

            #t10_1 {
                left: 162px;
                bottom: 672px;
                word-spacing: 0.1px;
            }

            #t11_1 {
                left: 168px;
                bottom: 658px;
                word-spacing: 0.1px;
            }

            #t12_1 {
                left: 130px;
                bottom: 629px;
                letter-spacing: 0.1px;
            }

            #t13_1 {
                left: 162px;
                bottom: 629px;
            }

            #t14_1 {
                left: 164px;
                bottom: 615px;
                letter-spacing: -0.2px;
            }

            #t15_1 {
                left: 130px;
                bottom: 587px;
                letter-spacing: 0.1px;
            }

            #t16_1 {
                left: 162px;
                bottom: 587px;
            }

            #t17_1 {
                left: 130px;
                bottom: 559px;
                letter-spacing: 0.1px;
            }

            #t18_1 {
                left: 162px;
                bottom: 559px;
                word-spacing: 0.1px;
            }

            #t19_1 {
                left: 164px;
                bottom: 545px;
                letter-spacing: -0.1px;
                word-spacing: 0.5px;
            }

            #t1a_1 {
                left: 130px;
                bottom: 461px;
                letter-spacing: -0.1px;
                word-spacing: 0.3px;
            }

            #t1b_1 {
                left: 130px;
                bottom: 433px;
                word-spacing: 0.1px;
            }

            #t1c_1 {
                left: 130px;
                bottom: 419px;
            }

            #t1d_1 {
                left: 130px;
                bottom: 405px;
            }

            #t1e_1 {
                left: 130px;
                bottom: 350px;
            }

            #t1f_1 {
                left: 518px;
                bottom: 350px;
            }

            #t1g_1 {
                left: 130px;
                bottom: 282px;
            }

            #t1h_1 {
                left: 444px;
                bottom: 282px;
            }

            #t1i_1 {
                left: 385px;
                bottom: 796px;
                letter-spacing: -0.1px;
            }

            #t1j_1 {
                left: 724px;
                bottom: 480px;
            }

            #t1k_1 {
                left: 724px;
                bottom: 462px;
            }

            #t1l_1 {
                left: 724px;
                bottom: 444px;
            }

            #t1m_1 {
                left: 724px;
                bottom: 427px;
            }

            #t1n_1 {
                left: 724px;
                bottom: 409px;
            }

            #t1o_1 {
                left: 724px;
                bottom: 392px;
            }

            #t1p_1 {
                left: 724px;
                bottom: 346px;
            }

            #t1q_1 {
                left: 724px;
                bottom: 328px;
            }

            #t1r_1 {
                left: 724px;
                bottom: 311px;
            }

            #t1s_1 {
                left: 724px;
                bottom: 293px;
            }

            #t1t_1 {
                left: 724px;
                bottom: 276px;
            }

            #t1u_1 {
                left: 724px;
                bottom: 258px;
            }

            .s1_1 {
                FONT-SIZE: 61.1px;
                /* FONT-FAMILY: Arial-BoldMT_a; */
                font-family: 'Open Sans', sans-serif;
                font-weight: 600;
                color: rgb(0, 0, 0);
            }

            .s2_1 {
                FONT-SIZE: 85.6px;
                FONT-FAMILY: Arial-BoldMT_a;
                color: rgb(0, 0, 0);
            }

            .s3_1 {
                FONT-SIZE: 48.9px;
                FONT-FAMILY: Arial-BoldMT_a;
                color: rgb(0, 0, 0);
            }

            .s4_1 {
                FONT-SIZE: 48.9px;
                FONT-FAMILY: Arial-BoldMT_a;
                color: rgb(0, 0, 0);
            }

            .s5_1 {
                FONT-SIZE: 67.2px;
                FONT-FAMILY: Calibri_k;
                color: rgb(0, 0, 0);
            }

            .s6_1 {
                FONT-SIZE: 97.8px;
                FONT-FAMILY: Arial-BoldMT_a;
                color: rgb(0, 32, 96);
            }

            .s7_1 {
                FONT-SIZE: 61.1px;
                FONT-FAMILY: Arial-BoldMT_a;
                color: rgb(127, 127, 127);
            }
        </style>
        <style id="fonts1" type="text/css">
            @font-face {
                font-family: Arial-BoldMT_a;
                src: url("fonts/Arial-BoldMT_a.woff") format("woff");
            }

            @font-face {
                font-family: Arial-BoldMT_a;
                src: url("fonts/Arial-BoldMT_a.woff") format("woff");
            }

            @font-face {
                font-family: Calibri_k;
                src: url("fonts/Calibri_k.woff") format("woff");
            }
        </style>



        <div id="pg1Overlay" style="width:100%; height:100%; position:absolute; z-index:1; background-color:rgba(0,0,0,0); -webkit-user-select: none;"></div>
        <div id="pg1" style="-webkit-user-select: none;"><object width="935" height="1210" data="acta/1.svg" type="image/svg+xml" id="pdf1" style="width:935px; height:1210px; -moz-transform:scale(1); z-index: 0;"></object></div>


        <div id="t1_2" class="t s1_1">
            <img style="width: 10em;" src="../../../assets/images/logo_cajacopieps.png">
        </div>
        <div id="t1_1" class="t s1_1">FORMATO ACTA DE ENTREGA</div>
        <div id="t2_1" class="t s1_1">Código: OP-FR-08</div>
        <div id="t3_1" class="t s1_1">Versión: 01</div>
        <div id="t4_1" class="t s1_1">PROCEDIMIENTO PARA LA AFILIACION E</div>
        <div id="t5_1" class="t s1_1">INSCRIPCIÓN</div>
        <div id="t6_1" class="t s1_1">Fecha: </div>
        <div id="t7_1" class="t s1_1"><strong>Febrero 2023 </strong></div>
        <div id="t8_1" class="t s2_1">ACTA DE ENTREGA</div>
        <div id="t9_1" class="t s3_1">CARNÉ, CARTA DE DERECHOS Y DEBERES DEL AFILIADO Y DEL PACIENTE – CARTA DE DESEMPEÑO</div>
        <div id="ta_1" class="t s4_1">Nombres y apellidos:</div>
        <div id="tb_1" class="t s3_1"> <strong> {{name_c}} </strong> </div>
        <div id="tc_1" class="t s4_1">Documento de identidad:</div>
        <div id="td_1" class="t s3_1"> <strong> {{numero_documento}} </strong> </div>
        <div id="te_1" class="t s4_1">Fecha de nacimiento:</div>
        <div id="tf_1" class="t s3_1"> <strong> {{fecha_nacimiento}} </strong> </div>
        <div id="tg_1" class="t s4_1">Dirección:</div>
        <div id="th_1" class="t s3_1"> <strong> {{direccion}} </strong> </div>
        <div id="ti_1" class="t s4_1">Barrio:</div>
        <div id="tj_1" class="t s3_1"> <strong> {{barrio}} </strong> </div>
        <div id="tk_1" class="t s4_1">Municipio:</div>
        <div id="tl_1" class="t s3_1"> <strong> {{municipio}} </strong> </div>
        <div id="tm_1" class="t s4_1">Correo:</div>
        <div id="tn_1" class="t s3_1"> <strong> {{correo}} </strong> </div>
        <div id="to_1" class="t s4_1">Teléfono:</div>
        <div id="tp_1" class="t s3_1"> <strong> {{tel_fijo}} </strong> </div>
        <div id="tq_1" class="t s4_1">Celular:</div>
        <div id="tr_1" class="t s3_1"> <strong> {{tel_celular}} </strong> </div>
        <!--  -->
        <div id="to_2" class="t s4_1">Medio de Entrega:</div>
        <div id="to_3" class="t s4_1"></div>
        <div id="tp_2" class="t s3_1">Digital</div>
        <div id="tp_3" class="t s4_1"></div>
        <div id="tq_2" class="t s4_1">Fisica</div>
        <!--  -->
        <div id="ts_1" class="t s4_1">ÍTEMS </div>
        <div id="tt_1" class="t s4_1">CONTENIDO DE LA EVALUACIÓN </div>
        <div id="tu_1" class="t s4_1">SI </div>
        <div id="tv_1" class="t s4_1">NO</div>
        <div id="tw_1" class="t s5_1">1°. </div>
        <div id="tx_1" class="t s3_1">¿Antes del diligenciamiento del formulario de afiliación, CAJACOPI EPS, le hizo entrega de la Carta</div>
        <div id="ty_1" class="t s3_1">de Derechos y Deberes del Afiliado y del Paciente?</div>
        <div id="tz_1" class="t s3_1">2°. </div>
        <div id="t10_1" class="t s3_1">¿Antes del diligenciamiento del formulario de afiliación, CAJACOPI EPS, le hizo entrega de la Carta </div>
        <div id="t11_1" class="t s3_1">de Desempeño, donde se presenta de manera clara, su puesto en el Ranking? </div>
        <div id="t12_1" class="t s3_1">3°. </div>
        <div id="t13_1" class="t s3_1">¿Leyó el contenido de la Carta de Derechos y Deberes del Afiliado y del Paciente de CAJACOPI </div>
        <div id="t14_1" class="t s3_1">EPS?</div>
        <div id="t15_1" class="t s3_1">4°. </div>
        <div id="t16_1" class="t s3_1">¿Leyó el contenido de la Carta de Desempeño de CAJACOPI EPS?</div>
        <div id="t17_1" class="t s3_1">5°. </div>
        <div id="t18_1" class="t s3_1">¿Si tuvo alguna duda sobre el contenido de la información, fue asesorado adecuadamente por</div>
        <div id="t19_1" class="t s3_1">CAJACOPI EPS?</div>
        <div id="t1a_1" class="t s3_1">FIRMA DEL AFILIADO</div>
        <div id="t1b_1" class="t s3_1">NOTA: Sí el afiliado no sabe o no puede firmar el diligenciamiento y suscripción de esta evaluación,</div>
        <div id="t1c_1" class="t s3_1">la efectuará la persona a quien él ruegue, lo cual deberá ser ratificado con la imposición de la Huella</div>
        <div id="t1d_1" class="t s3_1">Dactilar, Nombre, Edad, Identificación, domicilio, de a quien autorice a ruego.</div>
        <div id="t1e_1" class="t s5_1">NOMBRE: </div>
        <div id="t1f_1" class="t s5_1">EDAD:</div>
        <div id="t1g_1" class="t s5_1">DOMICILIO: </div>
        <div id="t1h_1" class="t s5_1">IDENTIFICACIÓN:</div>
        <div id="t1i_1" class="t s6_1">EVALUACIÓN</div>
        <div id="t1j_1" class="t s7_1">H</div>
        <div id="t1k_1" class="t s7_1">U</div>
        <div id="t1l_1" class="t s7_1">E</div>
        <div id="t1m_1" class="t s7_1">L</div>
        <div id="t1n_1" class="t s7_1">L</div>
        <div id="t1o_1" class="t s7_1">A</div>
        <div id="t1p_1" class="t s7_1">H</div>
        <div id="t1q_1" class="t s7_1">U</div>
        <div id="t1r_1" class="t s7_1">E</div>
        <div id="t1s_1" class="t s7_1">L</div>
        <div id="t1t_1" class="t s7_1">L</div>
        <div id="t1u_1" class="t s7_1">A</div>




    </div>
</body>

</html>