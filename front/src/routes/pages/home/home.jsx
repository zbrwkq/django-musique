import "./home.scss";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <h1 className="m-5 d-flex align-items-center flex-column">
        Suivez les musiques que vous avez écouté.
        <br />
        Lisez des avis sur vos musiques préférées.
        <br />
        Recommandez des albums à vos amis.
      </h1>
      <NavLink
        href="/register"
        className="d-flex align-items-center flex-column"
      >
        <Button className="my-3 w-25">S'inscrire maintenant</Button>
      </NavLink>
      <div>
        <Row className="mb-3">
          <Col>
            <Card className="summary-card">
              <Card.Body>
                <Card.Text>
                  Gardez une trace de toutes les musiques que vous avez écoutés
                  (ou commencez simplement à partir du jour de votre
                  inscription)
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="summary-card">
              <Card.Body>
                <Card.Text>
                  Montrez un peu d'amour pour vos albums et titres préférés avec
                  un « j'aime »
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="summary-card">
              <Card.Body>
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
              <Card.Body>
                <Card.Text>
                  Évaluez chaque album sur une échelle de cinq étoiles (avec
                  moitiés) pour enregistrer et partager votre réaction
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="summary-card">
              <Card.Body>
                <Card.Text>
                  Tenez un journal de vos écoutes de musiques
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="summary-card">
              <Card.Body>
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
  );
};

export default Home;
