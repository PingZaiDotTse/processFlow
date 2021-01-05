/*
 * @Author: your name
 * @Date: 2020-12-31 17:41:16
 * @LastEditTime: 2020-12-31 17:41:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /industry-process/src/App.test.js
 */
/*
 * @Author: your name
 * @Date: 2020-12-31 17:40:37
 * @LastEditTime: 2020-12-31 17:40:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /industry-process/src/App.test.js
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
