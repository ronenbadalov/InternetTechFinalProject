export const updateLand = async (landId, updatedData) => {
  const res = await fetch(`http://127.0.0.1:5000/land/update?id=${landId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res;
};
