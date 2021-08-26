import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Workouts from './pages/Workouts';
import { EventDispatcher } from './utilities/EventDispatcher';
import './utilities/typings.d.ts'
import './utilities/array.extensions'

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

test('remove array extensions', () => {
  const array = [5, 3, 2];
  const expectedArray = [5, 2];

  array.remove(3);

  expect(array).toStrictEqual(expectedArray);
});

test('unregister a function from should not call method when event fired', () => {
  interface EmptyEvents { }

  var eventCallCount = 0;
  var event = new EventDispatcher<EmptyEvents>();

  event.register(onEvent);

  event.fire({}); // Should increase callCount

  event.unregister(onEvent);

  event.fire({}); // Should do nothing

  function onEvent() {
    eventCallCount++;
  }

  expect(eventCallCount).toBe(1);
});

test('unregister a anonymous function should not work', () => {
  interface EmptyEvents { }

  var eventCallCount = 0;
  var event = new EventDispatcher<EmptyEvents>();

  event.register(() => {
    eventCallCount++;
  });

  event.fire({}); // Should increase callCount

  event.unregister(() => {
    eventCallCount++;
  });

  event.fire({}); // Should do nothing

  expect(eventCallCount).toBe(2);
});