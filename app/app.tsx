import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import TableSort from "./components/TableSort/TableSort";
import TradeModal from "./components/TradeModal/TradeModal";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "./fetcher";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { updateAccount, updatePortfolio } from "./features/data/dataSlice";
import AccountData from "./components/AccountData/AccountData";
import PendingTrades from "./components/PendingTrades/PendingTrades";

function App() {
  const session = useSession();
  const { data: accountData, isLoading: accountLoading } = useSWR(
    `http://localhost:8080/api/account?id=${session.data?.user?.id}`,
    fetcher,
  );

  const { data: portfolioData, isLoading: portfolioLoading } = useSWR(
    `http://localhost:8080/api/positions?id=${session.data?.user?.id}`,
    fetcher,
  );

  useSWR(
    `http://localhost:8080/api/ping?id=${session.data?.user?.id}`,
    fetcher,
    { refreshInterval: 1000 * 10 },
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateAccount(accountData));
    dispatch(updatePortfolio(portfolioData));
  });

  if (accountLoading || portfolioLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "18.5%",
        breakpoint: "sm",
        collapsed: { mobile: true },
      }}
      padding="md"
    >
      <AppShellHeader>
        <Group>
          <Title fw={300} m={6}>
            MSigma Simulator
          </Title>

          <TradeModal></TradeModal>
        </Group>
      </AppShellHeader>

      <AppShellNavbar p="md">
        <AccountData></AccountData>
      </AppShellNavbar>

      <AppShellMain>
        <Stack style={{ border: "1px solid red" }} justify="space-between">
          <Group grow >
            <TableSort></TableSort>
          </Group>

          <PendingTrades></PendingTrades>
        </Stack>
      </AppShellMain>
    </AppShell>
  );
}

export default App;
