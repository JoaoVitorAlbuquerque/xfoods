import { Header } from "../../components/Header";
import { HistoryIcon } from "../../components/icons/HistoryIcon";
import { Spinner } from "../../components/Spinner";

// import { orders } from "../../../mocks/Orders";
import { HistoryOrderTable } from "./components/HistoryOrderTable";
import { useHistoryController } from "./useHistoryController";

{/* Mostrar apenas os pedidos que o dia foi resetado, ao resetar o dia vai "setar" uma propriedade para "true" que vai "liberar" a renderização deste pedido */}

export function History() {
  const { data: orders, isFetching } = useHistoryController();

  return (
    <>
      <Header
        icon={<HistoryIcon className="w-8 h-8" />}
        description="Visualize pedidos anteriores"
      >
        Histórico
      </Header>

      {isFetching ? (
        <div className="flex items-center justify-center flex-1">
          <Spinner />
        </div>
      ) : (
        <HistoryOrderTable
          orders={orders}
        />
      )}
    </>
  );
}
