/*
 * @Author: your name
 * @Date: 2020-12-31 17:40:37
 * @LastEditTime: 2020-12-31 17:40:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /industry-process/src/reportWebVitals.js
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
