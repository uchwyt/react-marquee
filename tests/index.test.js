/**
 * Created by marcin on 06.12.16.
 */
import renderer from 'react-test-renderer';
import React from 'react';
import Marquee from '../lib/index';
import { JssProvider, SheetsRegistry } from 'react-jss';

describe('ReactMarque', function () {
  const text = 'Test text';
  it('render text with default props', () => {
    'use strict';
    const tree = renderer
    .create(<Marquee text={text}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render text with custom class', () => {
    'use strict';
    const tree = renderer
    .create(<Marquee text={text} className='test-class' classInner='inner-class'/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render with loop class', () => {
    'use strict';

    const tree = renderer
    .create(<Marquee text={text} loop/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render with custom delay', () => {
    'use strict';
    const registry = new SheetsRegistry();

    const tree = renderer
    .create(
      <JssProvider registry={registry}>
        <Marquee text={text} delay={100}/>
      </JssProvider>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
    expect(registry.toString()).toMatchSnapshot()
  });

  it('render with custom timeout', () => {
    'use strict';
    const registry = new SheetsRegistry();
    const tree = renderer
    .create(
      <JssProvider registry={registry}>
        <Marquee text={text} timeout={100}/>
      </JssProvider>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
    expect(registry.toString()).toMatchSnapshot()
  });

  it('render with custom direction', () => {
    'use strict';
    const registry = new SheetsRegistry();
    const tree = renderer
    .create(<JssProvider registry={registry}><Marquee text={text} direction='alternate-reverse'/></JssProvider>)
    .toJSON();
    expect(tree).toMatchSnapshot();
    expect(registry.toString()).toMatchSnapshot()
  });

});
