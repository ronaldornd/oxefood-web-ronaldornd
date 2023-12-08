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

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [menuFiltro, setMenuFiltro] = useState();
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8082/api/cliente").then((response) => {
      setLista(response.data);
    });
  }
  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8082/api/cliente/" + idRemover)
      .then((response) => {
        notifySuccess("Cliente removido com sucesso.");

        axios.get("http://localhost:8082/api/cliente").then((response) => {
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

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === '' || dataParam === undefined) {
      return ''
    }

    return dataParam[2] + '/' + dataParam[1] + '/' + dataParam[0];
  }


  function handleMenuFiltro() {

    if (menuFiltro === true) {
      setMenuFiltro(false);
    } else {
      setMenuFiltro(true);
    }
  }

  function handleChangeNome(value) {

    filtrarClientes(value, cpf);
  }
  function handleChangeCpf(value) {

    filtrarClientes(nome, value);
  }

  async function filtrarClientes(nomeParam, cpfParam) {

    let formData = new FormData();

    if (nomeParam !== undefined) {
      setNome(nomeParam)
      formData.append('nome', nomeParam);
    }
    if (cpfParam !== undefined) {
      setCpf(cpfParam)
      formData.append('cpf', cpfParam);
    }

    await axios.post("http://localhost:8082/api/cliente/filtrar", formData)
      .then((response) => {
        setLista(response.data)
      })
  }

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cliente </h2>
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
              to="/form-cliente"
            />
            <br />
            <br />
            <br />

            {menuFiltro ?

              <Segment>
                <Form className="form-filtros">

                  <Form.Input
                    icon="search"
                    value={nome}
                    onChange={e => handleChangeNome(e.target.value)}
                    label='Nome do Cliente'
                    placeholder='Filtrar pelo Nome do Cliente'
                    labelPosition='left'
                  />
                  <Form.Group widths='equal'>
                    <Form.Input
                      icon="search"
                      value={cpf}
                      onChange={e => handleChangeCpf(e.target.value)}
                      label='CPF'
                      placeholder='Filtrar por CPF'
                      labelPosition='left'
                    />

                  </Form.Group>
                </Form>
              </Segment> : ""
            }

            <Table color="green" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>{cliente.nome}</Table.Cell>
                    <Table.Cell>{cliente.cpf}</Table.Cell>
                    <Table.Cell>
                      {formatarData(cliente.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{cliente.foneCelular}</Table.Cell>
                    <Table.Cell>{cliente.foneFixo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste cliente"
                        icon
                      >
                        <Link
                          to="/form-cliente"
                          state={{ id: cliente.id }}
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
                        title="Clique aqui para remover este cliente"
                        onClick={(e) => confirmaRemover(cliente.id)}
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
