import styles from "./Features.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaMicrophoneLines, FaBrain, FaGhost } from "react-icons/fa6";

const Features = () => {
  return (
    <section className={styles.gridSection}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Tecnologia de Ponta</h2>
          <p className="text-muted">
            Tudo o que você precisa para dominar suas lives.
          </p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}>
                <FaMicrophoneLines />
              </div>
              <h4>Escuta Ativa</h4>
              <p className="text-muted">
                Nosso algoritmo processa áudio em tempo real sem delay, captando
                o contexto da conversa.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}>
                <FaBrain />
              </div>
              <h4>IA Persuasiva</h4>
              <p className="text-muted">
                Não é apenas texto. A IA usa modelos mentais de vendas (AIDA,
                Spin Selling) para sugerir a fala.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}>
                <FaGhost />
              </div>
              <h4>Overlay Invisível</h4>
              <p className="text-muted">
                A janela flutuante roda sobre o Instagram/TikTok, invisível para
                quem assiste sua live.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
