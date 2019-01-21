////////////////////////////////////////
//////@@///@@////@@////@@//@@////@//////
//////@/@/@/@///@//@///@@//@/@///@//////
//////@//@//@///@@@@///@@//@//@//@//////
//////@/////@//@////@//@@//@///@/@//////
//////@/////@//@////@//@@//@////@@//////
////////////////////////////////////////

import Basic from './Basic.js';
import PObject from './PObject.js'
import GL from './GL.js';
import ERRORS from '../helpers/errors.js';
import {inherit, createCanvas} from '../helpers/helpers.js';
import PT from '../helpers/PT.js';

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
    
    /** @brief @abstract check objects for collisions 
     *         and call events
     *  
     *  Check objects for collisions. Needs to be implemented;
     *
     *  @return undefined;
     */
    this.collide;
    
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

///@static
Prim.PT = PT;

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
    if(!(obj instanceof PObject))
        this._showError(this.__errors.bad_insert_input);
    this._objectsIds[obj._id] = obj;
    this._insertObject(obj);
}

proto.remove = function(obj){
    if(typeof obj == 'number')
        obj = this._objectsIds[obj];
    if(!obj || !(obj instanceof PObject) || !this._objectsIds[obj._id])
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
    
    /// @Abstract
    this.collide && this.collide();
    
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

export default Prim;