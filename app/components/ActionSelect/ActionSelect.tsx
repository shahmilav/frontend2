import { Paper, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { updateAction } from "../../features/trade/tradeSlice";

function ActionSelect() {
  const [value, setValue] = useState<string | null>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateAction(value));
  }, [dispatch, value]);

  return (
    <Paper shadow="md">
      <Select
        size="md"
        value={value}
        onChange={setValue}
        data={["Buy", "Sell"]}
      ></Select>
    </Paper>
  );
}

export default ActionSelect;
