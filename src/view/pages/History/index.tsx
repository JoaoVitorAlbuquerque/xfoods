import { Header } from "../../components/Header";
import { HistoryIcon } from "../../components/icons/HistoryIcon";

import { orders } from "../../../mocks/Orders";
import { HistoryOrderTable } from "./components/HistoryOrderTable";

export function History() {
  return (
    <>
      <Header
        icon={<HistoryIcon className="w-8 h-8" />}
        description="Visualize pedidos anteriores"
      >
        Histórico
      </Header>

      <HistoryOrderTable
        orders={orders}
      />
    </>
  );
}
