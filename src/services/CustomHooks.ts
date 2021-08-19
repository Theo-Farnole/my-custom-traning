import { useState } from "react";

// source: https://dev.to/bytebodger/constructors-in-functional-components-with-hooks-280m
// this is a custom hook that mimic the constructor for a functional component
export const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }