function updateItem(items, id, updates) {
  return items.map((item) =>
    item.id === Number(id) ? { ...item, ...updates } : item
  );
}

module.exports = { updateItem };
