import React, { useState } from "react";
import {
  Center,
  Group,
  keys,
  rem,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import classes from "./TableSort.module.css";
import { useAppSelector } from "../../hooks";
import { USD } from "../AccountData/AccountData";
import MoneyConditional, {
  PercentConditional,
} from "../Conditional/MoneyConditional";

export interface RowData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  purchasePrice: number;
  quantity: number;
  totalValue: number;
  overallChange: number;
  percentChange: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;

  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(query);
      } else {
        return value.toString().toLowerCase().includes(query);
      }
    }),
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  // Check if data are numbers, otherwise fallback to string comparison.
  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
          return Number(a[sortBy]) - Number(b[sortBy]);
        } else {
          return b[sortBy].toString().localeCompare(a[sortBy].toString());
        }
      } else {
        if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
          return Number(b[sortBy]) - Number(a[sortBy]);
        } else {
          return a[sortBy].toString().localeCompare(b[sortBy].toString());
        }
      }
    }),
    payload.search,
  );
}

export default function TableSort() {
  const data = useAppSelector((state) => state.data);

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data.portfolio.body.data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(data.portfolio.body.data, { sortBy: field, reversed, search }),
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data.portfolio.body.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      }),
    );
  };

  const rows = sortedData.map((row: RowData) => (
    <Table.Tr style={{ fontSize: 17, padding: 0 }} key={row.symbol}>
      <Table.Td>{row.symbol}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{USD.format(row.price / 100)}</Table.Td>
      <Table.Td>
        <MoneyConditional value={row.change / 100}></MoneyConditional>
        <br />
        <PercentConditional
          value={row.percentChange / 100}
        ></PercentConditional>
      </Table.Td>
      <Table.Td>{USD.format(row.purchasePrice / 100)}</Table.Td>
      <Table.Td>{row.quantity}</Table.Td>
      <Table.Td>{USD.format(row.totalValue / 100)}</Table.Td>
      <Table.Td>
        <MoneyConditional value={row.overallChange / 100} />
      </Table.Td>
    </Table.Tr>
  ));

  if (data.portfolio.body.data.length === 0)
    return <Title order={3}>Your portfolio is empty.</Title>;

  return (
    <>
      <TextInput
        placeholder="Search your portfolio"
        mb="0"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={1000}
          withTableBorder
        >
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === "symbol"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("symbol")}
              >
                Symbol
              </Th>

              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Name
              </Th>

              <Th
                sorted={sortBy === "price"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("price")}
              >
                Price
              </Th>

              <Th
                sorted={sortBy === "change"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("change")}
              >
                Today
              </Th>

              <Th
                sorted={sortBy === "purchasePrice"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("purchasePrice")}
              >
                Purchase
              </Th>

              <Th
                sorted={sortBy === "quantity"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("quantity")}
              >
                Quantity
              </Th>

              <Th
                sorted={sortBy === "totalValue"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("totalValue")}
              >
                Value
              </Th>

              <Th
                sorted={sortBy === "change"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("change")}
              >
                Change
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data.portfolio.body[0]).length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
