import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
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
  expect(copy.secondsBetweenSets).toBe(source.secondsBetweenSets);
  expect(copy.sets.length).toBe(source.sets.length);

  expect(typeof copy.sets[0]).toBe(typeof source.sets[0]);
  expect(copy.sets[0].exercise).toBe(source.sets[0].exercise);
  expect(copy.sets[0].repetitionsPerSet).toBe(source.sets[0].repetitionsPerSet);
  expect(copy.sets[0].setCount).toBe(source.sets[0].setCount);
});

test('format MMSS should convert to seconds', () => {

  expect(Utilities.MMSSToSeconds("01:50")).toBe(110);
  expect(Utilities.MMSSToSeconds("00:00")).toBe(0);
  expect(Utilities.MMSSToSeconds("01:00")).toBe(60);

});

test('seconds to MMSS', () => {
  expect(Utilities.SecondsToMMSS(30)).toBe("00:30");
  expect(Utilities.SecondsToMMSS(60)).toBe("01:00");
  expect(Utilities.SecondsToMMSS(120)).toBe("02:00");
  expect(Utilities.SecondsToMMSS(600)).toBe("10:00");
});

test('seconds to MMSS to handle edge cages', () => {
  
  expect(() => Utilities.SecondsToMMSS(3600)).toThrow();
  expect(() => Utilities.SecondsToMMSS(9000)).toThrow();
});

test('format MMSS should handle bad inputs', () => {

  expect(() => Utilities.MMSSToSeconds("60:00:50")).toThrow(Utilities.ExceptionMMSS_NotRightLength);
  expect(() => Utilities.MMSSToSeconds("0:50")).toThrow();
  expect(() => Utilities.MMSSToSeconds("0050")).toThrow();
  expect(() => Utilities.MMSSToSeconds("00150")).toThrow();
  expect(() => Utilities.MMSSToSeconds("0a:50")).toThrow();
  expect(() => Utilities.MMSSToSeconds("01:a0")).toThrow();

  expect(() => Utilities.MMSSToSeconds("0.:50")).not.toThrow(); // 0. equals to zero

});

test('is numeric should work', () => {
  expect(Utilities.isNumeric("qdsf")).toBe(false);
  expect(Utilities.isNumeric("100")).toBe(true);
  expect(Utilities.isNumeric("100.10")).toBe(true);
  expect(Utilities.isNumeric("100,10")).toBe(false);
})

test('is numeric integer ', () => {
  expect(Utilities.isNumericInteger("qdsf")).toBe(false);
  expect(Utilities.isNumericInteger("100")).toBe(true);
  expect(Utilities.isNumericInteger("-100")).toBe(true);
  expect(Utilities.isNumericInteger("100.")).toBe(true);
  expect(Utilities.isNumericInteger("100.10")).toBe(false);
  expect(Utilities.isNumericInteger("100,10")).toBe(false);
})

test("exercice count work", () => {

});