import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
export default function TestCoun() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };
  return (
    <div className="">
      <p>{count}</p>
      <ButtonGroup>
        <Button onClick={handleDecrement}>Decrease</Button>
        <Button onClick={handleIncrement}>Increase</Button>
      </ButtonGroup>
    </div>
  );
}
