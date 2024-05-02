import { useEffect, useState } from "react";
import { NumberInput, Paper } from "@mantine/core";
import { updateQuantity } from "../../features/trade/tradeSlice";
import { useAppDispatch } from "../../hooks";

function NumberPicker() {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string | number>("");

  useEffect(() => {
    dispatch(updateQuantity(value));
  }, [dispatch, value]);

  return (
    <Paper shadow="md">
      <NumberInput size="md" min={0} value={value} onChange={setValue} />
    </Paper>
  );
}

export default NumberPicker;
