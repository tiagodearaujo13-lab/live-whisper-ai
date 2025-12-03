import { Navbar, Nav, Container, Button } from "react-bootstrap";
import styles from "./CustomNavbar.module.css";
import { FaRobot } from "react-icons/fa";

const CustomNavbar = () => {
  return (
    <Navbar fixed="top" expand="lg" variant="dark" className={styles.glassNav}>
      <Container>
        <Navbar.Brand href="#" className={styles.brand}>
          <FaRobot className="me-2 text-white" /> LiveWhisper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link href="#features" className={styles.navLink}>
              Funcionalidades
            </Nav.Link>
            <Nav.Link href="#how-it-works" className={styles.navLink}>
              Como Funciona
            </Nav.Link>
            <Nav.Link href="#pricing" className={styles.navLink}>
              Preço
            </Nav.Link>
            <Button variant="light" className="ms-3 rounded-pill px-4 fw-bold">
              Baixar App
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
