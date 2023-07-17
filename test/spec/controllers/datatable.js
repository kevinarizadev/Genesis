'use strict';

describe('Controller: DatatableCtrl', function () {

  // load the controller's module
  beforeEach(module('GenesisApp'));

  var DatatableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatatableCtrl = $controller('DatatableCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
