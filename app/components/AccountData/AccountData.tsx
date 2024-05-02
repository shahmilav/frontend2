import { Text, Title } from "@mantine/core";
import { useAppSelector } from "../../hooks";

export interface Account {
  value: number;
  cash: number;
  change: number;
}

export const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function AccountData() {
  // get account data from redux store
  const account = useAppSelector((state) => state.data).account;

  if (account === null || account === undefined) {
    return <Text>No account data!!</Text>;
  }

  return (
    <>
      <Text fz={20}>Account Value</Text>
      <Title fw={500}>{USD.format(account.body.value / 100)}</Title>
      <br />
      <Text fz={20}>Cash</Text>
      <Title fw={500}>{USD.format(account.body.cash / 100)}</Title>
    </>
  );
}

export default AccountData;
