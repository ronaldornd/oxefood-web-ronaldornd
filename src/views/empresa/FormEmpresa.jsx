import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { mensagemErro, notifyError, notifySuccess } from '../utils/Util';

export default function FormEmpresa() {
  const { state } = useLocation();
  const [idEmpresa, setIdEmpresa] = useState();

  const [site, setSite] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [chave, setChave] = useState();
  const [cnpj, setCnpj] = useState();
  const [inscricaoEstadual, setInscricaoEstadual] = useState();
  const [nomeEmpresarial, setNomeEmpresarial] = useState();
  const [nomeFantasia, setNomeFantasia] = useState();
  const [fone, setFone] = useState();
  const [foneAlternativo, setFoneAlternativo] = useState();

  useEffect(() => {
    if (state !== null && state.id !== null) {
      axios
        .get("http://localhost:8082/api/empresa/" + state.id)
        .then((response) => {
          setIdEmpresa(response.data.id);
          setSite(response.data.site);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setChave(response.data.chave);
          setCnpj(response.data.cnpj);
          setInscricaoEstadual(response.data.inscricaoEstadual);
          setNomeEmpresarial(response.data.nomeEmpresarial);
          setNomeFantasia(response.data.nomeFantasia);
          setFone(response.data.fone);
          setFoneAlternativo(response.data.foneAlternativo);
        });
    }
  }, [state]);

  function salvar() {
    console.log(idEmpresa);

    let empresaRequest = {
      site: site,
      email: email,
      password: password,
      chave: chave,
      cnpj: cnpj,
      inscricaoEstadual: inscricaoEstadual,
      nomeEmpresarial: nomeEmpresarial,
      nomeFantasia: nomeFantasia,
      fone: fone,
      foneAlternativo: foneAlternativo,
    };

    if (idEmpresa != undefined || idEmpresa != null) {
      axios
        .put(
          "http://localhost:8082/api/empresa/" + idEmpresa,
          empresaRequest
        )
        .then((response) => {
          notifySuccess("Empresa alterada com sucesso.");
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
        .post("http://localhost:8082/api/empresa", empresaRequest)
        .then((response) => {
          notifySuccess("Empresa cadastrada com sucesso!");
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
          {idEmpresa === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Empresa &nbsp;
                <Icon name="angle double right" size="small" />
              </span>
              Cadastro
            </h2>
          )}
          {idEmpresa !== undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Empresa &nbsp;
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
                  label="site"
                  maxLength="100"
                  width={10}
                  placeholder="www.empresa.com"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                />
                <Form.Input
                  label="Email"
                    placeholder="algo@algo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                required
                >
                
                </Form.Input>
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.Input
                  required
                  fluid
                  label="Senha"
                  maxLength="100"
                  width={7}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths={"equal"}>
                <Form.Input
                  fluid
                  label="Chave"
                  maxLength="100"
                  width="7"
                  value={chave}
                  onChange={(e) => setChave(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="CNPJ"
                  maxLength="100"
                  width="7"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </Form.Group>
              <Form.Input
                fluid
                label="Imscricao Estadual"
                maxLength="100"
                placeholder="15"
                value={inscricaoEstadual}
                onChange={(e) => setInscricaoEstadual(e.target.value)}
              />
              <Form.Input
                fluid
                label="Nome Empresarial"
                maxLength="100"
                placeholder="15"
                value={nomeEmpresarial}
                onChange={(e) => setNomeEmpresarial(e.target.value)}
              />
              <Form.Input
                fluid
                label="Nome Fantasia"
                maxLength="100"
                placeholder="15"
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
              />
              <Form.Input
                fluid
                label="Telefone Principal"
                maxLength="100"
                placeholder="15"
                value={fone}
                onChange={(e) => setFone(e.target.value)}
              />
              <Form.Input
                fluid
                label="Telefone Alternativo"
                maxLength="100"
                placeholder="15"
                value={foneAlternativo}
                onChange={(e) => setFoneAlternativo(e.target.value)}
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
                to="/list-empresa"
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
