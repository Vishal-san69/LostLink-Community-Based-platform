const express = require("express");

const router = express.Router();

const db = require("../config/db");

const verifyToken =
require("../middleware/authMiddleware");



/*
========================================
GET ALL COMMUNITIES
========================================
*/

router.get(

  "/",

  verifyToken,

  (req, res) => {

    const sql = `

      SELECT *

      FROM communities

      ORDER BY created_at DESC

    `;

    db.query(

      sql,

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.status(200).json(result);

      }

    );

  }

);



/*
========================================
CREATE COMMUNITY
ADMIN ONLY
========================================
*/

router.post(

  "/",

  verifyToken,

  (req, res) => {

    /*
    CHECK ADMIN
    */

    if (

      req.user.role !== "admin"

    ) {

      return res.status(403).json({

        message:

          "Access denied"

      });

    }


    const {

      name,

      type

    } = req.body;


    const sql = `

      INSERT INTO communities

      (name, type)

      VALUES (?, ?)

    `;


    db.query(

      sql,

      [name, type],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.status(201).json({

          message:

            "Community created"

        });

      }

    );

  }

);



module.exports = router;