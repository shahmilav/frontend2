import {
  Autocomplete,
  AutocompleteProps,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { updateStock } from "../../features/trade/tradeSlice";
import { debounce } from "./debounce";

function StockSearch() {
  const url = "http://localhost:8082/search/"
  const dispatch = useAppDispatch();

  const [closed, setClosed] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState<string[]>([]);

  /**
   * Debouncing search that gets autocomplete options, if any exist.
   */
  const search = useMemo(() => {
    return debounce(async (value: string) => {
      if (value === "") {
        setOptions([]);
        return;
      }

      const response = await fetch(`${url}${value}`);
      const json = await response.json();

      setOptions(json.data);
    }, 100);
  }, []);

  /**
   * Updates redux store with stock.
   */
  useEffect(() => {
    dispatch(updateStock(value));
  }, [dispatch, value]);

  /**
   * Validates the selection to ensure it is, in fact, a stock.
   */
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}${value}`);
      const json = await response.json();
      return json.data;
    };

    if (closed) {
      if (value !== "") {
        fetchData().then((res) => {
          if (res == null || res[0] !== value) {
            setValue("");
            setClosed(false);
          }
        });
      }
    }
  }, [closed, value]);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option
  }) => (
    <Group gap="sm">
      <div>
        <Text size="sm" fw={500}> {option.value.split(":")[0]}</Text>
        <Text size="xs" opacity={0.5} fw={400}>
          {option.value.split(":")[1]}
        </Text>
      </div>
    </Group>
  );

  return (
    <Paper shadow="md">
      <Autocomplete
        renderOption={renderAutocompleteOption}
        size="md"
        data={options}
        value={value}
        onChange={(value) => {
          setClosed(false);
          setValue(value);

          if (value !== "") {
            search(value);
          }
        }}
        onDropdownClose={() => {
          setClosed(true);
          setOptions([]);
        }}
      />
    </Paper>
  );
}

export default StockSearch;
