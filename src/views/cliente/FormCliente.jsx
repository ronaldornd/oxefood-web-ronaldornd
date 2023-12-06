import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { mensagemErro, notifyError, notifySuccess } from '../../views/utils/Util';


export default function FormCliente() {
  const { state } = useLocation();
  const [idCliente, setIdCliente] = useState();

  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();

  useEffect(() => {
    if (state !== null && state.id !== null) {
      axios
        .get("http://localhost:8082/api/cliente/" + state.id)
        .then((response) => {
          setIdCliente(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setDataNascimento(formatarData(response.data.dataNascimento));
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
        });
    }
  }, [state]);

  function formatarData(dataParam) {
    if (dataParam!=null){let data = dataParam.toString();
        
      /*if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
      }
      
      return dataParam[2] + '/' + dataParam[1] + '/' + dataParam[0];*/
      
      if (data === null || data === '' || data === undefined) {
        return ''
      }
      
      let arrayData = data.split('-');
      return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
  }

  function salvar() {
    let clienteRequest = {
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
      cpf: cpf,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
    };

    if (idCliente != null) {
      //Alteração:
      axios
        .put("http://localhost:8082/api/cliente/" + idCliente, clienteRequest)
        .then((response) => {
          notifySuccess("Cliente alterado com sucesso.");
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.errors[0].defaultMessage)
          } else {
            notifyError(mensagemErro)
          }
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8082/api/cliente", clienteRequest)
        .then((response) => {
          notifySuccess("Cliente cadastrado com sucesso.");
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.errors[0].defaultMessage)
          } else {
            notifyError(mensagemErro)
          }
        });
    }

  }
  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCliente === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Cliente &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Cadastro
            </h2>
          )}
          {idCliente !== undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>

                Cliente &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input required fluid label="CPF">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />

                </Form.Input>
              </Form.Group>
              <Form.Input
                required
                fluid
                label="E-Mail"
                maxLength="100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Group>
                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Data Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
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
                to={"/list-cliente"}
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
