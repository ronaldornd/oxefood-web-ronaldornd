import React from "react";
import { Container, Divider, Form, Icon, Button } from "semantic-ui-react";

export default function FormEntregador() {
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
            />
            <Form.Input
              label="CPF"
              placeholder="123.456.789-00"
              required
              fluid
              width={6}
            />
            <Form.Input label="RG" placeholder="Opcional" fluid width={6} />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Input
              label="Data de Nascimento"
              placeholder="__/__/__"
              fluid
            />
            <Form.Input
              label="Celular"
              placeholder="(**) *****-****"
              required
              fluid
            />
            <Form.Input
              label="Entregas Realizadas"
              placeholder="Opcional"
              fluid
            />
            <Form.Input label="Valor do Frete" placeholder="Opcional" fluid />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Input fluid label="Rua" />
            <Form.Input fluid label="Número" width={6} />
            <Form.Input fluid label="Complemento" />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Input label="Bairro" fluid />
            <Form.Input label="Cidade" fluid />
            <Form.Select label="UF" fluid options={options} />
            <Form.Input label="CEP" fluid width={9} />
          </Form.Group>
          <Form.Group inline>
            <label>Ativo:</label>
            <Form.Radio label="Sim" />
            <Form.Radio label="Não" />
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
          >
            <Icon name="save" />
            Salvar
          </Button>
        </div>
      </div>
    </Container>
  );
}
