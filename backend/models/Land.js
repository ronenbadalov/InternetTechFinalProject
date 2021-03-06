const Types = {
  ROAD: "road_land",
  PARK: "park_land",
  LAND: "land",
};

export default class Land {
  constructor(id, type, owner, isOcupied, disabled, price, forSale, innerData) {
    this.id = id;
    this.type = Types[type];
    this.owner = owner;
    this.isOcupied = isOcupied;
    this.disabled = disabled;
    this.price = price;
    this.forSale = forSale;
    this.innerData = innerData;
  }
}

export { Types };
