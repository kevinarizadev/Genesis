<?php

class AfiliadoController {
	public function buscar($request = null) {
		if ($request === null || !isset($request['get']['consulta'])) {
			response([
				'error' => [
					'message' => 'Debe ingresar una consulta'
				]
			], 422);
		}
		if (strlen($request['get']['consulta']) < 4) {
			response([
				'error' => [
					'message' => 'El tamaño de la consulta es inferior a 4 caracteres'
				]
			], 422);
		}
		$afiliados = query('
		begin PQ_SERVICIO_CONSU.p_valida_afiliado(
			:query,
          	:v_response
        ); end;
		', [
			[
				'key' => ':query',
				'value' => $request['get']['consulta']
			],
		], 'TABLE', ':v_response', 'PROD');
		response([
			'data' => $afiliados
		]);
	}

	public function listarGrupoEtnico($request = null) {
		$datos = query('
			begin PQ_SERVICIO_CONSU.p_listar_grupo_etnico (
          	:v_response
        ); end;
		', []
		, 'TABLE', ':v_response', 'PROD');
		response([
				'data' => $datos
		]);
	}

	public function listarActividadesEconomicas($request = null) {
		$datos = query('
			begin PQ_SERVICIO_CONSU.p_listar_actividades_economicas  (
          	:v_response
        ); end;
		', []
		, 'TABLE', ':v_response', 'PROD');
		response([
				'data' => $datos
		]);
	}

	public function listarEscolaridad($request = null) {
		$datos = query('
			begin PQ_SERVICIO_CONSU.p_listar_escolaridad  (
          	:v_response
        ); end;
		', []
		, 'TABLE', ':v_response', 'PROD');
		response([
				'data' => $datos
		]);
	}


	public function listarGrupoPoblacional($request = null) {
		$datos = query('
			begin PQ_SERVICIO_CONSU.p_listar_grupo_poblacional  (
          	:v_response
        ); end;
		', []
		, 'TABLE', ':v_response', 'PROD');
		response([
				'data' => $datos
		]);
	}

	public function grupo($request = null) {
		if ($request === null || !isset($request['get']['tipo']) || !isset($request['get']['documento'])) {
			response([
				'error' => [
					'message' => 'Debe ingresar los campos requeridos'
				]
			], 422);
		}

		$grupo = query('
			begin PQ_SERVICIO_CONSU.p_valida_nucleo_app (
				:v_ptipo_doc,
				:v_pnum_doc,
				:v_pficha,
	          	:v_response
	        ); end;
		', [
			[
				'key' => ':v_ptipo_doc',
				'value' => $request['get']['tipo']
			],
			[
				'key' => ':v_pnum_doc',
				'value' => $request['get']['documento']
			],
			[
				'key' => ':v_pficha',
				'value' => $request['get']['ficha']
			],
		], 'TABLE', ':v_response', 'PROD');
		response([
			'data' => $grupo,
			'meta' => $request
		]);
	}

	public function actualizarFicha($request = null) {
		$grupo = query('
			begin PQ_SERVICIO_CONSU.p_actualiza_ficha_vivienda (
				:v_pjson ,
				:v_pcantidad ,
				:v_pficha ,
	          	:v_json_out 
	        ); end;
		', [
			[
				'key' => ':v_pjson',
				'value' => json_encode($request['post']['grupo'])
			],
			[
				'key' => ':v_pcantidad',
				'value' => count($request['post']['grupo'])
			],
			[
				'key' => ':v_pficha',
				'value' => $request['get']['ficha']
			]
		], 'JSON', ':v_json_out', 'PROD');
		response([
			'data' => $grupo,
			'meta' => $request
		]);
	}

	public function datos($request = null) {
		$datosBasicos = query('
			begin PQ_SERVICIO_CONSU.p_mostrar_afiliado_ips(
				:v_ptipo_documento,
				:v_pdocumento,
				:v_prespuesta
			); end;
		', [
			[
				'key' => 'v_ptipo_documento',
				'value' => $request['get']['tipo']
			],
			[
				'key' => 'v_pdocumento',
				'value' => $request['get']['documento']
			]
		], 'JSON', ':v_prespuesta', 'PROD');

		response([
			'data' => $datosBasicos
		]);
	}
}
