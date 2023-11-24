import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Menu,
  Modal,
  Segment,
  Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { mensagemErro, notifyError, notifySuccess } from '../../views/utils/Util';

export default function ListProduto() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [menuFiltro, setMenuFiltro] = useState();
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [idCategoria, setIdCategoria] = useState();
  const [listaCategoriaProduto, setListaCategoriaProduto] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);


  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8082/api/produto").then((response) => {
      setLista(response.data);
    });
    axios.get("http://localhost:8082/api/categoriaproduto")
      .then((response) => {

        const dropDownCategorias = [];
        dropDownCategorias.push({ text: '', value: '' });
        response.data.map(c => (
          dropDownCategorias.push({ text: c.descricao, value: c.id })
        ))

        setListaCategoriaProduto(dropDownCategorias)

      })

  }
  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8082/api/produto/" + idRemover)
      .then((response) => {
        notifySuccess("Produto removido com sucesso.");

        axios.get("http://localhost:8082/api/produto").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.errors[0].defaultMessage)
        } else {
          notifyError(mensagemErro)
        }
      });
    setOpenModal(false);
  }

  function handleMenuFiltro() {

    if (menuFiltro === true) {
      setMenuFiltro(false);
    } else {
      setMenuFiltro(true);
    }
  }

  function handleChangeCodigo(value) {

    filtrarProdutos(value, titulo, idCategoria);
  }

  function handleChangeTitulo(value) {

    filtrarProdutos(codigo, value, idCategoria);
  }

  function handleChangeCategoriaProduto(value) {

    filtrarProdutos(codigo, titulo, value);
  }

  async function filtrarProdutos(codigoParam, tituloParam, idCategoriaParam) {

    let formData = new FormData();

    if (codigoParam !== undefined) {
      setCodigo(codigoParam)
      formData.append('codigo', codigoParam);
    }
    if (tituloParam !== undefined) {
      setTitulo(tituloParam)
      formData.append('titulo', tituloParam);
    }
    if (idCategoriaParam !== undefined) {
      setIdCategoria(idCategoriaParam)
      formData.append('idCategoria', idCategoriaParam);
    }

    await axios.post("http://localhost:8082/api/produto/filtrar", formData)
      .then((response) => {
        setLista(response.data)
      })
  }

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Produto </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>

            <Menu compact>
              <Menu.Item
                name='menuFiltro'
                active={menuFiltro === true}
                onClick={() => handleMenuFiltro()}
              >
                <Icon name='filter' />
                Filtrar
              </Menu.Item>
            </Menu>


            <Button
              label="Novo"
              circular
              color="green"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-produto"
            />
            <br />
            <br />
            <br />

            {menuFiltro ?

              <Segment>
                <Form className="form-filtros">

                  <Form.Input
                    icon="search"
                    value={codigo}
                    onChange={e => handleChangeCodigo(e.target.value)}
                    label='Código do Produto'
                    placeholder='Filtrar por Código do Produto'
                    labelPosition='left'
                    width={4}
                  />
                  <Form.Group widths='equal'>
                    <Form.Input
                      icon="search"
                      value={titulo}
                      onChange={e => handleChangeTitulo(e.target.value)}
                      label='Título'
                      placeholder='Filtrar por título'
                      labelPosition='left'
                    />
                    <Form.Select
                      placeholder='Filtrar por Categoria'
                      label='Categoria'
                      options={listaCategoriaProduto}
                      value={idCategoria}
                      onChange={(e, { value }) => {
                        handleChangeCategoriaProduto(value)
                      }}
                    />

                  </Form.Group>
                </Form>
              </Segment> : ""
            }

            <Table color="green" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Codigo</Table.HeaderCell>
                  <Table.HeaderCell>Categoria</Table.HeaderCell>
                  <Table.HeaderCell>Titulo</Table.HeaderCell>
                  <Table.HeaderCell>Valor Unitario</Table.HeaderCell>
                  <Table.HeaderCell>Tempo de Entrega Mínimo</Table.HeaderCell>
                  <Table.HeaderCell>Tempo de Entrega Máximo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>{produto.codigo}</Table.Cell>
                    <Table.Cell>{produto.categoria.descricao}</Table.Cell>
                    <Table.Cell>{produto.titulo}</Table.Cell>
                    <Table.Cell>{produto.valorUnitario}</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste produto"
                        icon
                      >
                        <Link
                          to="/form-produto"
                          state={{ id: produto.id }}
                          style={{ color: "green" }}
                        >
                          <Icon name="edit" style={{ margin: 0 }} />
                        </Link>
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este produto"
                        onClick={(e) => confirmaRemover(produto.id)}
                        icon
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <Modal
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
        size="mini"
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            Tem certeza que deseja remover esse registro?
          </div>
        </Header>
        <Modal.Actions>
          <Button color="red" inverted onClick={() => setOpenModal(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
