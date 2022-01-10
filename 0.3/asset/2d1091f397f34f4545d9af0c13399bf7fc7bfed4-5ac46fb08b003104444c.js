(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{gTpR:function(t,e,i){!function(t,e){"use strict";function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,o(t,e)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var n=e.MathUtil.zeroTolerance,a=function(){function t(t,e,i){this.radius=void 0,this.phi=void 0,this.theta=void 0,this.radius=void 0!==t?t:1,this.phi=void 0!==e?e:0,this.theta=void 0!==i?i:0}var i=t.prototype;return i.set=function(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this},i.makeSafe=function(){return this.phi=e.MathUtil.clamp(this.phi,n,Math.PI-n),this},i.setFromVec3=function(t){return this.radius=t.length(),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t.x,t.z),this.phi=Math.acos(e.MathUtil.clamp(t.y/this.radius,-1,1))),this},i.setToVec3=function(t){var e=Math.sin(this.phi)*this.radius;return t.x=e*Math.sin(this.theta),t.y=Math.cos(this.phi)*this.radius,t.z=e*Math.cos(this.theta),this},t}(),h=e.MathUtil.zeroTolerance;function r(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),o=1;o<e;o++)i[o-1]=arguments[o];return i.some((function(e){return-1!==t.indexOf(e)}))}var c=function(t){function o(i){var o;return(o=t.call(this,i)||this)._forward=new e.Vector3,o._right=new e.Vector3,o.camera=void 0,o.mainElement=void 0,o.domElement=void 0,o.movementSpeed=void 0,o.rotateSpeed=void 0,o.floorMock=void 0,o.floorY=void 0,o.press=void 0,o.keysForward=void 0,o.keysBackward=void 0,o.keysLeft=void 0,o.keysRight=void 0,o._theta=void 0,o._phi=void 0,o._moveForward=void 0,o._moveBackward=void 0,o._moveLeft=void 0,o._moveRight=void 0,o._v3Cache=void 0,o._spherical=void 0,o._rotateOri=void 0,o._events=void 0,o.camera=i,o.mainElement=o.scene.engine.canvas._webCanvas,o.domElement=document,o.movementSpeed=1,o.rotateSpeed=1,o.floorMock=!0,o.floorY=0,o.press=!1,o.keysForward=["KeyW","ArrowUp"],o.keysBackward=["KeyS","ArrowDown"],o.keysLeft=["KeyA","ArrowLeft"],o.keysRight=["KeyD","ArrowRight"],o._theta=0,o._phi=0,o._moveForward=!1,o._moveBackward=!1,o._moveLeft=!1,o._moveRight=!1,o._v3Cache=new e.Vector3,o._spherical=new a,o._rotateOri=[0,0],o._events=[{type:"mousemove",listener:o.onMouseMove.bind(s(o))},{type:"touchmove",listener:o.onMouseMove.bind(s(o))},{type:"mousedown",listener:o.onMouseDown.bind(s(o))},{type:"touchstart",listener:o.onMouseDown.bind(s(o))},{type:"mouseup",listener:o.onMouseUp.bind(s(o))},{type:"touchend",listener:o.onMouseUp.bind(s(o))},{type:"keydown",listener:o.onKeyDown.bind(s(o)),element:window},{type:"keyup",listener:o.onKeyUp.bind(s(o)),element:window},{type:"contextmenu",listener:o.onContextMenu.bind(s(o))}],o.initEvents(),o.updateSpherical(),o}i(o,t);var n=o.prototype;return n.onContextMenu=function(t){t.preventDefault()},n.onKeyDown=function(t){var e=t.code,i=t.key,o=t.keyCode;r(this.keysForward,e,i,o)?this._moveForward=!0:r(this.keysBackward,e,i,o)?this._moveBackward=!0:r(this.keysLeft,e,i,o)?this._moveLeft=!0:r(this.keysRight,e,i,o)&&(this._moveRight=!0)},n.onKeyUp=function(t){var e=t.code,i=t.key,o=t.keyCode;r(this.keysForward,e,i,o)?this._moveForward=!1:r(this.keysBackward,e,i,o)?this._moveBackward=!1:r(this.keysLeft,e,i,o)?this._moveLeft=!1:r(this.keysRight,e,i,o)&&(this._moveRight=!1)},n.onMouseDown=function(t){t.stopPropagation(),t=t.changedTouches&&t.changedTouches[0]||t,this.domElement!==document&&this.domElement.focus(),this.press=!0,this._rotateOri=[t.clientX,t.clientY]},n.onMouseUp=function(t){t.preventDefault(),t.stopPropagation(),this.press=!1},n.onMouseMove=function(t){if(!1!==this.press&&!1!==this.enabled){t.preventDefault(),t.stopPropagation();var e=(t=t.changedTouches&&t.changedTouches[0]||t).clientX-this._rotateOri[0],i=t.clientY-this._rotateOri[1];this._rotateOri[0]=t.clientX,this._rotateOri[1]=t.clientY;var o=e*(180/this.mainElement.width),s=i*(180/this.mainElement.height);this.rotate(-o,s)}},n.rotate=function(t,i){void 0===t&&(t=0),void 0===i&&(i=0),this._theta+=e.MathUtil.degreeToRadian(t),this._phi+=e.MathUtil.degreeToRadian(i),this._phi=e.MathUtil.clamp(this._phi,h,Math.PI-h),this._spherical.theta=this._theta,this._spherical.phi=this._phi,this._spherical.setToVec3(this._v3Cache),e.Vector3.add(this.camera.transform.position,this._v3Cache,this._v3Cache),this.camera.transform.lookAt(this._v3Cache,new e.Vector3(0,1,0))},n.onUpdate=function(t){if(!1!==this.enabled){var e=t/1e3*this.movementSpeed;if(this.camera.transform.getWorldForward(this._forward),this.camera.transform.getWorldRight(this._right),this._moveForward&&this.camera.transform.translate(this._forward.scale(e),!1),this._moveBackward&&this.camera.transform.translate(this._forward.scale(-e),!1),this._moveLeft&&this.camera.transform.translate(this._right.scale(-e),!1),this._moveRight&&this.camera.transform.translate(this._right.scale(e),!1),this.floorMock){var i=this.camera.transform.position;i.y!==this.floorY&&this.camera.transform.setPosition(i.x,this.floorY,i.z)}}},n.initEvents=function(){var t=this;this._events.forEach((function(e){e.element?e.element.addEventListener(e.type,e.listener,!1):t.mainElement.addEventListener(e.type,e.listener,!1)}))},n.onDestroy=function(){var t=this;this._events.forEach((function(e){e.element?e.element.removeEventListener(e.type,e.listener,!1):t.mainElement.removeEventListener(e.type,e.listener,!1)}))},n.updateSpherical=function(){this._v3Cache.setValue(0,0,-1),e.Vector3.transformByQuat(this._v3Cache,this.camera.rotation,this._v3Cache),this._spherical.setFromVec3(this._v3Cache),this._theta=this._spherical.theta,this._phi=this._spherical.phi},o}(e.Script),l=function(t){function o(i){var o;return(o=t.call(this,i)||this).camera=void 0,o.domElement=void 0,o.mainElement=void 0,o.fov=void 0,o.target=void 0,o.up=void 0,o.minDistance=void 0,o.maxDistance=void 0,o.minZoom=void 0,o.maxZoom=void 0,o.enableDamping=void 0,o.zoomFactor=void 0,o.enableRotate=void 0,o.keyPanSpeed=void 0,o.minPolarAngle=void 0,o.maxPolarAngle=void 0,o.minAzimuthAngle=void 0,o.maxAzimuthAngle=void 0,o.enableZoom=void 0,o.dampingFactor=void 0,o.zoomSpeed=void 0,o.enablePan=void 0,o.autoRotate=void 0,o.autoRotateSpeed=Math.PI,o.rotateSpeed=void 0,o.enableKeys=void 0,o.keys=void 0,o.mouseButtons=void 0,o.touchFingers=void 0,o.STATE=void 0,o.mouseUpEvents=void 0,o.constEvents=void 0,o._position=void 0,o._offset=void 0,o._spherical=void 0,o._sphericalDelta=void 0,o._sphericalDump=void 0,o._zoomFrag=void 0,o._scale=void 0,o._panOffset=void 0,o._isMouseUp=void 0,o._vPan=void 0,o._state=void 0,o._rotateStart=void 0,o._rotateEnd=void 0,o._rotateDelta=void 0,o._panStart=void 0,o._panEnd=void 0,o._panDelta=void 0,o._zoomStart=void 0,o._zoomEnd=void 0,o._zoomDelta=void 0,o.camera=i,o.mainElement=o.engine.canvas._webCanvas,o.domElement=document,o.fov=45,o.target=new e.Vector3,o.up=new e.Vector3(0,1,0),o.minDistance=.1,o.maxDistance=1/0,o.minZoom=0,o.maxZoom=1/0,o.minPolarAngle=0,o.maxPolarAngle=Math.PI,o.minAzimuthAngle=-1/0,o.maxAzimuthAngle=1/0,o.enableDamping=!0,o.dampingFactor=.1,o.zoomFactor=.2,o.enableZoom=!0,o.zoomSpeed=1,o.enableRotate=!0,o.rotateSpeed=1,o.enablePan=!0,o.keyPanSpeed=7,o.autoRotate=!1,o.enableKeys=!1,o.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},o.mouseButtons={ORBIT:0,ZOOM:1,PAN:2},o.touchFingers={ORBIT:1,ZOOM:2,PAN:3},o._position=new e.Vector3,o._offset=new e.Vector3,o._spherical=new a,o._sphericalDelta=new a,o._sphericalDump=new a,o._zoomFrag=0,o._scale=1,o._panOffset=new e.Vector3,o._isMouseUp=!0,o._vPan=new e.Vector3,o._rotateStart=new e.Vector2,o._rotateEnd=new e.Vector2,o._rotateDelta=new e.Vector2,o._panStart=new e.Vector2,o._panEnd=new e.Vector2,o._panDelta=new e.Vector2,o._zoomStart=new e.Vector2,o._zoomEnd=new e.Vector2,o._zoomDelta=new e.Vector2,o.STATE={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM:4,TOUCH_PAN:5},o._state=o.STATE.NONE,o.constEvents=[{type:"mousedown",listener:o.onMouseDown.bind(s(o))},{type:"wheel",listener:o.onMouseWheel.bind(s(o))},{type:"keydown",listener:o.onKeyDown.bind(s(o)),element:window},{type:"touchstart",listener:o.onTouchStart.bind(s(o))},{type:"touchmove",listener:o.onTouchMove.bind(s(o))},{type:"touchend",listener:o.onTouchEnd.bind(s(o))},{type:"contextmenu",listener:o.onContextMenu.bind(s(o))}],o.mouseUpEvents=[{type:"mousemove",listener:o.onMouseMove.bind(s(o))},{type:"mouseup",listener:o.onMouseUp.bind(s(o))}],o.constEvents.forEach((function(t){t.element?t.element.addEventListener(t.type,t.listener,!1):o.mainElement.addEventListener(t.type,t.listener,!1)})),o}i(o,t);var n=o.prototype;return n.onDisable=function(){var t=this.domElement===document?this.domElement.body:this.domElement;this.mainElement.removeEventListener(this.mouseUpEvents[0].type,this.mouseUpEvents[0].listener,!1),t.removeEventListener(this.mouseUpEvents[1].type,this.mouseUpEvents[1].listener,!1)},n.onDestroy=function(){var t=this;this.constEvents.forEach((function(e){e.element?e.element.removeEventListener(e.type,e.listener,!1):t.mainElement.removeEventListener(e.type,e.listener,!1)}));var e=this.domElement===document?this.domElement.body:this.domElement;this.mainElement.removeEventListener(this.mouseUpEvents[0].type,this.mouseUpEvents[0].listener,!1),e.removeEventListener(this.mouseUpEvents[1].type,this.mouseUpEvents[1].listener,!1)},n.onUpdate=function(t){this.enabled&&(this.camera.transform.position.cloneTo(this._offset),this._offset.subtract(this.target),this._spherical.setFromVec3(this._offset),this.autoRotate&&this._state===this.STATE.NONE&&this.rotateLeft(this.getAutoRotationAngle(t)),this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi,this._spherical.theta=Math.max(this.minAzimuthAngle,Math.min(this.maxAzimuthAngle,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),1!==this._scale&&(this._zoomFrag=this._spherical.radius*(this._scale-1)),this._spherical.radius+=this._zoomFrag,this._spherical.radius=Math.max(this.minDistance,Math.min(this.maxDistance,this._spherical.radius)),this.target.add(this._panOffset),this._spherical.setToVec3(this._offset),this.target.cloneTo(this._position),this._position.add(this._offset),this.camera.transform.position=this._position,this.camera.transform.lookAt(this.target,this.up),!0===this.enableDamping?(this._sphericalDump.theta*=1-this.dampingFactor,this._sphericalDump.phi*=1-this.dampingFactor,this._zoomFrag*=1-this.zoomFactor,this._isMouseUp?(this._sphericalDelta.theta=this._sphericalDump.theta,this._sphericalDelta.phi=this._sphericalDump.phi):this._sphericalDelta.set(0,0,0)):(this._sphericalDelta.set(0,0,0),this._zoomFrag=0),this._scale=1,this._panOffset.setValue(0,0,0))},n.getAutoRotationAngle=function(t){return this.autoRotateSpeed/1e3*t},n.getZoomScale=function(){return Math.pow(.95,this.zoomSpeed)},n.rotateLeft=function(t){this._sphericalDelta.theta-=t,this.enableDamping&&(this._sphericalDump.theta=-t)},n.rotateUp=function(t){this._sphericalDelta.phi-=t,this.enableDamping&&(this._sphericalDump.phi=-t)},n.panLeft=function(t,e){var i=e.elements;this._vPan.setValue(i[0],i[1],i[2]),this._vPan.scale(t),this._panOffset.add(this._vPan)},n.panUp=function(t,e){var i=e.elements;this._vPan.setValue(i[4],i[5],i[6]),this._vPan.scale(t),this._panOffset.add(this._vPan)},n.pan=function(t,e){var i=this.domElement===document?this.domElement.body:this.domElement;this.camera.position.cloneTo(this._vPan),this._vPan.subtract(this.target);var o=this._vPan.length();o*=this.fov/2*(Math.PI/180),this.panLeft(-2*t*(o/i.clientHeight),this.camera.transform.worldMatrix),this.panUp(2*e*(o/i.clientHeight),this.camera.transform.worldMatrix)},n.zoomIn=function(t){this._scale*=t},n.zoomOut=function(t){this._scale/=t},n.handleMouseDownRotate=function(t){this._rotateStart.setValue(t.clientX,t.clientY)},n.handleMouseDownZoom=function(t){this._zoomStart.setValue(t.clientX,t.clientY)},n.handleMouseDownPan=function(t){this._panStart.setValue(t.clientX,t.clientY)},n.handleMouseMoveRotate=function(t){this._rotateEnd.setValue(t.clientX,t.clientY),e.Vector2.subtract(this._rotateEnd,this._rotateStart,this._rotateDelta);var i=this.domElement===document?document.body:this.domElement;this.rotateLeft(2*Math.PI*(this._rotateDelta.x/i.clientWidth)*this.rotateSpeed),this.rotateUp(2*Math.PI*(this._rotateDelta.y/i.clientHeight)*this.rotateSpeed),this._rotateEnd.cloneTo(this._rotateStart)},n.handleMouseMoveZoom=function(t){this._zoomEnd.setValue(t.clientX,t.clientY),e.Vector2.subtract(this._zoomEnd,this._zoomStart,this._zoomDelta),this._zoomDelta.y>0?this.zoomOut(this.getZoomScale()):this._zoomDelta.y<0&&this.zoomIn(this.getZoomScale()),this._zoomEnd.cloneTo(this._zoomStart)},n.handleMouseMovePan=function(t){this._panEnd.setValue(t.clientX,t.clientY),e.Vector2.subtract(this._panEnd,this._panStart,this._panDelta),this.pan(this._panDelta.x,this._panDelta.y),this._panEnd.cloneTo(this._panStart)},n.handleMouseWheel=function(t){t.deltaY<0?this.zoomIn(this.getZoomScale()):t.deltaY>0&&this.zoomOut(this.getZoomScale())},n.handleKeyDown=function(t){switch(t.keyCode){case this.keys.UP:this.pan(0,this.keyPanSpeed);break;case this.keys.BOTTOM:this.pan(0,-this.keyPanSpeed);break;case this.keys.LEFT:this.pan(this.keyPanSpeed,0);break;case this.keys.RIGHT:this.pan(-this.keyPanSpeed,0)}},n.handleTouchStartRotate=function(t){this._rotateStart.setValue(t.touches[0].pageX,t.touches[0].pageY)},n.handleTouchStartZoom=function(t){var e=t.touches[0].pageX-t.touches[1].pageX,i=t.touches[0].pageY-t.touches[1].pageY,o=Math.sqrt(e*e+i*i);this._zoomStart.setValue(0,o)},n.handleTouchStartPan=function(t){this._panStart.setValue(t.touches[0].pageX,t.touches[0].pageY)},n.handleTouchMoveRotate=function(t){this._rotateEnd.setValue(t.touches[0].pageX,t.touches[0].pageY),e.Vector2.subtract(this._rotateEnd,this._rotateStart,this._rotateDelta);var i=this.domElement===document?this.domElement.body:this.domElement;this.rotateLeft(2*Math.PI*this._rotateDelta.x/i.clientWidth*this.rotateSpeed),this.rotateUp(2*Math.PI*this._rotateDelta.y/i.clientHeight*this.rotateSpeed),this._rotateEnd.cloneTo(this._rotateStart)},n.handleTouchMoveZoom=function(t){var i=t.touches[0].pageX-t.touches[1].pageX,o=t.touches[0].pageY-t.touches[1].pageY,s=Math.sqrt(i*i+o*o);this._zoomEnd.setValue(0,s),e.Vector2.subtract(this._zoomEnd,this._zoomStart,this._zoomDelta),this._zoomDelta.y>0?this.zoomIn(this.getZoomScale()):this._zoomDelta.y<0&&this.zoomOut(this.getZoomScale()),this._zoomEnd.cloneTo(this._zoomStart)},n.handleTouchMovePan=function(t){this._panEnd.setValue(t.touches[0].pageX,t.touches[0].pageY),e.Vector2.subtract(this._panEnd,this._panStart,this._panDelta),this.pan(this._panDelta.x,this._panDelta.y),this._panEnd.cloneTo(this._panStart)},n.onMouseDown=function(t){if(!1!==this.enabled){switch(t.preventDefault(),this._isMouseUp=!1,t.button){case this.mouseButtons.ORBIT:if(!1===this.enableRotate)return;this.handleMouseDownRotate(t),this._state=this.STATE.ROTATE;break;case this.mouseButtons.ZOOM:if(!1===this.enableZoom)return;this.handleMouseDownZoom(t),this._state=this.STATE.ZOOM;break;case this.mouseButtons.PAN:if(!1===this.enablePan)return;this.handleMouseDownPan(t),this._state=this.STATE.PAN}if(this._state!==this.STATE.NONE){var e=this.domElement===document?this.domElement.body:this.domElement;this.mainElement.addEventListener(this.mouseUpEvents[0].type,this.mouseUpEvents[0].listener,!1),e.addEventListener(this.mouseUpEvents[1].type,this.mouseUpEvents[1].listener,!1)}}},n.onMouseMove=function(t){if(!1!==this.enabled)switch(t.preventDefault(),this._state){case this.STATE.ROTATE:if(!1===this.enableRotate)return;this.handleMouseMoveRotate(t);break;case this.STATE.ZOOM:if(!1===this.enableZoom)return;this.handleMouseMoveZoom(t);break;case this.STATE.PAN:if(!1===this.enablePan)return;this.handleMouseMovePan(t)}},n.onMouseUp=function(){var t=this;!1!==this.enabled&&(this._isMouseUp=!0,this.mouseUpEvents.forEach((function(e){(t.domElement===document?t.domElement.body:t.domElement).removeEventListener(e.type,e.listener,!1),t.mainElement.removeEventListener(e.type,e.listener,!1)})),this._state=this.STATE.NONE)},n.onMouseWheel=function(t){!1===this.enabled||!1===this.enableZoom||this._state!==this.STATE.NONE&&this._state!==this.STATE.ROTATE||(t.preventDefault(),t.stopPropagation(),this.handleMouseWheel(t))},n.onKeyDown=function(t){!1!==this.enabled&&!1!==this.enableKeys&&!1!==this.enablePan&&this.handleKeyDown(t)},n.onTouchStart=function(t){if(!1!==this.enabled)switch(this._isMouseUp=!1,t.touches.length){case this.touchFingers.ORBIT:if(!1===this.enableRotate)return;this.handleTouchStartRotate(t),this._state=this.STATE.TOUCH_ROTATE;break;case this.touchFingers.ZOOM:if(!1===this.enableZoom)return;this.handleTouchStartZoom(t),this._state=this.STATE.TOUCH_ZOOM;break;case this.touchFingers.PAN:if(!1===this.enablePan)return;this.handleTouchStartPan(t),this._state=this.STATE.TOUCH_PAN;break;default:this._state=this.STATE.NONE}},n.onTouchMove=function(t){if(!1!==this.enabled)switch(t.preventDefault(),t.stopPropagation(),t.touches.length){case this.touchFingers.ORBIT:if(!1===this.enableRotate)return;if(this._state!==this.STATE.TOUCH_ROTATE)return;this.handleTouchMoveRotate(t);break;case this.touchFingers.ZOOM:if(!1===this.enableZoom)return;if(this._state!==this.STATE.TOUCH_ZOOM)return;this.handleTouchMoveZoom(t);break;case this.touchFingers.PAN:if(!1===this.enablePan)return;if(this._state!==this.STATE.TOUCH_PAN)return;this.handleTouchMovePan(t);break;default:this._state=this.STATE.NONE}},n.onTouchEnd=function(){!1!==this.enabled&&(this._isMouseUp=!0,this._state=this.STATE.NONE)},n.onContextMenu=function(t){!1!==this.enabled&&t.preventDefault()},o}(e.Script);t.FreeControl=c,t.OrbitControl=l,Object.defineProperty(t,"__esModule",{value:!0})}(e,i("qSBo"))}}]);