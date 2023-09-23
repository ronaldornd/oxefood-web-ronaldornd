import React, { useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FormProduto() {
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
  function salvar() {
    let produtoRequest = {
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    }; 
    axios
      .post("http://localhost:8082/api/produto", produtoRequest)
      .then((response) => {
        alert("Produto cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao incluir um produto:", error);
      });
  }
  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Produto &nbsp;
              <Icon name="angle double right" size="small" />
            </span>
            Cadastro
          </h2>
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths={"equal"}>
                <Form.Input
                  required
                  fluid
                  label="Titulo"
                  maxLength="100"
                  width={7}
                  placeholder="Ex: Pizza"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Código do Produto"
                  maxLength="15"
                  width={1}
                  placeholder="Ex: 12piz34"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.TextArea
                  placeholder="Informe a descrição do produto."
                  label="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths={"equal"}>
                <Form.Input
                  required
                  fluid
                  label="Valor Unitário:"
                  maxLength="100"
                  width="7"
                  placeholder="25,69"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  maxLength="100"
                  width="7"
                  placeholder="15"
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  maxLength="100"
                  width="7"
                  placeholder="49"
                  value={tempoEntregaMaximo}
                  onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
                as={Link}
                to="/list-produto"
              >
                <Icon name="reply" />
                Voltar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
