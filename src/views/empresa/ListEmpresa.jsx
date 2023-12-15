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
import { mensagemErro, notifyError, notifySuccess } from '../utils/Util';

export default function ListEmpresa() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8082/api/empresa").then((response) => {
      setLista(response.data);
    });
  }
  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8082/api/empresa/" + idRemover)
      .then((response) => {
        notifySuccess("Empresa removido com sucesso.");

        axios.get("http://localhost:8082/api/empresa").then((response) => {
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
          <h2> Empresa </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="green"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-empresa"
            />
            <br />
            <br />
            <br />

            <Table color="green" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome Fantasia</Table.HeaderCell>
                  <Table.HeaderCell>CNPJ</Table.HeaderCell>
                  <Table.HeaderCell>Fone</Table.HeaderCell>
                  <Table.HeaderCell>Inscrição Estadual</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center"></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((empresa) => (
                  <Table.Row key={empresa.id}>
                    <Table.Cell>{empresa.nomeFantasia}</Table.Cell>
                    <Table.Cell>{empresa.cnpj}</Table.Cell>
                    <Table.Cell>{empresa.fone}</Table.Cell>
                    <Table.Cell>{empresa.inscricaoEstadual}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados desta empresa"
                        icon
                      >
                        <Link
                          to="/form-empresa"
                          state={{ id: empresa.id }}
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
                        title="Clique aqui para remover esta empresa"
                        onClick={(e) => confirmaRemover(empresa.id)}
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
