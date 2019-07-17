const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep,
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first()
    .then(scheme => {
      if (scheme) {
        return scheme;
      } else {
        return null;
      }
    });
}

function findSteps(id) {
  return db('schemes as s')
    .innerJoin('steps as st', 's.id', 'st.scheme_id')
    .where({ scheme_id: id })
    .select('st.id as id', 's.scheme_name', 'st.step_number', 'st.instructions')
    .orderBy('st.step_number', 'asc');
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return !findById(id)
    ? null
    : db('schemes')
        .where('id', id)
        .del();
}

function addStep(step, scheme_id) {
  return !findById(scheme_id)
    ? null
    : db('steps')
        .insert({ ...step, scheme_id })
        .then(() => {
          return findSteps(scheme_id);
        });
}
