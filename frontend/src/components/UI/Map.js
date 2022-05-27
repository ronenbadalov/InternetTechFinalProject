import React from "react";
import Land from "./Land";
import classes from "./Map.module.scss";
import { Container, Row, Col } from "react-bootstrap";

// types: unowned, owned ,owned-forSale, road, park
// owner: userId
const rand = () => {
  const min = Math.ceil(15);
  const max = Math.floor(200);
  return Math.floor(Math.random() * (max - min) + min);
};
const data = [];
let innerData = [];
let count = 0;

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 100; j++) {
    let land = {
      id: count,
      type: "unowned",
      price: rand(),
      owner: null,
    };
    count++;
    innerData.push(land);
  }
  data.push(innerData);
  innerData = [];
}
console.log(data);

const Map = () => {
  return (
    <Container className={classes["map"]}>
      {data.map((row, i) => {
        return (
          <Row className={classes["row"]} key={i} xs={"auto"}>
            {row.map((land) => {
              return (
                <Col key={land.id} className="p-0 m-0">
                  <Land
                    id={land.id}
                    type={land.type}
                    price={land.price}
                    owner={land.owner}
                  />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
};

export default Map;
