import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <CustomNavbar />

      <main>
        <Hero />

        {/* Adicione um ID para o scroll funcionar */}
        <div id="features">
          <Features />
        </div>

        {/* Aqui virão outras seções como "Como Funciona" depois */}
      </main>

      <Footer />
    </>
  );
}

export default App;
