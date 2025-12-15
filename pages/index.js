function Home() {
  const estiloContainer = {
    backgroundColor: "#A0B0C0", // por exemplo: um cinza azulado
    minHeight: "100vh", // para ocupar toda a altura da tela
    margin: 0,
    padding: 0,
  };

  return (
    <div style={estiloContainer}>
      <h1>Pagina Inicial.</h1>
    </div>
  );
}

export default Home;
