import React from 'react';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';

import Adapter from 'enzyme-adapter-react-16';
import store from '../../store';
import CustomNavBar from './CustomNavBar';

configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount(
    <Provider store={store}>
      <CustomNavBar />
    </Provider>,
  );
  expect(component).toMatchSnapshot();
  component.unmount();
});
