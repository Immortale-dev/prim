/////////////////////////////////////
/////////////@@@///@/////////////////
////////////@//////@/////////////////
////////////@//@@//@/////////////////
////////////@///@//@/////////////////
/////////////@@@///@@@@@/////////////
/////////////////////////////////////

/** @class GL
 *  
 *  Description
 */
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

export default GL;