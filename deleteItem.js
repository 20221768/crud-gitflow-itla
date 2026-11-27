function deleteItem(items, id) {
  return items.filter((item) => item.id !== Number(id));
}

module.exports = { deleteItem };
