
import Prim from './lib/Main.js';
import PObject from './lib/PObject.js';
import PPoint from './lib/PPoint.js';

//Assign
Prim.prototype.Object = PObject;
Prim.prototype.Point = PPoint;

export default Prim;