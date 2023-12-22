import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreatecabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button
          variation="primary"
          onClick={() => setShowForm(() => !showForm)}>
          Add new cabin
        </Button>

        {showForm && <CreatecabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
