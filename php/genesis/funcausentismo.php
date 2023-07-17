<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if ($request === null) {
    http_response_code(400);
    echo json_encode([
        'error' => [
            'message' => 'Invalid request'
        ]
    ]);
} else {
    $function = isset($request->function) ? $request->function : null;

    if ($function !== null) {
        $function();
    } else {
        http_response_code(400);
        echo json_encode([
            'error' => [
                'message' => 'Invalid request'
            ]
        ]);
    }
}





function obtenerPermisos()
{
    global $request;

    require_once('../config/dbcon_prod.php');

    $consulta = oci_parse(
        $c,
        'begin pq_genesis_ausencias.p_lista_tipo_permiso(:v_json_row); end;'
    );

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    oci_close($c);
    $data = json_decode($clob->read($clob->size()), true);

    $formatted = [];

    foreach ($data as $item) {
        $formatted[] = [
            'nombre' => $item['NOMBRE'],
            'id' => $item['NUMERO']
        ];
    }

    echo json_encode([
        "data" => $formatted
    ]);
    exit;
}

function obtenerTiposPermiso()
{
    global $request;

    $tipo = $request->data->tipo;

    if ($tipo === '1') {
        $respuesta = [
            [
                'id' => 30,
                'nombre' => 'LICENCIAS'
            ],
            [
                'id' => 20,
                'nombre' => 'CALAMIDAD DOMESTICA'
            ],
            [
                'id' => 18,
                'nombre' => 'SERVICIOS MEDICOS'
            ],
            [
                'id' => 19,
                'nombre' => 'DILIGENCIAS PERSONALES'
            ],
            [
                'id' => 24,
                'nombre' => 'EVENTOS DE CAPACITACION EXTERNA'
            ],
            [
                'id' => 25,
                'nombre' => 'SUFRAGIO'
            ],
            [
                'id' => 26,
                'nombre' => 'EVENTOS DE OTRA CLASIFICACION'
            ]
        ];
        echo json_encode([
            "data" => $respuesta
        ]);
        exit;
    } else if ($tipo === '3') {
        $respuesta = [
            [
                'id' => 27,
                'nombre' => 'Enfermedad general'
            ],
            [
                'id' => 28,
                'nombre' => 'Accidente de transito'
            ],
            [
                'id' => 29,
                'nombre' => 'Accidente laboral'
            ]
        ];

        echo json_encode([
            "data" => $respuesta
        ]);
        exit;
    } else {

        require_once('../config/dbcon_prod.php');

        $consulta = oci_parse(
            $c,
            'begin PQ_GENESIS_AUSENCIAS.P_OBTENER_PERMISO(:v_tipo, :v_json_row); end;'
        );

        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
        oci_bind_by_name($consulta, ':v_tipo', $tipo);
        oci_execute($consulta, OCI_DEFAULT);
        oci_close($c);
        $data = json_decode($clob->read($clob->size()), true);

        $formatted = [];

        foreach ($data as $item) {
            $formatted[] = [
                'nombre' => $item['NOMBRE'],
                'id' => $item['NUMERO']
            ];
        }

        echo json_encode([
            "data" => $formatted
        ]);
        exit;
    }
}

function obtenerSubtiposPermiso()
{
    global $request;
    $id  = $request->data->tipo;

    $subtipos = null;
    switch ($id) {
        case '30':
            $subtipos = [
                [
                    "id" => 31,
                    "nombre" => "Matrimonio"
                ],
                [
                    "id" => 32,
                    "nombre" => "Licencia de maternidad"
                ],
                [
                    "id" => 33,
                    "nombre" => "Licencia de paternidad"
                ],
                [
                    "id" => 34,
                    "nombre" => "Licencia por luto"
                ],
            ];
            break;
        case '25':
            $subtipos = [
                [
                    "id" => 41,
                    "nombre" => "Sufragio Votante"
                ],
                [
                    "id" => 42,
                    "nombre" => "Sufragio Jurado"
                ]
            ];
            break;
        case '28':
            $subtipos = [
                [
                    "id" => 1,
                    "nombre" => "Interno"
                ],
                [
                    "id" => 2,
                    "nombre" => "Externo"
                ]
            ];
            break;
        case '29':
            $subtipos = [
                [
                    "id" => 1,
                    "nombre" => "Interno"
                ],
                [
                    "id" => 2,
                    "nombre" => "Externo"
                ]
            ];
            break;
    }
    echo json_encode([
        "data" => $subtipos
    ]);
    exit;
}


function obtenerDiagnostico()
{
    global $request;
    // begin PQ_GENESIS_AUSENCIAS.P_LISTA_DX_INCAPACIDAD(:v_pcie10, :v_json_row); end;

    require_once('../config/dbcon_prod.php');

    $tipo = $request->data->cie10;

    $consulta = oci_parse(
        $c,
        'begin PQ_GENESIS_AUSENCIAS.P_LISTA_DX_INCAPACIDAD(:v_pcie10, :v_json_row); end;'
    );

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_bind_by_name($consulta, ':v_pcie10', $tipo);
    oci_execute($consulta, OCI_DEFAULT);
    oci_close($c);
    $data = json_decode($clob->read($clob->size()), true);

    $formatted = [];

    foreach ($data as $item) {
        $formatted[] = [
            'nombre' => $item['Nombre'],
            'codigo' => $item['Codigo']
        ];
    }

    echo json_encode([
        "data" => $formatted
    ]);
    exit;
}
