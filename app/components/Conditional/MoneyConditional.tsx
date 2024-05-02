import { USD } from "../AccountData/AccountData";
import { useMantineTheme } from "@mantine/core";

/**
 * Conditional element for a USD value.
 *
 * Red if negative, green if positive, grey if 0.
 *
 * @param value number to be displayed
 * @constructor
 */
export default function MoneyConditional({ value }: { value: number }) {
  const theme = useMantineTheme();
  if (value > 0) {
    return (
      <span style={{ color: theme.colors.green[8] }}>
        ▲{USD.format(Math.abs(value))}
      </span>
    );
  } else if (value < 0) {
    return (
      <span style={{ color: theme.colors.red[8] }}>
        ▼{USD.format(Math.abs(value))}
      </span>
    );
  } else {
    return (
      <span style={{ color: theme.colors.gray[6] }}>
        {USD.format(Math.abs(value))}
      </span>
    );
  }
}

/**
 * Conditional element for a percentage.
 *
 * Same as MoneyConditional, but with percentage formatting instead of USD.
 * @param value percentage to be formatted
 * @constructor
 */
export function PercentConditional({ value }: { value: number }) {
  const theme = useMantineTheme();
  if (value > 0) {
    return (
      <span style={{ color: theme.colors.green[8] }}>▲{Math.abs(value)}%</span>
    );
  } else if (value < 0) {
    return (
      <span style={{ color: theme.colors.red[8] }}>▼{Math.abs(value)}%</span>
    );
  } else {
    return (
      <span style={{ color: theme.colors.gray[6] }}>{Math.abs(value)}%</span>
    );
  }
}
