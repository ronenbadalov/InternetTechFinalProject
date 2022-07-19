export const buyLand = async (landId, updatedData) => {
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
};
