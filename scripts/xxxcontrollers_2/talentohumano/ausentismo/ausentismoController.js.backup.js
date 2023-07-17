'use strict';
angular.module('GenesisApp')
  .controller('ausentismoController', ['$scope', '$http', 'ngDialog', 'notification', 'ausentismoHttp', '$timeout', '$q', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, ausentismoHttp, $timeout, $q, communication, $controller, $rootScope, $window) {
      $(document).ready(function () {
        $('.modal').modal();


      });

      $scope.loadJS = (url) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = url;

          script.onload = () => {
            resolve();
          }

          script.onerror = () => {
            reject();
          }
          document.body.appendChild(script);
        });
      }

      $scope.crudGrid = {}
      let test = null

      $scope.crudGrid.departamentos = [
        { Name: "", Id: "" },
        { Name: "NACIONAL", Id: "1" },
        { Name: "ATLANTICO", Id: "8000" },
        { Name: "BOLIVAR", Id: "13000" },
        { Name: "CESAR", Id: "20000" },
        { Name: "CORDOBA", Id: "23000" },
        { Name: "GUAJIRA", Id: "44000" },
        { Name: "MAGDALENA", Id: "47000" },
        { Name: "META", Id: "50000" },
        { Name: "SUCRE", Id: "70000" }
      ];

      $scope.crudGrid.tipopermiso = [
        { Name: "", Id: "" },
        { Name: "SERVICIOS MÉDICOS", Id: "18" },
        { Name: "DILIGENCIAS PERSONALES", Id: "19" },
        { Name: "CALAMIDAD DOMÉSTICA", Id: "20" },
        { Name: "EJERCICIO DEL SUFRAGIO JURADO", Id: "21" },
        { Name: "EJERCICIO DEL SUFRAGIO VOTANTE", Id: "22" },
        { Name: "ESTUDIOS PERMANENTES", Id: "23" },
        { Name: "EVENTOS DE CAPACITACIÓN EXTERNA", Id: "24" },
        { Name: "MATRIMONIO DEL FUNCIONARIO", Id: "25" },
        { Name: "ASUNTO DE OTRA CLASIFICACIÓN", Id: "26" }
      ];
      $scope.crudGrid.estado = [
        { Name: "", Id: "" },
        { Name: "EN REVISION", Id: "P" },
        { Name: "AUTORIZADO", Id: "A" },
        { Name: "NO AUTORIZADO", Id: "R" }
      ];

      $scope.dataUbicacion = [
        {
          "id": 0,
          "departamento": "Amazonas",
          "ciudades": [
            "Leticia",
            "Puerto Nari\u00f1o"
          ]
        },
        {
          "id": 1,
          "departamento": "Antioquia",
          "ciudades": [
            "Abejorral",
            "Abriaqu\u00ed",
            "Alejandr\u00eda",
            "Amag\u00e1",
            "Amalfi",
            "Andes",
            "Angel\u00f3polis",
            "Angostura",
            "Anor\u00ed",
            "Anz\u00e1",
            "Apartad\u00f3",
            "Arboletes",
            "Argelia",
            "Armenia",
            "Barbosa",
            "Bello",
            "Belmira",
            "Betania",
            "Betulia",
            "Brice\u00f1o",
            "Buritic\u00e1",
            "C\u00e1ceres",
            "Caicedo",
            "Caldas",
            "Campamento",
            "Ca\u00f1asgordas",
            "Caracol\u00ed",
            "Caramanta",
            "Carepa",
            "Carolina del Pr\u00edncipe",
            "Caucasia",
            "Chigorod\u00f3",
            "Cisneros",
            "Ciudad Bol\u00edvar",
            "Cocorn\u00e1",
            "Concepci\u00f3n",
            "Concordia",
            "Copacabana",
            "Dabeiba",
            "Donmat\u00edas",
            "Eb\u00e9jico",
            "El Bagre",
            "El Carmen de Viboral",
            "El Pe\u00f1ol",
            "El Retiro",
            "El Santuario",
            "Entrerr\u00edos",
            "Envigado",
            "Fredonia",
            "Frontino",
            "Giraldo",
            "Girardota",
            "G\u00f3mez Plata",
            "Granada",
            "Guadalupe",
            "Guarne",
            "Guatap\u00e9",
            "Heliconia",
            "Hispania",
            "Itag\u00fc\u00ed",
            "Ituango",
            "Jard\u00edn",
            "Jeric\u00f3",
            "La Ceja",
            "La Estrella",
            "La Pintada",
            "La Uni\u00f3n",
            "Liborina",
            "Maceo",
            "Marinilla",
            "Medell\u00edn",
            "Montebello",
            "Murind\u00f3",
            "Mutat\u00e1",
            "Nari\u00f1o",
            "Nech\u00ed",
            "Necocl\u00ed",
            "Olaya",
            "Peque",
            "Pueblorrico",
            "Puerto Berr\u00edo",
            "Puerto Nare",
            "Puerto Triunfo",
            "Remedios",
            "Rionegro",
            "Sabanalarga",
            "Sabaneta",
            "Salgar",
            "San Andr\u00e9s de Cuerquia",
            "San Carlos",
            "San Francisco",
            "San Jer\u00f3nimo",
            "San Jos\u00e9 de la Monta\u00f1a",
            "San Juan de Urab\u00e1",
            "San Luis",
            "San Pedro de Urab\u00e1",
            "San Pedro de los Milagros",
            "San Rafael",
            "San Roque",
            "San Vicente",
            "Santa B\u00e1rbara",
            "Santa Fe de Antioquia",
            "Santa Rosa de Osos",
            "Santo Domingo",
            "Segovia",
            "Sons\u00f3n",
            "Sopetr\u00e1n",
            "T\u00e1mesis",
            "Taraz\u00e1",
            "Tarso",
            "Titirib\u00ed",
            "Toledo",
            "Turbo",
            "Uramita",
            "Urrao",
            "Valdivia",
            "Valpara\u00edso",
            "Vegach\u00ed",
            "Venecia",
            "Vig\u00eda del Fuerte",
            "Yal\u00ed",
            "Yarumal",
            "Yolomb\u00f3",
            "Yond\u00f3",
            "Zaragoza"
          ]
        },
        {
          "id": 2,
          "departamento": "Arauca",
          "ciudades": [
            "Arauca",
            "Arauquita",
            "Cravo Norte",
            "Fortul",
            "Puerto Rond\u00f3n",
            "Saravena",
            "Tame"
          ]
        },
        {
          "id": 3,
          "departamento": "Atl\u00e1ntico",
          "ciudades": [
            "Baranoa",
            "Barranquilla",
            "Campo de la Cruz",
            "Candelaria",
            "Galapa",
            "Juan de Acosta",
            "Luruaco",
            "Malambo",
            "Manat\u00ed",
            "Palmar de Varela",
            "Pioj\u00f3",
            "Polonuevo",
            "Ponedera",
            "Puerto Colombia",
            "Repel\u00f3n",
            "Sabanagrande",
            "Sabanalarga",
            "Santa Luc\u00eda",
            "Santo Tom\u00e1s",
            "Soledad",
            "Su\u00e1n",
            "Tubar\u00e1",
            "Usiacur\u00ed"
          ]
        },
        {
          "id": 4,
          "departamento": "Bol\u00edvar",
          "ciudades": [
            "Ach\u00ed",
            "Altos del Rosario",
            "Arenal",
            "Arjona",
            "Arroyohondo",
            "Barranco de Loba",
            "Brazuelo de Papayal",
            "Calamar",
            "Cantagallo",
            "Cartagena de Indias",
            "Cicuco",
            "Clemencia",
            "C\u00f3rdoba",
            "El Carmen de Bol\u00edvar",
            "El Guamo",
            "El Pe\u00f1\u00f3n",
            "Hatillo de Loba",
            "Magangu\u00e9",
            "Mahates",
            "Margarita",
            "Mar\u00eda la Baja",
            "Momp\u00f3s",
            "Montecristo",
            "Morales",
            "Noros\u00ed",
            "Pinillos",
            "Regidor",
            "R\u00edo Viejo",
            "San Crist\u00f3bal",
            "San Estanislao",
            "San Fernando",
            "San Jacinto del Cauca",
            "San Jacinto",
            "San Juan Nepomuceno",
            "San Mart\u00edn de Loba",
            "San Pablo",
            "Santa Catalina",
            "Santa Rosa",
            "Santa Rosa del Sur",
            "Simit\u00ed",
            "Soplaviento",
            "Talaigua Nuevo",
            "Tiquisio",
            "Turbaco",
            "Turban\u00e1",
            "Villanueva",
            "Zambrano"
          ]
        },
        {
          "id": 5,
          "departamento": "Boyac\u00e1",
          "ciudades": [
            "Almeida",
            "Aquitania",
            "Arcabuco",
            "Bel\u00e9n",
            "Berbeo",
            "Bet\u00e9itiva",
            "Boavita",
            "Boyac\u00e1",
            "Brice\u00f1o",
            "Buenavista",
            "Busbanz\u00e1",
            "Caldas",
            "Campohermoso",
            "Cerinza",
            "Chinavita",
            "Chiquinquir\u00e1",
            "Ch\u00edquiza",
            "Chiscas",
            "Chita",
            "Chitaraque",
            "Chivat\u00e1",
            "Chivor",
            "Ci\u00e9nega",
            "C\u00f3mbita",
            "Coper",
            "Corrales",
            "Covarach\u00eda",
            "Cubar\u00e1",
            "Cucaita",
            "Cu\u00edtiva",
            "Duitama",
            "El Cocuy",
            "El Espino",
            "Firavitoba",
            "Floresta",
            "Gachantiv\u00e1",
            "G\u00e1meza",
            "Garagoa",
            "Guacamayas",
            "Guateque",
            "Guayat\u00e1",
            "G\u00fcic\u00e1n",
            "Iza",
            "Jenesano",
            "Jeric\u00f3",
            "La Capilla",
            "La Uvita",
            "La Victoria",
            "Labranzagrande",
            "Macanal",
            "Marip\u00ed",
            "Miraflores",
            "Mongua",
            "Mongu\u00ed",
            "Moniquir\u00e1",
            "Motavita",
            "Muzo",
            "Nobsa",
            "Nuevo Col\u00f3n",
            "Oicat\u00e1",
            "Otanche",
            "Pachavita",
            "P\u00e1ez",
            "Paipa",
            "Pajarito",
            "Panqueba",
            "Pauna",
            "Paya",
            "Paz del R\u00edo",
            "Pesca",
            "Pisba",
            "Puerto Boyac\u00e1",
            "Qu\u00edpama",
            "Ramiriqu\u00ed",
            "R\u00e1quira",
            "Rond\u00f3n",
            "Saboy\u00e1",
            "S\u00e1chica",
            "Samac\u00e1",
            "San Eduardo",
            "San Jos\u00e9 de Pare",
            "San Luis de Gaceno",
            "San Mateo",
            "San Miguel de Sema",
            "San Pablo de Borbur",
            "Santa Mar\u00eda",
            "Santa Rosa de Viterbo",
            "Santa Sof\u00eda",
            "Santana",
            "Sativanorte",
            "Sativasur",
            "Siachoque",
            "Soat\u00e1",
            "Socha",
            "Socot\u00e1",
            "Sogamoso",
            "Somondoco",
            "Sora",
            "Sorac\u00e1",
            "Sotaquir\u00e1",
            "Susac\u00f3n",
            "Sutamarch\u00e1n",
            "Sutatenza",
            "Tasco",
            "Tenza",
            "Tiban\u00e1",
            "Tibasosa",
            "Tinjac\u00e1",
            "Tipacoque",
            "Toca",
            "Tog\u00fc\u00ed",
            "T\u00f3paga",
            "Tota",
            "Tunja",
            "Tunungu\u00e1",
            "Turmequ\u00e9",
            "Tuta",
            "Tutaz\u00e1",
            "\u00dambita",
            "Ventaquemada",
            "Villa de Leyva",
            "Viracach\u00e1",
            "Zetaquira"
          ]
        },
        {
          "id": 6,
          "departamento": "Caldas",
          "ciudades": [
            "Aguadas",
            "Anserma",
            "Aranzazu",
            "Belalc\u00e1zar",
            "Chinchin\u00e1",
            "Filadelfia",
            "La Dorada",
            "La Merced",
            "Manizales",
            "Manzanares",
            "Marmato",
            "Marquetalia",
            "Marulanda",
            "Neira",
            "Norcasia",
            "P\u00e1cora",
            "Palestina",
            "Pensilvania",
            "Riosucio",
            "Risaralda",
            "Salamina",
            "Saman\u00e1",
            "San Jos\u00e9",
            "Sup\u00eda",
            "Victoria",
            "Villamar\u00eda",
            "Viterbo"
          ]
        },
        {
          "id": 7,
          "departamento": "Caquet\u00e1",
          "ciudades": [
            "Albania",
            "Bel\u00e9n de los Andaqu\u00edes",
            "Cartagena del Chair\u00e1",
            "Curillo",
            "El Doncello",
            "El Paujil",
            "Florencia",
            "La Monta\u00f1ita",
            "Mil\u00e1n",
            "Morelia",
            "Puerto Rico",
            "San Jos\u00e9 del Fragua",
            "San Vicente del Cagu\u00e1n",
            "Solano",
            "Solita",
            "Valpara\u00edso"
          ]
        },
        {
          "id": 8,
          "departamento": "Casanare",
          "ciudades": [
            "Aguazul",
            "Ch\u00e1meza",
            "Hato Corozal",
            "La Salina",
            "Man\u00ed",
            "Monterrey",
            "Nunch\u00eda",
            "Orocu\u00e9",
            "Paz de Ariporo",
            "Pore",
            "Recetor",
            "Sabanalarga",
            "S\u00e1cama",
            "San Luis de Palenque",
            "T\u00e1mara",
            "Tauramena",
            "Trinidad",
            "Villanueva",
            "Yopal"
          ]
        },
        {
          "id": 9,
          "departamento": "Cauca",
          "ciudades": [
            "Almaguer",
            "Argelia",
            "Balboa",
            "Bol\u00edvar",
            "Buenos Aires",
            "Cajib\u00edo",
            "Caldono",
            "Caloto",
            "Corinto",
            "El Tambo",
            "Florencia",
            "Guachen\u00e9",
            "Guap\u00ed",
            "Inz\u00e1",
            "Jambal\u00f3",
            "La Sierra",
            "La Vega",
            "L\u00f3pez de Micay",
            "Mercaderes",
            "Miranda",
            "Morales",
            "Padilla",
            "P\u00e1ez",
            "Pat\u00eda",
            "Piamonte",
            "Piendam\u00f3",
            "Popay\u00e1n",
            "Puerto Tejada",
            "Purac\u00e9",
            "Rosas",
            "San Sebasti\u00e1n",
            "Santa Rosa",
            "Santander de Quilichao",
            "Silvia",
            "Sotar\u00e1",
            "Su\u00e1rez",
            "Sucre",
            "Timb\u00edo",
            "Timbiqu\u00ed",
            "Torib\u00edo",
            "Totor\u00f3",
            "Villa Rica"
          ]
        },
        {
          "id": 10,
          "departamento": "Cesar",
          "ciudades": [
            "Aguachica",
            "Agust\u00edn Codazzi",
            "Astrea",
            "Becerril",
            "Bosconia",
            "Chimichagua",
            "Chiriguan\u00e1",
            "Curuman\u00ed",
            "El Copey",
            "El Paso",
            "Gamarra",
            "Gonz\u00e1lez",
            "La Gloria (Cesar)",
            "La Jagua de Ibirico",
            "La Paz",
            "Manaure Balc\u00f3n del Cesar",
            "Pailitas",
            "Pelaya",
            "Pueblo Bello",
            "R\u00edo de Oro",
            "San Alberto",
            "San Diego",
            "San Mart\u00edn",
            "Tamalameque",
            "Valledupar"
          ]
        },
        {
          "id": 11,
          "departamento": "Choc\u00f3",
          "ciudades": [
            "Acand\u00ed",
            "Alto Baud\u00f3",
            "Bagad\u00f3",
            "Bah\u00eda Solano",
            "Bajo Baud\u00f3",
            "Bojay\u00e1",
            "Cant\u00f3n de San Pablo",
            "C\u00e9rtegui",
            "Condoto",
            "El Atrato",
            "El Carmen de Atrato",
            "El Carmen del Dari\u00e9n",
            "Istmina",
            "Jurad\u00f3",
            "Litoral de San Juan",
            "Llor\u00f3",
            "Medio Atrato",
            "Medio Baud\u00f3",
            "Medio San Juan",
            "N\u00f3vita",
            "Nuqu\u00ed",
            "Quibd\u00f3",
            "R\u00edo Ir\u00f3",
            "R\u00edo Quito",
            "Riosucio",
            "San Jos\u00e9 del Palmar",
            "Sip\u00ed",
            "Tad\u00f3",
            "Uni\u00f3n Panamericana",
            "Ungu\u00eda"
          ]
        },
        {
          "id": 12,
          "departamento": "Cundinamarca",
          "ciudades": [
            "Agua de Dios",
            "Alb\u00e1n",
            "Anapoima",
            "Anolaima",
            "Apulo",
            "Arbel\u00e1ez",
            "Beltr\u00e1n",
            "Bituima",
            "Bogot\u00e1",
            "Bojac\u00e1",
            "Cabrera",
            "Cachipay",
            "Cajic\u00e1",
            "Caparrap\u00ed",
            "C\u00e1queza",
            "Carmen de Carupa",
            "Chaguan\u00ed",
            "Ch\u00eda",
            "Chipaque",
            "Choach\u00ed",
            "Chocont\u00e1",
            "Cogua",
            "Cota",
            "Cucunub\u00e1",
            "El Colegio",
            "El Pe\u00f1\u00f3n",
            "El Rosal",
            "Facatativ\u00e1",
            "F\u00f3meque",
            "Fosca",
            "Funza",
            "F\u00faquene",
            "Fusagasug\u00e1",
            "Gachal\u00e1",
            "Gachancip\u00e1",
            "Gachet\u00e1",
            "Gama",
            "Girardot",
            "Granada",
            "Guachet\u00e1",
            "Guaduas",
            "Guasca",
            "Guataqu\u00ed",
            "Guatavita",
            "Guayabal de S\u00edquima",
            "Guayabetal",
            "Guti\u00e9rrez",
            "Jerusal\u00e9n",
            "Jun\u00edn",
            "La Calera",
            "La Mesa",
            "La Palma",
            "La Pe\u00f1a",
            "La Vega",
            "Lenguazaque",
            "Machet\u00e1",
            "Madrid",
            "Manta",
            "Medina",
            "Mosquera",
            "Nari\u00f1o",
            "Nemoc\u00f3n",
            "Nilo",
            "Nimaima",
            "Nocaima",
            "Pacho",
            "Paime",
            "Pandi",
            "Paratebueno",
            "Pasca",
            "Puerto Salgar",
            "Pul\u00ed",
            "Quebradanegra",
            "Quetame",
            "Quipile",
            "Ricaurte",
            "San Antonio del Tequendama",
            "San Bernardo",
            "San Cayetano",
            "San Francisco",
            "San Juan de Rioseco",
            "Sasaima",
            "Sesquil\u00e9",
            "Sibat\u00e9",
            "Silvania",
            "Simijaca",
            "Soacha",
            "Sop\u00f3",
            "Subachoque",
            "Suesca",
            "Supat\u00e1",
            "Susa",
            "Sutatausa",
            "Tabio",
            "Tausa",
            "Tena",
            "Tenjo",
            "Tibacuy",
            "Tibirita",
            "Tocaima",
            "Tocancip\u00e1",
            "Topaip\u00ed",
            "Ubal\u00e1",
            "Ubaque",
            "Ubat\u00e9",
            "Une",
            "\u00datica",
            "Venecia",
            "Vergara",
            "Vian\u00ed",
            "Villag\u00f3mez",
            "Villapinz\u00f3n",
            "Villeta",
            "Viot\u00e1",
            "Yacop\u00ed",
            "Zipac\u00f3n",
            "Zipaquir\u00e1"
          ]
        },
        {
          "id": 13,
          "departamento": "C\u00f3rdoba",
          "ciudades": [
            "Ayapel",
            "Buenavista",
            "Canalete",
            "Ceret\u00e9",
            "Chim\u00e1",
            "Chin\u00fa",
            "Ci\u00e9naga de Oro",
            "Cotorra",
            "La Apartada",
            "Lorica",
            "Los C\u00f3rdobas",
            "Momil",
            "Montel\u00edbano",
            "Monter\u00eda",
            "Mo\u00f1itos",
            "Planeta Rica",
            "Pueblo Nuevo",
            "Puerto Escondido",
            "Puerto Libertador",
            "Pur\u00edsima",
            "Sahag\u00fan",
            "San Andr\u00e9s de Sotavento",
            "San Antero",
            "San Bernardo del Viento",
            "San Carlos",
            "San Jos\u00e9 de Ur\u00e9",
            "San Pelayo",
            "Tierralta",
            "Tuch\u00edn",
            "Valencia"
          ]
        },
        {
          "id": 14,
          "departamento": "Guain\u00eda",
          "ciudades": [
            "In\u00edrida"
          ]
        },
        {
          "id": 15,
          "departamento": "Guaviare",
          "ciudades": [
            "Calamar",
            "El Retorno",
            "Miraflores",
            "San Jos\u00e9 del Guaviare"
          ]
        },
        {
          "id": 16,
          "departamento": "Huila",
          "ciudades": [
            "Acevedo",
            "Agrado",
            "Aipe",
            "Algeciras",
            "Altamira",
            "Baraya",
            "Campoalegre",
            "Colombia",
            "El Pital",
            "El\u00edas",
            "Garz\u00f3n",
            "Gigante",
            "Guadalupe",
            "Hobo",
            "\u00cdquira",
            "Isnos",
            "La Argentina",
            "La Plata",
            "N\u00e1taga",
            "Neiva",
            "Oporapa",
            "Paicol",
            "Palermo",
            "Palestina",
            "Pitalito",
            "Rivera",
            "Saladoblanco",
            "San Agust\u00edn",
            "Santa Mar\u00eda",
            "Suaza",
            "Tarqui",
            "Tello",
            "Teruel",
            "Tesalia",
            "Timan\u00e1",
            "Villavieja",
            "Yaguar\u00e1"
          ]
        },
        {
          "id": 17,
          "departamento": "La Guajira",
          "ciudades": [
            "Albania",
            "Barrancas",
            "Dibulla",
            "Distracci\u00f3n",
            "El Molino",
            "Fonseca",
            "Hatonuevo",
            "La Jagua del Pilar",
            "Maicao",
            "Manaure",
            "Riohacha",
            "San Juan del Cesar",
            "Uribia",
            "Urumita",
            "Villanueva"
          ]
        },
        {
          "id": 18,
          "departamento": "Magdalena",
          "ciudades": [
            "Algarrobo",
            "Aracataca",
            "Ariguan\u00ed",
            "Cerro de San Antonio",
            "Chibolo",
            "Chibolo",
            "Ci\u00e9naga",
            "Concordia",
            "El Banco",
            "El Pi\u00f1\u00f3n",
            "El Ret\u00e9n",
            "Fundaci\u00f3n",
            "Guamal",
            "Nueva Granada",
            "Pedraza",
            "Piji\u00f1o del Carmen",
            "Pivijay",
            "Plato",
            "Pueblo Viejo",
            "Remolino",
            "Sabanas de San \u00c1ngel",
            "Salamina",
            "San Sebasti\u00e1n de Buenavista",
            "San Zen\u00f3n",
            "Santa Ana",
            "Santa B\u00e1rbara de Pinto",
            "Santa Marta",
            "Sitionuevo",
            "Tenerife",
            "Zapay\u00e1n",
            "Zona Bananera"
          ]
        },
        {
          "id": 19,
          "departamento": "Meta",
          "ciudades": [
            "Acac\u00edas",
            "Barranca de Up\u00eda",
            "Cabuyaro",
            "Castilla la Nueva",
            "Cubarral",
            "Cumaral",
            "El Calvario",
            "El Castillo",
            "El Dorado",
            "Fuente de Oro",
            "Granada",
            "Guamal",
            "La Macarena",
            "La Uribe",
            "Lejan\u00edas",
            "Mapirip\u00e1n",
            "Mesetas",
            "Puerto Concordia",
            "Puerto Gait\u00e1n",
            "Puerto Lleras",
            "Puerto L\u00f3pez",
            "Puerto Rico",
            "Restrepo",
            "San Carlos de Guaroa",
            "San Juan de Arama",
            "San Juanito",
            "San Mart\u00edn",
            "Villavicencio",
            "Vista Hermosa"
          ]
        },
        {
          "id": 20,
          "departamento": "Nari\u00f1o",
          "ciudades": [
            "Aldana",
            "Ancuy\u00e1",
            "Arboleda",
            "Barbacoas",
            "Bel\u00e9n",
            "Buesaco",
            "Chachag\u00fc\u00ed",
            "Col\u00f3n",
            "Consac\u00e1",
            "Contadero",
            "C\u00f3rdoba",
            "Cuaspud",
            "Cumbal",
            "Cumbitara",
            "El Charco",
            "El Pe\u00f1ol",
            "El Rosario",
            "El Tabl\u00f3n",
            "El Tambo",
            "Francisco Pizarro",
            "Funes",
            "Guachucal",
            "Guaitarilla",
            "Gualmat\u00e1n",
            "Iles",
            "Imu\u00e9s",
            "Ipiales",
            "La Cruz",
            "La Florida",
            "La Llanada",
            "La Tola",
            "La Uni\u00f3n",
            "Leiva",
            "Linares",
            "Los Andes",
            "Mag\u00fc\u00ed Pay\u00e1n",
            "Mallama",
            "Mosquera",
            "Nari\u00f1o",
            "Olaya Herrera",
            "Ospina",
            "Pasto",
            "Policarpa",
            "Potos\u00ed",
            "Providencia",
            "Puerres",
            "Pupiales",
            "Ricaurte",
            "Roberto Pay\u00e1n",
            "Samaniego",
            "San Bernardo",
            "San Jos\u00e9 de Alb\u00e1n",
            "San Lorenzo",
            "San Pablo",
            "San Pedro de Cartago",
            "Sandon\u00e1",
            "Santa B\u00e1rbara",
            "Santacruz",
            "Sapuyes",
            "Taminango",
            "Tangua",
            "Tumaco",
            "T\u00faquerres",
            "Yacuanquer"
          ]
        },
        {
          "id": 21,
          "departamento": "Norte de Santander",
          "ciudades": [
            "\u00c1brego",
            "Arboledas",
            "Bochalema",
            "Bucarasica",
            "C\u00e1chira",
            "C\u00e1cota",
            "Chin\u00e1cota",
            "Chitag\u00e1",
            "Convenci\u00f3n",
            "C\u00facuta",
            "Cucutilla",
            "Duran\u00eda",
            "El Carmen",
            "El Tarra",
            "El Zulia",
            "Gramalote",
            "Hacar\u00ed",
            "Herr\u00e1n",
            "La Esperanza",
            "La Playa de Bel\u00e9n",
            "Labateca",
            "Los Patios",
            "Lourdes",
            "Mutiscua",
            "Oca\u00f1a",
            "Pamplona",
            "Pamplonita",
            "Puerto Santander",
            "Ragonvalia",
            "Salazar de Las Palmas",
            "San Calixto",
            "San Cayetano",
            "Santiago",
            "Santo Domingo de Silos",
            "Sardinata",
            "Teorama",
            "Tib\u00fa",
            "Toledo",
            "Villa Caro",
            "Villa del Rosario"
          ]
        },
        {
          "id": 22,
          "departamento": "Putumayo",
          "ciudades": [
            "Col\u00f3n",
            "Mocoa",
            "Orito",
            "Puerto As\u00eds",
            "Puerto Caicedo",
            "Puerto Guzm\u00e1n",
            "Puerto Legu\u00edzamo",
            "San Francisco",
            "San Miguel",
            "Santiago",
            "Sibundoy",
            "Valle del Guamuez",
            "Villagarz\u00f3n"
          ]
        },
        {
          "id": 23,
          "departamento": "Quind\u00edo",
          "ciudades": [
            "Armenia",
            "Buenavista",
            "Calarc\u00e1",
            "Circasia",
            "C\u00f3rdoba",
            "Filandia",
            "G\u00e9nova",
            "La Tebaida",
            "Montenegro",
            "Pijao",
            "Quimbaya",
            "Salento"
          ]
        },
        {
          "id": 24,
          "departamento": "Risaralda",
          "ciudades": [
            "Ap\u00eda",
            "Balboa",
            "Bel\u00e9n de Umbr\u00eda",
            "Dosquebradas",
            "Gu\u00e1tica",
            "La Celia",
            "La Virginia",
            "Marsella",
            "Mistrat\u00f3",
            "Pereira",
            "Pueblo Rico",
            "Quinch\u00eda",
            "Santa Rosa de Cabal",
            "Santuario"
          ]
        },
        {
          "id": 25,
          "departamento": "San Andr\u00e9s y Providencia",
          "ciudades": [
            "Providencia y Santa Catalina Islas",
            "San Andr\u00e9s"
          ]
        },
        {
          "id": 26,
          "departamento": "Santander",
          "ciudades": [
            "Aguada",
            "Albania",
            "Aratoca",
            "Barbosa",
            "Barichara",
            "Barrancabermeja",
            "Betulia",
            "Bol\u00edvar",
            "Bucaramanga",
            "Cabrera",
            "California",
            "Capitanejo",
            "Carcas\u00ed",
            "Cepit\u00e1",
            "Cerrito",
            "Charal\u00e1",
            "Charta",
            "Chima",
            "Chipat\u00e1",
            "Cimitarra",
            "Concepci\u00f3n",
            "Confines",
            "Contrataci\u00f3n",
            "Coromoro",
            "Curit\u00ed",
            "El Carmen de Chucur\u00ed",
            "El Guacamayo",
            "El Pe\u00f1\u00f3n",
            "El Play\u00f3n",
            "El Socorro",
            "Encino",
            "Enciso",
            "Flori\u00e1n",
            "Floridablanca",
            "Gal\u00e1n",
            "G\u00e1mbita",
            "Gir\u00f3n",
            "Guaca",
            "Guadalupe",
            "Guapot\u00e1",
            "Guavat\u00e1",
            "G\u00fcepsa",
            "Hato",
            "Jes\u00fas Mar\u00eda",
            "Jord\u00e1n",
            "La Belleza",
            "La Paz",
            "Land\u00e1zuri",
            "Lebrija",
            "Los Santos",
            "Macaravita",
            "M\u00e1laga",
            "Matanza",
            "Mogotes",
            "Molagavita",
            "Ocamonte",
            "Oiba",
            "Onzaga",
            "Palmar",
            "Palmas del Socorro",
            "P\u00e1ramo",
            "Piedecuesta",
            "Pinchote",
            "Puente Nacional",
            "Puerto Parra",
            "Puerto Wilches",
            "Rionegro",
            "Sabana de Torres",
            "San Andr\u00e9s",
            "San Benito",
            "San Gil",
            "San Joaqu\u00edn",
            "San Jos\u00e9 de Miranda",
            "San Miguel",
            "San Vicente de Chucur\u00ed",
            "Santa B\u00e1rbara",
            "Santa Helena del Op\u00f3n",
            "Simacota",
            "Suaita",
            "Sucre",
            "Surat\u00e1",
            "Tona",
            "Valle de San Jos\u00e9",
            "V\u00e9lez",
            "Vetas",
            "Villanueva",
            "Zapatoca"
          ]
        },
        {
          "id": 27,
          "departamento": "Sucre",
          "ciudades": [
            "Buenavista",
            "Caimito",
            "Chal\u00e1n",
            "Colos\u00f3",
            "Corozal",
            "Cove\u00f1as",
            "El Roble",
            "Galeras",
            "Guaranda",
            "La Uni\u00f3n",
            "Los Palmitos",
            "Majagual",
            "Morroa",
            "Ovejas",
            "Sampu\u00e9s",
            "San Antonio de Palmito",
            "San Benito Abad",
            "San Juan de Betulia",
            "San Marcos",
            "San Onofre",
            "San Pedro",
            "Sinc\u00e9",
            "Sincelejo",
            "Sucre",
            "Tol\u00fa",
            "Tol\u00fa Viejo"
          ]
        },
        {
          "id": 28,
          "departamento": "Tolima",
          "ciudades": [
            "Alpujarra",
            "Alvarado",
            "Ambalema",
            "Anzo\u00e1tegui",
            "Armero",
            "Ataco",
            "Cajamarca",
            "Carmen de Apical\u00e1",
            "Casabianca",
            "Chaparral",
            "Coello",
            "Coyaima",
            "Cunday",
            "Dolores",
            "El Espinal",
            "Fal\u00e1n",
            "Flandes",
            "Fresno",
            "Guamo",
            "Herveo",
            "Honda",
            "Ibagu\u00e9",
            "Icononzo",
            "L\u00e9rida",
            "L\u00edbano",
            "Mariquita",
            "Melgar",
            "Murillo",
            "Natagaima",
            "Ortega",
            "Palocabildo",
            "Piedras",
            "Planadas",
            "Prado",
            "Purificaci\u00f3n",
            "Rioblanco",
            "Roncesvalles",
            "Rovira",
            "Salda\u00f1a",
            "San Antonio",
            "San Luis",
            "Santa Isabel",
            "Su\u00e1rez",
            "Valle de San Juan",
            "Venadillo",
            "Villahermosa",
            "Villarrica"
          ]
        },
        {
          "id": 29,
          "departamento": "Valle del Cauca",
          "ciudades": [
            "Alcal\u00e1",
            "Andaluc\u00eda",
            "Ansermanuevo",
            "Argelia",
            "Bol\u00edvar",
            "Buenaventura",
            "Buga",
            "Bugalagrande",
            "Caicedonia",
            "Cali",
            "Calima",
            "Candelaria",
            "Cartago",
            "Dagua",
            "El \u00c1guila",
            "El Cairo",
            "El Cerrito",
            "El Dovio",
            "Florida",
            "Ginebra",
            "Guacar\u00ed",
            "Jamund\u00ed",
            "La Cumbre",
            "La Uni\u00f3n",
            "La Victoria",
            "Obando",
            "Palmira",
            "Pradera",
            "Restrepo",
            "Riofr\u00edo",
            "Roldanillo",
            "San Pedro",
            "Sevilla",
            "Toro",
            "Trujillo",
            "Tulu\u00e1",
            "Ulloa",
            "Versalles",
            "Vijes",
            "Yotoco",
            "Yumbo",
            "Zarzal"
          ]
        },
        {
          "id": 30,
          "departamento": "Vaup\u00e9s",
          "ciudades": [
            "Carur\u00fa",
            "Mit\u00fa",
            "Taraira"
          ]
        },
        {
          "id": 31,
          "departamento": "Vichada",
          "ciudades": [
            "Cumaribo",
            "La Primavera",
            "Puerto Carre\u00f1o",
            "Santa Rosal\u00eda"
          ]
        }
      ];

      $scope.autorefresh = true;

      $http({
        method: 'get',
        url: "php/obtenersession.php"
      }).then(res => {
        $scope.cedula = res.data.cedula
        ausentismoHttp.obtenerjefe(res.data.cedula).then(resAu => {
          if (resAu === "S") {
            document.querySelector('#gestionBoton').removeAttribute('hidden')

            setTimeout(function () {
              $(function () {
                $("#jsGrid").jsGrid({
                  width: "100%",
                  filtering: true,
                  editing: true,
                  paging: true,
                  autoload: true,
                  selecting: true,
                  sorting: true,
                  pageIndex: 1,
                  pageSize: 6,
                  pageButtonCount: 15,
                  pagerFormat: "Paginas: {first} {prev} {pages} {next} {last} {pageIndex} - {pageCount}",
                  pagePrevText: "<",
                  pageNextText: ">",
                  pageFirstText: "<<",
                  pageLastText: ">>",
                  pageNavigatorNextText: "...",
                  pageNavigatorPrevText: "...",
                  loadIndication: true,
                  loadIndicationDelay: 500,
                  loadMessage: "Por Favor Actualizar",
                  loadShading: true,
                  noDataContent: "No hay permisos",

                  controller: {
                    loadData: function (filter) {
                      var d = $.Deferred();
                      if (test == null) {
                        $http({
                          method: 'GET',
                          url: "php/ausentismo/obtenerpermisos.php",
                          params: { emisor: $scope.cedula }
                        }).then(function (response) {
                          if (response.data == "null") {
                            d.resolve();
                            $scope.wa = null;
                          } else {
                            $scope.wa = "";
                            //se aplican los filtros a lo que responde el json
                            var a = response.data.Permisos;//JSON.parse(  '{"Permiso":['+response.data["0"]+']}');
                            var b = response.data.Datos["1"].validajefe;
                            var c = response.data.Datos["0"].jefeobservacion;
                            communication.Jefe = c;
                            if (b == "1") {
                              $scope.hab = false;
                            } else {
                              $scope.hab = true;
                            }
                            test = $.grep(a, function (client) {
                              if (a["0"] == null) {
                                return (a);
                              } else {
                                return (client.Estado.indexOf(filter.Estado) > -1 || !filter.Estado)
                              }
                            });
                            d.resolve(test);
                            $scope.jsoninit = test;
                          }
                        })
                      }
                      else {
                        if ($scope.wa == null) {
                          d.resolve();
                        } else {
                          test = $.grep($scope.jsoninit, function (client) {
                            return (!filter.Radicado || client.Radicado.indexOf(filter.Radicado) > -1)
                              && (!filter.Nombre.toUpperCase() || client.Nombre.indexOf(filter.Nombre.toUpperCase()) > -1)
                              && (!filter.Identificacion || client.Identificacion.indexOf(filter.Identificacion) > -1)
                              && (!filter.TipodePermiso || client.TipodePermiso === filter.TipodePermiso)
                              && (!filter.Departamento || client.Departamento === filter.Departamento)
                              && (!filter.NombreMunicipio.toUpperCase() || client.NombreMunicipio.indexOf(filter.NombreMunicipio.toUpperCase()) > -1)
                              && (!filter.FechaInicio || client.FechaInicio.indexOf(filter.FechaInicio) > -1)
                              && (!filter.FechaFin || client.FechaFin.indexOf(filter.FechaFin) > -1)
                              && (!filter.Adjunto || client.Adjunto.indexOf(filter.Adjunto) > -1)
                              && (!filter.Estado || client.Estado === filter.Estado)
                              && (!filter.Observaciones || client.Observaciones.indexOf(filter.Observaciones) > -1)
                          });
                          d.resolve(test);
                        }
                      }
                      return d.promise();
                    },
                    updateItem: function (item) {
                      var $row = $("#grid").jsGrid("rowByItem", item);
                      var d = $.Deferred();
                      if (item.Municipio == "0") {
                        var mun = 1;
                      }
                      else if (Number(item.Municipio < 10000)) {
                        var mun = item.Municipio.substr(1, 4);
                      } else {
                        var mun = item.Municipio;
                      }
                      var estatus = estado(item.Estado);
                      var permiso = tipopermiso(item.TipodePermiso);
                      if (communication.rr == undefined) {
                        $scope.rr = item.FechaFin;
                      } else {
                        $scope.rr = communication.rr;
                      }
                      if ($scope.rr == undefined) {
                        $scope.rr = item.FechaFin;
                      }
                      if ($scope.rr.length == undefined) {
                        $scope.anofin = $scope.rr.getFullYear(),
                          $scope.mesfin = $scope.rr.getMonth() + 1,
                          $scope.diafin = $scope.rr.getDate(),//Nu
                          $scope.horafin = $scope.rr.getHours(),//N
                          $scope.minutofin = $scope.rr.getMinutes(),
                          $scope.segundofin = $scope.rr.getSeconds(),
                          $scope.fechacompleta = $scope.diafin + '/' + $scope.mesfin + '/' + $scope.anofin + ' ' + $scope.horafin + ':' + $scope.minutofin + ':' + '00'
                        if (communication.observacion == undefined) {
                          $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando ' + $scope.fechacompleta;
                        } else {
                          $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando ' + $scope.fechacompleta + ' - ' + communication.observacion;
                        }
                      }
                      else {
                        $scope.anofin = Number($scope.rr.substr(6, 4));
                        $scope.mesfin = Number($scope.rr.substr(3, 2));
                        $scope.diafin = Number($scope.rr.substr(0, 2));
                        $scope.horafin = Number($scope.rr.substr(11, 2));
                        $scope.minutofin = Number($scope.rr.substr(14, 2));
                        $scope.segundofin = Number($scope.rr.substr(16, 2));
                        if (communication.observacion == undefined) {
                          $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando el ' + item.FechaFin;
                        } else {
                          $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando el ' + item.FechaFin + ' - ' + communication.observacion;
                        }
                      }
                      $http({
                        method: 'GET',
                        url: "php/ausentismo/actualizarpermisos.php",
                        params: { radicado: item.Radicado, ubicacion: mun, autoriza: $scope.cedula, solicitante: item.Identificacion, problema: $scope.descrip.toUpperCase(), estado: item.Estado.toUpperCase(), fechaterminacion: $scope.rr }
                      }).then(
                        function successCallback(response) {
                          d.resolve();
                          if (response.data = "1") {
                            notification.getNotification('success', 'Permiso Actualizado!', 'Notificacion');
                          }
                          else {
                            notification.getNotification('error', "Error al actualizar el permiso", 'Notificacion');
                          }
                        },
                        function errorCallback(response) {
                          notification.getNotification('error', "Error al actualizar el permiso", 'Notificacion');
                        }
                      );
                      communication.observacion = undefined;
                      communication.rr = undefined;
                      $scope.rr = undefined;
                      document.getElementById('test').addEventListener('click', function () {
                        test = null;
                        $("#jsGrid").jsGrid();
                      }, false);
                      return d.promise();
                    }
                  },
                  fields: [
                    { name: "Radicado", title: "#Rad", type: "number", editing: false, align: "center", width: 60 },
                    { name: "Nombre", editing: false, type: "text", align: "center" },
                    { name: "Identificacion", title: "Cedula", type: "number", editing: false, align: "center", width: 70 },
                    { name: "TipodePermiso", title: "Permiso", editing: false, type: "select", items: $scope.crudGrid.tipopermiso, valueField: "Id", textField: "Name" },
                    { name: "Departamento", title: "Seccional", type: "select", editing: false, items: $scope.crudGrid.departamentos, valueField: "Id", textField: "Name", width: 70 },
                    { name: "NombreMunicipio", type: "text", editing: false, align: "center" /*items: $scope.crudGrid.municipios, valueField: "Id", textField: "Name"*/ },
                    { name: "FechaInicio", title: "Comienzo", editing: false, type: "text", align: "center", width: 70 },
                    {
                      name: "FechaFin", title: "Terminacion", editing: true, selecting: true, type: "date", align: "center", width: 130,
                      itemTemplate: function (value, item) {
                        if ($scope.hab == false) {
                          $scope.rr = item.FechaFin;
                          return item.FechaFin
                        } else {
                          var $fecha = $("<p>").text(item.FechaFin).append($("<i>").addClass("icon-stopwatch").css("cursor", "pointer")
                            .on("click", function () {
                              var id = item.Radicado;
                              communication.fecha = item.FechaFin;
                              communication.id = id;
                              ngDialog.open({
                                template: 'views/ausentismo/hora.html',
                                controller: 'horacontroller',
                                controllerAs: 'spctrl',
                                scope: $scope
                              });
                            }));
                          return $("<div>").append($fecha);
                        }
                      }
                    },
                    {
                      name: "Adjunto", filtering: false, selecting: false, editing: false, type: "text", align: "center", width: 60,
                      itemTemplate: function (value, item) {
                        if (item.TipodePermiso == "23") {
                          var $horario = $("<i>").addClass("icon-calendar").css("cursor", "pointer")
                            .on("click", function () {
                              communication.Radicado = item.Radicado;
                              communication.Ubicacion = item.Ubicacion_acas;
                              if (communication.Ubicacion == "0") {
                                communication.Ubicacion = 1;
                              }
                              ngDialog.open({
                                template: 'views/ausentismo/soportes.html',
                                controller: 'soportecontroller',
                                controllerAs: 'spctrl',
                                scope: $scope
                              });
                              return item.Radicado;
                            });
                          return $("<div>").append($horario);
                        } else if (item.TipodePermiso == "21" || item.TipodePermiso == "22") {
                          var $adjunto = $("<a>").text("ver").css("cursor", "pointer")
                            .on("click", function () {
                              communication.Radicado = item.Radicado;
                              communication.Ubicacion = item.Ubicacion_acas;
                              if (communication.Ubicacion == "0") {
                                communication.Ubicacion = 1;
                              }
                              ngDialog.open({
                                template: 'views/ausentismo/soportes.html',
                                controller: 'soportecontroller',
                                controllerAs: 'spctrl',
                                scope: $scope
                              });
                              return item.Radicado;
                            });
                          return $("<div>").append($adjunto);
                        } else {
                          return $("<a>").text("ver").css({ "cursor": "not-allowed", "color": "gray" });
                        }
                      }
                    },
                    { name: "Estado", type: "select", editing: true, items: $scope.crudGrid.estado, valueField: "Id", textField: "Name" },
                    {
                      name: "Observaciones", title: "Notas", filtering: false, editing: false, type: "text", align: "center", width: 50,
                      itemTemplate: function (value, item) {
                        var $observacion = $("<i>").addClass("icon-doc-text-inv").css("cursor", "pointer")
                          .on("click", function () {
                            communication.Radicado = item.Radicado;
                            communication.Ubicacion = item.Municipio;
                            if (communication.Ubicacion == "0") {
                              communication.Ubicacion = 1;
                            }
                            ngDialog.open({
                              template: 'views/ausentismo/observaciones.html',
                              controller: 'observacionescontroller',
                              controllerAs: 'spctrl',
                              scope: $scope
                            });
                            return item.Observaciones;
                          });
                        return $("<div>").append($observacion);
                      }
                    },
                    { type: "control", editButton: true, deleteButton: false }
                  ]
                });
              });
            }, 1500);
          }
        })
      }, err => {

      })

      $scope.vistas = null;
      $scope.subtitulo = '';
      $scope.tipoPersonal = '';
      $scope.tiposPersonal = [];
      $scope.subtipo = "";
      $scope.tiposPermiso = null;
      $scope.listaDiagnosticos = null;
      $scope.sinResultados = false;
      $scope.sinResultadosLugar = false;
      $scope.submotivoDeshabilitado = null;
      $scope.subtipoDeshabilitado = null;

      $scope.subtiposLaboral = null;

      $scope.fechainicio = null;

      $scope.lugares = null;
      $scope.lugar = null;

      $scope.chequearE = event => {
        if (event.keyCode === 69 || event.keyCode === 189 || event.keyCode === 109 || event.keyCode === 107 || event.keyCode === 188 || event.keyCode === 190 || event.keyCode === 110) event.preventDefault();
      }

      $scope.limpiarFormularioIncapacidad = function () {
        $scope.diagnosticoSeleccionado = null;
      }

      $scope.limpiarFormularioLaboral = function () {
        $scope.submotivoDeshabilitado = false;
        $scope.lugar = null;

      }

      $scope.limpiarFormularioPersonal = function () {
        $scope.subtipos = null;
      }

      $scope.limpiarFormularios = function () {
        $scope.limpiarFormularioIncapacidad();
        $scope.limpiarFormularioLaboral();
        $scope.limpiarFormularioPersonal();
      }

      $scope.inicializarFormularioLaboral = function () {
        $scope.tipol = null;
      }

      $scope.cargarSubtiposLaboral = function (idTipo) {
        ausentismoHttp.obtenerSubtipos(idTipo).then($scope.verSubtiposPersonal);
      }

      $scope.verSubtiposPersonal = function (response) {
        $scope.subtiposLaboral = response.data;
      }

      $scope.mostrarPermisos = (response) => {
        $scope.listaPermisos = response;
      }

      $scope.validarFechaInicioIncapacidad = () => {
        document.querySelector('#fechaInicioInput').checkValidity();
      }

      $scope.cambiarVista = function (vista = null) {
        $scope.vistas = vista;
        switch (vista) {
          case 1:
            $scope.subtitulo = 'POR INCAPACIDAD';
            $scope.loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js").then(() => {
              document.querySelector('#fechaInicioInput').setAttribute('max', moment().format('YYYY-MM-DD'));
              document.querySelector('#fechaInicioInput').setAttribute('min', moment().subtract(3, 'days').format('YYYY-MM-DD'));
            });
            ausentismoHttp.obtenerTipos($scope.obtenerIdPorNombre("INCAPACIDAD")).then($scope.verTiposIncapacidad);
            break;
          case 2:
            $scope.subtitulo = ' LABORAL';
            $scope.loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js").then(() => {
              const fechaInicioPermisoLaboralInput = document.querySelector('#fechaInicioPermisoLaboral');
              fechaInicioPermisoLaboralInput.setAttribute('min', moment().format('YYYY-MM-DD'));
              // fechaInicioPermisoLaboralInput.setAttribute('min', moment().subtract(5, 'days').format('YYYY-MM-DD'));

              fechaInicioPermisoLaboralInput.addEventListener('change', () => {
                const fechaFinPermisoLaboralInput = document.querySelector('#fechaFinPermisoLaboral');
                if (fechaInicioPermisoLaboralInput.value === "") {
                  fechaFinPermisoLaboralInput.value = "";
                }
                fechaFinPermisoLaboralInput.setAttribute('min', fechaInicioPermisoLaboralInput.value);
              });
            });

            setTimeout(() => {
              $('.timepicker').timepicker({
                timeFormat: 'h:mm p',
                interval: 30,
                minTime: '07',
                maxTime: '18:00',
                defaultTime: '07',
                startTime: '07:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
              });
            }, 0)

            ausentismoHttp.obtenerTipos($scope.obtenerIdPorNombre("LABORAL")).then($scope.verTipoPermiso);
            $scope.inicializarFormularioLaboral();
            break;
          case 3:
            $scope.subtitulo = ' PERSONAL';
            $scope.loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js").then(() => {
              const fechaInicioPermisoPersonalInput = document.querySelector('#fechaInicioPermisoPersonal')

              fechaInicioPermisoPersonalInput.setAttribute('min', moment().format('YYYY-MM-DD'));
            })

            setTimeout(() => {
              $('.timepicker').timepicker({
                timeFormat: 'h:mm p',
                interval: 30,
                minTime: '07',
                maxTime: '18:00',
                defaultTime: '07',
                startTime: '07:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
              });
            }, 0)

            ausentismoHttp.obtenerTipos($scope.obtenerIdPorNombre("PERSONAL")).then($scope.verTipoPermisop);
            break;
          case 4:
            $scope.subtitulo = ' HISTORICO DE PERMISOS';
            // ausentismoHttp.obtenerPermisos().then($scope.mostrarPermisos);
            ausentismoHttp.obtenerHistorico($scope.cedula).then(res => {
              console.log(res)
              $scope.mostrarPermisos(res)
            })
            break;
          case 5:
            setTimeout(() => {
              document.getElementById('test').addEventListener('click', function () {
                $(function () {
                  $("#jsGrid").jsGrid({
                    width: "100%",
                    filtering: true,
                    editing: true,
                    paging: true,
                    autoload: true,
                    selecting: true,
                    sorting: true,
                    pageIndex: 1,
                    pageSize: 6,
                    pageButtonCount: 15,
                    pagerFormat: "Paginas: {first} {prev} {pages} {next} {last} {pageIndex} - {pageCount}",
                    pagePrevText: "<",
                    pageNextText: ">",
                    pageFirstText: "<<",
                    pageLastText: ">>",
                    pageNavigatorNextText: "...",
                    pageNavigatorPrevText: "...",
                    loadIndication: true,
                    loadIndicationDelay: 500,
                    loadMessage: "Por Favor Actualizar",
                    loadShading: true,
                    noDataContent: "No hay permisos",

                    controller: {
                      loadData: function (filter) {
                        var d = $.Deferred();
                        if (test == null) {
                          $http({
                            method: 'GET',
                            url: "php/ausentismo/obtenerpermisos.php",
                            params: { emisor: $scope.cedula }
                          }).then(function (response) {
                            if (response.data == "null") {
                              d.resolve();
                              $scope.wa = null;
                            } else {
                              $scope.wa = "";
                              //se aplican los filtros a lo que responde el json
                              var a = response.data.Permisos;//JSON.parse(  '{"Permiso":['+response.data["0"]+']}');
                              var b = response.data.Datos["1"].validajefe;
                              var c = response.data.Datos["0"].jefeobservacion;
                              communication.Jefe = c;
                              if (b == "1") {
                                $scope.hab = false;
                              } else {
                                $scope.hab = true;
                              }
                              test = $.grep(a, function (client) {
                                if (a["0"] == null) {
                                  return (a);
                                } else {
                                  return (client.Estado.indexOf(filter.Estado) > -1 || !filter.Estado)
                                }
                              });
                              d.resolve(test);
                              $scope.jsoninit = test;
                            }
                          })
                        }
                        else {
                          if ($scope.wa == null) {
                            d.resolve();
                          } else {
                            test = $.grep($scope.jsoninit, function (client) {
                              return (!filter.Radicado || client.Radicado.indexOf(filter.Radicado) > -1)
                                && (!filter.Nombre.toUpperCase() || client.Nombre.indexOf(filter.Nombre.toUpperCase()) > -1)
                                && (!filter.Identificacion || client.Identificacion.indexOf(filter.Identificacion) > -1)
                                && (!filter.TipodePermiso || client.TipodePermiso === filter.TipodePermiso)
                                && (!filter.Departamento || client.Departamento === filter.Departamento)
                                && (!filter.NombreMunicipio.toUpperCase() || client.NombreMunicipio.indexOf(filter.NombreMunicipio.toUpperCase()) > -1)
                                && (!filter.FechaInicio || client.FechaInicio.indexOf(filter.FechaInicio) > -1)
                                && (!filter.FechaFin || client.FechaFin.indexOf(filter.FechaFin) > -1)
                                && (!filter.Adjunto || client.Adjunto.indexOf(filter.Adjunto) > -1)
                                && (!filter.Estado || client.Estado === filter.Estado)
                                && (!filter.Observaciones || client.Observaciones.indexOf(filter.Observaciones) > -1)
                            });
                            d.resolve(test);
                          }
                        }
                        return d.promise();
                      },
                      updateItem: function (item) {
                        var $row = $("#grid").jsGrid("rowByItem", item);
                        var d = $.Deferred();
                        if (item.Municipio == "0") {
                          var mun = 1;
                        }
                        else if (Number(item.Municipio < 10000)) {
                          var mun = item.Municipio.substr(1, 4);
                        } else {
                          var mun = item.Municipio;
                        }
                        var estatus = estado(item.Estado);
                        var permiso = tipopermiso(item.TipodePermiso);
                        if (communication.rr == undefined) {
                          $scope.rr = item.FechaFin;
                        } else {
                          $scope.rr = communication.rr;
                        }
                        if ($scope.rr == undefined) {
                          $scope.rr = item.FechaFin;
                        }
                        if ($scope.rr.length == undefined) {
                          $scope.anofin = $scope.rr.getFullYear(),
                            $scope.mesfin = $scope.rr.getMonth() + 1,
                            $scope.diafin = $scope.rr.getDate(),//Nu
                            $scope.horafin = $scope.rr.getHours(),//N
                            $scope.minutofin = $scope.rr.getMinutes(),
                            $scope.segundofin = $scope.rr.getSeconds(),
                            $scope.fechacompleta = $scope.diafin + '/' + $scope.mesfin + '/' + $scope.anofin + ' ' + $scope.horafin + ':' + $scope.minutofin + ':' + '00'
                          if (communication.observacion == undefined) {
                            $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando ' + $scope.fechacompleta;
                          } else {
                            $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando ' + $scope.fechacompleta + ' - ' + communication.observacion;
                          }
                        }
                        else {
                          $scope.anofin = Number($scope.rr.substr(6, 4));
                          $scope.mesfin = Number($scope.rr.substr(3, 2));
                          $scope.diafin = Number($scope.rr.substr(0, 2));
                          $scope.horafin = Number($scope.rr.substr(11, 2));
                          $scope.minutofin = Number($scope.rr.substr(14, 2));
                          $scope.segundofin = Number($scope.rr.substr(16, 2));
                          if (communication.observacion == undefined) {
                            $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando el ' + item.FechaFin;
                          } else {
                            $scope.descrip = ' ' + permiso + ' - ' + estatus + ' finalizando el ' + item.FechaFin + ' - ' + communication.observacion;
                          }
                        }
                        $http({
                          method: 'GET',
                          url: "php/ausentismo/actualizarpermisos.php",
                          params: { radicado: item.Radicado, ubicacion: mun, autoriza: $scope.cedula, solicitante: item.Identificacion, problema: $scope.descrip.toUpperCase(), estado: item.Estado.toUpperCase(), fechaterminacion: $scope.rr }
                        }).then(
                          function successCallback(response) {
                            d.resolve();
                            if (response.data = "1") {
                              notification.getNotification('success', 'Permiso Actualizado!', 'Notificacion');
                            }
                            else {
                              notification.getNotification('error', "Error al actualizar el permiso", 'Notificacion');
                            }
                          },
                          function errorCallback(response) {
                            notification.getNotification('error', "Error al actualizar el permiso", 'Notificacion');
                          }
                        );
                        communication.observacion = undefined;
                        communication.rr = undefined;
                        $scope.rr = undefined;
                        document.getElementById('test').addEventListener('click', function () {
                          test = null;
                          $("#jsGrid").jsGrid();
                        }, false);
                        return d.promise();
                      }
                    },
                    fields: [
                      { name: "Radicado", title: "#Rad", type: "number", editing: false, align: "center", width: 60 },
                      { name: "Nombre", editing: false, type: "text", align: "center" },
                      { name: "Identificacion", title: "Cedula", type: "number", editing: false, align: "center", width: 70 },
                      { name: "TipodePermiso", title: "Permiso", editing: false, type: "select", items: $scope.crudGrid.tipopermiso, valueField: "Id", textField: "Name" },
                      { name: "Departamento", title: "Seccional", type: "select", editing: false, items: $scope.crudGrid.departamentos, valueField: "Id", textField: "Name", width: 70 },
                      { name: "NombreMunicipio", type: "text", editing: false, align: "center" /*items: $scope.crudGrid.municipios, valueField: "Id", textField: "Name"*/ },
                      { name: "FechaInicio", title: "Comienzo", editing: false, type: "text", align: "center", width: 70 },
                      {
                        name: "FechaFin", title: "Terminacion", editing: true, selecting: true, type: "date", align: "center", width: 130,
                        itemTemplate: function (value, item) {
                          if ($scope.hab == false) {
                            $scope.rr = item.FechaFin;
                            return item.FechaFin
                          } else {
                            var $fecha = $("<p>").text(item.FechaFin).append($("<i>").addClass("icon-stopwatch").css("cursor", "pointer")
                              .on("click", function () {
                                var id = item.Radicado;
                                communication.fecha = item.FechaFin;
                                communication.id = id;
                                ngDialog.open({
                                  template: 'views/ausentismo/hora.html',
                                  controller: 'horacontroller',
                                  controllerAs: 'spctrl',
                                  scope: $scope
                                });
                              }));
                            return $("<div>").append($fecha);
                          }
                        }
                      },
                      {
                        name: "Adjunto", filtering: false, selecting: false, editing: false, type: "text", align: "center", width: 60,
                        itemTemplate: function (value, item) {
                          if (item.TipodePermiso == "23") {
                            var $horario = $("<i>").addClass("icon-calendar").css("cursor", "pointer")
                              .on("click", function () {
                                communication.Radicado = item.Radicado;
                                communication.Ubicacion = item.Ubicacion_acas;
                                if (communication.Ubicacion == "0") {
                                  communication.Ubicacion = 1;
                                }
                                ngDialog.open({
                                  template: 'views/ausentismo/soportes.html',
                                  controller: 'soportecontroller',
                                  controllerAs: 'spctrl',
                                  scope: $scope
                                });
                                return item.Radicado;
                              });
                            return $("<div>").append($horario);
                          } else if (item.TipodePermiso == "21" || item.TipodePermiso == "22") {
                            var $adjunto = $("<a>").text("ver").css("cursor", "pointer")
                              .on("click", function () {
                                communication.Radicado = item.Radicado;
                                communication.Ubicacion = item.Ubicacion_acas;
                                if (communication.Ubicacion == "0") {
                                  communication.Ubicacion = 1;
                                }
                                ngDialog.open({
                                  template: 'views/ausentismo/soportes.html',
                                  controller: 'soportecontroller',
                                  controllerAs: 'spctrl',
                                  scope: $scope
                                });
                                return item.Radicado;
                              });
                            return $("<div>").append($adjunto);
                          } else {
                            return $("<a>").text("ver").css({ "cursor": "not-allowed", "color": "gray" });
                          }
                        }
                      },
                      { name: "Estado", type: "select", editing: true, items: $scope.crudGrid.estado, valueField: "Id", textField: "Name" },
                      {
                        name: "Observaciones", title: "Notas", filtering: false, editing: false, type: "text", align: "center", width: 50,
                        itemTemplate: function (value, item) {
                          var $observacion = $("<i>").addClass("icon-doc-text-inv").css("cursor", "pointer")
                            .on("click", function () {
                              communication.Radicado = item.Radicado;
                              communication.Ubicacion = item.Municipio;
                              if (communication.Ubicacion == "0") {
                                communication.Ubicacion = 1;
                              }
                              ngDialog.open({
                                template: 'views/ausentismo/observaciones.html',
                                controller: 'observacionescontroller',
                                controllerAs: 'spctrl',
                                scope: $scope
                              });
                              return item.Observaciones;
                            });
                          return $("<div>").append($observacion);
                        }
                      },
                      { type: "control", editButton: true, deleteButton: false }
                    ]
                  });
                });
              }, false);
            }, 1000)
            break;

          default:
            $scope.subtitulo = '';
            $scope.historico = true;
            $scope.limpiarFormularios();
            break;
        }
      }

      $scope.abrirModal = function () {
        $('#modalDiagnostico').modal('open');
        document.querySelector('#diagnosticoSelectModal').focus();

        document.querySelector('.modal-overlay').addEventListener('click', () => {
          $scope.diagnostico = null;
          $scope.listaDiagnosticos = null;
          $scope.sinResultados = false;
        });
      }

      $scope.abrirModal2 = function () {
        $('#modalLugares').modal('open');
        document.querySelector('#lugarModalInput').focus();

        document.querySelector('.modal-overlay').addEventListener('click', () => {
          $scope.lugares = null;
          $scope.listaLugares = null;
          $scope.sinResultados = false;
        });
      }

      $scope.diagnosticoSeleccionado = null;

      $scope.seleccionarDiagnostico = function (diagnostico) {
        $scope.diagnosticoSeleccionado = diagnostico;
        $scope.cerrarModal();
      }

      $scope.seleccionarLugares = function (lugar) {
        $scope.lugar = lugar;
        $scope.cerrarModal2();
      }

      $scope.cerrarModal = function () {
        $('#modalDiagnostico').modal('close');
        $scope.diagnostico = null;
        $scope.listaDiagnosticos = null;
        $scope.sinResultados = false;
      }

      $scope.cerrarModal2 = function () {
        $('#modalLugares').modal('close');
        $scope.lugares = null;
        $scope.listaLugares = null;
        $scope.sinResultados = false;
      }

      $scope.buscarDiagnostico = function (consulta) {
        $scope.listaDiagnosticos = null;
        ausentismoHttp.obtenerDiagnostico(consulta).then(response => {
          if (response.data[0].codigo === "0") {
            $scope.sinResultados = true;
          } else {
            $scope.listaDiagnosticos = response.data;
            $scope.sinResultados = false;
          }
        });
      }


      $scope.buscarLugares = function (consulta) {
        $scope.listaLugares = null;
        ausentismoHttp.obtenerLugares(consulta).then(response => {
          if (response.data[0].codigo === "0") {
            $scope.sinResultadosLugar = true;
          } else {
            $scope.listaLugares = response.data;
            $scope.sinResultadosLugar = false;
          }
        });
      }

      $scope.obtenerIdPorNombre = function (nombre) {
        if ($scope.tiposPermiso === null) {
          return null;
        } else {
          let id = null;
          $scope.tiposPermiso.forEach(tipo => {
            if (tipo.nombre === nombre) {
              id = tipo.id;
            }
          });
          return id;
        }
      }

      $scope.generarIncapacidad = () => {
        if (document.querySelector('#motivoSelect').value === "") {
          swal("", "Debe seleccionar un tipo de incapacidad", "error");
          return;
        }
        if ($scope.diagnosticoSeleccionado === null) {
          swal("", "Debe seleccionar un diagnostico de la incapacidad", "error");
          return;
        }
        if (document.querySelector('#fechaInicioInput').value === "") {
          swal("", "Debe de ingresar la fecha de inicio de la incapacidad", "error");
          return;
        }

        if (document.querySelector('#diasIncapacidad').value === "") {
          swal("", "Debe de ingresar la cantidad de dias de la incapacidad", "error");
          return;
        } else {
          const diasIncapacidad = parseInt(document.querySelector('#diasIncapacidad').value)

          if (diasIncapacidad > 99) {
            swal("", "La cantidad de dias ingresados sobrepasa el maximo disponible. (99 días)", "error")
            return;
          }
        }

        if (document.querySelector('#observacionIncapacidadTextarea').value === "" || document.querySelector('#observacionIncapacidadTextarea').value.length < 40) {
          swal("", "La observación no puede estar vacia y deb contener minimo 40 caracteres", "error");
          return;
        }

        if (document.querySelector('#anexo2adj').files.length === 0) {
          swal("", "Debe de ingresar un adjunto", "error");
          return;
        }

        const fechaInicioTokens = document.querySelector('#fechaInicioInput').value.split('-');
        // ausentismoHttp.generarPermiso({
        //   'v_pubicacion': sessionStorage.getItem('municipio') !== null ? sessionStorage.getItem('municipio') : '1',
        //   'v_pproblema': document.querySelector('#observacionIncapacidadTextarea').value,
        //   'v_pmotivo': document.querySelector('#motivoSelect').value,
        //   'v_psubmotivo': '',
        //   'v_pemisor': sessionStorage.getItem('cedula'),
        //   'v_pfechainicio': fechaInicioTokens[2] + '-' + fechaInicioTokens[1] + '-' + fechaInicioTokens[0],
        //   'v_pfechaterminacion': '',
        //   'v_pnombrearchivo': '',
        //   'v_pruta': '',
        //   'v_pdiagnostico': $scope.diagnosticoSeleccionado.codigo,
        //   'v_pdias_inc': document.querySelector('#diasIncapacidad').value,
        //   'v_pseccional': '',
        //   'v_poficina': ''
        // }).then(response => {
        //   if (response.code === 200) {
        //     swal("", "Su solicitud ha sido generada exitosamente", "success");
        //     $scope.cambiarVista();
        //   }
        // })

        const adjunto = new FormData()

        adjunto.append('archivo', document.querySelector('#anexo2adj').files[0])

        ausentismoHttp.subirArchivo(
          adjunto
        ).then(response => {
          console.log(response)
          ausentismoHttp.insertarpermiso(
            sessionStorage.getItem('municipio') !== null ? sessionStorage.getItem('municipio') : '1',
            document.querySelector('#observacionIncapacidadTextarea').value,
            document.querySelector('#motivoSelect').value,
            sessionStorage.getItem('cedula'),
            fechaInicioTokens[2] + '-' + fechaInicioTokens[1] + '-' + fechaInicioTokens[0],
            '',
            response.nombre,
            response.ruta,
            // 'v_pdiagnostico': $scope.diagnosticoSeleccionado.codigo,
            // 'v_pdias_inc': document.querySelector('#diasIncapacidad').value,
            // 'v_pseccional': '',
            // 'v_poficina': ''
          ).then(response => {
            if (response[0]) {
              if (response[0].Respuesta === "2-Debe confirmar un jefe") {
                swal({
                  title: "No se pudo generar",
                  text: "No tiene un jefe inmediato asociado",
                  type: "warning",
                  confirmButtonText: "Asociar jefe",
                  showCancelButton: true,
                  cancelButtonText: "Cancelar solicitud"
                }).then(result => {
                  $('#modalJefe').modal('open');
                  $http({
                    method: 'POST',
                    url: "php/ausentismo/obtenerjefes.php",
                    data: { function: 'obtenerjefes' }
                  }).then(function (response) {
                    $scope.jefes = response.data;
                  })
                })
                  .catch(err => {
                    if (err === "cancel") {
                      $scope.cambiarVista();
                      $scope.$apply();
                    }
                  })
              } else if (response[0].Respuesta.includes("1-Solicitud generada con exito!")) {
                swal("Generacion correcta", "Su solicitud ha sido generada exitosamente", 'success')
                $scope.cambiarVista();
                // $scope.$apply();
              }
            }
          })
        })
      }

      $scope.generarPermisoLaboral = () => {
        if (document.querySelector('#motivoPermisoLaboralSelect').value === "") {
          swal("", "Debe de seleccionar un tipo de permiso laboral", "error");
          return;
        }
        if (document.querySelector('#motivoPermisoLaboralSelect').value === "0" && (document.querySelector('#submotivoPermisoLaboralSelect').value === "" || typeof (document.querySelector('#submotivoPermisoLaboralSelect').value) === "undefined")) {
          swal("", "Debe de seleccionar un submotivo", "error");
          return;
        } else {
          if (document.querySelector('#motivoPermisoLaboralSelect').value === "0" && document.querySelector('#submotivoPermisoLaboralSelect').value !== "" && $scope.lugar === null) {
            swal("", "Debe de ingresar el lugar de traslado", "error");
            return;
          }
        }

        if (document.querySelector('#fechaInicioPermisoLaboral').value === "") {
          swal("", "Debe de ingresar la fecha de inicio del permiso", "error");
          return;
        }

        if (document.querySelector('#fechaFinPermisoLaboral').value === "") {
          swal("", "Debe de ingresar la fecha de finalización del permiso", "error");
          return;
        } else {
          const fechaInicio = new Date(document.querySelector('#fechaInicioPermisoLaboral').value) / 1;
          const fechaFin = new Date(document.querySelector('#fechaFinPermisoLaboral').value) / 1;

          if (fechaFin < fechaInicio) {
            swal("", "La fecha de finalización debe de ser mayor a la de inicio", "error");
            return;
          }
        }

        if (document.querySelector('#observacionLaboralTextarea').value === '' || document.querySelector('#observacionLaboralTextarea').value.length < 40) {
          swal("", "La observación no puede estar vacia y debe tener minimo 40 caracteres", "error");
          return;
        }

        const fechaInicioTokens = document.querySelector('#fechaInicioPermisoLaboral').value.split('-');
        const fechaFinTokens = document.querySelector('#fechaFinPermisoLaboral').value.split('-');

        ausentismoHttp.insertarpermiso(
          sessionStorage.getItem('municipio') !== null ? sessionStorage.getItem('municipio') : '1',
          document.querySelector('#observacionLaboralTextarea').value,
          document.querySelector('#motivoPermisoLaboralSelect').value,
          sessionStorage.getItem('cedula'),
          fechaInicioTokens[2] + '-' + fechaInicioTokens[1] + '-' + fechaInicioTokens[0],
          '',
          '',
          '',
          // 'v_pdiagnostico': $scope.diagnosticoSeleccionado.codigo,
          // 'v_pdias_inc': document.querySelector('#diasIncapacidad').value,
          // 'v_pseccional': '',
          // 'v_poficina': ''
        ).then(response => {
          console.log(response)
          if (response[0]) {
            if (response[0].Respuesta === "2-Debe confirmar un jefe") {
              swal({
                title: "No se pudo generar",
                text: "No tiene un jefe inmediato asociado",
                type: "warning",
                confirmButtonText: "Asociar jefe",
                showCancelButton: true,
                cancelButtonText: "Cancelar solicitud"
              }).then(result => {
                console.log(result)
                $('#modalJefe').modal('open');
                $http({
                  method: 'POST',
                  url: "php/ausentismo/obtenerjefes.php",
                  data: { function: 'obtenerjefes' }
                }).then(function (response) {
                  $scope.jefes = response.data;
                })
              })
                .catch(err => {
                  console.log(err)
                  if (err === "cancel") {
                    $scope.cambiarVista();
                    $scope.$apply();
                  }
                })
            } else if (response[0].Respuesta.includes("1-Solicitud generada con exito!")) {
              swal("Generacion correcta", response[0].Respuesta, 'success')
              $scope.cambiarVista();
              $scope.$apply();
            }
          }
          // if (response.code === 200) {
          //   swal("", "Su solicitud ha sido generada exitosamente", "success");
          //   $scope.cambiarVista();
          // }
        })

        // ausentismoHttp.generarPermiso({
        //   'v_pubicacion': sessionStorage.getItem('municipio') !== null ? sessionStorage.getItem('municipio') : '1',
        //   'v_pproblema': document.querySelector('#observacionLaboralTextarea').value,
        //   'v_pmotivo': document.querySelector('#motivoPermisoLaboralSelect').value,
        //   'v_psubmotivo': '',
        //   'v_pemisor': sessionStorage.getItem('cedula'),
        //   'v_pfechainicio': fechaInicioTokens[2] + '-' + fechaInicioTokens[1] + '-' + fechaInicioTokens[0],
        //   'v_pfechaterminacion': fechaFinTokens[2] + '-' + fechaFinTokens[1] + '-' + fechaFinTokens[0],
        //   'v_pnombrearchivo': '',
        //   'v_pruta': '',
        //   'v_pdiagnostico': '',
        //   'v_pdias_inc': '',
        //   'v_pseccional': $scope.lugar.seccional,
        //   'v_poficina': $scope.lugar.codigo
        // }).then(response => {
        //   if (response.code === 200) {
        //     swal("", "Su solicitud ha sido generada exitosamente", "success");
        //     $scope.cambiarVista();
        //   }
        // })
      }

      $scope.generarPermisoPersonal = () => {
        if (document.querySelector('#tipoPermisoPersonalSelect').value === '') {
          swal("", "Debe ingresar un tipo de permiso personal", "error");
          return;
        }

        if ((document.querySelector('#tipoPermisoPersonalSelect').value === '30' || document.querySelector('#tipoPermisoPersonalSelect').value === '25') && document.querySelector('#subtipoPermisoPersonalSelect').value === '') {
          swal("", "Debe ingresar un subtipo de permiso personal", "error");
          return;
        }

        if (document.querySelector('#fechaInicioPermisoPersonal').value === '') {
          swal("", "Debe ingresar la fecha de inicio del permiso", "error");
          return;
        }

        if (document.querySelector('#observacionPersonalTextarea').value === '' || document.querySelector('#observacionPersonalTextarea').value.length < 40) {
          swal("", "La observación no puede estar vacia y debe tener minimo 40 caracteres", "error");
          return;
        }

        if (document.querySelector('#fechaFinPermisoPersonal').value === '') {
          swal("", "Debe ingresar la fecha de finalización del permiso", "error");
          return;
        } else {
          const fechaInicioPermisoPersonal = new Date(document.querySelector('#fechaInicioPermisoPersonal').value) / 1;
          const fechaFinPermisoPersonal = new Date(document.querySelector('#fechaFinPermisoPersonal').value) / 1;

          if (fechaFinPermisoPersonal < fechaInicioPermisoPersonal) {
            swal("", "Debe ingresar una fecha de finalización mayor a la de inicio", "error");
            return;
          }
        }

        const fechaInicioTokens = document.querySelector('#fechaInicioPermisoPersonal').value.split('-');
        const fechaFinTokens = document.querySelector('#fechaFinPermisoPersonal').value.split('-');

         ausentismoHttp.insertarpermiso(
          sessionStorage.getItem('municipio') !== null ? sessionStorage.getItem('municipio') : '1',
          document.querySelector('#observacionPersonalTextarea').value,
          document.querySelector('#tipoPermisoPersonalSelect').value,
          sessionStorage.getItem('cedula'),
          fechaInicioTokens[2] + '-' + fechaInicioTokens[1] + '-' + fechaInicioTokens[0],
          '',
          '',
          '',
          // 'v_pdiagnostico': $scope.diagnosticoSeleccionado.codigo,
          // 'v_pdias_inc': document.querySelector('#diasIncapacidad').value,
          // 'v_pseccional': '',
          // 'v_poficina': ''
        ).then(response => {
          console.log(response)
          if (response[0]) {
            if (response[0].Respuesta === "2-Debe confirmar un jefe") {
              swal({
                title: "No se pudo generar",
                text: "No tiene un jefe inmediato asociado",
                type: "warning",
                confirmButtonText: "Asociar jefe",
                showCancelButton: true,
                cancelButtonText: "Cancelar solicitud"
              }).then(result => {
                console.log(result)
                $('#modalJefe').modal('open');
                $http({
                  method: 'POST',
                  url: "php/ausentismo/obtenerjefes.php",
                  data: { function: 'obtenerjefes' }
                }).then(function (response) {
                  $scope.jefes = response.data;
                })
              })
                .catch(err => {
                  console.log(err)
                  if (err === "cancel") {
                    $scope.cambiarVista();
                    $scope.$apply();
                  }
                })
            } else if (response[0].Respuesta.includes("1-Solicitud generada con exito!")) {
              swal("Generacion correcta", response[0].Respuesta, 'success')
              $scope.cambiarVista();
              $scope.$apply();
            }
          }
          // if (response.code === 200) {
          //   swal("", "Su solicitud ha sido generada exitosamente", "success");
          //   $scope.cambiarVista();
          // }
        })
      }


      $scope.obtenerTiposPermisoT = function (response) {
        $scope.tiposPermiso = response.data;
      }

      $scope.cargarSubmotivos = function (id) {

      }

      const notificarHoras = (x) => {
        var mensaje = "";
        switch (x) {
          case "18":
            mensaje = "Este Permiso permite hasta 4 Horas";
            break;
          case "19":
            mensaje = "Este Permiso permite hasta 3 Horas";
            break;
          case "20":
            mensaje = "Este Permiso permite hasta 2 Dias";
            break;
          case "21":
            mensaje = "Este Permiso permite hasta 8 Horas";
            break;
          case "22":
            mensaje = "Este Permiso permite hasta 4 Horas";
            break;
          case "23":
            mensaje = "Puede solicitar la fecha y hora de terminacion";
            break;
          case "24":
            mensaje = "Puede solicitar la fecha y hora de terminacion";
            break;

          case "41":
            mensaje = "Este permiso permite media jornada laboral";
            break;

          case "42":
            mensaje = "Este permiso permite una jornada laboral";
            break;

          case "31":
            mensaje = "Este Permiso permite hasta 3 Dias";
            break;
          case "26":
            mensaje = "Puede solicitar la fecha y hora de terminacion";
            break;
          default:
            mensaje = "Puede solicitar la fecha y hora de terminacion";
            break;
        }
        return mensaje;
      }

      $scope.mostrarNotificaciones = (subtipo) => {
        notificarHoras(subtipo) !== "" ? alert(notificarHoras(subtipo)) : null;

        const ponerMismaFecha = () => {
          if (fechaInicioPermisoPersonal.value !== '') {
            const fechaFinPermisoPersonal = document.querySelector('#fechaFinPermisoPersonal');
            fechaFinPermisoPersonal.setAttribute('readonly', '');
            fechaFinPermisoPersonal.value = fechaInicioPermisoPersonal.value;
          }
        };

        if (subtipo === "41" || subtipo === "42") {
          const fechaInicioPermisoPersonal = document.querySelector('#fechaInicioPermisoPersonal');
          fechaInicioPermisoPersonal.addEventListener('change', ponerMismaFecha);
        }
      }

      $scope.cargarSubtipos = function (id) {
        if (id === "30" || id === "25") {
          if (document.querySelector('#submotivoPersonalField').classList.contains('ng-hide')) {
            document.querySelector('#submotivoPersonalField').classList.remove('ng-hide');
          }
        } else {
          alert(notificarHoras(id));
          document.querySelector('#submotivoPersonalField').classList.add('ng-hide');
          const ponerMismaFecha = () => {
            if (fechaInicioPermisoPersonal.value !== '') {
              const fechaFinPermisoPersonal = document.querySelector('#fechaFinPermisoPersonal');
              fechaFinPermisoPersonal.setAttribute('readonly', '');
              fechaFinPermisoPersonal.value = fechaInicioPermisoPersonal.value;
            }
          };

          const fechaInicioPermisoPersonal = document.querySelector('#fechaInicioPermisoPersonal');
          fechaInicioPermisoPersonal.removeEventListener('change', ponerMismaFecha);
          const fechaFinPermisoPersonal = document.querySelector('#fechaFinPermisoPersonal');
          fechaFinPermisoPersonal.removeAttribute('readonly');
          fechaInicioPermisoPersonal.value = "";
          fechaFinPermisoPersonal.value = "";
        }
        ausentismoHttp.obtenerSubtipos(id).then(response => {
          $scope.subtipos = response.data;
          document.querySelector('#subtipoPermisoPersonalSelect').value = "1";
        });
      }

      $scope.showValue = function (subtipo) { console.log(subtipo); }

      $scope.chequearEnter = function (keyCode) {
        if (keyCode === 13) {
          $scope.buscarDiagnostico($scope.diagnostico);
        }
      }

      $scope.chequearEnterl = function (keyCode) {
        if (keyCode === 13) {
          $scope.buscarLugares($scope.lugares);
        }
      }

      // tipos de incapacidad
      $scope.tipo = "";
      $scope.tipos = null;
      $scope.verTiposIncapacidad = function (response) {
        $scope.tipos = response.data;
      };

      // tipos de traslados
      $scope.tipot = "";
      $scope.tipost = null;
      $scope.verTiposTraslado = function (response) {
        $scope.tipost = response.data;
      };

      // permisos laborales
      $scope.tipol = "";
      $scope.tiposl = null;
      $scope.verTipoPermiso = function (response) {
        $scope.tiposl = response.data;
      };

      $scope.cambioTipoLaboral = function (tipo) {
        $scope.tipoSeleccionado = tipo;
        switch (tipo) {
          case "28":
            if (String($scope.subtipoSeleccionado) === '1') {
              $scope.submotivoDeshabilitado = true;
            } else {
              $scope.submotivoDeshabilitado = false;
            }
            break;
          default:
            $scope.submotivoDeshabilitado = false;
            break;
        }
      }

      $scope.cambioSubtipoLaboral = function (subtipo) {
        console.log($scope.tipoSeleccionado);
        console.log(subtipo);
        $scope.subtipoSeleccionado = subtipo;
        switch ($scope.tipoSeleccionado) {
          case "28":
            if (String(subtipo) === '1') {
              $scope.submotivoDeshabilitado = true;
            } else {
              $scope.submotivoDeshabilitado = false;
            }
            break;
          default:
            $scope.submotivoDeshabilitado = false;
            break;
        }
      }

      // permisos Personales
      $scope.tipop = "";
      $scope.tiposp = null;
      $scope.verTipoPermisop = function (response) {
        $scope.tiposPersonal = response.data;
      };

      $scope.verSubtipo = function (x) {

        if (x === "3" || x === "5") {
          document.querySelector('#subtipo-select').removeAttribute("disabled");
        } else {
          document.querySelector('#subtipo-select').setAttribute("disabled", "");
        }

        ausentismoHttp.obtenerSubtipo(x).then(
          function (response) {

          })

      };

      $scope.cambiarUbicacionDepartamento = (departamento) => {
        console.log(departamento);
        $scope.dataUbicacionMunicipio = $scope.dataUbicacion.filter(item => String(item.id) === String(departamento))[0].ciudades;
      }

      $scope.btndisabled = true;

      $scope.asignarjefe = function (data) {
        $('#' + data.cedula).removeClass('checkjefe');
        $('.checkjefe').prop('checked', false);
        if (document.getElementById(data.cedula).checked == true) {
          $scope.datosjefe = data;
          $scope.btndisabled = false;
        }
        else {
          $scope.cedulajefe = '';
          $scope.btndisabled = true;
        }
        $('#' + data.cedula).addClass('checkjefe');
      }

      $scope.guardarjefe = function () {
        if (document.getElementById($scope.datosjefe.cedula).checked == true) {
          $http({
            method: 'POST',
            url: "php/ausentismo/logicajefes.php",
            data: { function: 'guardarjefe', emisor: $scope.cedula, jefe: $scope.datosjefe.cedula, tipo: 'insert' }
          }).then(function (response) {
            $("#modalJefe").modal('hide')
          })
        }
        else {
          notification.getNotification('warning', 'Debe confirmar su jefe!', 'Notificacion');
        }
      }

      ausentismoHttp.obtenerTipoPermiso().then($scope.obtenerTiposPermisoT);

    }]);
