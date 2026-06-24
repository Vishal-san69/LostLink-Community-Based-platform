const express = require("express");

const router = express.Router();

const db = require("../config/db");

const verifyToken =
require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadMiddleware");



/*
========================================
GET ALL ITEMS
========================================
*/

router.get("/", verifyToken, (req, res) => {

  const sql = `

    SELECT items.*, users.name AS posted_by

    FROM items

    JOIN users
    ON items.user_id = users.id

    ORDER BY items.created_at DESC

  `;

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json(err);

    }

    res.status(200).json(result);

  });

});



/*
========================================
DASHBOARD STATS
========================================
*/

router.get(

  "/stats/summary",

  verifyToken,

  (req, res) => {

    const sql = `

      SELECT

        SUM(
          CASE
            WHEN type = 'lost'
            THEN 1
            ELSE 0
          END
        ) AS lost,

        SUM(
          CASE
            WHEN type = 'found'
            THEN 1
            ELSE 0
          END
        ) AS found,

        SUM(
          CASE
            WHEN status = 'recovered'
            THEN 1
            ELSE 0
          END
        ) AS recovered

      FROM items

    `;

    db.query(sql, (err, result) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.status(200).json(result[0]);

    });

  }

);



/*
========================================
GET USER ITEMS
========================================
*/

router.get(

  "/user/my-items",

  verifyToken,

  (req, res) => {

    const sql = `

      SELECT *

      FROM items

      WHERE user_id = ?

    `;

    db.query(

      sql,

      [req.user.id],

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
MATCH SIMILAR ITEMS
========================================
*/

router.get(

  "/matches/:id",

  verifyToken,

  (req, res) => {

    const itemId = req.params.id;


    /*
    GET CURRENT ITEM
    */

    const currentItemQuery = `

      SELECT *

      FROM items

      WHERE id = ?

    `;


    db.query(

      currentItemQuery,

      [itemId],

      (err, currentItemResult) => {

        if (err) {

          return res.status(500).json(err);

        }


        /*
        ITEM NOT FOUND
        */

        if (

          currentItemResult.length === 0

        ) {

          return res.status(404).json({

            message: "Item not found"

          });

        }


        /*
        CURRENT ITEM
        */

        const currentItem =

          currentItemResult[0];


        /*
        OPPOSITE TYPE

        lost -> found
        found -> lost
        */

        const oppositeType =

          currentItem.type === "lost"

            ? "found"

            : "lost";


        /*
        FIND POSSIBLE MATCHES
        */

        const matchQuery = `

          SELECT *

          FROM items

          WHERE type = ?

        `;


        db.query(

          matchQuery,

          [oppositeType],

          (err, matchResults) => {

            if (err) {

              return res.status(500).json(err);

            }


            /*
            MATCHING LOGIC
            */

            const matches = [];


            matchResults.forEach(

              (item) => {

                let score = 0;


                /*
                CATEGORY MATCH
                */

                if (

                  item.category &&

                  currentItem.category &&

                  item.category
                    .toLowerCase()

                  ===

                  currentItem.category
                    .toLowerCase()

                ) {

                  score += 1;

                }


                /*
                COLOR MATCH
                */

                if (

                  item.color &&

                  currentItem.color &&

                  item.color
                    .toLowerCase()

                  ===

                  currentItem.color
                    .toLowerCase()

                ) {

                  score += 1;

                }


                /*
                TITLE MATCH
                */

                if (

                  item.title
                    .toLowerCase()

                    .includes(

                      currentItem.title
                        .toLowerCase()

                    )

                  ||

                  currentItem.title
                    .toLowerCase()

                    .includes(

                      item.title
                        .toLowerCase()

                    )

                ) {

                  score += 1;

                }


                /*
                TAG MATCH
                */

                if (

                  item.tags &&

                  currentItem.tags

                ) {

                  const itemTags =

                    item.tags
                      .toLowerCase()
                      .split(",");

                  const currentTags =

                    currentItem.tags
                      .toLowerCase()
                      .split(",");


                  const commonTags =

                    itemTags.filter(

                      tag =>

                        currentTags.includes(

                          tag.trim()

                        )

                    );


                  score +=
                    commonTags.length;

                }


                /*
                SAVE MATCH
                */

                if (score > 0) {

                  matches.push({

                    ...item,

                    score

                  });

                }

              }

            );


            /*
            SORT BEST MATCHES
            */

            matches.sort(

              (a, b) =>

                b.score - a.score

            );


            /*
            RETURN MATCHES
            */

            res.status(200).json(

              matches

            );

          }

        );

      }

    );

  }

);

/*
========================================
GET SINGLE ITEM
========================================
*/

router.get("/:id", verifyToken, (req, res) => {

  const itemId = req.params.id;

  const sql = `

    SELECT *

    FROM items

    WHERE id = ?

  `;

  db.query(sql, [itemId], (err, result) => {

    if (err) {

      return res.status(500).json(err);

    }

    res.status(200).json(result[0]);

  });

});



/*
========================================
ADD ITEM
========================================
*/

router.post(

  "/",

  verifyToken,

  upload.single("image"),

  (req, res) => {

const {

  title,
  description,
  category,
  location,
  type,
  email,
  phone,
  color,
  incident_date,
  tags,
  community_id

} = req.body;


    const image_url = req.file

      ? `http://localhost:5000/uploads/${req.file.filename}`

      : "";


    const sql = `

      INSERT INTO items
       (
  title,
  description,
  category,
  location,
  type,
  image_url,
  email,
  phone,
  color,
  incident_date,
  tags,
  community_id,
  user_id
)

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;


    db.query(

      sql,
       [
  title,
  description,
  category,
  location,
  type,
  image_url,
  email,
  phone,
  color,
  incident_date,
  tags,
  community_id,
  req.user.id
],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.status(201).json({

          message: "Item added successfully"

        });

      }

    );

  }

);



/*
========================================
UPDATE ITEM STATUS
========================================
*/

router.put("/:id/status", verifyToken, (req, res) => {

  const itemId = req.params.id;

  const { status } = req.body;

  const sql = `

    UPDATE items

    SET status = ?

    WHERE id = ?

  `;

  db.query(

    sql,

    [status, itemId],

    (err, result) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.status(200).json({

        message: "Status updated"

      });

    }

  );

});



/*
========================================
DELETE ITEM
========================================
*/

router.delete("/:id", verifyToken, (req, res) => {

  const itemId = req.params.id;

  const sql = `

    DELETE FROM items

    WHERE id = ?

  `;

  db.query(

    sql,

    [itemId],

    (err, result) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.status(200).json({

        message: "Item deleted"

      });

    }

  );

});



module.exports = router;