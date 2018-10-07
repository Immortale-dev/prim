////////////////////////////////////////////////////
///////@@@///@@@@///////@//@@@@@///@@@///@@@@@//////
//////@///@//@///@//////@//@//////@///@////@////////
//////@///@//@@@@///////@//@@@@@//@////////@////////
//////@///@//@///@//@///@//@//////@///@////@////////
///////@@@///@@@@////@@@///@@@@@///@@@/////@////////
////////////////////////////////////////////////////

import PPoint from './PPoint.js';
import Basic from './Basic.js';
import ERRORS from '../helpers/errors.js';
import {inherit} from '../helpers/helpers.js';

/** @class PObject extends Basic
 *  
 *  Description
 */
function PObject(options){
    
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
inherit(PObject, Basic);
var oProto = PObject.prototype;

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
    if(!obj || !(obj instanceof PPoint)){
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

export default PObject;