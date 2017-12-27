/*
作者:Mr.Zhai
创建时间:2017年12月26日
版本：V0.0.1.bug
功能描述:用户创建web版组态

使用方式
var msjstation=new msj3D();
msjstation.initmsj3D('divid',{...},[datajson]);
msjstation.start();
*/
function msj3D() {}
var msj3DObj = null;
msj3D.prototype.start = function () {
    //此处用于判断浏览器
    
    //开始
    var _this = this;
    msj3DObj = _this;
    _this.initThree(_this.fId);
    _this.initCamera();
    _this.initScene();
    _this.initHelpGrid();
    _this.initLight();
    _this.addTestObj();
    //添加3D对象
    $.each(_this.objList, function (index,_obj) {
        _this.InitAddObject(_obj);
    });
    _this.initMouseCtrl();
    //创建按钮
    _this.addBtns(_this.btns);

    _this.animation();
  
}
/*
方法：初始化
fid 画布所属div的Id
option:参数 {
            antialias:true,//抗锯齿效果为设置有效
            clearCoolr:0xFFFFFF,
            showHelpGrid:false,//是否显示网格线
                }
*/
msj3D.prototype.initmsj3D = function (_fId, _option,_datajson) {
    //参数处理
    this.option = new Object();
    this.option.antialias = _option.antialias || true;//刷新色
    this.option.clearCoolr = _option.clearCoolr || 0x1b7ace;//刷新色
    this.option.showHelpGrid = _option.showHelpGrid || false;//刷新色
    this.option.divWidth = _option.divWidth || 800;//刷新色
    this.option.divHeight = _option.divHeight || 600;//刷新色
    //对象
    this.fId = _fId;
    this.width = this.option.divWidth;
    this.height = this.option.divHeight;
    this.renderer = null;//渲染器
    this.camera = null;//摄像机
    this.scene = null;//场景
    this.SELECTED=null;
    this.objects = [];
    this.mouseClick = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.controls = null;//鼠标控制器
    this.objList = _datajson.objects;//对象列表
    this.eventList = _datajson.events;//事件对象列表
    this.btns = _datajson.btns;//按钮列表
    var _this = this;
}
//初始化渲染器
msj3D.prototype.initThree = function () {
    var _this = this;
    _this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: _this.option.antialias });
    _this.renderer.setSize(_this.width, _this.height);
    $("#" + _this.fId).append(_this.renderer.domElement);
    _this.renderer.setClearColor(_this.option.clearCoolr, 1.0);
    _this.renderer.shadowMap.enabled = true;//
    _this.renderer.shadowMapSoft = true;
    //事件
    _this.renderer.domElement.addEventListener('mousedown', _this.onDocumentMouseDown, false);
    _this.renderer.domElement.addEventListener('mousemove', _this.onDocumentMouseMove, false);
}
//初始化摄像机
msj3D.prototype.initCamera = function () {
    var _this = this;
    _this.camera = new THREE.PerspectiveCamera(45, _this.width / _this.height, 1, 100000);
    _this.camera.name = 'mainCamera';
    _this.camera.position.x =0;
    _this.camera.position.y =1000;
    _this.camera.position.z =-1800;
    _this.camera.up.x = 0;
    _this.camera.up.y =1;
    _this.camera.up.z =0;
    _this.camera.lookAt({ x: 0, y: 0, z: 0 });
    _this.objects.push(_this.camera);
}
//创建场景
msj3D.prototype.initScene=function() {
    var _this = this;
    _this.scene = new THREE.Scene();
}
//添加对象
msj3D.prototype.addObject = function (_obj) {
    var _this = msj3DObj;
    _this.objects.push(_obj);
    _this.scene.add(_obj);
}
//创建网格线
msj3D.prototype.initHelpGrid = function () {
    var _this = this;
    if (_this.option.showHelpGrid) {
        var helpGrid = new THREE.GridHelper(1000, 50);
        _this.scene.add(helpGrid);
    }
}
//灯光布置
msj3D.prototype.initLight = function () {
    /*
    AmbientLight: 环境光，基础光源，它的颜色会被加载到整个场景和所有对象的当前颜色上。
PointLight：点光源，朝着所有方向都发射光线
SpotLight ：聚光灯光源：类型台灯，天花板上的吊灯，手电筒等
DirectionalLight：方向光，又称无限光，从这个发出的光源可以看做是平行光.
    */
    var _this = this;
    var light = new THREE.AmbientLight(0xcccccc);
    light.position.set(0, 0,0);
    _this.scene.add(light);
    var light2 = new THREE.PointLight(0x555555);
    light2.shadow.camera.near =1;
    light2.shadow.camera.far = 5000;
    light2.position.set(0, 350, 0);
    light2.castShadow = true;//表示这个光是可以产生阴影的
    _this.scene.add(light2);

}
//创建鼠标控制器
msj3D.prototype.initMouseCtrl=function() {
    var _this = this;
    _this.controls = new THREE.OrbitControls(_this.camera);
    _this.controls.addEventListener('change', _this.updateControls);
}
//控制器回调
msj3D.prototype.updateControls = function () {
    
   //controls.update();
}
//循环渲染界面
msj3D.prototype.animation = function () {
    var _this = msj3DObj;
    if (createjs.TWEEN != null && typeof (createjs.TWEEN) != 'undefined') {
        createjs.TWEEN.update();
    }
    requestAnimationFrame(_this.animation);
    _this.renderer.render(_this.scene, _this.camera);
}

/*
添加对象
*/
msj3D.prototype.InitAddObject = function (_obj) {
    var _this = this;
    if (_obj.show == null || typeof (_obj.show) == 'undefined' || _obj.show) {
        var _tempObj = null;
        switch (_obj.objType) {
            case 'cube':
                _tempObj = _this.createCube(_this, _obj);
                _this.addObject(_tempObj);
                break;
            case 'floor':
                _tempObj = _this.CreateFloor(_obj)
                _this.addObject(_tempObj);
                break;
            case 'wall':
                _this.CreateWall(_this,_obj);
                break;
            case 'plane':
                _tempObj = _this.createPlaneGeometry(_this, _obj);
                _this.addObject(_tempObj);
                break;
            case 'glasses':
                _this.createGlasses(_this, _obj);
                break;
            case 'emptyCabinet':
                _tempObj = _this.createEmptyCabinet(_this, _obj);
                _this.addObject(_tempObj);
                break;
            case 'cloneObj':
                _tempObj = _this.commonFunc.cloneObj(_obj.copyfrom, _obj);
                _this.addObject(_tempObj);
                break;
        }
    }
}

//创建地板
msj3D.prototype.CreateFloor = function (_obj) {
    var _this = this;
    var _cube = _this.createCube(_this, _obj);
    return _cube;
}
//创建墙体
msj3D.prototype.CreateWall = function (_this, _obj) {
    if (_this == null) {
         _this = this;
    }
    var _commonThick = _obj.thick || 40;//墙体厚度
    var _commonLength = _obj.length || 100;//墙体厚度
    var _commonHeight = _obj.height || 300;//强体高度
    var _commonSkin = _obj.style.skinColor || 0x98750f;
    //建立墙面
    $.each(_obj.wallData, function (index, wallobj) {
        var wallLength = _commonLength;
        var wallWidth = wallobj.thick||_commonThick;
        var positionX = ((wallobj.startDot.x||0) + (wallobj.endDot.x||0)) / 2;
        var positionY = ((wallobj.startDot.y || 0) + (wallobj.endDot.y || 0)) / 2;
        var positionZ = ((wallobj.startDot.z || 0) + (wallobj.endDot.z || 0)) / 2;
        //z相同 表示x方向为长度
        if (wallobj.startDot.z == wallobj.endDot.z) {
            wallLength = Math.abs(wallobj.startDot.x - wallobj.endDot.x);
            wallWidth = wallobj.thick || _commonThick;
        } else if (wallobj.startDot.x == wallobj.endDot.x) {
            wallLength = wallobj.thick || _commonThick;
            wallWidth = Math.abs(wallobj.startDot.z - wallobj.endDot.z);
        }
        var cubeobj = {
            length: wallLength,
            width: wallWidth,
            height: wallobj.height || _commonHeight,
            rotation: wallobj.rotation,
            x: positionX,
            y: positionY,
            z: positionZ,
            uuid: wallobj.uuid,
            name:wallobj.name,
            style: {
                skinColor: _commonSkin,
                skin:wallobj.skin 
            }
        }
        var _cube = _this.createCube(_this, cubeobj);
        if (_this.commonFunc.hasObj(wallobj.childrens) && wallobj.childrens.length > 0) {
            $.each(wallobj.childrens, function (index, walchildobj) {
                var _newobj = null;
                _newobj = _this.CreateHole(_this, walchildobj);
                _cube = _this.mergeModel(_this, walchildobj.op, _cube, _newobj);
            });
        }
        _this.addObject(_cube);
    });
}
//挖洞
msj3D.prototype.CreateHole = function (_this, _obj) {
    if (_this == null) {
        _this = this;
    }
    var _commonThick =  40;//墙体厚度
    var _commonLength =  100;//墙体厚度
    var _commonHeight =  300;//强体高度
    var _commonSkin = 0x98750f;
    //建立墙面
        var wallLength = _commonLength;
        var wallWidth = _obj.thick || _commonThick;
        var positionX = ((_obj.startDot.x || 0) + (_obj.endDot.x || 0)) / 2;
        var positionY = ((_obj.startDot.y || 0) + (_obj.endDot.y || 0)) / 2;
        var positionZ = ((_obj.startDot.z || 0) + (_obj.endDot.z || 0)) / 2;
        //z相同 表示x方向为长度
        if (_obj.startDot.z == _obj.endDot.z) {
            wallLength = Math.abs(_obj.startDot.x - _obj.endDot.x);
            wallWidth = _obj.thick || _commonThick;
        } else if (_obj.startDot.x == _obj.endDot.x) {
            wallLength = _obj.thick || _commonThick;
            wallWidth = Math.abs(_obj.startDot.z - _obj.endDot.z);
        }
        var cubeobj = {
            length: wallLength,
            width: wallWidth,
            height: _obj.height || _commonHeight,
            rotation: _obj.rotation,
            x: positionX,
            uuid: _obj.uuid,
            name: _obj.name,
            y: positionY,
            z: positionZ,
            style: {
                skinColor: _commonSkin,
                skin: _obj.skin
            }
        }
        var _cube = _this.createCube(_this, cubeobj);
        return _cube;
}
//模型合并 使用ThreeBSP插件mergeOP计算方式 -表示减去 +表示加上 
msj3D.prototype.mergeModel = function (_this, mergeOP, _fobj, _sobj) {
    if (_this == null) {
        _this = this;
    }
    var fobjBSP = new ThreeBSP(_fobj);
    var sobjBSP = new ThreeBSP(_sobj);
   // var sobjBSP = new ThreeBSP(_sobj);
    var resultBSP = null; 
    if (mergeOP == '-') {
        resultBSP = fobjBSP.subtract(sobjBSP);
    } else if (mergeOP == '+') {
        var subMesh = new THREE.Mesh(_sobj);
        _sobj.updateMatrix();
        _fobj.geometry.merge(_sobj.geometry, _sobj.matrix);
        return _fobj;
       // resultBSP = fobjBSP.union(sobjBSP);
    } else if (mergeOP == '&') {//交集
        resultBSP = fobjBSP.intersect(sobjBSP);
    } else {
        _this.addObject(_sobj);
        return _fobj;
    }
    var cubeMaterialArray = [];
    for (var i = 0; i < 1; i++) {
        cubeMaterialArray.push(new THREE.MeshLambertMaterial({
            //map: _this.createSkin(128, 128, { imgurl: '../datacenterdemo/res2/'+(i%11)+'.jpg' }),
            vertexColors: THREE.FaceColors
        }));
    }
    var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
    var result = resultBSP.toMesh(cubeMaterials);
    result.material.shading = THREE.FlatShading;
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();
    result.uuid= _fobj.uuid+mergeOP+_sobj.uuid;
    result.name=_fobj.name+mergeOP+_sobj.name;
    result.material.needsUpdate = true;
    result.geometry.buffersNeedUpdate = true;
    result.geometry.uvsNeedUpdate = true;
    var _foreFaceSkin = null;
    for (var i = 0; i < result.geometry.faces.length; i++) {
        var _faceset = false;
        for (var j = 0; j < _fobj.geometry.faces.length; j++) {
            if (result.geometry.faces[i].vertexNormals[0].x === _fobj.geometry.faces[j].vertexNormals[0].x
                && result.geometry.faces[i].vertexNormals[0].y === _fobj.geometry.faces[j].vertexNormals[0].y
                && result.geometry.faces[i].vertexNormals[0].z === _fobj.geometry.faces[j].vertexNormals[0].z
                 && result.geometry.faces[i].vertexNormals[1].x === _fobj.geometry.faces[j].vertexNormals[1].x
                && result.geometry.faces[i].vertexNormals[1].y === _fobj.geometry.faces[j].vertexNormals[1].y
                && result.geometry.faces[i].vertexNormals[1].z === _fobj.geometry.faces[j].vertexNormals[1].z
                && result.geometry.faces[i].vertexNormals[2].x === _fobj.geometry.faces[j].vertexNormals[2].x
                && result.geometry.faces[i].vertexNormals[2].y === _fobj.geometry.faces[j].vertexNormals[2].y
                && result.geometry.faces[i].vertexNormals[2].z === _fobj.geometry.faces[j].vertexNormals[2].z) {
                result.geometry.faces[i].color.setHex(_fobj.geometry.faces[j].color.r * 0xff0000 + _fobj.geometry.faces[j].color.g * 0x00ff00 + _fobj.geometry.faces[j].color.b * 0x0000ff);
                _foreFaceSkin = _fobj.geometry.faces[j].color.r * 0xff0000 + _fobj.geometry.faces[j].color.g * 0x00ff00 + _fobj.geometry.faces[j].color.b * 0x0000ff;
                _faceset =true;
            }
        }
        if (_faceset == false){
            for(var j = 0; j < _sobj.geometry.faces.length; j++) {
                if (result.geometry.faces[i].vertexNormals[0].x === _sobj.geometry.faces[j].vertexNormals[0].x
                    && result.geometry.faces[i].vertexNormals[0].y === _sobj.geometry.faces[j].vertexNormals[0].y
                    && result.geometry.faces[i].vertexNormals[0].z === _sobj.geometry.faces[j].vertexNormals[0].z
                     && result.geometry.faces[i].vertexNormals[1].x === _sobj.geometry.faces[j].vertexNormals[1].x
                    && result.geometry.faces[i].vertexNormals[1].y === _sobj.geometry.faces[j].vertexNormals[1].y
                    && result.geometry.faces[i].vertexNormals[1].z === _sobj.geometry.faces[j].vertexNormals[1].z
                    && result.geometry.faces[i].vertexNormals[2].x === _sobj.geometry.faces[j].vertexNormals[2].x
                    && result.geometry.faces[i].vertexNormals[2].y === _sobj.geometry.faces[j].vertexNormals[2].y
                    && result.geometry.faces[i].vertexNormals[2].z === _sobj.geometry.faces[j].vertexNormals[2].z
                    && result.geometry.faces[i].vertexNormals[2].z === _sobj.geometry.faces[j].vertexNormals[2].z) {
                    result.geometry.faces[i].color.setHex(_sobj.geometry.faces[j].color.r * 0xff0000 + _sobj.geometry.faces[j].color.g * 0x00ff00 + _sobj.geometry.faces[j].color.b * 0x0000ff);
                    _foreFaceSkin = _sobj.geometry.faces[j].color.r * 0xff0000 + _sobj.geometry.faces[j].color.g * 0x00ff00 + _sobj.geometry.faces[j].color.b * 0x0000ff;
                    _faceset = true;
                }
            }
        }
        if (_faceset == false) {
            result.geometry.faces[i].color.setHex(_foreFaceSkin);
        }
    // result.geometry.faces[i].materialIndex = i
    }
    result.castShadow = true;
    result.receiveShadow = true;
    return result;
}
//创建盒子体
msj3D.prototype.createCube = function (_this, _obj) {
    if (_this == null) {
        _this = this;
    }
    var _length = _obj.length || 1000;//默认1000
    var _width = _obj.width || _length;
    var _height = _obj.height || 10;
    var _x = _obj.x || 0, _y = _obj.y || 0, _z = _obj.z || 0;
    var skinColor = _obj.style.skinColor || 0x98750f;
    var cubeGeometry = new THREE.CubeGeometry(_length, _height, _width, 0, 0, 1);

    //六面颜色
    for (var i = 0; i < cubeGeometry.faces.length; i += 2) {
        var hex = skinColor || Math.random() * 0x531844;
        cubeGeometry.faces[i].color.setHex(hex);
        cubeGeometry.faces[i + 1].color.setHex(hex);
    }
    //六面纹理
    var skin_up_obj = {
        vertexColors: THREE.FaceColors
    }
    var skin_down_obj = skin_up_obj,
        skin_fore_obj = skin_up_obj,
        skin_behind_obj = skin_up_obj,
        skin_left_obj = skin_up_obj,
        skin_right_obj = skin_up_obj;
    var skin_opacity = 1;
    if (_obj.style != null && typeof (_obj.style) != 'undefined'
        && _obj.style.skin != null && typeof (_obj.style.skin) != 'undefined') {
        //透明度
        if (_obj.style.skin.opacity != null && typeof (_obj.style.skin.opacity) != 'undefined') {
            skin_opacity = _obj.style.skin.opacity;
            console.log(skin_opacity)
        }
        //上
        skin_up_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_up, cubeGeometry, 4);
        //下
        skin_down_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_down, cubeGeometry, 6);
        //前
        skin_fore_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_fore, cubeGeometry, 0);
        //后
        skin_behind_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_behind, cubeGeometry, 2);
        //左
        skin_left_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_left, cubeGeometry, 8);
        //右
        skin_right_obj = _this.createSkinOptionOnj(_this, _length, _width, _obj.style.skin.skin_right, cubeGeometry, 10);
    }
    var cubeMaterialArray = [];
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_fore_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_behind_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_up_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_down_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_right_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_left_obj));
    var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);
    cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.uuid = _obj.uuid;
    cube.name = _obj.name;
    cube.position.set(_x, _y, _z);
    if (_obj.rotation != null && typeof (_obj.rotation) != 'undefined' && _obj.rotation.length > 0) {
        $.each(_obj.rotation, function (index, rotation_obj) {
            switch (rotation_obj.direction) {
                case 'x':
                    cube.rotateX(rotation_obj.degree);
                    break;
                case 'y':
                    cube.rotateY(rotation_obj.degree);
                    break;
                case 'z':
                    cube.rotateZ(rotation_obj.degree);
                    break;
                case 'arb':
                    cube.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                    break;
            }
        });
    }

    return cube;
}
//创建二维平面-长方形
msj3D.prototype.createPlaneGeometry = function (_this,_obj) {
          //options={           
          //    width:0,
          //    height:0,
          //    pic:"",
          //    transparent:true,
          //    opacity:1
    //    blending:false,
    //position: { x:,y:,z:},
    //rotation: { x:,y:,z:},
    //}
  
   var  options = _obj;
    if (typeof options.pic == "string") {//传入的材质是图片路径，使用 textureloader加载图片作为材质
        var loader = new THREE.TextureLoader();
        loader.setCrossOrigin(this.crossOrigin);
        var texture = loader.load(options.pic, function () { }, undefined, function () { });
    } else {
        var texture = new THREE.CanvasTexture(options.pic)
    }
    var MaterParam = {//材质的参数
        map: texture,
        overdraw: true,
        side: THREE.FrontSide,
        //              blending: THREE.AdditiveBlending,
        transparent: options.transparent,
        //needsUpdate:true,
        //premultipliedAlpha: true,
        opacity: options.opacity
    }
    if (options.blending) {
        MaterParam.blending = THREE.AdditiveBlending//使用饱和度叠加渲染
    }
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(options.width, options.height, 1, 1),
        new THREE.MeshBasicMaterial(MaterParam)
    );
    plane.position.x = options.position.x;
    plane.position.y = options.position.y;
    plane.position.z = options.position.z;
    plane.rotation.x = options.rotation.x;
    plane.rotation.y = options.rotation.y;
    plane.rotation.z = options.rotation.z;
    return plane;
}
//创建空柜子
msj3D.prototype.createEmptyCabinet = function (_this, _obj) {
    /* 参数demo
    {
    show:true,
    name: 'test',
    uuid: 'test',
   rotation: [{ direction: 'y', degree: 0.25*Math.PI}],//旋转     uuid:'',
    objType: 'emptyCabinet',
    transparent:true,
    size:{length:50,width:60,height:200, thick:2},
    position: { x: -220, y: 105, z: -150 },
    doors: {
        doorType:'lr',// ud门 lr左右门
        doorSize:[1],
        skins:[ {
            skinColor: 0x333333,
            skin_fore: {
                imgurl: "../datacenterdemo/res/rack_door_back.jpg",
            },
            skin_behind: {
                imgurl: "../datacenterdemo/res/rack_front_door.jpg",
            }
        }]
    },
    skin:{
            skinColor: 0xdddddd,
            
                skin:{
                            skinColor: 0xdddddd,
                            skin_up: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_down: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_fore: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_behind: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_left: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                            skin_right: { imgurl: "../datacenterdemo/res/rack_door_back.jpg" },
                }
        
        }
}
    */
    var _this = msj3DObj;
    //创建五个面
    //上
    var upobj= {
        show: true,
        uuid: "",
        name: '',
        objType: 'cube',
        length: _obj.size.length+1,
        width: _obj.size.width ,
        height: _obj.size.thick + 1,
        x: _obj.position.x+1,
        y: _obj.position.y+(_obj.size.height/2-_obj.size.thick/2),
        z:_obj.position.z,
        style: {
            skinColor: _obj.skin.skinColor,
            skin: _obj.skin.skin_up.skin
        }
    }
    var upcube = _this.createCube(_this, upobj);
    //左
    var leftobj = {
        show: true,
        uuid: "",
        name: '',
        objType: 'cube',
        length: _obj.size.length,
        width: _obj.size.thick,
        height: _obj.size.height,
        x: 0,
        y: -(_obj.size.height / 2 - _obj.size.thick / 2),
        z: 0 - (_obj.size.width / 2 - _obj.size.thick / 2) - 1,
        style: {
            skinColor: _obj.skin.skinColor,
            skin: _obj.skin.skin_left.skin
        }
    }
    var leftcube = _this.createCube(_this, leftobj);
    var Cabinet = _this.mergeModel(_this, '+', upcube, leftcube);
    //右
    var Rightobj = {
        show: true,
        uuid: "",
        name: '',
        objType: 'cube',
        length: _obj.size.length,
        width: _obj.size.thick,
        height: _obj.size.height,
        x: 0,
        y: -(_obj.size.height / 2 - _obj.size.thick / 2),
        z: (_obj.size.width / 2 - _obj.size.thick / 2)+1,
        style: {
            skinColor: _obj.skin.skinColor,
            skin: _obj.skin.skin_right.skin
        }
    }
    var Rightcube = _this.createCube(_this, Rightobj);
    Cabinet = _this.mergeModel(_this, '+', Cabinet, Rightcube);
    //后
    var Behidobj = {
        show: true,
        uuid: "",
        name: '',
        objType: 'cube',
        length: _obj.size.thick,
        width: _obj.size.width,
        height: _obj.size.height,
        x: (_obj.size.length / 2 - _obj.size.thick / 2)+1,
        y: -(_obj.size.height / 2 - _obj.size.thick / 2),
        z:0,
        style: {
            skinColor: _obj.skin.skinColor,
           skin: _obj.skin.skin_behind.skin
        }
    }
    var Behindcube = _this.createCube(_this, Behidobj);
    Cabinet = _this.mergeModel(_this, '+', Cabinet, Behindcube);
    //下
    var Downobj = {
        show: true,
        uuid: "",
        name: '',
        objType: 'cube',
        length: _obj.size.length+1,
        width: _obj.size.width,
        height: _obj.size.thick,
        x:-1,
        y: -(_obj.size.height- _obj.size.thick)-1,
        z: 0,
        style: {
            skinColor: _obj.skin.skinColor,
            skin: _obj.skin.skin_down.skin
        }
    }
    var Downcube = _this.createCube(_this, Downobj);
    Cabinet = _this.mergeModel(_this, '+', Cabinet, Downcube);
   
    var tempobj = new THREE.Object3D();
    tempobj.add(Cabinet);
    tempobj.name = _obj.name;
    tempobj.uuid = _obj.uuid;
    Cabinet.name = _obj.shellname,
    _this.objects.push(Cabinet);
    tempobj.position = Cabinet.position;
    //门
    if (_obj.doors != null && typeof (_obj.doors) != 'undefined') {
        var doors = _obj.doors;
        if (doors.skins.length == 1) {//单门
            var singledoorobj = {
                show: true,
                uuid:"",
                name: _obj.doors.doorname[0],
                objType: 'cube',
                length: _obj.size.thick,
                width: _obj.size.width,
                height: _obj.size.height,
                x: _obj.position.x - _obj.size.length / 2 - _obj.size.thick / 2,
                y: _obj.position.y,
                z: _obj.position.z,
                style: {
                    skinColor: _obj.doors.skins[0].skinColor,
                    skin: _obj.doors.skins[0]
                }
            }
            var singledoorcube = _this.createCube(_this, singledoorobj);
            _this.objects.push(singledoorcube);
            tempobj.add(singledoorcube);
        } else if (doors.skins.length > 1) {//多门


        }

    }

    if (_obj.rotation != null && typeof (_obj.rotation) != 'undefined' && _obj.rotation.length > 0) {
        $.each(_obj.rotation, function (index, rotation_obj) {
            switch (rotation_obj.direction) {
                case 'x':
                    tempobj.rotateX(rotation_obj.degree);
                    break;
                case 'y':
                    tempobj.rotateY(rotation_obj.degree);
                    break;
                case 'z':
                    tempobj.rotateZ(rotation_obj.degree);
                    break;
                case 'arb':
                    tempobj.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                    break;
            }
        });
    }
    return tempobj;
}
//创建玻璃
msj3D.prototype.createGlasses = function (_this, _obj) {
    var _this = msj3DObj;
    var tmpobj = _this.createPlaneGeometry(_this, _obj);
    _this.addObject(tmpobj);
    _obj.rotation.y = Math.PI + _obj.rotation.y;
    var tmpobj2 = _this.createPlaneGeometry(_this, _obj);
    _this.addObject(tmpobj2);
}
//创建皮肤
msj3D.prototype.createSkin = function (flength,fwidth,_obj) {
    var imgwidth = 128,imgheight=128;
    if (_obj.width != null&& typeof (_obj.width) != 'undefined') {
        imgwidth = _obj.width;
    }
    if (_obj.height != null && typeof (_obj.height) != 'undefined') {
        imgheight = _obj.height;
    }
    var texture = new THREE.TextureLoader().load(_obj.imgurl);
    var _repeat = false;
    if (_obj.repeatx != null && typeof (_obj.repeatx) != 'undefined' && _obj.repeatx==true) {
        texture.wrapS = THREE.RepeatWrapping;
        _repeat = true;
    }
    if (_obj.repeaty != null && typeof (_obj.repeaty) != 'undefined' && _obj.repeaty == true) {
        texture.wrapT = THREE.RepeatWrapping;
        _repeat = true;
    }
    if (_repeat) {
        texture.repeat.set(flength / imgheight, fwidth / imgheight);
    }
    return texture;
}
//创建皮肤参数对象
msj3D.prototype.createSkinOptionOnj = function (_this, flength, fwidth, _obj, _cube, _cubefacenub) {
    if (_this.commonFunc.hasObj(_obj)) {
        if (_this.commonFunc.hasObj(_obj.imgurl)) {
            return {
                map: _this.createSkin(flength, fwidth, _obj),transparent:true
            }
        } else {
            if (_this.commonFunc.hasObj(_obj.skinColor)) {
                _cube.faces[_cubefacenub].color.setHex(_obj.skinColor);
                _cube.faces[_cubefacenub + 1].color.setHex(_obj.skinColor);
            }
            return {
                vertexColors: THREE.FaceColors
            }
        }
    } else {
        return {
            vertexColors: THREE.FaceColors
        }
    }
}
//通用方法
msj3D.prototype.commonFunc={
    //判断对象
    hasObj: function (_obj) {
        if (_obj != null && typeof (_obj) != 'undefined') {
            return true;
        }else{
            return false;
        }
    },
    //查找对象
    findObject: function (_objname) {
        var _this = msj3DObj;
        console.log('findObject');
        var findedobj = null;
        $.each(_this.objects, function (index,_obj) {
            if (_obj.name != null && _obj.name != '') {
                if (_obj.name == _objname) {
                    findedobj = _obj;
                    return true;
                }
            }
        });
        return findedobj;
    },
    //复制对象
    cloneObj: function (_objname, newparam) {
        /*newparam
        {
        show: true,
        uuid:
        copyfrom: 'cabinet1_1',
        name:
        childrenname:[]
        objType: 'cloneObj',
        position:{x:y:z:}//相对复制品的
        scale:{x:1,y:1,z:1}
         rotation: [{ direction: 'y', degree: 0.25*Math.PI}],//旋转     uuid:'',
        }
        */
        var _this = msj3DObj;
        var fobj = _this.commonFunc.findObject(_objname);
        var newobj = newobj = fobj.clone();
        if (newobj.children != null && newobj.children.length > 1) {
            $.each(newobj.children, function (index, obj) {
                obj.name = newparam.childrenname[index];
                _this.objects.push(obj);
            });
        }
        //位置
        if (_this.commonFunc.hasObj(newparam.position)) {
            newobj.position.x = newparam.position.x;
            newobj.position.y = newparam.position.y;
            newobj.position.z = newparam.position.z;
        }
        //大小
        if (_this.commonFunc.hasObj(newparam.scale)) {
            newobj.scale.x = newparam.scale.x;
            newobj.scale.y = newparam.scale.y;
            newobj.scale.z = newparam.scale.z;
        }
        //角度
        if (_this.commonFunc.hasObj(newparam.rotation)) {
            $.each(newparam.rotation, function (index, rotation_obj) {
                    switch (rotation_obj.direction) {
                        case 'x':
                            newobj.rotateX(rotation_obj.degree);
                            break;
                        case 'y':
                            newobj.rotateY(rotation_obj.degree);
                            break;
                        case 'z':
                            newobj.rotateZ(rotation_obj.degree);
                            break;
                        case 'arb':
                            newobj.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
                            break;
                    }
                });
        }
        newobj.name = newparam.name;
        newobj.uuid = newparam.uuid;
        return newobj;
    },
    //设置表皮颜色
    setSkinColor: function (_objname, _color) {
        var _this = msj3DObj;
        var _obj = _this.commonFunc.findObject(_objname);
        if (_this.commonFunc.hasObj(_obj.material.emissive)) {
            _obj.material.emissive.setHex(_color);
        } else if (_this.commonFunc.hasObj(_obj.material.materials)) {
            if (_obj.material.materials.length > 0) {
                $.each(_obj.material.materials, function (index,obj) {
                    obj.emissive.setHex(_color);
                });
            }
        }
    },
    //添加图片标识
    addIdentification: function (_objname, _obj) {
        /*
      {
        name:'test',
            size:{x:20,y:20},
    position:{x:0,y:100,z:0},
    imgurl: '../datacenterdemo/res/connection.png'
    }
        */
        var _this = msj3DObj;
        var _fobj = _this.commonFunc.findObject(_objname);
        var loader = new THREE.TextureLoader();
        var texture = loader.load(_obj.imgurl, function () { }, undefined, function () { });
        var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.name = _obj.name;
        sprite.position.x = _fobj.position.x + _obj.position.x;
        sprite.position.y = _fobj.position.y + _obj.position.y;
        sprite.position.z = _fobj.position.z + _obj.position.z;
        if (_this.commonFunc.hasObj(_obj.size)) {
            sprite.scale.set(_obj.size.x, _obj.size.y);
        } else {
            sprite.scale.set(1,1);
        }
        _this.addObject(sprite);
    },
    //添加文字
    makeTextSprite: function (_objname, parameters)
    {
        var _this = msj3DObj;
        var _fobj = _this.commonFunc.findObject(_objname);
       if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };
        var message = parameters.hasOwnProperty("message") ? parameters["message"] : "helloMsj3D";
        var x = parameters.hasOwnProperty("position") ? parameters["position"].x : 0;
        var y = parameters.hasOwnProperty("position") ? parameters["position"].y : 0;
        var z = parameters.hasOwnProperty("position") ? parameters["position"].z : 0;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText( message );
        var textWidth = metrics.width;
        context.lineWidth = borderThickness;
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText(message, borderThickness, fontsize + borderThickness);
        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.x =_fobj.position.x + x;
        sprite.position.y = _fobj.position.y + y;
        sprite.position.z = _fobj.position.z + z;
        sprite.name = parameters.name;
        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        _this.addObject(sprite);
        }
}
msj3D.prototype.loadObj = function (_obj) {
    var jsloader = new THREE.JSONLoader();
    jsloader.load("test.json",
        function (geometry, materials) {
            var model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
            model.name = 'test';
            model.scale.x = 10;
            model.scale.y = 7;
            model.scale.z = 10;
            model.position.x = -300;
            model.position.y = 50;
            model.position.z = 300;
            _this.addObject(model);
        });
}

//添加按钮
msj3D.prototype.addBtns = function (_btnobjs) {
    var _this = msj3DObj;
    if (_btnobjs != null && _btnobjs.length > 0) {
        $("#" + _this.fId).after('<div id="toolbar" class="toolbar" ></div>');
        $.each(_btnobjs, function (index,_obj) {
            $("#toolbar").append(' <img src="' + _obj.btnimg + '" title="' + _obj.btnTitle + '" id="' + _obj.btnid + '" />');
            $("#" + _obj.btnid).on("click", _obj.event);
        });
    }
}

/*
*事件部分
*/
 
//鼠标按下事件
var dbclick =0;
msj3D.prototype.onDocumentMouseDown = function (event) {
    dbclick++;
    var _this = msj3DObj;
    setTimeout(function () { dbclick =0}, 500);
    event.preventDefault();
    if (dbclick >= 2) {
        _this.raycaster.setFromCamera(_this.mouseClick, _this.camera);
        var intersects = _this.raycaster.intersectObjects(_this.objects);
        if (intersects.length > 0) {
            _this.controls.enabled = false;
            _this.SELECTED = intersects[0].object;
            if (_this.eventList != null && _this.eventList.dbclick != null && _this.eventList.dbclick.length > 0) {
                $.each(_this.eventList.dbclick, function (index, _obj) {
                    if ("string" == typeof (_obj.obj_name)) {
                        if (_obj.obj_name == _this.SELECTED.name) {
                            _obj.obj_event(_this.SELECTED);
                        }
                    } else if (_obj.findObject!=null||'function' == typeof (_obj.findObject)) {
                        if (_obj.findObject(_this.SELECTED.name)) {
                            _obj.obj_event(_this.SELECTED);
                        }
                    }
                });
            }
            _this.controls.enabled = true;
        }
    }
}


msj3D.prototype.onDocumentMouseMove = function (event) {
    event.preventDefault();
    var _this = msj3DObj;
    _this.mouseClick.x = (event.clientX / _this.width) * 2 - 1;
    _this.mouseClick.y = -(event.clientY / _this.height) * 2 + 1;
    _this.raycaster.setFromCamera(_this.mouseClick, _this.camera);

}


msj3D.prototype.addTestObj = function () {
    
    var _this = msj3DObj;
   
    //var jsloader = new THREE.JSONLoader();
    //jsloader.load("test.json",
    //    function (geometry, materials) {
    //        var model = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
    //        model.name = 'test';
    //        model.scale.x = 10;
    //        model.scale.y = 7;
    //        model.scale.z = 10;
     //        model.position.x = -300;
     //        model.position.y = 50;
     //        model.position.z = 300;
     //        _this.addObject(model);
     //    });
     //var plane =
     //_this.createPlaneGeometry(_this, {
     //    width: 100,
     //    height: 200,
     //    pic: "../datacenterdemo/res/glass.png",
     //    transparent: true,
     //    opacity: 1,
     //    position: { x: 0, y: 100, z: -200 },
     //    rotation: { x: 0, y: 0*Math.PI, z: 0 },
     //    blending: false
     //});
 }