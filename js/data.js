var msjstation;
function threeStart() {
    var initOption = {
        antialias: true,
        showHelpGrid: false,
        clearCoolr: 0x225F93,
        divHeight:$(document).height(),
        divWidth:$(document).width()
    };
    msjstation = new msj3D();
    var Aobjects = {
        objects: [
            //地板
            {
                show: true,
                uuid: "",
                name: 'floor',
                objType: 'floor',
                length: 2000,
                width: 1600,
                height: 10,
                rotation: [{ direction: 'x', degree: 0 }],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle] 
                x: 0,
                y: 0,
                z: 0,
                style: {
                    skinColor: 0x8ac9e2,
                    skin: {
                        skin_up: {
                            skinColor: 0x98750f,
                            imgurl: "images/floor.jpg",
                            repeatx: true,
                            repeaty: true,
                            width: 128,
                            height: 128
                        },
                        skin_down: {
                            skinColor: 0x8ac9e2,
                        },
                        skin_fore: {
                            skinColor: 0x8ac9e2,
                        }
                    }
                }
            },
            //墙体
            {
                show: true,
                uuid: "",
                name: 'wall',
                objType: 'wall',
                thick: 20,
                length: 100,
                height: 240,
                wallData: [
                     {//wall1
                         uuid: "",
                         name: 'wall1',
                         thick: 20,
                         height: 240,
                         skin: {
                             skin_up: {
                                 skinColor: 0xdddddd,
                             },
                             skin_down: {
                                 skinColor: 0xdddddd,
                             },
                             skin_fore: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_behind: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_left: {
                                 skinColor: 0xdeeeee,
                             },
                             skin_right: {
                                 skinColor: 0xb0cee0,
                             }
                         },
                         startDot: {
                             x: -500,
                             y: 120,
                             z: -350
                         },
                         endDot: {
                             x: 500,
                             y: 120,
                             z: -350
                         },
                         rotation: [{ direction: 'x', degree: 0 }],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle] 
                         childrens: [
                              {
                                  op: '-',
                                  show: true,
                                  uuid: "",
                                  name: 'doorhole',
                                  objType: 'doorhole',
                                  thick: 20,
                                  height: 220,
                                  startDot: {
                                      x: -410,
                                      y: 110,
                                      z: -350
                                  },
                                  endDot: {
                                      x: -190,
                                      y: 110,
                                      z: -350
                                  },
                                  skin: {
                                      skin_up: {
                                          skinColor: 0xffdddd,
                                      },
                                      skin_down: {
                                          skinColor: 0xdddddd,
                                      },
                                      skin_fore: {
                                          skinColor: 0xffdddd,
                                      },
                                      skin_behind: {
                                          skinColor: 0xffdddd,
                                      },
                                      skin_left: {
                                          skinColor: 0xffdddd,
                                      },
                                      skin_right: {
                                          skinColor: 0xffdddd,
                                      }
                                  },
                              },
                                 {
                                     op: '-',
                                     show: true,
                                     uuid: "",
                                     name: 'windowHole',
                                     objType: 'windowHole',
                                     thick: 20,
                                     height: 160,
                                     startDot: {
                                         x: -50,
                                         y: 130,
                                         z: -350
                                     },
                                     endDot: {
                                         x: 450,
                                         y: 130,
                                         z: -350
                                     }
                                 },
                                {
                                    show: true,
                                    name: 'windowCaseBottom',
                                    uuid: "",
                                    objType: 'cube',
                                    thick: 30,
                                    height: 10,
                                    startDot: {
                                        x: -50,
                                        y: 50,
                                        z: -350
                                    },
                                    endDot: {
                                        x: 450,
                                        y: 50,
                                        z: -350
                                    },
                                    skin: {
                                        skin_up: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_down: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_fore: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_behind: {
                                            skinColor: 0xc0dee0,
                                        },
                                        skin_left: {
                                            skinColor: 0xd0eef0,
                                        },
                                        skin_right: {
                                            skinColor: 0xd0eef0,
                                        }
                                    },
                                },
                         
                              {
                                  show: true,
                                  uuid: "",
                                  name: 'doorCaseRight',
                                  objType: 'cube',
                                  thick: 24,
                                  height: 220,
                                  startDot: {
                                      x: -410,
                                      y: 110,
                                      z: -350
                                  },
                                  endDot: {
                                      x: -405,
                                      y: 110,
                                      z: -350
                                  },
                                  skin: {
                                      skin_up: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_down: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_fore: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_behind: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_left: {
                                          skinColor: 0xd0eef0,
                                      },
                                      skin_right: {
                                          skinColor: 0xd0eef0,
                                      }
                                  },
                              },
                              {
                                  show: true,
                                  name: 'doorCaseLeft',
                                  uuid: "",
                                  objType: 'cube',
                                  thick: 24,
                                  height: 220,
                                  startDot: {
                                      x: -190,
                                      y: 110,
                                      z: -350
                                  },
                                  endDot: {
                                      x: -195,
                                      y: 110,
                                      z: -350
                                  },
                                  skin: {
                                      skin_up: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_down: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_fore: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_behind: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_left: {
                                          skinColor: 0xd0eef0,
                                      },
                                      skin_right: {
                                          skinColor: 0xd0eef0,
                                      }
                                  },
                              },
                              {
                                  show: true,
                                  name: 'doorCaseTop',
                                  uuid: "",
                                  objType: 'cube',
                                  thick: 24,
                                  height: 5,
                                  startDot: {
                                      x: -190,
                                      y: 220,
                                      z: -350
                                  },
                                  endDot: {
                                      x: -410,
                                      y: 220,
                                      z: -350
                                  },
                                  skin: {
                                      skin_up: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_down: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_fore: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_behind: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_left: {
                                          skinColor: 0xd0eef0,
                                      },
                                      skin_right: {
                                          skinColor: 0xd0eef0,
                                      }
                                  },
                              },
                              {
                                  show: true,
                                  name: 'doorCaseBottom',
                                  uuid: "",
                                  objType: 'cube',
                                  thick: 24,
                                  height: 5,
                                  startDot: {
                                      x: -190,
                                      y: 5,
                                      z: -350
                                  },
                                  endDot: {
                                      x: -410,
                                      y: 5,
                                      z: -350
                                  },
                                  skin: {
                                      skin_up: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_down: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_fore: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_behind: {
                                          skinColor: 0xc0dee0,
                                      },
                                      skin_left: {
                                          skinColor: 0xd0eef0,
                                      },
                                      skin_right: {
                                          skinColor: 0xd0eef0,
                                      }
                                  },
                              },
                              {
                                  show: true,
                                  name: 'doorLeft',
                                  uuid: "",
                                  objType: 'cube',
                                  thick: 4,
                                  height: 210,
                                  startDot: {
                                      x: -196,
                                      y: 112,
                                      z: -350
                                  },
                                  endDot: {
                                      x: -300,
                                      y: 112,
                                      z: -350
                                  },
                                  skin: {
                                      opacity: 0.1,
                                      skin_up: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_down: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_fore: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_behind: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_left: {
                                          skinColor: 0x51443e,
                                          imgurl: "images/door_left.png",
                                      },
                                      skin_right: {
                                          skinColor: 0x51443e,
                                          imgurl: "images/door_right.png",
                                      }
                                  },
                              },
                              {
                                  show: true,
                                  name: 'doorRight',
                                  uuid: "",
                                  objType: 'cube',
                                  thick: 4,
                                  height: 210,
                                  startDot: {
                                      x: -300,
                                      y: 112,
                                      z: -350
                                  },
                                  endDot: {
                                      x: -404,
                                      y: 112,
                                      z: -350
                                  },
                                  skin: {
                                      opacity: 0.1,
                                      skin_up: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_down: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_fore: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_behind: {
                                          skinColor: 0x51443e,
                                      },
                                      skin_left: {
                                          skinColor: 0x51443e,
                                          imgurl: "images/door_right.png",
                                      },
                                      skin_right: {
                                          skinColor: 0x51443e,
                                          imgurl: "images/door_left.png",
                                      }
                                  },
                              },
                               {
                                   show: true,
                                   name: 'doorControl',
                                   uuid: "",
                                   objType: 'cube',
                                   thick: 10,
                                   height: 40,
                                   startDot: {
                                       x: -120,
                                       y: 160,
                                       z: -365
                                   },
                                   endDot: {
                                       x: -160,
                                       y: 160,
                                       z: -365
                                   },
                                   skin: {
                                       opacity: 0.1,
                                       skin_up: {
                                           skinColor: 0x333333,
                                       },
                                       skin_down: {
                                           skinColor: 0x333333,
                                       },
                                       skin_fore: {
                                           skinColor: 0x333333,
                                       },
                                       skin_behind: {
                                           skinColor: 0x333333,
                                       },
                                       skin_left: {
                                           skinColor: 0x333333,
                                           imgurl: "images/doorControl.jpg",
                                       },
                                       skin_right: {
                                           skinColor: 0x333333,
                                       }
                                   },
                               },
                         ]
                     },
                     {//wall2
                         uuid: "",
                         name: 'wall2',
                         thick: 20,
                         height: 240,
                         skin: {
                             skin_up: {
                                 skinColor: 0xdddddd,
                             },
                             skin_down: {
                                 skinColor: 0xdddddd,
                             },
                             skin_fore: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_behind: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_left: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_right: {
                                 skinColor: 0xdeeeee,
                             }
                         },
                         startDot: {
                             x: -500,
                             y: 120,
                             z: 450
                         },
                         endDot: {
                             x: 500,
                             y: 120,
                             z: 450
                         },
                     },
                     {//wall3
                         uuid: "",
                         name: 'wall3',
                         thick: 20,
                         height: 240,
                         skin: {
                             skin_up: {
                                 skinColor: 0xdddddd,
                             },
                             skin_down: {
                                 skinColor: 0xdddddd,
                             },
                             skin_fore: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_behind: {
                                 skinColor: 0xdeeeee,
                             },
                             skin_left: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_right: {
                                 skinColor: 0xb0cee0,
                             }
                         },
                         startDot: {
                             x: 490,
                             y: 120,
                             z: -355
                         },
                         endDot: {
                             x: 490,
                             y: 120,
                             z: 455
                         },
                     },
                     {//wall4
                         uuid: "",
                         name: 'wall4',
                         thick: 20,
                         height: 240,
                         skin: {
                             skin_up: {
                                 skinColor: 0xdddddd,
                             },
                             skin_down: {
                                 skinColor: 0xdddddd,
                             },
                             skin_fore: {
                                 skinColor: 0xdeeeee,
                             },
                             skin_behind: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_left: {
                                 skinColor: 0xb0cee0,
                             },
                             skin_right: {
                                 skinColor: 0xb0cee0,
                             }
                         },
                         startDot: {
                             x: -490,
                             y: 120,
                             z: -355
                         },
                         endDot: {
                             x: -490,
                             y: 120,
                             z: 455
                         },
                     }
                ],
                style: {
                    skinColor: 0x8ac9e2
                }

            },
            //玻璃
            {
                show: true,
                name: 'windowGlass1',
                uuid: "",
                objType: 'glasses',
                width: 500,
                height: 160,
                pic: "images/glass.png",
                transparent: true,
                opacity: 0.1,
                position: { x: 200, y: 130, z: -350 },
                rotation: { x: 0, y: 0 * Math.PI, z: 0 },
                blending: false,
            },
            //贴海报
            {
                show: true,
                name: 'messagePanel',
                uuid: "",
                objType: 'plane',
                width: 100,
                height: 160,
                pic: "images/message.jpg",
                transparent: true,
                opacity: 1,
                position: { x:-250, y: 150, z: 439 },
                rotation: { x: 0, y: Math.PI, z: 0 },
                blending: false,
            },
            //空调
             {
                 show: true,
                 uuid: "",
                 name: 'aircondition',
                 objType: 'cube',
                 length: 60,
                 width: 80,
                 height: 220,
                 rotation: [{ direction: 'y', degree: 0.3*Math.PI}],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle] 
                 x: -420,
                 y: 110,
                 z: 370,
                 style: {
                     skinColor: 0xfefefe,
                     skin: {
                         skin_fore: {
                             imgurl: "images/aircondition.jpg",
                         },
                     }
                 }
             },
             //电视机
             {
                 show: true,
                 uuid: "",
                 name: 'television',
                 objType: 'cube',
                 length: 10,
                 width: 180,
                 height: 120,
                 rotation: [{ direction: 'x', degree:0}],//旋转 表示x方向0度  arb表示任意参数值[x,y,z,angle] 
                 x: -480,
                 y: 150,
                 z: 0,
                 style: {
                     skinColor: 0x555555,
                     skin: {
                         skin_fore: {
                             imgurl: "images/tv.jpg",
                         },
                     }
                 }
             },
            //机柜1-1 --原型
            {
                show:true,
                name: 'cabinet1_1',
                shellname:'cabinet1_1_shell',
                uuid: '',
               // rotation: [{ direction: 'y', degree: 0.25*Math.PI}],//旋转     uuid:'',
                objType: 'emptyCabinet',
                transparent:true,
                size:{length:66,width:70,height:200, thick:2},
                position: { x:300, y: 105, z: -180 },
                doors: {
                    doorType:'lr',// ud上下门 lr左右门 单门可以缺省
                    doorSize: [1],
                    doorname: ['cabinet1_1_door_01'],
                    skins:[ {
                        skinColor: 0x333333,
                        skin_fore: {
                            imgurl: "images/rack_door_back.jpg",
                        },
                        skin_behind: {
                            imgurl: "images/rack_front_door.jpg",
                        }
                    }]
                },
                skin:{
                    skinColor: 0xff0000,
                    skin_up: {
                        skin:{
                            skinColor: 0xff0000,
                            skin_up: { imgurl: "images/rack_door_back.jpg" },
                            skin_down: { imgurl: "images/rack_door_back.jpg" },
                            skin_fore: {
                                skinColor: 0xff0000,
                                imgurl: "images/rack_door_back.jpg"
                            },
                            skin_behind: {
                                skinColor: 0xff0000,
                                imgurl: "images/rack_door_back.jpg"
                            },
                            skin_left: { imgurl: "images/rack_door_back.jpg" },
                            skin_right: { imgurl: "images/rack_door_back.jpg" },
                        }
                    },
                    skin_down: {
                        skin: {
                            skinColor: 0x333333,
                        }
                    },
                    skin_left: {
                        skin: {
                            skinColor: 0x333333,
                        }
                    },
                    skin_right: {
                        skin: {
                            skinColor: 0x333333,
                        }
                    },
                    skin_behind: {
                        skin: {
                            skinColor: 0x333333,
                        }
                    }
                }
            },
            //主机1
              {
                  show: true,
                  uuid: "",
                  name: 'equipment_card_1',
                  objType: 'cube',
                  length: 60,
                  width: 65,
                  height: 10,
                  x: -100,
                  y: 105,
                  z: -180,
                  style: {
                      skinColor: 0xff0000,
                      skin: {
                          skin_up: {
                              skinColor: 0xff0000,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_down: {
                              skinColor: 0xff0000,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_fore: {
                              skinColor: 0xff0000,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_behind: {
                              skinColor: 0xff0000,
                              imgurl: "images/server2.jpg",
                          },
                          skin_left: {
                              skinColor: 0xff0000,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_right: {
                              skinColor: 0xff0000,
                              imgurl: "images/rack_inside.jpg",
                          }
                      }
                  }
              },
            //主机2
              {
                  show: true,
                  uuid: "",
                  name: 'equipment_card_2',
                  objType: 'cube',
                  length: 60,
                  width: 65,
                  height: 20,
                  x: -100,
                  y: 120,
                  z: -180,
                  style: {
                      skinColor: 0x92630b,
                      skin: {
                          skin_up: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_down: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_fore: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_behind: {
                              skinColor: 0x92630b,
                              imgurl: "images/server2.jpg",
                          },
                          skin_left: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_right: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          }
                      }
                  }
              },
            //主机3
              {
                  show: true,
                  uuid: "",
                  name: 'equipment_card_3',
                  objType: 'cube',
                  length: 60,
                  width: 65,
                  height: 30,
                  x: -100,
                  y: 145,
                  z: -180,
                  style: {
                      skinColor: 0x92630b,
                      skin: {
                          skin_up: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_down: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_fore: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_behind: {
                              skinColor: 0x92630b,
                              imgurl: "images/server3.jpg",
                          },
                          skin_left: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          },
                          skin_right: {
                              skinColor: 0x92630b,
                              imgurl: "images/rack_inside.jpg",
                          }
                      }
                  }
              },
        ],
        events: {
            dbclick: [
                {
                    obj_name: "doorRight",
                    obj_uuid: "",
                    obj_event: function (_obj) {
                        openRightDoor(_obj, function () { });
                    }
                },
                {
                    obj_name: "doorLeft",
                    obj_uuid: "",
                    obj_event: function (_obj) {
                        var doorstate = "close";
                        var tempobj = null;
                        if (_obj.doorState != null && typeof (_obj.doorState) != 'undefined') {
                            doorstate = _obj.doorState;
                            tempobj = _obj.parent;
                        } else {
                            console.log("add parent");
                            var _objparent = _obj.parent;
                            tempobj = new THREE.Object3D();
                            tempobj.position.set(_obj.position.x + _obj.geometry.parameters.width / 2, _obj.position.y, _obj.position.z);
                            _obj.position.set(-_obj.geometry.parameters.width / 2, 0, 0);
                            tempobj.add(_obj);
                            _objparent.add(tempobj);
                        }
                        _obj.doorState = (doorstate == "close" ? "open" : "close");
                        new createjs.Tween(tempobj.rotation).to({
                            y: (doorstate == "close" ? -0.25 * 2 * Math.PI : 0 * 2 * Math.PI)
                        }, 10000, createjs.Ease.elasticOut);
                    }
                },
                 {
                     obj_name: "cabinetdoor3_1",
                     obj_uuid: "",
                     obj_event: function (_obj) {
                         opcabinetdoor(_obj);
                     }
                 },
                 {
                     findObject:function(_objname){//查找某一类符合名称的对象
                         if (_objname.indexOf("cabinet") >= 0 && _objname.indexOf("door") >= 0) {
                             return true;
                         } else {
                             return false;
                         }
                     },
                     obj_uuid: "",
                     obj_event: function (_obj) {
                         opcabinetdoor(_obj);
                     }
                 },
                 {
                     findObject: function (_objname) {//查找某一类符合名称的对象
                         if (_objname.indexOf("equipment") >= 0 && _objname.indexOf("card") >= 0) {
                             return true;
                         } else {
                             return false;
                         }
                     },
                     obj_uuid: "",
                     obj_event: function (_obj) {
                         var cardstate = "in";
                         if (_obj.cardstate != null && typeof (_obj.cardstate) != 'undefined') {
                             cardstate = _obj.cardstate;
                         } else {
                             _obj.cardstate = "out";
                         }
                         new createjs.Tween(_obj.position).to({
                             x: (cardstate == "in" ? _obj.position.x - 50 : _obj.position.x + 50),
                         }, 1000,createjs.Ease.linear).call(function () { _obj.cardstate = cardstate == "in" ? "out" : "in"; });
                     }
                 }
            ],
            mouseDown: {
            },
            mouseUp: {
            },
            mouseMove: {
            }
        },
        btns: [
            {
                btnid: "btn_reset",
                btnTitle: "场景复位",
                btnimg: "images/reset.png",
                event: function () {
                    $('#canvas-frame').empty();
                    msjstation = null; msj3DObj = null;
                    msjstation = new msj3D();
                    msjstation.initmsj3D('canvas-frame', initOption, Aobjects);
                    msjstation.start();
                    // var mainCamera = msj3DObj.commonFunc.findObject("mainCamera");//主摄像机
                    // new createjs.Tween(mainCamera.position).to({
                    //    x: 0, y: 1000, z: -1800,
                    // }, 1000,createjs.Ease.linear);
                    // mainCamera.lookAt({ x: 0, y: 0, z: 0 });
                }
            },
            {
                btnid: "btn_connection",
                btnTitle: "走线管理",
                btnimg: "images/connection.png",
                event: function () {
                }
            },
            {
                btnid: "btn_usage",
                btnTitle: "机柜利用率",
                btnimg: "images/usage.png",
                event: function () {
                }
            },
            {
                btnid: "btn_edit",
                btnTitle: "拖拽机柜",
                btnimg: "images/edit.png",
                event: function () {
                }
            },
            {
                btnid: "btn_alarm",
                btnTitle: "告警巡航",
                btnimg: "images/alarm.png",
                event: function () {
                    var mainCamera = msj3DObj.commonFunc.findObject("mainCamera");//主摄像机
                    var doorRight = msj3DObj.commonFunc.findObject("doorRight");
                    mainCamera.lookAt(doorRight.position);
                    new createjs.Tween(mainCamera.position).to({
                        x:-300, y:200, z:-700,
                    }, 5000,createjs.Ease.linear).call(function () {
                
                        openRightDoor(msj3DObj.commonFunc.findObject("doorRight"), function () {
                            var cabinet3_1 = msj3DObj.commonFunc.findObject("cabinet3_1");
                            mainCamera.lookAt(cabinet3_1.position);
                            new createjs.Tween(mainCamera.position).to({
                                x: -300, y: 150, z: -200,
                            }, 5000,createjs.Ease.linear).call(function () {    
                                mainCamera.lookAt(cabinet3_1.position);
                            });
                        });
                    });
                  
                  
                }
            },
        ]
    }

    //复制机柜
    for (var i = 1; i <=3;i++){ 
        for (var j = 1; j <=6; j++) {
            if (i != 1 || j != 1) {
            Aobjects.objects.push({
                show: true,
                copyfrom: 'cabinet1_1',
                name: 'cabinet'+i+'_'+j,
                childrenname: ['cabinet' + i + '_' + j + '_shell', 'cabinet' + i + '_' + j + '_door_01'],
                uuid: '',
                objType: 'cloneObj',
                position: { x:-(i-1)*200, y:0 , z:(j-1)*100 },
                scale: { x: 1, y: 1, z: 1 }
            });
            }
        }
    }
    msjstation.initmsj3D('canvas-frame', initOption, Aobjects);
    msjstation.start();
}
function opcabinetdoor(_obj) {
    var doorstate = "close";
    var tempobj = null;
    if (_obj.doorState != null && typeof (_obj.doorState) != 'undefined') {
        doorstate = _obj.doorState;
        tempobj = _obj.parent;
    } else {
        console.log("add parent");
        var _objparent = _obj.parent;
        tempobj = new THREE.Object3D();
        tempobj.position.set(_obj.position.x, _obj.position.y, _obj.position.z + _obj.geometry.parameters.depth / 2);
        _obj.position.set(0, 0, -_obj.geometry.parameters.depth / 2);
        tempobj.add(_obj);
        _objparent.add(tempobj);
    }
    _obj.doorState = (doorstate == "close" ? "open" : "close");
    new createjs.Tween(tempobj.rotation).to({
        y: (doorstate == "close" ? 0.25 * 2 * Math.PI : 0 * 2 * Math.PI)
    }, 1000, createjs.Ease.linear);
}
function openRightDoor(_obj,func) {
    var doorstate = "close";
    var tempobj = null;
    if (_obj.doorState != null && typeof (_obj.doorState) != 'undefined') {
        doorstate = _obj.doorState;
        tempobj = _obj.parent;
    } else {
        console.log("add parent");
        var _objparent = _obj.parent;
        tempobj = new THREE.Object3D();
        tempobj.position.set(_obj.position.x - _obj.geometry.parameters.width / 2, _obj.position.y, _obj.position.z);
        _obj.position.set(_obj.geometry.parameters.width / 2, 0, 0);
        tempobj.add(_obj);
        _objparent.add(tempobj);
    }
    _obj.doorState = (doorstate == "close" ? "open" : "close");
    new createjs.Tween(tempobj.rotation).to({
        y: (doorstate == "close" ? 0.25 * 2 * Math.PI : 0 * 2 * Math.PI)
    }, 10000, createjs.Ease.elasticOut);
}