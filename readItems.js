function getAllItems(items) {
  return items;
}

function getItemById(items, id) {
  return items.find((item) => item.id === Number(id)) || null;
}

module.exports = { getAllItems, getItemById };
