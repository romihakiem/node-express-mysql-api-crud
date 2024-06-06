const sql = require("./connection.js");

const Tutorial = function (val) {
    this.title = val.title;
    this.description = val.description;
    this.published = val.published;
};

Tutorial.getAll = (title, result) => {
    let query = "SELECT * FROM tutorials";

    if (title) {
        query += ` WHERE title LIKE "%${title}%"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Tutorial.getById = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Tutorial.getPublished = result => {
    sql.query("SELECT * FROM tutorials WHERE published = true", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Tutorial.create = (val, result) => {
    sql.query("INSERT INTO tutorials SET ?", val, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...val });
    });
};

Tutorial.update = (id, val, result) => {
    sql.query("UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
        [val.title, val.description, val.published, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...val });
        }
    );
};

Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

Tutorial.removeAll = result => {
    sql.query("DELETE FROM tutorials", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Tutorial;