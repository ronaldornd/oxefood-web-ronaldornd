import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import Home from './views/home/home';
import FormLogin from './views/login/FormLogin';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import { ProtectedRoute } from './views/utils/ProtectedRoute';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormLogin />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/list-cliente"
                    element={
                        <ProtectedRoute>
                            <ListCliente />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/form-cliente"
                    element={
                        <ProtectedRoute>
                            <FormCliente />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/list-produto"
                    element={
                        <ProtectedRoute>
                            <ListProduto />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/form-produto"
                    element={
                        <ProtectedRoute>
                            <FormProduto />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    )
}

export default Rotas
