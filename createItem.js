function createItem(items, name, status = "pendiente") {
  const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  const item = { id: nextId, name: name.trim(), status };
  return [...items, item];
}

module.exports = { createItem };
