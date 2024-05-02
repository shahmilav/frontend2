import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import StockSearch from "../StockSearch/StockSearch";
import NumberPicker from "../NumberPicker/NumberPicker";
import ActionSelect from "../ActionSelect/ActionSelect";
import { useAppSelector } from "../../hooks";

function TradeModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const trade = useAppSelector((state) => state.trade);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Stack>
          <Title order={2} fw={300}>
            Trade
          </Title>

            <Paper withBorder>
              <Text>
                {trade.action} {trade.quantity} {trade.stock}
              </Text>
            </Paper>
          <StockSearch></StockSearch>
          <NumberPicker></NumberPicker>
          <ActionSelect></ActionSelect>

          <br />

          <SimpleGrid cols={2}>
            <Button variant={"outline"} color={"black"}>
              Trade
            </Button>
            <Button variant={"outline"} color={"black"} onClick={close}>
              Close
            </Button>
          </SimpleGrid>
        </Stack>
      </Modal>

      <Paper p={4}>
        <UnstyledButton fw={600} onClick={open}>
          Open modal
        </UnstyledButton>
      </Paper>
    </>
  );
}

export default TradeModal;
