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
export default Basic;