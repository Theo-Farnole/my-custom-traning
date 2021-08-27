import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Workouts from './pages/Workouts';
import { EventDispatcher } from './utilities/EventDispatcher';
import './utilities/typings.d.ts'
import './utilities/array.extensions'
import { Workout } from './services/Workout';
import { Set } from './services/Set';
import { Utilities } from './utilities/utilities';

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

test('workout duplicate should have different UID', () => {
  const source = new Workout("test", [
    new Set("Pull", "10", 3),
    new Set("Push up", "30", 1)
  ], 90);

  const copy = source.getACopy();

  expect(copy.uid).toBeDefined();
  expect(source.uid).toBeDefined();
  expect(copy.uid).not.toBe(source.uid); // UID should be different

  expect(copy.sets[0].uid).not.toBe(source.sets[0].uid);
  expect(copy.sets[1].uid).not.toBe(source.sets[1].uid);
});

test('workout duplicate should duplicate', () => {
  const source = new Workout("test", [
    new Set("Pull", "10", 3),
    new Set("Push up", "30", 1)
  ], 90);

  const copy = source.getACopy();

  expect(typeof copy).toBe(typeof source);

  expect(copy.name).toBe(source.name);
  expect(copy.duration).toBe(source.duration);
  expect(copy.secondsBetweenSets).toBe(source.secondsBetweenSets);
  expect(copy.sets.length).toBe(source.sets.length);

  expect(typeof copy.sets[0]).toBe(typeof source.sets[0]);
  expect(copy.sets[0].exercise).toBe(source.sets[0].exercise);
  expect(copy.sets[0].repetitionsPerSet).toBe(source.sets[0].repetitionsPerSet);
  expect(copy.sets[0].setCount).toBe(source.sets[0].setCount);
});