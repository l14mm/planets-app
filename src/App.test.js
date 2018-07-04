import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const location = { pathname: '' };

describe('<App />', () => {
  it('renders the app', () => {
    const wrapper = shallow(<App location={location} />);
    expect(wrapper.find('.App').length).toBe(1);
  });
});
