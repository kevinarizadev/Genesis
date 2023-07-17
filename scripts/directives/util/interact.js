'use strict';


angular.module('GenesisApp')
  .directive('interact', function () {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
		  //var  x = 1, y = 1;

		  interact(element[0])
		  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
    	restriction: "parent",
    	endOnly: true,
    	elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
    	var textEl = event.target.querySelector('p');

    	textEl && (textEl.textContent =
    		'moved a distance of '
    		+ (Math.sqrt(event.dx * event.dx +
    			event.dy * event.dy)|0) + 'px');
    }


});
		    /*.draggable({
		     //var isDraggable = interact('ul li').draggable();
		      snap: {
		        targets: [
		          interact.createSnapGrid({ x: 1, y: 1 })
		        ],
		        range: Infinity,
		        relativePoints: [ { x: 0, y: 0 } ]
		      },
		      inertia: {
		      	enabled          : false,
                    resistance       : 10,    // the lambda in exponential decay
                    minSpeed         : 100,   // target speed must be above this for inertia to start
                    endSpeed         : 10,    // the speed at which inertia is slow enough to stop
                    allowResume      : true,  // allow resuming an action in inertia phase
                    zeroResumeDelta  : true,  // if an action is resumed after launch, set dx/dy to 0
                    smoothEndDuration: 300    // animate to snap/restrict endOnly if there's no inertia
                },
		      restrict: {
		        restriction: "parent",
		        elementRect: { top: 0, left: 0, bottom: 0.25, right: 0.25 },
		        endOnly: true
		      }
		    })
			.ignoreFrom('input, button, select, ul, li, .gridContainer, .date, textarea')
			
			.on('touch', function (event) {
		      x += event.dx;
		      y += event.dy;

		      event.target.style.webkitTransform = event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
		    })

		    .on('dragmove', function (event) {
		      x += event.dx;
		      y += event.dy;

		      event.target.style.webkitTransform = event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
		    });
*/
		
      function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

      }
    };
  });


 