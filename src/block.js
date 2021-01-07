/*
 * @Author: your name
 * @Date: 2020-12-31 18:08:49
 * @LastEditTime: 2021-01-07 11:04:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /industry-process/src/block.js
 */

import "./index.css";
import React, {useEffect, useState } from "react";
import { Menu, Dropdown, Button, Cascader,Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import img from "./static/rotate.png";

// function handleButtonClick(e) {
//   message.info("Click on left button.");
//   console.log("click left button", e);
// }

console.log("刷新");
let boxIndex = 0;

function Block(props) {
//   console.log({ props });
  const { updateMap,addBlock, getBox, data } = props;
  const { type, top, left, derection, index, pipeType, rotate,text,ifOpen } = data;
  const [ifedit, setIfedit] = useState(false);
  const [current, setCurrent] = useState({});
  const [newBox, setnewBox] = useState({});

  //   const [pipeType,setpipeType] = useState('直线管道');
  if(index==16){
    console.log({data});
  }
  

  const derecHandle = (e) => {
    // console.log("derec", e);
    if (e["key"] === "上") {
      setnewBox({
        ...newBox,
        derection: "column",
        top: newBox["top"] - 150,
      });
    }
    if (e["key"] === "下") {
      setnewBox({
        ...newBox,
        derection: "column",
        top: newBox["top"] + 150,
      });
    }
    if (e["key"] === "左") {
      setnewBox({
        ...newBox,
        derection: "row",
        left: newBox["left"] - 150,
      });
    }
    if (e["key"] === "右") {
      let temp = {
        ...newBox,
        derection: "row",
        left: current["left"] + 150,
      };

      setnewBox({
        ...temp,
      });
      //   console.log({ newBox, temp });
    }
    // console.log({newBox});
  };

  const btnClick = (e) => {
    // console.log({ newBox, boxIndex });
    e.stopPropagation();
    //罐
    if (newBox["type"] === "box") {
        addBlock({
        ...newBox,
        index: boxIndex + 1,
      });
      boxIndex = boxIndex + 1;
    }
    //阀门
    if (newBox["type"] === "valve") {
        addBlock({
        ...newBox,
        index: boxIndex + 1,
      });
      boxIndex = boxIndex + 1;
    }
    //流量计
    if (newBox["type"] === "flow") {
        addBlock({
        ...newBox,
        index: boxIndex + 1,
      });
      boxIndex = boxIndex + 1;
    }
    //管道
    if (newBox["type"] === "pipe") {
     
      addBlock({
        ...newBox,
        index: boxIndex + 1,
        type: "pipe",
      }).then((bool) => {
        if (bool) {
          boxIndex = boxIndex + 1;
          //   update({
          //     ...newBox,
          //     index: newBox["index"] + 2,
          //     type: "box",
          //     left: newBox['derection']=='column'?newBox["left"]:newBox["left"] + 200,
          //     top:newBox['derection']=='column'?newBox["top"] + 200:newBox["top"]
          //   });
        }
      });
    }
  };

  const options = [
    {
      value: "罐",
      label: "罐",
    },
    {
      value: "管道",
      label: "管道",
      children: [
        {
          value: "直线管道",
          label: "直线管道",
        },
        {
          value: "t字管道",
          label: "t字管道",
        },
        {
          value: "L字管道",
          label: "L字管道",
        },
      ],
    },
    {
      value: "阀门",
      label: "阀门",
    },
    {
      value: "流量计",
      label: "流量计",
    },
  ];

  const onChange = (value, selectedOptions) => {
    // console.log({ value, selectedOptions });
    // console.log(value[0]);
    // console.log(value[1]);

    if (value[0] === "罐") {
      setnewBox({
        ...current,
        text:'罐',
        type: "box",
      });
    }

    if (value[0] === "阀门") {
      setnewBox({
        ...current,
        text:'阀门',
        ifOpen:true,
        type: "valve",
      });
    }

    if (value[0] === "流量计") {
        setnewBox({
          ...current,
          text:'流量计',
          type: "flow",
        });
      }

    if (value[0] === "管道") {
      if (value[1] === "直线管道") {
        setnewBox({
          ...current,
          type: "pipe",
          text:'直线管道',
          pipeType: "直线管道",
        });
        // setpipeType('直线管道');
      }
      if (value[1] === "t字管道") {
        setnewBox({
          ...current,
          type: "pipe",
          text:'t字管道',
          pipeType: "t字管道",
        });
        // setpipeType('t字管道');
      }
      if (value[1] === "L字管道") {
        setnewBox({
          ...current,
          type: "pipe",
          text:'L字管道',
          pipeType: "L字管道",
        });
        // setpipeType('t字管道');
      }
    }
  };

  const derecMenu = (
    <Menu onClick={derecHandle}>
      <Menu.Item key="上">上</Menu.Item>
      <Menu.Item key="下">下</Menu.Item>
      <Menu.Item key="左">左</Menu.Item>
      <Menu.Item key="右">右</Menu.Item>
    </Menu>
  );

  const startEdit = (index) => {
    setCurrent(getBox(index)[0]);
    // console.log(getBox(index)[0]);
    setIfedit(true);
  };

  useEffect(() => {
      props.onRef(rebackToPrev)
  }, []);

  const rotatePipe = (e,index) => {
        // console.log({'旋转index':index});
        e.stopPropagation();
        updateMap({
            ...getBox(index)[0],
            rotate:getBox(index)[0].rotate+90
        });
  };

  const rebackToPrev=()=>{
    boxIndex = boxIndex - 1;
    console.log('boxIndex减1')
  }

  const inputHandle = (e,index)=>{
    // console.log({e,index});
    updateMap({
        ...getBox(index)[0],
        text:e.target.value
    });
  }

  const switchHandle = (checked)=>{
    //    console.log({checked});
    updateMap({
        ...getBox(index)[0],
        ifOpen:checked
    });
  }

  return (
    <div
      className="block"
      style={
        pipeType === "t字管道"
          ? { top: top + "px", left: left + "px" }
          : { top: top + "px", left: left + "px" }
      }
      onMouseEnter={() => startEdit(index)}
      onMouseLeave={() => setIfedit(false)}
    >
      {type === "box" && (
        <div className="tank">
          <div><input className="input"  onChange={e=>inputHandle(e,index)}  value={text} /></div>
          <div className="option">
            {ifedit && (
              <Cascader
                options={options}
                onChange={onChange}
                placeholder="对象"
              />
            )}
            {ifedit && (
              <Dropdown overlay={derecMenu}>
                <Button>
                  指向 <DownOutlined />
                </Button>
              </Dropdown>
            )}
            {ifedit && (
              <Button type="primary" onClick={btnClick}>
                确定
              </Button>
            )}
          </div>
        </div>
      )}
      {
          type === "flow" &&(
              <div className="flow">
                    {/* 点击旋转按钮 */}
                    {ifedit && (
                        <img
                        className="rotateBtn"
                        src={img}
                        onClick={(e) => rotatePipe(e,index)}
                        />
                    )}
                    <div className="option">
                        {ifedit && (
                        <Cascader
                            options={options}
                            onChange={onChange}
                            placeholder="对象"
                        />
                        )}
                        {ifedit && (
                        <Dropdown overlay={derecMenu}>
                            <Button>
                            指向 <DownOutlined />
                            </Button>
                        </Dropdown>
                        )}
                        {ifedit && (
                        <Button type="primary" onClick={btnClick}>
                            确定
                        </Button>
                        )}
                    </div>
                    <div className="flowInner" style={{ transform: `rotate(${rotate}deg)` }}>
                    <div className="flowBlock">
                    <input className="input" style={{backgroundColor:'transparent',border:'none',textAlign:'center'}} onChange={e=>inputHandle(e,index)}  value={text} />
                    </div>
                    </div>
              </div>
          )
      }
      {type === "valve" && (
        <div className="valve">
          {/* 点击旋转按钮 */}
          {ifedit && (
            <img
              className="rotateBtn"
              src={img}
              onClick={(e) => rotatePipe(e,index)}
            />
          )}
          <div className="option">
            {ifedit && (
              <Cascader
                options={options}
                onChange={onChange}
                placeholder="对象"
              />
            )}
            {ifedit && (
              <Dropdown overlay={derecMenu}>
                <Button>
                  指向 <DownOutlined />
                </Button>
              </Dropdown>
            )}
            {ifedit && (
              <Button type="primary" onClick={btnClick}>
                确定
              </Button>
            )}
          </div>
          <div className="valveInner" style={{ transform: `rotate(${rotate}deg)` }}>
          <div className="valveBlock">
          <Switch checked={ifOpen} onChange={switchHandle} />
          <input className="input" style={{backgroundColor:'transparent',border:'none',display:'flex',width:'100%',textAlign:'center',justifyContent:'center',alignItems:'center'}} onChange={e=>inputHandle(e,index)}  value={text} />
          </div>
          </div>
        </div>
      )}
      {type === "pipe" && (
        <div className="pipe">
          {/* 点击旋转按钮 */}
          {ifedit && (
            <img
              className="rotateBtn"
              src={img}
              onClick={(e) => rotatePipe(e,index)}
            />
          )}
          <div className="option">
            {ifedit && (
              <Cascader
                options={options}
                onChange={onChange}
                placeholder="对象"
              />
            )}
            {ifedit && (
              <Dropdown overlay={derecMenu}>
                <Button>
                  指向 <DownOutlined />
                </Button>
              </Dropdown>
            )}
            {ifedit && (
              <Button type="primary" onClick={btnClick}>
                确定
              </Button>
            )}
          </div>

          <div className="pipeInner" style={{ transform: `rotate(${rotate}deg)` }}>
          {pipeType == "直线管道" && (
            <div
              className="linePipe"
              style={{
                transform:
                  derection === "column" ? "rotate(90deg)" : "rotate(0deg)",
              }}
            ></div>
          )}
          {pipeType == "t字管道" && (
            <div
              className="t-pipe"
            >
              <div className="up" />
              <div className="mid" />
           
            </div>
          )}
          {pipeType == "L字管道" && (
            <div className="l-pipe">
              <div className="mid" />
              <div className="down" />
            </div>
          )}
          </div>

        </div>
      )}
    </div>
  );
}

export default Block;
