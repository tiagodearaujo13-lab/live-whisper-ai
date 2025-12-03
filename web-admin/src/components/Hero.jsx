import styles from "./Hero.module.css";
import { Container, Row, Col } from "react-bootstrap";

const Hero = () => {
  return (
    <section className={styles.section} id="home">
      <Container>
        <h1 className={styles.headline}>
          Sua IA de vendas <br />
          <span className="text-gradient">invisível.</span>
        </h1>

        <p className={styles.subheadline}>
          O LiveWhisper ouve suas lives e projeta roteiros persuasivos na sua
          tela em tempo real. Ninguém vê, só você lucra.
        </p>

        <div className="mb-5">
          <button className={styles.glowButton}>Baixar Beta Grátis</button>
          <p className="mt-3 text-muted small">
            Disponível para Android • Setup em 2 min
          </p>
        </div>

        {/* Imagem do Celular Flutuando */}
        <Row className="justify-content-center">
          <Col md={8}>
            <img
              src="https://framerusercontent.com/images/30uM8g8B4d32kPZtV6X9kXyqE.png"
              alt="App Interface"
              style={{
                maxWidth: "100%",
                borderRadius: "20px",
                border: "1px solid #333",
              }}
            />
            {/* Nota: Usamos uma imagem placeholder similar a do Perssua, depois trocamos pelo seu print real */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
