(function () {
    'use strict';
    angular.module('GenesisApp').controller('languageController',languageController);
    angular.module('GenesisApp').controller('dashAnalyticsController',dashAnalyticsController);
    angular.module('GenesisApp').controller('dashGeneralController',dashGeneralController);
    angular.module('GenesisApp').controller('dashSalesController',dashSalesController);
    angular.module('GenesisApp').controller('dashServerController',dashServerController);
    angular.module('GenesisApp').controller('dashSocialController',dashSocialController);
    angular.module('GenesisApp').controller('chartsAmChartsController',chartsAmChartsController);
    angular.module('GenesisApp').controller('chartsC3Controller',chartsC3Controller);
    angular.module('GenesisApp').controller('chartsFlotController',chartsFlotController);
    angular.module('GenesisApp').controller('chartsHighChartsController',chartsHighChartsController);
    angular.module('GenesisApp').controller('chartsMorrisController',chartsMorrisController);
    angular.module('GenesisApp').controller('chartsNvd3Controller',chartsNvd3Controller);
    angular.module('GenesisApp').controller('chartsSparklineController',chartsSparklineController);
    angular.module('GenesisApp').controller('ecommerceOrdersController', ecommerceOrdersController);
    angular.module('GenesisApp').controller('ecommerceProductsController', ecommerceProductsController);
    
    languageController.$inject = ['$translate'];
    function languageController($translate) {
        var vm = this;
        vm.change= change;
        function change (l) {
            $translate.use(l);
        }
        vm.languages = [
            {
                'name': 'Ro',
                'value':'ro',
                'icon':'flag'
            },{
                'name': 'En',
                'value':'en',
                'icon':'flag'
            },{
                'name': 'Es',
                'value':'es',
                'icon':'flag'
            }
        ];
    }
    dashAnalyticsController.$inject = ['$timeout', '$interval'];
    function dashAnalyticsController($timeout,$interval) {
        var vm = this;
        vm.signupData = {
            names: ["Jonathon Locicero", "Madalyn Shahid", "Millie Brummond", "Loreta Puccio", "Joeann Hairston", "Blanca Hovland", "Joan Outten", "Sierra Shepard", "Jacqueline Mallari", "Joyce Perrino", "Leandra Jarrells", "Santa Groves", "Joselyn Lydick", "Laverna Bogner", "Stanton Newcomb"],
            lastUsedName: 0,
            profileImages: ["../assets/images/profile/128.jpg", "../assets/images/profile/129.jpg","../assets/images/profile/130.jpg","../assets/images/profile/131.jpg", "../assets/images/profile/blog1.jpg", "../assets/images/profile/blog2.jpg", "../assets/images/profile/blog3.jpg", "../assets/images/profile/blog4.jpg"],
            lastProfileImage: 0,
            memberships: [ 'Free', 'Basic', 'Premium' ],
            cities: ["Northfair", "Nashua", "Tripoli", "Kingston", "Orland Park", "Castries", "New Dorp", "Canarsie", "West Covina", "Merced", "Pasadena", "Walker", "Atkinson", "Oranjestad", "Killearn Estates", "Tehran", "Bujumbura", "Dale City", "Mesa", "Kettering", "Mentor", "Missouri City", "Santa Barbara", "Lincoln"],
            lastUsedCity: 0
        };
        $interval( function(){
            !(vm.signupData.lastUsedName < vm.signupData.names.length) ? vm.signupData.lastUsedName = 0 : null;
            !(vm.signupData.lastProfileImage < vm.signupData.profileImages.length) ? vm.signupData.lastProfileImage = 0 : null;
            !(vm.signupData.lastUsedCity < vm.signupData.cities.length) ? vm.signupData.lastUsedCity = 0 : null;
            angular.element('#signup-feed3').prepend(
                '<div class="collection-item avatar new" style="display: none">' +
                    '<img src="' + vm.signupData.profileImages[vm.signupData.lastProfileImage] +'" alt="" class="circle responsive-img">' +
                    '<span class="title">' + vm.signupData.names[vm.signupData.lastUsedName] + '</span>' +
                    '<span class="badge hide-on-small-only">' + vm.signupData.memberships[Math.floor(Math.random() * (2 - 0 + 1)) + 0 ] + '</span>' +
                    '<p>' + vm.signupData.cities[vm.signupData.lastUsedCity] + ', USA</p>' +
                    '<p class="grey-text hide-on-med-and-up">' + vm.signupData.memberships[Math.floor(Math.random() * (2 - 0 + 1)) + 0 ] + '</p>' +
                    '</div>'
            ).find('.new').slideDown('fast');
            vm.signupData.lastUsedName++;
            vm.signupData.lastProfileImage++;
            vm.signupData.lastUsedCity++;
        }, 2000 );
        vm.dataTable =
        {
            "headings":['Name', 'Position', 'Office', 'Age', 'Start date','Salary'],
            "rows": [
                {
                    "name": "Tiger Nixon",
                    "position": "System Architect",
                    "salary": "$320,800",
                    "startDate": "2011/04/25",
                    "office": "Edinburgh",
                    "age": "66"
                },
                {
                    "name": "Garrett Winters",
                    "position": "Accountant",
                    "salary": "$170,750",
                    "startDate": "2011/07/25",
                    "office": "Tokyo",
                    "age": "65"
                },
                {
                    "name": "Ashton Cox",
                    "position": "Junior Technical Author",
                    "salary": "$86,000",
                    "startDate": "2009/01/12",
                    "office": "San Francisco",
                    "age": "64"
                },
                {
                    "name": "Cedric Kelly",
                    "position": "Senior Javascript Developer",
                    "salary": "$433,060",
                    "startDate": "2012/03/29",
                    "office": "Edinburgh",
                    "age": "63"
                },
                {
                    "name": "Airi Satou",
                    "position": "Accountant",
                    "salary": "$162,700",
                    "startDate": "2008/11/28",
                    "office": "Tokyo",
                    "age": "62"
                },
                {
                    "name": "Brielle Williamson",
                    "position": "Integration Specialist",
                    "salary": "$372,000",
                    "startDate": "2012/12/02",
                    "office": "New York",
                    "age": "61"
                },
                {
                    "name": "Herrod Chandler",
                    "position": "Sales Assistant",
                    "salary": "$137,500",
                    "startDate": "2012/08/06",
                    "office": "San Francisco",
                    "age": "60"
                },
                {
                    "name": "Rhona Davidson",
                    "position": "Integration Specialist",
                    "salary": "$327,900",
                    "startDate": "2010/10/14",
                    "office": "Tokyo",
                    "age": "59"
                },
                {
                    "name": "Colleen Hurst",
                    "position": "Javascript Developer",
                    "salary": "$205,500",
                    "startDate": "2009/09/15",
                    "office": "San Francisco",
                    "age": "58"
                },
                {
                    "name": "Sonya Frost",
                    "position": "Software Engineer",
                    "salary": "$103,600",
                    "startDate": "2008/12/13",
                    "office": "Edinburgh",
                    "age": "57"
                },
                {
                    "name": "Jena Gaines",
                    "position": "Office Manager",
                    "salary": "$90,560",
                    "startDate": "2008/12/19",
                    "office": "London",
                    "age": "56"
                },
                {
                    "name": "Quinn Flynn",
                    "position": "Support Lead",
                    "salary": "$342,000",
                    "startDate": "2013/03/03",
                    "office": "Edinburgh",
                    "age": "55"
                },
                {
                    "name": "Charde Marshall",
                    "position": "Regional Director",
                    "salary": "$470,600",
                    "startDate": "2008/10/16",
                    "office": "San Francisco",
                    "age": "54"
                },
                {
                    "name": "Haley Kennedy",
                    "position": "Senior Marketing Designer",
                    "salary": "$313,500",
                    "startDate": "2012/12/18",
                    "office": "London",
                    "age": "53"
                },
                {
                    "name": "Tatyana Fitzpatrick",
                    "position": "Regional Director",
                    "salary": "$385,750",
                    "startDate": "2010/03/17",
                    "office": "London",
                    "age": "52"
                },
                {
                    "name": "Michael Silva",
                    "position": "Marketing Designer",
                    "salary": "$198,500",
                    "startDate": "2012/11/27",
                    "office": "London",
                    "age": "51"
                },
                {
                    "name": "Paul Byrd",
                    "position": "Chief Financial Officer (CFO)",
                    "salary": "$725,000",
                    "startDate": "2010/06/09",
                    "office": "New York",
                    "age": "50"
                },
                {
                    "name": "Gloria Little",
                    "position": "Systems Administrator",
                    "salary": "$237,500",
                    "startDate": "2009/04/10",
                    "office": "New York",
                    "age": "50"
                },
                {
                    "name": "Bradley Greer",
                    "position": "Software Engineer",
                    "salary": "$132,000",
                    "startDate": "2012/10/13",
                    "office": "London",
                    "age": "49"
                },
                {
                    "name": "Dai Rios",
                    "position": "Personnel Lead",
                    "salary": "$217,500",
                    "startDate": "2012/09/26",
                    "office": "Edinburgh",
                    "age": "49"
                },
                {
                    "name": "Jenette Caldwell",
                    "position": "Development Lead",
                    "salary": "$345,000",
                    "startDate": "2011/09/03",
                    "office": "New York",
                    "age": "48"
                },
                {
                    "name": "Yuri Berry",
                    "position": "Chief Marketing Officer (CMO)",
                    "salary": "$675,000",
                    "startDate": "2009/06/25",
                    "office": "New York",
                    "age": "47"
                },
                {
                    "name": "Caesar Vance",
                    "position": "Pre-Sales Support",
                    "salary": "$106,450",
                    "startDate": "2011/12/12",
                    "office": "New York",
                    "age": "44"
                },
                {
                    "name": "Doris Wilder",
                    "position": "Sales Assistant",
                    "salary": "$85,600",
                    "startDate": "2010/09/20",
                    "office": "Sidney",
                    "age": "43"
                },
                {
                    "name": "Angelica Ramos",
                    "position": "Chief Executive Officer (CEO)",
                    "salary": "$1,200,000",
                    "startDate": "2009/10/09",
                    "office": "London",
                    "age": "42"
                },
                {
                    "name": "Gavin Joyce",
                    "position": "Developer",
                    "salary": "$92,575",
                    "startDate": "2010/12/22",
                    "office": "Edinburgh",
                    "age": "39"
                },
                {
                    "name": "Jennifer Chang",
                    "position": "Regional Director",
                    "salary": "$357,650",
                    "startDate": "2010/11/14",
                    "office": "Singapore",
                    "age": "30"
                },
                {
                    "name": "Brenden Wagner",
                    "position": "Software Engineer",
                    "salary": "$206,850",
                    "startDate": "2011/06/07",
                    "office": "San Francisco",
                    "age": "31"
                },
                {
                    "name": "Fiona Green",
                    "position": "Chief Operating Officer (COO)",
                    "salary": "$850,000",
                    "startDate": "2010/03/11",
                    "office": "San Francisco",
                    "age": "32"
                },
                {
                    "name": "Shou Itou",
                    "position": "Regional Marketing",
                    "salary": "$163,000",
                    "startDate": "2011/08/14",
                    "office": "Tokyo",
                    "age": "29"
                },
                {
                    "name": "Michelle House",
                    "position": "Integration Specialist",
                    "salary": "$95,400",
                    "startDate": "2011/06/02",
                    "office": "Sidney",
                    "age": "28"
                },
                {
                    "name": "Suki Burks",
                    "position": "Developer",
                    "salary": "$114,500",
                    "startDate": "2009/10/22",
                    "office": "London",
                    "age": "24"
                },
                {
                    "name": "Prescott Bartlett",
                    "position": "Technical Author",
                    "salary": "$145,000",
                    "startDate": "2011/05/07",
                    "office": "London",
                    "age": "29"
                },
                {
                    "name": "Gavin Cortez",
                    "position": "Team Leader",
                    "salary": "$235,500",
                    "startDate": "2008/10/26",
                    "office": "San Francisco",
                    "age": "33"
                },
                {
                    "name": "Martena Mccray",
                    "position": "Post-Sales support",
                    "salary": "$324,050",
                    "startDate": "2011/03/09",
                    "office": "Edinburgh",
                    "age": "36"
                },
                {
                    "name": "Unity Butler",
                    "position": "Marketing Designer",
                    "salary": "$85,675",
                    "startDate": "2009/12/09",
                    "office": "San Francisco",
                    "age": "42"
                },
                {
                    "name": "Howard Hatfield",
                    "position": "Office Manager",
                    "salary": "$164,500",
                    "startDate": "2008/12/16",
                    "office": "San Francisco",
                    "age": "38"
                },
                {
                    "name": "Hope Fuentes",
                    "position": "Secretary",
                    "salary": "$109,850",
                    "startDate": "2010/02/12",
                    "office": "San Francisco",
                    "age": "21"
                },
                {
                    "name": "Vivian Harrell",
                    "position": "Financial Controller",
                    "salary": "$452,500",
                    "startDate": "2009/02/14",
                    "office": "San Francisco",
                    "age": "45"
                },
                {
                    "name": "Timothy Mooney",
                    "position": "Office Manager",
                    "salary": "$136,200",
                    "startDate": "2008/12/11",
                    "office": "London",
                    "age": "34"
                },
                {
                    "name": "Jackson Bradshaw",
                    "position": "Director",
                    "salary": "$645,750",
                    "startDate": "2008/09/26",
                    "office": "New York",
                    "age": "36"
                },
                {
                    "name": "Olivia Liang",
                    "position": "Support Engineer",
                    "salary": "$234,500",
                    "startDate": "2011/02/03",
                    "office": "Singapore",
                    "age": "49"
                },
                {
                    "name": "Bruno Nash",
                    "position": "Software Engineer",
                    "salary": "$163,500",
                    "startDate": "2011/05/03",
                    "office": "London",
                    "age": "54"
                },
                {
                    "name": "Sakura Yamamoto",
                    "position": "Support Engineer",
                    "salary": "$139,575",
                    "startDate": "2009/08/19",
                    "office": "Tokyo",
                    "age": "24"
                },
                {
                    "name": "Thor Walton",
                    "position": "Developer",
                    "salary": "$98,540",
                    "startDate": "2013/08/11",
                    "office": "New York",
                    "age": "22"
                },
                {
                    "name": "Finn Camacho",
                    "position": "Support Engineer",
                    "salary": "$87,500",
                    "startDate": "2009/07/07",
                    "office": "San Francisco",
                    "age": "27"
                },
                {
                    "name": "Serge Baldwin",
                    "position": "Data Coordinator",
                    "salary": "$138,575",
                    "startDate": "2012/04/09",
                    "office": "Singapore",
                    "age": "26"
                },
                {
                    "name": "Zenaida Frank",
                    "position": "Software Engineer",
                    "salary": "$125,250",
                    "startDate": "2010/01/04",
                    "office": "New York",
                    "age": "27"
                },
                {
                    "name": "Zorita Serrano",
                    "position": "Software Engineer",
                    "salary": "$115,000",
                    "startDate": "2012/06/01",
                    "office": "San Francisco",
                    "age": "28"
                },
                {
                    "name": "Jennifer Acosta",
                    "position": "Junior Javascript Developer",
                    "salary": "$75,650",
                    "startDate": "2013/02/01",
                    "office": "Edinburgh",
                    "age": "20"
                },
                {
                    "name": "Cara Stevens",
                    "position": "Sales Assistant",
                    "salary": "$145,600",
                    "startDate": "2011/12/06",
                    "office": "New York",
                    "age": "34"
                },
                {
                    "name": "Hermione Butler",
                    "position": "Regional Director",
                    "salary": "$356,250",
                    "startDate": "2011/03/21",
                    "office": "London",
                    "age": "43"
                },
                {
                    "name": "Lael Greer",
                    "position": "Systems Administrator",
                    "salary": "$103,500",
                    "startDate": "2009/02/27",
                    "office": "London",
                    "age": "50"
                },
                {
                    "name": "Jonas Alexander",
                    "position": "Developer",
                    "salary": "$86,500",
                    "startDate": "2010/07/14",
                    "office": "San Francisco",
                    "age": "32"
                },
                {
                    "name": "Shad Decker",
                    "position": "Regional Director",
                    "salary": "$183,000",
                    "startDate": "2008/11/13",
                    "office": "Edinburgh",
                    "age": "43"
                },
                {
                    "name": "Michael Bruce",
                    "position": "Javascript Developer",
                    "salary": "$183,000",
                    "startDate": "2011/06/27",
                    "office": "Singapore",
                    "age": "23"
                },
                {
                    "name": "Donna Snider",
                    "position": "Customer Support",
                    "salary": "$112,000",
                    "startDate": "2011/01/25",
                    "office": "New York",
                    "age": "22"
                }
            ]
        };
        $timeout(function() {
            $('#demo-table').DataTable({//  Initialise Data Tables
                "searching": false
            });
        }, 1000);
        vm.color = '#b02e67';
        if ( ThemeSettings.getCookie('color-scheme') == 'blue' ) {
            vm.color  = '#1565c0'
        } else if ( ThemeSettings.getCookie('color-scheme') == 'dark' ) {
            vm.color  = '#2e2e2e';
        }
        sparkBar('#smc1', [6,4,8,6,5,6,7,8,3,5,9,5,8,4,3,6,8], '45px', 3,  vm.color , 2);
        sparkBar('#smc2', [4,7,6,5,3,8,6,8,4,6], '45px', 3, vm.color, 2);
        sparkLine('#smc3', [9,4,6,5,6,4,5,7,9,3,6,5], 85, 45,  vm.color , 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
        sparkLine('#smc4', [5,6,3,9,7,5,4,6,5,6,4,9], 85, 45, vm.color, 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');

        vm.memberships = function () {
            var membershipData = {
                free: 0,
                freeAccounts: [],
                basic: 0,
                basicAccounts: [],
                premium: 0,
                premiumAccounts: [],
                day: 1025409600000
            };
            for ( var i = 0; i < 165; i++ ) {
                if ( ( Math.floor(Math.random() * (8 - 1 + 1)) + 1 ) > 5 )
                    membershipData.free += Math.floor(Math.random() * (700 - 1 + 1)) + 1;
                if ( ( Math.floor(Math.random() * (8 - 1 + 1)) + 1 ) > 5 )
                    membershipData.basic += Math.floor(Math.random() * (70 - 1 + 1)) + 1;
                if ( ( Math.floor(Math.random() * (8 - 1 + 1)) + 1 ) > 5 )
                    membershipData.premium += Math.floor(Math.random() * (35 - 1 + 1)) + 1;
                membershipData.day += 2678400000;
                membershipData.freeAccounts.push([ membershipData.day, membershipData.free ]);
                membershipData.basicAccounts.push([ membershipData.day, membershipData.basic ]);
                membershipData.premiumAccounts.push([ membershipData.day, membershipData.premium ]);
            }
            nv.addGraph(function() {
                var data5 = [
                    {
                        "key" : "Free" ,
                        "values" : membershipData.freeAccounts
                    },
                    {
                        "key" : "Basic" ,
                        "values" : membershipData.basicAccounts
                    },
                    {
                        "key" : "Premium" ,
                        "values" : membershipData.premiumAccounts
                    }
                ];
                var chart = nv.models.stackedAreaChart()
                        .x(function(d) { return d[0] })
                        .y(function(d) { return d[1] })
                        .clipEdge(true)
                        .useInteractiveGuideline(true)
                    ;
                chart.xAxis
                    .showMaxMin(false)
                    .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
                chart.yAxis
                    .tickFormat(d3.format(',.2f'));
                d3.select('#nvd35 svg')
                    .datum(data5)
                    .transition().duration(500).call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });
        };
        vm.memberships();
        var latlong = {};
        latlong["AD"] = {"latitude":42.5, "longitude":1.5};
        latlong["AE"] = {"latitude":24, "longitude":54};
        latlong["AF"] = {"latitude":33, "longitude":65};
        latlong["AG"] = {"latitude":17.05, "longitude":-61.8};
        latlong["AI"] = {"latitude":18.25, "longitude":-63.1667};
        latlong["AL"] = {"latitude":41, "longitude":20};
        latlong["AM"] = {"latitude":40, "longitude":45};
        latlong["AN"] = {"latitude":12.25, "longitude":-68.75};
        latlong["AO"] = {"latitude":-12.5, "longitude":18.5};
        latlong["AP"] = {"latitude":35, "longitude":105};
        latlong["AQ"] = {"latitude":-90, "longitude":0};
        latlong["AR"] = {"latitude":-34, "longitude":-64};
        latlong["AS"] = {"latitude":-14.3333, "longitude":-170};
        latlong["AT"] = {"latitude":47.3333, "longitude":13.3333};
        latlong["AU"] = {"latitude":-27, "longitude":133};
        latlong["AW"] = {"latitude":12.5, "longitude":-69.9667};
        latlong["AZ"] = {"latitude":40.5, "longitude":47.5};
        latlong["BA"] = {"latitude":44, "longitude":18};
        latlong["BB"] = {"latitude":13.1667, "longitude":-59.5333};
        latlong["BD"] = {"latitude":24, "longitude":90};
        latlong["BE"] = {"latitude":50.8333, "longitude":4};
        latlong["BF"] = {"latitude":13, "longitude":-2};
        latlong["BG"] = {"latitude":43, "longitude":25};
        latlong["BH"] = {"latitude":26, "longitude":50.55};
        latlong["BI"] = {"latitude":-3.5, "longitude":30};
        latlong["BJ"] = {"latitude":9.5, "longitude":2.25};
        latlong["BM"] = {"latitude":32.3333, "longitude":-64.75};
        latlong["BN"] = {"latitude":4.5, "longitude":114.6667};
        latlong["BO"] = {"latitude":-17, "longitude":-65};
        latlong["BR"] = {"latitude":-10, "longitude":-55};
        latlong["BS"] = {"latitude":24.25, "longitude":-76};
        latlong["BT"] = {"latitude":27.5, "longitude":90.5};
        latlong["BV"] = {"latitude":-54.4333, "longitude":3.4};
        latlong["BW"] = {"latitude":-22, "longitude":24};
        latlong["BY"] = {"latitude":53, "longitude":28};
        latlong["BZ"] = {"latitude":17.25, "longitude":-88.75};
        latlong["CA"] = {"latitude":54, "longitude":-100};
        latlong["CC"] = {"latitude":-12.5, "longitude":96.8333};
        latlong["CD"] = {"latitude":0, "longitude":25};
        latlong["CF"] = {"latitude":7, "longitude":21};
        latlong["CG"] = {"latitude":-1, "longitude":15};
        latlong["CH"] = {"latitude":47, "longitude":8};
        latlong["CI"] = {"latitude":8, "longitude":-5};
        latlong["CK"] = {"latitude":-21.2333, "longitude":-159.7667};
        latlong["CL"] = {"latitude":-30, "longitude":-71};
        latlong["CM"] = {"latitude":6, "longitude":12};
        latlong["CN"] = {"latitude":35, "longitude":105};
        latlong["CO"] = {"latitude":4, "longitude":-72};
        latlong["CR"] = {"latitude":10, "longitude":-84};
        latlong["CU"] = {"latitude":21.5, "longitude":-80};
        latlong["CV"] = {"latitude":16, "longitude":-24};
        latlong["CX"] = {"latitude":-10.5, "longitude":105.6667};
        latlong["CY"] = {"latitude":35, "longitude":33};
        latlong["CZ"] = {"latitude":49.75, "longitude":15.5};
        latlong["DE"] = {"latitude":51, "longitude":9};
        latlong["DJ"] = {"latitude":11.5, "longitude":43};
        latlong["DK"] = {"latitude":56, "longitude":10};
        latlong["DM"] = {"latitude":15.4167, "longitude":-61.3333};
        latlong["DO"] = {"latitude":19, "longitude":-70.6667};
        latlong["DZ"] = {"latitude":28, "longitude":3};
        latlong["EC"] = {"latitude":-2, "longitude":-77.5};
        latlong["EE"] = {"latitude":59, "longitude":26};
        latlong["EG"] = {"latitude":27, "longitude":30};
        latlong["EH"] = {"latitude":24.5, "longitude":-13};
        latlong["ER"] = {"latitude":15, "longitude":39};
        latlong["ES"] = {"latitude":40, "longitude":-4};
        latlong["ET"] = {"latitude":8, "longitude":38};
        latlong["EU"] = {"latitude":47, "longitude":8};
        latlong["FI"] = {"latitude":62, "longitude":26};
        latlong["FJ"] = {"latitude":-18, "longitude":175};
        latlong["FK"] = {"latitude":-51.75, "longitude":-59};
        latlong["FM"] = {"latitude":6.9167, "longitude":158.25};
        latlong["FO"] = {"latitude":62, "longitude":-7};
        latlong["FR"] = {"latitude":46, "longitude":2};
        latlong["GA"] = {"latitude":-1, "longitude":11.75};
        latlong["GB"] = {"latitude":54, "longitude":-2};
        latlong["GD"] = {"latitude":12.1167, "longitude":-61.6667};
        latlong["GE"] = {"latitude":42, "longitude":43.5};
        latlong["GF"] = {"latitude":4, "longitude":-53};
        latlong["GH"] = {"latitude":8, "longitude":-2};
        latlong["GI"] = {"latitude":36.1833, "longitude":-5.3667};
        latlong["GL"] = {"latitude":72, "longitude":-40};
        latlong["GM"] = {"latitude":13.4667, "longitude":-16.5667};
        latlong["GN"] = {"latitude":11, "longitude":-10};
        latlong["GP"] = {"latitude":16.25, "longitude":-61.5833};
        latlong["GQ"] = {"latitude":2, "longitude":10};
        latlong["GR"] = {"latitude":39, "longitude":22};
        latlong["GS"] = {"latitude":-54.5, "longitude":-37};
        latlong["GT"] = {"latitude":15.5, "longitude":-90.25};
        latlong["GU"] = {"latitude":13.4667, "longitude":144.7833};
        latlong["GW"] = {"latitude":12, "longitude":-15};
        latlong["GY"] = {"latitude":5, "longitude":-59};
        latlong["HK"] = {"latitude":22.25, "longitude":114.1667};
        latlong["HM"] = {"latitude":-53.1, "longitude":72.5167};
        latlong["HN"] = {"latitude":15, "longitude":-86.5};
        latlong["HR"] = {"latitude":45.1667, "longitude":15.5};
        latlong["HT"] = {"latitude":19, "longitude":-72.4167};
        latlong["HU"] = {"latitude":47, "longitude":20};
        latlong["ID"] = {"latitude":-5, "longitude":120};
        latlong["IE"] = {"latitude":53, "longitude":-8};
        latlong["IL"] = {"latitude":31.5, "longitude":34.75};
        latlong["IN"] = {"latitude":20, "longitude":77};
        latlong["IO"] = {"latitude":-6, "longitude":71.5};
        latlong["IQ"] = {"latitude":33, "longitude":44};
        latlong["IR"] = {"latitude":32, "longitude":53};
        latlong["IS"] = {"latitude":65, "longitude":-18};
        latlong["IT"] = {"latitude":42.8333, "longitude":12.8333};
        latlong["JM"] = {"latitude":18.25, "longitude":-77.5};
        latlong["JO"] = {"latitude":31, "longitude":36};
        latlong["JP"] = {"latitude":36, "longitude":138};
        latlong["KE"] = {"latitude":1, "longitude":38};
        latlong["KG"] = {"latitude":41, "longitude":75};
        latlong["KH"] = {"latitude":13, "longitude":105};
        latlong["KI"] = {"latitude":1.4167, "longitude":173};
        latlong["KM"] = {"latitude":-12.1667, "longitude":44.25};
        latlong["KN"] = {"latitude":17.3333, "longitude":-62.75};
        latlong["KP"] = {"latitude":40, "longitude":127};
        latlong["KR"] = {"latitude":37, "longitude":127.5};
        latlong["KW"] = {"latitude":29.3375, "longitude":47.6581};
        latlong["KY"] = {"latitude":19.5, "longitude":-80.5};
        latlong["KZ"] = {"latitude":48, "longitude":68};
        latlong["LA"] = {"latitude":18, "longitude":105};
        latlong["LB"] = {"latitude":33.8333, "longitude":35.8333};
        latlong["LC"] = {"latitude":13.8833, "longitude":-61.1333};
        latlong["LI"] = {"latitude":47.1667, "longitude":9.5333};
        latlong["LK"] = {"latitude":7, "longitude":81};
        latlong["LR"] = {"latitude":6.5, "longitude":-9.5};
        latlong["LS"] = {"latitude":-29.5, "longitude":28.5};
        latlong["LT"] = {"latitude":55, "longitude":24};
        latlong["LU"] = {"latitude":49.75, "longitude":6};
        latlong["LV"] = {"latitude":57, "longitude":25};
        latlong["LY"] = {"latitude":25, "longitude":17};
        latlong["MA"] = {"latitude":32, "longitude":-5};
        latlong["MC"] = {"latitude":43.7333, "longitude":7.4};
        latlong["MD"] = {"latitude":47, "longitude":29};
        latlong["ME"] = {"latitude":42.5, "longitude":19.4};
        latlong["MG"] = {"latitude":-20, "longitude":47};
        latlong["MH"] = {"latitude":9, "longitude":168};
        latlong["MK"] = {"latitude":41.8333, "longitude":22};
        latlong["ML"] = {"latitude":17, "longitude":-4};
        latlong["MM"] = {"latitude":22, "longitude":98};
        latlong["MN"] = {"latitude":46, "longitude":105};
        latlong["MO"] = {"latitude":22.1667, "longitude":113.55};
        latlong["MP"] = {"latitude":15.2, "longitude":145.75};
        latlong["MQ"] = {"latitude":14.6667, "longitude":-61};
        latlong["MR"] = {"latitude":20, "longitude":-12};
        latlong["MS"] = {"latitude":16.75, "longitude":-62.2};
        latlong["MT"] = {"latitude":35.8333, "longitude":14.5833};
        latlong["MU"] = {"latitude":-20.2833, "longitude":57.55};
        latlong["MV"] = {"latitude":3.25, "longitude":73};
        latlong["MW"] = {"latitude":-13.5, "longitude":34};
        latlong["MX"] = {"latitude":23, "longitude":-102};
        latlong["MY"] = {"latitude":2.5, "longitude":112.5};
        latlong["MZ"] = {"latitude":-18.25, "longitude":35};
        latlong["NA"] = {"latitude":-22, "longitude":17};
        latlong["NC"] = {"latitude":-21.5, "longitude":165.5};
        latlong["NE"] = {"latitude":16, "longitude":8};
        latlong["NF"] = {"latitude":-29.0333, "longitude":167.95};
        latlong["NG"] = {"latitude":10, "longitude":8};
        latlong["NI"] = {"latitude":13, "longitude":-85};
        latlong["NL"] = {"latitude":52.5, "longitude":5.75};
        latlong["NO"] = {"latitude":62, "longitude":10};
        latlong["NP"] = {"latitude":28, "longitude":84};
        latlong["NR"] = {"latitude":-0.5333, "longitude":166.9167};
        latlong["NU"] = {"latitude":-19.0333, "longitude":-169.8667};
        latlong["NZ"] = {"latitude":-41, "longitude":174};
        latlong["OM"] = {"latitude":21, "longitude":57};
        latlong["PA"] = {"latitude":9, "longitude":-80};
        latlong["PE"] = {"latitude":-10, "longitude":-76};
        latlong["PF"] = {"latitude":-15, "longitude":-140};
        latlong["PG"] = {"latitude":-6, "longitude":147};
        latlong["PH"] = {"latitude":13, "longitude":122};
        latlong["PK"] = {"latitude":30, "longitude":70};
        latlong["PL"] = {"latitude":52, "longitude":20};
        latlong["PM"] = {"latitude":46.8333, "longitude":-56.3333};
        latlong["PR"] = {"latitude":18.25, "longitude":-66.5};
        latlong["PS"] = {"latitude":32, "longitude":35.25};
        latlong["PT"] = {"latitude":39.5, "longitude":-8};
        latlong["PW"] = {"latitude":7.5, "longitude":134.5};
        latlong["PY"] = {"latitude":-23, "longitude":-58};
        latlong["QA"] = {"latitude":25.5, "longitude":51.25};
        latlong["RE"] = {"latitude":-21.1, "longitude":55.6};
        latlong["RO"] = {"latitude":46, "longitude":25};
        latlong["RS"] = {"latitude":44, "longitude":21};
        latlong["RU"] = {"latitude":60, "longitude":100};
        latlong["RW"] = {"latitude":-2, "longitude":30};
        latlong["SA"] = {"latitude":25, "longitude":45};
        latlong["SB"] = {"latitude":-8, "longitude":159};
        latlong["SC"] = {"latitude":-4.5833, "longitude":55.6667};
        latlong["SD"] = {"latitude":15, "longitude":30};
        latlong["SE"] = {"latitude":62, "longitude":15};
        latlong["SG"] = {"latitude":1.3667, "longitude":103.8};
        latlong["SH"] = {"latitude":-15.9333, "longitude":-5.7};
        latlong["SI"] = {"latitude":46, "longitude":15};
        latlong["SJ"] = {"latitude":78, "longitude":20};
        latlong["SK"] = {"latitude":48.6667, "longitude":19.5};
        latlong["SL"] = {"latitude":8.5, "longitude":-11.5};
        latlong["SM"] = {"latitude":43.7667, "longitude":12.4167};
        latlong["SN"] = {"latitude":14, "longitude":-14};
        latlong["SO"] = {"latitude":10, "longitude":49};
        latlong["SR"] = {"latitude":4, "longitude":-56};
        latlong["ST"] = {"latitude":1, "longitude":7};
        latlong["SV"] = {"latitude":13.8333, "longitude":-88.9167};
        latlong["SY"] = {"latitude":35, "longitude":38};
        latlong["SZ"] = {"latitude":-26.5, "longitude":31.5};
        latlong["TC"] = {"latitude":21.75, "longitude":-71.5833};
        latlong["TD"] = {"latitude":15, "longitude":19};
        latlong["TF"] = {"latitude":-43, "longitude":67};
        latlong["TG"] = {"latitude":8, "longitude":1.1667};
        latlong["TH"] = {"latitude":15, "longitude":100};
        latlong["TJ"] = {"latitude":39, "longitude":71};
        latlong["TK"] = {"latitude":-9, "longitude":-172};
        latlong["TM"] = {"latitude":40, "longitude":60};
        latlong["TN"] = {"latitude":34, "longitude":9};
        latlong["TO"] = {"latitude":-20, "longitude":-175};
        latlong["TR"] = {"latitude":39, "longitude":35};
        latlong["TT"] = {"latitude":11, "longitude":-61};
        latlong["TV"] = {"latitude":-8, "longitude":178};
        latlong["TW"] = {"latitude":23.5, "longitude":121};
        latlong["TZ"] = {"latitude":-6, "longitude":35};
        latlong["UA"] = {"latitude":49, "longitude":32};
        latlong["UG"] = {"latitude":1, "longitude":32};
        latlong["UM"] = {"latitude":19.2833, "longitude":166.6};
        latlong["US"] = {"latitude":38, "longitude":-97};
        latlong["UY"] = {"latitude":-33, "longitude":-56};
        latlong["UZ"] = {"latitude":41, "longitude":64};
        latlong["VA"] = {"latitude":41.9, "longitude":12.45};
        latlong["VC"] = {"latitude":13.25, "longitude":-61.2};
        latlong["VE"] = {"latitude":8, "longitude":-66};
        latlong["VG"] = {"latitude":18.5, "longitude":-64.5};
        latlong["VI"] = {"latitude":18.3333, "longitude":-64.8333};
        latlong["VN"] = {"latitude":16, "longitude":106};
        latlong["VU"] = {"latitude":-16, "longitude":167};
        latlong["WF"] = {"latitude":-13.3, "longitude":-176.2};
        latlong["WS"] = {"latitude":-13.5833, "longitude":-172.3333};
        latlong["YE"] = {"latitude":15, "longitude":48};
        latlong["YT"] = {"latitude":-12.8333, "longitude":45.1667};
        latlong["ZA"] = {"latitude":-29, "longitude":24};
        latlong["ZM"] = {"latitude":-15, "longitude":30};
        latlong["ZW"] = {"latitude":-20, "longitude":30};

        var mapData = [
            {"code":"AF" , "name":"Afghanistan", "value":32358260, "color":"#eea638"},
            {"code":"AL" , "name":"Albania", "value":3215988, "color":"#d8854f"},
            {"code":"DZ" , "name":"Algeria", "value":35980193, "color":"#de4c4f"},
            {"code":"AO" , "name":"Angola", "value":19618432, "color":"#de4c4f"},
            {"code":"AR" , "name":"Argentina", "value":40764561, "color":"#86a965"},
            {"code":"AM" , "name":"Armenia", "value":3100236, "color":"#d8854f"},
            {"code":"AU" , "name":"Australia", "value":22605732, "color":"#8aabb0"},
            {"code":"AT" , "name":"Austria", "value":8413429, "color":"#d8854f"},
            {"code":"AZ" , "name":"Azerbaijan", "value":9306023, "color":"#d8854f"},
            {"code":"BH" , "name":"Bahrain", "value":1323535, "color":"#eea638"},
            {"code":"BD" , "name":"Bangladesh", "value":150493658, "color":"#eea638"},
            {"code":"BY" , "name":"Belarus", "value":9559441, "color":"#d8854f"},
            {"code":"BE" , "name":"Belgium", "value":10754056, "color":"#d8854f"},
            {"code":"BJ" , "name":"Benin", "value":9099922, "color":"#de4c4f"},
            {"code":"BT" , "name":"Bhutan", "value":738267, "color":"#eea638"},
            {"code":"BO" , "name":"Bolivia", "value":10088108, "color":"#86a965"},
            {"code":"BA" , "name":"Bosnia and Herzegovina", "value":3752228, "color":"#d8854f"},
            {"code":"BW" , "name":"Botswana", "value":2030738, "color":"#de4c4f"},
            {"code":"BR" , "name":"Brazil", "value":196655014, "color":"#86a965"},
            {"code":"BN" , "name":"Brunei", "value":405938, "color":"#eea638"},
            {"code":"BG" , "name":"Bulgaria", "value":7446135, "color":"#d8854f"},
            {"code":"BF" , "name":"Burkina Faso", "value":16967845, "color":"#de4c4f"},
            {"code":"BI" , "name":"Burundi", "value":8575172, "color":"#de4c4f"},
            {"code":"KH" , "name":"Cambodia", "value":14305183, "color":"#eea638"},
            {"code":"CM" , "name":"Cameroon", "value":20030362, "color":"#de4c4f"},
            {"code":"CA" , "name":"Canada", "value":34349561, "color":"#a7a737"},
            {"code":"CV" , "name":"Cape Verde", "value":500585, "color":"#de4c4f"},
            {"code":"CF" , "name":"Central African Rep.", "value":4486837, "color":"#de4c4f"},
            {"code":"TD" , "name":"Chad", "value":11525496, "color":"#de4c4f"},
            {"code":"CL" , "name":"Chile", "value":17269525, "color":"#86a965"},
            {"code":"CN" , "name":"China", "value":1347565324, "color":"#eea638"},
            {"code":"CO" , "name":"Colombia", "value":46927125, "color":"#86a965"},
            {"code":"KM" , "name":"Comoros", "value":753943, "color":"#de4c4f"},
            {"code":"CD" , "name":"Congo, Dem. Rep.", "value":67757577, "color":"#de4c4f"},
            {"code":"CG" , "name":"Congo, Rep.", "value":4139748, "color":"#de4c4f"},
            {"code":"CR" , "name":"Costa Rica", "value":4726575, "color":"#a7a737"},
            {"code":"CI" , "name":"Cote d'Ivoire", "value":20152894, "color":"#de4c4f"},
            {"code":"HR" , "name":"Croatia", "value":4395560, "color":"#d8854f"},
            {"code":"CU" , "name":"Cuba", "value":11253665, "color":"#a7a737"},
            {"code":"CY" , "name":"Cyprus", "value":1116564, "color":"#d8854f"},
            {"code":"CZ" , "name":"Czech Rep.", "value":10534293, "color":"#d8854f"},
            {"code":"DK" , "name":"Denmark", "value":5572594, "color":"#d8854f"},
            {"code":"DJ" , "name":"Djibouti", "value":905564, "color":"#de4c4f"},
            {"code":"DO" , "name":"Dominican Rep.", "value":10056181, "color":"#a7a737"},
            {"code":"EC" , "name":"Ecuador", "value":14666055, "color":"#86a965"},
            {"code":"EG" , "name":"Egypt", "value":82536770, "color":"#de4c4f"},
            {"code":"SV" , "name":"El Salvador", "value":6227491, "color":"#a7a737"},
            {"code":"GQ" , "name":"Equatorial Guinea", "value":720213, "color":"#de4c4f"},
            {"code":"ER" , "name":"Eritrea", "value":5415280, "color":"#de4c4f"},
            {"code":"EE" , "name":"Estonia", "value":1340537, "color":"#d8854f"},
            {"code":"ET" , "name":"Ethiopia", "value":84734262, "color":"#de4c4f"},
            {"code":"FJ" , "name":"Fiji", "value":868406, "color":"#8aabb0"},
            {"code":"FI" , "name":"Finland", "value":5384770, "color":"#d8854f"},
            {"code":"FR" , "name":"France", "value":63125894, "color":"#d8854f"},
            {"code":"GA" , "name":"Gabon", "value":1534262, "color":"#de4c4f"},
            {"code":"GM" , "name":"Gambia", "value":1776103, "color":"#de4c4f"},
            {"code":"GE" , "name":"Georgia", "value":4329026, "color":"#d8854f"},
            {"code":"DE" , "name":"Germany", "value":82162512, "color":"#d8854f"},
            {"code":"GH" , "name":"Ghana", "value":24965816, "color":"#de4c4f"},
            {"code":"GR" , "name":"Greece", "value":11390031, "color":"#d8854f"},
            {"code":"GT" , "name":"Guatemala", "value":14757316, "color":"#a7a737"},
            {"code":"GN" , "name":"Guinea", "value":10221808, "color":"#de4c4f"},
            {"code":"GW" , "name":"Guinea-Bissau", "value":1547061, "color":"#de4c4f"},
            {"code":"GY" , "name":"Guyana", "value":756040, "color":"#86a965"},
            {"code":"HT" , "name":"Haiti", "value":10123787, "color":"#a7a737"},
            {"code":"HN" , "name":"Honduras", "value":7754687, "color":"#a7a737"},
            {"code":"HK" , "name":"Hong Kong, China", "value":7122187, "color":"#eea638"},
            {"code":"HU" , "name":"Hungary", "value":9966116, "color":"#d8854f"},
            {"code":"IS" , "name":"Iceland", "value":324366, "color":"#d8854f"},
            {"code":"IN" , "name":"India", "value":1241491960, "color":"#eea638"},
            {"code":"ID" , "name":"Indonesia", "value":242325638, "color":"#eea638"},
            {"code":"IR" , "name":"Iran", "value":74798599, "color":"#eea638"},
            {"code":"IQ" , "name":"Iraq", "value":32664942, "color":"#eea638"},
            {"code":"IE" , "name":"Ireland", "value":4525802, "color":"#d8854f"},
            {"code":"IL" , "name":"Israel", "value":7562194, "color":"#eea638"},
            {"code":"IT" , "name":"Italy", "value":60788694, "color":"#d8854f"},
            {"code":"JM" , "name":"Jamaica", "value":2751273, "color":"#a7a737"},
            {"code":"JP" , "name":"Japan", "value":126497241, "color":"#eea638"},
            {"code":"JO" , "name":"Jordan", "value":6330169, "color":"#eea638"},
            {"code":"KZ" , "name":"Kazakhstan", "value":16206750, "color":"#eea638"},
            {"code":"KE" , "name":"Kenya", "value":41609728, "color":"#de4c4f"},
            {"code":"KP" , "name":"Korea, Dem. Rep.", "value":24451285, "color":"#eea638"},
            {"code":"KR" , "name":"Korea, Rep.", "value":48391343, "color":"#eea638"},
            {"code":"KW" , "name":"Kuwait", "value":2818042, "color":"#eea638"},
            {"code":"KG" , "name":"Kyrgyzstan", "value":5392580, "color":"#eea638"},
            {"code":"LA" , "name":"Laos", "value":6288037, "color":"#eea638"},
            {"code":"LV" , "name":"Latvia", "value":2243142, "color":"#d8854f"},
            {"code":"LB" , "name":"Lebanon", "value":4259405, "color":"#eea638"},
            {"code":"LS" , "name":"Lesotho", "value":2193843, "color":"#de4c4f"},
            {"code":"LR" , "name":"Liberia", "value":4128572, "color":"#de4c4f"},
            {"code":"LY" , "name":"Libya", "value":6422772, "color":"#de4c4f"},
            {"code":"LT" , "name":"Lithuania", "value":3307481, "color":"#d8854f"},
            {"code":"LU" , "name":"Luxembourg", "value":515941, "color":"#d8854f"},
            {"code":"MK" , "name":"Macedonia, FYR", "value":2063893, "color":"#d8854f"},
            {"code":"MG" , "name":"Madagascar", "value":21315135, "color":"#de4c4f"},
            {"code":"MW" , "name":"Malawi", "value":15380888, "color":"#de4c4f"},
            {"code":"MY" , "name":"Malaysia", "value":28859154, "color":"#eea638"},
            {"code":"ML" , "name":"Mali", "value":15839538, "color":"#de4c4f"},
            {"code":"MR" , "name":"Mauritania", "value":3541540, "color":"#de4c4f"},
            {"code":"MU" , "name":"Mauritius", "value":1306593, "color":"#de4c4f"},
            {"code":"MX" , "name":"Mexico", "value":114793341, "color":"#a7a737"},
            {"code":"MD" , "name":"Moldova", "value":3544864, "color":"#d8854f"},
            {"code":"MN" , "name":"Mongolia", "value":2800114, "color":"#eea638"},
            {"code":"ME" , "name":"Montenegro", "value":632261, "color":"#d8854f"},
            {"code":"MA" , "name":"Morocco", "value":32272974, "color":"#de4c4f"},
            {"code":"MZ" , "name":"Mozambique", "value":23929708, "color":"#de4c4f"},
            {"code":"MM" , "name":"Myanmar", "value":48336763, "color":"#eea638"},
            {"code":"NA" , "name":"Namibia", "value":2324004, "color":"#de4c4f"},
            {"code":"NP" , "name":"Nepal", "value":30485798, "color":"#eea638"},
            {"code":"NL" , "name":"Netherlands", "value":16664746, "color":"#d8854f"},
            {"code":"NZ" , "name":"New Zealand", "value":4414509, "color":"#8aabb0"},
            {"code":"NI" , "name":"Nicaragua", "value":5869859, "color":"#a7a737"},
            {"code":"NE" , "name":"Niger", "value":16068994, "color":"#de4c4f"},
            {"code":"NG" , "name":"Nigeria", "value":162470737, "color":"#de4c4f"},
            {"code":"NO" , "name":"Norway", "value":4924848, "color":"#d8854f"},
            {"code":"OM" , "name":"Oman", "value":2846145, "color":"#eea638"},
            {"code":"PK" , "name":"Pakistan", "value":176745364, "color":"#eea638"},
            {"code":"PA" , "name":"Panama", "value":3571185, "color":"#a7a737"},
            {"code":"PG" , "name":"Papua New Guinea", "value":7013829, "color":"#8aabb0"},
            {"code":"PY" , "name":"Paraguay", "value":6568290, "color":"#86a965"},
            {"code":"PE" , "name":"Peru", "value":29399817, "color":"#86a965"},
            {"code":"PH" , "name":"Philippines", "value":94852030, "color":"#eea638"},
            {"code":"PL" , "name":"Poland", "value":38298949, "color":"#d8854f"},
            {"code":"PT" , "name":"Portugal", "value":10689663, "color":"#d8854f"},
            {"code":"PR" , "name":"Puerto Rico", "value":3745526, "color":"#a7a737"},
            {"code":"QA" , "name":"Qatar", "value":1870041, "color":"#eea638"},
            {"code":"RO" , "name":"Romania", "value":21436495, "color":"#d8854f"},
            {"code":"RU" , "name":"Russia", "value":142835555, "color":"#d8854f"},
            {"code":"RW" , "name":"Rwanda", "value":10942950, "color":"#de4c4f"},
            {"code":"SA" , "name":"Saudi Arabia", "value":28082541, "color":"#eea638"},
            {"code":"SN" , "name":"Senegal", "value":12767556, "color":"#de4c4f"},
            {"code":"RS" , "name":"Serbia", "value":9853969, "color":"#d8854f"},
            {"code":"SL" , "name":"Sierra Leone", "value":5997486, "color":"#de4c4f"},
            {"code":"SG" , "name":"Singapore", "value":5187933, "color":"#eea638"},
            {"code":"SK" , "name":"Slovak Republic", "value":5471502, "color":"#d8854f"},
            {"code":"SI" , "name":"Slovenia", "value":2035012, "color":"#d8854f"},
            {"code":"SB" , "name":"Solomon Islands", "value":552267, "color":"#8aabb0"},
            {"code":"SO" , "name":"Somalia", "value":9556873, "color":"#de4c4f"},
            {"code":"ZA" , "name":"South Africa", "value":50459978, "color":"#de4c4f"},
            {"code":"ES" , "name":"Spain", "value":46454895, "color":"#d8854f"},
            {"code":"LK" , "name":"Sri Lanka", "value":21045394, "color":"#eea638"},
            {"code":"SD" , "name":"Sudan", "value":34735288, "color":"#de4c4f"},
            {"code":"SR" , "name":"Suriname", "value":529419, "color":"#86a965"},
            {"code":"SZ" , "name":"Swaziland", "value":1203330, "color":"#de4c4f"},
            {"code":"SE" , "name":"Sweden", "value":9440747, "color":"#d8854f"},
            {"code":"CH" , "name":"Switzerland", "value":7701690, "color":"#d8854f"},
            {"code":"SY" , "name":"Syria", "value":20766037, "color":"#eea638"},
            {"code":"TW" , "name":"Taiwan", "value":23072000, "color":"#eea638"},
            {"code":"TJ" , "name":"Tajikistan", "value":6976958, "color":"#eea638"},
            {"code":"TZ" , "name":"Tanzania", "value":46218486, "color":"#de4c4f"},
            {"code":"TH" , "name":"Thailand", "value":69518555, "color":"#eea638"},
            {"code":"TG" , "name":"Togo", "value":6154813, "color":"#de4c4f"},
            {"code":"TT" , "name":"Trinidad and Tobago", "value":1346350, "color":"#a7a737"},
            {"code":"TN" , "name":"Tunisia", "value":10594057, "color":"#de4c4f"},
            {"code":"TR" , "name":"Turkey", "value":73639596, "color":"#d8854f"},
            {"code":"TM" , "name":"Turkmenistan", "value":5105301, "color":"#eea638"},
            {"code":"UG" , "name":"Uganda", "value":34509205, "color":"#de4c4f"},
            {"code":"UA" , "name":"Ukraine", "value":45190180, "color":"#d8854f"},
            {"code":"AE" , "name":"United Arab Emirates", "value":7890924, "color":"#eea638"},
            {"code":"GB" , "name":"United Kingdom", "value":62417431, "color":"#d8854f"},
            {"code":"US" , "name":"United States", "value":313085380, "color":"#a7a737"},
            {"code":"UY" , "name":"Uruguay", "value":3380008, "color":"#86a965"},
            {"code":"UZ" , "name":"Uzbekistan", "value":27760267, "color":"#eea638"},
            {"code":"VE" , "name":"Venezuela", "value":29436891, "color":"#86a965"},
            {"code":"PS" , "name":"West Bank and Gaza", "value":4152369, "color":"#eea638"},
            {"code":"VN" , "name":"Vietnam", "value":88791996, "color":"#eea638"},
            {"code":"YE" , "name":"Yemen, Rep.", "value":24799880, "color":"#eea638"},
            {"code":"ZM" , "name":"Zambia", "value":13474959, "color":"#de4c4f"},
            {"code":"ZW" , "name":"Zimbabwe", "value":12754378, "color":"#de4c4f"}];


        // get min and max values
        var minBulletSize = 3;
        var maxBulletSize = 70;
        var min = Infinity;
        var max = -Infinity;
        for ( var i = 0; i < mapData.length; i++ ) {
            var value = mapData[ i ].value;
            if ( value < min ) {
                min = value;
            }
            if ( value > max ) {
                max = value;
            }
        }

        // it's better to use circle square to show difference between values, not a radius
        var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
        var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

        // create circle for each country
        var images = [];
        for ( var i = 0; i < mapData.length; i++ ) {
            var dataItem = mapData[ i ];
            var value = dataItem.value;
            // calculate size of a bubble
            var square = ( value - min ) / ( max - min ) * ( maxSquare - minSquare ) + minSquare;
            if ( square < minSquare ) {
                square = minSquare;
            }
            var size = Math.sqrt( square / ( Math.PI * 2 ) );
            var id = dataItem.code;
            if ( value > 50000000 ) // for this example that's showing most active cities limit the results to 50M+ as value
                images.push( {
                    "type": "circle",
                    "theme": "light",

                    "width": size,
                    "height": size,
                    "color": dataItem.color,
                    "longitude": latlong[ id ].longitude,
                    "latitude": latlong[ id ].latitude,
                    "title": dataItem.name,
                    "value": value
                } );
        }

        // build map
        var map = AmCharts.makeChart( "worldcities", {
            "type": "map",
            "projection": "miller",
            "areasSettings": {
                //"unlistedAreasColor": "#000000",
                //"unlistedAreasAlpha": 0.1
            },
            "dataProvider": {
                "map": "worldLow",
                "images": images
            },
            "export": {
                "enabled": true
            }
        } );
        var chart2 = AmCharts.makeChart("hc3", {
            "theme": "none",
            "type": "serial",
            "dataProvider": [{
                "month": "January",
                "2015": 30.5,
                "2016": 40.2
            }, {
                "month": "February",
                "2015": 10.7,
                "2016": 30.1
            }, {
                "month": "March",
                "2015": 20.8,
                "2016": 20.9
            }, {
                "month": "April",
                "2015": 20.6,
                "2016": 20.3
            }, {
                "month": "May",
                "2015": 10.4,
                "2016": 20.1
            }, {
                "month": "June",
                "2015": 20.6,
                "2016": 40.9
            }, {
                "month": "July",
                "2015": 60.4,
                "2016": 70.2
            }, {
                "month": "August",
                "2015": 80,
                "2016": 85.1
            }],
            "valueAxes": [{
                "stackType": "3d",
                "unit": "%",
                "position": "left",
                "title": "Relative sales"
            }],
            "startDuration": 1,
            "graphs": [{
                "balloonText": "Sales vs. Target in [[category]] (2004): <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "title": "2015",
                "type": "column",
                "valueField": "2015"
            }, {
                "balloonText": "Sales vs. Target in [[category]] (2005): <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "title": "2016",
                "type": "column",
                "valueField": "2016"
            }],
            "plotAreaFillAlphas": 0.1,
            "depth3D": 60,
            "angle": 80,
            "categoryField": "month",
            "categoryAxis": {
                "gridPosition": "start"
            },
            "export": {
                "enabled": true
            }
        });
        AmCharts.makeChart( "chartdiv", {
            type: "map",
            "theme": "none",
            colorSteps: 10,
            dataProvider: {
                map: "usaLow",
                areas: [ {
                    id: "US-AL",
                    value: 4447100
                }, {
                    id: "US-AK",
                    value: 626932
                }, {
                    id: "US-AZ",
                    value: 5130632
                }, {
                    id: "US-AR",
                    value: 2673400
                }, {
                    id: "US-CA",
                    value: 33871648
                }, {
                    id: "US-CO",
                    value: 4301261
                }, {
                    id: "US-CT",
                    value: 3405565
                }, {
                    id: "US-DE",
                    value: 783600
                }, {
                    id: "US-FL",
                    value: 15982378
                }, {
                    id: "US-GA",
                    value: 8186453
                }, {
                    id: "US-HI",
                    value: 1211537
                }, {
                    id: "US-ID",
                    value: 1293953
                }, {
                    id: "US-IL",
                    value: 12419293
                }, {
                    id: "US-IN",
                    value: 6080485
                }, {
                    id: "US-IA",
                    value: 2926324
                }, {
                    id: "US-KS",
                    value: 2688418
                }, {
                    id: "US-KY",
                    value: 4041769
                }, {
                    id: "US-LA",
                    value: 4468976
                }, {
                    id: "US-ME",
                    value: 1274923
                }, {
                    id: "US-MD",
                    value: 5296486
                }, {
                    id: "US-MA",
                    value: 6349097
                }, {
                    id: "US-MI",
                    value: 9938444
                }, {
                    id: "US-MN",
                    value: 4919479
                }, {
                    id: "US-MS",
                    value: 2844658
                }, {
                    id: "US-MO",
                    value: 5595211
                }, {
                    id: "US-MT",
                    value: 902195
                }, {
                    id: "US-NE",
                    value: 1711263
                }, {
                    id: "US-NV",
                    value: 1998257
                }, {
                    id: "US-NH",
                    value: 1235786
                }, {
                    id: "US-NJ",
                    value: 8414350
                }, {
                    id: "US-NM",
                    value: 1819046
                }, {
                    id: "US-NY",
                    value: 18976457
                }, {
                    id: "US-NC",
                    value: 8049313
                }, {
                    id: "US-ND",
                    value: 642200
                }, {
                    id: "US-OH",
                    value: 11353140
                }, {
                    id: "US-OK",
                    value: 3450654
                }, {
                    id: "US-OR",
                    value: 3421399
                }, {
                    id: "US-PA",
                    value: 12281054
                }, {
                    id: "US-RI",
                    value: 1048319
                }, {
                    id: "US-SC",
                    value: 4012012
                }, {
                    id: "US-SD",
                    value: 754844
                }, {
                    id: "US-TN",
                    value: 5689283
                }, {
                    id: "US-TX",
                    value: 20851820
                }, {
                    id: "US-UT",
                    value: 2233169
                }, {
                    id: "US-VT",
                    value: 608827
                }, {
                    id: "US-VA",
                    value: 7078515
                }, {
                    id: "US-WA",
                    value: 5894121
                }, {
                    id: "US-WV",
                    value: 1808344
                }, {
                    id: "US-WI",
                    value: 5363675
                }, {
                    id: "US-WY",
                    value: 493782
                } ]
            },
            areasSettings: {
                autoZoom: true
            },
            valueLegend: {
                right: 10,
                minValue: "under 1K",
                maxValue: "over 100K"
            },
            "export": {
                "enabled": true
            }
        });
        angular.element('.chart-input').off().on('input change',function() {
            var property	= angular.element(this).data('property');
            var target		= chart;
            chart.startDuration = 0;
            if ( property == 'topRadius') {
                target = chart.graphs[0];
                if ( this.value == 0 ) {
                    this.value = undefined;
                }
            }
            target[property] = this.value;
            chart.validateNow();
        });
    }
    dashGeneralController.$inject = ['$timeout'];
    function dashGeneralController($timeout) {
        var vm = this;
        var defaultColor = $('.default-background').css('background-color'),
            firstComplementary = $('.first-complementary-bg').css('background-color'),
            secondComplementary = $('.second-complementary-bg').css('background-color'),
            thirdComplementary = $('.third-complementary-bg').css('background-color'),
            chart1 = $('#small-chart1'),
            chart2 = $('#small-chart2'),
            chart3 = $('#small-chart3'),
            chart4 = $('#small-chart4')
            ;
        $('body').on('classChange', function(){
            updateChartsColors();
            showDistanceChart();
            showYearlyChart();
        });
        function colorLuminance(hex, lum) {
            if ( hex.indexOf('#') == 0 ) {
                // validate hex string
                hex = String(hex).replace(/[^0-9a-f]/gi, '');
                if (hex.length < 6) {
                    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
                }
                lum = lum || 0;
                // convert to decimal and change luminosity
                var rgb = "#", c, i;
                for (i = 0; i < 3; i++) {
                    c = parseInt(hex.substr(i*2,2), 16);
                    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                    rgb += ("00"+c).substr(c.length);
                }

                return rgb;
            } else {
                return 'rgba(' + hex.replace('rgb(','').replace(')','') + ',' + ( 1 + lum ) + ')';
            }
        }
        function updateChartsColors() {
            defaultColor = $('.default-background').css('background-color');
            firstComplementary = $('.first-complementary-bg').css('background-color');
            secondComplementary = $('.second-complementary-bg').css('background-color');
            thirdComplementary = $('.third-complementary-bg').css('background-color');
            chart1.css('background', 'linear-gradient(to right, ' + firstComplementary + ' 50%, ' + colorLuminance( firstComplementary, -0.2 ) +' 50%)');
            chart2.css('background', 'linear-gradient(to right, ' + secondComplementary + ' 50%, ' + colorLuminance( secondComplementary, -0.2 ) +' 50%)');
            chart3.css('background', 'linear-gradient(to right, ' + thirdComplementary + ' 50%, ' + colorLuminance( thirdComplementary, -0.2 ) +' 50%)');
            chart4.css('background', 'linear-gradient(to right, ' + defaultColor + ' 50%, ' + colorLuminance( defaultColor, -0.2 ) +' 50%)');
        }
        function showDistanceChart(){
            var chartData = [
                {
                    "date": "2012-01-01",
                    "distance": 227,
                    "townName": "New York",
                    "townName2": "New York",
                    "townSize": 25,
                    "latitude": 40.71,
                    "duration": 408
                },
                {
                    "date": "2012-01-02",
                    "distance": 371,
                    "townName": "Washington",
                    "townSize": 14,
                    "latitude": 38.89,
                    "duration": 482
                }/*,
                {
                    "date": "2012-01-03",
                    "distance": 433,
                    "townName": "Wilmington",
                    "townSize": 6,
                    "latitude": 34.22,
                    "duration": 562
                }*/
            ];
            var valueAxes = [];
            if( window.innerWidth > 678 ) {
                valueAxes = valueAxes.concat([
                    {
                        id: "a1",
                        title: "distance",
                        gridAlpha: 0,
                        axisAlpha: 0
                    },{
                        id: "a2",
                        position: "right",
                        gridAlpha: 0,
                        axisAlpha: 0,
                        labelsEnabled: false
                    },{
                        id: "a3",
                        title: "duration",
                        position: "right",
                        gridAlpha: 0,
                        axisAlpha: 0,
                        inside: true,
                        duration: "mm",
                        durationUnits: {
                            DD: "d. ",
                            hh: "h ",
                            mm: "min",
                            ss: ""
                        }
                }]);
                chartData = chartData.concat( [
                    {
                        "date": "2012-01-04",
                        "distance": 345,
                        "townName": "Jacksonville",
                        "townSize": 7,
                        "latitude": 30.35,
                        "duration": 379
                    },
                    {
                        "date": "2012-01-05",
                        "distance": 480,
                        "townName": "Miami",
                        "townName2": "Miami",
                        "townSize": 10,
                        "latitude": 25.83,
                        "duration": 501
                    },
                    {
                        "date": "2012-01-06",
                        "distance": 386,
                        "townName": "Tallahassee",
                        "townSize": 7,
                        "latitude": 30.46,
                        "duration": 443
                    },
                    {
                        "date": "2012-01-07",
                        "distance": 348,
                        "townName": "New Orleans",
                        "townSize": 10,
                        "latitude": 29.94,
                        "duration": 405
                    },
                    {
                        "date": "2012-01-08",
                        "distance": 238,
                        "townName": "Houston",
                        "townName2": "Houston",
                        "townSize": 16,
                        "latitude": 29.76,
                        "duration": 309
                    },
                    {
                        "date": "2012-01-09",
                        "distance": 218,
                        "townName": "Dallas",
                        "townSize": 17,
                        "latitude": 32.8,
                        "duration": 287
                    },
                    {
                        "date": "2012-01-10",
                        "distance": 349,
                        "townName": "Oklahoma City",
                        "townSize": 11,
                        "latitude": 35.49,
                        "duration": 485
                    },
                    {
                        "date": "2012-01-11"
                    },
                    {
                        "date": "2012-01-12"
                    }]);
            }
            AmCharts.makeChart("chartdiv", {
                color: '#ffffff',
                type: "serial",
                dataDateFormat: "YYYY-MM-DD",
                dataProvider: chartData,
                gridColor: '#ffffff',
                addClassNames: true,
                startDuration: 1,
                marginLeft: 0,

                categoryField: "date",
                categoryAxis: {
                    axisColor: '#ffffff',
                    parseDates: true,
                    minPeriod: "DD",
                    autoGridCount: false,
                    gridCount: 50,
                    gridAlpha: 0.3,
                    gridColor: '#ffffff',
                    dateFormats: [{
                        period: 'DD',
                        format: 'DD'
                    }, {
                        period: 'WW',
                        format: 'MMM DD'
                    }, {
                        period: 'MM',
                        format: 'MMM'
                    }, {
                        period: 'YYYY',
                        format: 'YYYY'
                    }]
                },

                valueAxes: valueAxes,
                graphs: [{
                    id: "g1",
                    valueField:  "distance",
                    title:  "distance",
                    type:  "column",
                    fillAlphas:  0.9,
                    valueAxis:  "a1",
                    balloonText:  "[[value]] miles",
                    legendValueText:  "[[value]] mi",
                    alphaField:  "alpha",
                    fillColors: 'rgba(255,255,255,0.4)',
                    lineColor: '#ffffff' //firstComplementary
                },{
                    id: "g2",
                    valueField: "latitude",
                    classNameField: "bulletClass",
                    title: "latitude/city",
                    type: "line",
                    valueAxis: "a2",
                    lineColor: '#DBF8FF', //thirdComplementary,
                    color: "#ffffff",
                    lineThickness: 1,
                    legendValueText: "[[value]]/[[description]]",
                    descriptionField: "townName",
                    bullet: "round",
                    bulletSizeField: "townSize",
                    bulletBorderColor: "#cabea9",
                    bulletBorderAlpha: 1,
                    bulletBorderThickness: 2,
                    bulletColor: '#DBF8FF', //thirdComplementary,
                    labelText: "[[townName2]]",
                    labelPosition: "right",
                    balloonText: "latitude:[[value]]",
                    showBalloon: true,
                    animationPlayed: true
                },{
                    id: "g3",
                    title: "duration",
                    valueField: "duration",
                    type: "line",
                    valueAxis: "a3",
                    lineColor: '#9CF8FF', // secondComplementary,
                    balloonText: "[[value]]",
                    lineThickness: 1,
                    legendValueText: "[[value]]",
                    bullet: "square",
                    bulletBorderColor: '#9CF8FF', //secondComplementary,
                    bulletBorderThickness: 1,
                    bulletBorderAlpha: 1,
                    dashLengthField: "dashLength",
                    animationPlayed: true
                }],
                chartCursor: {
                    zoomable: false,
                    categoryBalloonDateFormat: "DD",
                    cursorAlpha: 0,
                    cursorColor:  '#2AF3FF', //firstComplementary,
                    valueBalloonsEnabled: false
                },
                legend: {
                    color: '#ffffff',
                    bulletType: "round",
                    equalWidths: true,
                    valueWidth: 150,
                    useGraphSettings: true
                }
            });
        }
        function showYearlyChart(){
            AmCharts.makeChart("chartdiv2", {
                "color": "#ffffff",
                "type": "serial",
                "theme": "light",
                "categoryField": "year",
                "rotate": true,
                "startDuration": 1,
                "categoryAxis": {
                    "axisColor": '#ffffff',
                    "gridPosition": "start",
                    gridColor: '#ffffff',
                    "position": "left"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "Income:[[value]]",
                        "fillAlphas": 0.8,
                        "id": "AmGraph-1",
                        "lineAlpha": 0.5,
                        "title": "Income",
                        "type": "column",
                        "valueField": "income",
                        fillColors: 'rgba(255,255,255,0.4)',
                        "lineColor": '#ffffff'
                    },
                    {
                        "balloonText": "Expenses:[[value]]",
                        "fillAlphas": 0.8,
                        "id": "AmGraph-2",
                        "lineAlpha": 0.5,
                        "title": "Expenses",
                        "type": "column",
                        "valueField": "expenses",
                        fillColors: 'rgba(255,255,255,0.6)',
                        lineColor: '#ffffff'// secondComplementary
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "position": "top",
                        "axisAlpha": 0,
                        gridColor: '#ffffff'
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": [
                    {
                        "year": 2005,
                        "income": 23.5,
                        "expenses": 18.1
                    },
                    {
                        "year": 2006,
                        "income": 26.2,
                        "expenses": 22.8
                    },
                    {
                        "year": 2007,
                        "income": 30.1,
                        "expenses": 23.9
                    },
                    {
                        "year": 2008,
                        "income": 29.5,
                        "expenses": 25.1
                    },
                    {
                        "year": 2009,
                        "income": 24.6,
                        "expenses": 25
                    }
                ],
                "export": {
                    "enabled": true
                }
            });
        }
        setTimeout(function() {
            sparkBar('#smc1', [6,4,8,6,5,6,7,8,3,5,9,5,8,4,3,6,8], '45px', 3, '#fff', 2);
            sparkBar('#smc2', [4,7,6,2,5,3,8,6,6,4,8,6,5,8,2,4,6], '45px', 3, '#fff', 2);
            sparkLine('#smc3', [9,4,6,5,6,4,5,7,9,3,6,5], 85, 45, '#fff', 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
            sparkLine('#smc4', [5,6,3,9,7,5,4,6,5,6,4,9], 85, 45, '#fff', 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
            updateChartsColors();
            showYearlyChart();
            showDistanceChart();
        }, 500);
        $(window).on('resize', function(){
            showDistanceChart();
        });
        var signupData = {
            names: ["Jonathon Locicero", "Madalyn Shahid", "Millie Brummond", "Loreta Puccio", "Joeann Hairston", "Blanca Hovland", "Joan Outten", "Sierra Shepard", "Jacqueline Mallari", "Joyce Perrino", "Leandra Jarrells", "Santa Groves", "Joselyn Lydick", "Laverna Bogner", "Stanton Newcomb"],
            lastUsedName: 0,
            profileImages: ["../assets/images/profile/128.jpg", "../assets/images/profile/129.jpg","../assets/images/profile/130.jpg","../assets/images/profile/131.jpg", "../assets/images/profile/blog1.jpg", "../assets/images/profile/blog2.jpg", "../assets/images/profile/blog3.jpg", "../assets/images/profile/blog4.jpg"],
            lastProfileImage: 0,
            pages: [ 'New order', 'Lunch at noon', 'Business opp...', 'New order', 'Supplier issue', 'New order', 'Insurance claim' ],
            lastPage: 0,
            cities: ["Northfair", "Nashua", "Tripoli", "Kingston", "Orland Park", "Castries", "New Dorp", "Canarsie", "West Covina", "Merced", "Pasadena", "Walker", "Atkinson", "Oranjestad", "Killearn Estates", "Tehran", "Bujumbura", "Dale City", "Mesa", "Kettering", "Mentor", "Missouri City", "Santa Barbara", "Lincoln"],
            lastUsedCity: 0
        };
        function newSignUp( nrOfUsers ){
            nrOfUsers = nrOfUsers || 1;
            setTimeout( function(){
                for( var i = 0; i < nrOfUsers; i++ ) {
                    !(signupData.lastUsedName < signupData.names.length) ? signupData.lastUsedName = 0 : null;
                    !(signupData.lastProfileImage < signupData.profileImages.length) ? signupData.lastProfileImage = 0 : null;
                    !(signupData.lastUsedCity < signupData.cities.length) ? signupData.lastUsedCity = 0 : null;
                    !(signupData.lastPage < signupData.pages.length) ? signupData.lastPage = 0 : null;
                    angular.element('#signup-feed2').prepend(
                        '<div class="collection-item avatar new" style="display: none">' +
                            '<img src="' + signupData.profileImages[signupData.lastProfileImage] +'" alt="" class="circle responsive-img">' +
                            '<span class="title">' + signupData.names[signupData.lastUsedName] + '</span>' +
                            '<span class="badge hide-on-small-only"><small>' + signupData.pages[signupData.lastPage ] + '</small></span>' +
                            '<p>' + signupData.cities[signupData.lastUsedCity] + ', USA</p>' +
                            '<p class="grey-text hide-on-med-and-up">' + signupData.pages[signupData.lastPage ] + '</p>' +
                            '</div>'
                    ).find('.new').slideDown('fast');
                    signupData.lastUsedName++;
                    signupData.lastProfileImage++;
                    signupData.lastUsedCity++;
                    signupData.lastPage++;
                }
                newSignUp();
            }, nrOfUsers == 1 ? ( Math.floor(Math.random() * (4000 - 1500 + 1)) + 1500 ) : 0 );
        }
        newSignUp( 10 );
    }
    function dashSalesController() {
        var vm = this;
        vm.color = '#b02e67';
        if ( ThemeSettings.getCookie('color-scheme') == 'blue' ) {
            vm.color  = '#1565c0'
        } else if ( ThemeSettings.getCookie('color-scheme') == 'dark' ) {
            vm.color  = '#2e2e2e';
        }
        sparkBar('#smc1', [6,4,8,6,5,6,7,8,3,5,9,5,8,4,3,6,8], '45px', 3,  vm.color , 2);
        sparkBar('#smc2', [4,7,6,5,3,8,6,8,4,6], '45px', 3, vm.color, 2);
        sparkLine('#smc3', [9,4,6,5,6,4,5,7,9,3,6,5], 85, 45,  vm.color , 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
        sparkLine('#smc4', [5,6,3,9,7,5,4,6,5,6,4,9], 85, 45, vm.color, 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
        AmCharts.makeChart( "chartdiv", {
            type: "map",
            "theme": "none",

            colorSteps: 10,
            dataProvider: {
                map: "usaLow",
                areas: [ {
                    id: "US-AL",
                    value: 4447100
                }, {
                    id: "US-AK",
                    value: 626932
                }, {
                    id: "US-AZ",
                    value: 5130632
                }, {
                    id: "US-AR",
                    value: 2673400
                }, {
                    id: "US-CA",
                    value: 33871648
                }, {
                    id: "US-CO",
                    value: 4301261
                }, {
                    id: "US-CT",
                    value: 3405565
                }, {
                    id: "US-DE",
                    value: 783600
                }, {
                    id: "US-FL",
                    value: 15982378
                }, {
                    id: "US-GA",
                    value: 8186453
                }, {
                    id: "US-HI",
                    value: 1211537
                }, {
                    id: "US-ID",
                    value: 1293953
                }, {
                    id: "US-IL",
                    value: 12419293
                }, {
                    id: "US-IN",
                    value: 6080485
                }, {
                    id: "US-IA",
                    value: 2926324
                }, {
                    id: "US-KS",
                    value: 2688418
                }, {
                    id: "US-KY",
                    value: 4041769
                }, {
                    id: "US-LA",
                    value: 4468976
                }, {
                    id: "US-ME",
                    value: 1274923
                }, {
                    id: "US-MD",
                    value: 5296486
                }, {
                    id: "US-MA",
                    value: 6349097
                }, {
                    id: "US-MI",
                    value: 9938444
                }, {
                    id: "US-MN",
                    value: 4919479
                }, {
                    id: "US-MS",
                    value: 2844658
                }, {
                    id: "US-MO",
                    value: 5595211
                }, {
                    id: "US-MT",
                    value: 902195
                }, {
                    id: "US-NE",
                    value: 1711263
                }, {
                    id: "US-NV",
                    value: 1998257
                }, {
                    id: "US-NH",
                    value: 1235786
                }, {
                    id: "US-NJ",
                    value: 8414350
                }, {
                    id: "US-NM",
                    value: 1819046
                }, {
                    id: "US-NY",
                    value: 18976457
                }, {
                    id: "US-NC",
                    value: 8049313
                }, {
                    id: "US-ND",
                    value: 642200
                }, {
                    id: "US-OH",
                    value: 11353140
                }, {
                    id: "US-OK",
                    value: 3450654
                }, {
                    id: "US-OR",
                    value: 3421399
                }, {
                    id: "US-PA",
                    value: 12281054
                }, {
                    id: "US-RI",
                    value: 1048319
                }, {
                    id: "US-SC",
                    value: 4012012
                }, {
                    id: "US-SD",
                    value: 754844
                }, {
                    id: "US-TN",
                    value: 5689283
                }, {
                    id: "US-TX",
                    value: 20851820
                }, {
                    id: "US-UT",
                    value: 2233169
                }, {
                    id: "US-VT",
                    value: 608827
                }, {
                    id: "US-VA",
                    value: 7078515
                }, {
                    id: "US-WA",
                    value: 5894121
                }, {
                    id: "US-WV",
                    value: 1808344
                }, {
                    id: "US-WI",
                    value: 5363675
                }, {
                    id: "US-WY",
                    value: 493782
                } ]
            },

            areasSettings: {
                autoZoom: true
            },
            valueLegend: {
                right: 10,
                minValue: "under 1K",
                maxValue: "over 100K"
            },
            "export": {
                "enabled": true
            }
        });
        var chart2 = AmCharts.makeChart("hc3", {
            "theme": "none",
            "type": "serial",
            "dataProvider": [{
                "month": "January",
                "2015": 30.5,
                "2016": 40.2
            }, {
                "month": "February",
                "2015": 10.7,
                "2016": 30.1
            }, {
                "month": "March",
                "2015": 20.8,
                "2016": 20.9
            }, {
                "month": "April",
                "2015": 20.6,
                "2016": 20.3
            }, {
                "month": "May",
                "2015": 10.4,
                "2016": 20.1
            }, {
                "month": "June",
                "2015": 20.6,
                "2016": 40.9
            }, {
                "month": "July",
                "2015": 60.4,
                "2016": 70.2
            }, {
                "month": "August",
                "2015": 80,
                "2016": 85.1
            }],
            "valueAxes": [{
                "stackType": "3d",
                "unit": "%",
                "position": "left",
                "title": "Relative sales"
            }],
            "startDuration": 1,
            "graphs": [{
                "balloonText": "Sales vs. Target in [[category]] (2004): <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "title": "2015",
                "type": "column",
                "valueField": "2015"
            }, {
                "balloonText": "Sales vs. Target in [[category]] (2005): <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "title": "2016",
                "type": "column",
                "valueField": "2016"
            }],
            "plotAreaFillAlphas": 0.1,
            "depth3D": 60,
            "angle": 80,
            "categoryField": "month",
            "categoryAxis": {
                "gridPosition": "start"
            },
            "export": {
                "enabled": true
            }
        });
        jQuery('.chart-input').off().on('input change',function() {
            var property	= jQuery(this).data('property');
            var target		= chart;
            chart.startDuration = 0;

            if ( property == 'topRadius') {
                target = chart.graphs[0];
                if ( this.value == 0 ) {
                    this.value = undefined;
                }
            }
            target[property] = this.value;
            chart.validateNow();
        });


    }
    dashServerController.$inject = ['$timeout'];
    function dashServerController($timeout) {
        var vm = this;
        var data = [],totalPoints = 300;
        vm.getRandomData = function () {
            if (data.length > 0)
                data = data.slice(1);
            // Do a random walk
            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;
                if (y < 0) {
                    y = 0;
                } else if (y > 50) {
                    y = 50;
                }
                data.push(y);
            }
            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        };
        // Set up the control widget
        vm.updateInterval = 50;
        vm.plot = $.plot("#flot1", [ vm.getRandomData() ], {
            series: {
                shadowSize: 0	// Drawing is faster without shadows
            },
            yaxis: {
                min: 0,
                max: 100
            },
            xaxis: {
                show: false
            }
        });
        vm.update = function() {
            vm.plot.setData([vm.getRandomData()]);
            // Since the axes don't change, we don't need to call plot.setupGrid()
            vm.plot.draw();
            $timeout(vm.update, vm.updateInterval);
        }
        vm.update();
        vm.generateChartData = function() {
            var chartData = [];
            var firstDate = new Date( 2012, 0, 1 );
            firstDate.setDate( firstDate.getDate() - 1000 );
            firstDate.setHours( 0, 0, 0, 0 );
            for ( var i = 0; i < 1000; i++ ) {
                var newDate = new Date( firstDate );
                newDate.setHours( 0, i, 0, 0 );
                var a = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
                var b = Math.round( Math.random() * 10000 );
                chartData.push( {
                    date: newDate,
                    value: a,
                    volume: b
                } );
            }
            return chartData;
        };
        AmCharts.makeChart( "visitchart", {
            "type": "stock",
            "theme": "light",
            "categoryAxesSettings": {
                "minPeriod": "mm"
            },
            "dataSets": [ {
                "color": "#b0de09",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                } ],

                "dataProvider": vm.generateChartData(),
                "categoryField": "date"
            } ],
            "panels": [ {
                "showCategoryAxis": false,
                "title": "Revenue generated",
                "percentHeight": 70,
                "stockGraphs": [ {
                    "id": "g1",
                    "valueField": "value",
                    "type": "smoothedLine",
                    "lineThickness": 2,
                    "bullet": "round"
                } ],
                "stockLegend": {
                    "valueTextRegular": " ",
                    "markerType": "none"
                }
            } ],
            "chartScrollbarSettings": {
                "graph": "g1",
                "usePeriod": "10mm",
                "position": "top"
            },
            "chartCursorSettings": {
                "valueBalloonsEnabled": true
            },
            "periodSelector": {
                "position": "",
                "dateFormat": "YYYY-MM-DD JJ:NN",
                "inputFieldWidth": 150,
                "periods": [ {
                    "period": "hh",
                    "count": 1,
                    "label": "1 hour",
                    "selected": true
                }, {
                    "period": "hh",
                    "count": 2,
                    "label": "2 hours"
                }, {
                    "period": "hh",
                    "count": 5,
                    "label": "5 hour"
                }, {
                    "period": "hh",
                    "count": 12,
                    "label": "12 hours"
                }, {
                    "period": "MAX",
                    "label": "MAX"
                } ]
            },
            "panelsSettings": {
                "usePrefixes": true
            },
            "export": {
                "enabled": true,
                "position": "bottom-right"
            }
        });
        vm.signUpData = {
            names: ["Jonathon Locicero", "Madalyn Shahid", "Millie Brummond", "Loreta Puccio", "Joeann Hairston", "Blanca Hovland", "Joan Outten", "Sierra Shepard", "Jacqueline Mallari", "Joyce Perrino", "Leandra Jarrells", "Santa Groves", "Joselyn Lydick", "Laverna Bogner", "Stanton Newcomb"],
            lastUsedName: 0,
            profileImages: ["../assets/images/profile/128.jpg", "../assets/images/profile/129.jpg","../assets/images/profile/130.jpg","../assets/images/profile/131.jpg", "../assets/images/profile/blog1.jpg", "../assets/images/profile/blog2.jpg", "../assets/images/profile/blog3.jpg", "../assets/images/profile/blog4.jpg"],
            lastProfileImage: 0,
            pages: [ '/profile', '/sports-ware', '/gadgets', '/graphics-cards', '/gift-vouchers', '/contact', '/shopping-cart', '/review-order', '/city-breaks', '/dashboard' ],
            lastPage: 0,
            cities: ["Northfair", "Nashua", "Tripoli", "Kingston", "Orland Park", "Castries", "New Dorp", "Canarsie", "West Covina", "Merced", "Pasadena", "Walker", "Atkinson", "Oranjestad", "Killearn Estates", "Tehran", "Bujumbura", "Dale City", "Mesa", "Kettering", "Mentor", "Missouri City", "Santa Barbara", "Lincoln"],
            lastUsedCity: 0
        };
        vm.newSignUp = function( nrOfUsers ){
            nrOfUsers = nrOfUsers || 1;
            $timeout( function(){
                for( var i = 0; i < nrOfUsers; i++ ) {
                    !(vm.signUpData.lastUsedName < vm.signUpData.names.length) ? vm.signUpData.lastUsedName = 0 : null;
                    !(vm.signUpData.lastProfileImage < vm.signUpData.profileImages.length) ? vm.signUpData.lastProfileImage = 0 : null;
                    !(vm.signUpData.lastUsedCity < vm.signUpData.cities.length) ? vm.signUpData.lastUsedCity = 0 : null;
                    !(vm.signUpData.lastPage < vm.signUpData.pages.length) ? vm.signUpData.lastPage = 0 : null;
                    angular.element('#signup-feed1').prepend(
                        '<div class="collection-item avatar new" style="display: none">' +
                            '<img src="' + vm.signUpData.profileImages[vm.signUpData.lastProfileImage] +'" alt="" class="circle responsive-img">' +
                            '<span class="title">' + vm.signUpData.names[vm.signUpData.lastUsedName] + '</span>' +
                            '<span class="badge hide-on-small-only"><small>' + vm.signUpData.pages[vm.signUpData.lastPage ] + '</small></span>' +
                            '<p>' + vm.signUpData.cities[vm.signUpData.lastUsedCity] + ', USA</p>' +
                            '<p class="grey-text hide-on-med-and-up">' +  vm.signUpData.pages[vm.signUpData.lastPage ] + '</p>' +
                            '</div>'
                    ).find('.new').slideDown('fast');
                    vm.signUpData.lastUsedName++;
                    vm.signUpData.lastProfileImage++;
                    vm.signUpData.lastUsedCity++;
                    vm.signUpData.lastPage++;
                }
                vm.newSignUp();
            }, nrOfUsers == 1 ? ( Math.floor(Math.random() * (3000 - 500 + 1)) + 500 ) : 0 );
        };
        vm.newSignUp( 10 );
    }
    dashSocialController.$inject = ['$translate'];
    function dashSocialController($translate) {
        var vm = this;
        vm.vasile='Ion';
    }
    function chartsAmChartsController() {
        var vm = this;
        // svg path for target icon
        vm.targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
        // svg path for plane icon
        vm.planeSVG = "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";
        AmCharts.makeChart("mapdiv", {
            type: "map",
            addClassNames: true,
            dataProvider: {
                map: "worldLow",
                getAreasFromMap: true,
                linkToObject: "london",
                images: [{
                    id: "london",
                    color: "#000000",
                    type: "circle",
                    title: "London",
                    latitude: 51.5002,
                    longitude: -0.1262,
                    scale: 1.5,
                    zoomLevel: 2.74,
                    zoomLongitude: -20.1341,
                    zoomLatitude: 49.1712,
                    lines: [{
                        latitudes: [51.5002, 50.4422],
                        longitudes: [-0.1262, 30.5367]
                    }, {
                        latitudes: [51.5002, 46.9480],
                        longitudes: [-0.1262, 7.4481]
                    }, {
                        latitudes: [51.5002, 59.3328],
                        longitudes: [-0.1262, 18.0645]
                    }, {
                        latitudes: [51.5002, 40.4167],
                        longitudes: [-0.1262, -3.7033]
                    }, {
                        latitudes: [51.5002, 46.0514],
                        longitudes: [-0.1262, 14.5060]
                    }, {
                        latitudes: [51.5002, 48.2116],
                        longitudes: [-0.1262, 17.1547]
                    }, {
                        latitudes: [51.5002, 44.8048],
                        longitudes: [-0.1262, 20.4781]
                    }, {
                        latitudes: [51.5002, 55.7558],
                        longitudes: [-0.1262, 37.6176]
                    }, {
                        latitudes: [51.5002, 38.7072],
                        longitudes: [-0.1262, -9.1355]
                    }, {
                        latitudes: [51.5002, 54.6896],
                        longitudes: [-0.1262, 25.2799]
                    }, {
                        latitudes: [51.5002, 64.1353],
                        longitudes: [-0.1262, -21.8952]
                    }, {
                        latitudes: [51.5002, 40.4300],
                        longitudes: [-0.1262, -74.0000]
                    }],
                    images: [{
                        label: "Flights from London",
                        svgPath: vm.planeSVG,
                        left: 100,
                        top: 45,
                        labelShiftY: 5,
                        color: "#CC0000",
                        labelColor: "#CC0000",
                        labelRollOverColor: "#CC0000",
                        labelFontSize: 20
                    }, {
                        label: "show flights from Vilnius",
                        left: 106,
                        top: 70,
                        labelColor: "#000000",
                        labelRollOverColor: "#CC0000",
                        labelFontSize: 11,
                        linkToObject: "vilnius"
                    }]
                },
                    {
                        id: "vilnius",
                        color: "#000000",
                        svgPath: vm.targetSVG,
                        title: "Vilnius",
                        latitude: 54.6896,
                        longitude: 25.2799,
                        scale: 1.5,
                        zoomLevel: 4.92,
                        zoomLongitude: 15.4492,
                        zoomLatitude: 50.2631,
                        lines: [{
                            latitudes: [54.6896, 50.8371],
                            longitudes: [25.2799, 4.3676],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 59.9138],
                            longitudes: [25.2799, 10.7387],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 40.4167],
                            longitudes: [25.2799, -3.7033],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 50.0878],
                            longitudes: [25.2799, 14.4205],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 48.2116],
                            longitudes: [25.2799, 17.1547],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 44.8048],
                            longitudes: [25.2799, 20.4781],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 55.7558],
                            longitudes: [25.2799, 37.6176],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 37.9792],
                            longitudes: [25.2799, 23.7166],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 54.6896],
                            longitudes: [25.2799, 25.2799],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 51.5002],
                            longitudes: [25.2799, -0.1262],
                            color: "#00cc00"
                        }, {
                            latitudes: [54.6896, 53.3441],
                            longitudes: [25.2799, -6.2675],
                            color: "#00cc00"
                        }],
                        images: [{
                            label: "Flights from Vilnius",
                            svgPath: vm.planeSVG,
                            left: 100,
                            top: 45,
                            labelShiftY: 5,
                            color: "#CC0000",
                            labelColor: "#CC0000",
                            labelRollOverColor: "#CC0000",
                            labelFontSize: 20
                        }, {
                            label: "show flights from London",
                            left: 106,
                            top: 70,
                            labelColor: "#000000",
                            labelRollOverColor: "#CC0000",
                            labelFontSize: 11,
                            linkToObject: "london"
                        }]
                    }, {
                        svgPath: vm.targetSVG,
                        title: "Brussels",
                        latitude: 50.8371,
                        longitude: 4.3676
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Prague",
                        latitude: 50.0878,
                        longitude: 14.4205
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Athens",
                        latitude: 37.9792,
                        longitude: 23.7166
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Reykjavik",
                        latitude: 64.1353,
                        longitude: -21.8952
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Dublin",
                        latitude: 53.3441,
                        longitude: -6.2675
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Oslo",
                        latitude: 59.9138,
                        longitude: 10.7387
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Lisbon",
                        latitude: 38.7072,
                        longitude: -9.1355
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Moscow",
                        latitude: 55.7558,
                        longitude: 37.6176
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Belgrade",
                        latitude: 44.8048,
                        longitude: 20.4781
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Bratislava",
                        latitude: 48.2116,
                        longitude: 17.1547
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Ljubljana",
                        latitude: 46.0514,
                        longitude: 14.5060
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Madrid",
                        latitude: 40.4167,
                        longitude: -3.7033
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Stockholm",
                        latitude: 59.3328,
                        longitude: 18.0645
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Bern",
                        latitude: 46.9480,
                        longitude: 7.4481
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Kiev",
                        latitude: 50.4422,
                        longitude: 30.5367
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "Paris",
                        latitude: 48.8567,
                        longitude: 2.3510
                    }, {
                        svgPath:  vm.targetSVG,
                        title: "New York",
                        latitude: 40.43,
                        longitude: -74
                    }
                ]
            },
            areasSettings: {
                unlistedAreasColor: "#FFCC00"
            },
            imagesSettings: {
                color: "#CC0000",
                rollOverColor: "#CC0000",
                selectedColor: "#000000"
            },
            linesSettings: {
                color: "#CC0000",
                alpha: 0.4
            },
            backgroundZoomsToTop: true,
            linesAboveImages: true
        });
        /*
         * This demo illustrates real-time data updates from a websocket by
         * writing and listening to data events from a websocket echo server.
         */
        vm.websocketEchoServerUri = "wss://echo.websocket.org/";
        vm.chartData = [];
        vm.chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "light",
            "dataDateFormat": "YYYY-MM-DD",
            "valueAxes": [{
                "id": "v1",
                "position": "left"
            }],
            "graphs": [{
                "id": "g1",
                "bullet": "round",
                "valueField": "value",
                "balloonText": "[[category]]: [[value]]"
            }],
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "equalSpacing": true,
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "dataProvider": vm.chartData
        });
        vm.initWebSocket = function (wsUri) {
            var ws = new WebSocket(wsUri);
            ws.onopen = vm.onConnect;
            ws.onclose = vm.onClose;
            ws.onerror = vm.onError;
            ws.onmessage = vm.updateChart;
            return ws;
        };
        vm.updateChart = function(wsEvent) {
            var newData = JSON.parse(wsEvent.data);
            vm.chartData.push.apply(vm.chartData, newData);
            if (vm.chartData.length > 50) {
                vm.chartData.splice(0, vm.chartData.length - 50);
            }
            vm.writeToScreen("<span style='color: blue'>Received: " + wsEvent.data + "</span>");
            vm.chart.validateData();
        };
        vm.onConnect = function (wsEvent) {
            vm.writeToScreen("Server connection successful. Listening for data now.");
            vm.interval = setInterval(vm.getDataFromServer, 5000); //we're simulating a datafeed by calling our getDataFromServer method every 2 seconds
        };
        vm.onError = function(wsEvent) {
            vm.writeToScreen("<span style='color: red'>ERROR:" + wsEvent + "</span>");
        };
        vm.onClose = function (wsEvent) {
            vm.writeToScreen("Server connection closed");
            clearInterval(vm.interval);
        };
        vm.writeToScreen = function(message) {
            var pre = document.createElement("p");
            pre.style.wordWrap = "break-word";
            pre.innerHTML = message;
        };
        vm.getDataFromServer = function() {
            var newDate;
            var newValue;
            var newData = [];
            var newDataSize = Math.round(Math.random() + 3) + 1;
            if (vm.chartData.length) {
                newDate = new Date(vm.chartData[vm.chartData.length - 1].date);
            } else {
                newDate = new Date();
            }
            for (var i = 0; i < newDataSize; ++i) {
                newValue = Math.round(Math.random() * (40 + i)) + 10 + i;
                newDate.setDate(newDate.getDate() + 1);
                newData.push({
                    date: newDate,
                    value: newValue
                });
            }
            vm.websocket.send(JSON.stringify(newData));
        };
        vm.websocket = vm.initWebSocket(vm.websocketEchoServerUri);
        AmCharts.makeChart( "chartdiv1", {
            "type": "radar",
            "theme": "light",
            "dataProvider": [ {
                "country": "Czech Republic",
                "litres": 156.9
            }, {
                "country": "Ireland",
                "litres": 131.1
            }, {
                "country": "Germany",
                "litres": 115.8
            }, {
                "country": "Australia",
                "litres": 109.9
            }, {
                "country": "Austria",
                "litres": 108.3
            }, {
                "country": "UK",
                "litres": 99
            } ],
            "valueAxes": [ {
                "axisTitleOffset": 20,
                "minimum": 0,
                "axisAlpha": 0.15,
                "guides": [{
                    "value": 0,
                    "toValue": 50,
                    "fillColor": "#c00",
                    "fillAlpha": 0.3
                }, {
                    "value": 50,
                    "toValue": 100,
                    "fillColor": "#c00",
                    "fillAlpha": 0.2
                }, {
                    "value": 100,
                    "toValue": 150,
                    "fillColor": "#cc0",
                    "fillAlpha": 0.2
                }, {
                    "value": 150,
                    "toValue": 200,
                    "fillColor": "#0c0",
                    "fillAlpha": 0.2
                }]
            } ],
            "startDuration": 2,
            "graphs": [ {
                "balloonText": "[[value]] litres of beer per year",
                "bullet": "round",
                "valueField": "litres"
            } ],
            "categoryField": "country"
        } );
        vm.chartData1 = [];
        vm.generateChartData = function() {
            var firstDate = new Date();
            firstDate.setDate( firstDate.getDate() - 500 );
            firstDate.setHours( 0, 0, 0, 0 );
            for ( var i = 0; i < 500; i++ ) {
                var newDate = new Date( firstDate );
                newDate.setDate( newDate.getDate() + i );
                var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
                var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;
                vm.chartData1.push( {
                    "date": newDate,
                    "value": a1,
                    "volume": b1
                } );
            }
        };
        vm.generateChartData();
        AmCharts.makeChart( "chartdiv2", {
            "type": "stock",
            "theme": "light",
            "dataSets": [ {
                "title": "My Data",
                "fieldMappings": [ {
                    "fromField": "value",
                    "toField": "value"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                } ],
                "dataProvider": vm.chartData1,
                "categoryField": "date"
            }],
            "panels": [ {
                "showCategoryAxis": false,
                "title": "Value",
                "percentHeight": 70,
                "stockGraphs": [ {
                    "id": "g1",
                    "valueField": "value",
                    "balloonText": "[[title]]:<b>[[value]]</b>"
                } ],
                "valueAxes": [{
                    "axisColor": "#c00"
                }],
                "stockLegend": {
                    "periodValueTextRegular": "[[value.close]]"
                }
            }],
            "chartScrollbarSettings": {
                "graph": "g1"
            },
            "chartCursorSettings": {
                "valueBalloonsEnabled": true,
                "fullWidth": true,
                "cursorAlpha": 0.1,
                "valueLineBalloonEnabled": true,
                "valueLineEnabled": true,
                "valueLineAlpha": 0.5
            },
            "periodSelector": {
                "position": "",
                "periods": [ {
                    "period": "MM",
                    "selected": true,
                    "count": 1,
                    "label": "1 month"
                }, {
                    "period": "YYYY",
                    "count": 1,
                    "label": "1 year"
                }, {
                    "period": "YTD",
                    "label": "YTD"
                }, {
                    "period": "MAX",
                    "label": "MAX"
                } ]
            },
            "valueAxesSettings": {
                "inside": false,
                "axisThickness": 50,
                "axisAlpha": 0.7,
                "labelOffset": -50,
                "color": "#fff"
            },
            "panelsSettings": {
                "marginLeft": 50
            }
        });
        AmCharts.makeChart("chartdiv3", {
            "type": "pie",
            "startDuration": 0,
            "theme": "light",
            "addClassNames": true,
            "legend": {
                "position": "right",
                "marginRight": 100,
                "autoMargins": false
            },
            "innerRadius": "30%",
            "dataProvider": [{
                "country": "Lithuania",
                "litres": 501.9
            }, {
                "country": "Czech Republic",
                "litres": 301.9
            }, {
                "country": "Ireland",
                "litres": 201.1
            }, {
                "country": "Germany",
                "litres": 165.8
            }, {
                "country": "Australia",
                "litres": 139.9
            }, {
                "country": "Austria",
                "litres": 128.3
            }, {
                "country": "UK",
                "litres": 99
            }, {
                "country": "Belgium",
                "litres": 60
            }, {
                "country": "The Netherlands",
                "litres": 50
            }, {
                "country": "Lithuania",
                "litres": 501.9
            }, {
                "country": "Czech Republic",
                "litres": 301.9
            }, {
                "country": "Ireland",
                "litres": 201.1
            }, {
                "country": "Germany",
                "litres": 165.8
            }, {
                "country": "Australia",
                "litres": 139.9
            }, {
                "country": "Austria",
                "litres": 128.3
            }, {
                "country": "UK",
                "litres": 99
            }, {
                "country": "Belgium",
                "litres": 60
            }, {
                "country": "The Netherlands",
                "litres": 50
            }],
            "valueField": "litres",
            "titleField": "country"
        });

        vm.chartData3 = [{
            "title": "Marketing",
            "value": 23,
            "url":"#",
            "description":"click to drill-down",
            "data": [
                { "title": "Jan", "value": 1, "data": [
                    { "title": "AAA", "value": 2 },
                    { "title": "BBB", "value": 5 },
                    { "title": "CCC", "value": 1 }
                ] },
                { "title": "Feb", "value": 2 },
                { "title": "Mar", "value": 1 },
                { "title": "Apr", "value": 3 },
                { "title": "May", "value": 2 },
                { "title": "Jun", "value": 1 },
                { "title": "Jul", "value": 2 },
                { "title": "Aug", "value": 3 },
                { "title": "Sep", "value": 3 },
                { "title": "Oct", "value": 1 },
                { "title": "Nov", "value": 1 },
                { "title": "Dec", "value": 3 }
            ]
        }, {
            "title": "Sales",
            "value": 26,
            "url":"#",
            "description":"click to drill-down",
            "data": [
                { "title": "Jan", "value": 4 },
                { "title": "Feb", "value": 3 },
                { "title": "Mar", "value": 1 },
                { "title": "Apr", "value": 4 },
                { "title": "May", "value": 2 },
                { "title": "Jun", "value": 1 },
                { "title": "Jul", "value": 2 },
                { "title": "Aug", "value": 2 },
                { "title": "Sep", "value": 3 },
                { "title": "Oct", "value": 1 },
                { "title": "Nov", "value": 1 },
                { "title": "Dec", "value": 3 }
            ]
        }, {
            "title": "Logistics",
            "value": 30,
            "url":"#",
            "description":"click to drill-down",
            "data": [
                { "title": "Jan", "value": 2 },
                { "title": "Feb", "value": 3 },
                { "title": "Mar", "value": 1 },
                { "title": "Apr", "value": 5 },
                { "title": "May", "value": 2 },
                { "title": "Jun", "value": 1 },
                { "title": "Jul", "value": 2 },
                { "title": "Aug", "value": 2 },
                { "title": "Sep", "value": 3 },
                { "title": "Oct", "value": 1 },
                { "title": "Nov", "value": 1 },
                { "title": "Dec", "value": 3 }
            ]
        }];
        // create pie chart
        vm.chart2 = AmCharts.makeChart("chartdiv4", {
            "type": "pie",
            "dataProvider": vm.chartData3,
            "valueField": "value",
            "titleField": "title",
            "labelText": "[[title]]: [[value]]",
            "pullOutOnlyOne": true,
            "titles": [{
                "text": "Departments"
            }],
            "allLabels": []
        });
        // initialize step array
        vm.chart2.drillLevels = [{
            "title": "Departments",
            "data": vm.chartData3
        }];
        vm.chart2.addListener("clickSlice", function (event) {
            var chart2 = event.chart;
            if (event.dataItem.dataContext.data !== undefined) {
                chart2.drillLevels.push(event.dataItem.dataContext);
                chart2.dataProvider = event.dataItem.dataContext.data;
                chart2.titles[0].text = event.dataItem.dataContext.title;
                event.chart.addLabel(
                    0, 25,
                    "< Go back",
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    'javascript:angular.element($("#amCharts")).scope().ch1.drillUp();'
                );
                chart2.validateData();
                chart2.animateAgain();
            }
        });
        vm.drillUp = function () {
            vm.chart2.drillLevels.pop();
            var level = vm.chart2.drillLevels[vm.chart2.drillLevels.length - 1];
            vm.chart2.dataProvider = level.data;
            vm.chart2.titles[0].text = level.title;
            if (vm.chart2.drillLevels.length === 1)
                vm.chart2.clearLabels();
            vm.chart2.validateData();
            vm.chart2.animateAgain();
        }
    }
    chartsC3Controller.$inject = ['$timeout'];
    function chartsC3Controller($timeout) {
        var vm = this;
        vm.c3js1 = c3.generate({
            bindto: '#c3js1',
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 50, 20, 10, 40, 15, 25]
                ]
            }
        });
        vm.c3js2 = c3.generate({
            bindto: '#c3js2',
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                type: 'bar'
            }
        });
        vm.c3js3 = c3.generate({
            bindto: '#c3js3',
            data: {
                columns: [
                    ['data1', 300, 350, 300, 0, 0, 0],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                types: {
                    data1: 'area',
                    data2: 'area-spline'
                }
            }
        });
        vm.c3js4 = c3.generate({
            bindto: '#c3js4',
            data: {
                columns: [
                    ['sample', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
                ]
            },
            zoom: {
                enabled: true
            },
            subchart: {
                show: true
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            }
        });
        vm.c3js5 = c3.generate({
            bindto: '#c3js5',
            data: {
                xs: {
                    setosa: 'setosa_x',
                    versicolor: 'versicolor_x'
                },
                columns: [
                    ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
                    ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
                    ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                    ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3]
                ],
                type: 'pie'
            },
            axis: {
                x: {
                    label: 'Sepal.Width',
                    tick: {
                        fit: false
                    }
                },
                y: {
                    label: 'Petal.Width'
                }
            }
        });
        vm.c3js6 = c3.generate({
            bindto: '#c3js6',
            data: {
                columns: [
                    ['data1', 30],
                    ['data2', 120]
                ],
                type : 'donut'
            },
            donut: {
                title: "Iris Petal Width"
            }
        });
        $timeout(function () {
            vm.c3js6.load({
                columns: [
                    ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                    ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                    ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
                ]
            });
        }, 1500);
        $timeout(function () {
            vm.c3js1.load({
                columns: [
                    ['data1', 230, 190, 300, 500, 300, 400]
                ]
            });
            vm.c3js2.transform('spline', 'data1');
            vm.c3js5 .transform('scatter');
        }, 2000);
        $timeout(function () {
            vm.c3js1.load({
                columns: [
                    ['data3', 130, 150, 200, 300, 200, 100]
                ]
            });
            vm.c3js6.unload({
                ids: 'data1'
            });
            vm.c3js6.unload({
                ids: 'data2'
            });
        }, 2500);
        $timeout(function () {
            vm.c3js1.unload({
                ids: 'data1'
            });
            vm.c3js2.transform('spline', 'data2');
            vm.c3js5 .transform('pie');
        }, 3000);
        $timeout(function () {
            vm.c3js2.transform('bar');
            vm.c3js5 .transform('scatter');
        }, 4000);
        $timeout(function () {
            vm.c3js2.transform('spline');
            vm.c3js5 .transform('pie');
        }, 5000);
        $timeout(function () {
            vm.c3js2.transform('bar','data1');
        }, 6000);
        $timeout(function () {
            vm.c3js2.transform('bar','data2');
        }, 7000);
    }
    chartsFlotController.$inject = ['$timeout'];
    function chartsFlotController($timeout) {
        var vm = this;
        // We use an inline data source in the example, usually data would
        // be fetched from a server
        vm.data = [];
        vm.totalPoints = 300;
        vm.getRandomData = function () {
            if (vm.data.length > 0)
                vm.data = vm.data.slice(1);
            // Do a random walk
            while (vm.data.length < vm.totalPoints) {
                var prev = vm.data.length > 0 ? vm.data[vm.data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;
                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }
                vm.data.push(y);
            }
            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < vm.data.length; ++i) {
                res.push([i, vm.data[i]])
            }
            return res;
        };
        // Set up the control widget
        vm.updateInterval = 30;
        vm.plot = $.plot("#flot1", [ vm.getRandomData() ], {
            series: {
                shadowSize: 0	// Drawing is faster without shadows
            },
            yaxis: {
                min: 0,
                max: 100
            },
            xaxis: {
                show: false
            }
        });
        vm.update = function () {
            vm.plot.setData([vm.getRandomData()]);
            // Since the axes don't change, we don't need to call plot.setupGrid()
            vm.plot.draw();
            $timeout(vm.update, vm.updateInterval);
        };
        vm.update();
        vm.plotWithOptions = function () {
            var d1 = [];
            var d2 = [];
            var d3 = [];
            for (var i = 0; i <= 10; i += 1) {
                d1.push([i, parseInt(Math.random() * 30)]);
            }
            for (var j = 0; j <= 10; j += 1) {
                d2.push([j, parseInt(Math.random() * 30)]);
            }
            for (var k = 0; k <= 10; k += 1) {
                d3.push([k, parseInt(Math.random() * 30)]);
            }
            $.plot("#flot2", [ d1, d2, d3 ], {
                series: {
                    stack: 0,
                    lines: {
                        show: true,
                        fill: true,
                        steps: false
                    }
                }
            });
        };
        vm.plotWithOptions();
        vm.euroFormatter = function (v, axis) {
            return v.toFixed(axis.tickDecimals) + "€";
        };
        vm.doPlot = function(position) {
            var oilprices = [[1167692400000,61.05], [1167778800000,58.32], [1167865200000,57.35], [1167951600000,56.31], [1168210800000,55.55], [1168297200000,55.64], [1168383600000,54.02], [1168470000000,51.88], [1168556400000,52.99], [1168815600000,52.99], [1168902000000,51.21], [1168988400000,52.24], [1169074800000,50.48], [1169161200000,51.99], [1169420400000,51.13], [1169506800000,55.04], [1169593200000,55.37], [1169679600000,54.23], [1169766000000,55.42], [1170025200000,54.01], [1170111600000,56.97], [1170198000000,58.14], [1170284400000,58.14], [1170370800000,59.02], [1170630000000,58.74], [1170716400000,58.88], [1170802800000,57.71], [1170889200000,59.71], [1170975600000,59.89], [1171234800000,57.81], [1171321200000,59.06], [1171407600000,58.00], [1171494000000,57.99], [1171580400000,59.39], [1171839600000,59.39], [1171926000000,58.07], [1172012400000,60.07], [1172098800000,61.14], [1172444400000,61.39], [1172530800000,61.46], [1172617200000,61.79], [1172703600000,62.00], [1172790000000,60.07], [1173135600000,60.69], [1173222000000,61.82], [1173308400000,60.05], [1173654000000,58.91], [1173740400000,57.93], [1173826800000,58.16], [1173913200000,57.55], [1173999600000,57.11], [1174258800000,56.59], [1174345200000,59.61], [1174518000000,61.69], [1174604400000,62.28], [1174860000000,62.91], [1174946400000,62.93], [1175032800000,64.03], [1175119200000,66.03], [1175205600000,65.87], [1175464800000,64.64], [1175637600000,64.38], [1175724000000,64.28], [1175810400000,64.28], [1176069600000,61.51], [1176156000000,61.89], [1176242400000,62.01], [1176328800000,63.85], [1176415200000,63.63], [1176674400000,63.61], [1176760800000,63.10], [1176847200000,63.13], [1176933600000,61.83], [1177020000000,63.38], [1177279200000,64.58], [1177452000000,65.84], [1177538400000,65.06], [1177624800000,66.46], [1177884000000,64.40], [1178056800000,63.68], [1178143200000,63.19], [1178229600000,61.93], [1178488800000,61.47], [1178575200000,61.55], [1178748000000,61.81], [1178834400000,62.37], [1179093600000,62.46], [1179180000000,63.17], [1179266400000,62.55], [1179352800000,64.94], [1179698400000,66.27], [1179784800000,65.50], [1179871200000,65.77], [1179957600000,64.18], [1180044000000,65.20], [1180389600000,63.15], [1180476000000,63.49], [1180562400000,65.08], [1180908000000,66.30], [1180994400000,65.96], [1181167200000,66.93], [1181253600000,65.98], [1181599200000,65.35], [1181685600000,66.26], [1181858400000,68.00], [1182117600000,69.09], [1182204000000,69.10], [1182290400000,68.19], [1182376800000,68.19], [1182463200000,69.14], [1182722400000,68.19], [1182808800000,67.77], [1182895200000,68.97], [1182981600000,69.57], [1183068000000,70.68], [1183327200000,71.09], [1183413600000,70.92], [1183586400000,71.81], [1183672800000,72.81], [1183932000000,72.19], [1184018400000,72.56], [1184191200000,72.50], [1184277600000,74.15], [1184623200000,75.05], [1184796000000,75.92], [1184882400000,75.57], [1185141600000,74.89], [1185228000000,73.56], [1185314400000,75.57], [1185400800000,74.95], [1185487200000,76.83], [1185832800000,78.21], [1185919200000,76.53], [1186005600000,76.86], [1186092000000,76.00], [1186437600000,71.59], [1186696800000,71.47], [1186956000000,71.62], [1187042400000,71.00], [1187301600000,71.98], [1187560800000,71.12], [1187647200000,69.47], [1187733600000,69.26], [1187820000000,69.83], [1187906400000,71.09], [1188165600000,71.73], [1188338400000,73.36], [1188511200000,74.04], [1188856800000,76.30], [1189116000000,77.49], [1189461600000,78.23], [1189548000000,79.91], [1189634400000,80.09], [1189720800000,79.10], [1189980000000,80.57], [1190066400000,81.93], [1190239200000,83.32], [1190325600000,81.62], [1190584800000,80.95], [1190671200000,79.53], [1190757600000,80.30], [1190844000000,82.88], [1190930400000,81.66], [1191189600000,80.24], [1191276000000,80.05], [1191362400000,79.94], [1191448800000,81.44], [1191535200000,81.22], [1191794400000,79.02], [1191880800000,80.26], [1191967200000,80.30], [1192053600000,83.08], [1192140000000,83.69], [1192399200000,86.13], [1192485600000,87.61], [1192572000000,87.40], [1192658400000,89.47], [1192744800000,88.60], [1193004000000,87.56], [1193090400000,87.56], [1193176800000,87.10], [1193263200000,91.86], [1193612400000,93.53], [1193698800000,94.53], [1193871600000,95.93], [1194217200000,93.98], [1194303600000,96.37], [1194476400000,95.46], [1194562800000,96.32], [1195081200000,93.43], [1195167600000,95.10], [1195426800000,94.64], [1195513200000,95.10], [1196031600000,97.70], [1196118000000,94.42], [1196204400000,90.62], [1196290800000,91.01], [1196377200000,88.71], [1196636400000,88.32], [1196809200000,90.23], [1196982000000,88.28], [1197241200000,87.86], [1197327600000,90.02], [1197414000000,92.25], [1197586800000,90.63], [1197846000000,90.63], [1197932400000,90.49], [1198018800000,91.24], [1198105200000,91.06], [1198191600000,90.49], [1198710000000,96.62], [1198796400000,96.00], [1199142000000,99.62], [1199314800000,99.18], [1199401200000,95.09], [1199660400000,96.33], [1199833200000,95.67], [1200351600000,91.90], [1200438000000,90.84], [1200524400000,90.13], [1200610800000,90.57], [1200956400000,89.21], [1201042800000,86.99], [1201129200000,89.85], [1201474800000,90.99], [1201561200000,91.64], [1201647600000,92.33], [1201734000000,91.75], [1202079600000,90.02], [1202166000000,88.41], [1202252400000,87.14], [1202338800000,88.11], [1202425200000,91.77], [1202770800000,92.78], [1202857200000,93.27], [1202943600000,95.46], [1203030000000,95.46], [1203289200000,101.74], [1203462000000,98.81], [1203894000000,100.88], [1204066800000,99.64], [1204153200000,102.59], [1204239600000,101.84], [1204498800000,99.52], [1204585200000,99.52], [1204671600000,104.52], [1204758000000,105.47], [1204844400000,105.15], [1205103600000,108.75], [1205276400000,109.92], [1205362800000,110.33], [1205449200000,110.21], [1205708400000,105.68], [1205967600000,101.84], [1206313200000,100.86], [1206399600000,101.22], [1206486000000,105.90], [1206572400000,107.58], [1206658800000,105.62], [1206914400000,101.58], [1207000800000,100.98], [1207173600000,103.83], [1207260000000,106.23], [1207605600000,108.50], [1207778400000,110.11], [1207864800000,110.14], [1208210400000,113.79], [1208296800000,114.93], [1208383200000,114.86], [1208728800000,117.48], [1208815200000,118.30], [1208988000000,116.06], [1209074400000,118.52], [1209333600000,118.75], [1209420000000,113.46], [1209592800000,112.52], [1210024800000,121.84], [1210111200000,123.53], [1210197600000,123.69], [1210543200000,124.23], [1210629600000,125.80], [1210716000000,126.29], [1211148000000,127.05], [1211320800000,129.07], [1211493600000,132.19], [1211839200000,128.85], [1212357600000,127.76], [1212703200000,138.54], [1212962400000,136.80], [1213135200000,136.38], [1213308000000,134.86], [1213653600000,134.01], [1213740000000,136.68], [1213912800000,135.65], [1214172000000,134.62], [1214258400000,134.62], [1214344800000,134.62], [1214431200000,139.64], [1214517600000,140.21], [1214776800000,140.00], [1214863200000,140.97], [1214949600000,143.57], [1215036000000,145.29], [1215381600000,141.37], [1215468000000,136.04], [1215727200000,146.40], [1215986400000,145.18], [1216072800000,138.74], [1216159200000,134.60], [1216245600000,129.29], [1216332000000,130.65], [1216677600000,127.95], [1216850400000,127.95], [1217282400000,122.19], [1217455200000,124.08], [1217541600000,125.10], [1217800800000,121.41], [1217887200000,119.17], [1217973600000,118.58], [1218060000000,120.02], [1218405600000,114.45], [1218492000000,113.01], [1218578400000,116.00], [1218751200000,113.77], [1219010400000,112.87], [1219096800000,114.53], [1219269600000,114.98], [1219356000000,114.98], [1219701600000,116.27], [1219788000000,118.15], [1219874400000,115.59], [1219960800000,115.46], [1220306400000,109.71], [1220392800000,109.35], [1220565600000,106.23], [1220824800000,106.34]];
            var exchangerates = [[1167606000000,0.7580], [1167692400000,0.7580], [1167778800000,0.75470], [1167865200000,0.75490], [1167951600000,0.76130], [1168038000000,0.76550], [1168124400000,0.76930], [1168210800000,0.76940], [1168297200000,0.76880], [1168383600000,0.76780], [1168470000000,0.77080], [1168556400000,0.77270], [1168642800000,0.77490], [1168729200000,0.77410], [1168815600000,0.77410], [1168902000000,0.77320], [1168988400000,0.77270], [1169074800000,0.77370], [1169161200000,0.77240], [1169247600000,0.77120], [1169334000000,0.7720], [1169420400000,0.77210], [1169506800000,0.77170], [1169593200000,0.77040], [1169679600000,0.7690], [1169766000000,0.77110], [1169852400000,0.7740], [1169938800000,0.77450], [1170025200000,0.77450], [1170111600000,0.7740], [1170198000000,0.77160], [1170284400000,0.77130], [1170370800000,0.76780], [1170457200000,0.76880], [1170543600000,0.77180], [1170630000000,0.77180], [1170716400000,0.77280], [1170802800000,0.77290], [1170889200000,0.76980], [1170975600000,0.76850], [1171062000000,0.76810], [1171148400000,0.7690], [1171234800000,0.7690], [1171321200000,0.76980], [1171407600000,0.76990], [1171494000000,0.76510], [1171580400000,0.76130], [1171666800000,0.76160], [1171753200000,0.76140], [1171839600000,0.76140], [1171926000000,0.76070], [1172012400000,0.76020], [1172098800000,0.76110], [1172185200000,0.76220], [1172271600000,0.76150], [1172358000000,0.75980], [1172444400000,0.75980], [1172530800000,0.75920], [1172617200000,0.75730], [1172703600000,0.75660], [1172790000000,0.75670], [1172876400000,0.75910], [1172962800000,0.75820], [1173049200000,0.75850], [1173135600000,0.76130], [1173222000000,0.76310], [1173308400000,0.76150], [1173394800000,0.760], [1173481200000,0.76130], [1173567600000,0.76270], [1173654000000,0.76270], [1173740400000,0.76080], [1173826800000,0.75830], [1173913200000,0.75750], [1173999600000,0.75620], [1174086000000,0.7520], [1174172400000,0.75120], [1174258800000,0.75120], [1174345200000,0.75170], [1174431600000,0.7520], [1174518000000,0.75110], [1174604400000,0.7480], [1174690800000,0.75090], [1174777200000,0.75310], [1174860000000,0.75310], [1174946400000,0.75270], [1175032800000,0.74980], [1175119200000,0.74930], [1175205600000,0.75040], [1175292000000,0.750], [1175378400000,0.74910], [1175464800000,0.74910], [1175551200000,0.74850], [1175637600000,0.74840], [1175724000000,0.74920], [1175810400000,0.74710], [1175896800000,0.74590], [1175983200000,0.74770], [1176069600000,0.74770], [1176156000000,0.74830], [1176242400000,0.74580], [1176328800000,0.74480], [1176415200000,0.7430], [1176501600000,0.73990], [1176588000000,0.73950], [1176674400000,0.73950], [1176760800000,0.73780], [1176847200000,0.73820], [1176933600000,0.73620], [1177020000000,0.73550], [1177106400000,0.73480], [1177192800000,0.73610], [1177279200000,0.73610], [1177365600000,0.73650], [1177452000000,0.73620], [1177538400000,0.73310], [1177624800000,0.73390], [1177711200000,0.73440], [1177797600000,0.73270], [1177884000000,0.73270], [1177970400000,0.73360], [1178056800000,0.73330], [1178143200000,0.73590], [1178229600000,0.73590], [1178316000000,0.73720], [1178402400000,0.7360], [1178488800000,0.7360], [1178575200000,0.7350], [1178661600000,0.73650], [1178748000000,0.73840], [1178834400000,0.73950], [1178920800000,0.74130], [1179007200000,0.73970], [1179093600000,0.73960], [1179180000000,0.73850], [1179266400000,0.73780], [1179352800000,0.73660], [1179439200000,0.740], [1179525600000,0.74110], [1179612000000,0.74060], [1179698400000,0.74050], [1179784800000,0.74140], [1179871200000,0.74310], [1179957600000,0.74310], [1180044000000,0.74380], [1180130400000,0.74430], [1180216800000,0.74430], [1180303200000,0.74430], [1180389600000,0.74340], [1180476000000,0.74290], [1180562400000,0.74420], [1180648800000,0.7440], [1180735200000,0.74390], [1180821600000,0.74370], [1180908000000,0.74370], [1180994400000,0.74290], [1181080800000,0.74030], [1181167200000,0.73990], [1181253600000,0.74180], [1181340000000,0.74680], [1181426400000,0.7480], [1181512800000,0.7480], [1181599200000,0.7490], [1181685600000,0.74940], [1181772000000,0.75220], [1181858400000,0.75150], [1181944800000,0.75020], [1182031200000,0.74720], [1182117600000,0.74720], [1182204000000,0.74620], [1182290400000,0.74550], [1182376800000,0.74490], [1182463200000,0.74670], [1182549600000,0.74580], [1182636000000,0.74270], [1182722400000,0.74270], [1182808800000,0.7430], [1182895200000,0.74290], [1182981600000,0.7440], [1183068000000,0.7430], [1183154400000,0.74220], [1183240800000,0.73880], [1183327200000,0.73880], [1183413600000,0.73690], [1183500000000,0.73450], [1183586400000,0.73450], [1183672800000,0.73450], [1183759200000,0.73520], [1183845600000,0.73410], [1183932000000,0.73410], [1184018400000,0.7340], [1184104800000,0.73240], [1184191200000,0.72720], [1184277600000,0.72640], [1184364000000,0.72550], [1184450400000,0.72580], [1184536800000,0.72580], [1184623200000,0.72560], [1184709600000,0.72570], [1184796000000,0.72470], [1184882400000,0.72430], [1184968800000,0.72440], [1185055200000,0.72350], [1185141600000,0.72350], [1185228000000,0.72350], [1185314400000,0.72350], [1185400800000,0.72620], [1185487200000,0.72880], [1185573600000,0.73010], [1185660000000,0.73370], [1185746400000,0.73370], [1185832800000,0.73240], [1185919200000,0.72970], [1186005600000,0.73170], [1186092000000,0.73150], [1186178400000,0.72880], [1186264800000,0.72630], [1186351200000,0.72630], [1186437600000,0.72420], [1186524000000,0.72530], [1186610400000,0.72640], [1186696800000,0.7270], [1186783200000,0.73120], [1186869600000,0.73050], [1186956000000,0.73050], [1187042400000,0.73180], [1187128800000,0.73580], [1187215200000,0.74090], [1187301600000,0.74540], [1187388000000,0.74370], [1187474400000,0.74240], [1187560800000,0.74240], [1187647200000,0.74150], [1187733600000,0.74190], [1187820000000,0.74140], [1187906400000,0.73770], [1187992800000,0.73550], [1188079200000,0.73150], [1188165600000,0.73150], [1188252000000,0.7320], [1188338400000,0.73320], [1188424800000,0.73460], [1188511200000,0.73280], [1188597600000,0.73230], [1188684000000,0.7340], [1188770400000,0.7340], [1188856800000,0.73360], [1188943200000,0.73510], [1189029600000,0.73460], [1189116000000,0.73210], [1189202400000,0.72940], [1189288800000,0.72660], [1189375200000,0.72660], [1189461600000,0.72540], [1189548000000,0.72420], [1189634400000,0.72130], [1189720800000,0.71970], [1189807200000,0.72090], [1189893600000,0.7210], [1189980000000,0.7210], [1190066400000,0.7210], [1190152800000,0.72090], [1190239200000,0.71590], [1190325600000,0.71330], [1190412000000,0.71050], [1190498400000,0.70990], [1190584800000,0.70990], [1190671200000,0.70930], [1190757600000,0.70930], [1190844000000,0.70760], [1190930400000,0.7070], [1191016800000,0.70490], [1191103200000,0.70120], [1191189600000,0.70110], [1191276000000,0.70190], [1191362400000,0.70460], [1191448800000,0.70630], [1191535200000,0.70890], [1191621600000,0.70770], [1191708000000,0.70770], [1191794400000,0.70770], [1191880800000,0.70910], [1191967200000,0.71180], [1192053600000,0.70790], [1192140000000,0.70530], [1192226400000,0.7050], [1192312800000,0.70550], [1192399200000,0.70550], [1192485600000,0.70450], [1192572000000,0.70510], [1192658400000,0.70510], [1192744800000,0.70170], [1192831200000,0.70], [1192917600000,0.69950], [1193004000000,0.69940], [1193090400000,0.70140], [1193176800000,0.70360], [1193263200000,0.70210], [1193349600000,0.70020], [1193436000000,0.69670], [1193522400000,0.6950], [1193612400000,0.6950], [1193698800000,0.69390], [1193785200000,0.6940], [1193871600000,0.69220], [1193958000000,0.69190], [1194044400000,0.69140], [1194130800000,0.68940], [1194217200000,0.68910], [1194303600000,0.69040], [1194390000000,0.6890], [1194476400000,0.68340], [1194562800000,0.68230], [1194649200000,0.68070], [1194735600000,0.68150], [1194822000000,0.68150], [1194908400000,0.68470], [1194994800000,0.68590], [1195081200000,0.68220], [1195167600000,0.68270], [1195254000000,0.68370], [1195340400000,0.68230], [1195426800000,0.68220], [1195513200000,0.68220], [1195599600000,0.67920], [1195686000000,0.67460], [1195772400000,0.67350], [1195858800000,0.67310], [1195945200000,0.67420], [1196031600000,0.67440], [1196118000000,0.67390], [1196204400000,0.67310], [1196290800000,0.67610], [1196377200000,0.67610], [1196463600000,0.67850], [1196550000000,0.68180], [1196636400000,0.68360], [1196722800000,0.68230], [1196809200000,0.68050], [1196895600000,0.67930], [1196982000000,0.68490], [1197068400000,0.68330], [1197154800000,0.68250], [1197241200000,0.68250], [1197327600000,0.68160], [1197414000000,0.67990], [1197500400000,0.68130], [1197586800000,0.68090], [1197673200000,0.68680], [1197759600000,0.69330], [1197846000000,0.69330], [1197932400000,0.69450], [1198018800000,0.69440], [1198105200000,0.69460], [1198191600000,0.69640], [1198278000000,0.69650], [1198364400000,0.69560], [1198450800000,0.69560], [1198537200000,0.6950], [1198623600000,0.69480], [1198710000000,0.69280], [1198796400000,0.68870], [1198882800000,0.68240], [1198969200000,0.67940], [1199055600000,0.67940], [1199142000000,0.68030], [1199228400000,0.68550], [1199314800000,0.68240], [1199401200000,0.67910], [1199487600000,0.67830], [1199574000000,0.67850], [1199660400000,0.67850], [1199746800000,0.67970], [1199833200000,0.680], [1199919600000,0.68030], [1200006000000,0.68050], [1200092400000,0.6760], [1200178800000,0.6770], [1200265200000,0.6770], [1200351600000,0.67360], [1200438000000,0.67260], [1200524400000,0.67640], [1200610800000,0.68210], [1200697200000,0.68310], [1200783600000,0.68420], [1200870000000,0.68420], [1200956400000,0.68870], [1201042800000,0.69030], [1201129200000,0.68480], [1201215600000,0.68240], [1201302000000,0.67880], [1201388400000,0.68140], [1201474800000,0.68140], [1201561200000,0.67970], [1201647600000,0.67690], [1201734000000,0.67650], [1201820400000,0.67330], [1201906800000,0.67290], [1201993200000,0.67580], [1202079600000,0.67580], [1202166000000,0.6750], [1202252400000,0.6780], [1202338800000,0.68330], [1202425200000,0.68560], [1202511600000,0.69030], [1202598000000,0.68960], [1202684400000,0.68960], [1202770800000,0.68820], [1202857200000,0.68790], [1202943600000,0.68620], [1203030000000,0.68520], [1203116400000,0.68230], [1203202800000,0.68130], [1203289200000,0.68130], [1203375600000,0.68220], [1203462000000,0.68020], [1203548400000,0.68020], [1203634800000,0.67840], [1203721200000,0.67480], [1203807600000,0.67470], [1203894000000,0.67470], [1203980400000,0.67480], [1204066800000,0.67330], [1204153200000,0.6650], [1204239600000,0.66110], [1204326000000,0.65830], [1204412400000,0.6590], [1204498800000,0.6590], [1204585200000,0.65810], [1204671600000,0.65780], [1204758000000,0.65740], [1204844400000,0.65320], [1204930800000,0.65020], [1205017200000,0.65140], [1205103600000,0.65140], [1205190000000,0.65070], [1205276400000,0.6510], [1205362800000,0.64890], [1205449200000,0.64240], [1205535600000,0.64060], [1205622000000,0.63820], [1205708400000,0.63820], [1205794800000,0.63410], [1205881200000,0.63440], [1205967600000,0.63780], [1206054000000,0.64390], [1206140400000,0.64780], [1206226800000,0.64810], [1206313200000,0.64810], [1206399600000,0.64940], [1206486000000,0.64380], [1206572400000,0.63770], [1206658800000,0.63290], [1206745200000,0.63360], [1206831600000,0.63330], [1206914400000,0.63330], [1207000800000,0.6330], [1207087200000,0.63710], [1207173600000,0.64030], [1207260000000,0.63960], [1207346400000,0.63640], [1207432800000,0.63560], [1207519200000,0.63560], [1207605600000,0.63680], [1207692000000,0.63570], [1207778400000,0.63540], [1207864800000,0.6320], [1207951200000,0.63320], [1208037600000,0.63280], [1208124000000,0.63310], [1208210400000,0.63420], [1208296800000,0.63210], [1208383200000,0.63020], [1208469600000,0.62780], [1208556000000,0.63080], [1208642400000,0.63240], [1208728800000,0.63240], [1208815200000,0.63070], [1208901600000,0.62770], [1208988000000,0.62690], [1209074400000,0.63350], [1209160800000,0.63920], [1209247200000,0.640], [1209333600000,0.64010], [1209420000000,0.63960], [1209506400000,0.64070], [1209592800000,0.64230], [1209679200000,0.64290], [1209765600000,0.64720], [1209852000000,0.64850], [1209938400000,0.64860], [1210024800000,0.64670], [1210111200000,0.64440], [1210197600000,0.64670], [1210284000000,0.65090], [1210370400000,0.64780], [1210456800000,0.64610], [1210543200000,0.64610], [1210629600000,0.64680], [1210716000000,0.64490], [1210802400000,0.6470], [1210888800000,0.64610], [1210975200000,0.64520], [1211061600000,0.64220], [1211148000000,0.64220], [1211234400000,0.64250], [1211320800000,0.64140], [1211407200000,0.63660], [1211493600000,0.63460], [1211580000000,0.6350], [1211666400000,0.63460], [1211752800000,0.63460], [1211839200000,0.63430], [1211925600000,0.63460], [1212012000000,0.63790], [1212098400000,0.64160], [1212184800000,0.64420], [1212271200000,0.64310], [1212357600000,0.64310], [1212444000000,0.64350], [1212530400000,0.6440], [1212616800000,0.64730], [1212703200000,0.64690], [1212789600000,0.63860], [1212876000000,0.63560], [1212962400000,0.6340], [1213048800000,0.63460], [1213135200000,0.6430], [1213221600000,0.64520], [1213308000000,0.64670], [1213394400000,0.65060], [1213480800000,0.65040], [1213567200000,0.65030], [1213653600000,0.64810], [1213740000000,0.64510], [1213826400000,0.6450], [1213912800000,0.64410], [1213999200000,0.64140], [1214085600000,0.64090], [1214172000000,0.64090], [1214258400000,0.64280], [1214344800000,0.64310], [1214431200000,0.64180], [1214517600000,0.63710], [1214604000000,0.63490], [1214690400000,0.63330], [1214776800000,0.63340], [1214863200000,0.63380], [1214949600000,0.63420], [1215036000000,0.6320], [1215122400000,0.63180], [1215208800000,0.6370], [1215295200000,0.63680], [1215381600000,0.63680], [1215468000000,0.63830], [1215554400000,0.63710], [1215640800000,0.63710], [1215727200000,0.63550], [1215813600000,0.6320], [1215900000000,0.62770], [1215986400000,0.62760], [1216072800000,0.62910], [1216159200000,0.62740], [1216245600000,0.62930], [1216332000000,0.63110], [1216418400000,0.6310], [1216504800000,0.63120], [1216591200000,0.63120], [1216677600000,0.63040], [1216764000000,0.62940], [1216850400000,0.63480], [1216936800000,0.63780], [1217023200000,0.63680], [1217109600000,0.63680], [1217196000000,0.63680], [1217282400000,0.6360], [1217368800000,0.6370], [1217455200000,0.64180], [1217541600000,0.64110], [1217628000000,0.64350], [1217714400000,0.64270], [1217800800000,0.64270], [1217887200000,0.64190], [1217973600000,0.64460], [1218060000000,0.64680], [1218146400000,0.64870], [1218232800000,0.65940], [1218319200000,0.66660], [1218405600000,0.66660], [1218492000000,0.66780], [1218578400000,0.67120], [1218664800000,0.67050], [1218751200000,0.67180], [1218837600000,0.67840], [1218924000000,0.68110], [1219010400000,0.68110], [1219096800000,0.67940], [1219183200000,0.68040], [1219269600000,0.67810], [1219356000000,0.67560], [1219442400000,0.67350], [1219528800000,0.67630], [1219615200000,0.67620], [1219701600000,0.67770], [1219788000000,0.68150], [1219874400000,0.68020], [1219960800000,0.6780], [1220047200000,0.67960], [1220133600000,0.68170], [1220220000000,0.68170], [1220306400000,0.68320], [1220392800000,0.68770], [1220479200000,0.69120], [1220565600000,0.69140], [1220652000000,0.70090], [1220738400000,0.70120], [1220824800000,0.7010], [1220911200000,0.70050]];
            $.plot("#flot3", [
                { data: oilprices, label: "Oil price ($)" },
                { data: exchangerates, label: "USD/EUR exchange rate", yaxis: 2 }
            ], {
                xaxes: [ { mode: "time" } ],
                yaxes: [ { min: 0 }, {
                    // align if we are to the right
                    alignTicksWithAxis: position == "right" ? 1 : null,
                    position: position,
                    tickFormatter: vm.euroFormatter
                } ],
                legend: { position: "sw" }
            });
        };
        vm.doPlot("right");
        vm.plot4 = function() {
            var data = [],series = Math.floor(Math.random() * 6) + 3;
            for (var i = 0; i < series; i++) {
                data[i] = {
                    data: Math.floor(Math.random() * 100) + 1
                }
            }
            var placeholder = $("#flot4");
            placeholder.unbind();
            $.plot(placeholder, data, {
                series: {
                    pie: {
                        show: true
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true
                }
            });
            placeholder.bind("plotclick", function(event, pos, obj) {
                if (!obj) {
                    return;
                }
                var  percent = parseFloat(obj.series.percent).toFixed(2);
                alert( percent + "%");
            });
        };
        vm.plot4();
        vm.plot5 = function() {
            var d1 = [];
            for (var i = 0; i < 14; i += 0.5) {
                d1.push([i, Math.sin(i)]);
            }
            var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
            var d3 = [];
            for (var j = 0; j < 14; j += 0.5) {
                d3.push([j, Math.cos(j)]);
            }
            var d4 = [];
            for (var k = 0; k < 14; k += 0.1) {
                d4.push([k, Math.sqrt(k * 10)]);
            }
            var d5 = [];
            for (var l = 0; l < 14; l += 0.5) {
                d5.push([l, Math.sqrt(l)]);
            }
            var d6 = [];
            for (var m = 0; m < 14; m += 0.5 + Math.random()) {
                d6.push([m, Math.sqrt(2*i + Math.sin(m) + 5)]);
            }
            $.plot("#flot5", [{
                data: d1,
                lines: { show: true, fill: true }
            }, {
                data: d2,
                bars: { show: true }
            }, {
                data: d3,
                points: { show: true }
            }, {
                data: d4,
                lines: { show: true }
            }, {
                data: d5,
                lines: { show: true },
                points: { show: true }
            }, {
                data: d6,
                lines: { show: true, steps: true }
            }]);
        };
        vm.plot5();
        vm.plot6 = function () {
            var d1 = [];
            for (var i = 0; i < Math.PI * 2; i += 0.25) {
                d1.push([i, Math.sin(i)]);
            }
            var d2 = [];
            for (var j = 0; j < Math.PI * 2; j += 0.25) {
                d2.push([j, Math.cos(j)]);
            }
            var d3 = [];
            for (var k = 0; k < Math.PI * 2; k += 0.1) {
                d3.push([k, Math.tan(k)]);
            }
            $.plot("#flot6", [
                { data: d1 },
                { data: d2 },
                { data: d3 }
            ], {
                series: {
                    lines: { show: true },
                    points: { show: true }
                },
                xaxis: {
                    ticks: [
                        0, [ Math.PI/2, "\u03c0/2" ], [ Math.PI, "\u03c0" ],
                        [ Math.PI * 3/2, "3\u03c0/2" ], [ Math.PI * 2, "2\u03c0" ]
                    ]
                },
                yaxis: {
                    ticks: 10,
                    min: -2,
                    max: 2,
                    tickDecimals: 3
                },
                grid: {
                    backgroundColor: { colors: [ "#fff", "#eee" ] },
                    borderWidth: {
                        top: 1,
                        right: 1,
                        bottom: 2,
                        left: 2
                    }
                }
            });
        };
        vm.plot6();
    }
    chartsHighChartsController.$inject = ['$interval'];
    function chartsHighChartsController($interval) {
        var vm = this;
        vm.hc1 = angular.element('#hc1').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        $interval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
        vm.hc2 = angular.element('#hc2').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Area chart with negative values'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, -2, -3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, -2, 5]
            }]
        });
        vm.hc3 = angular.element('#hc3').highcharts({
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
            },
            labels: {
                items: [{
                    html: 'Total fruit consumption',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: 'Jane',
                data: [3, 2, 1, 3, 4]
            }, {
                type: 'column',
                name: 'John',
                data: [2, 3, 5, 7, 6]
            }, {
                type: 'column',
                name: 'Joe',
                data: [4, 3, 3, 9, 0]
            }, {
                type: 'spline',
                name: 'Average',
                data: [3, 2.67, 3, 6.33, 3.33],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Total consumption',
                data: [{
                    name: 'Jane',
                    y: 13,
                    color: Highcharts.getOptions().colors[0] // Jane's color
                }, {
                    name: 'John',
                    y: 23,
                    color: Highcharts.getOptions().colors[1] // John's color
                }, {
                    name: 'Joe',
                    y: 19,
                    color: Highcharts.getOptions().colors[2] // Joe's color
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });
        vm.hc4 = function() {
            /*
             The purpose of this demo is to demonstrate how multiple charts on the same page can be linked
             through DOM and Highcharts events and API methods. It takes a standard Highcharts config with a
             small variation for each data set, and a mouse/touch event handler to bind the charts together.
             */
            /**
             * In order to synchronize tooltips and crosshairs, override the
             * built-in events with handlers defined on the parent element.
             */
            angular.element('#hc4').bind('mousemove touchmove touchstart', function (e) {
                var chart,point,i, event;
                for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                    chart = Highcharts.charts[i];
                    event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
                    point = chart.series[0].searchPoint(event, true); // Get the hovered point
                    if (point) {
                        point.highlight(e);
                    }
                }
            });
            /**
             * Override the reset function, we don't need to hide the tooltips and crosshairs.
             */
            Highcharts.Pointer.prototype.reset = function () {
                return undefined;
            };
            /**
             * Highlight a point by showing tooltip, setting hover state and draw crosshair
             */
            Highcharts.Point.prototype.highlight = function (event) {
                this.onMouseOver(); // Show the hover marker
                this.series.chart.tooltip.refresh(this); // Show the tooltip
                this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
            };
            /**
             * Synchronize zooming through the setExtremes event handler.
             */
            function syncExtremes(e) {
                var thisChart = this.chart;
                if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                    Highcharts.each(Highcharts.charts, function (chart) {
                        if (chart !== thisChart) {
                            if (chart.xAxis[0].setExtremes) { // It is null while updating
                                chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                            }
                        }
                    });
                }
            }
            var response =
                {
                    "xData": [0.001567,0.011765,0.022194,0.032316,0.04266,0.063668,0.074477,0.085323,0.09576,0.106078,0.116096,0.137524,0.148342,0.159059,0.170005,0.180716,0.191407,0.212538,0.222819,0.233929,0.244239,0.255301,0.266081,0.287527,0.298115,0.309392,0.320217,0.330928,0.341401,0.361717,0.372173,0.382337,0.39294,0.403072,0.413454,0.434618,0.444845,0.455745,0.465785,0.475987,0.486064,0.507086,0.517517,0.527961,0.538242,0.548414,0.558444,0.578941,0.589212,0.599472,0.60977,0.620178,0.630189,0.650782,0.661001,0.671137,0.681175,0.691235,0.702012,0.722644,0.733166,0.743824,0.754059,0.764109,0.774519,0.795597,0.805721,0.81592,0.826139,0.836369,0.846826,0.86771,0.87803,0.888342,0.898695,0.908723,0.91922,0.939802,0.950378,0.960776,0.971377,0.981843,0.992312,1.013125,1.023302,1.033488,1.043822,1.054203,1.065019,1.086078,1.09635,1.106421,1.117028,1.127541,1.138599,1.159588,1.170167,1.180741,1.190794,1.201112,1.211355,1.233278,1.243477,1.254957,1.265227,1.276378,1.285656,1.297311,1.308367,1.318715,1.329589,1.340834,1.352388,1.375063,1.385369,1.396291,1.408156,1.418989,1.429535,1.451141,1.462205,1.473011,1.483844,1.494311,1.514761,1.525336,1.535858,1.546476,1.557325,1.567512,1.590091,1.600925,1.612303,1.622558,1.633071,1.643555,1.66484,1.675722,1.685986,1.696733,1.706895,1.719102,1.741295,1.752144,1.762688,1.773713,1.784052,1.795705,1.817305,1.827465,1.838408,1.849369,1.860023,1.871438,1.89257,1.90323,1.914398,1.924634,1.934642,1.945212,1.966275,1.976294,1.986422,1.996652,2.008005,2.018309,2.041139,2.051221,2.0613,2.072507,2.08342,2.094075,2.114574,2.125286,2.135765,2.146845,2.157966,2.169391,2.190921,2.200899,2.212709,2.222671,2.232908,2.244001,2.264898,2.275703,2.286885,2.298115,2.310186,2.32059,2.344695,2.354843,2.366387,2.379001,2.390328,2.402215,2.423134,2.433156,2.444912,2.457061,2.468253,2.478978,2.499832,2.513223,2.52561,2.538429,2.548659,2.560809,2.581308,2.592816,2.603963,2.615992,2.626242,2.638223,2.660346,2.671583,2.681938,2.69265,2.70588,2.716296,2.740081,2.75085,2.761319,2.772027,2.782659,2.793531,2.816194,2.828031,2.839243,2.851443,2.863884,2.874359,2.895246,2.906506,2.91761,2.92786,2.938937,2.950218,2.973357,2.98366,2.994639,3.005213,3.01666,3.02761,3.050025,3.061713,3.071828,3.082787,3.093422,3.105289,3.127231,3.138982,3.149755,3.160217,3.171299,3.191571,3.202226,3.213225,3.223987,3.234092,3.244644,3.265939,3.276411,3.286489,3.297156,3.307909,3.319018,3.34064,3.351107,3.361683,3.373136,3.384768,3.395457,3.417722,3.429096,3.439122,3.449679,3.459868,3.469997,3.492679,3.503647,3.514941,3.525858,3.538746,3.550422,3.572255,3.58452,3.595367,3.605736,3.617401,3.628324,3.652523,3.663679,3.67378,3.684605,3.695595,3.705843,3.728706,3.739169,3.750205,3.761258,3.771771,3.781911,3.804724,3.81631,3.826313,3.837847,3.85049,3.860999,3.88262,3.892937,3.903053,3.913656,3.924698,3.935126,3.956362,3.966543,3.976899,3.98752,3.997644,4.008721,4.029852,4.040633,4.051006,4.06126,4.071761,4.083526,4.10749,4.117855,4.128661,4.13934,4.151117,4.1624,4.184736,4.194826,4.205098,4.215261,4.225325,4.236367,4.262012,4.273794,4.285743,4.297226,4.308086,4.318245,4.340246,4.351486,4.363196,4.374465,4.387109,4.398635,4.421101,4.432135,4.444666,4.456226,4.467413,4.477804,4.498505,4.510413,4.522595,4.534044,4.545944,4.558048,4.580379,4.59312,4.605616,4.618065,4.631266,4.644086,4.667943,4.67948,4.691266,4.703019,4.715923,4.725932,4.752312,4.765224,4.777128,4.787361,4.800435,4.823353,4.836044,4.848602,4.860302,4.871112,4.882779,4.904695,4.914823,4.927074,4.938111,4.949586,4.960761,4.982911,4.9942,5.004246,5.016296,5.027215,5.038043,5.058885,5.070303,5.080649,5.093865,5.104424,5.114903,5.134965,5.146346,5.15634,5.168547,5.179066,5.191167,5.214242,5.224914,5.237573,5.249537,5.261586,5.272517,5.296154,5.306348,5.316773,5.327153,5.339961,5.350638,5.376502,5.389277,5.402142,5.412197,5.42399,5.434873,5.458466,5.470907,5.482679,5.493339,5.50574,5.516349,5.538897,5.549552,5.56083,5.571879,5.583764,5.59509,5.619028,5.629925,5.640716,5.650957,5.661787,5.671957,5.693974,5.704919,5.717491,5.731152,5.744728,5.755687,5.778668,5.791951,5.80409,5.815697,5.828482,5.840501,5.864145,5.875704,5.887893,5.900147,5.912517,5.924894,5.948897,5.959155,5.970262,5.981632,5.992996,6.00356,6.027256,6.038776,6.050959,6.061351,6.071864,6.082436,6.104054,6.115602,6.127623,6.139058,6.150639,6.161323,6.183013,6.194359,6.206269,6.218033,6.2281,6.240494,6.262584,6.275326,6.287166,6.298953,6.310644,6.321583,6.345676,6.356738,6.366782,6.377931,6.388519,6.397159],
                    "datasets": [{
                        "name": "Speed",
                        "data": [13.833,12.524,11.441,10.651,9.961,4.566,4.617,4.728,4.823,4.844,4.856,4.87,4.702,4.679,4.674,4.641,4.47,4.688,4.798,4.756,4.903,4.919,5.017,4.938,4.879,4.831,4.623,3.887,3.502,3.083,3.123,3.073,2.922,2.827,2.805,2.605,2.743,2.698,2.513,2.41,2.17,2.288,2.308,2.222,2.183,2.224,2.163,2.223,2.142,2.257,2.015,1.971,1.894,1.848,1.835,1.85,2.036,1.827,1.904,1.803,1.852,1.866,1.906,1.956,1.954,1.734,1.904,1.899,2.001,1.966,1.844,1.879,1.856,1.837,1.827,1.907,1.729,1.74,1.68,1.797,1.811,1.941,2.026,2.217,2.281,2.517,2.673,2.702,2.893,3.016,3.073,3.126,3.283,3.361,3.33,3.465,3.916,4.49,5.074,5.717,6.523,7.012,6.726,7.095,7.471,7.824,7.802,4.441,4.625,4.696,4.861,4.768,4.889,5.281,5.36,5.419,5.137,5.278,5.151,4.934,4.952,4.742,4.666,4.525,4.126,4.228,4.334,4.383,5.287,5.088,5.28,5.274,5.251,5.413,5.365,5.372,5.512,4.839,5.099,5.196,5.219,5.094,5.582,5.91,5.952,6.012,5.854,5.789,5.465,5.525,5.659,5.67,5.173,5.033,5.318,5.289,5.226,5.15,5.106,4.989,5.103,5.288,5.428,5.363,5.026,5,4.941,4.872,4.751,4.408,4.425,4.301,4.134,4.171,4.272,4.34,4.543,4.826,5.381,5.374,5.433,5.483,5.539,5.869,6.956,7.443,7.654,8.005,8.181,8.386,9.202,9.51,9.66,9.141,8.79,8.747,8.949,9.188,9.625,10.154,10.173,10.361,11.186,11.226,11.091,10.899,10.945,10.892,9.618,9.092,8.465,7.864,7.396,7.076,7.053,6.772,6.958,7.202,6.93,6.857,7.007,7.059,7.099,7.025,6.95,7.116,6.331,6.39,6.571,6.571,6.604,6.407,6.371,6.348,6.348,5.995,6.162,6.287,6.241,6.033,6.083,6.313,6.118,5.78,5.698,5.804,5.743,5.655,5.976,6.005,6.06,5.988,6.021,6.049,5.882,5.296,5.142,4.701,4.701,4.647,4.491,4.48,4.384,4.263,4.515,4.721,5.084,6.225,6.302,6.409,6.52,6.462,6.525,6.816,6.656,6.566,6.34,6.177,6.143,7.462,7.783,7.885,7.998,8.182,8.352,8.32,8.5,8.967,8.474,8.178,7.89,7.436,7.634,7.777,7.628,7.189,6.787,6.048,6.003,6.189,6.216,6.389,6.353,7.341,7.899,7.849,7.757,7.314,7.134,6.858,6.689,6.526,5.909,5.138,4.617,4.339,4.558,4.493,4.545,4.419,4.245,4.468,5.093,5.737,6.215,6.613,6.876,7.566,7.586,7.901,7.736,7.23,6.703,5.896,5.73,6.032,6.263,6.458,7.107,7.766,7.911,7.794,7.776,7.876,7.866,7.462,7.298,6.898,6.62,6.747,7.285,8.139,8.411,8.776,8.946,9.155,9.296,10.15,9.96,9.885,9.99,10.203,10.401,10.935,11.071,11.274,11.566,11.851,12.187,12.363,12.426,12.478,12.486,12.117,12.132,11.791,11.332,11.441,11.38,11.309,10.985,10.627,10.355,9.899,9.833,9.747,9.693,9.514,9.502,9.888,9.98,10.255,10.667,10.531,10.452,10.267,10.2,10.437,10.553,10.577,10.661,11.022,11.213,11.311,11.572,11.708,11.176,10.857,10.754,10.629,10.185,10.052,10.083,10.31,10.478,10.626,11.121,11.141,11.221,11.299,11.435,11.599,11.353,11.299,11.288,11.279,11.208,11.307,11.685,11.58,11.379,11.096,11.144,10.947,10.699,10.881,10.746,10.276,9.994,9.629,9.76,9.749,10.012,10.184,10.336,10.473,10.848,11.349,11.978,12.167,12.327,12.339,12.064,12.09,12.12,11.94,11.562,11.208,10.974,10.948,10.983,10.76,10.694,10.534,10.273,10.364,10.421,10.357,10.316,10.472,10.94,11.314,11.485,11.488,11.606,11.479,11.091,11.288,11.354,11.501,11.302,10.968,11.026,10.944,11.08,11.388,11.504,11.279,10.683,10.533,10.505,10.305,10.146,10.148,9.501,9.366,9.23,9.067,8.956,8.935],
                        "unit": "km/h",
                        "type": "line",
                        "valueDecimals": 1
                    }, {
                        "name": "Elevation",
                        "data": [26.857,27,27.111,27.2,27.272,30.545,32.181,33.818,35.272,36.545,37.818,41.818,44.545,47.272,48.545,49.818,53.545,61,64.909,68.818,72.727,75.09,77.454,82.181,84.545,84.454,86.181,87.909,89.636,93.09,96.727,100.363,104,107.636,111.272,116.727,121.09,125.454,129.818,134.181,136.727,151.636,159.09,166.545,174,181.454,186.363,201.636,209.272,216.909,222.818,228.727,234.636,249.363,258.181,267,273.09,279.181,288.181,303,308.818,314.636,326.909,336.272,345.636,364.363,373.727,380.181,389.818,399.454,409.09,425.727,432.727,439.727,446.727,453.727,460.727,473.272,478.818,484.363,489.909,491.636,493.363,498.272,500.727,503.181,506.454,508,509.545,512.636,514.363,516.09,517.909,519.727,521.545,525.636,527.272,528.909,529.636,530.363,530.909,531.181,531.3,531.444,530.75,529.857,528.666,521,521,521.777,522.4,522.909,522.818,522.636,522.545,522.454,522.363,522.272,522.181,520.727,520.545,521.09,521.636,522.181,523.272,523.818,524.363,524.909,525.454,528.09,532.272,534.363,536.454,537.909,539.363,540.818,543.727,545.909,544.818,543.727,542.636,541.545,540,539.545,539.09,538.636,537.272,535.181,533.363,532.454,531.545,530.636,529.727,528.818,526.272,525.909,525.545,525.181,524.818,524.454,523.727,522.363,521,520,519,516.545,511.636,510.636,509.636,506.909,504.181,502.454,499,497.272,497,496.727,497.454,496.727,493.818,491.636,489.454,487.272,487.09,486.909,486.545,485.363,484.181,484.09,481.545,479,478.181,477.909,477.636,477.363,477.09,476.818,476.363,481.818,487.272,492.727,493.909,493.181,491.727,491,490.272,489.545,487.636,485.727,482.363,474.454,468.454,462.454,456.454,450.454,439.727,435,430.272,425.545,418.727,418.363,418.545,419.09,419.636,420.181,419.454,418.727,413.818,413,412.181,411.363,409.636,407.909,405,403.818,397.454,392.818,388.181,383.545,374.272,369.636,365,358.363,351.181,344,340,338,336,334,332,328.636,323.909,322.545,321.181,319.818,318.272,315.181,313.636,312.09,311.909,311.727,310.545,308.181,307,306,305,302.818,300.636,297.545,296.636,296.727,296.181,295.636,295.09,294,294.636,293.09,291.545,291.545,291.545,292.181,292.818,293.454,294.09,292.545,291,292.272,292.363,292.454,292.545,289.818,287.09,281.636,281.09,280.545,277,273.454,271.454,267.454,265.181,262.909,260.636,258.363,256.09,248.909,246.818,240.909,235,229.09,226.272,220.636,217.818,215,215,211.545,208.09,201.181,197.727,194.272,190.818,187.363,183.909,170.818,173,175.181,177.363,179.545,181.727,186.09,182.727,179.363,179.09,178.818,173.272,160.272,152.818,145.363,137.909,130.454,126.818,116.272,111,107.363,101.909,98.363,94.818,87,82.818,80.363,79.545,78.272,77,73,71.454,69.636,67.909,66.727,65.454,62.909,62.09,61.272,60.363,59.454,59,58.545,58.272,58.09,57.909,57.727,57.545,57.272,57.181,56.909,56.636,56.454,56.272,55.909,55.727,55.818,55.545,55.272,54.909,54.818,54.727,54.636,54.545,54.454,54,54,54,54,54,53.636,52.909,52.545,52.636,52.727,52.818,52.909,52.636,52.272,52.272,52.272,52.272,52.818,53,53.09,53.181,53.272,53.818,54.363,55.09,55.454,55.272,55.09,54.909,54.727,54.363,53.727,53.09,52.636,52.181,51.727,50.818,50.363,50.363,50.363,50.363,50.818,51.727,51.272,50.818,50.363,50.636,50.909,50.545,50.363,50.181,50,49.818,50.818,52.818,53.09,53.363,53.636,53.909,54.181,53.272,52.818,52.09,51.363,50.636,49.909,47.818,46.09,44.363,43.363,42.363,41.363,39.363,37.636,35.909,35.181,35.09,35.363,35.909,36.181,36.545,36.909,37.272,38.363,39.545,39.636,39.727,39.818,38.636,37.454,34.909,33.636,32.363,31.09,29.818,27.181,21.909,20.545,19.181,17.818,16.454,15.09,10.727,8.545,8.636,8.727,8.818,8.909,9.09,8.9,8.666,9.5,10.571,12],
                        "unit": "m",
                        "type": "area",
                        "valueDecimals": 0
                    }, {
                        "name": "Heart rate",
                        "data": [101,98,103,115,124,128,133,138,138,141,143,149,149,148,146,147,152,149,155,152,153,153,156,152,151,151,149,148,150,157,161,156,160,158,156,159,164,162,160,165,165,167,167,163,166,165,161,164,163,164,162,163,164,166,166,166,166,166,164,167,166,162,164,163,161,166,168,168,169,169,165,166,167,163,167,167,169,171,167,169,171,175,174,167,168,171,167,169,169,167,166,165,163,161,163,166,162,164,166,162,162,164,163,162,162,163,161,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,113,117,121,119,117,120,121,124,125,127,125,129,130,131,135,135,135,135,134,136,139,142,142,145,145,150,153,155,156,157,157,154,153,152,148,130,123,123,120,123,119,115,114,114,115,115,113,112,111,113,113,113,113,110,110,109,110,110,109,108,108,109,107,107,107,109,109,111,111,111,111,111,112,112,112,112,112,114,113,113,113,113,113,113,112,111,114,118,124,127,128,128,129,131,133,131,130,133,130,136,135,135,136,136,135,136,135,134,135,137,138,139,138,134,130,130,129,129,132,132,131,130,133,132,132,128,128,132,132,128,128,129,130,130,130,130,131,133,134,132,132,130,131,129,133,133,130,130,133,133,131,130,130,130,129,129,129,126,128,126,129,129,124,125,120,120,123,125,125,124,124,125,125,126,126,126,127,126,130,134,135,126,123,124,123,127,130,130,132,133,133,133,133,130,130,129,128,124,123,124,124,127,135,139,139,134,134,133,130,130,127,129,126,126,126,129,129,123,123,128,128,125,125,125,123,123,122,122,122,125,125,125,126,126,128,128,129,129,124,125,125,125,129,131,131,131,131,131,131,131,129,129,126,126,126,126,126,125,125,126,126,126,125,126,127,130,130,130,130,132,132,132,132,132,132,129,130,132,133,132,132,129,128,128,132,133,135,137,138,139,139,142,142,141,143,144,144,143,145,145,147,150,153,158,159,160,159,160,160,160,162,162,163,162,161,161,162,161,164,166,166,165,162,162,159,157,160,159,160,160,161,161,162,162,163,163,165,166,166,164,164,166,165,166,163,162,162,161,159,159,159,159,159,156,154,153,152,152,151,154,153,151,151],
                        "unit": "bpm",
                        "type": "area",
                        "valueDecimals": 0
                    }]
                };
            angular.forEach(response.datasets, function (dataset,i ) {
                // Add X values
                dataset.data = Highcharts.map(dataset.data, function (val, j) {
                    return [response.xData[j], val];
                });
                angular.element("<div class='chart'>")
                    .appendTo('#hc4')
                    .highcharts({
                        chart: {
                            marginLeft: 40, // Keep all charts left aligned
                            spacingTop: 20,
                            spacingBottom: 20
                        },
                        title: {
                            text: dataset.name,
                            align: 'left',
                            margin: 0,
                            x: 30
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        xAxis: {
                            crosshair: true,
                            events: {
                                setExtremes: syncExtremes
                            },
                            labels: {
                                format: '{value} km'
                            }
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        tooltip: {
                            positioner: function () {
                                return {
                                    x: this.chart.chartWidth - this.label.width, // right aligned
                                    y: -1 // align to title
                                };
                            },
                            borderWidth: 0,
                            backgroundColor: 'none',
                            pointFormat: '{point.y}',
                            headerFormat: '',
                            shadow: false,
                            style: {
                                fontSize: '18px'
                            },
                            valueDecimals: dataset.valueDecimals
                        },
                        series: [{
                            data: dataset.data,
                            name: dataset.name,
                            type: dataset.type,
                            color: Highcharts.getOptions().colors[i],
                            fillOpacity: 0.3,
                            tooltip: {
                                valueSuffix: ' ' + dataset.unit
                            }
                        }]
                    });
            });
        };
        vm.hc4();
        vm.hc5 = angular.element('#hc5').highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Browser market shares at a specific website, 2014'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Firefox', 45.0],
                    ['IE', 26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari', 8.5],
                    ['Opera', 6.2],
                    ['Others', 0.7]
                ]
            }]
        });
        vm.hc6 = angular.element('#hc6').highcharts({
            chart: {
                polar: true
            },
            title: {
                text: 'Highcharts Polar Chart'
            },
            pane: {
                startAngle: 0,
                endAngle: 360
            },
            xAxis: {
                tickInterval: 45,
                min: 0,
                max: 360,
                labels: {
                    formatter: function () {
                        return this.value + '°';
                    }
                }
            },
            yAxis: {
                min: 0
            },
            plotOptions: {
                series: {
                    pointStart: 0,
                    pointInterval: 45
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0
                }
            },
            series: [{
                type: 'column',
                name: 'Column',
                data: [8, 7, 6, 5, 4, 3, 2, 1],
                pointPlacement: 'between'
            }, {
                type: 'line',
                name: 'Line',
                data: [1, 2, 3, 4, 5, 6, 7, 8]
            }, {
                type: 'area',
                name: 'Area',
                data: [1, 8, 2, 7, 3, 6, 4, 5]
            }]
        });
    }
    function chartsMorrisController() {
        var vm = this;
        vm.mo1 = Morris.Area({
            element: 'morris1',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B']
        });
        vm.mo2 = Morris.Donut({
            element: 'morris2',
            data: [
                {label: "Download Sales", value: 12},
                {label: "In-Store Sales", value: 30},
                {label: "Mail-Order Sales", value: 20}
            ]
        });
        vm.mo3 = Morris.Bar({
            element: 'morris3',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B']
        });
        vm.mo4 = Morris.Line({
            element: 'morris4',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B']
        });
    }
    function chartsNvd3Controller() {
        var vm = this;
        /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
        vm.nv1 = nv.addGraph(function() {
            var chart = nv.models.lineChart()
                    .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                    .transitionDuration(350)  //how fast do you want the lines to transition?
                    .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                    .showYAxis(true)        //Show the y-axis
                    .showXAxis(true)        //Show the x-axis
                ;
            chart.xAxis     //Chart x-axis settings
                .axisLabel('Time (ms)')
                .tickFormat(d3.format(',r'));
            chart.yAxis     //Chart y-axis settings
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format('.02f'));
            /* Done setting the chart up? Time to render it!*/
            var myData = vm.sinAndCos();   //You need data...
            d3.select('#nvd31 svg')    //Select the &lt;svg&gt; element you want to render the chart in.
                .datum(myData)         //Populate the &lt;svg&gt; element with chart data...
                .call(chart);          //Finally, render the chart!
            //Update the chart when window resizes.
            nv.utils.windowResize(function() { chart.update() });
            return chart;
        });
        vm.sinAndCos = function() {
            var sin = [],sin2 = [],
                cos = [];
            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10)});
            }
            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Sine Wave', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: cos,
                    key: 'Cosine Wave',
                    color: '#2ca02c'
                },
                {
                    values: sin2,
                    key: 'Another sine wave',
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        };
        vm.nv2 = nv.addGraph(function() {
            var chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true)     //Display pie labels
                .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
            ;
            d3.select("#nvd32 svg")
                .datum(
                    [{
                        "label": "One",
                        "value" : 29.765957771107
                    } ,
                    {
                        "label": "Two",
                        "value" : 0
                    } ,
                    {
                        "label": "Three",
                        "value" : 32.807804682612
                    } ,
                    {
                        "label": "Four",
                        "value" : 196.45946739256
                    } ,
                    {
                        "label": "Five",
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label": "Six",
                        "value" : 98.079782601442
                    } ,
                    {
                        "label": "Seven",
                        "value" : 13.925743130903
                    } ,
                    {
                        "label": "Eight",
                        "value" : 5.1387322875705
                    }
                ])
                .transition().duration(350)
                .call(chart);
            return chart;
        });
        vm.nvd3 = nv.addGraph(function() {
            var chart = nv.models.lineWithFocusChart();
            chart.xAxis.tickFormat(d3.format(',f'));
            chart.yAxis .tickFormat(d3.format(',.2f'));
            chart.y2Axis.tickFormat(d3.format(',.2f'));
            d3.select('#nvd33 svg')
                .datum(vm.testData())
                .transition().duration(500)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
        vm.testData = function () {
            /* Inspired by Lee Byron's test data generator. */
            function stream_layers(n, m, o) {
                if (arguments.length < 3) o = 0;
                function bump(a) {
                    var x = 1 / (.1 + Math.random()),
                        y = 2 * Math.random() - .5,
                        z = 10 / (.1 + Math.random());
                    for (var i = 0; i < m; i++) {
                        var w = (i / m - y) * z;
                        a[i] += x * Math.exp(-w * w);
                    }
                }
                return d3.range(n).map(function() {
                    var a = [], i;
                    for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                    for (i = 0; i < 5; i++) bump(a);
                    return a.map(stream_index);
                });
            }
            function stream_index(d, i) {
                return {x: i, y: Math.max(0, d)};
            }
            return stream_layers(3,128,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data
                };
            });
        };
        vm.nv4 = nv.addGraph(function() {
            var data = [
                {
                    "key": "Series1",
                    "color": "#d62728",
                    "values": [
                        {
                            "label" : "Group A" ,
                            "value" : -1.8746444827653
                        } ,
                        {
                            "label" : "Group B" ,
                            "value" : -8.0961543492239
                        } ,
                        {
                            "label" : "Group C" ,
                            "value" : -0.57072943117674
                        } ,
                        {
                            "label" : "Group D" ,
                            "value" : -2.4174010336624
                        } ,
                        {
                            "label" : "Group E" ,
                            "value" : -0.72009071426284
                        } ,
                        {
                            "label" : "Group F" ,
                            "value" : -0.77154485523777
                        } ,
                        {
                            "label" : "Group G" ,
                            "value" : -0.90152097798131
                        } ,
                        {
                            "label" : "Group H" ,
                            "value" : -0.91445417330854
                        } ,
                        {
                            "label" : "Group I" ,
                            "value" : -0.055746319141851
                        }
                    ]
                },
                {
                    "key": "Series2",
                    "color": "#1f77b4",
                    "values": [
                        {
                            "label" : "Group A" ,
                            "value" : 25.307646510375
                        } ,
                        {
                            "label" : "Group B" ,
                            "value" : 16.756779544553
                        } ,
                        {
                            "label" : "Group C" ,
                            "value" : 18.451534877007
                        } ,
                        {
                            "label" : "Group D" ,
                            "value" : 8.6142352811805
                        } ,
                        {
                            "label" : "Group E" ,
                            "value" : 7.8082472075876
                        } ,
                        {
                            "label" : "Group F" ,
                            "value" : 5.259101026956
                        } ,
                        {
                            "label" : "Group G" ,
                            "value" : 0.30947953487127
                        } ,
                        {
                            "label" : "Group H" ,
                            "value" : 0
                        } ,
                        {
                            "label" : "Group I" ,
                            "value" : 0
                        }
                    ]
                }
            ];
            var chart = nv.models.multiBarHorizontalChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .margin({top: 30, right: 20, bottom: 50, left: 0})
                .showValues(true)           //Show bar value next to each bar.
                .tooltips(false)             //Show tooltips on hover.
                .transitionDuration(350)
                .showControls(false);        //Allow user to switch between "Grouped" and "Stacked" mode.
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
            d3.select('#nvd34 svg')
                .datum(data)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
        vm.nv5 = nv.addGraph(function() {
            var data5 = [
                {
                    "key" : "North America" ,
                    "values" : [ [ 1025409600000 , 23.041422681023] , [ 1028088000000 , 19.854291255832] , [ 1030766400000 , 21.02286281168] , [ 1033358400000 , 22.093608385173] , [ 1036040400000 , 25.108079299458] , [ 1038632400000 , 26.982389242348] , [ 1041310800000 , 19.828984957662] , [ 1043989200000 , 19.914055036294] , [ 1046408400000 , 19.436150539916] , [ 1049086800000 , 21.558650338602] , [ 1051675200000 , 24.395594061773] , [ 1054353600000 , 24.747089309384] , [ 1056945600000 , 23.491755498807] , [ 1059624000000 , 23.376634878164] , [ 1062302400000 , 24.581223154533] , [ 1064894400000 , 24.922476843538] , [ 1067576400000 , 27.357712939042] , [ 1070168400000 , 26.503020572593] , [ 1072846800000 , 26.658901244878] , [ 1075525200000 , 27.065704156445] , [ 1078030800000 , 28.735320452588] , [ 1080709200000 , 31.572277846319] , [ 1083297600000 , 30.932161503638] , [ 1085976000000 , 31.627029785554] , [ 1088568000000 , 28.728743674232] , [ 1091246400000 , 26.858365172675] , [ 1093924800000 , 27.279922830032] , [ 1096516800000 , 34.408301211324] , [ 1099195200000 , 34.794362930439] , [ 1101790800000 , 35.609978198951] , [ 1104469200000 , 33.574394968037] , [ 1107147600000 , 31.979405070598] , [ 1109566800000 , 31.19009040297] , [ 1112245200000 , 31.083933968994] , [ 1114833600000 , 29.668971113185] , [ 1117512000000 , 31.490638014379] , [ 1120104000000 , 31.818617451128] , [ 1122782400000 , 32.960314008183] , [ 1125460800000 , 31.313383196209] , [ 1128052800000 , 33.125486081852] , [ 1130734800000 , 32.791805509149] , [ 1133326800000 , 33.506038030366] , [ 1136005200000 , 26.96501697216] , [ 1138683600000 , 27.38478809681] , [ 1141102800000 , 27.371377218209] , [ 1143781200000 , 26.309915460827] , [ 1146369600000 , 26.425199957518] , [ 1149048000000 , 26.823411519396] , [ 1151640000000 , 23.850443591587] , [ 1154318400000 , 23.158355444054] , [ 1156996800000 , 22.998689393695] , [ 1159588800000 , 27.9771285113] , [ 1162270800000 , 29.073672469719] , [ 1164862800000 , 28.587640408904] , [ 1167541200000 , 22.788453687637] , [ 1170219600000 , 22.429199073597] , [ 1172638800000 , 22.324103271052] , [ 1175313600000 , 17.558388444187] , [ 1177905600000 , 16.769518096208] , [ 1180584000000 , 16.214738201301] , [ 1183176000000 , 18.729632971229] , [ 1185854400000 , 18.814523318847] , [ 1188532800000 , 19.789986451358] , [ 1191124800000 , 17.070049054933] , [ 1193803200000 , 16.121349575716] , [ 1196398800000 , 15.141659430091] , [ 1199077200000 , 17.175388025297] , [ 1201755600000 , 17.286592443522] , [ 1204261200000 , 16.323141626568] , [ 1206936000000 , 19.231263773952] , [ 1209528000000 , 18.446256391095] , [ 1212206400000 , 17.822632399764] , [ 1214798400000 , 15.53936647598] , [ 1217476800000 , 15.255131790217] , [ 1220155200000 , 15.660963922592] , [ 1222747200000 , 13.254482273698] , [ 1225425600000 , 11.920796202299] , [ 1228021200000 , 12.122809090924] , [ 1230699600000 , 15.691026271393] , [ 1233378000000 , 14.720881635107] , [ 1235797200000 , 15.387939360044] , [ 1238472000000 , 13.765436672228] , [ 1241064000000 , 14.631445864799] , [ 1243742400000 , 14.292446536221] , [ 1246334400000 , 16.170071367017] , [ 1249012800000 , 15.948135554337] , [ 1251691200000 , 16.612872685134] , [ 1254283200000 , 18.778338719091] , [ 1256961600000 , 16.756026065421] , [ 1259557200000 , 19.385804443146] , [ 1262235600000 , 22.950590240168] , [ 1264914000000 , 23.61159018141] , [ 1267333200000 , 25.708586989581] , [ 1270008000000 , 26.883915999885] , [ 1272600000000 , 25.893486687065] , [ 1275278400000 , 24.678914263176] , [ 1277870400000 , 25.937275793024] , [ 1280548800000 , 29.461381693838] , [ 1283227200000 , 27.357322961861] , [ 1285819200000 , 29.057235285673] , [ 1288497600000 , 28.549434189386] , [ 1291093200000 , 28.506352379724] , [ 1293771600000 , 29.449241421598] , [ 1296450000000 , 25.796838168807] , [ 1298869200000 , 28.740145449188] , [ 1301544000000 , 22.091744141872] , [ 1304136000000 , 25.07966254541] , [ 1306814400000 , 23.674906973064] , [ 1309406400000 , 23.418002742929] , [ 1312084800000 , 23.24364413887] , [ 1314763200000 , 31.591854066817] , [ 1317355200000 , 31.497112374114] , [ 1320033600000 , 26.67238082043] , [ 1322629200000 , 27.297080015495] , [ 1325307600000 , 20.174315530051] , [ 1327986000000 , 19.631084213898] , [ 1330491600000 , 20.366462219461] , [ 1333166400000 , 19.284784434185] , [ 1335758400000 , 19.157810257624]]
                },
                {
                    "key" : "Africa" ,
                    "values" : [ [ 1025409600000 , 7.9356392949025] , [ 1028088000000 , 7.4514668527298] , [ 1030766400000 , 7.9085410566608] , [ 1033358400000 , 5.8996782364764] , [ 1036040400000 , 6.0591869346923] , [ 1038632400000 , 5.9667815800451] , [ 1041310800000 , 8.65528925664] , [ 1043989200000 , 8.7690763386254] , [ 1046408400000 , 8.6386160387453] , [ 1049086800000 , 5.9895557449743] , [ 1051675200000 , 6.3840324338159] , [ 1054353600000 , 6.5196511461441] , [ 1056945600000 , 7.0738618553114] , [ 1059624000000 , 6.5745957367133] , [ 1062302400000 , 6.4658359184444] , [ 1064894400000 , 2.7622758754954] , [ 1067576400000 , 2.9794782986241] , [ 1070168400000 , 2.8735432712019] , [ 1072846800000 , 1.6344817513645] , [ 1075525200000 , 1.5869248754883] , [ 1078030800000 , 1.7172279157246] , [ 1080709200000 , 1.9649927409867] , [ 1083297600000 , 2.0261695079196] , [ 1085976000000 , 2.0541261923929] , [ 1088568000000 , 3.9466318927569] , [ 1091246400000 , 3.7826770946089] , [ 1093924800000 , 3.9543021004028] , [ 1096516800000 , 3.8309891064711] , [ 1099195200000 , 3.6340958946166] , [ 1101790800000 , 3.5289755762525] , [ 1104469200000 , 5.702378559857] , [ 1107147600000 , 5.6539569019223] , [ 1109566800000 , 5.5449506370392] , [ 1112245200000 , 4.7579993280677] , [ 1114833600000 , 4.4816139372906] , [ 1117512000000 , 4.5965558568606] , [ 1120104000000 , 4.3747066116976] , [ 1122782400000 , 4.4588822917087] , [ 1125460800000 , 4.4460351848286] , [ 1128052800000 , 3.7989113035136] , [ 1130734800000 , 3.7743883140088] , [ 1133326800000 , 3.7727852823828] , [ 1136005200000 , 7.2968111448895] , [ 1138683600000 , 7.2800122043237] , [ 1141102800000 , 7.1187787503354] , [ 1143781200000 , 8.351887016482] , [ 1146369600000 , 8.4156698763993] , [ 1149048000000 , 8.1673298604231] , [ 1151640000000 , 5.5132447126042] , [ 1154318400000 , 6.1152537710599] , [ 1156996800000 , 6.076765091942] , [ 1159588800000 , 4.6304473798646] , [ 1162270800000 , 4.6301068469402] , [ 1164862800000 , 4.3466656309389] , [ 1167541200000 , 6.830104897003] , [ 1170219600000 , 7.241633040029] , [ 1172638800000 , 7.1432372054153] , [ 1175313600000 , 10.608942063374] , [ 1177905600000 , 10.914964549494] , [ 1180584000000 , 10.933223880565] , [ 1183176000000 , 8.3457524851265] , [ 1185854400000 , 8.1078413081882] , [ 1188532800000 , 8.2697185922474] , [ 1191124800000 , 8.4742436475968] , [ 1193803200000 , 8.4994601179319] , [ 1196398800000 , 8.7387319683243] , [ 1199077200000 , 6.8829183612895] , [ 1201755600000 , 6.984133637885] , [ 1204261200000 , 7.0860136043287] , [ 1206936000000 , 4.3961787956053] , [ 1209528000000 , 3.8699674365231] , [ 1212206400000 , 3.6928925238305] , [ 1214798400000 , 6.7571718894253] , [ 1217476800000 , 6.4367313362344] , [ 1220155200000 , 6.4048441521454] , [ 1222747200000 , 5.4643833239669] , [ 1225425600000 , 5.3150786833374] , [ 1228021200000 , 5.3011272612576] , [ 1230699600000 , 4.1203601430809] , [ 1233378000000 , 4.0881783200525] , [ 1235797200000 , 4.1928665957189] , [ 1238472000000 , 7.0249415663205] , [ 1241064000000 , 7.006530880769] , [ 1243742400000 , 6.994835633224] , [ 1246334400000 , 6.1220222336254] , [ 1249012800000 , 6.1177436137653] , [ 1251691200000 , 6.1413396231981] , [ 1254283200000 , 4.8046006145874] , [ 1256961600000 , 4.6647600660544] , [ 1259557200000 , 4.544865006255] , [ 1262235600000 , 6.0488249316539] , [ 1264914000000 , 6.3188669540206] , [ 1267333200000 , 6.5873958262306] , [ 1270008000000 , 6.2281189839578] , [ 1272600000000 , 5.8948915746059] , [ 1275278400000 , 5.5967320482214] , [ 1277870400000 , 0.99784432084837] , [ 1280548800000 , 1.0950794175359] , [ 1283227200000 , 0.94479734407491] , [ 1285819200000 , 1.222093988688] , [ 1288497600000 , 1.335093106856] , [ 1291093200000 , 1.3302565104985] , [ 1293771600000 , 1.340824670897] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 4.4583692315] , [ 1320033600000 , 3.6493043348059] , [ 1322629200000 , 3.8610064091761] , [ 1325307600000 , 5.5144800685202] , [ 1327986000000 , 5.1750695220791] , [ 1330491600000 , 5.6710066952691] , [ 1333166400000 , 5.5611890039181] , [ 1335758400000 , 5.5979368839939]]
                },
                {
                    "key" : "South America" ,
                    "values" : [ [ 1025409600000 , 7.9149900245423] , [ 1028088000000 , 7.0899888751059] , [ 1030766400000 , 7.5996132380614] , [ 1033358400000 , 8.2741174301034] , [ 1036040400000 , 9.3564460833513] , [ 1038632400000 , 9.7066786059904] , [ 1041310800000 , 10.213363052343] , [ 1043989200000 , 10.285809585273] , [ 1046408400000 , 10.222053149228] , [ 1049086800000 , 8.6188592137975] , [ 1051675200000 , 9.3335447543566] , [ 1054353600000 , 8.9312402186628] , [ 1056945600000 , 8.1895089343658] , [ 1059624000000 , 8.260622135079] , [ 1062302400000 , 7.7700786851364] , [ 1064894400000 , 7.9907428771318] , [ 1067576400000 , 8.7769091865606] , [ 1070168400000 , 8.4855077060661] , [ 1072846800000 , 9.6277203033655] , [ 1075525200000 , 9.9685913452624] , [ 1078030800000 , 10.615085181759] , [ 1080709200000 , 9.2902488079646] , [ 1083297600000 , 8.8610439830061] , [ 1085976000000 , 9.1075344931229] , [ 1088568000000 , 9.9156737639203] , [ 1091246400000 , 9.7826003238782] , [ 1093924800000 , 10.55403610555] , [ 1096516800000 , 10.926900264097] , [ 1099195200000 , 10.903144818736] , [ 1101790800000 , 10.862890389067] , [ 1104469200000 , 10.64604998964] , [ 1107147600000 , 10.042790814087] , [ 1109566800000 , 9.7173391591038] , [ 1112245200000 , 9.6122415755443] , [ 1114833600000 , 9.4337921146562] , [ 1117512000000 , 9.814827171183] , [ 1120104000000 , 12.059260396788] , [ 1122782400000 , 12.139649903873] , [ 1125460800000 , 12.281290663822] , [ 1128052800000 , 8.8037085409056] , [ 1130734800000 , 8.6300618239176] , [ 1133326800000 , 9.1225708491432] , [ 1136005200000 , 12.988124170836] , [ 1138683600000 , 13.356778764353] , [ 1141102800000 , 13.611196863271] , [ 1143781200000 , 6.8959030061189] , [ 1146369600000 , 6.9939633271353] , [ 1149048000000 , 6.7241510257676] , [ 1151640000000 , 5.5611293669517] , [ 1154318400000 , 5.6086488714041] , [ 1156996800000 , 5.4962849907033] , [ 1159588800000 , 6.9193153169278] , [ 1162270800000 , 7.0016334389778] , [ 1164862800000 , 6.7865422443273] , [ 1167541200000 , 9.0006454225383] , [ 1170219600000 , 9.2233916171431] , [ 1172638800000 , 8.8929316009479] , [ 1175313600000 , 10.345937520404] , [ 1177905600000 , 10.075914677026] , [ 1180584000000 , 10.089006188111] , [ 1183176000000 , 10.598330295008] , [ 1185854400000 , 9.9689546533009] , [ 1188532800000 , 9.7740580198146] , [ 1191124800000 , 10.558483060626] , [ 1193803200000 , 9.9314651823603] , [ 1196398800000 , 9.3997715873769] , [ 1199077200000 , 8.4086493387262] , [ 1201755600000 , 8.9698309085926] , [ 1204261200000 , 8.2778357995396] , [ 1206936000000 , 8.8585045600123] , [ 1209528000000 , 8.7013756413322] , [ 1212206400000 , 7.7933605469443] , [ 1214798400000 , 7.0236183483064] , [ 1217476800000 , 6.9873088186829] , [ 1220155200000 , 6.8031713070097] , [ 1222747200000 , 6.6869531315723] , [ 1225425600000 , 6.138256993963] , [ 1228021200000 , 5.6434994016354] , [ 1230699600000 , 5.495220262512] , [ 1233378000000 , 4.6885326869846] , [ 1235797200000 , 4.4524349883438] , [ 1238472000000 , 5.6766520778185] , [ 1241064000000 , 5.7675774480752] , [ 1243742400000 , 5.7882863168337] , [ 1246334400000 , 7.2666010034924] , [ 1249012800000 , 7.5191821322261] , [ 1251691200000 , 7.849651451445] , [ 1254283200000 , 10.383992037985] , [ 1256961600000 , 9.0653691861818] , [ 1259557200000 , 9.6705248324159] , [ 1262235600000 , 10.856380561349] , [ 1264914000000 , 11.27452370892] , [ 1267333200000 , 11.754156529088] , [ 1270008000000 , 8.2870811422455] , [ 1272600000000 , 8.0210264360699] , [ 1275278400000 , 7.5375074474865] , [ 1277870400000 , 8.3419527338039] , [ 1280548800000 , 9.4197471818443] , [ 1283227200000 , 8.7321733185797] , [ 1285819200000 , 9.6627062648126] , [ 1288497600000 , 10.187962234548] , [ 1291093200000 , 9.8144201733476] , [ 1293771600000 , 10.275723361712] , [ 1296450000000 , 16.796066079353] , [ 1298869200000 , 17.543254984075] , [ 1301544000000 , 16.673660675083] , [ 1304136000000 , 17.963944353609] , [ 1306814400000 , 16.63774086721] , [ 1309406400000 , 15.84857094609] , [ 1312084800000 , 14.767303362181] , [ 1314763200000 , 24.778452182433] , [ 1317355200000 , 18.370353229999] , [ 1320033600000 , 15.253137429099] , [ 1322629200000 , 14.989600840649] , [ 1325307600000 , 16.052539160125] , [ 1327986000000 , 16.424390322793] , [ 1330491600000 , 17.884020741104] , [ 1333166400000 , 18.372698836036] , [ 1335758400000 , 18.315881576096]]
                },
                {
                    "key" : "Asia" ,
                    "values" : [ [ 1025409600000 , 13.153938631352] , [ 1028088000000 , 12.456410521864] , [ 1030766400000 , 12.537048663919] , [ 1033358400000 , 13.947386398309] , [ 1036040400000 , 14.421680682568] , [ 1038632400000 , 14.143238262286] , [ 1041310800000 , 12.229635347478] , [ 1043989200000 , 12.508479916948] , [ 1046408400000 , 12.155368409526] , [ 1049086800000 , 13.335455563994] , [ 1051675200000 , 12.888210138167] , [ 1054353600000 , 12.842092790511] , [ 1056945600000 , 12.513816474199] , [ 1059624000000 , 12.21453674494] , [ 1062302400000 , 11.750848343935] , [ 1064894400000 , 10.526579636787] , [ 1067576400000 , 10.873596086087] , [ 1070168400000 , 11.019967131519] , [ 1072846800000 , 11.235789380602] , [ 1075525200000 , 11.859910850657] , [ 1078030800000 , 12.531031616536] , [ 1080709200000 , 11.360451067019] , [ 1083297600000 , 11.456244780202] , [ 1085976000000 , 11.436991407309] , [ 1088568000000 , 11.638595744327] , [ 1091246400000 , 11.190418301469] , [ 1093924800000 , 11.835608007589] , [ 1096516800000 , 11.540980244475] , [ 1099195200000 , 10.958762325687] , [ 1101790800000 , 10.885791159509] , [ 1104469200000 , 13.605810720109] , [ 1107147600000 , 13.128978067437] , [ 1109566800000 , 13.119012086882] , [ 1112245200000 , 13.003706129783] , [ 1114833600000 , 13.326996807689] , [ 1117512000000 , 13.547947991743] , [ 1120104000000 , 12.807959646616] , [ 1122782400000 , 12.931763821068] , [ 1125460800000 , 12.795359993008] , [ 1128052800000 , 9.6998935538319] , [ 1130734800000 , 9.3473740089131] , [ 1133326800000 , 9.36902067716] , [ 1136005200000 , 14.258619539875] , [ 1138683600000 , 14.21241095603] , [ 1141102800000 , 13.973193618249] , [ 1143781200000 , 15.218233920664] , [ 1146369600000 , 14.382109727451] , [ 1149048000000 , 13.894310878491] , [ 1151640000000 , 15.593086090031] , [ 1154318400000 , 16.244839695189] , [ 1156996800000 , 16.017088850647] , [ 1159588800000 , 14.183951830057] , [ 1162270800000 , 14.148523245696] , [ 1164862800000 , 13.424326059971] , [ 1167541200000 , 12.974450435754] , [ 1170219600000 , 13.232470418021] , [ 1172638800000 , 13.318762655574] , [ 1175313600000 , 15.961407746104] , [ 1177905600000 , 16.287714639805] , [ 1180584000000 , 16.24659058389] , [ 1183176000000 , 17.564505594808] , [ 1185854400000 , 17.872725373164] , [ 1188532800000 , 18.018998508756] , [ 1191124800000 , 15.584518016602] , [ 1193803200000 , 15.480850647182] , [ 1196398800000 , 15.699120036985] , [ 1199077200000 , 19.184281817226] , [ 1201755600000 , 19.691226605205] , [ 1204261200000 , 18.982314051293] , [ 1206936000000 , 18.707820309008] , [ 1209528000000 , 17.459630929759] , [ 1212206400000 , 16.500616076782] , [ 1214798400000 , 18.086324003978] , [ 1217476800000 , 18.929464156259] , [ 1220155200000 , 18.233728682084] , [ 1222747200000 , 16.315776297325] , [ 1225425600000 , 14.632892190251] , [ 1228021200000 , 14.667835024479] , [ 1230699600000 , 13.946993947309] , [ 1233378000000 , 14.394304684398] , [ 1235797200000 , 13.724462792967] , [ 1238472000000 , 10.930879035807] , [ 1241064000000 , 9.8339915513708] , [ 1243742400000 , 10.053858541872] , [ 1246334400000 , 11.786998438286] , [ 1249012800000 , 11.780994901769] , [ 1251691200000 , 11.305889670277] , [ 1254283200000 , 10.918452290083] , [ 1256961600000 , 9.6811395055706] , [ 1259557200000 , 10.971529744038] , [ 1262235600000 , 13.330210480209] , [ 1264914000000 , 14.592637568961] , [ 1267333200000 , 14.605329141157] , [ 1270008000000 , 13.936853794037] , [ 1272600000000 , 12.189480759072] , [ 1275278400000 , 11.676151385046] , [ 1277870400000 , 13.058852800018] , [ 1280548800000 , 13.62891543203] , [ 1283227200000 , 13.811107569918] , [ 1285819200000 , 13.786494560786] , [ 1288497600000 , 14.045162857531] , [ 1291093200000 , 13.697412447286] , [ 1293771600000 , 13.677681376221] , [ 1296450000000 , 19.96151186453] , [ 1298869200000 , 21.049198298156] , [ 1301544000000 , 22.687631094009] , [ 1304136000000 , 25.469010617433] , [ 1306814400000 , 24.88379943712] , [ 1309406400000 , 24.203843814249] , [ 1312084800000 , 22.138760964036] , [ 1314763200000 , 16.034636966228] , [ 1317355200000 , 15.394958944555] , [ 1320033600000 , 12.62564246197] , [ 1322629200000 , 12.973735699739] , [ 1325307600000 , 15.78601833615] , [ 1327986000000 , 15.227368020134] , [ 1330491600000 , 15.899752650733] , [ 1333166400000 , 15.661317319168] , [ 1335758400000 , 15.359891177281]]
                } ,
                {
                    "key" : "Europe" ,
                    "values" : [ [ 1025409600000 , 9.3433263069351] , [ 1028088000000 , 8.4583069475546] , [ 1030766400000 , 8.0342398154196] , [ 1033358400000 , 8.1538966876572] , [ 1036040400000 , 10.743604786849] , [ 1038632400000 , 12.349366155851] , [ 1041310800000 , 10.742682503899] , [ 1043989200000 , 11.360983869935] , [ 1046408400000 , 11.441336039535] , [ 1049086800000 , 10.897508791837] , [ 1051675200000 , 11.469101547709] , [ 1054353600000 , 12.086311476742] , [ 1056945600000 , 8.0697180773504] , [ 1059624000000 , 8.2004392233445] , [ 1062302400000 , 8.4566434900643] , [ 1064894400000 , 7.9565760979059] , [ 1067576400000 , 9.3764619255827] , [ 1070168400000 , 9.0747664160538] , [ 1072846800000 , 10.508939004673] , [ 1075525200000 , 10.69936754483] , [ 1078030800000 , 10.681562399145] , [ 1080709200000 , 13.184786109406] , [ 1083297600000 , 12.668213052351] , [ 1085976000000 , 13.430509403986] , [ 1088568000000 , 12.393086349213] , [ 1091246400000 , 11.942374044842] , [ 1093924800000 , 12.062227685742] , [ 1096516800000 , 11.969974363623] , [ 1099195200000 , 12.14374574055] , [ 1101790800000 , 12.69422821995] , [ 1104469200000 , 9.1235211044692] , [ 1107147600000 , 8.758211757584] , [ 1109566800000 , 8.8072309258443] , [ 1112245200000 , 11.687595946835] , [ 1114833600000 , 11.079723082664] , [ 1117512000000 , 12.049712896076] , [ 1120104000000 , 10.725319428684] , [ 1122782400000 , 10.844849996286] , [ 1125460800000 , 10.833535488461] , [ 1128052800000 , 17.180932407865] , [ 1130734800000 , 15.894764896516] , [ 1133326800000 , 16.412751299498] , [ 1136005200000 , 12.573569093402] , [ 1138683600000 , 13.242301508051] , [ 1141102800000 , 12.863536342041] , [ 1143781200000 , 21.034044171629] , [ 1146369600000 , 21.419084618802] , [ 1149048000000 , 21.142678863692] , [ 1151640000000 , 26.56848967753] , [ 1154318400000 , 24.839144939906] , [ 1156996800000 , 25.456187462166] , [ 1159588800000 , 26.350164502825] , [ 1162270800000 , 26.478333205189] , [ 1164862800000 , 26.425979547846] , [ 1167541200000 , 28.191461582256] , [ 1170219600000 , 28.930307448808] , [ 1172638800000 , 29.521413891117] , [ 1175313600000 , 28.188285966466] , [ 1177905600000 , 27.704619625831] , [ 1180584000000 , 27.49086242483] , [ 1183176000000 , 28.770679721286] , [ 1185854400000 , 29.06048067145] , [ 1188532800000 , 28.240998844973] , [ 1191124800000 , 33.004893194128] , [ 1193803200000 , 34.075180359928] , [ 1196398800000 , 32.548560664834] , [ 1199077200000 , 30.629727432729] , [ 1201755600000 , 28.642858788159] , [ 1204261200000 , 27.973575227843] , [ 1206936000000 , 27.393351882726] , [ 1209528000000 , 28.476095288522] , [ 1212206400000 , 29.29667866426] , [ 1214798400000 , 29.222333802896] , [ 1217476800000 , 28.092966093842] , [ 1220155200000 , 28.107159262922] , [ 1222747200000 , 25.482974832099] , [ 1225425600000 , 21.208115993834] , [ 1228021200000 , 20.295043095268] , [ 1230699600000 , 15.925754618402] , [ 1233378000000 , 17.162864628346] , [ 1235797200000 , 17.084345773174] , [ 1238472000000 , 22.24600710228] , [ 1241064000000 , 24.530543998508] , [ 1243742400000 , 25.084184918241] , [ 1246334400000 , 16.606166527359] , [ 1249012800000 , 17.239620011628] , [ 1251691200000 , 17.336739127379] , [ 1254283200000 , 25.478492475754] , [ 1256961600000 , 23.017152085244] , [ 1259557200000 , 25.617745423684] , [ 1262235600000 , 24.061133998641] , [ 1264914000000 , 23.223933318646] , [ 1267333200000 , 24.425887263936] , [ 1270008000000 , 35.501471156693] , [ 1272600000000 , 33.775013878675] , [ 1275278400000 , 30.417993630285] , [ 1277870400000 , 30.023598978467] , [ 1280548800000 , 33.327519522436] , [ 1283227200000 , 31.963388450372] , [ 1285819200000 , 30.49896723209] , [ 1288497600000 , 32.403696817913] , [ 1291093200000 , 31.47736071922] , [ 1293771600000 , 31.53259666241] , [ 1296450000000 , 41.760282761548] , [ 1298869200000 , 45.605771243237] , [ 1301544000000 , 39.986557966215] , [ 1304136000000 , 43.84633051005] , [ 1306814400000 , 39.857316881858] , [ 1309406400000 , 37.675127768207] , [ 1312084800000 , 35.775077970313] , [ 1314763200000 , 48.631009702578] , [ 1317355200000 , 42.830831754505] , [ 1320033600000 , 35.611502589362] , [ 1322629200000 , 35.320136981738] , [ 1325307600000 , 31.564136901516] , [ 1327986000000 , 32.074407502433] , [ 1330491600000 , 35.053013769977] , [ 1333166400000 , 33.873085184128] , [ 1335758400000 , 32.321039427046]]
                } ,
                {
                    "key" : "Australia" ,
                    "values" : [ [ 1025409600000 , 5.1162447683392] , [ 1028088000000 , 4.2022848306513] , [ 1030766400000 , 4.3543715758736] , [ 1033358400000 , 5.4641223667245] , [ 1036040400000 , 6.0041275884577] , [ 1038632400000 , 6.6050520064486] , [ 1041310800000 , 5.0154059912793] , [ 1043989200000 , 5.1835708554647] , [ 1046408400000 , 5.1142682006164] , [ 1049086800000 , 5.0271381717695] , [ 1051675200000 , 5.3437782653456] , [ 1054353600000 , 5.2105844515767] , [ 1056945600000 , 6.552565997799] , [ 1059624000000 , 6.9873363581831] , [ 1062302400000 , 7.010986789097] , [ 1064894400000 , 4.4254242025515] , [ 1067576400000 , 4.9613848042174] , [ 1070168400000 , 4.8854920484764] , [ 1072846800000 , 4.0441111794228] , [ 1075525200000 , 4.0219596813179] , [ 1078030800000 , 4.3065749225355] , [ 1080709200000 , 3.9148434915404] , [ 1083297600000 , 3.8659430654512] , [ 1085976000000 , 3.9572824600686] , [ 1088568000000 , 4.7372190641522] , [ 1091246400000 , 4.6871476374455] , [ 1093924800000 , 5.0398702564196] , [ 1096516800000 , 5.5221787544964] , [ 1099195200000 , 5.424646299798] , [ 1101790800000 , 5.9240223067349] , [ 1104469200000 , 5.9936860983601] , [ 1107147600000 , 5.8499523215019] , [ 1109566800000 , 6.4149040329325] , [ 1112245200000 , 6.4547895561969] , [ 1114833600000 , 5.9385382611161] , [ 1117512000000 , 6.0486751030592] , [ 1120104000000 , 5.23108613838] , [ 1122782400000 , 5.5857797121029] , [ 1125460800000 , 5.3454665096987] , [ 1128052800000 , 5.0439154120119] , [ 1130734800000 , 5.054634702913] , [ 1133326800000 , 5.3819451380848] , [ 1136005200000 , 5.2638869269803] , [ 1138683600000 , 5.5806167415681] , [ 1141102800000 , 5.4539047069985] , [ 1143781200000 , 7.6728842432362] , [ 1146369600000 , 7.719946716654] , [ 1149048000000 , 8.0144619912942] , [ 1151640000000 , 7.942223133434] , [ 1154318400000 , 8.3998279827444] , [ 1156996800000 , 8.532324572605] , [ 1159588800000 , 4.7324285199763] , [ 1162270800000 , 4.7402397487697] , [ 1164862800000 , 4.9042069355168] , [ 1167541200000 , 5.9583963430882] , [ 1170219600000 , 6.3693899239171] , [ 1172638800000 , 6.261153903813] , [ 1175313600000 , 5.3443942184584] , [ 1177905600000 , 5.4932111235361] , [ 1180584000000 , 5.5747393101109] , [ 1183176000000 , 5.3833633060013] , [ 1185854400000 , 5.5125898831832] , [ 1188532800000 , 5.8116112661327] , [ 1191124800000 , 4.3962296939996] , [ 1193803200000 , 4.6967663605521] , [ 1196398800000 , 4.7963004350914] , [ 1199077200000 , 4.1817985183351] , [ 1201755600000 , 4.3797643870182] , [ 1204261200000 , 4.6966642197965] , [ 1206936000000 , 4.3609995132565] , [ 1209528000000 , 4.4736290996496] , [ 1212206400000 , 4.3749762738128] , [ 1214798400000 , 3.3274661194507] , [ 1217476800000 , 3.0316184691337] , [ 1220155200000 , 2.5718140204728] , [ 1222747200000 , 2.7034994044603] , [ 1225425600000 , 2.2033786591364] , [ 1228021200000 , 1.9850621240805] , [ 1230699600000 , 0] , [ 1233378000000 , 0] , [ 1235797200000 , 0] , [ 1238472000000 , 0] , [ 1241064000000 , 0] , [ 1243742400000 , 0] , [ 1246334400000 , 0] , [ 1249012800000 , 0] , [ 1251691200000 , 0] , [ 1254283200000 , 0.44495950017788] , [ 1256961600000 , 0.33945469262483] , [ 1259557200000 , 0.38348269455195] , [ 1262235600000 , 0] , [ 1264914000000 , 0] , [ 1267333200000 , 0] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 0] , [ 1280548800000 , 0] , [ 1283227200000 , 0] , [ 1285819200000 , 0] , [ 1288497600000 , 0] , [ 1291093200000 , 0] , [ 1293771600000 , 0] , [ 1296450000000 , 0.52216435716176] , [ 1298869200000 , 0.59275786698454] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 0] , [ 1320033600000 , 0] , [ 1322629200000 , 0] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0] , [ 1335758400000 , 0]]
                } ,
                {
                    "key" : "Antarctica" ,
                    "values" : [ [ 1025409600000 , 1.3503144674343] , [ 1028088000000 , 1.2232741112434] , [ 1030766400000 , 1.3930470790784] , [ 1033358400000 , 1.2631275030593] , [ 1036040400000 , 1.5842699103708] , [ 1038632400000 , 1.9546996043116] , [ 1041310800000 , 0.8504048300986] , [ 1043989200000 , 0.85340686311353] , [ 1046408400000 , 0.843061357391] , [ 1049086800000 , 2.119846992476] , [ 1051675200000 , 2.5285382124858] , [ 1054353600000 , 2.5056570712835] , [ 1056945600000 , 2.5212789901005] , [ 1059624000000 , 2.6192011642534] , [ 1062302400000 , 2.5382187823805] , [ 1064894400000 , 2.3393223047168] , [ 1067576400000 , 2.491219888698] , [ 1070168400000 , 2.497555874906] , [ 1072846800000 , 1.734018115546] , [ 1075525200000 , 1.9307268299646] , [ 1078030800000 , 2.2261679836799] , [ 1080709200000 , 1.7608893704206] , [ 1083297600000 , 1.6242690616808] , [ 1085976000000 , 1.7161663801295] , [ 1088568000000 , 1.7183554537038] , [ 1091246400000 , 1.7179780759145] , [ 1093924800000 , 1.7314274801784] , [ 1096516800000 , 1.2596883356752] , [ 1099195200000 , 1.381177053009] , [ 1101790800000 , 1.4408819615814] , [ 1104469200000 , 3.4743581836444] , [ 1107147600000 , 3.3603749903192] , [ 1109566800000 , 3.5350883257893] , [ 1112245200000 , 3.0949644237828] , [ 1114833600000 , 3.0796455899995] , [ 1117512000000 , 3.3441247640644] , [ 1120104000000 , 4.0947643978168] , [ 1122782400000 , 4.4072631274052] , [ 1125460800000 , 4.4870979780825] , [ 1128052800000 , 4.8404549457934] , [ 1130734800000 , 4.8293016233697] , [ 1133326800000 , 5.2238093263952] , [ 1136005200000 , 3.382306337815] , [ 1138683600000 , 3.7056975170243] , [ 1141102800000 , 3.7561118692318] , [ 1143781200000 , 2.861913700854] , [ 1146369600000 , 2.9933744103381] , [ 1149048000000 , 2.7127537218463] , [ 1151640000000 , 3.1195497076283] , [ 1154318400000 , 3.4066964004508] , [ 1156996800000 , 3.3754571113569] , [ 1159588800000 , 2.2965579982924] , [ 1162270800000 , 2.4486818633018] , [ 1164862800000 , 2.4002308848517] , [ 1167541200000 , 1.9649579750349] , [ 1170219600000 , 1.9385263638056] , [ 1172638800000 , 1.9128975336387] , [ 1175313600000 , 2.3412869836298] , [ 1177905600000 , 2.4337870351445] , [ 1180584000000 , 2.62179703171] , [ 1183176000000 , 3.2642864957929] , [ 1185854400000 , 3.3200396223709] , [ 1188532800000 , 3.3934212707572] , [ 1191124800000 , 4.2822327088179] , [ 1193803200000 , 4.1474964228541] , [ 1196398800000 , 4.1477082879801] , [ 1199077200000 , 5.2947122916128] , [ 1201755600000 , 5.2919843508028] , [ 1204261200000 , 5.198978305031] , [ 1206936000000 , 3.5603057673513] , [ 1209528000000 , 3.3009087690692] , [ 1212206400000 , 3.1784852603792] , [ 1214798400000 , 4.5889503538868] , [ 1217476800000 , 4.401779617494] , [ 1220155200000 , 4.2208301828278] , [ 1222747200000 , 3.89396671475] , [ 1225425600000 , 3.0423832241354] , [ 1228021200000 , 3.135520611578] , [ 1230699600000 , 1.9631418164089] , [ 1233378000000 , 1.8963543874958] , [ 1235797200000 , 1.8266636017025] , [ 1238472000000 , 0.93136635895188] , [ 1241064000000 , 0.92737801918888] , [ 1243742400000 , 0.97591889805002] , [ 1246334400000 , 2.6841193805515] , [ 1249012800000 , 2.5664341140531] , [ 1251691200000 , 2.3887523699873] , [ 1254283200000 , 1.1737801663681] , [ 1256961600000 , 1.0953582317281] , [ 1259557200000 , 1.2495674976653] , [ 1262235600000 , 0.36607452464754] , [ 1264914000000 , 0.3548719047291] , [ 1267333200000 , 0.36769242398939] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 0] , [ 1280548800000 , 0] , [ 1283227200000 , 0] , [ 1285819200000 , 0.85450741275337] , [ 1288497600000 , 0.91360317921637] , [ 1291093200000 , 0.89647678692269] , [ 1293771600000 , 0.87800687192639] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0.43668720882994] , [ 1304136000000 , 0.4756523602692] , [ 1306814400000 , 0.46947368328469] , [ 1309406400000 , 0.45138896152316] , [ 1312084800000 , 0.43828726648117] , [ 1314763200000 , 2.0820861395316] , [ 1317355200000 , 0.9364411075395] , [ 1320033600000 , 0.60583907839773] , [ 1322629200000 , 0.61096950747437] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0] , [ 1335758400000 , 0]]
                }
            ];
            var chart = nv.models.stackedAreaChart()
                    .x(function(d) { return d[0] })
                    .y(function(d) { return d[1] })
                    .clipEdge(true)
                    .useInteractiveGuideline(true)
                ;
            chart.xAxis
                .showMaxMin(false)
                .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
            chart.yAxis
                .tickFormat(d3.format(',.2f'));
            d3.select('#nvd35 svg')
                .datum(data5)
                .transition().duration(500).call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
        vm.nv6 = nv.addGraph(function() {
            var chart = nv.models.discreteBarChart()
                    .x(function(d) { return d.label })    //Specify the data accessors.
                    .y(function(d) { return d.value })
                    .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
                    .tooltips(false)        //Don't show tooltips
                    .showValues(true)       //...instead, show the bar value right on top of each bar.
                    .transitionDuration(350)
                ;
            d3.select('#nvd36 svg')
                .datum([{
                        key: "Cumulative Return",
                        values: [
                            {
                                "label" : "A Label" ,
                                "value" : -29.765957771107
                            } ,
                            {
                                "label" : "B Label" ,
                                "value" : 0
                            } ,
                            {
                                "label" : "C Label" ,
                                "value" : 32.807804682612
                            } ,
                            {
                                "label" : "D Label" ,
                                "value" : 196.45946739256
                            } ,
                            {
                                "label" : "E Label" ,
                                "value" : 0.19434030906893
                            } ,
                            {
                                "label" : "F Label" ,
                                "value" : -98.079782601442
                            } ,
                            {
                                "label" : "G Label" ,
                                "value" : -13.925743130903
                            } ,
                            {
                                "label" : "H Label" ,
                                "value" : -5.1387322875705
                            }
                        ]
                    }]).call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
    }
    chartsSparklineController.$inject = ['$timeout'];
    function chartsSparklineController($timeout) {
        var vm = this;
        angular.element("#spark").sparkline([10,8,9,3,5,8,5], { type: 'line'});
        angular.element("#spark1").sparkline([8,4,0,0,0,0,1,4,4,10,10,10,10,0,0,0,4,6,5,9,10], { type: 'line'});
        angular.element("#spark2").sparkline([1, 3, 5, 3, 8], { type: 'bar' });
        angular.element("#spark3").sparkline([5, 6, 7, 2, 0, -4, -2, 4], { type: 'bar', barColor: '#0000ff', negBarColor: '#ff0000' });
        angular.element("#spark4").sparkline([[3,4],[1,2],[3,2],[2,2],[1,1],[0,0],[0,1]], { type: 'bar'});
        angular.element("#spark5").sparkline([8,4,0,0,0,0,1,4,4,10,10,10,10,0,0,0,4,6,5,9,10], { fillColor: false }).sparkline([4,1,5,7,9,9,8,7,6,6,4,7,8,4,3,2,2,5,6,7], { composite: true, fillColor: false, lineColor: 'red' });
        angular.element("#spark6").sparkline([8,4,0,0,0,0,1,4,4,10,10,10,10,0,0,0,4,6,5,9,10],{ fillColor: false, normalRangeMin: -1, normalRangeMax: 8 });
        angular.element("#spark7").sparkline([4,6,7,7,4,3,2,1,4], { type: 'bar', barColor: '#aaf' }).sparkline([4,1,5,7,9,9,8,7,6,6,4,7,8,4,3,2,2,5,6,7], { composite: true, fillColor: false, lineColor: 'red' });
        angular.element('#spark8').sparkline([4,6,7,7,4,3,2,1,4,4,5,6,7,6,6,2,4,5], { type: 'discrete', lineColor: 'blue', xwidth:18});
        angular.element('#spark9').sparkline([4,6,7,7,4,3,2,1,4],{ type: 'discrete', lineColor: 'blue', thresholdColor: 'red', thresholdValue: 4 });
        angular.element('#spark10').sparkline([10,8,9,3,5,8,5,7], {height: '1.5em', width: '8em', lineColor: '#f00', fillColor: '#ffa', minSpotColor: false, maxSpotColor: false, spotColor: '#77f', spotRadius: 3});
        angular.element('#spark11').sparkline([1,1,0,1,-1,-1,1,-1,0,0,1,1], {type: 'tristate'});
        angular.element('#spark12').sparkline([1,2,0,2,-1,-2,1,-2,0,0,1,1], {type: 'tristate', colorMap: {'-2': '#fa7', '2': '#44f'} });
        angular.element('#spark13').sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], { type: 'box'});
        angular.element('#spark14').sparkline([ 1, 3, 5, 8, 10, 15, 18 ], {type:'box', raw: true, showOutliers:true, target: 6});
        angular.element('#spark15').sparkline([1,1,2], { type: 'pie', height: '1.0em' });
        angular.element('#spark16').sparkline([1,5], { type: 'pie', height: '1.0em' });
        angular.element('#spark17').sparkline([20,50,80], { type: 'pie', height: '1.0em' });
        angular.element('#spark18').sparkline([10,12,12,9,7], { type: 'bullet' });
        angular.element('#spark19').sparkline([14,12,12,9,7], { type: 'bullet' });
        angular.element('#spark20').sparkline([10,12,14,9,7], { type: 'bullet' });

        vm.drawMouseSpeedDemo = function () {
            var mrefreshinterval = 500; // update display every 500ms
            var lastmousex=-1;
            var lastmousey=-1;
            var lastmousetime;
            var mousetravel = 0;
            var mpoints = [];
            var mpoints_max = 30;
            angular.element('html').mousemove(function(e) {
                var mousex = e.pageX;
                var mousey = e.pageY;
                if (lastmousex > -1) {
                    mousetravel += Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) );
                }
                lastmousex = mousex;
                lastmousey = mousey;
            });
            var mdraw = function() {
                var md = new Date();
                var timenow = md.getTime();
                if (lastmousetime && lastmousetime!=timenow) {
                    var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
                    mpoints.push(pps);
                    if (mpoints.length > mpoints_max)
                        mpoints.splice(0,1);
                    mousetravel = 0;
                    angular.element('#mousespeed').sparkline(mpoints, { width: mpoints.length*2, tooltipSuffix: ' pixels per second' });
                }
                lastmousetime = timenow;
                $timeout(mdraw, mrefreshinterval);
            };
            // We could use setInterval instead, but I prefer to do it this way
            $timeout(mdraw, mrefreshinterval);
        };
        vm.drawMouseSpeedDemo();
    }
   /* tablesController.$inject = ['$timeout'];
    function tablesController($timeout) {
        var vm = this;
        vm.regular =
        {
            "headings":['Afiliado', 'Tipo', 'Documento', 'Fecha', 'Estado','Observacion'],
            "rows": [
                {
                    "orderId":'#7584',
                    "product":'Eclair',
                    "buyer":'Alvin',
                    "date":'27/01/2015',
                    "orderNote":'Lorem ipsum dolor sit amet consectetur adisciping elit.',
                    "payment":'Credit Card'
                },
                {
                    "orderId":'#7585',
                    "product":'Lollipop',
                    "buyer":'Jonathan',
                    "date":'2/05/2015',
                    "orderNote":'Lorem ipsum dolor sit amet consectetur adisciping elit.',
                    "payment":'Credit Card'
                },
                {
                    "orderId":'#7586',
                    "product":'KitKat',
                    "buyer":'Shannon',
                    "date":'12/10/2015',
                    "orderNote":'Lorem ipsum dolor sit amet consectetur adisciping elit.',
                    "payment":'Credit Card'
                },
                {
                    "orderId":'#7587',
                    "product":'Jellybean',
                    "buyer":'Alan',
                    "date":'18/12/2015',
                    "orderNote":'Lorem ipsum dolor sit amet consectetur adisciping elit.',
                    "payment":'Credit Card'
                },
                {
                    "orderId":'#7588',
                    "product":'Gingerbread',
                    "buyer":'Melanie',
                    "date":'8/02/2016',
                    "orderNote":'Lorem ipsum dolor sit amet consectetur adisciping elit.',
                    "payment":'Credit Card'
                }
            ]
        };
        vm.dataTable =
        {
            "headings":['Afiliado', 'Tipo', 'Documento', 'Fecha', 'Estado','Observacion'],
            "rows": [
                {
                    "Afiliado": "CC ",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                  {
                    "Afiliado": "CC ",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                  {
                    "Afiliado": "CC ",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                   "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                },
                {
                    "Afiliado": "Tiger Nixon",
                    "Tipo": "System Architect",
                    "Documento": "$320,800",
                    "Fecha": "2011/04/25",
                    "Estado": "Edinburgh",
                    "Observacion": "66"
                }
            ]
        }
    }*/
    ecommerceProductsController.$inject = ['$rootScope'];
    function ecommerceProductsController( $rootScope ) {
        angular.element('.tabs').tabs();
        angular.element('#products-table').DataTable({
            "dom": 't<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>><"clear">',
            "pagingType": "simple",
            "aLengthMenu": [[10, 20, 30, 50, 100, -1], [10, 20, 30, 50, 100, "All"]],
            "pageLength": 10
            //"scrollY": "600px",
            //"scrollCollapse": true,
            //responsive: true,
            //"language":{
            //    "lengthMenu": "Show _MENU_ products per page",
            //    "info": "Showing page _PAGE_ of _PAGES_"
            //}
            //"columns": [
            //    { "width": "5%" },
            //    { "width": "8%" },
            //    { "width": "13%" },
            //    null,
            //    { "width": "13%" },
            //    { "width": "13%" },
            //    { "width": "13%" },
            //    { "width": "8%" }
            //]
        });
        var oTable = angular.element('#products-table').DataTable();
        angular.element('#search-product').keyup(function(){
            oTable.search(angular.element(this).val()).draw();
        });
        angular.element('.product-count span:last').html(''+oTable.rows().count()+'');
        angular.element('.edit-product').on('click',function(){
            angular.element('#product-list').fadeOut('slow',function(){
                angular.element('#product-details').fadeIn('slow',function(){});
            });
        });
        angular.element( "#back-prod-table" ).click(function() {
            angular.element( "#product-details" ).slideUp(function() {
                angular.element( "#product-list" ).slideDown( function() {
                });
            });
        });
        CKEDITOR.replace( 'editor2' );
        angular.element("#myTags").tagit({
            allowDuplicates:true,
            placeholderText: 'Tag text'
        });
        if ( $rootScope.showProductEdit == true ) {
            $rootScope.showProductEdit = false;
            angular.element('.edit-product').click();
        }
    }
    ecommerceOrdersController.$inject = [ '$state', '$rootScope', '$scope'];
    function ecommerceOrdersController( $state, $rootScope, $scope ) {
        $scope.initialize = function() {
            var mapOpt = {
                center:new google.maps.LatLng(51.508742,-0.120850),
                zoom:5,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapOpt);
        };
        $scope.navigateToProductEdit = function() {
            $rootScope.showProductEdit = true;
            $state.go('mara.ec-products');
        };

        angular.element('.tabs').tabs();
        angular.element(".edit-product").click(function() {
            angular.element("#table-orders" ).slideUp(function() {
                angular.element( "#order-edit" ).slideDown( function() {
                    $scope.initialize();
                });
            });
        });
        angular.element( "#back-to-orders" ).click(function() {
            angular.element( "#order-edit" ).slideUp(function() {
                angular.element( "#table-orders" ).slideDown( function() {
                });
            });
        });
        angular.element('#orders-table').DataTable({
            "dom": 't<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>><"clear">',
            "pagingType": "simple",
            "aLengthMenu": [[10, 20, 30, 50, 100, -1], [10, 20, 30, 50, 100, "All"]],
            "pageLength": 10,
            //"scrollY": "600px",
            //"scrollCollapse": true,
            //responsive: true,
            "language":{
                "lengthMenu": "Show _MENU_ orders per page",
                "info": "Showing page _PAGE_ of _PAGES_"
            }
            //"columns": [
            //    { "width": "5%" },
            //    { "width": "8%" },
            //    { "width": "13%" },
            //    null,
            //    { "width": "8%%" },
            //    { "width": "13%" },
            //    { "width": "13%" },
            //    { "width": "13%" },
            //    { "width": "8%" }
            //]
        });
        var orTable = angular.element('#orders-table').DataTable();
        angular.element('#search-order').keyup(function(){
            orTable.search(angular.element(this).val()).draw();
        });
        angular.element('.order-count span:last').html(''+orTable.rows().count()+'');
    }
})();