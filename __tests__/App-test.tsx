/**
 * @format
 */

import 'react-native';

jest.mock('@amplitude/react-native', () => {
  const AmplitudeMock = {
    getInstance: jest.fn().mockReturnThis(),
    init: jest.fn().mockReturnValue(true),
    logEvent: jest.fn().mockReturnValue(true),
  };

  return {Amplitude: AmplitudeMock};
});

import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Amplitude} from '@amplitude/react-native';

beforeEach = () => {
  renderer.create(<App />);
};

it('called getInstance', () => {
  expect(Amplitude.getInstance).toHaveBeenCalledTimes(1);
});

it('called init', () => {
  expect(Amplitude.getInstance().init).toHaveBeenCalledTimes(1);
  expect(Amplitude.getInstance().init).toHaveBeenCalledWith(
    '9c9566b48da3f559498fd70b164303b8',
  );
});

it('called logEvent', () => {
  renderer.act(() => {
    expect(Amplitude.getInstance().logEvent).toHaveBeenCalledTimes(1);
    expect(Amplitude.getInstance().logEvent).toHaveBeenCalledWith('mounting');
  });
});
