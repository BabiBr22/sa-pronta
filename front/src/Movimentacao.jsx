import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Movimentacao.css";

const HistoricoEPI = ({ setCurrentPage }) => {
  const [historico, setHistorico] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [epis, setEpis] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar a abertura do menu

  // Função para buscar o histórico de EPIs do backend
  const fetchHistorico = async () => {
    try {
      const response = await axios.get('http://localhost:4000/movimentacao');
      setHistorico(response.data);
    } catch (error) {
      console.error('Erro ao carregar o histórico:', error);
      alert('Erro ao carregar o histórico.');
    }
  };

  // Função para buscar os dados de funcionários
  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:4000/funcionarios');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao carregar os funcionários:', error);
      alert('Erro ao carregar os funcionários.');
    }
  };

  // Função para buscar os dados de EPIs
  const fetchEpis = async () => {
    try {
      const response = await axios.get('http://localhost:4000/epis');
      setEpis(response.data);
    } catch (error) {
      console.error('Erro ao carregar os EPIs:', error);
      alert('Erro ao carregar os EPIs.');
    }
  };

  useEffect(() => {
    fetchHistorico();
    fetchFuncionarios();
    fetchEpis();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para agrupar o histórico por data
  const groupByDate = (historico) => {
    return historico.reduce((groups, item) => {
      const date = new Date(item.dataHora).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
  };

  const groupedHistorico = groupByDate(historico);

  // Função para obter o nome do funcionário pelo ID
  const getFuncionarioNome = (id) => {
    const funcionario = funcionarios.find((f) => f.id === id);
    return funcionario ? funcionario.nome : 'Desconhecido';
  };

  // Função para obter o nome do EPI pelo ID
  const getEpiNome = (id) => {
    const epi = epis.find((e) => e.id === id);
    return epi ? epi.nome : 'Desconhecido';
  };

  return (
    <div className="app">
      {/* Botão para abrir e fechar o menu */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? 'Close' : 'Open'} Menu
      </button>

      {/* Menu Lateral */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => setCurrentPage('home')}>Home</li>
          <li onClick={() => setCurrentPage('historico')}>Histórico de EPIs</li>
          <li onClick={() => setCurrentPage('historicoFuncionarios')}>Histórico de Funcionários</li>
          <li onClick={() => setCurrentPage('registroEPIs')}>Registro de EPIs</li>
          <li onClick={() => setCurrentPage('registroFuncionarios')}>Registro de Funcionários</li>
          <li onClick={() => setCurrentPage('atribuirEPI')}>Atribuir EPI</li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="historico-container">
        <header className="header">
          <h1>Histórico de Atribuição de EPIs</h1>
        </header>
        <div className="historico-content">
          {Object.keys(groupedHistorico).length > 0 ? (
            Object.keys(groupedHistorico).map((date, index) => (
              <div key={index} className="historico-date-group">
                <h2>{date}</h2>
                <div className="table-container">
                  <table className="historico-table">
                    <thead>
                      <tr>
                        <th>Data e Hora</th>
                        <th>Funcionário</th>
                        <th>EPI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedHistorico[date].map((item, index) => (
                        <tr key={index}>
                          <td>{new Date(item.data_retirada).toLocaleString()}</td>
                          <td>{getFuncionarioNome(item.funcionarioId)}</td>
                          <td>{getEpiNome(item.epiId)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <p>Não há registros de atribuição de EPIs.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricoEPI;
