import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { mensagemErro, notifyError, notifySuccess } from '../../views/utils/Util';

export default function FormEntregador() {
  const { state } = useLocation();
  const [idEntregador, setIdEntregador] = useState();

  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  const [ativo, setAtivo] = useState();

  useEffect(() => {
    if (state !== null && state.id !== null) {
      axios
        .get("http://localhost:8082/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setRg(response.data.rg);
          setDataNascimento(formatarData(response.data.dataNascimento));
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
          setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
          setValorFrete(response.data.valorFrete);
          setEnderecoRua(response.data.enderecoRua);
          setEnderecoNumero(response.data.enderecoNumero);
          setEnderecoBairro(response.data.enderecoBairro);
          setEnderecoCidade(response.data.enderecoCidade);
          setEnderecoCep(response.data.enderecoCep);
          setEnderecoUf(response.data.enderecoUf);
          setEnderecoComplemento(response.data.enderecoComplemento);
          setAtivo(response.data.ativo);
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
    console.log(idEntregador);
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
    if (idEntregador !== undefined || idEntregador !== null) {
      axios
        .put(
          "http://localhost:8082/api/entregador/" + idEntregador,
          entregadorRequest
        )
        .then((response) => {
          notifySuccess("Entregador alterado com sucesso.");
        })
        .catch((error) => {
          if (error.response) {
            notifyError(error.response.data.errors[0].defaultMessage)
          } else {
            notifyError(mensagemErro)
          }
        });
    } else {
      axios
        .post("http://localhost:8082/api/entregador", entregadorRequest)
        .then((response) => {
          notifySuccess("Entregador cadastrado com sucesso!");
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
      <Container textAlign="justified">
        {idEntregador === undefined && (
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />
            </span>
            Cadastro
          </h2>
        )}
        {idEntregador !== undefined && (
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />
            </span>
            Alteração
          </h2>
        )}
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
              <Form.Input label="CPF" fluid required>
                <InputMask
                  placeholder="123.456.789-00"
                  width={6}
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </Form.Input>
              <Form.Input fluid label="RG">
                <InputMask
                  placeholder="Opcional"
                  width={6}
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input label="Data de Nascimento" required fluid>
                <InputMask
                  mask="99/99/9999"
                  maskChar={null}
                  placeholder="Ex: 20/03/1985"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </Form.Input>
              <Form.Input label="Celular" required fluid>
                <InputMask
                  placeholder="(**) *****-****"
                  value={foneCelular}
                  onChange={(e) => setFoneCelular(e.target.value)}
                />
              </Form.Input>
              <Form.Input label="Fone Fixo" required fluid>
                <InputMask
                  placeholder="(**) *****-****"
                  value={foneFixo}
                  onChange={(e) => setFoneFixo(e.target.value)}
                />
              </Form.Input>
              <Form.Input label="Entregas Realizadas" fluid>
                <InputMask
                  placeholder="Opcional"
                  value={qtdEntregasRealizadas}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                />
              </Form.Input>
              <Form.Input label="Valor do Frete" fluid>
                <InputMask
                  placeholder="Opcional"
                  value={valorFrete}
                  onChange={(e) => setValorFrete(e.target.value)}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input fluid label="Rua">
                <InputMask
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                />
              </Form.Input>
              <Form.Input fluid label="Número">
                <InputMask
                  width={6}
                  value={enderecoNumero}
                  onChange={(e) => setEnderecoNumero(e.target.value)}
                />
              </Form.Input>
              <Form.Input fluid label="Complemento">
                <InputMask
                  value={enderecoComplemento}
                  onChange={(e) => setEnderecoComplemento(e.target.value)}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input label="Bairro" fluid>
                <InputMask
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                />
              </Form.Input>
              <Form.Input label="Cidade" fluid>
                <InputMask
                  value={enderecoCidade}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                />
              </Form.Input>
              <Form.Input
                label="UF"
                fluid
                value={enderecoUf}
                onChange={(e) => setEnderecoUf(e.target.value)}
              />
              <Form.Input label="CEP" fluid>
                <InputMask
                  width={9}
                  value={enderecoCep}
                  onChange={(e) => setEnderecoCep(e.target.value)}
                />
              </Form.Input>
            </Form.Group>
            <Form.Group inline>
              <label>Ativo:</label>
              <Form.Radio
                label="Sim"
                checked={ativo}
                onChange={(e) => setAtivo(true)}
              />
              <Form.Radio
                label="Não"
                checked={!ativo}
                onChange={(e) => setAtivo(false)}
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
