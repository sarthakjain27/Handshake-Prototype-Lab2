import React from 'react';
import { mount, configure } from 'enzyme';
import store from '../../../store';
import { Provider } from 'react-redux';

import Adapter from 'enzyme-adapter-react-16';
import StudentHome from './StudentHome';

configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount(
  <Provider store={store}>
    <StudentHome />
    </Provider>);
  expect(component).toMatchSnapshot();
  component.unmount();
});
