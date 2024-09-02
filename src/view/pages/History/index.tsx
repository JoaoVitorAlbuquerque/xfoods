import { Header } from "../../components/Header";
import { HistoryIcon } from "../../components/icons/HistoryIcon";
// import { Spinner } from "../../components/Spinner";

import { HistoryOrderTable } from "./components/HistoryOrderTable";
// import { useHistoryController } from "./useHistoryController";

export function History() {
  // const { data: orders, isFetching } = useHistoryController();

  return (
    <>
      <Header
        icon={<HistoryIcon className="w-8 h-8" />}
        description="Visualize pedidos anteriores"
      >
        Histórico
      </Header>

      {/* {isFetching ? (
        <div className="flex items-center justify-center flex-1">
          <Spinner />
        </div>
      ) : (
        <HistoryOrderTable
          orders={orders}
        />
      )} */}
      <HistoryOrderTable />
    </>
  );
}
