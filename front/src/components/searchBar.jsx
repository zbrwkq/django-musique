import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <InputGroup className="my-3">
      <Form.Control
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <InputGroup.Text>
        <FontAwesomeIcon icon={faSearch} />
      </InputGroup.Text>
    </InputGroup>
  );
};
export default SearchBar;
