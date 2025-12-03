import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid #222",
        padding: "60px 0",
        marginTop: "100px",
        backgroundColor: "#050505",
      }}
    >
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="fw-bold text-white mb-3">LiveWhisper AI</h5>
            <p className="text-muted small">
              Potencializando influenciadores com inteligência artificial em
              tempo real.
            </p>
          </Col>
          <Col md={2} xs={6} className="mb-4">
            <h6 className="text-white fw-bold mb-3">Produto</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Download
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Funcionalidades
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Preço
                </a>
              </li>
            </ul>
          </Col>
          <Col md={2} xs={6} className="mb-4">
            <h6 className="text-white fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Privacidade
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h6 className="text-white fw-bold mb-3">Contato</h6>
            <p className="text-muted small">suporte@livewhisper.com</p>
          </Col>
        </Row>
        <div className="text-center mt-5 pt-4 border-top border-dark">
          <small className="text-muted">
            &copy; 2025 LiveWhisper AI. Todos os direitos reservados.
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
