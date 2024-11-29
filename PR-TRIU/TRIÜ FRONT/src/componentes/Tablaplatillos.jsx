import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function PlatilloLista() {
  const [listaPlatillo, setListaPlatillo] = useState([]);
  const [platilloEdit, setPlatilloEdit] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const platillosPorPagina = 5;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/categorias"
        );
        setCategorias(response.data || []);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const consultarPlatillo = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/platillos");
        setListaPlatillo(response.data.data || []);
      } catch (error) {
        console.error("Error al consultar los platillos", error);
        setListaPlatillo([]);
      }
    };
    consultarPlatillo();
  }, [listaPlatillo]);

  const eliminarPlatillo = async (id) => {
    try {
      await axios.delete(`http://localhost:9001/api/platillos/${id}`);
      setListaPlatillo((prevPlatillos) =>
        prevPlatillos.filter((platillo) => platillo?._id !== id)
      );
      alert("El platillo fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el platillo:", error);
    }
  };

  const abrirModalEditar = (platillo) => {
    setPlatilloEdit(platillo);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setPlatilloEdit(null);
    setShowModal(false);
  };

  const guardarEdicion = async () => {
    if (!platilloEdit.nombre || !platilloEdit.precio || !platilloEdit.estado) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const { _id, __v,...payload } = platilloEdit;
      payload.categoria = platilloEdit.categoria?._id || platilloEdit.categoria;
      payload.estado = capitalizeEstado(platilloEdit.estado);

      const response = await axios.put(
        `http://localhost:9001/api/platillos/${_id}`,
        payload
      );

      setListaPlatillo((prevPlatillos) =>
        prevPlatillos.map((platillo) =>
          platillo._id === _id ? response.data.data : platillo
        )
      );

      alert("El platillo fue actualizado con éxito");
      cerrarModal();
    } catch (error) {
      console.error(
        "Error al actualizar el platillo:",
        error.response?.data.data || error.message
      );
      alert(
        "Ocurrió un error al actualizar el platillo. Revisa la consola para más detalles."
      );
    }
  };

  const agregarPlatillo = async () => {
    if (
      !platilloEdit.nombre ||
      !platilloEdit.precio ||
      !platilloEdit.descripcion ||
      !platilloEdit.estado
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const payload = {
        ...platilloEdit,
        categoria: platilloEdit.categoria?._id || platilloEdit.categoria,
      };

      console.log("Payload enviado para agregar:", payload);

      const response = await axios.post(
        "http://localhost:9001/api/platillos",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setListaPlatillo((prevPlatillos) => [
        ...prevPlatillos,
        response.data.data,
      ]);
      alert("Platillo agregado con éxito");
      cerrarModal();
    } catch (error) {
      console.error(
        "Error al agregar el platillo:",
        error.response?.data || error.message
      );
      alert(
        "Ocurrió un error al agregar el platillo. Revisa la consola para más detalles."
      );
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setPlatilloEdit({
      ...platilloEdit,
      [name]: name === "estado" ? capitalizeEstado(value) : value,
    });
  };

  const capitalizeEstado = (estado) => {
    return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
  };

  const totalPaginas = Math.ceil(listaPlatillo.length / platillosPorPagina);
  const platillosMostrados = listaPlatillo
    .filter((p) => p && p.estado)
    .slice(
      (paginaActual - 1) * platillosPorPagina,
      paginaActual * platillosPorPagina
    );

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  return (
    <div
      className="container-fluid py-5 d-flex flex-column justify-content-between"
      style={{ minHeight: "100vh", width: "100vw", padding: "0" }}
    >
      <div className="row g-3 mb-4" style={{ margin: "0" }}>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Total de Platillos</h5>
              <h2 className="text-primary">{listaPlatillo.length}</h2>
              <p>El número total de platillos disponibles en el menú.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Categorías Disponibles</h5>
              <h2 className="text-success">{categorias.length}</h2>
              <p>Las categorías de platillos disponibles para los usuarios.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Platillos Activos</h5>
              <h2 className="text-warning">
                {
                  listaPlatillo.filter(
                    (platillo) => platillo?.estado === "Activo"
                  ).length
                }
              </h2>
              <p>Platillos actualmente disponibles para la venta.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de agregar platillo */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm"
          style={{ marginRight: "8px", background: "#f5b400" }}
          onClick={() =>
            abrirModalEditar({
              nombre: "",
              precio: "",
              estado: "Activo",
              categoria: null,
            })
          }
        >
          Agregar Platillo
        </button>
      </div>
      <div className="card shadow-lg flex-grow-1">
        <div
          className="card-header  text-white text-center"
          style={{ backgroundColor: "#000127" }}
        >
          <h3 className="mb-0">Lista de Platillos</h3>
          <p>Vista detallada de todos los platillos disponibles en el menú</p>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {platillosMostrados.map((platillo) => (
                  <tr key={platillo._id}>
                    <td>{platillo.nombre}</td>
                    <td>${platillo.precio.toFixed(2)}</td>
                    <td>{platillo.descripcion}</td>
                    <td>
                      <span
                        className={`badge ${
                          platillo.estado === "Activo"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {platillo.estado}
                      </span>
                    </td>
                    <td>
                      {platillo.categoria
                        ? platillo.categoria.nombre
                        : "Sin categoría"}
                    </td>
                    <td>
                      <button
                        className="btn text-balck btn-sm"
                        style={{ marginRight: "8px", background: "#f5b400" }}
                        onClick={() => abrirModalEditar(platillo)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarPlatillo(platillo._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer">
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    i + 1 === paginaActual ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => cambiarPagina(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
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
                <h5 className="modal-title">Agregar o Editar Platillo</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={platilloEdit?.nombre || ""}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      name="precio"
                      value={platilloEdit?.precio || ""}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripcion</label>
                    <input
                      type="text"
                      className="form-control"
                      name="descripcion"
                      value={platilloEdit?.descripcion || ""}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      name="estado"
                      value={platilloEdit?.estado || ""}
                      onChange={manejarCambio}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                      className="form-select"
                      name="categoria"
                      value={platilloEdit?.categoria || ""}
                      onChange={manejarCambio}
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria._id} value={categoria._id}>
                          {categoria.nombre}
                        </option>
                      ))}
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
                  onClick={platilloEdit._id ? guardarEdicion : agregarPlatillo}
                >
                  {platilloEdit._id ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlatilloLista;
