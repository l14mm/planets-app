import React from 'react';
import { shallow } from 'enzyme';

import PlanetCard from './PlanetCard';

const style = {};
const planet = { description: 'A big planet' };
const header = {};

describe('<PlanetCard />', () => {
  it('Renders description with "..." on the end', () => {
    const wrapper = shallow(<PlanetCard style={style} planet={planet} classes={{ header }} />);
    expect(wrapper.find('.planet-description').text()).toBe(`${planet.description}...`);
  });
});
