////////////////////////////////////////////
//////@@@@////@@@///@@//@@////@//@@@@@//////
//////@///@//@///@//@@//@/@///@////@////////
//////@@@@///@///@//@@//@//@//@////@////////
//////@//////@///@//@@//@///@/@////@////////
//////@///////@@@///@@//@////@@////@////////
////////////////////////////////////////////

import Basic from './Basic.js';
import ERRORS from '../helpers/errors.js';
import {inherit} from '../helpers/helpers.js';

/** @class PPoint extends Basic
 *  
 *  Description
 */
function PPoint(options){
    
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
inherit(PPoint, Basic);
var pProto = PPoint.prototype;

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

export default PPoint;