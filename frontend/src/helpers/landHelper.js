export const updateLand = async (landId, updatedData) => {
  try {
    // console.log(updatedData);
    // console.log(JSON.stringify(updatedData));
    const resDbUpdate = await fetch(
      `http://127.0.0.1:5000/land/update/${landId}`,
      {
        method: "PUT",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!resDbUpdate.ok) return false;

    const map = JSON.parse(sessionStorage.getItem("map"));
    // console.log(landId);
    const id = `${landId}`.padStart(4, "0");
    const [first, second] = [id.slice(0, 2), id.slice(2)];
    map[+first][+second] = { ...updatedData };
    sessionStorage.setItem("map", JSON.stringify(map));

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};


export const getMap = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/land/getAll");
    if (!res.ok) throw new Error("error while fetching map");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export const getMapFromCache = () => {
  try {
    return JSON.parse(sessionStorage.getItem("map"));
  } catch (e) {
    console.error(e.message);
  }
};