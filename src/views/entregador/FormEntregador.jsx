import React, { useState } from "react";
import { Container, Divider, Form, Icon, Button } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FormEntregador() {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [qtdEntregasRealizadas, setEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  const [ativo, setAtivo] = useState();

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      dataNascimento: dataNascimento,
      cpf: cpf,
      rg: rg,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      enderecoComplemento: enderecoComplemento,
      ativo: ativo,
    };

    axios
      .post("http://localhost:8082/api/entregador", entregadorRequest)
      .then((response) => {
        console.log("Entregador cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao incluir um entregador:", error);
      });
  }
  const options = [
    { key: "AC", value: "AC", text: "Acre" },
    { key: "AL", value: "AL", text: "Alagoas" },
    { key: "AP", value: "AP", text: "Amapá" },
    { key: "AM", value: "AM", text: "Amazonas" },
    { key: "BA", value: "BA", text: "Bahia" },
    { key: "CE", value: "CE", text: "Ceará" },
    { key: "DF", value: "DF", text: "Distrito Federal" },
    { key: "ES", value: "ES", text: "Espírito Santo" },
    { key: "GO", value: "GO", text: "Goiás" },
    { key: "MA", value: "MA", text: "Maranhão" },
    { key: "MT", value: "MT", text: "Mato Grosso" },
    { key: "MS", value: "MS", text: "Mato Grosso do Sul" },
    { key: "MG", value: "MG", text: "Minas Gerais" },
    { key: "PA", value: "PA", text: "Pará" },
    { key: "PB", value: "PB", text: "Paraíba" },
    { key: "PR", value: "PR", text: "Paraná" },
    { key: "PE", value: "PE", text: "Pernambuco" },
    { key: "PI", value: "PI", text: "Piauí" },
    { key: "RJ", value: "RJ", text: "Rio de Janeiro" },
    { key: "RN", value: "RN", text: "Rio Grande do Norte" },
    { key: "RS", value: "RS", text: "Rio Grande do Sul" },
    { key: "RO", value: "RO", text: "Rondônia" },
    { key: "RR", value: "RR", text: "Roraima" },
    { key: "SC", value: "SC", text: "Santa Catarina" },
    { key: "SP", value: "SP", text: "São Paulo" },
    { key: "SE", value: "SE", text: "Sergipe" },
    { key: "TO", value: "TO", text: "Tocantins" },
  ];
  return (
    <div>
      <MenuSistema />
      <Container textAlign="justified">
        <h2>
          <span style={{ color: "darkgray" }}>
            Entregador &nbsp;
            <Icon name="angle double right" size="small" />
          </span>
          Cadastro
        </h2>
        <Divider />
        <div style={{ marginTop: "4%" }}>
          <Form>
            <Form.Group widths={"equal"}>
              <Form.Input
                label="Nome"
                placeholder="Informe o nome do entregador"
                required
                fluid
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Form.Input
                label="CPF"
                placeholder="123.456.789-00"
                required
                fluid
                width={6}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <Form.Input
                label="RG"
                placeholder="Opcional"
                fluid
                width={6}
                value={rg}
                onChange={(e) => setRg(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input
                label="Data de Nascimento"
                placeholder="__/__/__"
                fluid
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
              <Form.Input
                label="Celular"
                placeholder="(**) *****-****"
                required
                fluid
                value={foneCelular}
                onChange={(e) => setFoneCelular(e.target.value)}
              />
              <Form.Input
                label="Fone Fixo"
                placeholder="(**) *****-****"
                required
                fluid
                value={foneFixo}
                onChange={(e) => setFoneFixo(e.target.value)}
              />
              <Form.Input
                label="Entregas Realizadas"
                placeholder="Opcional"
                fluid
                value={qtdEntregasRealizadas}
                onChange={(e) => setEntregasRealizadas(e.target.value)}
              />
              <Form.Input
                label="Valor do Frete"
                placeholder="Opcional"
                fluid
                value={valorFrete}
                onChange={(e) => setValorFrete(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input
                fluid
                label="Rua"
                value={enderecoRua}
                onChange={(e) => setEnderecoRua(e.target.value)}
              />
              <Form.Input
                fluid
                label="Número"
                width={6}
                value={enderecoNumero}
                onChange={(e) => setEnderecoNumero(e.target.value)}
              />
              <Form.Input
                fluid
                label="Complemento"
                value={enderecoComplemento}
                onChange={(e) => setEnderecoComplemento(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input
                label="Bairro"
                fluid
                value={enderecoBairro}
                onChange={(e) => setEnderecoBairro(e.target.value)}
              />
              <Form.Input
                label="Cidade"
                fluid
                value={enderecoCidade}
                onChange={(e) => setEnderecoCidade(e.target.value)}
              />
              <Form.Select
                label="UF"
                fluid
                options={options}
                value={enderecoUf}
                onChange={(e) => setEnderecoUf(e.target.value)}
              />
              <Form.Input
                label="CEP"
                fluid
                width={9}
                value={enderecoCep}
                onChange={(e) => setEnderecoCep(e.target.value)}
              />
            </Form.Group>
            <Form.Group inline>
              <label>Ativo:</label>
              <Form.Radio
                label="Sim"
                onChange={(e) => setAtivo(e.target.value)}
              />
              <Form.Radio
                label="Não"
                onChange={(e) => setAtivo(e.target.value)}
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
              to="/list-entregador"
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
  );
}
