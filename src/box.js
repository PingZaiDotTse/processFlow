/*
 * @Author: your name
 * @Date: 2020-12-31 18:03:10
 * @LastEditTime: 2021-01-06 13:10:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /industry-process/src/box.js
 */

import React from "react";
import ReactDOM from "react-dom";
import Block from "./block";
import "./index.css";
import rebackIcon from './static/reback.png';
import saveIcon from './static/save.png';


// window.onbeforeunload = function(event) { 
//     window.confirm('页面即将刷新或关闭？');
// }; 

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: [
        {
          index:0,
          text:'罐',
          type: "box",
          top: 100,
          left: 150,
          rotate:0
        },
        // {
        //   index:1,
        //   type: "pipe",
        //   top: 50,
        //   left: 400,
        //   derection: "row",
        // },
        // {
        //   index:2,
        //   type: "box",
        //   top: 50,
        //   left: 600,
        // },
        // {
        //   index:3,
        //   type: "pipe",
        //   top: 250,
        //   left: 600,
        //   derection: "column",
        // },
      ],
    };
  }

  addBlock=(obj)=>{
    return new Promise((resolve,reject)=>{
        this.setState({
            mapData:this.state.mapData.concat([{...obj}])
        },()=>{
            console.log({'mapData':this.state.mapData});

            resolve(true);
        })
    });
  }

  updateMap=(obj)=>{    //更新
    // console.log({obj});
    const {index} = obj;
    let temp = this.state.mapData;
    temp[index] = {
        ...this.state.mapData[index],
        ...obj
    }
    this.setState({
        mapData:temp
    },()=>{
        console.log({'mapData':this.state.mapData});
    })
    // const needModifyObj = this.state.mapData.filter(item=>item.index==index);

  }

  reback=()=>{    //返回上一步，不包括旋转
       const needDelIndex = this.state.mapData[this.state.mapData.length-1].index;
       if(needDelIndex != 0 ){
            // console.log({needDelIndex});
            const needArr = this.state.mapData.filter(item=>item.index != needDelIndex);
            this.setState({
                mapData:needArr
            },()=>{
                this.reduceBoxIndex();
            })
       }
       
  }

  getBox=(index)=>{    //获取
      return this.state.mapData.filter(item=>item.index == index);
  }


  componentDidMount () {
    // 拦截判断是否离开当前页面
    window.addEventListener('beforeunload', this.beforeunload);
  }
  componentWillUnmount () {
    // 销毁拦截判断是否离开当前页面
    window.removeEventListener('beforeunload', this.beforeunload);
  }
  beforeunload (e) {
    let confirmationMessage = '你确定离开此页面吗?';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  }

  onRef = (func) => {
    this.reduceBoxIndex = func;
  }

  render() {
    return (
      <div className="map" onClick={() => {}}>
        <img className="rebackBtn" onClick={()=>this.reback()} src={rebackIcon} />
        <img className="saveBtn" onClick={()=>this.reback()} src={saveIcon} />
        {this.state.mapData.map((item, index) => {
          return <Block 
                   data={item} 
                   onRef={this.onRef}
                   addBlock={this.addBlock}
                   updateMap ={this.updateMap}
                   getBox={this.getBox}
                   key={index} />;
        })}
      </div>
    );
  }
}

export default Box;
