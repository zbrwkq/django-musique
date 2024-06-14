import "./home.scss";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faStar,
  faCalendar,
  faShareAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div id="preview-page">
      <div className="background"></div>
      <section className="p-5 mb-3 d-flex flex-column mt-5">
        <h1 className="mb-5 d-flex align-items-center flex-column lh-lg mt-5">
          Suivez les musiques que vous avez écouté.
          <br />
          Lisez des avis sur vos musiques préférées.
          <br />
          Recommandez des albums à vos amis.
        </h1>
        <NavLink
          to="/register"
          className="mb-5 d-flex align-items-center flex-column"
        >
          <Button className="w-25">S'inscrire maintenant</Button>
        </NavLink>
      </section>
      <Container>
        <div>
          <Row className="mb-3">
            <Col>
              <Card className="summary-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faEye} className="m-3 h1" />
                  <Card.Text>
                    Gardez une trace de toutes les musiques que vous avez
                    écoutés (ou commencez simplement à partir du jour de votre
                    inscription)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="summary-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faHeart} className="m-3 h1" />
                  <Card.Text>
                    Montrez un peu d'amour pour vos albums, titres et artistes
                    préférés avec un « j'aime »
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="summary-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUsers} className="m-3 h1" />
                  <Card.Text>
                    Écrivez et partagez des avis, et suivez vos amis et d'autres
                    membres pour lire les leurs
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Card className="summary-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faStar} className="m-3 h1" />
                  <Card.Text>
                    Évaluez chaque album sur une échelle de cinq étoiles pour
                    enregistrer et partager votre réaction
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="summary-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCalendar} className="m-3 h1" />
                  <Card.Text>
                    Tenez un journal de vos écoutes de musiques
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="summary-card">
                <Card.Body className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faShareAlt} className="m-3 h1" />
                  <Card.Text>
                    Partagez cette application avec vos amis pour leur montrer à
                    quel point vous avez bon goûts
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
