import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Modal,
  Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { mensagemErro, notifyError, notifySuccess } from '../../views/utils/Util';

export default function ListProduto() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8082/api/fornecedor").then((response) => {
      setLista(response.data);
    });
  }
  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8082/api/fornecedor/" + idRemover)
      .then((response) => {
        notifySuccess("Fornecedor removido com sucesso.");

        axios.get("http://localhost:8082/api/fornecedor").then((response) => {
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

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Fornecedor </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="green"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-fornecedor"
            />
            <br />
            <br />
            <br />

            <Table color="green" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Data Fundação</Table.HeaderCell>
                  <Table.HeaderCell>Valor Mercado</Table.HeaderCell>
                  <Table.HeaderCell>Endereco</Table.HeaderCell>
                  <Table.HeaderCell>Pagina WEB</Table.HeaderCell>
                  <Table.HeaderCell>Contato do Vendedor</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((fornecedor) => (
                  <Table.Row key={fornecedor.id}>
                    <Table.Cell>{fornecedor.nome}</Table.Cell>
                    <Table.Cell>{fornecedor.dataFundacao}</Table.Cell>
                    <Table.Cell>{fornecedor.valorMercado}</Table.Cell>
                    <Table.Cell>{fornecedor.endereco}</Table.Cell>
                    <Table.Cell>{fornecedor.paginaWeb}</Table.Cell>
                    <Table.Cell>{fornecedor.contatoVendedor}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste fornecedor"
                        icon
                      >
                        <Link
                          to="/form-fornecedor"
                          state={{ id: fornecedor.id }}
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
                        title="Clique aqui para remover este fornecedor"
                        onClick={(e) => confirmaRemover(fornecedor.id)}
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
