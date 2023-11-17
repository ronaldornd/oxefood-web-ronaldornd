import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function FormFornecedor() {
  const { state } = useLocation();
  const [idFornecedor, setIdFornecedor] = useState();

  const [nome, setNome] = useState();
  const [endereco, setEndereco] = useState();
  const [dataFundacao, setDataFundacao] = useState();
  const [valorMercado, setValorMerdaco] = useState();
  const [paginaWeb, setPaginaWeb] = useState();
  const [contatoVendedor, setContatoVendedor] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8082/api/fornecedor/" + state.id)
        .then((response) => {
          setIdFornecedor(response.data.id);
          setNome(response.data.nome);
          setEndereco(response.data.endereco);
          setDataFundacao(formatarData(response.data.dataFundacao));
          setValorMerdaco(response.data.valorMercado);
          setPaginaWeb(response.data.paginaWeb);
          setContatoVendedor(response.data.contatoVendedor);
        });
    }
  }, [state]);

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === '' || dataParam === undefined) {
      return ''
    }

    return dataParam[2] + '/' + dataParam[1] + '/' + dataParam[0];
  }
  function salvar() {
    let fornecedorRequest = {
      nome: nome,
      endereco: endereco,
      dataFundacao: dataFundacao,
      valorMercado: valorMercado,
      paginaWeb: paginaWeb,
      contatoVendedor: contatoVendedor,
    };

    if (idFornecedor != null) {
      axios
        .put(
          "http://localhost:8082/api/fornecedor/" + idFornecedor,
          fornecedorRequest
        )
        .then((response) => {
          console.log("Fornecedor alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um fornecedor.");
        });
    } else {
      axios
        .post("http://localhost:8082/api/fornecedor", fornecedorRequest)
        .then((response) => {
          alert("Fornecedor cadastrado com sucesso!");
        })
        .catch((error) => {
          console.log("Erro ao incluir um fornecedor:", error);
        });
    }
  }
  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idFornecedor === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Fornecedor &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Cadastro
            </h2>
          )}
          {idFornecedor != undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Fornecedor &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Alteração
            </h2>
          )}
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  width={10}
                  placeholder="Ex: Pizza"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Input
                  label="Data de Fundacao"
                >
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataFundacao}
                    onChange={(e) => setDataFundacao(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.Input
                  required
                  fluid
                  label="Endereco"
                  maxLength="100"
                  width={7}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths={"equal"}>
                <Form.Input
                  required
                  fluid
                  label="Valor de Mercado:"
                  maxLength="100"
                  width="7"
                  placeholder="25,69"
                  value={valorMercado}
                  onChange={(e) => setValorMerdaco(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Contato do Vendedor"
                  maxLength="100"
                  width="7"
                  placeholder="49"
                  value={contatoVendedor}
                  onChange={(e) => setContatoVendedor(e.target.value)}
                />
              </Form.Group>
              <Form.Input
                fluid
                label="Pagina WEB"
                maxLength="100"
                placeholder="15"
                value={paginaWeb}
                onChange={(e) => setPaginaWeb(e.target.value)}
              />
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
                to="/list-fornecedor"
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
