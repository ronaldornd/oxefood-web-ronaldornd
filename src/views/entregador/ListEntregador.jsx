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

export default function ListEntregador() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8082/api/entregador").then((response) => {
      setLista(response.data);
    });
  }
  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8082/api/entregador/" + idRemover)
      .then((response) => {
        notifySuccess("Entregador removido com sucesso.");

        axios.get("http://localhost:8082/api/entregador").then((response) => {
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
          <h2> Entregador </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="green"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-entregador"
            />
            <br />
            <br />
            <br />

            <Table color="green" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>RG</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell>Entregas Realizadas</Table.HeaderCell>
                  <Table.HeaderCell>Valor do Frete</Table.HeaderCell>
                  <Table.HeaderCell>Ativo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((entregador) => (
                  <Table.Row key={entregador.id}>
                    <Table.Cell>{entregador.nome}</Table.Cell>
                    <Table.Cell>{entregador.cpf}</Table.Cell>
                    <Table.Cell>{entregador.rg}</Table.Cell>
                    <Table.Cell>
                      {entregador.dataNascimento}
                    </Table.Cell>
                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                    <Table.Cell>{entregador.foneFixo}</Table.Cell>
                    <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                    <Table.Cell>{entregador.valorFrete}</Table.Cell>
                    <Table.Cell>{entregador.ativo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste cliente"
                        icon
                      >
                        <Link
                          to="/form-entregador"
                          state={{ id: entregador.id }}
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
                        title="Clique aqui para remover este entregador"
                        onClick={(e) => confirmaRemover(entregador.id)}
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
