import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function PedidosLista() {
  const [listaPedido, setListaPedido] = useState([]);
  const [pedidoEdit, setPedidoEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState(""); 

  useEffect(() => {
    const consultarPedido = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/Pedidos");
        setListaPedido(response.data);
      } catch (error) {
        console.error("Error al consultar los pedidos:", error);
      }
    };

    consultarPedido();
  }, [listaPedido]);

  const eliminarPedido = async (id) => {
    try {
      await axios.delete(`http://localhost:9001/api/Pedidos/${id}`);
      setListaPedido((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido._id !== id)
      );
      alert("El pedido fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
    }
  };

  const abrirModalEditar = (pedido) => {
    setPedidoEdit(pedido);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setPedidoEdit(null);
    setShowModal(false);
  }; 

  const guardarPedido = async () => {
    if (
      !pedidoEdit.fecha ||
      !pedidoEdit.hora ||
      !pedidoEdit.total ||
      !pedidoEdit.Descripcion ||
      !pedidoEdit.estado
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      console.log("Datos enviados:", pedidoEdit);
      const { _id, __v, ...payload } = pedidoEdit;
      payload.estado = capitalizeEstado(pedidoEdit.estado);

      const response = await axios.put(
        `http://localhost:9001/api/Pedidos/${_id}`,
        payload
      );

      // Actualizar el estado de la lista con el pedido editado
      setListaPedido((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido._id === _id ? { ...pedido, ...response.data } : pedido
        )
      );

      alert("El pedido fue actualizado con éxito");
      cerrarModal();
    } catch (error) {
      console.error(
        "Error al actualizar el pedido:",
        error.response?.data || error.message
      );
      alert(
        "Ocurrió un error al actualizar el pedido. Revisa la consola para más detalles."
      );
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setPedidoEdit({
      ...pedidoEdit,
      [name]: value,
    });
  };

  const agregarPedido = async () => {
    if (
      !pedidoEdit.fecha ||
      !pedidoEdit.hora ||
      !pedidoEdit.total ||
      !pedidoEdit.Descripcion ||
      !pedidoEdit.estado
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const payload = { ...pedidoEdit };

      const response = await axios.post(
        "http://localhost:9001/api/Pedidos",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Agregar el nuevo pedido a la lista
      setListaPedido((prevPedidos) => [...prevPedidos, response.data]);

      alert("Pedido agregado con éxito");
      cerrarModal();
    } catch (error) {
      console.error(
        "Error al agregar el pedido:",
        error.response?.data || error.message
      );
      alert(
        "Ocurrió un error al agregar el pedido. Revisa la consola para más detalles."
      );
    }
  };

  const capitalizeEstado = (estado) => {
    return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
  };

  const manejarBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  const manejarFiltroEstado = (e) => {
    setFiltroEstado(e.target.value);
  };

  // Filtrar los pedidos por fecha y estado
  const listaFiltrada = listaPedido.filter((pedido) => {
    const fechaCoincide = pedido.Descripcion.includes(textoBusqueda);
    const estadoCoincide =
      filtroEstado === "" || pedido.estado.toLowerCase() === filtroEstado.toLowerCase();
    return fechaCoincide && estadoCoincide;
  });

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      <div
        className="container-fluid vh-100"
        style={{ width: "100vw", padding: "16px" }}
      >
        {/* Fila de Tarjetas */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div
              className="card text-primary h-100 shadow-lg rounded"
              style={{ background: "#ffff" }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">Total de Pedidos</h5>
                <h2 className="text-primary">{listaPedido.length}</h2>
                <p>El total de Pedidos es</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card text-success h-100 shadow-lg rounded"
              style={{ background: "#ffff" }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">Total Acumulado</h5>
                <p className="card-text display-4">
                  {listaPedido
                    .reduce(
                      (acumulado, pedido) => acumulado + (pedido.total || 0),
                      0
                    )
                    .toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card text-success  h-100 shadow-lg rounded"
              style={{ background: "#ffff" }}
            >
              <div className="card-body text-center">
                <h5 className="card-title">Pedidos Activos</h5>
                <h2 className="text-primary">
                  {
                    listaPedido.filter((pedido) => pedido?.estado === "Activo")
                      .length
                  }
                </h2>
                <p>Pedidos activos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtro de Búsqueda */}
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Buscar pedido por fecha..."
              className="form-control"
              value={textoBusqueda}
              onChange={manejarBusqueda}
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              style={{ width: "100%" }}
              value={filtroEstado}
              onChange={manejarFiltroEstado}
            >
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn text-black w-100"
              style={{ background: "#f5b400" }}
            >
              <i className="bi bi-search"></i> Filtrar
            </button>
          </div>
        </div>

        {/* Tabla de Pedidos */}
        <div className="table-responsive">
          <h1
            className="text-center py-3 mb-4"
            style={{
              backgroundColor: "#000127",
              color: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: "30px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            TABLA DE PEDIDOS
          </h1>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Total</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((Pedidos, index) => (
                <tr key={Pedidos._id || index}>
                  <td>{new Date(Pedidos.fecha).toLocaleDateString()}</td>
                  <td>{Pedidos.hora}</td>
                  <td>${Pedidos.total}</td>
                  <td>{Pedidos.Descripcion}</td>
                  <td>
                    <span
                      className={`badge ${
                        Pedidos.estado === "Activo"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {Pedidos.estado}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <button
                        className="btn text-black btn-sm mb-2"
                        style={{ background: "#f5b400" }}
                        onClick={() => abrirModalEditar(Pedidos)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarPedido(Pedidos._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card shadow-lg"></div>
          </div>

          <div className="col-md-4 mb-4 mt-5">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Nuevo Pedido</h5>
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    abrirModalEditar({
                      fecha: "",
                      hora: "",
                      total: "",
                      Descripcion: "",
                      estado: "Activo",
                    })
                  }
                >
                  Agregar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Pedido</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      name="fecha"
                      value={pedidoEdit?.fecha || "12/12/2023"}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Hora</label>
                    <input
                      type="time"
                      className="form-control"
                      name="hora"
                      value={pedidoEdit?.hora || ""}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Total</label>
                    <input
                      type="number"
                      className="form-control"
                      name="total"
                      value={pedidoEdit?.total || ""}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      name="Descripcion"
                      value={pedidoEdit?.Descripcion || ""}
                      onChange={manejarCambio}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      name="estado"
                      value={pedidoEdit?.estado || ""}
                      onChange={manejarCambio}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={pedidoEdit._id ? guardarPedido : agregarPedido}
                >
                  {pedidoEdit._id ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
}

export default PedidosLista;
