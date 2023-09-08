import React from "react";
import {
    Button,
    Container,
    Divider,
    Form,
    Icon
} from "semantic-ui-react";

export default function FormProduto() {
  return (
    <div>
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
                />

                <Form.Input
                  required
                  fluid
                  label="Código do Produto"
                  maxLength="15"
                  width={1}
                  placeholder="Ex: 12piz34"
                />
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.TextArea
                  placeholder="Informe a descrição do produto."
                  label="Descrição"
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
                />
                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  maxLength="100"
                  width="7"
                  placeholder="15"
                />
                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  maxLength="100"
                  width="7"
                  placeholder="49"
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
      </div>
    </div>
  );
}
