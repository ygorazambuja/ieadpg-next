import { Box } from "@chakra-ui/react";

type ListTileProps = {
  label: string;
  value?: string;
};

export function ListTile({ label, value }: ListTileProps) {
  return (
    <Box shadow={"1xl"} py="2">
      <strong>{label}:</strong> <span>{value}</span>
    </Box>
  );
}
