<?php
$routes = [];

$routes['/afiliados']['get'] = [AfiliadoController::class, 'buscar'];
$routes['/afiliados/grupo']['get'] = [AfiliadoController::class, 'grupo'];
$routes['/afiliados/datos-basicos']['get'] = [AfiliadoController::class, 'datos'];
$routes['/afiliados/actualizarFicha']['post'] = [AfiliadoController::class, 'actualizarFicha'];
$routes['/listas/grupo-etnico']['get'] = [AfiliadoController::class, 'listarGrupoEtnico'];
$routes['/listas/grupo-poblacional']['get'] = [AfiliadoController::class, 'listarGrupoPoblacional'];
$routes['/listas/escolaridad']['get'] = [AfiliadoController::class, 'listarEscolaridad'];
$routes['/listas/actividades-economicas']['get'] = [AfiliadoController::class, 'listarActividadesEconomicas'];