///////////////////////////////////////////////////////////////
//@@@///@@@@@//@@@@@//////@@@@////@@@///@@//@@////@//@@@@@/////
//@//@//@/////////@@//////@///@//@///@//@@//@/@///@////@///////
//@@@///@@@@@///@@////////@@@@///@///@//@@//@//@//@////@///////
//@//@//@//////@@/////////@//////@///@//@@//@///@/@////@///////
//@@@///@@@@@//@@@@@//////@///////@@@///@@//@////@@////@///////
///////////////////////////////////////////////////////////////


import ERRORS from '../../helpers/errors.js';
import {inherit} from '../../helpers/helpers.js';
import PPoint from '../PPoint.js';

/** @class PBezierPoint extends PPoint
 *  
 *  Description
 */
function PBezierPoint(options){
    
    /** 
     *
     */
    this.constructor;
    
    /** @brief Set all bezie points;
     * 
     *  Set all bezie points, previous one will be delleted;
     *
     *  @param arr The array of {x,y} points or all points as 
     *         parameters;
     *  @return undefined;
     */
    this.setBezier;
    
    /**
     *
     */
    this.getBezier;
    
    /**
     *
     */
    this.addBezier;
    
    /**
     *
     */
    this.removeBezier;
    
    /**
     *
     */
    this._vertices;
    
    /**
     *
     */
    this._bezierPos;
    
    /**
     *
     */
    this._calcBezierCurve;
    
    /**
     *
     */
    this.set; 
    
    
    /** @brief Init specified attributes; @override;
     *
     *  Init Specified Bezie point attributes;
     *
     *  @return undefined;
     */
    this.__initAttributes;
    
    ////////////////////////////////////////////
    
    this.super.constructor.call(this, options);
    
}

inherit(PBezierPoint, PPoint);
var pProto = PPoint.prototype;


pProto.setBezier = function(){
    ///@TODO;
}

pProto.getBezier = function(){
    ///@TODO;
}

pProto.addBezier = function(){
    ///@TODO;
}

pProto.removeBezier = function(){
    ///@TODO;
}

pProto.set = function(x,y,bz){
    this.setBezie(bz);
    this.super.set.call(this,x,y);
}


pProto._vertices = function(){
    ///@TODO;
}

pProto._bezierPos = function(){
    ///@TODO;
}

pProto._calcBezierCurve = function(){
    ///@TODO;
}

pProto.__initAttributes = function(){
    this.super.__initAttributes.call(this);
    this._bz = [];
}











