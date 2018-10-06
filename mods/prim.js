

//(function(){    

    ///////////////////////////////////////////
    //////@@@@/////@@/////@@@@//@@///@@@///////
    //////@///@///@//@///@@//@//@@//@///@//////
    //////@@@@////@@@@////@@////@@//@//////////
    //////@///@//@////@//@//@@//@@//@///@//////
    //////@@@@///@////@//@@@@///@@///@@@///////
    ///////////////////////////////////////////

    /** @class Basic
     *  
     *  Description
     */
    function Basic(options){
        
        /** @brief inits basic attributes, setting default
         *         variables and setting options;
         *  
         *  Null class with basic functionality provided.
         *  Used with basic methods to avoid repeating them 
         *  in another classes;
         *
         *  @param options The object with attributes passed
         *         as initial;
         *  @return undefined;
         */
        this.constructor;
        
        /** @bfief Catch events;
         *
         *  Attach function to handle events;
         *
         *  @param name The name of event to be catched;
         *  @param fn The function that will be triggered if
         *         event is activated;
         *  @return undefined;
         */
        this.addEvent;
        
        /** @brief Remove event listener;
         *
         *  Remove function that handle events;
         *
         *  @param name The name of event to be catched;
         *  @param fn The function that will be triggered if
         *         event is activated;
         *  @return {bool} true if function was deleted;
         */
        this.removeEvent;
        
        /** @brief Trigger event;
         *
         *  Trigger event [name] and call all functions attached
         *  to this event name;
         *
         *  @param name The name of event
         *  @param fn The function that will be triggered if
         *         event is activated;
         *  @return undefined;
         */
        this._triggerEvent;
        
        /**
         *
         */
        this._showError;
        
        /** @brief init default attributes;
         *
         *  Overwrite this method using youre attributes
         *  specified for needed class;
         *
         *  @param name The name of event
         *  @param ev The object that will be passed as
         *         paramener to event function;
         *  @return undefiend;
         */
        this.__initAttributes;
        
        /** @brief set default attributes;
         *
         *  Overwrite this method using youre attributes
         *  specified for your needs;
         *
         *  @return udnefined;
         */
        this.__setDefaults;
        
        /** @brief apply options;
         *
         *  Setting up options 
         *
         *  @param options The object with attributes passed
         *  @return undefined;
         */
        this.__setOptions;
        
        //////////////////////
        
        this.__initAttributes();
        this.__setDefaults();
        this.__setOptions(options);
        
    }
    var bProto = Basic.prototype;
    
    bProto.addEvent = function(name, fn){
        if(!this._events[name])
            this._events[name] = [];
        this._events[name].push(fn);
    }
    
    bProto.removeEvent = function(name, fn){
        var arr = this._events[name];
        if(!arr)
            return false;
        var ind = arr.indexOf(fn);
        if(ind < 0)
            return false;
        arr.splice(ind,1);
        return true;
    }
    
    bProto._triggerEvent = function(name, ev){
        var arr = this._events[name];
        if(!arr)
            return;
        //for(let i=0;i<arr.length;i++)
        for(let fn of arr)
            fn(ev);
    }
    
    bProto._showError = function(errid){
        throw new Error({id: errid, description: ERRORS[errid]});
    }
    
    bProto.__initAttributes = function(){
        this._settings = {};
        this._events = {};
        this.__evnames = {};
        this.__errors = {};
    }
    
    bProto.__setDefaults = function(){
        this._settings.test = true;
    }
    
    bProto.__setOptions = function(options){
        if(!options)
            return;
        Object.assign(this._settings, options);
    }
    


    ////////////////////////////////////////
    //////@@///@@////@@////@@//@@////@//////
    //////@/@/@/@///@//@///@@//@/@///@//////
    //////@//@//@///@@@@///@@//@//@//@//////
    //////@/////@//@////@//@@//@///@/@//////
    //////@/////@//@////@//@@//@////@@//////
    ////////////////////////////////////////

    /** @class Prim extends Basic
     *  
     *  Description
     */
    function Prim(options){
        
        /**
         *
         */
        this.constructor;
        
        /**
         *
         */
        this.tick;
        
        /**
         *
         */
        this.start;
        
        /**
         *
         */
        this.stop;
        
        /**
         *
         */
        this.insert;
        
        /**
         *
         */
        this.remove;
        
        /**
         *
         */
        this.resize;
        
        /**
         *
         */
        this._cycle;
        
        /**
         *
         */
        this._render;
        
        /**
         *
         */
        this._clear;
        
        /**
         *
         */
        this._startAnimation;
        
        /**
         *
         */
        this._stopAnimation;
        
        /**
         *
         */
        this._getId;
        
        /**
         *
         */
        this._insertObject;
        
        /**
         *
         */
        this._removeObject;
        
        /**
         *
         */
        this._defineShaders;
        
        /**
         *
         */
        this._initGL;
        
        /**
         *
         */
        this._setCanvasSize;
        
        /**
         *
         */
        this.__binarySearch;
        
        /**
         *
         */
        this.__initAttributes;
        
        /**
         *
         */
        this.__setDefaults;
        
        //////////////////////
        
        this.super.constructor.call(this, options);
        this._defineShaders();
        this._initGL();
    }
    inherit(Prim, Basic);
    
    var proto = Prim.prototype;
    
    proto.tick = function(){
        let ev = {object: this, ev:this.__evnames.tick};
        this._triggerEvent(this.__evnames.tick, ev);
        for(let i=0;i<this.objects.length;i++)
            this.objects[i].tick();
    }
    
    proto.start = function(){
        this._startAnimation();
    }
    
    proto.stop = function(){
        this._stopAnimation();
    }
    
    proto.insert = function(obj){
        if(!(obj instanceof PrimObject))
            this._showError(this.__errors.bad_insert_input);
        this._objectsIds[obj._id] = obj;
        this._insertObject(obj);
    }
    
    proto.remove = function(obj){
        if(typeof obj == 'number')
            obj = this._objectsIds[obj];
        if(!obj || !(obj instanceof PrimObject) || !this._objectsIds[obj._id])
            this._showError(this.__errors.bad_remove_input);
        delete this._objectsIds[obj._id];
        this._removeObject(obj);
        return obj;
    }
    
    proto.resize = function(width,height){
        this.width = width;
        this.height = height;
        this._setCanvasSize();
    }
    
    proto._cycle = function(tm){
        this.tick();
        this._render();
        this.__time = tm;
        this._animation = requestAnimationFrame(()=>{
            this._cycle(window.performance.now());
        });
    }
    
    proto._render = function(){
        this._clear();
        for(let o of this.objects){
            let r = o._render();
            this.__arr.position.push(...r.position);
            this.__arr.color.push(...r.color);
        }
        
        var gl = this.gl;
        var g = this._gl;
        gl.uniform2f(g.a.uniforms.resolution, gl.canvas.width, gl.canvas.height);
        g.render();
    }
    
    proto._clear = function(){
        this.__arr.position.splice(0);
        this.__arr.color.splice(0);
    }
    
    proto._startAnimation = function(){
        this.__time = window.performance.now();
        this._cycle(this.__time);
    }
    
    proto._stopAnimation = function(){
        cancelAnimationFrame(this._animation);
    }
    
    proto._getId = function(){
        return ++this.__gidinc;
    }
    
    proto._removeObject = function(obj){
        let io = this.objects.indexOf(obj);
        let it = this._objectsTopSorted.indexOf(obj);
        let il = this._objectsLeftSorted.indexOf(obj);
        let ir = this._objectsRightSorted.indexOf(obj);
        let ib = this._objectsBottomSorted.indexOf(obj);
        this.objects.splice(io,1);
        this._objectsTopSorted.splice(it,1);
        this._objectsLeftSorted.splice(il,1);
        this._objectsRightSorted.splice(ir,1);
        this._objectsBottomSorted.splice(ib,1);
    }
    
    proto._insertObject = function(obj){

        this.objects.push(obj);
        
        let it = this.__binarySearch(this._objectsTopSorted, o=>obj.top<o._limit.top);
        let il = this.__binarySearch(this._objectsLeftSorted, o=>obj.left<o._limit.left);
        let ir = this.__binarySearch(this._objectsRightSorted, o=>obj.right<o._limit.right);
        let ib = this.__binarySearch(this._objectsBottomSorted, o=>obj.bottom<o._limit.bottom);
        
        this._objectsTopSorted.splice(it,0,obj);
        this._objectsLeftSorted.splice(il,0,obj);
        this._objectsRightSorted.splice(ir,0,obj);
        this._objectsBottomSorted.splice(ib,0,obj);
        
    }
    
    
    proto._initGL = function(){
        this._canvas = createCanvas();
        this._setCanvasSize();
		this.gl = this._canvas.getContext('experimental-webgl');
		var attrs = [
			{name: 'position', size: 2, type: this.gl.DYNAMIC_DRAW, arr: this.__arr.position, attr:'a_position'},
			{name: 'color', size: 4, type: this.gl.DYNAMIC_DRAW, arr: this.__arr.color, attr:'a_color'}
		];
		var unifs = [
			{name: 'resolution', attr:'u_resolution'}
		]
		this._defineShaders();
		var opts = {
			vs: this.__vs,
			fs: this.__fs,
			attributes: attrs,
			uniforms: unifs
		};
		var g = new GL(this.gl, opts);
		this._gl = g;
	}

	proto._defineShaders = function(){
		this.__vs = 
			'attribute vec2 a_position;'+
			'attribute vec4 a_color;'+
			'uniform vec2 u_resolution;'+
			'varying vec4 v_color;'+
			'varying vec2 v_position;'+
			'void main(){'+
				'vec2 position;'+
				'vec2 tpos = a_position;'+
				'position = (tpos/u_resolution)*2.0-1.0;'+
				'/*position = tpos;*/'+
				'v_position = position;'+
				'v_color = a_color;'+
				'gl_Position = vec4(position,0,1);'+
			'}';
		this.__fs = 
			'precision mediump float;'+
			'varying vec4 v_color;'+
			'varying vec2 v_position;'+
			'void main(){'+
				'vec4 color = v_color;'+
				'gl_FragColor = color;'+
			'}';
			
	}
    
    proto._setCanvasSize = function(){
        this._canvas.width = this.width;
        this._canvas.height = this.height;
    }
    
    
    proto.__binarySearch = function(arr,cb){
        let mn = 0;
        let mx = arr.length;
        let md;
        if(!arr.length)
            return 0;
        while(mn < mx){
            md = Math.floor((mn+mx)/2);
            if(cb(arr[md])){
                mn = md+1;
            }
            else{
                mx = md-1;
            }
        }
        if(cb(arr[mn]))
            mn++;
        return mn;
    }
    
    proto.__initAttributes = function(){
        this.super.__initAttributes.call(this);
        this.objects = [];
        this.gl;
        this.width;
        this.height;
        this._objectsIds = {};
        this._objectsTopSorted = [];
        this._objectsLeftSorted = [];
        this._objectsRightSorted = [];
        this._objectsBottomSorted = [];
        this._animation;
        this.__arr = {position:[],color:[]};
        this.__vs;
        this.__fs;
        this.__gidinc = 0;
    }
    
    proto.__setDefaults = function(){
        this.width = 800;
        this.height = 600;
        //Link General Object to P attribute;
        this.Object.prototype.P = this;
        this.__evnames.tick = 'tick';
        this.__errors.bad_insert_input = 101;
        this.__errors.bad_remove_input = 102;
    }
    
    
    ////////////////////////////////////////////////////
    ///////@@@///@@@@///////@//@@@@@///@@@///@@@@@//////
    //////@///@//@///@//////@//@//////@///@////@////////
    //////@///@//@@@@///////@//@@@@@//@////////@////////
    //////@///@//@///@//@///@//@//////@///@////@////////
    ///////@@@///@@@@////@@@///@@@@@///@@@/////@////////
    ////////////////////////////////////////////////////

    /** @class PrimObject extends Basic
     *  
     *  Description
     */
    function PrimObject(options){
        
        /**
         *
         */
        this.constructor;
        
        /**
         *
         */
        this.move;
        
        /**
         *
         */
        this.rotate;
        
        /**
         *
         */
        this.scale;
        
        /**
         *
         */
        this.transform;
        
        /**
         *
         */
        this.tick;
        
        /**
         *
         */
        this.insert;
        
        /**
         *
         */
        this.remove;
        
        /**
         *
         */
        this.setTransform;
        
        /**
         *
         */
        this._render;
        
        /**
         *
         */
        this._updatePoints;
        
        /**
         *
         */
        this._recalculateLimits;
        
        /**
         *
         */
        this.__initAttributes;
        
        /**
         *
         */
        this.__setDefaults;
        
        //////////////////////
        
        this.super.constructor.call(this, options);
        this._id = this.P._getId();
    }
    inherit(PrimObject, Basic);
    var oProto = PrimObject.prototype;
    
    oProto.move = function(x,y){
        this.pos.x = x;
        this.pos.y = y;
        let ev = {pos: this.pos, obj:this, ev:this.__evnames.move, type:'move'};
        this._triggerEvent(this.__evnames.move, ev);
        this._updatePoints();
    }
    
    oProto.rotate = function(r){
        this.pos.r = r;
        let ev = {pos: this.pos, obj:this, ev:this.__evnames.move, type:'rotate'};
        this._triggerEvent(this.__evnames.move, ev);
        this._updatePoints();
    }
    
    oProto.scale = function(x,y){
        this.pos.sx = x;
        this.pos.sy = y;
        let ev = {pos: this.pos, obj:this, ev:this.__evnames.move, type:'scale'};
        this._triggerEvent(this.__evnames.move, ev);
        this._updatePoints();
    }
    
    oProto.transform = function(x,y,r,sx,sy){
        this.setTransform(x,y,r,sx,sy);
        let ev = {pos: this.pos, obj:this, ev:this.__evnames.move, type:'transform'};
        this._triggerEvent(this.__evnames.move, ev);
        this._updatePoints();
    }
    
    oProto.tick = function(){

        let ev = {object: this, ev:this.__evnames.tick};
        this._triggerEvent(this.__evnames.move, ev);
        for(let i=0;i<this.points.length;i++)
            this.points[i].tick();
        
    }
    
    oProto.insert = function(ind, obj){
       
        if(typeof ind == 'object'){
            obj = ind;
            ind = this.points.length;
        }
        if(!obj || !(obj instanceof Point)){
            this._showError(this.__errors.insert_bad_object);
        }
        
        obj.P = this;
        this.points.splice(ind,0,obj);
        this._recalculateLimits();
        
        obj.update();
        
    }
    
    oProto.remove = function(ind, count){
        
        if(typeof ind == 'object'){
            ind = this.points.indexOf(ind);
        }
        if(ind < 0)
            return [];
        let pts = this.points.splice(ind, count);
        this._recalculateLimits();
        return pts;
        
    }
    
    oProto.setTransform = function(x,y,r,sx,sy){
        this.pos.x = x;
        this.pos.y = y;
        this.pos.r = r;
    }
    
    oProto._render = function(){
        let fp,sp;
        let rt = {position: [], color: []};
        for(let i of this.points){
            for(let j of i._vertices()){
                if(!fp){
                    fp = j;
                    continue;
                }
                if(!sp){
                    sp = j;
                    continue;
                }
                rt.position.push(fp.position.x,fp.position.y, sp.position.x,sp.position.y, j.position.x,j.position.y);
                rt.color.push(fp.color[0],fp.color[1],fp.color[2],fp.color[3], sp.color[0],sp.color[1],sp.color[2],sp.color[3], j.color[0],j.color[1],j.color[2],j.color[3]);
                
                sp = j;
            }
        }
        return rt;
    }
    
    oProto._updatePoints = function(){
        for(let i=0;i<this.points.length;i++)
            this.points[i].update();
    }
    
    oProto._recalculateLimits = function(){
        let top = Infinity;
        let left = Infinity;
        let right = -Infinity;
        let bottom = -Infinity;
        for(let p of this.points){
            top = Math.min(top, p.top());
            left = Math.min(left, p.left());
            right = Math.max(right, p.right());
            bottom = Math.max(bottom, p.bottom());
        }
        this._limit.top = top;
        this._limit.left = left;
        this._limit.right = right;
        this._limit.bottom = bottom;
    }
    
    oProto.__initAttributes = function(){
        this.super.__initAttributes.call(this);
        this.points = [];
        this.pos = {x:0,y:0,r:0,sx:1,sy:1};
        this._collision = {};
        this._force = {x:0,y:0,r:0};
        this._limit = {left:0,right:0,top:0,bottom:0};
        this._id;
    }
    
    oProto.__setDefaults = function(){
        this.__errors.insert_bad_object = 201;
        
        this.__evnames.tick = 'tick';
        this.__evnames.move = 'move';
    }
    
    
    
    
    
    ////////////////////////////////////////////
    //////@@@@////@@@///@@//@@////@//@@@@@//////
    //////@///@//@///@//@@//@/@///@////@////////
    //////@@@@///@///@//@@//@//@//@////@////////
    //////@//////@///@//@@//@///@/@////@////////
    //////@///////@@@///@@//@////@@////@////////
    ////////////////////////////////////////////
    
    /** @class Point extends Basic
     *  
     *  Description
     */
    function Point(options){
        
        /** 
         *
         */
        this.constructor;
        
        /** @brief Set point position instantly
         *
         *  Set current point position, bezie start and
         *  bezie end attributes;
         *
         *  @param obj The object position;
         *  @return undefined;
         */
        this.set;
        
        /**
         *
         */
        this.tick;
        
        /**
         *
         */
        this.move;
        
        /**
         *
         */
        this.update;
        
        /**
         *
         */
        this.top;
        
        /**
         *
         */
        this.left;
        
        /**
         *
         */
        this.right;
        
        /**
         *
         */
        this.bottom;
        
        /**
         *
         */
        this.local;
        
        
        /**
         *
         */
        this._set;
        
        /**
         *
         */
        this._updateLocals;
        
        /**
         *
         */
        this._vertices;
        
        /** @brief Convert arguments position to object;
         *
         *  Convert arguments position to object;
         *
         *  @param x The absolute position by x coordinate || object
         *         or array with x,y[,sx,[sy, [ex, [ey]]]] parameters;
         *  @param y The absolute position by y coordinate. Optional
         *         if first parameter array or object;
         *  @return undefiend;
         */
        this._argsToPos;
        
        /**
         *
         */
        this._pointPos;
        
        /** @brief Init specified attributes; @override;
         *
         *  Init Specified point attributes;
         *
         *  @return undefined;
         */
        this.__initAttributes;        
        
        /** @brief Init specified defaults; @override;
         *
         *  Init Specified point default values;
         *
         *  @return undefined;
         */
        this.__setDefaults;
        
        ////////////////////
        
        this.super.constructor.call(this, options);
        
    }
    inherit(Point, Basic);
    var pProto = Point.prototype;
    
    pProto.set = function(x,y){
        
        let pos = this._argsToPos(x,y);
        
        this._set(pos);
        
        this._updateLocals();
        
    }
    
    pProto.move = function(x,y,sx,sy,ex,ey){
        
        let ev = {pos: this._argsToPos(x,y), ev:this.__evnames.move};
        this._triggerEvent(this.__evnames.move, ev);
        this.set(ev.pos);
        
    }
    
    pProto.update = function(){
        if(!this.P)
            return;
        this._set(this._pointPos(this.P.pos));
    }
    
    pProto.tick = function(){
        
        let ev = {point: this, ev:this.__evnames.tick};
        this._triggerEvent(this.__evnames.tick, ev);
        
    }
    
    pProto.top = function(){
        return this.pos.y;
    }
    
    pProto.left = function(){
        return this.pos.x;
    }
    
    pProto.right = function(){
        return this.pos.x;
    }
    
    pProto.bottom = function(){
        return this.pos.y;
    }
    
    pProto.local = function(x,y){
        this._setLocals({x,y});
    }
    
    pProto._set = function(pos){
        let cp = this.pos;
        cp.x = pos.x;
        cp.y = pos.y;
    }
    
    pProto._updateLocals = function(){
        var pos = this.P.pos;
        let c = Math.cos(-pos.r);
        let s = Math.sin(-pos.r);
        this._pos.x = this.pos.x * c;
        this._pos.y = this.pos.y * s;
    }
    
    pProto._vertices = function(){
        return [{position:this.pos, color:this.color}];
    }
    
    pProto._setLocals = function(pos){
        for(let i in pos)
            this._pos[i] = pos[i];
        this.update();
    }
    
    pProto._pointPos = function(pos){
        let c = Math.cos(pos.r);
        let s = Math.sin(pos.r);
        let obj = {};
        obj.x = this._pos.x * c * pos.sx - this._pos.y * s * pos.sx + pos.x;
        obj.y = this._pos.x * s * pos.sy + this._pos.y * c * pos.sy + pos.y;
        return obj;
    }
    
    pProto._argsToPos = function(x,y,sx,sy,ex,ey){
        if(typeof x == 'object'){
            return x;
        }
        else if(Array.isArray(x)){
            //return {x:x[0], y:x[1], sx:x[2], sy:x[3], ex:x[4], ey:x[5]}
            return {x:x[0], y:x[1]}
        }
        else{
            //return {x:x,y:y,sx:sx,sy:sy,ex:ex,ey:ey};
            return {x,y};
        }
    }

    pProto.__setDefaults = function(){
        var pos = this.pos;
        var _pos = this._pos;
        pos.x = pos.y = _pos.x = _pos.y = null;
        this.__evnames.move = 'move';
        this.__evnames.tick = 'tick';
        this.color.push(0,0,0,1);
    }
    
    pProto.__initAttributes = function(){
        this.super.__initAttributes.call(this);
        this.pos = {};
        this._pos = {};
        this.color = [];
    }
    
    
    
    
    //Assign
    proto.Object = PrimObject;
    proto.Point = Point;
    
    
    ///////////////////////////////////////////////////////////
    //////@///@//@@@@@//@//////@@@@///@@@@@//@@@@////@@@@//////
    //////@///@//@//////@//////@///@//@//////@///@//@@//@//////
    //////@@@@@//@@@@@//@//////@@@@///@@@@@//@@@@/////@////////
    //////@///@//@//////@//////@//////@//////@/@@///@//@@//////
    //////@///@//@@@@@//@@@@@//@//////@@@@@//@///@//@@@@///////
    ///////////////////////////////////////////////////////////
    
    
    
    
    
    function GL(gl, options){
		this.options = options;
		this.gl = gl;
		this.init();
	}

	var gProto = GL.prototype;

	// Init
	gProto.init = function(){
		this.initProgram();
	}

	// Init Program
	gProto.initProgram = function(){
		var gl = this.gl;
		var vertexShaderSource = this.options.vs;
		var fragmentShaderSource = this.options.fs;
		var vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
		var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
		var program = this.createProgram(vertexShader, fragmentShader);
		gl.useProgram(program);
		this.a = {
			attributes:{},
			uniforms:{}
		};
		for(let i=0;i<this.options.attributes.length;i++){
			let a = this.options.attributes[i];
			this.a.attributes[a.name] = {
				attr: gl.getAttribLocation(program, a.attr),
				size: a.size,
				buffer: gl.createBuffer(),
				type: a.type,
				arr: a.arr
			};
		}
		for(let i=0;i<this.options.uniforms.length;i++){
			let a = this.options.uniforms[i];
			this.a.uniforms[a.name] = gl.getUniformLocation(program, a.attr);
		}
		this._program = program;
	}

	// Create Shader
	gProto.createShader = function(type, source){
		var shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);
		var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
		if (success) {
			return shader;
		}
		console.log(this.gl.getShaderInfoLog(shader));
		this.gl.deleteShader(shader);
	}
	// Create Program
	gProto.createProgram = function(vertexShader, fragmentShader) {
		var program = this.gl.createProgram();
		this.gl.attachShader(program, vertexShader);
		this.gl.attachShader(program, fragmentShader);
		this.gl.linkProgram(program);
		var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
			if (success) {
			return program;
		}
		console.log(this.gl.getProgramInfoLog(program));
		this.gl.deleteProgram(program);
	}
	// Enable Buffer
	gProto.enableBuffer = function(options){
		var gl = this.gl;
		gl.enableVertexAttribArray(options.attr);
		gl.bindBuffer(gl.ARRAY_BUFFER, options.buffer);
		gl.vertexAttribPointer(
			options.attr, options.size, options.type || gl.FLOAT, options.normalize || false, options.stride || 0, options.offset || 0);
	}

	// Buffer Data
	gProto.buffer = function(options){
		var gl = this.gl;
		var b = options.buffer || gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, b);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(options.arr), options.type);
		return b;
	}

	// Clear WebGL
	gProto.clear = function(){
		var gl = this.gl;
		//gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.BLEND);
		gl.depthFunc(gl.LESS);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		gl.useProgram(this._program);
		//gl.flush();
	}

	// Prepare Attributes
	gProto.prepare = function(){
		var attrs = this.a.attributes;
		for(let i in attrs){
			let a = attrs[i];
			this.buffer({arr:a.arr, type:a.type, buffer:a.buffer});
			this.enableBuffer({attr:a.attr, buffer:a.buffer, size:a.size});
			this._count = a.arr.length/a.size;
		}
	}

	// Render
	gProto.render = function(){
		this.clear();
		this.prepare();
		this.draw();
	}

	// Draw
	gProto.draw = function(){
		var gl = this.gl;
		var primitiveType = gl.TRIANGLES;
		var offset = 0;
		var count = this._count;
		gl.drawArrays(primitiveType, offset, count);
	}
    
    
    
    
    
    
    
    function inherit(fn, fnp){
        fn.prototype = Object.create(fnp.prototype);
        fn.prototype.super = fnp.prototype;
        fn.prototype.constructor = fn;
    }
    
    var createCanvas = function(){
		var c = document.createElement('canvas');
		return c;
	}
    
    var ERRORS = {
        101: 'Bad insert object type',
        102: 'Bad Remove Object Input',
        201: 'Bad point type'
    };
    
    var m3 = {
		translation: function(tx, ty) {
			return [
				1, 0, 0,
				0, 1, 0,
				tx, ty, 1,
			];
		},
		rotation: function(angleInRadians) {
			var c = Math.cos(angleInRadians);
			var s = Math.sin(angleInRadians);
			return [
				c,-s, 0,
				s, c, 0,
				0, 0, 1,
			];
		},
		scaling: function(sx, sy) {
			return [
				sx, 0, 0,
				0, sy, 0,
				0, 0, 1,
			];
		},
		multiply: function(a, b) {
			var a00 = a[0 * 3 + 0];
			var a01 = a[0 * 3 + 1];
			var a02 = a[0 * 3 + 2];
			var a10 = a[1 * 3 + 0];
			var a11 = a[1 * 3 + 1];
			var a12 = a[1 * 3 + 2];
			var a20 = a[2 * 3 + 0];
			var a21 = a[2 * 3 + 1];
			var a22 = a[2 * 3 + 2];
			var b00 = b[0 * 3 + 0];
			var b01 = b[0 * 3 + 1];
			var b02 = b[0 * 3 + 2];
			var b10 = b[1 * 3 + 0];
			var b11 = b[1 * 3 + 1];
			var b12 = b[1 * 3 + 2];
			var b20 = b[2 * 3 + 0];
			var b21 = b[2 * 3 + 1];
			var b22 = b[2 * 3 + 2];
			return [
				b00 * a00 + b01 * a10 + b02 * a20,
				b00 * a01 + b01 * a11 + b02 * a21,
				b00 * a02 + b01 * a12 + b02 * a22,
				b10 * a00 + b11 * a10 + b12 * a20,
				b10 * a01 + b11 * a11 + b12 * a21,
				b10 * a02 + b11 * a12 + b12 * a22,
				b20 * a00 + b21 * a10 + b22 * a20,
				b20 * a01 + b21 * a11 + b22 * a21,
				b20 * a02 + b21 * a12 + b22 * a22,
			];
		},
	};
    
    export default Prim;
    //if(typeof module != 'undefined' && module.exports)
    //    module.exports = Prim;
    //else if(typeof export != 'undefined')
    //    export {Prim};
    //else
    //    window.Prim = Prim;

//})();